window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

function _parseIntervals(text) {
    if (!text || !String(text).trim()) return [[1, 3], [2, 6], [8, 10]];
    return String(text).split("|").map(p => p.trim()).filter(Boolean)
        .map(p => p.split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x)))
        .filter(a => a.length >= 2).map(a => [a[0], a[1]]);
}

window.LeetCodeVisualizers[56] = {
    initialize(s, log, cv) {
        s.iv = [[1, 3], [2, 6], [8, 10]];
        if (cv && cv.str) s.iv = _parseIntervals(cv.str);
        s.iv.sort((a, b) => a[0] - b[0]);
        s.res = [s.iv[0].slice()]; s.i = 1;
        log(`[Khởi tạo] Merge Intervals`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i >= s.iv.length) { s.done = true; log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); return; }
        const [a, b] = s.iv[s.i];
        if (a <= s.res[s.res.length - 1][1]) {
            s.res[s.res.length - 1][1] = Math.max(s.res[s.res.length - 1][1], b);
            log(`Merge [${a},${b}] → ${JSON.stringify(s.res[s.res.length - 1])}`, "info");
        } else { s.res.push([a, b]); log(`Thêm [${a},${b}]`, "info"); }
        s.i++;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "merged", value: s.res.length, cls: "success" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Intervals");
        s.res.forEach(iv => {
            const d = document.createElement("div");
            d.style.cssText = "font-family:monospace;font-size:0.75rem;margin:3px 0;color:#86efac;";
            d.textContent = `[${iv[0]}, ${iv[1]}]`;
            sec.appendChild(d);
        });
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "intervals (a,b|c,d)", value: cv.str || "1,3|2,6|8,10" }], cv);
    }
};

