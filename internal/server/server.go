package server

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/thaonv/algorithms-explorer/internal/config"
)

type Server struct {
	cfg    config.Config
	logger *log.Logger
}

func New(cfg config.Config, logger *log.Logger) *Server {
	if logger == nil {
		logger = log.Default()
	}
	return &Server{cfg: cfg, logger: logger}
}

func (s *Server) ListenAndServe() error {
	root, err := filepath.Abs(s.cfg.Root)
	if err != nil {
		return err
	}
	if st, err := os.Stat(root); err != nil || !st.IsDir() {
		return fmt.Errorf("www root not found: %s (run install first or set ALGO_EXPLORER_ROOT)", root)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/", s.handle(root))

	addr := net.JoinHostPort(s.cfg.Host, fmt.Sprintf("%d", s.cfg.Port))
	srv := &http.Server{
		Addr:              addr,
		Handler:           mux,
		ReadHeaderTimeout: 10 * time.Second,
	}

	s.logger.Printf("Algorithms Explorer serving %s at %s", root, s.cfg.BaseURL())
	return srv.ListenAndServe()
}

func (s *Server) handle(root string) http.HandlerFunc {
	fs := http.FileServer(http.Dir(root))
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			http.ServeFile(w, r, filepath.Join(root, "index.html"))
			return
		}
		clean := filepath.Clean(r.URL.Path)
		if strings.Contains(clean, "..") {
			http.Error(w, "forbidden", http.StatusForbidden)
			return
		}
		target := filepath.Join(root, filepath.FromSlash(strings.TrimPrefix(clean, "/")))
		if info, err := os.Stat(target); err == nil && info.IsDir() {
			index := filepath.Join(target, "index.html")
			if _, err := os.Stat(index); err == nil {
				http.ServeFile(w, r, index)
				return
			}
		}
		fs.ServeHTTP(w, r)
	}
}
