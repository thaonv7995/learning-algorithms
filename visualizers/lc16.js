window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[16] = {
    initialize(s, log, cv) {
        s.nums = [-1, 2, 1, -4];
        s.target = 1;
        VizCore.applyNums(s, cv, "nums", s.nums);
        if (cv && cv.target !== undefined && cv.target !== "") s.target = parseInt(cv.target) || 1;
        s.nums.sort((a, b) => a - b);
        s.i = 0; s.l = 1; s.r = s.nums.length - 1;
        s.best = s.nums[0] + s.nums[1] + s.nums[2];
        log(`[Khởi tạo] 3Sum Closest target=${s.target}`, "info");
    },
    step(s, log) {
        if (s.i >= s.nums.length - 2) {
            s.done = true;
            log(`[KẾT QUẢ] closest=${s.best}`, "success");
            return;
        }
        if (s.l >= s.r) { s.i++; s.l = s.i + 1; s.r = s.nums.length - 1; return; }
        const sum = s.nums[s.i] + s.nums[s.l] + s.nums[s.r];
        if (Math.abs(sum - s.target) < Math.abs(s.best - s.target)) {
            s.best = sum;
            log(`Cập nhật best=${s.best} (|${sum}-${s.target}|)`, "success");
        }
        if (sum === s.target) { s.done = true; log(`[KẾT QUẢ] ${sum}`, "success"); return; }
        if (sum < s.target) s.l++; else s.r--;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [
            { label: "target", value: s.target, cls: "accent" },
            { label: "best", value: s.best, cls: "success" },
            { label: "sum", value: s.l < s.r ? s.nums[s.i] + s.nums[s.l] + s.nums[s.r] : "—", cls: "warn" }
        ]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Two pointers").appendChild(VizCore.arrayRow(s.nums, {
            pointers: [{ idx: s.i, label: "i▼" }, { idx: s.l, label: "L▼" }, { idx: s.r, label: "R▼" }]
        }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) },
            { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
        ], cv);
    }
};

window.LeetCodeVisualizers[18] = {
    initialize(s, log, cv) {
        s.nums = [1, 0, -1, 0, -2, 2];
        s.target = 0;
        VizCore.applyNums(s, cv, "nums", s.nums);
        if (cv && cv.target !== undefined && cv.target !== "") s.target = parseInt(cv.target) || 0;
        s.nums.sort((a, b) => a - b);
        s.i = 0; s.j = 1; s.l = 2; s.r = s.nums.length - 1;
        s.found = [];
        log(`[Khởi tạo] 4Sum target=${s.target}`, "info");
    },
    step(s, log) {
        if (s.i >= s.nums.length - 3) {
            s.done = true;
            log(`[KẾT QUẢ] ${s.found.length} bộ`, "success");
            return;
        }
        if (s.j >= s.nums.length - 2) { s.i++; s.j = s.i + 1; s.l = s.j + 1; s.r = s.nums.length - 1; return; }
        if (s.l >= s.r) { s.j++; s.l = s.j + 1; s.r = s.nums.length - 1; return; }
        const sum = s.nums[s.i] + s.nums[s.j] + s.nums[s.l] + s.nums[s.r];
        if (sum === s.target) {
            s.found.push([s.nums[s.i], s.nums[s.j], s.nums[s.l], s.nums[s.r]]);
            log(`Tìm thấy [${s.nums[s.i]},${s.nums[s.j]},${s.nums[s.l]},${s.nums[s.r]}]`, "success");
            s.l++; s.r--;
        } else if (sum < s.target) s.l++;
        else s.r--;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [
            { label: "i,j", value: `${s.nums[s.i]},${s.nums[s.j]}`, cls: "accent" },
            { label: "L,R", value: `${s.nums[s.l]},${s.nums[s.r]}`, cls: "warn" },
            { label: "found", value: s.found.length, cls: "success" }
        ]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "4Sum pointers").appendChild(VizCore.arrayRow(s.nums, {
            pointers: [
                { idx: s.i, label: "i▼" }, { idx: s.j, label: "j▼" },
                { idx: s.l, label: "L▼" }, { idx: s.r, label: "R▼" }
            ]
        }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) },
            { type: "target", id: "lc-input-target", label: "target", value: cv.target ?? s.target }
        ], cv);
    }
};
