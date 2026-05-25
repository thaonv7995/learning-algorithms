window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

function _lc6StripQuotes(s) {
    s = String(s || "").trim();
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
        s = s.slice(1, -1);
    }
    return s;
}

function _lc6Simulate(str, rows, count) {
    const n = Math.min(count, str.length);
    const buckets = Array.from({ length: rows }, () => []);
    const cells = [];
    if (rows < 1 || !str) return { buckets, cells, result: "" };
    if (rows === 1) {
        for (let i = 0; i < n; i++) {
            buckets[0].push(str[i]);
            cells.push({ row: 0, col: i, char: str[i], idx: i });
        }
        return { buckets, cells, result: str.slice(0, n) };
    }
    let r = 0, dir = 1;
    for (let i = 0; i < n; i++) {
        buckets[r].push(str[i]);
        cells.push({ row: r, col: i, char: str[i], idx: i });
        if (r === 0) dir = 1;
        else if (r === rows - 1) dir = -1;
        r += dir;
    }
    return { buckets, cells, result: buckets.map(b => b.join("")).join("") };
}

function _lc6RenderGrid(str, rows, cells, activeIdx, nextIdx) {
    const wrap = document.createElement("div");
    wrap.className = "viz-zigzag-grid";
    wrap.style.cssText = "display:flex;flex-direction:column;gap:6px;margin:8px 0;padding:12px;background:var(--surface,#0f172a);border-radius:10px;border:1px solid var(--border,#1e293b);overflow-x:auto;";

    const cols = str.length;
    for (let row = 0; row < rows; row++) {
        const line = document.createElement("div");
        line.style.cssText = "display:flex;align-items:center;gap:0;min-height:36px;font-family:monospace;";
        const label = document.createElement("span");
        label.textContent = `R${row}`;
        label.style.cssText = "width:28px;font-size:0.65rem;color:#64748b;flex-shrink:0;";
        line.appendChild(label);

        const track = document.createElement("div");
        track.style.cssText = "display:flex;align-items:center;position:relative;min-width:" + (cols * 28) + "px;";

        for (let c = 0; c < cols; c++) {
            const slot = document.createElement("div");
            slot.style.cssText = "width:26px;height:30px;display:flex;align-items:center;justify-content:center;flex-shrink:0;";
            const placed = cells.find(x => x.row === row && x.col === c);
            if (placed) {
                const isLast = placed.idx === activeIdx;
                const isNext = placed.idx === nextIdx;
                slot.innerHTML = `<span class="viz-char-cell${isLast ? " found" : ""}${isNext ? " active" : ""}" style="width:26px;height:26px;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:700;font-size:0.85rem;background:${isLast ? "#22c55e33" : "#818cf833"};border:2px solid ${isLast ? "#22c55e" : isNext ? "#fbbf24" : "#818cf8"};color:#e2e8f0;">${placed.char}</span>`;
            } else {
                slot.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:#334155;opacity:0.35;"></span>`;
            }
            track.appendChild(slot);
        }
        line.appendChild(track);
        wrap.appendChild(line);
    }
    return wrap;
}

function _lc6BucketRow(buckets, activeRow) {
    const row = document.createElement("div");
    row.style.cssText = "display:flex;flex-direction:column;gap:6px;";
    buckets.forEach((chars, idx) => {
        const line = document.createElement("div");
        line.style.cssText = "display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:6px 10px;border-radius:8px;border:1px solid " + (idx === activeRow ? "#818cf8" : "var(--border,#1e293b)") + ";background:var(--surface,#0f172a);";
        line.innerHTML = `<strong style="font-size:0.7rem;color:#94a3b8;min-width:24px;">R${idx}</strong>`;
        const cells = document.createElement("div");
        cells.style.cssText = "display:flex;gap:4px;flex-wrap:wrap;";
        if (!chars.length) {
            cells.innerHTML = `<span style="color:#475569;font-size:0.75rem;font-style:italic;">chưa có ký tự</span>`;
        } else {
            chars.forEach((ch, ci) => {
                const sp = document.createElement("span");
                sp.className = "viz-char-cell";
                sp.style.cssText = "width:26px;height:26px;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:700;font-size:0.85rem;background:#818cf822;border:1px solid #818cf8;color:#e2e8f0;";
                sp.textContent = ch;
                cells.appendChild(sp);
            });
        }
        line.appendChild(cells);
        row.appendChild(line);
    });
    return row;
}

