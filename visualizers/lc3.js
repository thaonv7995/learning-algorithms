window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[3] = {
    initialize: function (state, log, customValues) {
        state.str = "abcabcbb";
        if (customValues && customValues.str) state.str = VizCore.parseStr(customValues.str);
        state.left = 0;
        state.right = -1;
        state.maxLen = 0;
        state.last = {};
        log(`[Khởi tạo] Sliding window trên s="${state.str}"`, "info");
    },

    step: function (state, log) {
        if (state.right >= state.str.length - 1) {
            state.done = true;
            s.outputText = String(`Độ dài chuỗi con dài nhất không lặp = ${state.maxLen}`); log(`[KẾT QUẢ] Độ dài chuỗi con dài nhất không lặp = ${state.maxLen}`, "success");
            return;
        }
        state.right++;
        const c = state.str[state.right];
        if (state.last[c] !== undefined && state.last[c] >= state.left) {
            const old = state.left;
            state.left = state.last[c] + 1;
            log(`Bước ${state.stepIndex}: '${c}' trùng trong window → left ${old}→${state.left}`, "info");
        } else {
            log(`Bước ${state.stepIndex}: right=${state.right}, ký tự '${c}' mới trong window`, "info");
        }
        state.last[c] = state.right;
        state.maxLen = Math.max(state.maxLen, state.right - state.left + 1);
    },

    render: function (state, sandboxCanvas, statsPanel) {
        const r = Math.max(0, state.right);
        const winLen = state.right >= state.left ? state.right - state.left + 1 : 0;

        VizCore.statsBar(statsPanel, [
            { label: "left", value: state.left, cls: "accent" },
            { label: "right", value: r, cls: "warn" },
            { label: "window", value: winLen, cls: "success" },
            { label: "maxLen", value: state.maxLen, cls: "success" }
        ]);

        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Cửa sổ [left, right] — highlight vùng không lặp");
        sec.appendChild(VizCore.charRow(state.str, {
            left: state.left,
            right: r,
            windowL: state.left,
            windowR: r,
            inWindow: true,
            pointers: [
                { idx: state.left, label: "L▼" },
                { idx: r, label: "R▼" }
            ].filter(p => p.idx >= 0 && p.idx < state.str.length)
        }));

        const sec2 = VizCore.section(stage, 2, "Hash map — vị trí gần nhất của ký tự");
        sec2.appendChild(VizCore.mapPanel("last index", state.last, state.str[r]));

        if (state.right >= 0) {
            sec2.appendChild(VizCore.flowEquation([
                { label: "len", val: winLen, cls: "accent" },
                { op: "=" },
                { label: "R−L+1", val: `${r}−${state.left}+1`, cls: "warn" }
            ]));
        }

        sandboxCanvas.appendChild(stage);
    },

    renderControls: function (state, container, customValues) {
        VizCore.controls(container, [
            { type: "string", id: "lc-input-str", label: "s", value: customValues.str || state.str, placeholder: "abcabcbb" }
        ], customValues);
    }
};
