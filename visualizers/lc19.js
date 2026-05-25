window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[19] = {
    initialize(s, log, cv) {
        s.list = [1, 2, 3, 4, 5];
        s.n = 2;
        VizCore.applyNums(s, cv, "nums", s.list);
        if (cv && cv.target !== undefined && cv.target !== "") s.n = parseInt(cv.target) || 2;
        s.fast = 0; s.slow = 0; s.phase = "advance";
        log(`[Khởi tạo] Remove Nth from end n=${s.n}, list=[${s.list.join("→")}]`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.phase === "advance") {
            if (s.fast < s.n) {
                s.fast++;
                log(`Fast advance: fast=${s.fast}`, "info");
                if (s.fast === s.n) { s.phase = "sync"; log(`Fast đi trước ${s.n} bước → bắt đầu sync`, "info"); }
                return;
            }
        }
        if (s.phase === "sync") {
            if (s.fast >= s.list.length) {
                s.done = true;
                const removeIdx = s.slow;
                const out = s.list.filter((_, i) => i !== removeIdx);
                s.outputText = String(`Xóa index ${removeIdx} → [${out.join("→")}]`); log(`[KẾT QUẢ] Xóa index ${removeIdx} → [${out.join("→")}]`, "success");
                s.result = out;
                return;
            }
            s.fast++; s.slow++;
            log(`Sync: slow=${s.slow}, fast=${s.fast}`, "info");
        }
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [
            { label: "slow", value: s.slow, cls: "accent" },
            { label: "fast", value: s.fast, cls: "warn" },
            { label: "n", value: s.n, cls: "" }
        ]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Linked list (array view)").appendChild(VizCore.arrayRow(s.list, {
            pointers: [
                { idx: s.slow, label: "slow▼" },
                { idx: Math.min(s.fast, s.list.length - 1), label: "fast▼" }
            ]
        }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "list", values: VizCore.arrayValues(cv, s, s.list) },
            { type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }
        ], cv);
    }
};
