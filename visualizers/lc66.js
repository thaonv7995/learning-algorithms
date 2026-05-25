window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

window.LeetCodeVisualizers[66] = {
    initialize(s, log, cv) {
        s.digits = [1, 2, 3];
        VizCore.applyNums(s, cv, "nums", s.digits);
        s.i = s.digits.length - 1;
        log(`[Khởi tạo] Plus One [${s.digits.join(",")}]`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i < 0) {
            s.digits.unshift(1);
            s.done = true;
            log(`[KẾT QUẢ] [${s.digits.join(",")}]`, "success");
            return;
        }
        if (s.digits[s.i] < 9) {
            s.digits[s.i]++;
            s.done = true;
            log(`digits[${s.i}]++ → [${s.digits.join(",")}]`, "success");
            return;
        }
        s.digits[s.i] = 0;
        log(`digits[${s.i}]=9 → carry, set 0`, "warn");
        s.i--;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "i", value: s.i >= 0 ? s.i : "carry", cls: "accent" },
            { label: "result", value: `[${s.digits.join(",")}]`, cls: "success" }
        ]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Digits + carry").appendChild(
            VizCore.arrayRow(s.digits, { active: s.i >= 0 ? s.i : -1, pointers: s.i >= 0 ? [{ idx: s.i, label: "i▼" }] : [] })
        );
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "array", id: "lc-input-nums", label: "digits", values: VizCore.arrayValues(cv, s, s.digits) }], cv);
    }
};

window.LeetCodeVisualizers[67] = {
    initialize(s, log, cv) {
        s.a = "1010"; s.b = "1011";
        if (cv && cv.str) {
            const parts = String(cv.str).split("|");
            if (parts[0]) s.a = parts[0].trim();
            if (parts[1]) s.b = parts[1].trim();
        }
        s.i = s.a.length - 1; s.j = s.b.length - 1; s.carry = 0; s.bits = [];
        log(`[Khởi tạo] Add Binary "${s.a}" + "${s.b}"`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i < 0 && s.j < 0 && !s.carry) {
            s.result = s.bits.reverse().join("") || "0";
            s.done = true;
            log(`[KẾT QUẢ] "${s.result}"`, "success");
            return;
        }
        let sum = s.carry;
        if (s.i >= 0) sum += parseInt(s.a[s.i--], 10);
        if (s.j >= 0) sum += parseInt(s.b[s.j--], 10);
        s.bits.push(String(sum % 2));
        s.carry = Math.floor(sum / 2);
        log(`bit=${sum % 2}, carry=${s.carry}`, "info");
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "i,j", value: `${s.i},${s.j}`, cls: "accent" },
            { label: "carry", value: s.carry, cls: "warn" },
            { label: "bits", value: s.bits.slice().reverse().join("") || "—", cls: "success" }
        ]);
        const stage = VizCore.stage();
        const row = document.createElement("div");
        row.style.cssText = "font-family:monospace;font-size:0.85rem;color:#e2e8f0;";
        row.textContent = `${s.a} + ${s.b}`;
        VizCore.section(stage, 1, "Binary add").appendChild(row);
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "string", id: "lc-input-str", label: "a|b", value: cv.str || "1010|1011" }], cv);
    }
};

