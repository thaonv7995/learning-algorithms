window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
const _PHONE = { 2: "abc", 3: "def", 4: "ghi", 5: "jkl", 6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz" };

window.LeetCodeVisualizers[17] = {
    initialize(s, log, cv) {
        s.digits = "23";
        if (cv && cv.str) s.digits = VizCore.parseStr(cv.str);
        s.path = []; s.idx = 0; s.res = []; s.letterIdx = 0;
        log(`[Khởi tạo] Letter combos digits="${s.digits}"`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (!s.digits) { s.done = true; s.outputText = String(`[]`); log(`[KẾT QUẢ] []`, "success"); return; }
        if (s.idx >= s.digits.length) {
            s.res.push(s.path.join(""));
            log(`Hoàn thành "${s.path.join("")}"`, "success");
            s.idx--;
            if (s.path.length) s.path.pop();
            if (s.idx < 0) { s.done = true; s.outputText = String(`${s.res.length} chuỗi`); log(`[KẾT QUẢ] ${s.res.length} chuỗi`, "success"); }
            return;
        }
        const letters = _PHONE[s.digits[s.idx]] || "";
        if (s.letterIdx >= letters.length) {
            s.letterIdx = 0;
            if (s.path.length) s.path.pop();
            s.idx--;
            if (s.idx < 0) { s.done = true; s.outputText = String(`${JSON.stringify(s.res)}`); log(`[KẾT QUẢ] ${JSON.stringify(s.res)}`, "success"); }
            return;
        }
        s.path.push(letters[s.letterIdx]);
        log(`Chọn '${letters[s.letterIdx]}' tại idx ${s.idx} → path="${s.path.join("")}"`, "info");
        s.letterIdx++;
        s.idx++;
        if (s.idx >= s.digits.length) {
            s.res.push(s.path.join(""));
            log(`Push "${s.path.join("")}"`, "success");
            s.idx--;
            s.path.pop();
            s.letterIdx = 0;
        }
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [
            { label: "idx", value: s.idx, cls: "accent" },
            { label: "path", value: s.path.join("") || "—", cls: "warn" },
            { label: "count", value: s.res.length, cls: "success" }
        ]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Backtracking");
        sec.appendChild(VizCore.charRow(s.digits, { active: s.idx >= 0 && s.idx < s.digits.length ? s.idx : -1 }));
        if (s.res.length) {
            const list = document.createElement("div");
            list.style.cssText = "font-size:0.75rem;margin-top:8px;color:var(--text-muted);";
            list.textContent = "Found: " + s.res.slice(-5).join(", ");
            sec.appendChild(list);
        }
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "digits", value: cv.str || s.digits }], cv);
    }
};
