window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[9] = {
    initialize(s, log, cv) {
        s.orig = 121;
        if (cv && cv.target !== undefined && cv.target !== "") s.orig = parseInt(cv.target) || 0;
        s.x = s.orig;
        s.rev = 0;
        s.result = null;
        if (s.x < 0 || (s.x % 10 === 0 && s.x !== 0)) {
            s.result = false;
            s.done = true;
            log(`[Khởi tạo] x=${s.orig} → false (âm hoặc kết thúc 0)`, "warn");
            return;
        }
        log(`[Khởi tạo] Reverse half — x=${s.x}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.x <= s.rev) {
            s.result = s.x === s.rev || s.x === Math.trunc(s.rev / 10);
            s.done = true;
            s.outputText = String(`${s.result} (x=${s.x}, rev=${s.rev})`); log(`[KẾT QUẢ] ${s.result} (x=${s.x}, rev=${s.rev})`, "success");
            return;
        }
        const d = s.x % 10;
        s.rev = s.rev * 10 + d;
        s.x = Math.trunc(s.x / 10);
        log(`Bước ${s.stepIndex}: pop ${d}, x=${s.x}, rev=${s.rev}`, "info");
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [
            { label: "x", value: s.x, cls: "accent" },
            { label: "rev", value: s.rev, cls: "warn" },
            { label: "?", value: s.result ?? "…", cls: s.result ? "success" : "" }
        ]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "So sánh nửa đầu / nửa đảo");
        sec.appendChild(VizCore.flowEquation([
            { label: "x (front)", val: s.x, cls: "accent" },
            { op: "↔" },
            { label: "rev (back)", val: s.rev, cls: "warn" }
        ]));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "x", value: cv.target ?? s.orig }], cv);
    }
};
