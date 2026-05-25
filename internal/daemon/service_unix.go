//go:build !windows

package daemon

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"text/template"

	"github.com/thaonv/algorithms-explorer/internal/config"
	"github.com/thaonv/algorithms-explorer/internal/paths"
)

const launchdPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.algorithms-explorer.server</string>
  <key>ProgramArguments</key>
  <array>
    <string>{{.Exe}}</string>
    <string>serve</string>
    <string>--background</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>ALGO_EXPLORER_HOST</key><string>{{.Host}}</string>
    <key>ALGO_EXPLORER_PORT</key><string>{{.Port}}</string>
    <key>ALGO_EXPLORER_ROOT</key><string>{{.Root}}</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>{{.Log}}</string>
  <key>StandardErrorPath</key><string>{{.Log}}</string>
</dict>
</plist>
`

const systemdUnit = `[Unit]
Description=Algorithms Explorer local server
After=network.target

[Service]
Type=simple
ExecStart={{.Exe}} serve --background
Environment=ALGO_EXPLORER_HOST={{.Host}}
Environment=ALGO_EXPLORER_PORT={{.Port}}
Environment=ALGO_EXPLORER_ROOT={{.Root}}
Restart=on-failure
StandardOutput=append:{{.Log}}
StandardError=append:{{.Log}}

[Install]
WantedBy=default.target
`

func registerService(exe string, cfg config.Config) error {
	switch runtime.GOOS {
	case "darwin":
		return registerLaunchd(exe, cfg)
	case "linux":
		return registerSystemd(exe, cfg)
	default:
		return fmt.Errorf("no service manager")
	}
}

func unregisterService() error {
	switch runtime.GOOS {
	case "darwin":
		plist := paths.LaunchAgentPlist()
		_ = exec.Command("launchctl", "unload", plist).Run()
		return os.Remove(plist)
	case "linux":
		unit := paths.SystemdUnit()
		_ = exec.Command("systemctl", "--user", "disable", "--now", paths.AppName+".service").Run()
		return os.Remove(unit)
	default:
		return nil
	}
}

func registerLaunchd(exe string, cfg config.Config) error {
	if _, err := exec.LookPath("launchctl"); err != nil {
		return err
	}
	data := map[string]string{
		"Exe":  exe,
		"Host": cfg.Host,
		"Port": fmtPort(cfg.Port),
		"Root": cfg.Root,
		"Log":  paths.LogFile(),
	}
	plist := paths.LaunchAgentPlist()
	if err := os.MkdirAll(filepath.Dir(plist), 0o755); err != nil {
		return err
	}
	if err := renderTemplate(launchdPlist, plist, data); err != nil {
		return err
	}
	_ = exec.Command("launchctl", "unload", plist).Run()
	return exec.Command("launchctl", "load", plist).Run()
}

func registerSystemd(exe string, cfg config.Config) error {
	if _, err := exec.LookPath("systemctl"); err != nil {
		return err
	}
	data := map[string]string{
		"Exe":  exe,
		"Host": cfg.Host,
		"Port": fmtPort(cfg.Port),
		"Root": cfg.Root,
		"Log":  paths.LogFile(),
	}
	unit := paths.SystemdUnit()
	if err := os.MkdirAll(filepath.Dir(unit), 0o755); err != nil {
		return err
	}
	if err := renderTemplate(systemdUnit, unit, data); err != nil {
		return err
	}
	_ = exec.Command("systemctl", "--user", "daemon-reload").Run()
	if err := exec.Command("systemctl", "--user", "enable", "--now", paths.AppName+".service").Run(); err != nil {
		return err
	}
	return nil
}

func renderTemplate(tmpl, out string, data map[string]string) error {
	t, err := template.New("svc").Parse(tmpl)
	if err != nil {
		return err
	}
	f, err := os.Create(out)
	if err != nil {
		return err
	}
	defer f.Close()
	return t.Execute(f, data)
}

func fmtPort(p int) string {
	return strconv.Itoa(p)
}
