window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
const _ROMAN = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
const _RMAP = { I:1,V:5,X:10,L:50,C:100,D:500,M:1000 };

window.LeetCodeVisualizers[12] = {
    initialize(s, log, cv) {
        s.num = 1994; s.work = s.num; s.out = ""; s.idx = 0;
        if (cv && cv.target !== undefined && cv.target !== "") s.num = s.work = parseInt(cv.target) || 1994;
        log(`[Khởi tạo] intToRoman num=${s.num}`, "info");
    },
    step(s, log) {
        if (s.work === 0 || s.idx >= _ROMAN.length) { s.done = true; log(`[KẾT QUẢ] "${s.out}"`, "success"); return; }
        const [v, sym] = _ROMAN[s.idx];
        if (s.work >= v) {
            s.out += sym; s.work -= v;
            log(`+${sym} → còn ${s.work}`, "info");
        } else s.idx++;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "num", value: s.work, cls: "accent" }, { label: "roman", value: s.out || "—", cls: "success" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Greedy subtract").appendChild(
            VizCore.flowEquation([{ label: "remaining", val: s.work, cls: "warn" }, { op: "→" }, { label: "out", val: s.out || "—", cls: "success" }])
        );
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "num", value: cv.target ?? s.num }], cv);
    }
};

window.LeetCodeVisualizers[13] = {
    initialize(s, log, cv) {
        s.str = "MCMXCIV"; s.i = 0; s.sum = 0;
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
        log(`[Khởi tạo] romanToInt s="${s.str}"`, "info");
    },
    step(s, log) {
        if (s.i >= s.str.length) { s.done = true; log(`[KẾT QUẢ] ${s.sum}`, "success"); return; }
        const cur = _RMAP[s.str[s.i]] || 0;
        const nxt = s.i + 1 < s.str.length ? _RMAP[s.str[s.i + 1]] : 0;
        if (cur < nxt) { s.sum -= cur; log(`'${s.str[s.i]}' subtract → sum=${s.sum}`, "info"); }
        else { s.sum += cur; log(`'${s.str[s.i]}' add → sum=${s.sum}`, "info"); }
        s.i++;
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "sum", value: s.sum, cls: "success" }, { label: "i", value: s.i, cls: "accent" }]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Scan Roman").appendChild(
            VizCore.charRow(s.str, { active: s.i < s.str.length ? s.i : -1, pointers: [{ idx: s.i, label: "i▼" }] })
        );
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str }], cv);
    }
};

window.LeetCodeVisualizers[14] = {
    initialize(s, log, cv) {
        s.strs = ["flower", "flow", "flight"];
        if (cv && cv.nums) {
            const a = VizCore.parseStr(cv.nums).split("|").map(x => x.trim()).filter(Boolean);
            if (a.length) s.strs = a;
        }
        s.prefix = s.strs[0] || "";
        s.idx = 1;
        log(`[Khởi tạo] LCP strs=[${s.strs.join(", ")}]`, "info");
    },
    step(s, log) {
        if (s.idx >= s.strs.length || !s.prefix) {
            s.done = true;
            log(`[KẾT QUẢ] "${s.prefix}"`, "success");
            return;
        }
        const cur = s.strs[s.idx];
        while (cur.indexOf(s.prefix) !== 0 && s.prefix) s.prefix = s.prefix.slice(0, -1);
        log(`So với "${cur}" → prefix="${s.prefix}"`, "info");
        s.idx++;
        if (s.idx >= s.strs.length) { s.done = true; log(`[KẾT QUẢ] "${s.prefix}"`, "success"); }
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "prefix", value: s.prefix || '""', cls: "success" }, { label: "i", value: s.idx, cls: "accent" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Các chuỗi");
        s.strs.forEach((t, i) => {
            const row = document.createElement("div");
            row.style.cssText = "font-family:monospace;font-size:0.8rem;margin:4px 0;";
            row.textContent = (i === s.idx ? "▶ " : "  ") + t;
            sec.appendChild(row);
        });
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-nums", label: "strs (|)", value: cv.nums || s.strs.join("|") }], cv);
    }
};