window.LeetCodeVisualizers[6] = {
    initialize(s, log, cv) {
        s.str = "PAYPALISHIRING";
        s.rows = 3;
        if (cv && cv.str) s.str = _lc6StripQuotes(VizCore.parseStr(cv.str));
        if (cv && cv.target !== undefined && cv.target !== "") s.rows = Math.max(1, parseInt(cv.target, 10) || 3);
        s.i = 0;
        s.r = 0;
        s.dir = 1;
        s.buckets = Array.from({ length: s.rows }, () => []);
        s.placed = 0;
        s.done = false;
        log(`[Khởi tạo] Zigzag numRows=${s.rows}, s="${s.str}" — nhấn Từng bước để đặt từng ký tự`, "info");
    },

    step(s, log) {
        if (s.i >= s.str.length) {
            s.done = true;
            const { result } = _lc6Simulate(s.str, s.rows, s.str.length);
            log(`[KẾT QUẢ] "${result}"`, "success");
            return;
        }
        const c = s.str[s.i];
        s.buckets[s.r].push(c);
        s.placed = s.i;
        log(`Bước ${s.stepIndex}: '${c}' → hàng ${s.r} (i=${s.i})`, "info");
        if (s.r === 0) s.dir = 1;
        else if (s.r === s.rows - 1) s.dir = -1;
        s.r += s.dir;
        s.i++;
        if (s.i >= s.str.length) {
            s.done = true;
            const { result } = _lc6Simulate(s.str, s.rows, s.str.length);
            log(`[KẾT QUẢ] "${result}"`, "success");
        }
    },

    render(s, canvas, stats) {
        const placed = s.placed != null && s.placed >= 0 ? s.placed : -1;
        const nextIdx = s.done ? -1 : s.i;
        const { buckets, cells, result } = _lc6Simulate(s.str, s.rows, s.i);
        const partial = buckets.map(b => b.join("")).join("");

        VizCore.statsBar(stats, [
            { label: "row", value: s.r, cls: "accent" },
            { label: "dir", value: s.rows <= 1 ? "→" : (s.dir > 0 ? "↓" : "↑"), cls: "warn" },
            { label: "i", value: `${s.i}/${s.str.length}`, cls: "" },
            { label: "out", value: partial || "—", cls: s.done ? "success" : "" }
        ]);

        const stage = VizCore.stage();

        const sec1 = VizCore.section(stage, 1, "Chuỗi đầu vào — ký tự tiếp theo sẽ đặt");
        sec1.appendChild(VizCore.charRow(s.str, {
            active: nextIdx >= 0 && nextIdx < s.str.length ? nextIdx : -1,
            inWindow: placed >= 0,
            windowL: 0,
            windowR: placed,
            skip: idx => !s.done && idx > placed,
            pointers: nextIdx >= 0 && nextIdx < s.str.length ? [{ idx: nextIdx, label: "next▼" }] : []
        }));

        const sec2 = VizCore.section(stage, 2, "Lưới zigzag (cột = thứ tự duyệt chuỗi)");
        sec2.appendChild(_lc6RenderGrid(s.str, s.rows, cells, placed, nextIdx));

        const sec3 = VizCore.section(stage, 3, "Buckets theo hàng");
        sec3.appendChild(_lc6BucketRow(buckets, s.r));

        if (partial) {
            const sec4 = VizCore.section(stage, 4, s.done ? "Kết quả đọc theo hàng" : "Kết quả tạm (đọc R0→R1→…)");
            const res = document.createElement("div");
            res.style.cssText = "font-family:monospace;font-size:1rem;padding:10px 14px;background:#22c55e18;border:1px solid #22c55e55;border-radius:8px;color:#86efac;letter-spacing:0.05em;";
            res.textContent = s.done ? result : partial + "…";
            sec4.appendChild(res);
        }

        if (!s.i && !s.done) {
            const hint = document.createElement("p");
            hint.style.cssText = "font-size:0.75rem;color:#64748b;margin:8px 0 0;font-style:italic;";
            hint.textContent = "Nhấn « Từng bước » hoặc « Tự động » để bắt đầu mô phỏng.";
            stage.appendChild(hint);
        }

        canvas.appendChild(stage);
    },

    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str, placeholder: "PAYPALISHIRING" },
            { type: "target", id: "lc-input-target", label: "rows", value: cv.target != null ? cv.target : s.rows }
        ], cv);
    }
};