window.LeetCodeVisualizers[68] = {
    initialize(s, log, cv) {
        s.words = ["This", "is", "an", "example", "of", "text", "justification."];
        s.w = 16;
        if (cv && cv.str) s.words = cv.str.split("|").map(x => x.trim()).filter(Boolean);
        if (cv && cv.target !== undefined && cv.target !== "") s.w = parseInt(cv.target, 10) || 16;
        s.i = 0; s.lines = [];
        log(`[Khởi tạo] Text Justification maxWidth=${s.w}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i >= s.words.length) {
            s.done = true;
            log(`[KẾT QUẢ] ${s.lines.length} dòng`, "success");
            return;
        }
        let j = s.i, len = 0;
        while (j < s.words.length && len + s.words[j].length + (j - s.i) <= s.w) {
            len += s.words[j].length; j++;
        }
        const cnt = j - s.i;
        let line;
        if (j === s.words.length || cnt === 1) {
            line = s.words.slice(s.i, j).join(" ");
            line += " ".repeat(Math.max(0, s.w - line.length));
        } else {
            const sp = s.w - len, gap = Math.floor(sp / (cnt - 1)), extra = sp % (cnt - 1);
            line = "";
            for (let k = 0; k < cnt - 1; k++) line += s.words[s.i + k] + " ".repeat(gap + (k < extra ? 1 : 0));
            line += s.words[j - 1];
        }
        s.lines.push(line);
        log(`Dòng: "${line}" (${line.length}/${s.w})`, "info");
        s.i = j;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "word i", value: s.i, cls: "accent" },
            { label: "lines", value: s.lines.length, cls: "success" },
            { label: "width", value: s.w, cls: "" }
        ]);
        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Justified lines");
        s.lines.forEach(ln => {
            const d = document.createElement("div");
            d.style.cssText = "font-family:monospace;font-size:0.72rem;color:#86efac;margin:2px 0;";
            d.textContent = `"${ln}"`;
            sec.appendChild(d);
        });
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [
            { type: "string", id: "lc-input-str", label: "words (a|b|c)", value: cv.str || "This|is|an|example" },
            { type: "target", id: "lc-input-target", label: "maxWidth", value: cv.target ?? 16 }
        ], cv);
    }
};

window.LeetCodeVisualizers[69] = {
    initialize(s, log, cv) {
        s.x = 8;
        VizCore.applyTarget(s, cv, 8);
        s.lo = 0; s.hi = s.x; s.ans = 0;
        log(`[Khởi tạo] Sqrt(${s.x}) — binary search`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.lo > s.hi) {
            s.done = true;
            log(`[KẾT QUẢ] sqrt(${s.x}) = ${s.ans}`, "success");
            return;
        }
        const mid = Math.floor((s.lo + s.hi) / 2);
        if (mid <= s.x / mid) {
            s.ans = mid; s.lo = mid + 1;
            log(`mid=${mid} OK (mid²≤x) → ans=${s.ans}, lo=${s.lo}`, "info");
        } else {
            s.hi = mid - 1;
            log(`mid=${mid} quá lớn → hi=${s.hi}`, "warn");
        }
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "lo", value: s.lo, cls: "accent" },
            { label: "hi", value: s.hi, cls: "warn" },
            { label: "ans", value: s.ans, cls: "success" }
        ]);
        const stage = VizCore.stage();
        const bar = document.createElement("div");
        bar.style.cssText = "font-family:monospace;font-size:0.8rem;color:#e2e8f0;";
        bar.textContent = `[${s.lo} … ${s.hi}]  x=${s.x}  mid≈${s.lo <= s.hi ? Math.floor((s.lo + s.hi) / 2) : "—"}`;
        VizCore.section(stage, 1, "Binary search range").appendChild(bar);
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "x", value: cv.target ?? s.x }], cv);
    }
};

window.LeetCodeVisualizers[70] = {
    initialize(s, log, cv) {
        s.n = 5;
        VizCore.applyTarget(s, cv, 5);
        s.a = 1; s.b = 2; s.i = 3;
        log(`[Khởi tạo] Climbing Stairs n=${s.n}`, "info");
    },
    step(s, log) {
        if (s.done) return;
        if (s.i > s.n) {
            s.done = true;
            log(`[KẾT QUẢ] ${s.b} cách`, "success");
            return;
        }
        const t = s.a + s.b;
        log(`i=${s.i}: dp=${t} (${s.a}+${s.b})`, "info");
        s.a = s.b; s.b = t; s.i++;
    },
    render(s, c, st) {
        VizCore.statsBar(st, [
            { label: "i", value: s.i, cls: "accent" },
            { label: "dp[i-2]", value: s.a, cls: "warn" },
            { label: "dp[i-1]", value: s.b, cls: "success" }
        ]);
        const stage = VizCore.stage();
        VizCore.section(stage, 1, "Fibonacci DP").appendChild(
            document.createTextNode(`Cách leo ${s.n} bậc = ${s.done ? s.b : "…"}`)
        );
        c.appendChild(stage);
    },
    renderControls(s, c, cv) {
        VizCore.controls(c, [{ type: "target", id: "lc-input-target", label: "n", value: cv.target ?? s.n }], cv);
    }
};
