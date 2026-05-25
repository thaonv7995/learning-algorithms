window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

(function () {
    window.LeetCodeVisualizers[96] = {
        initialize(s, log, cv) {
            s.n = 3;
            if (cv && cv.target != null && cv.target !== "") s.n = parseInt(cv.target, 10) || 3;
            if (s.n < 1 || s.n > 19) {
                s.vizError = "n phải từ 1 đến 19";
                s.n = 3;
            }
            s.dp = Array(s.n + 1).fill(0);
            s.dp[0] = 1;
            s.nodes = 1;
            s.root = 1;
            s.done = false;
            log(`[Khởi tạo] Unique BST — n=${s.n}, DP Catalan`, "info");
        },
        step(s, log) {
            if (s.vizError || s.done) return;
            if (s.nodes > s.n) {
                s.ans = s.dp[s.n];
                s.done = true;
                log(`[KẾT QUẢ] numTrees(${s.n}) = ${s.ans}`, "success");
                return;
            }
            if (s.root <= s.nodes) {
                const add = s.dp[s.root - 1] * s.dp[s.nodes - s.root];
                s.dp[s.nodes] += add;
                log(`nodes=${s.nodes} root=${s.root}: +${add} → dp[${s.nodes}]=${s.dp[s.nodes]}`, "info");
                s.root++;
                return;
            }
            log(`Hoàn tất dp[${s.nodes}]=${s.dp[s.nodes]}`, "success");
            s.nodes++;
            s.root = 1;
        },
        render(s, c, st) {
            if (s.vizError) {
                VizCore.statsBar(st, [{ label: "Lỗi", value: s.vizError, cls: "warn" }]);
            } else {
                VizCore.statsBar(st, [
                    { label: "n", value: s.n, cls: "accent" },
                    { label: "nodes", value: s.done ? "done" : s.nodes, cls: "warn" },
                    { label: "dp[n]", value: s.done ? s.ans : (s.dp[s.n] || "—"), cls: "success" }
                ]);
            }
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Bảng DP Catalan");
            s.dp.forEach((v, i) => {
                if (i > s.n) return;
                const d = document.createElement("span");
                d.style.cssText = `margin:0 6px;font-family:monospace;color:${!s.done && i === s.nodes ? "#38bdf8" : "#86efac"}`;
                d.textContent = `G(${i})=${v}`;
                sec.appendChild(d);
            });
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [{
                id: "lc-input-target", label: "n", type: "target",
                value: cv.target != null ? cv.target : s.n
            }], cv);
        }
    };
})();
