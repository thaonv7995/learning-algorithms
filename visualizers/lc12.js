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
        if (s.work === 0 || s.idx >= _ROMAN.length) { s.done = true; s.outputText = String(`"${s.out}"`); log(`[KẾT QUẢ] "${s.out}"`, "success"); return; }
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
        if (s.i >= s.str.length) { s.done = true; s.outputText = String(`${s.sum}`); log(`[KẾT QUẢ] ${s.sum}`, "success"); return; }
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
        s.strIdx = 1;
        s.removedChar = null;
        s.done = false;
        log(`[Khởi tạo] LCP — prefix ban đầu = "${s.prefix}" (từ strs[0])`, "info");
    },

    step(s, log) {
        if (s.strIdx >= s.strs.length || !s.prefix) {
            s.done = true;
            s.outputText = String(`"${s.prefix}"`); log(`[KẾT QUẢ] "${s.prefix}"`, "success");
            return;
        }
        const cur = s.strs[s.strIdx];
        s.removedChar = null;
        if (cur.indexOf(s.prefix) === 0) {
            log(`Bước ${s.stepIndex}: strs[${s.strIdx}]="${cur}" ✓ khớp prefix "${s.prefix}"`, "success");
            s.strIdx++;
            if (s.strIdx >= s.strs.length) {
                s.done = true;
                s.outputText = String(`"${s.prefix}"`); log(`[KẾT QUẢ] "${s.prefix}"`, "success");
            }
            return;
        }
        s.removedChar = s.prefix[s.prefix.length - 1];
        s.prefix = s.prefix.slice(0, -1);
        log(`Bước ${s.stepIndex}: "${cur}" không khớp → bỏ '${s.removedChar}' → prefix="${s.prefix}"`, "warn");
        if (!s.prefix) {
            s.done = true;
            s.outputText = String(`""`); log(`[KẾT QUẢ] ""`, "success");
        }
    },

    _alignedGrid(strs, prefix, activeIdx, removedChar) {
        const wrap = document.createElement("div");
        wrap.style.cssText = "overflow-x:auto;padding:8px 0;";
        const maxLen = Math.max(...strs.map(t => t.length), prefix.length, 1);

        const prefixRow = document.createElement("div");
        prefixRow.style.cssText = "display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:8px 12px;background:#22c55e14;border:1px solid #22c55e44;border-radius:10px;";
        prefixRow.innerHTML = `<span style="font-size:0.65rem;font-weight:700;color:#86efac;min-width:52px;">PREFIX</span>`;
        const pCells = document.createElement("div");
        pCells.style.cssText = "display:flex;gap:4px;flex-wrap:wrap;";
        if (!prefix) {
            pCells.innerHTML = `<span style="color:#64748b;font-style:italic;font-size:0.75rem;">(rỗng)</span>`;
        } else {
            prefix.split("").forEach((ch, ci) => {
                const sp = document.createElement("span");
                const isRemoved = removedChar && ci === prefix.length;
                sp.style.cssText = `width:30px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:700;font-size:0.9rem;border:2px solid ${isRemoved ? "#ef4444" : "#22c55e"};background:${isRemoved ? "#ef444433" : "#22c55e33"};color:#e2e8f0;`;
                sp.textContent = ch;
                pCells.appendChild(sp);
            });
        }
        prefixRow.appendChild(pCells);
        wrap.appendChild(prefixRow);

        strs.forEach((str, ri) => {
            const row = document.createElement("div");
            row.style.cssText = "display:flex;align-items:flex-start;gap:8px;margin:6px 0;padding:6px 8px;border-radius:8px;background:" + (ri === activeIdx ? "#818cf818" : "transparent") + ";border:1px solid " + (ri === activeIdx ? "#818cf8" : "transparent") + ";";
            const label = document.createElement("span");
            label.style.cssText = "font-size:0.65rem;color:#94a3b8;min-width:52px;padding-top:8px;font-weight:" + (ri === activeIdx ? "700" : "400") + ";";
            label.textContent = ri === activeIdx ? `strs[${ri}] ▶` : `strs[${ri}]`;
            row.appendChild(label);

            const cells = document.createElement("div");
            cells.style.cssText = "display:flex;gap:4px;flex-wrap:nowrap;";
            for (let ci = 0; ci < maxLen; ci++) {
                const ch = str[ci];
                const inPrefix = ci < prefix.length;
                const match = inPrefix && prefix[ci] === ch;
                const mismatch = inPrefix && !match;
                const isFirstMismatch = mismatch && (ci === 0 || prefix.slice(0, ci) === str.slice(0, ci));
                const sp = document.createElement("span");
                let bg = "#0f172a", border = "#334155", color = ch ? "#e2e8f0" : "#334155";
                if (inPrefix && match) { bg = "#22c55e22"; border = "#22c55e"; }
                else if (isFirstMismatch || (ri === activeIdx && ci === prefix.length && prefix && str.indexOf(prefix) !== 0)) {
                    bg = "#ef444433"; border = "#ef4444"; color = "#fca5a5";
                } else if (inPrefix && mismatch) { bg = "#78716c33"; border = "#57534e"; }
                sp.style.cssText = `width:30px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:6px;font-family:monospace;font-size:0.85rem;font-weight:600;border:2px solid ${border};background:${bg};color:${color};`;
                sp.textContent = ch || "·";
                if (ci === prefix.length && ri === activeIdx && prefix) {
                    sp.style.boxShadow = "0 0 0 2px #fbbf2488";
                }
                cells.appendChild(sp);
            }
            row.appendChild(cells);
            wrap.appendChild(row);
        });

        if (activeIdx < strs.length && prefix) {
            const hint = document.createElement("div");
            hint.style.cssText = "font-size:0.7rem;color:#64748b;margin-top:8px;font-style:italic;";
            const cur = strs[activeIdx];
            hint.textContent = cur.indexOf(prefix) === 0
                ? `✓ "${cur}" bắt đầu bằng "${prefix}"`
                : `✗ "${cur}" không bắt đầu bằng "${prefix}" — sẽ rút ngắn prefix`;
            wrap.appendChild(hint);
        }
        return wrap;
    },

    render(s, canvas, stats) {
        const activeIdx = s.done ? -1 : Math.min(s.strIdx, s.strs.length - 1);
        VizCore.statsBar(stats, [
            { label: "prefix", value: `"${s.prefix}"`, cls: "success" },
            { label: "len", value: s.prefix.length, cls: "accent" },
            { label: "strIdx", value: s.strIdx, cls: "warn" }
        ]);
        const stage = VizCore.stage();

        const sec1 = VizCore.section(stage, 1, "So sánh theo cột — xanh = khớp prefix, đỏ = lệch");
        sec1.appendChild(this._alignedGrid(s.strs, s.prefix, s.strIdx < s.strs.length ? s.strIdx : -1, s.removedChar));

        if (s.removedChar) {
            const sec2 = VizCore.section(stage, 2, "Vừa rút prefix");
            sec2.appendChild(VizCore.flowEquation([
                { label: "bỏ", val: `'${s.removedChar}'`, cls: "warn" },
                { op: "→" },
                { label: "prefix", val: `"${s.prefix}"`, cls: "success" }
            ]));
        }

        if (!s.done && s.strIdx === 1 && s.prefix === s.strs[0] && s.stepIndex === 0) {
            const tip = document.createElement("p");
            tip.style.cssText = "font-size:0.75rem;color:#64748b;margin-top:8px;font-style:italic;";
            tip.textContent = "Prefix khởi tạo = strs[0]. Nhấn Từng bước để so với các chuỗi còn lại.";
            stage.appendChild(tip);
        }

        canvas.appendChild(stage);
    },

    renderControls(s, c, cv) {
        VizCore.controls(c, [{
            type: "string", id: "lc-input-nums", label: "strs (|)",
            value: cv.nums || s.strs.join("|"),
            placeholder: "flower|flow|flight"
        }], cv);
    }
};
