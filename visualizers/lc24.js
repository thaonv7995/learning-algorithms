window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[24] = {
    initialize(s, log, cv) {
        s.list = [1, 2, 3, 4]; s.i = 0;
        VizCore.applyNums(s, cv, "nums", s.list);
        log(`[Khởi tạo] Swap pairs [${s.list.join("→")}]`, "info");
    },
    step(s, log) {
        if (s.i >= s.list.length - 1) { s.done = true; log(`[KẾT QUẢ] [${s.list.join("→")}]`, "success"); return; }
        [s.list[s.i], s.list[s.i + 1]] = [s.list[s.i + 1], s.list[s.i]];
        log(`Swap index ${s.i},${s.i + 1}`, "info");
        s.i += 2;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "i", value: s.i, cls: "accent" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Swap pairs").appendChild(VizCore.arrayRow(s.list, { active: s.i }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "list", values: VizCore.arrayValues(cv, s, s.list) }], cv);
    }
};

window.LeetCodeVisualizers[26] = {
    initialize(s, log, cv) {
        s.nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]; s.w = 1; s.r = 1;
        VizCore.applyNums(s, cv, "nums", s.nums);
        log(`[Khởi tạo] Remove duplicates`, "info");
    },
    step(s, log) {
        if (s.r >= s.nums.length) { s.done = true; log(`[KẾT QUẢ] k=${s.w}`, "success"); return; }
        if (s.nums[s.r] !== s.nums[s.w - 1]) {
            s.nums[s.w] = s.nums[s.r];
            log(`nums[${s.w}]=${s.nums[s.r]}`, "info");
            s.w++;
        } else log(`Skip duplicate ${s.nums[s.r]}`, "info");
        s.r++;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "write", value: s.w, cls: "success" }, { label: "read", value: s.r, cls: "accent" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "In-place unique").appendChild(VizCore.arrayRow(s.nums, {
            pointers: [{ idx: s.w - 1, label: "w▼" }, { idx: s.r, label: "r▼" }]
        }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }], cv);
    }
};

window.LeetCodeVisualizers[27] = {
    initialize(s, log, cv) {
        s.nums = [0, 1, 2, 2, 3, 0, 4, 2]; s.val = 2; s.w = 0; s.r = 0;
        VizCore.applyNums(s, cv, "nums", s.nums);
        if (cv && cv.target !== undefined && cv.target !== "") s.val = parseInt(cv.target) || 2;
        log(`[Khởi tạo] Remove val=${s.val}`, "info");
    },
    step(s, log) {
        if (s.r >= s.nums.length) { s.done = true; log(`[KẾT QUẢ] k=${s.w}`, "success"); return; }
        if (s.nums[s.r] !== s.val) {
            s.nums[s.w] = s.nums[s.r]; s.w++;
            log(`Giữ ${s.nums[s.r]}`, "info");
        } else log(`Bỏ ${s.nums[s.r]}`, "info");
        s.r++;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "val", value: s.val, cls: "warn" }, { label: "k", value: s.w, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Filter in-place").appendChild(VizCore.arrayRow(s.nums, {
            pointers: [{ idx: s.w, label: "w▼" }, { idx: s.r, label: "r▼" }]
        }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) },
            { type: "target", id: "lc-input-target", label: "val", value: cv.target ?? s.val }
        ], cv);
    }
};

