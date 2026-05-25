window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[22] = {
    initialize(s, log, cv) {
        s.n = 3; s.open = 0; s.path = []; s.res = [];
        if (cv && cv.target !== undefined && cv.target !== "") s.n = parseInt(cv.target) || 3;
        log(`[Khởi tạo] Generate Parentheses n=${s.n}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.path.length === 2 * s.n) {
            s.res.push(s.path.join(""));
            log(`Hoàn thành "${s.path.join("")}"`, "success");
            s.path.pop();
            if (!s.path.length && s.res.length >= this._count(s.n)) {
                s.done = true;
                s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success");
            }
            return;
        }
        if (s.open < s.n) {
            s.path.push("("); s.open++;
            log(`Thêm '(' open=${s.open}`, "info");
            return;
        }
        const close = s.path.length - s.open;
        if (close < s.open) {
            s.path.push(")");
            log(`Thêm ')'`, "info");
            return;
        }
        if (s.path.length) s.path.pop();
        s.open = Math.max(0, s.open - (s.path[s.path.length - 1] === "(" ? 1 : 0));
    },
    _count(n) {
        let c = 1;
        for (let i = 1; i <= n; i++) c = c * (n + i) / i / (i + 1) * 2;
        return Math.round(c / (n + 1)) || 1;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "open", value: s.open, cls: "accent" }, { label: "path", value: s.path.join("") || "—", cls: "warn" }, { label: "found", value: s.res.length, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Backtracking").appendChild(VizCore.charRow(s.path.join("") || "∅", {}));
        const outSec = VizCore.section(stage, 2, "Output — chuỗi ngoặc hợp lệ");
        outSec.classList.add("viz-output-section");
        const flashIdx = s.res.length && !s.done ? s.res.length - 1 : -1;
        VizCore.renderOutputItems(
            outSec,
            s.res,
            flashIdx,
            flashIdx >= 0 ? `Chuỗi mới #${s.res.length}` : null
        );
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
    }
};