window.LeetCodeVisualizers[7] = {
    initialize(s, log, cv) {
        s.x = 123; s.res = 0;
        if (cv && cv.target !== undefined && cv.target !== "") s.x = parseInt(cv.target) || 0;
        s.work = s.x; s.digits = [];
        log(`[Khởi tạo] Reverse x=${s.x}`, "info");
    },
    step(s, log) {
        if (s.work === 0 && s.digits.length) { s.done = true; log(`[KẾT QUẢ] ${s.res}`, "success"); return; }
        if (s.work === 0) { s.done = true; log(`[KẾT QUẢ] 0`, "success"); return; }
        const d = s.work % 10;
        s.digits.push(d);
        s.res = s.res * 10 + d;
        s.work = Math.trunc(s.work / 10);
        log(`Bước ${s.stepIndex}: digit=${d}, res=${s.res}, còn x=${s.work}`, "info");
        if (s.work === 0) { s.done = true; log(`[KẾT QUẢ] ${s.res}`, "success"); }
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "x", value: s.work, cls: "accent" }, { label: "res", value: s.res, cls: "success" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Pop digit & build result");
        sec.appendChild(VizCore.flowEquation([
            { label: "digits", val: s.digits.join("←") || "—", cls: "warn" },
            { op: "→" },
            { label: "res", val: s.res, cls: "success" }
        ]));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "x", value: cv.target ?? s.x }], cv);
    }
};

window.LeetCodeVisualizers[8] = {
    initialize(s, log, cv) {
        s.str = "   -42"; s.i = 0; s.sign = 1; s.res = 0; s.phase = "space";
        if (cv && cv.str) s.str = VizCore.parseStr(cv.str);
        log(`[Khởi tạo] atoi s="${s.str}"`, "info");
    },
    step(s, log) {
        if (s.done) return;
        const ch = s.str[s.i];
        if (s.phase === "space") {
            if (ch === " " || ch === undefined) { s.i++; if (s.i >= s.str.length) { s.done = true; log(`[KẾT QUẢ] ${s.sign * s.res}`, "success"); } return; }
            s.phase = "sign"; return this.step(s, log);
        }
        if (s.phase === "sign") {
            if (ch === "+" || ch === "-") { s.sign = ch === "-" ? -1 : 1; s.i++; log(`Sign = ${s.sign}`, "info"); }
            s.phase = "digit";
            if (s.i >= s.str.length || (s.str[s.i] !== "+" && s.str[s.i] !== "-" && (s.str[s.i] < "0" || s.str[s.i] > "9"))) {
                if (s.phase === "digit") return this.step(s, log);
            }
            return;
        }
        if (s.phase === "digit") {
            if (ch >= "0" && ch <= "9") {
                s.res = s.res * 10 + (ch.charCodeAt(0) - 48);
                s.i++;
                log(`Digit '${ch}' → res=${s.res}`, "info");
                return;
            }
            s.done = true;
            log(`[KẾT QUẢ] ${s.sign * s.res}`, "success");
        }
    },
    render(s, canvas, stats) {
        VizCore.statsBar(stats, [{ label: "phase", value: s.phase, cls: "accent" }, { label: "res", value: s.sign * s.res, cls: "success" }, { label: "i", value: s.i, cls: "" }]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Parse từng ký tự");
        sec.appendChild(VizCore.charRow(s.str, { active: s.i < s.str.length ? s.i : -1, pointers: [{ idx: s.i, label: "i▼" }] }));
        canvas.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str }], cv);
    }
};
