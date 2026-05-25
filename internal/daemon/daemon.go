package daemon

import (
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/thaonv/algorithms-explorer/internal/config"
	"github.com/thaonv/algorithms-explorer/internal/paths"
)

func IsRunning() (bool, int) {
	pid, err := readPID()
	if err != nil || pid <= 0 {
		return false, 0
	}
	if processAlive(pid) {
		return true, pid
	}
	_ = os.Remove(paths.PIDFile())
	return false, 0
}

func Status(cfg config.Config) (string, error) {
	running, pid := IsRunning()
	if !running {
		return "stopped", nil
	}
	if healthOK(cfg) {
		return fmt.Sprintf("running (pid %d) — %s", pid, cfg.BaseURL()), nil
	}
	return fmt.Sprintf("running (pid %d) but not responding on %s", pid, cfg.BaseURL()), nil
}

func UnregisterService() error {
	return unregisterService()
}

func Start(cfg config.Config, selfExe string) error {
	if running, pid := IsRunning(); running {
		return fmt.Errorf("already running (pid %d)", pid)
	}
	if err := paths.EnsureDirs(); err != nil {
		return err
	}
	if err := registerService(selfExe, cfg); err != nil {
		return startDetached(selfExe, cfg)
	}
	time.Sleep(800 * time.Millisecond)
	if running, _ := IsRunning(); running {
		return nil
	}
	if healthOK(cfg) {
		return nil
	}
	return startDetached(selfExe, cfg)
}

func Stop() error {
	if err := unregisterService(); err != nil {
		// fall through
	}
	pid, err := readPID()
	if err != nil {
		return nil
	}
	proc, err := os.FindProcess(pid)
	if err != nil {
		_ = os.Remove(paths.PIDFile())
		return nil
	}
	if runtime.GOOS == "windows" {
		_ = proc.Kill()
	} else {
		_ = proc.Signal(syscall.SIGTERM)
	}
	deadline := time.Now().Add(5 * time.Second)
	for time.Now().Before(deadline) {
		if !processAlive(pid) {
			break
		}
		time.Sleep(200 * time.Millisecond)
	}
	if processAlive(pid) {
		_ = proc.Kill()
	}
	_ = os.Remove(paths.PIDFile())
	return nil
}

func Restart(cfg config.Config, selfExe string) error {
	_ = Stop()
	return Start(cfg, selfExe)
}

func WritePID(pid int) error {
	if err := paths.EnsureDirs(); err != nil {
		return err
	}
	return os.WriteFile(paths.PIDFile(), []byte(strconv.Itoa(pid)+"\n"), 0o644)
}

func SetupLogger() (*os.File, error) {
	if err := paths.EnsureDirs(); err != nil {
		return nil, err
	}
	return os.OpenFile(paths.LogFile(), os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0o644)
}

func OpenBrowser(url string) error {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "darwin":
		cmd = exec.Command("open", url)
	case "windows":
		cmd = exec.Command("cmd", "/c", "start", "", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	return cmd.Start()
}

func TailLogs(n int) error {
	f, err := os.Open(paths.LogFile())
	if err != nil {
		return fmt.Errorf("no logs yet at %s", paths.LogFile())
	}
	defer f.Close()
	data, err := io.ReadAll(f)
	if err != nil {
		return err
	}
	lines := strings.Split(string(data), "\n")
	start := 0
	if len(lines) > n {
		start = len(lines) - n
	}
	fmt.Print(strings.Join(lines[start:], "\n"))
	return nil
}

func ResolveWWWFromExe(exe string) string {
	dir := filepath.Dir(exe)
	candidates := []string{
		filepath.Join(dir, "www"),
		filepath.Join(dir, "..", "www"),
		filepath.Join(dir, "..", "..", "www"),
	}
	for _, c := range candidates {
		if st, err := os.Stat(filepath.Join(c, "index.html")); err == nil && !st.IsDir() {
			abs, _ := filepath.Abs(c)
			return abs
		}
	}
	return paths.WWWDir()
}

func startDetached(selfExe string, cfg config.Config) error {
	logFile, err := SetupLogger()
	if err != nil {
		return err
	}
	cmd := exec.Command(selfExe, "serve", "--background")
	cmd.Env = append(os.Environ(),
		"ALGO_EXPLORER_HOST="+cfg.Host,
		"ALGO_EXPLORER_PORT="+strconv.Itoa(cfg.Port),
		"ALGO_EXPLORER_ROOT="+cfg.Root,
	)
	cmd.Stdout = logFile
	cmd.Stderr = logFile
	setDetached(cmd)
	if err := cmd.Start(); err != nil {
		return err
	}
	return WritePID(cmd.Process.Pid)
}

func readPID() (int, error) {
	b, err := os.ReadFile(paths.PIDFile())
	if err != nil {
		return 0, err
	}
	return strconv.Atoi(strings.TrimSpace(string(b)))
}

func processAlive(pid int) bool {
	proc, err := os.FindProcess(pid)
	if err != nil {
		return false
	}
	if runtime.GOOS == "windows" {
		return proc.Signal(syscall.Signal(0)) == nil
	}
	return proc.Signal(syscall.Signal(0)) == nil
}

func healthOK(cfg config.Config) bool {
	client := &http.Client{Timeout: 2 * time.Second}
	resp, err := client.Get(cfg.BaseURL() + "/")
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	return resp.StatusCode >= 200 && resp.StatusCode < 400
}

func portFree(host string, port int) bool {
	ln, err := net.Listen("tcp", net.JoinHostPort(host, strconv.Itoa(port)))
	if err != nil {
		return false
	}
	_ = ln.Close()
	return true
}

func PortFree(cfg config.Config) bool {
	return portFree(cfg.Host, cfg.Port)
}
