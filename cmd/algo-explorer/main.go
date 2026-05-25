package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/thaonv/algorithms-explorer/internal/config"
	"github.com/thaonv/algorithms-explorer/internal/daemon"
	"github.com/thaonv/algorithms-explorer/internal/install"
	"github.com/thaonv/algorithms-explorer/internal/paths"
	"github.com/thaonv/algorithms-explorer/internal/server"
)

var version = "1.0.0-dev"

func main() {
	if len(os.Args) < 2 {
		os.Args = append(os.Args, "serve")
	}
	cmd := os.Args[1]
	args := os.Args[2:]

	switch cmd {
	case "serve":
		runServe(args)
	case "start":
		runStart()
	case "stop":
		runStop()
	case "restart":
		runRestart()
	case "status":
		runStatus()
	case "open":
		runOpen()
	case "logs":
		runLogs(args)
	case "install":
		runInstall(args)
	case "uninstall":
		runUninstall()
	case "version", "-v", "--version":
		fmt.Println("algo-explorer", version)
	default:
		fmt.Fprintf(os.Stderr, "unknown command: %s\n", cmd)
		printUsage()
		os.Exit(1)
	}
}

func printUsage() {
	fmt.Fprintf(os.Stderr, `algo-explorer %s — local server for Algorithms Explorer

Usage:
  algo-explorer serve [--background] [--port N] [--host H]
  algo-explorer start|stop|restart|status
  algo-explorer open
  algo-explorer logs [lines]
  algo-explorer install [--port N] [--bundle DIR]
  algo-explorer uninstall
  algo-explorer version

`, version)
}

func loadCfg() config.Config {
	return config.Load()
}

func selfExe() string {
	exe, err := os.Executable()
	if err != nil {
		return os.Args[0]
	}
	return exe
}

func runServe(args []string) {
	background := false
	cfg := loadCfg()
	for i := 0; i < len(args); i++ {
		switch args[i] {
		case "--background":
			background = true
		case "--port":
			if i+1 < len(args) {
				if p, err := strconv.Atoi(args[i+1]); err == nil {
					cfg.Port = p
				}
				i++
			}
		case "--host":
			if i+1 < len(args) {
				cfg.Host = args[i+1]
				i++
			}
		case "--root":
			if i+1 < len(args) {
				cfg.Root = args[i+1]
				i++
			}
		}
	}
	if cfg.Root == "" || cfg.Root == paths.WWWDir() {
		if devRoot := daemon.ResolveWWWFromExe(selfExe()); devRoot != "" {
			if _, err := os.Stat(devRoot); err == nil {
				cfg.Root = devRoot
			}
		}
	}

	logger := log.Default()
	if background {
		logFile, err := daemon.SetupLogger()
		if err != nil {
			log.Fatal(err)
		}
		defer logFile.Close()
		logger = log.New(logFile, "", log.LstdFlags)
		_ = daemon.WritePID(os.Getpid())
		defer os.Remove(paths.PIDFile())
	}

	if err := server.New(cfg, logger).ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func runStart() {
	cfg := loadCfg()
	if err := daemon.Start(cfg, paths.BinaryPath()); err != nil {
		if err2 := daemon.Start(cfg, selfExe()); err2 != nil {
			log.Fatal(err2)
		}
	}
	fmt.Println("started —", cfg.BaseURL())
}

func runStop() {
	if err := daemon.Stop(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("stopped")
}

func runRestart() {
	cfg := loadCfg()
	exe := paths.BinaryPath()
	if _, err := os.Stat(exe); err != nil {
		exe = selfExe()
	}
	if err := daemon.Restart(cfg, exe); err != nil {
		log.Fatal(err)
	}
	fmt.Println("restarted —", cfg.BaseURL())
}

func runStatus() {
	cfg := loadCfg()
	msg, err := daemon.Status(cfg)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(msg)
}

func runOpen() {
	cfg := loadCfg()
	if err := daemon.OpenBrowser(cfg.BaseURL()); err != nil {
		log.Fatal(err)
	}
}

func runLogs(args []string) {
	n := 40
	if len(args) > 0 {
		if v, err := strconv.Atoi(args[0]); err == nil {
			n = v
		}
	}
	if err := daemon.TailLogs(n); err != nil {
		log.Fatal(err)
	}
}

func runInstall(args []string) {
	cfg := loadCfg()
	bundleDir := "."
	for i := 0; i < len(args); i++ {
		switch args[i] {
		case "--port":
			if i+1 < len(args) {
				if p, err := strconv.Atoi(args[i+1]); err == nil {
					cfg.Port = p
				}
				i++
			}
		case "--host":
			if i+1 < len(args) {
				cfg.Host = args[i+1]
				i++
			}
		case "--bundle":
			if i+1 < len(args) {
				bundleDir = args[i+1]
				i++
			}
		}
	}
	cfg.Root = paths.WWWDir()
	if err := install.InstallFromBundle(selfExe(), bundleDir, cfg); err != nil {
		log.Fatal(err)
	}
	fmt.Println("installed to", paths.InstallRoot())
}

func runUninstall() {
	_ = daemon.Stop()
	_ = daemon.UnregisterService()
	if err := install.Uninstall(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("uninstalled")
}
