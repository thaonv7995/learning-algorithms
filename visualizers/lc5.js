window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[5] = {
    initialize: function (state, log, customValues) {
        state.str = "babad";
        if (customValues && customValues.str) state.str = VizCore.parseStr(customValues.str);
        state.center = 0;
        state.expandOdd = true;
        state.best = "";
        state.phase = "scan";
        log(`[Khởi tạo] Longest Palindromic — s="${state.str}"`, "info");
    },

    expand: function (s, left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return s.slice(left + 1, right);
    },

    step: function (state, log) {
        if (state.center >= state.str.length && !state.expandOdd) {
            state.done = true;
            log(`[KẾT QUẢ] Palindrome dài nhất = "${state.best}" (len ${state.best.length})`, "success");
            return;
        }

        if (state.center >= state.str.length) {
            state.center = 0;
            state.expandOdd = false;
            log("Chuyển sang expand chẵn (giữa 2 ký tự)", "info");
            return;
        }

        const c = state.center;
        let pal;
        if (state.expandOdd) {
            pal = this.expand(state.str, c, c);
            log(`Bước ${state.stepIndex}: expand lẻ tại i=${c} → "${pal}"`, "info");
        } else {
            if (c >= state.str.length - 1) {
                state.center++;
                return;
            }
            pal = this.expand(state.str, c, c + 1);
            log(`Bước ${state.stepIndex}: expand chẵn tại i=${c} → "${pal}"`, "info");
        }

        if (pal.length > state.best.length) {
            state.best = pal;
            state.bestCenter = c;
            state.bestOdd = state.expandOdd;
            log(`Cập nhật best = "${pal}"`, "success");
        }
        state.center++;
        state.highlightL = state.best ? state.str.indexOf(state.best) : -1;
        state.highlightR = state.best ? state.highlightL + state.best.length - 1 : -1;
    },

    render: function (state, sandboxCanvas, statsPanel) {
        VizCore.statsBar(statsPanel, [
            { label: "center i", value: Math.min(state.center, state.str.length - 1), cls: "accent" },
            { label: "mode", value: state.expandOdd ? "lẻ" : "chẵn", cls: "warn" },
            { label: "best", value: `"${state.best || "—"}"`, cls: "success" },
            { label: "len", value: state.best.length, cls: "success" }
        ]);

        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Expand around center");
        const hlL = state.highlightL >= 0 ? state.highlightL : -1;
        const hlR = state.highlightR >= 0 ? state.highlightR : -1;
        sec.appendChild(VizCore.charRow(state.str, {
            pointers: state.center < state.str.length ? [{ idx: state.center, label: "c▼" }] : [],
            skip: idx => hlL >= 0 && (idx < hlL || idx > hlR) && !state.done,
            active: state.center < state.str.length ? state.center : -1
        }));

        if (state.best) {
            const chars = state.str.split("");
            const row = sec.querySelector(".viz-array-row");
            if (row) {
                row.querySelectorAll(".viz-cell").forEach((cell, idx) => {
                    if (idx >= hlL && idx <= hlR) cell.classList.add("found");
                });
            }
        }

        sandboxCanvas.appendChild(stage);
    },

    renderControls: function (state, container, customValues) {
        VizCore.controls(container, [
            { type: "string", id: "lc-input-str", label: "s", value: customValues.str || state.str, placeholder: "babad" }
        ], customValues);
    }
};
