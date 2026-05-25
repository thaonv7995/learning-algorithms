window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

function _lc61Grid(rows, opts) {
    opts = opts || {};
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:inline-flex;flex-direction:column;gap:3px;padding:6px;background:#0f172a;border-radius:8px;border:1px solid #334155;";
    rows.forEach((row, ri) => {
        const rowEl = document.createElement("div");
        rowEl.style.cssText = "display:flex;gap:3px;";
        row.forEach((cell, ci) => {
            const on = opts.active && opts.active[0] === ri && opts.active[1] === ci;
            const obs = opts.obstacle && opts.obstacle[ri] && opts.obstacle[ri][ci];
            const el = document.createElement("div");
            el.style.cssText = `min-width:32px;height:32px;padding:0 4px;display:flex;align-items:center;justify-content:center;border-radius:4px;font-family:monospace;font-size:0.7rem;border:1px solid ${on ? "#818cf8" : obs ? "#ef4444" : "#475569"};background:${on ? "#818cf833" : obs ? "#7f1d1d55" : "#1e293b"};color:${obs ? "#fca5a5" : "#f1f5f9"};font-weight:${on ? "700" : "400"};`;
            el.textContent = cell;
            rowEl.appendChild(el);
        });
        wrap.appendChild(rowEl);
    });
    return wrap;
}

function _parseGrid(text, fallback) {
    if (!text || !String(text).trim()) return fallback.map(r => r.slice());
    const rows = String(text).trim().split(/\r?\n/).map(l =>
        l.split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x))
    ).filter(r => r.length);
    return rows.length ? rows : fallback.map(r => r.slice());
}

window.LeetCodeVisualizers[61] = {
    initialize(s, log, cv) {
        s.list = [1, 2, 3, 4, 5];
        s.k = 2;
        VizCore.applyNums(s, cv, "nums", s.list);
        if (cv && cv.target !== undefined && cv.target !== "") s.k = parseInt(cv.target, 10) || 0;
        s.n = s.list.length;
        s.kEff = s.n ? s.k % s.n : 0;
        s.phase = "init";
        s.split = -1;
        log(`[Khởi tạo] Rotate List k=${s.k} → k%len=${s.kEff}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.phase === "init") {
            if (!s.list.length || s.kEff === 0) {
                s.done = true;
                s.outputText = String(`[${s.list.join("→")}] (không đổi)`); log(`[KẾT QUẢ] [${s.list.join("→")}] (không đổi)`, "success");
                s.result = s.list.slice();
                return;
            }
            s.split = s.n - s.kEff - 1;
            s.phase = "split";
            log(`len=${s.n}, cắt sau index ${s.split}`, "info");
            return;
        }
        if (s.phase === "split") {
            s.result = s.list.slice(s.split + 1).concat(s.list.slice(0, s.split + 1));
            s.done = true;
            s.outputText = String(`[${s.result.join("→")}]`); log(`[KẾT QUẢ] [${s.result.join("→")}]`, "success");
        }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "k", value: s.k, cls: "warn" },
            { label: "k%len", value: s.kEff, cls: "accent" },
            { label: "split@", value: s.split >= 0 ? s.split : "—", cls: "success" }
        ]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, s.done ? "Sau xoay" : "Linked list");
        const arr = s.done ? s.result : s.list;
        const ptrs = [];
        if (s.split >= 0 && !s.done) ptrs.push({ idx: s.split, label: "tail▼" }, { idx: Math.min(s.split + 1, arr.length - 1), label: "head▼" });
        sec.appendChild(VizCore.arrayRow(arr, { pointers: ptrs }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "list", values: VizCore.arrayValues(cv, s, s.list) },
            { type: "target", id: "lc-input-target", label: "k", value: cv.target ?? s.k }
        ], cv);
    }
};

window.LeetCodeVisualizers[62] = {
    initialize(s, log, cv) {
        s.m = 3; s.n = 7;
        if (cv && cv.nums) {
            const p = VizCore.parseNums(cv.nums);
            if (p.length >= 2) { s.m = p[0]; s.n = p[1]; }
        }
        s.dp = Array.from({ length: s.m }, () => Array(s.n).fill(0));
        for (let j = 0; j < s.n; j++) s.dp[0][j] = 1;
        for (let i = 0; i < s.m; i++) s.dp[i][0] = 1;
        s.r = 1; s.c = 1;
        log(`[Khởi tạo] Unique Paths ${s.m}×${s.n}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.r >= s.m) {
            s.done = true;
            s.outputText = String(`dp[${s.m - 1}][${s.n - 1}] = ${s.dp[s.m - 1][s.n - 1]}`); log(`[KẾT QUẢ] dp[${s.m - 1}][${s.n - 1}] = ${s.dp[s.m - 1][s.n - 1]}`, "success");
            return;
        }
        s.dp[s.r][s.c] = s.dp[s.r - 1][s.c] + s.dp[s.r][s.c - 1];
        log(`dp[${s.r}][${s.c}] = ${s.dp[s.r - 1][s.c]} + ${s.dp[s.r][s.c - 1]} = ${s.dp[s.r][s.c]}`, "info");
        s.c++;
        if (s.c >= s.n) { s.c = 1; s.r++; }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "cell", value: s.done ? "done" : `(${s.r},${s.c})`, cls: "accent" },
            { label: "paths", value: s.done ? s.dp[s.m - 1][s.n - 1] : (s.r < s.m && s.c < s.n ? s.dp[s.r][s.c] || "…" : "…"), cls: "success" }
        ]);
        const stage = VizCore.stage();
        const mat = s.dp.map(row => row.map(v => v === 0 && !s.done ? "·" : String(v)));
        VizCore.section(stage, 1, "Bảng DP — số đường").appendChild(
            _lc61Grid(mat, { active: s.done ? null : [s.r, s.c] })
        );
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "m,n", values: VizCore.arrayValues(cv, s, [s.m, s.n]) }
        ], cv);
    }
};

