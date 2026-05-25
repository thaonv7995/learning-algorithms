package config

import (
	"bufio"
	"os"
	"strconv"
	"strings"

	"github.com/thaonv/algorithms-explorer/internal/paths"
)

const (
	DefaultHost = "127.0.0.1"
	DefaultPort = 4173
)

type Config struct {
	Host string
	Port int
	Root string
}

func Load() Config {
	cfg := Config{
		Host: DefaultHost,
		Port: DefaultPort,
		Root: paths.WWWDir(),
	}
	loadFile(paths.ConfigFile(), &cfg)
	if v := os.Getenv("ALGO_EXPLORER_HOST"); v != "" {
		cfg.Host = v
	}
	if v := os.Getenv("ALGO_EXPLORER_PORT"); v != "" {
		if p, err := strconv.Atoi(v); err == nil {
			cfg.Port = p
		}
	}
	if v := os.Getenv("ALGO_EXPLORER_ROOT"); v != "" {
		cfg.Root = v
	}
	return cfg
}

func Save(cfg Config) error {
	if err := paths.EnsureDirs(); err != nil {
		return err
	}
	f, err := os.Create(paths.ConfigFile())
	if err != nil {
		return err
	}
	defer f.Close()
	w := bufio.NewWriter(f)
	_, _ = w.WriteString("ALGO_EXPLORER_HOST=" + cfg.Host + "\n")
	_, _ = w.WriteString("ALGO_EXPLORER_PORT=" + strconv.Itoa(cfg.Port) + "\n")
	_, _ = w.WriteString("ALGO_EXPLORER_ROOT=" + cfg.Root + "\n")
	return w.Flush()
}

func (c Config) BaseURL() string {
	return "http://" + c.Host + ":" + strconv.Itoa(c.Port)
}

func loadFile(path string, cfg *Config) {
	f, err := os.Open(path)
	if err != nil {
		return
	}
	defer f.Close()
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		k, v, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		switch strings.TrimSpace(k) {
		case "ALGO_EXPLORER_HOST":
			cfg.Host = strings.TrimSpace(v)
		case "ALGO_EXPLORER_PORT":
			if p, err := strconv.Atoi(strings.TrimSpace(v)); err == nil {
				cfg.Port = p
			}
		case "ALGO_EXPLORER_ROOT":
			cfg.Root = strings.TrimSpace(v)
		}
	}
}
