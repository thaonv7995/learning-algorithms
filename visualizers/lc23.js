window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[23] = (function () {
    const PRESETS = {
        lc: "1,4,5\n1,3,4\n2,6",
        two: "1,2\n3,4",
        single: "1\n2\n3",
        uneven: "1,4,5,7\n1,3,4\n2,6\n0"
    };
    const PRESET_OPTS = [
        { value: "lc", label: "LC mẫu (3 lists)" },
        { value: "two", label: "2 lists ngắn" },
        { value: "single", label: "3 lists 1 phần tử" },
        { value: "uneven", label: "4 lists độ dài khác" }
    ];

    function parseLists(text) {
        if (!text || !String(text).trim()) return [[1, 4, 5], [1, 3, 4], [2, 6]];
        return String(text).trim().split(/\r?\n/)
            .map(line => line.trim()).filter(Boolean)
            .map(line => line.split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x)))
            .filter(arr => arr.length > 0);
    }

    function loadLists(cv) {
        if (cv && cv.lists && String(cv.lists).trim()) return parseLists(cv.lists);
        const key = (cv && cv.preset) || "lc";
        return parseLists(PRESETS[key] || PRESETS.lc);
    }

    return {
        initialize(s, log, cv) {
            s.lists = loadLists(cv);
            s.listsText = (cv && cv.lists) || PRESETS[(cv && cv.preset) || "lc"] || PRESETS.lc;
            s.merged = [];
            s.ptrs = s.lists.map(() => 0);
            s.pick = -1;
            s.lastVal = null;
            log(`[Khởi tạo] Merge k=${s.lists.length} sorted lists`, "info");
        },

        step(s, log) {
            if (s.done) return;
            let best = Infinity, pick = -1;
            for (let i = 0; i < s.lists.length; i++) {
                const p = s.ptrs[i];
                if (p < s.lists[i].length && s.lists[i][p] < best) {
                    best = s.lists[i][p];
                    pick = i;
                }
            }
            if (pick < 0) {
                s.done = true;
                log(`[KẾT QUẢ] [${s.merged.join("→")}]`, "success");
                return;
            }
            s.merged.push(best);
            s.ptrs[pick]++;
            s.pick = pick;
            s.lastVal = best;
            log(`Lấy ${best} từ list ${pick}`, "info");
        },

        render(s, canvas, stats) {
            VizCore.statsBar(stats, [
                { label: "k", value: s.lists.length, cls: "accent" },
                { label: "merged", value: s.merged.length, cls: "success" },
                { label: "pick", value: s.pick >= 0 ? `L${s.pick}:${s.lastVal}` : "—", cls: "warn" }
            ]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1, "K lists — [ ] = con trỏ hiện tại");
            s.lists.forEach((L, i) => {
                const row = document.createElement("div");
                row.style.cssText = "display:flex;align-items:center;gap:8px;margin:6px 0;font-family:monospace;font-size:0.78rem;";
                const label = document.createElement("span");
                label.style.cssText = "color:#64748b;min-width:28px;";
                label.textContent = `L${i}`;
                row.appendChild(label);
                row.appendChild(VizCore.arrayRow(L, {
                    found: s.ptrs[i] < L.length ? [s.ptrs[i]] : []
                }));
                sec.appendChild(row);
            });
            const out = VizCore.section(stage, 2, "Merged output");
            out.appendChild(VizCore.arrayRow(s.merged.length ? s.merged : ["—"], {
                found: s.merged.length ? [s.merged.length - 1] : []
            }));
            canvas.appendChild(stage);
        },

        renderControls(s, c, cv) {
            const preset = (cv && cv.preset) || "lc";
            const listsVal = (cv && cv.lists) || PRESETS[preset] || PRESETS.lc;
            VizCore.controls(c, [
                { type: "select", id: "lc-input-preset", label: "Mẫu", value: preset, options: PRESET_OPTS },
                { type: "textarea", id: "lc-input-lists", label: "Lists (mỗi dòng = 1 list, CSV)", value: listsVal, rows: 4, placeholder: "1,4,5\\n1,3,4\\n2,6" }
            ], cv);
            const sel = c.querySelector("#lc-input-preset");
            const ta = c.querySelector("#lc-input-lists");
            if (sel && ta) sel.addEventListener("change", () => { if (PRESETS[sel.value]) ta.value = PRESETS[sel.value]; });
        }
    };
})();

window.LeetCodeVisualizers[25] = {
    initialize(s, log, cv) {
        s.list = [1, 2, 3, 4, 5];
        s.k = 2; s.groupStart = 0;
        if (cv && cv.target !== undefined && cv.target !== "") s.k = parseInt(cv.target) || 2;
        VizCore.applyNums(s, cv, "nums", s.list);
        s.work = [...s.list];
        s.phase = "reverse";
        log(`[Khởi tạo] Reverse k-group k=${s.k}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        const start = s.groupStart;
        if (start >= s.work.length) {
            s.done = true;
            log(`[KẾT QUẢ] [${s.work.join("→")}]`, "success");
            return;
        }
        const end = Math.min(start + s.k, s.work.length);
        if (end - start < s.k) {
            s.done = true;
            log(`[KẾT QUẢ] Nhóm cuối < k — giữ nguyên → [${s.work.join("→")}]`, "success");
            return;
        }
        let l = start, r = end - 1;
        while (l < r) {
            [s.work[l], s.work[r]] = [s.work[r], s.work[l]];
            l++; r--;
        }
        log(`Reverse [${start}..${end - 1}] → [${s.work.join("→")}]`, "info");
        s.groupStart = end;
        if (s.groupStart >= s.work.length) {
            s.done = true;
            log(`[KẾT QUẢ] [${s.work.join("→")}]`, "success");
        }
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "k", value: s.k, cls: "accent" }, { label: "group@", value: s.groupStart, cls: "warn" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "List view").appendChild(VizCore.arrayRow(s.work, {
            found: Array.from({ length: Math.min(s.k, s.work.length - s.groupStart) }, (_, i) => s.groupStart + i)
        }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "list", values: VizCore.arrayValues(cv, s, s.list) },
            { type: "target", id: "lc-input-target", label: "k", value: cv.target ?? s.k }
        ], cv);
    }
};