window.LeetCodeVisualizers[63] = {
    initialize(s, log, cv) {
        s.grid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
        if (cv && cv.str) s.grid = _parseGrid(cv.str, s.grid);
        s.m = s.grid.length; s.n = s.grid[0].length;
        s.dp = Array(s.n).fill(0); s.dp[0] = s.grid[0][0] ? 0 : 1;
        s.r = 0; s.c = 0;
        log(`[Khởi tạo] Unique Paths II — có chướng ngại`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.r >= s.m) {
            s.done = true;
            s.outputText = String(`${s.dp[s.n - 1]} đường`); log(`[KẾT QUẢ] ${s.dp[s.n - 1]} đường`, "success");
            return;
        }
        const blocked = s.grid[s.r][s.c] === 1;
        if (blocked) {
            s.dp[s.c] = 0;
            log(`(${s.r},${s.c}) obstacle → dp=0`, "warn");
        } else if (s.c > 0) {
            s.dp[s.c] += s.dp[s.c - 1];
            log(`(${s.r},${s.c}) dp[${s.c}] = ${s.dp[s.c]}`, "info");
        } else if (s.r > 0) {
            log(`(${s.r},${s.c}) dp[0] = ${s.dp[0]}`, "info");
        }
        s.c++;
        if (s.c >= s.n) { s.c = 0; s.r++; }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "cell", value: s.done ? "done" : `(${s.r},${s.c})`, cls: "accent" },
            { label: "dp row", value: `[${s.dp.join(",")}]`, cls: "success" }
        ]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Lưới + DP hàng hiện tại").appendChild(
            _lc61Grid(s.grid.map(r => r.map(v => v ? "X" : "·")), {
                active: s.done ? null : [s.r, s.c],
                obstacle: s.grid
            })
        );
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "textarea", id: "lc-input-str", label: "grid (0/1, mỗi hàng một dòng)", value: cv.str || "0,0,0\n0,1,0\n0,0,0", placeholder: "0,0,0\n0,1,0" }
        ], cv);
    }
};

