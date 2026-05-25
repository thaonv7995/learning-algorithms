package install

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime"

	"github.com/thaonv/algorithms-explorer/internal/config"
	"github.com/thaonv/algorithms-explorer/internal/paths"
)

func InstallFromBundle(selfExe, bundleDir string, cfg config.Config) error {
	if err := paths.EnsureDirs(); err != nil {
		return err
	}
	if err := config.Save(cfg); err != nil {
		return err
	}

	srcBin := selfExe
	dstBin := paths.BinaryPath()
	if err := copyFile(srcBin, dstBin); err != nil {
		return fmt.Errorf("copy binary: %w", err)
	}
	if runtime.GOOS != "windows" {
		_ = os.Chmod(dstBin, 0o755)
	}

	srcWWW := filepath.Join(bundleDir, "www")
	if _, err := os.Stat(filepath.Join(srcWWW, "index.html")); err != nil {
		srcWWW = filepath.Join(filepath.Dir(selfExe), "www")
	}
	if _, err := os.Stat(filepath.Join(srcWWW, "index.html")); err != nil {
		return fmt.Errorf("www bundle not found next to installer")
	}
	if err := copyTree(srcWWW, paths.WWWDir()); err != nil {
		return fmt.Errorf("copy www: %w", err)
	}

	if err := linkCLI(dstBin); err != nil {
		return err
	}
	return nil
}

func Uninstall() error {
	_ = os.Remove(paths.CLIWrapper())
	_ = os.RemoveAll(paths.InstallRoot())
	_ = os.RemoveAll(paths.StateDir())
	return nil
}

func linkCLI(dstBin string) error {
	if err := os.MkdirAll(paths.BinDir(), 0o755); err != nil {
		return err
	}
	link := paths.CLIWrapper()
	_ = os.Remove(link)
	if runtime.GOOS == "windows" {
		return copyFile(dstBin, link)
	}
	return os.Symlink(dstBin, link)
}

func copyFile(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()
	if err := os.MkdirAll(filepath.Dir(dst), 0o755); err != nil {
		return err
	}
	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer out.Close()
	_, err = io.Copy(out, in)
	return err
}

func copyTree(src, dst string) error {
	return filepath.WalkDir(src, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		rel, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}
		target := filepath.Join(dst, rel)
		if d.IsDir() {
			return os.MkdirAll(target, 0o755)
		}
		return copyFile(path, target)
	})
}