window.LeetCodeVisualizers[28] = {
    initialize(s, log, cv) {
        s.hay = "sadbutsad"; s.needle = "sad"; s.i = 0;
        if (cv && cv.str) s.hay = VizCore.parseStr(cv.str);
        if (cv && cv.pattern) s.needle = VizCore.parseStr(cv.pattern);
        log(`[Khởi tạo] strStr`, "info");
    },
    step(s, log) {
        const m = s.needle.length;
        if (m === 0) { s.done = true; log(`[KẾT QUẢ] 0`, "success"); return; }
        if (s.i > s.hay.length - m) { s.done = true; log(`[KẾT QUẢ] -1`, "success"); s.result = -1; return; }
        const sub = s.hay.slice(s.i, s.i + m);
        if (sub === s.needle) {
            s.done = true; s.result = s.i;
            log(`[KẾT QUẢ] ${s.i}`, "success");
            return;
        }
        log(`i=${s.i} "${sub}" ≠ needle`, "info");
        s.i++;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "i", value: s.i, cls: "accent" }, { label: "found", value: s.result ?? "…", cls: "success" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Haystack / needle");
        sec.appendChild(VizCore.charRow(s.hay, { active: s.i, found: s.result >= 0 ? Array.from({ length: s.needle.length }, (_, j) => s.result + j) : [] }));
        sec.appendChild(VizCore.charRow("needle: " + s.needle, {}));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "string", id: "lc-input-str", label: "haystack", value: cv.str || s.hay },
            { type: "string", id: "lc-input-pattern", label: "needle", value: cv.pattern || s.needle }
        ], cv);
    }
};

window.LeetCodeVisualizers[29] = {
    initialize(s, log, cv) {
        s.a = 10; s.b = 3; s.q = 0;
        if (cv && cv.target !== undefined) s.a = parseInt(cv.target) || 10;
        if (cv && cv.str) s.b = parseInt(cv.str) || 3;
        s.work = Math.abs(s.a); s.div = Math.abs(s.b);
        log(`[Khởi tạo] ${s.a} / ${s.b}`, "info");
    },
    step(s, log) {
        if (s.work < s.div) {
            s.done = true;
            const sign = (s.a < 0) ^ (s.b < 0) ? -1 : 1;
            log(`[KẾT QUẢ] ${s.q * sign}`, "success");
            return;
        }
        let k = 1;
        while (s.work >= (s.div << (k + 1))) k <<= 1;
        s.work -= s.div << k; s.q += 1 << k;
        log(`Trừ ${s.div << k}, q=${s.q}, còn ${s.work}`, "info");
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "remain", value: s.work, cls: "accent" }, { label: "q", value: s.q, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Bit-shift subtract").appendChild(
            VizCore.flowEquation([{ label: "a", val: s.work, cls: "warn" }, { op: "÷" }, { label: "b", val: s.div, cls: "accent" }, { op: "=" }, { label: "q", val: s.q, cls: "success" }])
        );
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "target", id: "lc-input-target", label: "dividend", value: cv.target ?? s.a },
            { type: "string", id: "lc-input-str", label: "divisor", value: cv.str ?? String(s.b) }
        ], cv);
    }
};

window.LeetCodeVisualizers[30] = {
    initialize(s, log, cv) {
        s.str = "barfoothefoobarman";
        s.words = ["foo", "bar"];
        s.wl = 3; s.i = 0; s.found = [];
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
        log(`[Khởi tạo] Concat substring words`, "info");
    },
    step(s, log) {
        const total = s.words.length * s.wl;
        if (s.i > s.str.length - total) {
            s.done = true;
            log(`[KẾT QUẢ] ${JSON.stringify(s.found)}`, "success");
            return;
        }
        const chunk = s.str.slice(s.i, s.i + total);
        const parts = [];
        for (let j = 0; j < chunk.length; j += s.wl) parts.push(chunk.slice(j, j + s.wl));
        const ok = parts.length === s.words.length && s.words.every(w => {
            const idx = parts.indexOf(w);
            if (idx < 0) return false;
            parts.splice(idx, 1);
            return true;
        });
        if (ok) { s.found.push(s.i); log(`Match tại i=${s.i}`, "success"); }
        s.i++;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "i", value: s.i, cls: "accent" }, { label: "found", value: s.found.length, cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Scan s").appendChild(VizCore.charRow(s.str, { active: s.i }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str }], cv);
    }
};