window.LeetCodeVisualizers[64] = {
    initialize(s, log, cv) {
        s.grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]];
        if (cv && cv.str) s.grid = _parseGrid(cv.str, s.grid);
        s.m = s.grid.length; s.n = s.grid[0].length;
        s.dp = s.grid[0].slice();
        for (let j = 1; j < s.n; j++) s.dp[j] += s.dp[j - 1];
        s.r = 1; s.c = 1;
        log(`[Khởi tạo] Minimum Path Sum`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.r >= s.m) {
            s.done = true;
            s.outputText = String(`min sum = ${s.dp[s.n - 1]}`); log(`[KẾT QUẢ] min sum = ${s.dp[s.n - 1]}`, "success");
            return;
        }
        if (s.c === 0) {
            s.dp[0] += s.grid[s.r][0];
            log(`(${s.r},0) dp[0] = ${s.dp[0]}`, "info");
        } else {
            const up = s.dp[s.c], left = s.dp[s.c - 1];
            s.dp[s.c] = s.grid[s.r][s.c] + Math.min(up, left);
            log(`(${s.r},${s.c}) = ${s.grid[s.r][s.c]} + min(${up},${left}) = ${s.dp[s.c]}`, "info");
        }
        s.c++;
        if (s.c >= s.n) { s.c = 0; s.r++; }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "cell", value: s.done ? "done" : `(${s.r},${s.c})`, cls: "accent" },
            { label: "min", value: s.done ? s.dp[s.n - 1] : "…", cls: "success" }
        ]);
        const stage = VizCore.stage();
        const show = s.grid.map((row, ri) => row.map((v, ci) => {
            if (ri === 0 && ci <= (s.r === 0 && !s.done ? s.c : s.n - 1)) return s.dp[ci] ?? v;
            if (s.done || ri < s.r || (ri === s.r && ci <= s.c)) return s.dp[ci] !== undefined && ri === s.r ? s.dp[ci] : v;
            return v;
        }));
        VizCore.section(stage, 1, "Chi phí lưới / DP").appendChild(
            _lc61Grid(s.grid, { active: s.done ? null : [s.r, s.c] })
        );
        const dpRow = document.createElement("div");
        dpRow.style.cssText = "font-family:monospace;font-size:0.75rem;color:#86efac;margin-top:6px;";
        dpRow.textContent = `dp row: [${s.dp.join(", ")}]`;
        stage.appendChild(dpRow);
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "textarea", id: "lc-input-str", label: "grid (mỗi hàng một dòng)", value: cv.str || "1,3,1\n1,5,1\n4,2,1" }
        ], cv);
    }
};

window.LeetCodeVisualizers[65] = {
    initialize(s, log, cv) {
        s.str = "2e10";
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
        s.i = 0;
        s.seenD = false; s.seenDot = false; s.seenE = false;
        log(`[Khởi tạo] Valid Number — FSM`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i >= s.str.length) {
            s.done = true;
            const ok = s.seenD;
            s.outputText = String(`${ok ? "valid" : "invalid"} (cần ít nhất 1 digit)`); log(`[KẾT QUẢ] ${ok ? "valid" : "invalid"} (cần ít nhất 1 digit)`, ok ? "success" : "warn");
            s.valid = ok;
            return;
        }
        const c = s.str[s.i];
        if (c >= "0" && c <= "9") {
            s.seenD = true;
            log(`'${c}' → digit, seenD=true`, "info");
        } else if (c === "+" || c === "-") {
            if (s.i && s.str[s.i - 1] !== "e" && s.str[s.i - 1] !== "E") {
                s.done = true; s.valid = false;
                log(`'${c}' sai vị trí → invalid`, "warn");
                return;
            }
            log(`'${c}' → sign sau e/E`, "info");
        } else if (c === "e" || c === "E") {
            if (s.seenE || !s.seenD) {
                s.done = true; s.valid = false;
                log(`'${c}' invalid (e lặp hoặc chưa có digit)`, "warn");
                return;
            }
            s.seenE = true; s.seenD = false; s.seenDot = true;
            log(`'${c}' → exponent, reset digit`, "info");
        } else if (c === ".") {
            if (s.seenDot || s.seenE) {
                s.done = true; s.valid = false;
                log(`'${c}' invalid (dot lặp hoặc sau e)`, "warn");
                return;
            }
            s.seenDot = true;
            log(`'${c}' → decimal point`, "info");
        } else {
            s.done = true; s.valid = false;
            log(`'${c}' ký tự lạ → invalid`, "warn");
            return;
        }
        s.i++;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "i", value: s.i, cls: "accent" },
            { label: "digit", value: s.seenD ? "✓" : "✗", cls: s.seenD ? "success" : "warn" },
            { label: "dot/e", value: `${s.seenDot ? "·" : ""}${s.seenE ? "e" : ""}` || "—", cls: "" }
        ]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Duyệt chuỗi").appendChild(
            VizCore.charRow(s.str, { active: s.done ? -1 : s.i, dimmed: idx => idx < s.i })
        );
        if (s.done) {
            const tag = document.createElement("div");
            tag.style.cssText = `margin-top:8px;font-weight:700;color:${s.valid ? "#86efac" : "#fca5a5"};`;
            tag.textContent = s.valid ? "✓ Valid number" : "✗ Invalid";
            stage.appendChild(tag);
        }
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str ?? s.str }], cv);
    }
};
