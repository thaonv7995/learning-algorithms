window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[6] = {
    initialize(s, log, cv) {
        s.str = "PAYPALISHIRING"; s.rows = 3; s.i = 0; s.buckets = ["", "", ""];
        s.r = 0; s.dir = 1;
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
        if (cv && cv.target !== undefined && cv.target !== "") s.rows = parseInt(cv.target) || 3;
        s.buckets = Array(s.rows).fill("");
        log(`[Khởi tạo] Zigzag numRows=${s.rows}, s="${s.str}"`, "info");
    },
    step(s, log) {
        if (s.i >= s.str.length) { s.done = true; log(`[KẾT QUẢ] ${s.buckets.join(" | ")}`, "success"); return; }
        const c = s.str[s.i];
        s.buckets[s.r] += c;
        log(`Bước ${s.stepIndex}: '${c}' → row ${s.r}`, "info");
        if (s.r === 0) s.dir = 1; else if (s.r === s.rows - 1) s.dir = -1;
        s.r += s.dir; s.i++;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "row", value: s.r, cls: "accent" }, { label: "dir", value: s.dir > 0 ? "↓" : "↑", cls: "warn" }, { label: "i", value: s.i, cls: "" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Buckets theo hàng");
        s.buckets.forEach((b, idx) => {
            const line = document.createElement("div");
            line.style.cssText = "font-family:monospace;font-size:0.8rem;padding:6px 10px;margin:4px 0;background:var(--surface);border-radius:8px;border:1px solid var(--border);";
            line.innerHTML = `<strong>R${idx}:</strong> ${b || "—"}`;
            if (idx === s.r) line.style.borderColor = "#818cf8";
            sec.appendChild(line);
        });
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str },
            { type: "target", id: "lc-input-target", label: "rows", value: cv.target || s.rows }
        ], cv);
    }
};

window.LeetCodeVisualizers[7] = {
    initialize(s, log, cv) {
        s.x = 123; s.res = 0;
        if (cv && cv.target !== undefined && cv.target !== "") s.x = parseInt(cv.target) || 0;
        s.work = s.x; s.digits = [];
        log(`[Khởi tạo] Reverse x=${s.x}`, "info");
    },
    step(s, log) {
        if (s.work === 0 && s.digits.length) { s.done = true; log(`[KẾT QUẢ] ${s.res}`, "success"); return; }
        if (s.work === 0) { s.done = true; log(`[KẾT QUẢ] 0`, "success"); return; }
        const d = s.work % 10;
        s.digits.push(d);
        s.res = s.res * 10 + d;
        s.work = Math.trunc(s.work / 10);
        log(`Bước ${s.stepIndex}: digit=${d}, res=${s.res}, còn x=${s.work}`, "info");
        if (s.work === 0) { s.done = true; log(`[KẾT QUẢ] ${s.res}`, "success"); }
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "x", value: s.work, cls: "accent" }, { label: "res", value: s.res, cls: "success" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Pop digit & build result");
        sec.appendChild(VizCore.flowEquation([
            { label: "digits", val: s.digits.join("←") || "—", cls: "warn" },
            { op: "→" },
            { label: "res", val: s.res, cls: "success" }
        ]));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "x", value: cv.target ?? s.x }], cv);
    }
};

window.LeetCodeVisualizers[8] = {
    initialize(s, log, cv) {
        s.str = "   -42"; s.i = 0; s.sign = 1; s.res = 0; s.phase = "space";
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
        log(`[Khởi tạo] atoi s="${s.str}"`, "info");
    },
    step(s, log) {
        if (s.done) return;
        const ch = s.str[s.i];
        if (s.phase === "space") {
            if (ch === " " || ch === undefined) { s.i++; if (s.i >= s.str.length) { s.done = true; log(`[KẾT QUẢ] ${s.sign * s.res}`, "success"); } return; }
            s.phase = "sign"; return this.step(s, log);
        }
        if (s.phase === "sign") {
            if (ch === "+" || ch === "-") { s.sign = ch === "-" ? -1 : 1; s.i++; log(`Sign = ${s.sign}`, "info"); }
            s.phase = "digit";
            if (s.i >= s.str.length || (s.str[s.i] !== "+" && s.str[s.i] !== "-" && (s.str[s.i] < "0" || s.str[s.i] > "9"))) {
                if (s.phase === "digit") return this.step(s, log);
            }
            return;
        }
        if (s.phase === "digit") {
            if (ch >= "0" && ch <= "9") {
                s.res = s.res * 10 + (ch.charCodeAt(0) - 48);
                s.i++;
                log(`Digit '${ch}' → res=${s.res}`, "info");
                return;
            }
            s.done = true;
            log(`[KẾT QUẢ] ${s.sign * s.res}`, "success");
        }
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "phase", value: s.phase, cls: "accent" }, { label: "res", value: s.sign * s.res, cls: "success" }, { label: "i", value: s.i, cls: "" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Parse từng ký tự");
        sec.appendChild(VizCore.charRow(s.str, { active: s.i < s.str.length ? s.i : -1, pointers: [{ idx: s.i, label: "i▼" }] }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str }], cv);
    }
};
