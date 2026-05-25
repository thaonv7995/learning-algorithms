.PHONY: build pack serve install-local start stop status clean

VERSION ?= 1.0.0-dev
DIST := dist
BIN := $(DIST)/algo-explorer

build:
	@mkdir -p $(DIST)
	go build -ldflags "-s -w -X main.version=$(VERSION)" -o $(BIN) ./cmd/algo-explorer/

pack: build
	bash scripts/pack-www.sh $(DIST)/www

serve: pack
	ALGO_EXPLORER_ROOT=$(DIST)/www $(BIN) serve --port 27909

install-local: pack
	$(BIN) install --bundle $(DIST) --port 27909
	@echo "Run: ~/.local/bin/algo-explorer start"

start:
	~/.local/bin/algo-explorer start || $(BIN) start

stop:
	~/.local/bin/algo-explorer stop || $(BIN) stop

status:
	~/.local/bin/algo-explorer status || $(BIN) status

clean:
	rm -rf $(DIST)

cross:
	GOOS=darwin GOARCH=arm64 go build -o $(DIST)/algo-explorer-darwin-arm64 ./cmd/algo-explorer/
	GOOS=linux GOARCH=amd64 go build -o $(DIST)/algo-explorer-linux-amd64 ./cmd/algo-explorer/
	GOOS=windows GOARCH=amd64 go build -o $(DIST)/algo-explorer-windows-amd64.exe ./cmd/algo-explorer/
