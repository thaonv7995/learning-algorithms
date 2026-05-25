//go:build windows

package daemon

import (
	"fmt"
	"os/exec"
	"syscall"

	"github.com/thaonv/algorithms-explorer/internal/config"
)

func registerService(exe string, cfg config.Config) error {
	return fmt.Errorf("windows uses detached process")
}

func unregisterService() error {
	cmd := exec.Command("schtasks", "/Delete", "/TN", "AlgorithmsExplorer", "/F")
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	_ = cmd.Run()
	return nil
}
