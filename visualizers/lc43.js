window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

window.LeetCodeVisualizers[43] = {
    initialize(s, log, cv) {
        s.a = "123"; s.b = "456";
        if (cv && cv.str) {
            const parts = String(cv.str).split("|");
            if (parts[0]) s.a = parts[0].trim();
            if (parts[1]) s.b = parts[1].trim();
        }
        s.m = s.a.length; s.n = s.b.length;
        s.pos = Array(s.m + s.n).fill(0);
        s.i = s.m - 1; s.j = s.n - 1;
        s.result = "";
        log(`[Khởi tạo] Multiply "${s.a}" × "${s.b}"`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i < 0) {
            let k = 0;
            while (k < s.pos.length - 1 && s.pos[k] === 0) k++;
            s.result = s.pos.slice(k).join("");
            s.done = true;
            log(`[KẾT QUẢ] "${s.result}"`, "success");
            return;
        }
        const mul = (+s.a[s.i]) * (+s.b[s.j]);
        let sum = mul + s.pos[s.i + s.j + 1];
        s.pos[s.i + s.j + 1] = sum % 10;
        s.pos[s.i + s.j] += Math.floor(sum / 10);
        log(`(${s.a[s.i]})×(${s.b[s.j]})=${mul} → pos[${s.i + s.j + 1}]`, "info");
        s.j--;
        if (s.j < 0) { s.j = s.n - 1; s.i--; }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "i,j", value: s.done ? "—" : `(${s.i},${s.j})`, cls: "accent" },
            { label: "pos", value: s.pos.join(""), cls: "warn" },
            { label: "out", value: s.result || "…", cls: "success" }
        ]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Nhân từng cặp chữ số");
        sec.appendChild(VizCore.flowEquation([
            { label: "num1", val: s.a, cls: "current" },
            { op: "×" },
            { label: "num2", val: s.b, cls: "target" },
            { op: "=" },
            { label: "pos[]", val: s.pos.join(""), cls: "result" }
        ]));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "string", id: "lc-input-str", label: "num1|num2", value: cv.str || `${s.a}|${s.b}`, placeholder: "123|456" }
        ], cv);
    }
};

window.LeetCodeVisualizers[44] = (function () {
    function buildDp(s, p) {
        const m = s.length, n = p.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
        dp[0][0] = true;
        for (let j = 1; j <= n; j++)
            if (p[j - 1] === "*") dp[0][j] = dp[0][j - 1];
        for (let i = 1; i <= m; i++)
            for (let j = 1; j <= n; j++) {
                if (p[j - 1] === "*") dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                else if (p[j - 1] === "?" || s[i - 1] === p[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            }
        return dp;
    }

    return {
        initialize(s, log, cv) {
            s.s = "aa"; s.p = "*";
            if (cv && cv.str) s.s = VizCore.parseStr(cv.str);
            if (cv && cv.pattern) s.p = VizCore.parseStr(cv.pattern);
            s.dp = buildDp(s.s, s.p);
            s.i = 0; s.j = 0;
            s.done = false;
            log(`[Khởi tạo] Wildcard: s="${s.s}" p="${s.p}"`, "info");
        },
        step(s, log) {
            if (s.done) return;
            s.j++;
            if (s.j > s.p.length) {
                s.i++; s.j = 0;
            }
            if (s.i > s.s.length) {
                s.done = true;
                const ok = s.dp[s.s.length][s.p.length];
                log(`[KẾT QUẢ] dp[${s.s.length}][${s.p.length}] = ${ok}`, ok ? "success" : "warn");
                return;
            }
            const v = s.i && s.j ? s.dp[s.i][s.j] : (s.i === 0 && s.j === 0 ? true : s.j ? s.dp[0][s.j] : false);
            log(`dp[${s.i}][${s.j}] = ${v}`, v ? "info" : "warn");
        },
        render(s, c, st) {
            const ans = s.dp[s.s.length][s.p.length];
            VizCore.statsBar(st, [
                { label: "cell", value: `(${s.i},${s.j})`, cls: "accent" },
                { label: "match", value: s.done ? ans : "…", cls: s.done ? (ans ? "success" : "warn") : "" }
            ]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "Chuỗi s & pattern p");
            sec.appendChild(VizCore.charRow(s.s, { active: Math.max(0, s.i - 1) }));
            sec.appendChild(VizCore.charRow(s.p, { active: Math.max(0, s.j - 1) }));
            const grid = document.createElement("div");
            grid.style.cssText = "display:grid;grid-template-columns:repeat(" + (s.p.length + 1) + ",28px);gap:2px;margin-top:10px;font-size:0.65rem;";
            for (let i = 0; i <= s.s.length; i++)
                for (let j = 0; j <= s.p.length; j++) {
                    const el = document.createElement("div");
                    const on = i === s.i && j === s.j;
                    el.style.cssText = `width:26px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:4px;border:1px solid #334155;background:${s.dp[i][j] ? "#14532d44" : "#1e293b"};color:${on ? "#818cf8" : "#e2e8f0"};font-weight:${on ? "700" : "400"};`;
                    el.textContent = s.dp[i][j] ? "T" : "F";
                    grid.appendChild(el);
                }
            sec.appendChild(grid);
            c.appendChild(stage);
        },
        renderControls(s, c, cv) {
            VizCore.controls(c, [
                { type: "string", id: "lc-input-str", label: "s", value: cv.str ?? s.s },
                { type: "string", id: "lc-input-pattern", label: "p", value: cv.pattern ?? s.p }
            ], cv);
        }
    };
})();

window.LeetCodeVisualizers[45] = {
    initialize(s, log, cv) {
        s.nums = [2, 3, 1, 1, 4];
        VizCore.applyNums(s, cv, "nums", s.nums);
        s.end = 0; s.far = 0; s.steps = 0; s.i = 0;
        log(`[Khởi tạo] Jump Game II — greedy BFS`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i >= s.nums.length - 1) {
            s.done = true;
            log(`[KẾT QUẢ] ${s.steps} bước`, "success");
            return;
        }
        s.far = Math.max(s.far, s.i + s.nums[s.i]);
        if (s.i === s.end) {
            s.steps++;
            s.end = s.far;
            log(`i=${s.i}: hết tầng → steps=${s.steps}, end=${s.end}`, "info");
        } else {
            log(`i=${s.i}: far=${s.far}`, "info");
        }
        s.i++;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "i", value: s.done ? "—" : s.i, cls: "accent" },
            { label: "end", value: s.end, cls: "warn" },
            { label: "far", value: s.far, cls: "success" },
            { label: "steps", value: s.steps, cls: "success" }
        ]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Greedy — tầng [0..end] / xa nhất far");
        sec.appendChild(VizCore.arrayRow(s.nums, {
            active: s.done ? -1 : s.i,
            pointers: s.done ? [] : [{ idx: s.i, label: "i▼" }],
            found: [0, s.nums.length - 1, s.end].filter((v, idx, a) => a.indexOf(v) === idx && v >= 0 && v < s.nums.length)
        }));
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }
        ], cv);
    }
};
