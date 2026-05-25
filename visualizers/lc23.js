window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[23] = {
    initialize(s, log, cv) {
        s.lists = [[1, 4, 5], [1, 3, 4], [2, 6]];
        s.merged = [];
        s.ptrs = [0, 0, 0];
        log(`[Khởi tạo] Merge k=${s.lists.length} sorted lists`, "info");
    },
    step(s, log) {
        if (s.done) return;
        let best = Infinity, pick = -1;
        for (let i = 0; i < s.lists.length; i++) {
            const p = s.ptrs[i];
            if (p < s.lists[i].length && s.lists[i][p] < best) {
                best = s.lists[i][p]; pick = i;
            }
        }
        if (pick < 0) {
            s.done = true;
            log(`[KẾT QUẢ] [${s.merged.join("→")}]`, "success");
            return;
        }
        s.merged.push(best);
        s.ptrs[pick]++;
        log(`Lấy ${best} từ list ${pick}`, "info");
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "merged", value: s.merged.length, cls: "success" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "K lists + min pick");
        s.lists.forEach((L, i) => {
            const d = document.createElement("div");
            d.style.cssText = "font-family:monospace;font-size:0.75rem;margin:4px 0;";
            d.textContent = `L${i}: ${L.map((v, j) => j === s.ptrs[i] ? `[${v}]` : v).join("→")}`;
            sec.appendChild(d);
        });
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) { VizCore.controls(c, [], cv); }
};

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
