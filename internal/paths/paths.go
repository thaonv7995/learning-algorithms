package paths

import (
	"os"
	"path/filepath"
	"runtime"
)

const AppName = "algorithms-explorer"

func HomeDir() string {
	if h, err := os.UserHomeDir(); err == nil {
		return h
	}
	return "."
}

func DataDir() string {
	if v := os.Getenv("ALGO_EXPLORER_DATA"); v != "" {
		return v
	}
	switch runtime.GOOS {
	case "windows":
		if base := os.Getenv("LOCALAPPDATA"); base != "" {
			return filepath.Join(base, AppName)
		}
		return filepath.Join(HomeDir(), AppName)
	default:
		if xdg := os.Getenv("XDG_DATA_HOME"); xdg != "" {
			return filepath.Join(xdg, AppName)
		}
		return filepath.Join(HomeDir(), ".local", "share", AppName)
	}
}

func StateDir() string {
	if v := os.Getenv("ALGO_EXPLORER_STATE"); v != "" {
		return v
	}
	switch runtime.GOOS {
	case "windows":
		if base := os.Getenv("LOCALAPPDATA"); base != "" {
			return filepath.Join(base, AppName, "state")
		}
		return filepath.Join(HomeDir(), AppName, "state")
	default:
		if xdg := os.Getenv("XDG_STATE_HOME"); xdg != "" {
			return filepath.Join(xdg, AppName)
		}
		return filepath.Join(HomeDir(), ".local", "state", AppName)
	}
}

func ConfigDir() string {
	if v := os.Getenv("ALGO_EXPLORER_CONFIG_DIR"); v != "" {
		return v
	}
	switch runtime.GOOS {
	case "windows":
		if base := os.Getenv("APPDATA"); base != "" {
			return filepath.Join(base, AppName)
		}
		return filepath.Join(HomeDir(), AppName, "config")
	default:
		if xdg := os.Getenv("XDG_CONFIG_HOME"); xdg != "" {
			return filepath.Join(xdg, AppName)
		}
		return filepath.Join(HomeDir(), ".config", AppName)
	}
}

func InstallRoot() string {
	return DataDir()
}

func WWWDir() string {
	if v := os.Getenv("ALGO_EXPLORER_ROOT"); v != "" {
		return v
	}
	return filepath.Join(InstallRoot(), "www")
}

func BinaryPath() string {
	return filepath.Join(InstallRoot(), binName())
}

func PIDFile() string {
	return filepath.Join(StateDir(), "algo-explorer.pid")
}

func LogFile() string {
	return filepath.Join(StateDir(), "algo-explorer.log")
}

func ConfigFile() string {
	return filepath.Join(ConfigDir(), "config.env")
}

func BinDir() string {
	switch runtime.GOOS {
	case "windows":
		if base := os.Getenv("LOCALAPPDATA"); base != "" {
			return filepath.Join(base, "Programs", AppName, "bin")
		}
		return filepath.Join(HomeDir(), "AppData", "Local", "Programs", AppName, "bin")
	default:
		return filepath.Join(HomeDir(), ".local", "bin")
	}
}

func CLIWrapper() string {
	name := "algo-explorer"
	if runtime.GOOS == "windows" {
		name += ".exe"
	}
	return filepath.Join(BinDir(), name)
}

func LaunchAgentPlist() string {
	return filepath.Join(HomeDir(), "Library", "LaunchAgents", "com.algorithms-explorer.server.plist")
}

func SystemdUnit() string {
	if xdg := os.Getenv("XDG_CONFIG_HOME"); xdg != "" {
		return filepath.Join(xdg, "systemd", "user", AppName+".service")
	}
	return filepath.Join(HomeDir(), ".config", "systemd", "user", AppName+".service")
}

func binName() string {
	if runtime.GOOS == "windows" {
		return "algo-explorer.exe"
	}
	return "algo-explorer"
}

func EnsureDirs() error {
	for _, d := range []string{InstallRoot(), WWWDir(), StateDir(), ConfigDir()} {
		if err := os.MkdirAll(d, 0o755); err != nil {
			return err
		}
	}
	return nil
}
