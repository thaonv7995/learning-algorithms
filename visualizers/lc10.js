window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

function _lc10BuildDp(str, pat) {
    const m = str.length, n = pat.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    dp[0][0] = true;
    for (let j = 2; j <= n; j += 2)
        if (pat[j - 1] === "*") dp[0][j] = dp[0][j - 2];
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++) {
            if (pat[j - 1] === "*") {
                dp[i][j] = dp[i][j - 2];
                if (pat[j - 2] === "." || pat[j - 2] === str[i - 1])
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
            } else if (pat[j - 1] === "." || pat[j - 1] === str[i - 1])
                dp[i][j] = dp[i - 1][j - 1];
        }
    return dp;
}

function _lc10DpGrid(str, pat, dp, hi, hj) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "overflow-x:auto;margin:8px 0;";
    const table = document.createElement("table");
    table.style.cssText = "border-collapse:collapse;font-family:monospace;font-size:0.7rem;";
    const head = document.createElement("tr");
    head.innerHTML = '<th style="padding:4px;color:#64748b;"></th>' +
        pat.split("").map((c, j) => `<th style="padding:4px 6px;color:#94a3b8;">p${j}:${c}</th>`).join("") +
        '<th style="padding:4px 6px;color:#64748b;">ε</th>';
    table.appendChild(head);
    for (let i = 0; i <= str.length; i++) {
        const tr = document.createElement("tr");
        const rowLabel = i === 0 ? "ε" : `s${i - 1}:${str[i - 1]}`;
        tr.innerHTML = `<td style="padding:4px 8px;color:#94a3b8;font-weight:600;">${rowLabel}</td>`;
        for (let j = 0; j <= pat.length; j++) {
            const td = document.createElement("td");
            const active = i === hi && j === hj;
            const val = dp[i][j];
            td.style.cssText = `padding:6px 8px;text-align:center;border:1px solid #334155;border-radius:4px;min-width:28px;background:${active ? "#818cf844" : val ? "#22c55e22" : "#0f172a"};color:${val ? "#86efac" : "#64748b"};font-weight:${active ? "700" : "400"};`;
            td.textContent = val ? "T" : "F";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    wrap.appendChild(table);
    return wrap;
}

window.LeetCodeVisualizers[10] = {
    initialize(s, log, cv) {
        s.str = "aa";
        s.pat = "a*";
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str).replace(/^["']|["']$/g, "");
        if (cv && cv.pattern) s.pat = VizCore.parseStr(cv.pattern).replace(/^["']|["']$/g, "");
        s.fillIdx = 0;
        s.m = s.str.length;
        s.n = s.pat.length;
        s.dp = _lc10BuildDp(s.str, s.pat);
        s.result = s.dp[s.m][s.n];
        s.i = 0;
        s.j = 0;
        s.done = false;
        log(`[Khởi tạo] Regex DP s="${s.str}" p="${s.pat}" — nhấn Từng bước`, "info");
    },

    step(s, log) {
        const cells = (s.m + 1) * (s.n + 1);
        if (s.fillIdx >= cells) {
            s.done = true;
            s.outputText = String(`${s.result}`); log(`[KẾT QUẢ] ${s.result}`, "success");
            return;
        }
        s.i = Math.floor(s.fillIdx / (s.n + 1));
        s.j = s.fillIdx % (s.n + 1);
        log(`DP[${s.i}][${s.j}] = ${s.dp[s.i][s.j]}`, s.dp[s.i][s.j] ? "success" : "info");
        s.fillIdx++;
        if (s.fillIdx >= cells) {
            s.done = true;
            s.outputText = String(`${s.result}`); log(`[KẾT QUẢ] ${s.result}`, "success");
        }
    },

    render(s, canvas, stats) {
        VizCore.statsBar(stats, [
            { label: "cell", value: `${s.i},${s.j}`, cls: "accent" },
            { label: "dp", value: s.dp?.[s.i]?.[s.j] ?? "—", cls: "warn" },
            { label: "match", value: s.done ? s.result : "…", cls: "success" }
        ]);
        const stage = VizCore.stage();
        const sec1 = VizCore.section(stage, 1, "Chuỗi s & pattern p");
        sec1.appendChild(VizCore.charRow(s.str || "ε", {
            active: s.i > 0 ? s.i - 1 : -1,
            pointers: s.i <= s.m ? [{ idx: Math.min(s.i, s.m - 1), label: "i▼" }] : []
        }));
        sec1.appendChild(VizCore.charRow(s.pat || "ε", {
            active: s.j > 0 ? s.j - 1 : -1,
            pointers: s.j <= s.n ? [{ idx: Math.min(s.j, s.n - 1), label: "j▼" }] : []
        }));
        const sec2 = VizCore.section(stage, 2, "Bảng DP (T/F) — hàng = prefix s, cột = prefix p");
        sec2.appendChild(_lc10DpGrid(s.str, s.pat, s.dp, s.i, s.j));
        if (s.done) {
            const sec3 = VizCore.section(stage, 3, "Output");
            sec3.classList.add("viz-output-section");
            const box = document.createElement("div");
            box.className = "viz-output-hero flash";
            box.style.borderColor = s.result ? "#34d399" : "#f87171";
            box.innerHTML = `<div class="viz-output-scalar" style="color:${s.result ? "#86efac" : "#fca5a5"}">${s.result ? "✓ true" : "✗ false"}</div>`;
            sec3.appendChild(box);
        }
        canvas.appendChild(stage);
    },

    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str, placeholder: "aa" },
            { type: "string", id: "lc-input-pattern", label: "p", value: cv.pattern || s.pat, placeholder: "a*" }
        ], cv);
    }
};
