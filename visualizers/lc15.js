window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[15] = {
    initialize(s, log, cv) {
        s.nums = [-1, 0, 1, 2, -1, -4];
        VizCore.applyNums(s, cv, "nums", s.nums);
        s.nums.sort((a, b) => a - b);
        s.i = 0; s.left = 1; s.right = s.nums.length - 1;
        s.found = [];
        log(`[Khởi tạo] 3Sum sorted=[${s.nums.join(", ")}]`, "info");
    },
    step(s, log) {
        if (s.i >= s.nums.length - 2) {
            s.done = true;
            log(`[KẾT QUẢ] ${s.found.length ? JSON.stringify(s.found) : "[]"}`, "success");
            return;
        }
        if (s.left >= s.right) {
            s.i++;
            while (s.i < s.nums.length - 2 && s.nums[s.i] === s.nums[s.i - 1]) s.i++;
            s.left = s.i + 1; s.right = s.nums.length - 1;
            if (s.i >= s.nums.length - 2) { s.done = true; log(`[KẾT QUẢ] ${JSON.stringify(s.found)}`, "success"); }
            return;
        }
        const sum = s.nums[s.i] + s.nums[s.left] + s.nums[s.right];
        if (sum === 0) {
            const tri = [s.nums[s.i], s.nums[s.left], s.nums[s.right]];
            s.found.push(tri);
            log(`Tìm thấy ${JSON.stringify(tri)}`, "success");
            s.left++; s.right--;
            while (s.left < s.right && s.nums[s.left] === s.nums[s.left - 1]) s.left++;
            while (s.left < s.right && s.nums[s.right] === s.nums[s.right + 1]) s.right--;
        } else if (sum < 0) s.left++;
        else s.right--;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [
            { label: "i", value: s.nums[s.i], cls: "accent" },
            { label: "L/R", value: `${s.nums[s.left]}/${s.nums[s.right]}`, cls: "warn" },
            { label: "found", value: s.found.length, cls: "success" }
        ]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Mảng đã sort").appendChild(VizCore.arrayRow(s.nums, {
            pointers: [
                { idx: s.i, label: "i▼" },
                { idx: s.left, label: "L▼" },
                { idx: s.right, label: "R▼" }
            ]
        }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
    }
};
