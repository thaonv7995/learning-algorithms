window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[10] = {
    initialize(s, log, cv) {
        s.str = "aa"; s.pat = "a*";
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
        if (cv && cv.pattern) s.pat = VizCore.parseStr(cv.pattern);
        s.i = 0; s.j = 0;
        s.dp = null;
        s.fillIdx = 0;
        s.m = s.str.length; s.n = s.pat.length;
        s._buildDp();
        log(`[Khởi tạo] Regex match s="${s.str}" p="${s.pat}"`, "info");
    },
    _buildDp(s) {
        const m = s.m, n = s.n;
        s.dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
        s.dp[0][0] = true;
        for (let j = 2; j <= n; j += 2)
            if (s.pat[j - 1] === "*") s.dp[0][j] = s.dp[0][j - 2];
        for (let i = 1; i <= m; i++)
            for (let j = 1; j <= n; j++) {
                if (s.pat[j - 1] === "*") {
                    s.dp[i][j] = s.dp[i][j - 2];
                    if (s.pat[j - 2] === "." || s.pat[j - 2] === s.str[i - 1])
                        s.dp[i][j] = s.dp[i][j] || s.dp[i - 1][j];
                } else if (s.pat[j - 1] === "." || s.pat[j - 1] === s.str[i - 1])
                    s.dp[i][j] = s.dp[i - 1][j - 1];
            }
        s.result = s.dp[m][n];
    },
    step(s, log) {
        const cells = (s.m + 1) * (s.n + 1);
        if (s.fillIdx >= cells) {
            s.done = true;
            log(`[KẾT QUẢ] ${s.result}`, "success");
            return;
        }
        const i = Math.floor(s.fillIdx / (s.n + 1));
        const j = s.fillIdx % (s.n + 1);
        s.i = i; s.j = j;
        log(`DP[${i}][${j}] = ${s.dp[i][j]} (s[0..${i - 1}] vs p[0..${j - 1}])`, s.dp[i][j] ? "success" : "info");
        s.fillIdx++;
        if (s.fillIdx >= cells) {
            s.done = true;
            log(`[KẾT QUẢ] ${s.result}`, "success");
        }
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [
            { label: "i,j", value: `${s.i},${s.j}`, cls: "accent" },
            { label: "dp[i][j]", value: s.dp[s.i][s.j], cls: "warn" },
            { label: "match", value: s.result ?? "…", cls: "success" }
        ]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Chuỗi & pattern");
        sec.appendChild(VizCore.charRow("s: " + s.str, { active: s.i > 0 ? s.i - 1 : -1 }));
        sec.appendChild(VizCore.charRow("p: " + s.pat, { active: s.j > 0 ? s.j - 1 : -1 }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str },
            { type: "string", id: "lc-input-pattern", label: "p", value: cv.pattern || s.pat }
        ], cv);
    }
};