window.LeetCodeVisualizers[57] = {
    initialize(s, log, cv) {
        s.iv = [[1, 3], [6, 9]]; s.ni = [2, 5];
        if (cv && cv.str) s.iv = _parseIntervals(cv.str);
        if (cv && cv.nums) { const p = VizCore.parseNums(cv.nums); if (p.length >= 2) s.ni = [p[0], p[1]]; }
        s.phase = "before"; s.i = 0; s.res = [];
        log(`[Khởi tạo] Insert ${JSON.stringify(s.ni)}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.phase === "before") {
            if (s.i < s.iv.length && s.iv[s.i][1] < s.ni[0]) {
                s.res.push(s.iv[s.i].slice()); log(`Trước: ${JSON.stringify(s.iv[s.i])}`, "info"); s.i++; return;
            }
            s.phase = "merge"; log("Bắt đầu merge overlap", "info"); return;
        }
        if (s.phase === "merge") {
            if (s.i < s.iv.length && s.iv[s.i][0] <= s.ni[1]) {
                s.ni[0] = Math.min(s.ni[0], s.iv[s.i][0]);
                s.ni[1] = Math.max(s.ni[1], s.iv[s.i][1]);
                log(`Merge ${JSON.stringify(s.iv[s.i])}`, "info"); s.i++; return;
            }
            s.res.push(s.ni.slice()); s.phase = "after"; log(`Chèn ${JSON.stringify(s.ni)}`, "success"); return;
        }
        if (s.i >= s.iv.length) { s.done = true; log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); return; }
        s.res.push(s.iv[s.i].slice()); s.i++;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "phase", value: s.phase, cls: "accent" }, { label: "new", value: `[${s.ni}]`, cls: "warn" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Result").appendChild(document.createTextNode(s.res.map(x => `[${x}]`).join(" ") || "…"));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "string", id: "lc-input-str", label: "intervals", value: cv.str || "1,3|6,9" },
            { type: "array", id: "lc-input-nums", label: "newInterval", values: VizCore.arrayValues(cv, s, s.ni) }
        ], cv);
    }
};

window.LeetCodeVisualizers[58] = {
    initialize(s, log, cv) {
        s.str = "Hello World";
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
        s.i = s.str.length - 1; s.len = 0; s.inWord = false;
        log(`[Khởi tạo] Length of Last Word`, "info");
    },
    step(s, log) {
        if (s.done) return;
        while (s.i >= 0 && s.str[s.i] === " ") { s.i--; log("Bỏ space trailing", "info"); if (s.i < 0) break; }
        if (s.i < 0) { s.done = true; log(`[KẾT QUẢ] ${s.len}`, "success"); return; }
        if (!s.inWord) { s.inWord = true; log(`Bắt đầu đếm tại '${s.str[s.i]}'`, "info"); }
        s.len++; s.i--;
        if (s.i < 0 || s.str[s.i] === " ") {
            s.done = true; log(`[KẾT QUẢ] ${s.len}`, "success");
        }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "i", value: s.i, cls: "accent" }, { label: "len", value: s.len, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Scan từ phải").appendChild(VizCore.charRow(s.str, { active: s.i >= 0 ? s.i : -1 }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str ?? s.str }], cv);
    }
};

window.LeetCodeVisualizers[59] = {
    initialize(s, log, cv) {
        s.n = 3;
        if (cv && cv.target !== undefined && cv.target !== "") s.n = parseInt(cv.target, 10) || 3;
        s.m = Array.from({ length: s.n }, () => Array(s.n).fill(0));
        s.t = 0; s.b = s.n - 1; s.l = 0; s.r = s.n - 1; s.val = 1; s.dir = 0;
        log(`[Khởi tạo] Spiral Matrix II n=${s.n}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.t > s.b || s.l > s.r) { s.done = true; log(`[KẾT QUẢ] xong`, "success"); return; }
        if (s.dir === 0) {
            for (let c = s.l; c <= s.r; c++) { s.m[s.t][c] = s.val++; }
            s.t++; s.dir = 1; log("Fill →", "info");
        } else if (s.dir === 1) {
            for (let i = s.t; i <= s.b; i++) s.m[i][s.r] = s.val++;
            s.r--; s.dir = 2; log("Fill ↓", "info");
        } else if (s.dir === 2 && s.t <= s.b) {
            for (let c = s.r; c >= s.l; c--) s.m[s.b][c] = s.val++;
            s.b--; s.dir = 3; log("Fill ←", "info");
        } else if (s.dir === 3 && s.l <= s.r) {
            for (let i = s.b; i >= s.t; i--) s.m[i][s.l] = s.val++;
            s.l++; s.dir = 0; log("Fill ↑", "info");
        } else s.dir = (s.dir + 1) % 4;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "val", value: s.val - 1, cls: "accent" }, { label: "dir", value: ["→", "↓", "←", "↑"][s.dir], cls: "warn" }]);
        const stage = VizCore.stage();
        const grid = document.createElement("div");
        grid.style.cssText = "display:inline-flex;flex-direction:column;gap:2px;";
        s.m.forEach(row => {
            const r = document.createElement("div");
            r.style.cssText = "display:flex;gap:2px;";
            row.forEach(v => {
                const el = document.createElement("div");
                el.style.cssText = "width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:0.7rem;border:1px solid #475569;border-radius:3px;background:#1e293b;color:#f1f5f9;";
                el.textContent = v || "·";
                r.appendChild(el);
            });
            grid.appendChild(r);
        });
        VizCore.section(stage, 1, "Fill spiral").appendChild(grid);
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
    }
};

window.LeetCodeVisualizers[60] = {
    initialize(s, log, cv) {
        s.n = 3; s.k = 3;
        if (cv && cv.target !== undefined && cv.target !== "") s.n = parseInt(cv.target, 10) || 3;
        if (cv && cv.nums) { const p = VizCore.parseNums(cv.nums); if (p[0]) s.k = p[0]; }
        s.fact = [1]; for (let i = 1; i < s.n; i++) s.fact[i] = s.fact[i - 1] * i;
        s.nums = Array.from({ length: s.n }, (_, i) => i + 1);
        s.k--; s.pos = 0; s.res = "";
        log(`[Khởi tạo] k-th permutation n=${s.n} k=${s.k + 1}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.pos >= s.n) { s.done = true; log(`[KẾT QUẢ] "${s.res}"`, "success"); return; }
        const i = s.n - s.pos;
        const idx = Math.floor(s.k / s.fact[i - 1]);
        const pick = s.nums.splice(idx, 1)[0];
        s.res += String(pick);
        s.k -= idx * s.fact[i - 1];
        log(`Chọn ${pick} (idx=${idx}, còn ${JSON.stringify(s.nums)})`, "info");
        s.pos++;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [{ label: "pick", value: s.res || "—", cls: "success" }, { label: "left", value: s.nums.join(","), cls: "accent" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Factorial decomposition").appendChild(
            VizCore.arrayRow(s.nums.length ? s.nums : ["done"], {})
        );
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "target", id: "lc-input-target", label: "n", value: cv.target ?? 3 },
            { type: "array", id: "lc-input-nums", label: "k", values: VizCore.arrayValues(cv, s, [3]) }
        ], cv);
    }
};
