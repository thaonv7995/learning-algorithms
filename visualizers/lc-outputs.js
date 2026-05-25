/**
 * Explicit Output resolvers for LC #1–50.
 * Used by VizCore.resolveOutput before generic heuristics (avoids false positives).
 */
(function () {
    const R = {};
    window.LC_OUTPUT_RESOLVERS = R;

    const done = s => !!s.done;
    const flash = s => done(s) || (s.current && s.current.type === "found");

    function val(value, suffix, s) {
        return { kind: "value", value, suffix: suffix || "Kết quả", flash: done(s) };
    }
    function txt(text, s) {
        const t = String(text);
        return { kind: "text", text: t.startsWith('"') ? t : `"${t}"`, flash: done(s) };
    }
    function flow(text, s, partial) {
        return { kind: "flow", text, flash: done(s) && !partial };
    }
    function arr(values, s, label) {
        return { kind: "array", values: values.slice(), label, flash: done(s) };
    }
    function bool(value, s) {
        return { kind: "bool", value: !!value, flash: done(s) };
    }
    function itemList(list, s, opts) {
        opts = opts || {};
        return {
            kind: "items",
            items: list,
            progress: opts.progress != null ? opts.progress : list.length,
            total: opts.total,
            flash: opts.flash != null ? opts.flash : flash(s)
        };
    }
    function comboItems(res, s) {
        if (!res || !res.length) return done(s) ? itemList([], s) : null;
        return itemList(
            res.map(a => (Array.isArray(a) ? `[${a.join(", ")}]` : String(a))),
            s,
            { progress: res.length, total: done(s) ? res.length : undefined, flash: flash(s) }
        );
    }
    function zigzagText(s) {
        if (!s.str || !s.rows) return "";
        const n = done(s) ? s.str.length : Math.max(0, s.i || 0);
        if (!n) return "";
        const buckets = Array.from({ length: s.rows }, () => []);
        let r = 0, dir = 1;
        for (let i = 0; i < n; i++) {
            buckets[r].push(s.str[i]);
            if (r === 0) dir = 1;
            else if (r === s.rows - 1) dir = -1;
            r += dir;
        }
        return buckets.map(b => b.join("")).join("");
    }
    function div29Result(s) {
        const sign = (s.a < 0) ^ (s.b < 0) ? -1 : 1;
        return s.q * sign;
    }

    R[1] = s => {
        if (s.resultPair && s.resultPair.length) return arr(s.resultPair, s, "indices");
        if (done(s)) return txt("Không tìm thấy cặp", s);
        return null;
    };

    R[2] = s => (s.result && s.result.length ? flow(s.result.join(" → "), s) : null);

    R[3] = s => (s.right >= 0 || done(s)) ? val(s.maxLen, "maxLen", s) : null;

    R[4] = s => (done(s) && s.median != null) ? val(s.median, "median", s) : null;

    R[5] = s => (s.best && s.best.length || done(s)) ? txt(s.best || '""', s) : null;

    R[6] = s => {
        const t = zigzagText(s);
        return t ? txt(t + (done(s) ? "" : "…"), s) : null;
    };

    R[7] = s => ((s.digits && s.digits.length) || done(s)) ? val(s.res, "reversed", s) : null;

    R[8] = s => {
        const v = s.sign * s.res;
        if (done(s) || (s.phase === "digit" && s.res > 0)) return val(v, "atoi", s);
        return null;
    };

    R[9] = s => (s.result !== null && s.result !== undefined) ? bool(s.result, s) : null;

    R[10] = s => (done(s) && s.dp) ? bool(s.dp[s.m][s.n], s) : null;

    R[11] = s => (done(s) && s.maxArea != null) ? val(s.maxArea, "diện tích max", s) : null;

    R[12] = s => (s.out || done(s)) ? txt(s.out || "", s) : null;

    R[13] = s => (s.i > 0 || done(s)) ? val(s.sum, "tổng", s) : null;

    R[14] = s => (s.prefix != null && (s.prefix.length || s.strIdx > 0 || done(s)))
        ? txt(s.prefix, s) : null;

    R[15] = s => comboItems(s.found, s);

    R[16] = s => (s.best != null && (s.i > 0 || done(s))) ? val(s.best, "closest", s) : null;

    R[17] = s => comboItems(s.res, s);

    R[18] = s => comboItems(s.found, s);

    R[19] = s => (done(s) && s.result) ? flow(s.result.join(" → "), s) : null;

    R[20] = s => {
        if (!done(s)) return null;
        return bool(s.stack.length === 0 && s.left >= (s.str || "").length, s);
    };

    R[21] = s => {
        if (!s.mergedList || !s.mergedList.length) return done(s) ? flow("—", s) : null;
        const vals = s.mergedList.map(x => (x && x.val != null ? x.val : x));
        return flow(vals.join(" → "), s);
    };

    R[22] = s => null; // manual Output section in lc22.js

    R[23] = s => null; // manual Output section in lc23.js

    R[24] = s => (done(s) ? flow(s.list.join(" → "), s) : null);

    R[25] = s => (done(s) && s.work) ? flow(s.work.join(" → "), s) : null;

    R[26] = s => (done(s) || s.w > 1) ? val(s.w, "k (unique)", s) : null;

    R[27] = s => (done(s) || s.w > 0) ? val(s.w, "k (kept)", s) : null;

    R[28] = s => {
        if (done(s)) return val(s.result != null ? s.result : -1, "index", s);
        return null;
    };

    R[29] = s => (done(s) ? val(div29Result(s), "quotient", s) : null);

    R[30] = s => comboItems(s.found, s);

    R[31] = s => (done(s) ? arr(s.nums, s, "next permutation") : null);

    R[32] = s => (s.best > 0 || done(s)) ? val(s.best, "max length", s) : null;

    R[33] = s => {
        if (done(s)) return val(s.ans != null ? s.ans : -1, "index", s);
        return null;
    };

    R[34] = s => (done(s) || s.ansL >= 0) ? arr([s.ansL, s.ansR], s, "range") : null;

    R[35] = s => (done(s) ? val(s.l, "insert at", s) : null);

    R[36] = s => (done(s) ? bool(s.ok, s) : null);

    R[37] = s => {
        if (!done(s) || !s.board) return null;
        return { kind: "lines", lines: s.board.map(row => row.join(" ")), flash: true };
    };

    R[38] = s => (s.cur ? txt(s.cur, s) : null);

    R[39] = s => comboItems(s.res, s);

    R[40] = s => comboItems(s.res, s);

    R[41] = s => (done(s) && s.answer != null) ? val(s.answer, "missing positive", s) : null;

    R[42] = s => (done(s) ? val(s.water, "nước đọng", s) : null);

    R[43] = s => (s.result || done(s)) ? txt(s.result || "", s) : null;

    R[44] = s => {
        if (!done(s) || !s.dp) return null;
        return bool(s.dp[s.s.length][s.p.length], s);
    };

    R[45] = s => (done(s) ? val(s.steps, "bước nhảy", s) : null);

    R[46] = s => null; // manual Output in lc46.js
    R[47] = s => null;
    R[48] = s => null;

    R[49] = s => {
        if (!s.groups) return null;
        const keys = Object.keys(s.groups);
        if (!keys.length && !done(s)) return null;
        return itemList(keys.map(k => `${k}: [${s.groups[k].join(", ")}]`), s, { flash: done(s) });
    };

    R[50] = s => ((s.res != null && (s.bit > 0 || done(s))) ? val(Number(s.res.toFixed ? s.res.toFixed(4) : s.res), "x^n", s) : null);

    /* ── LC #51–70 ── */
    R[51] = s => {
        if (!done(s) || !s.queens || !s.queens.every(q => q >= 0)) return null;
        return arr(s.queens, s, "queens (cột/hàng)");
    };
    R[52] = s => (done(s) ? val(s.count, "cách xếp", s) : null);
    R[53] = s => ((s.best != null && (done(s) || s.i > 0)) ? val(s.best, "max subarray", s) : null);
    R[54] = s => (s.res && s.res.length ? arr(s.res, s, "spiral") : null);
    R[55] = s => (done(s) ? bool(s.i >= (s.nums || []).length, s) : null);
    R[56] = s => {
        if (!s.res || !s.res.length) return done(s) ? itemList([], s) : null;
        return itemList(s.res.map(iv => `[${iv[0]}, ${iv[1]}]`), s, { flash: done(s) });
    };
    R[57] = s => {
        if (!s.res || !s.res.length) return done(s) ? itemList([], s) : null;
        return itemList(s.res.map(iv => `[${iv[0]}, ${iv[1]}]`), s, { flash: done(s) });
    };
    R[58] = s => ((s.len > 0 || done(s)) ? val(s.len, "độ dài từ cuối", s) : null);
    R[59] = s => (done(s) && s.m ? { kind: "matrix", matrix: s.m, flash: true } : null);
    R[60] = s => (s.res ? txt(s.res, s) : null);
    R[61] = s => {
        const out = s.result || s.list;
        return (done(s) && out) ? flow(out.join(" → "), s) : null;
    };
    R[62] = s => (done(s) && s.dp ? val(s.dp[s.m - 1][s.n - 1], "số đường", s) : null);
    R[63] = s => (done(s) ? val(s.dp[s.n - 1], "số đường", s) : null);
    R[64] = s => (done(s) ? val(s.dp[s.n - 1], "min sum", s) : null);
    R[65] = s => (done(s) ? bool(!!s.valid, s) : null);
    R[66] = s => (done(s) && s.digits ? arr(s.digits, s, "plus one") : null);
    R[67] = s => (s.result || done(s)) ? txt(s.result || "", s) : null;
    R[68] = s => (done(s) && s.lines ? { kind: "lines", lines: s.lines.slice(), flash: true } : null);
    R[69] = s => (done(s) ? val(s.ans, "sqrt", s) : null);
    R[70] = s => (done(s) ? val(s.b, "số cách", s) : null);

    R[71] = s => (s.result ? txt(s.result, s) : null);
    R[72] = s => (done(s) && s.dp ? val(s.dp[s.m][s.n], "edit distance", s) : null);
    R[73] = s => (done(s) && s.matrix ? { kind: "matrix", matrix: s.matrix, flash: true } : null);
    R[74] = s => (done(s) ? bool(!!s.ans, s) : null);
    R[75] = s => (done(s) ? arr(s.nums, s, "sorted") : null);
    R[76] = s => null; // premium — lc-patterns stub
    R[77] = s => comboItems(s.res, s);
    R[78] = s => comboItems(s.res, s);
    R[79] = s => (done(s) ? bool(!!s.found, s) : null);
    R[80] = s => (done(s) ? val(s.w, "k", s) : null);
    R[81] = s => (done(s) && s.ans != null ? val(s.ans, "index", s) : null);
    R[82] = s => (done(s) && s.result ? flow(s.result.join(" → "), s) : null);
    R[83] = s => (done(s) && s.result ? flow(s.result.join(" → "), s) : null);
    R[84] = s => (done(s) ? val(s.maxArea, "max area", s) : null);
    R[85] = s => (done(s) && s.best != null ? val(s.best, "max area", s) : null);
    R[86] = s => (done(s) && s.result ? flow(s.result.join(" → "), s) : null);
    R[87] = s => (done(s) ? bool(!!s.ok, s) : null);
    R[88] = s => (done(s) && s.work ? arr(s.work, s, "merged") : null);
    R[89] = s => (s.res && s.res.length ? arr(s.res, s, "gray code") : null);
    R[90] = s => comboItems(s.res, s);
    R[91] = s => null; // premium
    R[92] = s => (done(s) && s.list ? flow(s.list.join(" → "), s) : null);
    R[93] = s => comboItems(s.res, s);
    R[94] = s => (s.visit && s.visit.length ? arr(s.visit, s, "inorder") : null);
    R[95] = s => comboItems(s.res, s);
    R[96] = s => (done(s) ? val(s.ans, "BST count", s) : null);
    R[97] = s => (done(s) ? bool(!!s.ok, s) : null);
    R[98] = s => (done(s) ? bool(!!s.valid, s) : null);
    R[99] = s => (done(s) && s.nums ? arr(s.nums, s, "recovered") : null);
    R[100] = s => null; // premium — lc-patterns

    R[101] = s => (done(s) && s.result != null ? bool(s.result, s) : null);
    R[102] = s => {
        if (!s.levels || !s.levels.length) return null;
        return { kind: "items", items: s.levels.map(lv => `[${lv.join(", ")}]`), flash: done(s) };
    };
    R[103] = s => null; // manual viz-output-section
    R[104] = s => (s.maxDepth > 0 || done(s)) ? val(s.maxDepth, "maxDepth", s) : null;
    R[105] = s => (done(s) && s.buildSteps && s.buildSteps.length ? val(s.buildSteps[0].root, "root", s) : null);

    R[106] = s => (done(s) ? val(s.root, "root", s) : null);
    R[107] = s => null;
    R[108] = s => (s.picks && s.picks.length ? arr(s.picks, s, "BST roots") : null);
    R[109] = s => (done(s) ? val(s.root, "root", s) : null);
    R[110] = s => (done(s) ? bool(!!s.result, s) : null);
    R[111] = s => (done(s) ? val(s.minDepth, "minDepth", s) : null);
    R[112] = s => (done(s) ? bool(!!s.found, s) : null);
    R[113] = s => null;
    R[114] = s => (done(s) && s.out ? flow(s.out.join(" → "), s) : null);
    R[115] = s => (done(s) ? val(s.dp[s.t.length], "cách", s) : null);
    R[116] = s => (done(s) ? val(s.links.length, "links", s) : null);
    R[117] = s => (done(s) ? val(s.links.length, "links", s) : null);
    R[118] = s => null;
    R[119] = s => (done(s) ? arr(s.row, s, "row") : null);
    R[120] = s => (done(s) ? val(s.ans, "min path", s) : null);

    R[121] = s => (done(s) ? val(s.maxProfit, "lợi nhuận", s) : null);
    R[122] = s => (done(s) ? val(s.profit, "lợi nhuận", s) : null);
    R[123] = s => (done(s) ? val(s.sell2, "max profit", s) : null);
    R[124] = s => (done(s) ? val(s.best, "max path", s) : null);
    R[125] = s => null; // lc-patterns
    R[126] = s => comboItems(s.allPaths || [], s);
    R[127] = s => (done(s) ? val(s.ans || 0, "bước", s) : null);
    R[128] = s => (done(s) ? val(s.best, "streak", s) : null);
    R[129] = s => (done(s) ? val(s.total, "tổng", s) : null);
    R[130] = s => (done(s) ? val(s.flipped, "flipped", s) : null);
    R[131] = s => comboItems(s.res, s);
    R[132] = s => null;
    R[133] = s => (done(s) ? val(Object.keys(s.clone || {}).length, "nodes", s) : null);
    R[134] = s => (done(s) ? val(s.found, "start index", s) : null);
    R[135] = s => (done(s) ? val(s.total, "candy", s) : null);

    R[136] = s => (done(s) ? val(s.xor, "single", s) : null);
    R[137] = s => (done(s) ? val(s.ones, "single", s) : null);
    R[138] = s => (done(s) ? val(s.order.length, "cloned", s) : null);
    R[139] = s => (done(s) ? bool(s.dp[s.str.length], s) : null);
    R[140] = s => null;
    R[141] = s => (done(s) ? bool(s.hasCycle, s) : null);
    R[142] = s => (done(s) ? val(s.entry, "entry", s) : null);
    R[143] = s => null;
    R[144] = s => comboItems(s.res, s);
    R[145] = s => comboItems(s.res, s);
    R[146] = s => (done(s) ? val([...s.cache.keys()].join(","), "keys", s) : null);
    R[147] = s => null;
    R[148] = s => null;
    R[149] = s => null;
    R[150] = s => (done(s) ? val(s.stack[0], "result", s) : null);

    function extractOutput(s) {
        if (!s || !s.done) return null;
        if (s.outputText != null) return { kind: "text", text: String(s.outputText), flash: true };
        if (s.outputResult != null) return val(s.outputResult, "kết quả", s);
        if (s.result != null) {
            if (typeof s.result === "boolean") return bool(s.result, s);
            if (Array.isArray(s.result)) {
                if (s.result.length && typeof s.result[0] === "object") {
                    return { kind: "text", text: JSON.stringify(s.result), flash: true };
                }
                return arr(s.result, s, "kết quả");
            }
            if (typeof s.result === "string") return txt(s.result, s);
            return val(s.result, "kết quả", s);
        }
        const scalars = [
            ["best", "kết quả"], ["ans", "kết quả"], ["answer", "kết quả"],
            ["maxProfit", "lợi nhuận"], ["profit", "lợi nhuận"], ["water", "nước"],
            ["count", "count"], ["total", "tổng"], ["sum", "tổng"], ["xor", "xor"],
            ["ones", "ones"], ["maxLen", "độ dài"], ["found", "found"], ["second", "kết quả"],
            ["islands", "islands"], ["maxArea", "diện tích"], ["k", "k"], ["w", "k"],
            ["len", "độ dài"], ["placed", "placed"], ["startHp", "min HP"], ["minHp", "min HP"],
            ["maxP", "kết quả"], ["maxGap", "maxGap"], ["cand", "kết quả"], ["zeros", "zeros"],
            ["nextVal", "kết quả"], ["deleteCount", "deleted"], ["median", "median"],
            ["res", "kết quả"], ["value", "kết quả"], ["num", "kết quả"], ["idx", "index"],
            ["peak", "peak"], ["rank", "rank"], ["score", "score"], ["gap", "gap"]
        ];
        for (const [key, label] of scalars) {
            const v = s[key];
            if (v != null && typeof v !== "object") return val(v, label, s);
        }
        if (typeof s.digits === "string" && s.digits) return txt(s.digits, s);
        if (typeof s.valid === "boolean") return bool(s.valid, s);
        if (Array.isArray(s.valid) && s.valid.length) {
            return { kind: "text", text: JSON.stringify(s.valid), flash: true };
        }
        if (typeof s.ok === "boolean") return bool(s.ok, s);
        if (Array.isArray(s.dp) && s.dp.length && typeof s.dp[0] !== "object" && s.dp[0] != null) {
            return val(s.dp[0], "dp[0]", s);
        }
        if (s.dp && Array.isArray(s.dp[0]) && s.dp[0][0] != null && s.dp[0][0] !== Infinity) {
            return val(s.dp[0][0], "min HP", s);
        }
        if (s.dp && s.target != null && s.dp[s.target] != null && s.dp[s.target] !== Infinity) {
            return val(s.dp[s.target], "dp[target]", s);
        }
        if (Array.isArray(s.out)) {
            if (!s.out.length) return txt("[]", s);
            const first = s.out[0];
            if (typeof first === "object" && first !== null) {
                return { kind: "text", text: JSON.stringify(s.out), flash: true };
            }
            if (typeof first === "number") return arr(s.out, s, "kết quả");
            return itemList(s.out.map(String), s);
        }
        if (Array.isArray(s.found) && s.found.length) {
            const f0 = s.found[0];
            if (typeof f0 === "number") return arr(s.found, s, "found");
            return itemList(s.found.map(String), s);
        }
        if (Array.isArray(s.dups) && s.dups.length) {
            return { kind: "text", text: JSON.stringify(s.dups), flash: true };
        }
        if (Array.isArray(s.cands) && s.cands.length) {
            return itemList(s.cands.map(String), s);
        }
        if (Array.isArray(s.res) && s.res.length) {
            const first = s.res[0];
            if (Array.isArray(first)) {
                return itemList(s.res.map(a => `[${a.join(", ")}]`), s);
            }
            if (typeof first === "string") return itemList(s.res.map(String), s);
            if (typeof first === "number") return arr(s.res, s, "kết quả");
            if (typeof first === "object") {
                return { kind: "text", text: JSON.stringify(s.res), flash: true };
            }
        }
        if (Array.isArray(s.visit) && s.visit.length) return flow(s.visit.join(" → "), s);
        if (Array.isArray(s.work) && s.work.length) return flow(s.work.join(" → "), s);
        if (Array.isArray(s.mergedList) && s.mergedList.length) {
            const vals = s.mergedList.map(x => (x && x.val != null ? x.val : x));
            return flow(vals.join(" → "), s);
        }
        if (Array.isArray(s.digits) && s.digits.length) return arr(s.digits, s, "digits");
        if (typeof s.hex === "string" && s.hex) return txt(s.hex, s);
        return null;
    }

    function outFromState(s) { return extractOutput(s); }
    window.LC_EXTRACT_OUTPUT = extractOutput;

    for (let id = 151; id <= 800; id++) {
        if (!(id in R)) R[id] = outFromState;
    }

    /* Generic fallback — shared extract when resolver returns null */
    window.LC_OUTPUT_FALLBACK = function (s) {
        if (!s) return null;
        if (s.vizError) return { kind: "text", text: `✗ ${s.vizError}`, flash: true };
        if (!s.done) return null;
        const ex = extractOutput(s);
        if (ex) return ex;
        if (s._catalogFallback) {
            return {
                kind: "text",
                text: `Sandbox tạm — cần visualizer riêng cho LC #${s.id || "?"}`,
                flash: true
            };
        }
        return null;
    };
})();
