/* Pattern-based LC visualizers — covers problems without dedicated lc*.js */
(function () {
    const V = window.VizCore;
    const R = window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

    function reg(id, viz) { R[id] = viz; }

    function numsCtrl(c, cv, s, label, fallback, ph) {
        V.controls(c, [{
            type: "array", id: "lc-input-nums", label: label || "Mảng",
            values: V.arrayValues(cv, s, fallback), placeholder: ph != null ? ph : 0
        }], cv);
    }

    function strCtrl(c, cv, s, label, fallback, ph) {
        V.controls(c, [{
            type: "string", id: "lc-input-str", label: label || "Chuỗi",
            value: cv.str != null ? cv.str : (s.str != null ? s.str : fallback),
            placeholder: ph || ""
        }], cv);
    }

    function numsTargetCtrl(c, cv, s, fallback, target, labels) {
        V.controls(c, [
            { type: "array", id: "lc-input-nums", label: labels?.nums || "Mảng", values: V.arrayValues(cv, s, fallback), placeholder: 0 },
            { id: "lc-input-target", label: labels?.target || "Target", type: "target", value: cv.target != null ? cv.target : target }
        ], cv);
    }

    /* ── 121 Best Time to Buy and Sell Stock ── */
    reg(121, {
        initialize(s, log, cv) {
            V.applyNums(s, cv, "nums", [7, 1, 5, 3, 6, 4]);
            s.i = 0; s.minPrice = Infinity; s.minDay = 0; s.maxProfit = 0;
            s.buyDay = -1; s.sellDay = -1; s.done = false;
            log(`[Khởi tạo] Best Time to Buy and Sell Stock — prices=[${s.nums.join(", ")}]`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length) {
                s.done = true;
                log(`[Kết quả] Lợi nhuận tối đa = ${s.maxProfit}${s.buyDay >= 0 ? ` (mua ngày ${s.buyDay} giá ${s.nums[s.buyDay]}, bán ngày ${s.sellDay} giá ${s.nums[s.sellDay]})` : ""}`, "success");
                return;
            }
            const p = s.nums[s.i];
            if (p < s.minPrice) {
                s.minPrice = p; s.minDay = s.i;
                log(`Bước ${s.stepIndex}: Ngày ${s.i} giá ${p} — cập nhật giá mua thấp nhất`, "info");
            } else {
                const profit = p - s.minPrice;
                if (profit > s.maxProfit) {
                    s.maxProfit = profit; s.buyDay = s.minDay; s.sellDay = s.i;
                    log(`Bước ${s.stepIndex}: Bán ngày ${s.i} giá ${p} → lợi nhuận ${profit} (kỷ lục mới!)`, "success");
                } else {
                    log(`Bước ${s.stepIndex}: Bán ngày ${s.i} giá ${p} → lợi nhuận ${profit} (chưa vượt ${s.maxProfit})`, "info");
                }
            }
            s.i++;
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Ngày i", value: s.done ? "done" : s.i, cls: "accent" },
                { label: "Giá min", value: s.minPrice === Infinity ? "—" : s.minPrice, cls: "warn" },
                { label: "Lợi nhuận max", value: s.maxProfit, cls: "success" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Duyệt giá cổ phiếu theo ngày");
            sec.appendChild(V.arrayRow(s.nums, {
                active: s.done ? -1 : s.i,
                pointers: s.done ? [] : [{ idx: s.i, label: "i ▼" }],
                found: [s.buyDay, s.sellDay].filter(x => x >= 0),
                dimmed: idx => idx < s.i && idx !== s.buyDay && idx !== s.sellDay
            }));
            const flow = V.flowEquation([
                { label: "giá hiện tại", val: s.done ? "—" : s.nums[s.i], cls: "current" },
                { op: "−" },
                { label: "minPrice", val: s.minPrice === Infinity ? "—" : s.minPrice, cls: "target" },
                { op: "=" },
                { label: "profit", val: s.done ? s.maxProfit : (s.minPrice === Infinity ? "—" : Math.max(0, s.nums[s.i] - s.minPrice)), cls: "result" }
            ]);
            flow.appendChild(V.flowStatus(
                s.done ? `<i class="fa-solid fa-flag-checkered"></i> Hoàn tất — max profit = ${s.maxProfit}` :
                `<i class="fa-solid fa-chart-line"></i> Theo dõi giá mua thấp nhất & lợi nhuận nếu bán hôm nay`, s.done ? "found" : "pending"));
            sec.appendChild(flow);
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            numsCtrl(c, cv, s, "Giá", [7, 1, 5, 3, 6, 4], 7);
        }
    });

    /* ── 125 Valid Palindrome ── */
    reg(125, {
        initialize(s, log, cv) {
            s.str = "A man, a plan, a canal: Panama";
            if (cv && cv.str) s.str = V.parseStr(cv.str);
            s.left = 0; s.right = s.str.length - 1; s.done = false;
            log(`[Khởi tạo] Valid Palindrome — s="${s.str}"`, "info");
        },
        step(s, log) {
            while (s.left < s.right && !/[a-zA-Z0-9]/.test(s.str[s.left])) s.left++;
            while (s.left < s.right && !/[a-zA-Z0-9]/.test(s.str[s.right])) s.right--;
            if (s.left >= s.right) {
                s.done = true;
                log("[Kết quả] Chuỗi là palindrome hợp lệ ✓", "success");
                return;
            }
            const a = s.str[s.left].toLowerCase(), b = s.str[s.right].toLowerCase();
            if (a !== b) {
                s.done = true;
                log(`[Kết quả] '${a}' ≠ '${b}' tại L=${s.left}, R=${s.right} → false`, "error");
                return;
            }
            log(`Bước ${s.stepIndex}: So sánh '${s.str[s.left]}' == '${s.str[s.right]}' ✓ — L++, R--`, "info");
            s.left++; s.right--;
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Left", value: s.left, cls: "accent" },
                { label: "Right", value: s.right, cls: "warn" },
                { label: "Độ dài", value: s.str.length, cls: "" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Hai con trỏ L / R — bỏ qua ký tự đặc biệt");
            sec.appendChild(V.charRow(s.str, { left: s.left, right: s.right, skip: i => !/[a-zA-Z0-9]/.test(s.str[i]) }));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            strCtrl(c, cv, s, "Chuỗi", "A man, a plan, a canal: Panama", "A man...");
        }
    });

    /* ── 136 Single Number (XOR) ── */
    reg(136, {
        initialize(s, log, cv) {
            V.applyNums(s, cv, "nums", [4, 1, 2, 1, 2]);
            s.i = 0; s.xor = 0; s.done = false;
            log(`[Khởi tạo] Single Number — nums=[${s.nums.join(", ")}]`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length) {
                s.done = true;
                log(`[Kết quả] XOR tích lũy = ${s.xor} (phần tử đơn độc)`, "success");
                return;
            }
            const prev = s.xor;
            s.xor ^= s.nums[s.i];
            log(`Bước ${s.stepIndex}: result = ${prev} ^ ${s.nums[s.i]} = ${s.xor}`, "info");
            s.i++;
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Index i", value: s.done ? "done" : s.i, cls: "accent" },
                { label: "XOR result", value: s.xor, cls: "success" },
                { label: "nums[i]", value: s.done ? "—" : s.nums[s.i], cls: "warn" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "XOR từng phần tử — cặp giống nhau triệt tiêu");
            sec.appendChild(V.arrayRow(s.nums, {
                active: s.done ? -1 : s.i,
                pointers: s.done ? [] : [{ idx: s.i, label: "i ▼" }],
                dimmed: idx => idx < s.i
            }));
            const flow = V.flowEquation([
                { label: "result", val: s.xor, cls: "result" },
                { op: "⊕" },
                { label: "nums[i]", val: s.done ? "—" : s.nums[s.i], cls: "current" }
            ]);
            sec.appendChild(flow);
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            numsCtrl(c, cv, s, "Mảng", [4, 1, 2, 1, 2], 4);
        }
    });

    /* ── 283 Move Zeroes ── */
    reg(283, {
        initialize(s, log, cv) {
            V.applyNums(s, cv, "nums", [0, 1, 0, 3, 12]);
            s.i = 0; s.write = 0; s.done = false;
            log(`[Khởi tạo] Move Zeroes — nums=[${s.nums.join(", ")}]`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length) {
                s.done = true;
                log(`[Kết quả] Mảng sau khi dồn zero: [${s.nums.join(", ")}]`, "success");
                return;
            }
            if (s.nums[s.i] !== 0) {
                [s.nums[s.write], s.nums[s.i]] = [s.nums[s.i], s.nums[s.write]];
                log(`Bước ${s.stepIndex}: nums[${s.i}]=${s.nums[s.write]} ≠ 0 → swap với vị trí write=${s.write}`, "info");
                s.write++;
            } else {
                log(`Bước ${s.stepIndex}: nums[${s.i}]=0 — bỏ qua, chỉ tăng i`, "info");
            }
            s.i++;
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Scan i", value: s.done ? "done" : s.i, cls: "accent" },
                { label: "Write", value: s.write, cls: "warn" },
                { label: "Mảng", value: `[${s.nums.join(",")}]`, cls: "success" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Con trỏ i quét — write ghi vị trí non-zero tiếp theo");
            sec.appendChild(V.arrayRow(s.nums, {
                pointers: [
                    ...(s.done ? [] : [{ idx: s.i, label: "i ▼" }]),
                    { idx: s.write, label: "w ▼" }
                ],
                write: s.write,
                active: s.done ? -1 : s.i
            }));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            numsCtrl(c, cv, s, "Mảng", [0, 1, 0, 3, 12], 0);
        }
    });

    /* ── 704 Binary Search ── */
    reg(704, {
        initialize(s, log, cv) {
            V.applyNums(s, cv, "nums", [-1, 0, 3, 5, 9, 12]);
            V.applyTarget(s, cv, 9);
            s.low = 0; s.high = s.nums.length - 1; s.mid = -1; s.found = false; s.done = false;
            log(`[Khởi tạo] Binary Search — nums=[${s.nums.join(", ")}], target=${s.target}`, "info");
        },
        step(s, log) {
            if (s.low > s.high) {
                s.done = true;
                log(`[Kết quả] Không tìm thấy target ${s.target} → -1`, s.found ? "success" : "error");
                return;
            }
            s.mid = s.low + Math.floor((s.high - s.low) / 2);
            const v = s.nums[s.mid];
            if (v === s.target) {
                s.found = true; s.done = true;
                log(`[Tìm thấy] nums[${s.mid}]=${v} == target → index ${s.mid}`, "success");
                return;
            }
            if (v < s.target) {
                log(`Bước ${s.stepIndex}: nums[${s.mid}]=${v} < ${s.target} → low = ${s.mid + 1}`, "info");
                s.low = s.mid + 1;
            } else {
                log(`Bước ${s.stepIndex}: nums[${s.mid}]=${v} > ${s.target} → high = ${s.mid - 1}`, "info");
                s.high = s.mid - 1;
            }
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Target", value: s.target, cls: "warn" },
                { label: "low / mid / high", value: `${s.low} / ${s.mid >= 0 ? s.mid : "—"} / ${s.high}`, cls: "accent" },
                { label: "nums[mid]", value: s.mid >= 0 ? s.nums[s.mid] : "—", cls: "success" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Chia đôi phạm vi [low, high]");
            sec.appendChild(V.arrayRow(s.nums, {
                left: s.low, right: s.high, mid: s.mid,
                pointers: s.mid >= 0 ? [{ idx: s.mid, label: "mid ▼" }] : [],
                found: s.found ? [s.mid] : []
            }));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            numsTargetCtrl(c, cv, s, [-1, 0, 3, 5, 9, 12], 9);
        }
    });

    /* ── 387 First Unique Character ── */
    reg(387, {
        initialize(s, log, cv) {
            s.str = "leetcode";
            if (cv && cv.str) s.str = V.parseStr(cv.str);
            s.counts = {};
            for (const c of s.str) s.counts[c] = (s.counts[c] || 0) + 1;
            s.phase = 1; s.i = 0; s.result = -1; s.done = false;
            log(`[Khởi tạo] First Unique Character — s="${s.str}"`, "info");
        },
        step(s, log) {
            if (s.phase === 1) {
                if (s.i >= s.str.length) { s.phase = 2; s.i = 0; log("Đếm xong — quét lần 2 tìm count=1", "info"); return; }
                log(`Bước ${s.stepIndex}: Đếm '${s.str[s.i]}' → count=${s.counts[s.str[s.i]]}`, "info");
                s.i++;
                return;
            }
            if (s.i >= s.str.length) {
                s.done = true;
                log(`[Kết quả] Không có ký tự unique → -1`, "error");
                return;
            }
            if (s.counts[s.str[s.i]] === 1) {
                s.result = s.i; s.done = true;
                log(`[Tìm thấy] '${s.str[s.i]}' tại index ${s.i} (count=1)`, "success");
                return;
            }
            log(`Bước ${s.stepIndex}: '${s.str[s.i]}' count=${s.counts[s.str[s.i]]} — bỏ qua`, "info");
            s.i++;
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Phase", value: s.phase === 1 ? "Đếm" : "Tìm", cls: "accent" },
                { label: "Index i", value: s.done ? "done" : s.i, cls: "warn" },
                { label: "Kết quả", value: s.result >= 0 ? s.result : "—", cls: "success" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, s.phase === 1 ? "Lượt 1 — đếm tần suất" : "Lượt 2 — tìm count = 1");
            sec.appendChild(V.charRow(s.str, {
                active: s.done ? -1 : s.i,
                found: s.result >= 0 ? [s.result] : []
            }));
            sec.appendChild(V.mapPanel("count", s.counts, s.done ? s.str[s.result] : null));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            strCtrl(c, cv, s, "Chuỗi", "leetcode", "leetcode");
        }
    });

    /* ── 242 Valid Anagram ── */
    reg(242, {
        initialize(s, log, cv) {
            s.str = "anagram";
            s.str2 = "nagaram";
            if (cv && cv.str) s.str = V.parseStr(cv.str);
            if (cv && cv.nums) s.str2 = V.parseStr(cv.nums); // reuse nums field for t
            s.counts = {}; s.i = 0; s.done = false; s.valid = true;
            log(`[Khởi tạo] Valid Anagram — s="${s.str}", t="${s.str2}"`, "info");
        },
        step(s, log) {
            if (s.str.length !== s.str2.length) { s.done = true; s.valid = false; log("Độ dài khác nhau → false", "error"); return; }
            if (s.i >= s.str.length) {
                s.done = true;
                s.valid = Object.values(s.counts).every(v => v === 0);
                log(s.valid ? "[Kết quả] Tất cả count = 0 → true" : "[Kết quả] Count ≠ 0 → false", s.valid ? "success" : "error");
                return;
            }
            const a = s.str[s.i], b = s.str2[s.i];
            s.counts[a] = (s.counts[a] || 0) + 1;
            s.counts[b] = (s.counts[b] || 0) - 1;
            log(`Bước ${s.stepIndex}: s[${s.i}]='${a}' ++, t[${s.i}]='${b}' --`, "info");
            s.i++;
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Index i", value: s.done ? "done" : s.i, cls: "accent" },
                { label: "s", value: `"${s.str}"`, cls: "" },
                { label: "t", value: `"${s.str2}"`, cls: "warn" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Đồng bộ đếm ký tự s[i]++ và t[i]--");
            sec.appendChild(V.charRow(s.str, { active: s.done ? -1 : s.i, pointers: s.done ? [] : [{ idx: s.i, label: "i ▼" }] }));
            sec.appendChild(V.mapPanel("freq (s++ t--)", Object.fromEntries(Object.entries(s.counts).filter(([, v]) => v !== 0))));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            V.controls(c, [
                { type: "string", id: "lc-input-str", label: "s", value: cv.str || s.str, placeholder: "anagram" },
                { type: "string", id: "lc-input-nums", label: "t", value: cv.nums || s.str2, placeholder: "nagaram" }
            ], cv);
        }
    });

    /* ── 3 Longest Substring Without Repeating ── */
    reg(3, {
        initialize(s, log, cv) {
            s.str = "abcabcbb";
            if (cv && cv.str) s.str = V.parseStr(cv.str);
            s.left = 0; s.right = -1; s.maxLen = 0; s.last = {}; s.done = false;
            log(`[Khởi tạo] Longest Substring — s="${s.str}"`, "info");
        },
        step(s, log) {
            if (s.right >= s.str.length - 1) {
                s.done = true;
                log(`[Kết quả] Độ dài max = ${s.maxLen}`, "success");
                return;
            }
            s.right++;
            const c = s.str[s.right];
            if (s.last[c] !== undefined && s.last[c] >= s.left) {
                s.left = s.last[c] + 1;
                log(`Bước ${s.stepIndex}: '${c}' trùng → left = ${s.left}`, "info");
            } else {
                log(`Bước ${s.stepIndex}: mở rộng right=${s.right}, '${c}' mới trong window`, "info");
            }
            s.last[c] = s.right;
            s.maxLen = Math.max(s.maxLen, s.right - s.left + 1);
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "left", value: s.left, cls: "accent" },
                { label: "right", value: Math.max(0, s.right), cls: "warn" },
                { label: "maxLen", value: s.maxLen, cls: "success" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Cửa sổ trượt [left, right]");
            sec.appendChild(V.charRow(s.str, {
                left: s.left, right: Math.max(0, s.right),
                windowL: s.left, windowR: Math.max(0, s.right), inWindow: true
            }));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            strCtrl(c, cv, s, "Chuỗi", "abcabcbb", "abcabcbb");
        }
    });

    /* ── 238 Product Except Self ── */
    reg(238, {
        initialize(s, log, cv) {
            V.applyNums(s, cv, "nums", [1, 2, 3, 4]);
            s.output = new Array(s.nums.length).fill(1);
            s.i = 0; s.prefix = 1; s.phase = "left"; s.done = false;
            log(`[Khởi tạo] Product Except Self — nums=[${s.nums.join(", ")}]`, "info");
        },
        step(s, log) {
            if (s.phase === "left") {
                if (s.i >= s.nums.length) { s.phase = "right"; s.i = s.nums.length - 1; s.prefix = 1; log("Pass trái xong — pass phải", "info"); return; }
                s.output[s.i] = s.prefix;
                s.prefix *= s.nums[s.i];
                log(`Bước ${s.stepIndex}: output[${s.i}]=${s.output[s.i]} (prefix trái)`, "info");
                s.i++;
                return;
            }
            if (s.i < 0) { s.done = true; log(`[Kết quả] output=[${s.output.join(", ")}]`, "success"); return; }
            s.output[s.i] *= s.prefix;
            s.prefix *= s.nums[s.i];
            log(`Bước ${s.stepIndex}: output[${s.i}]*=prefix → ${s.output[s.i]}`, "info");
            s.i--;
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Phase", value: s.phase === "left" ? "Trái →" : "← Phải", cls: "accent" },
                { label: "i", value: s.i, cls: "warn" },
                { label: "prefix", value: s.prefix, cls: "success" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Input nums & output đang xây dựng");
            sec.appendChild(V.arrayRow(s.nums, { active: s.phase === "left" ? s.i : -1, pointers: [{ idx: s.i, label: "i ▼" }] }));
            const sec2 = V.section(stage, 2, "Mảng output");
            sec2.classList.add("viz-output-section");
            sec2.appendChild(V.arrayRow(s.output, { highlight: idx => s.output[idx] !== 1 || s.done, active: s.i }));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            numsCtrl(c, cv, s, "Mảng", [1, 2, 3, 4], 1);
        }
    });

    /* ── 198 House Robber (DP) ── */
    reg(198, {
        initialize(s, log, cv) {
            V.applyNums(s, cv, "nums", [2, 7, 9, 3, 1]);
            s.dp = [0, 0]; s.i = 0; s.done = false;
            log(`[Khởi tạo] House Robber — nums=[${s.nums.join(", ")}]`, "info");
        },
        step(s, log) {
            if (s.i >= s.nums.length) {
                s.done = true;
                log(`[Kết quả] Max rob = ${Math.max(s.dp[0], s.dp[1])}`, "success");
                return;
            }
            const newDp = Math.max(s.dp[1], s.dp[0] + s.nums[s.i]);
            log(`Bước ${s.stepIndex}: nhà ${s.i} (${s.nums[s.i]}) → dp = max(${s.dp[1]}, ${s.dp[0]}+${s.nums[s.i]}) = ${newDp}`, "info");
            s.dp[0] = s.dp[1]; s.dp[1] = newDp; s.i++;
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Nhà i", value: s.done ? "done" : s.i, cls: "accent" },
                { label: "dp[0]", value: s.dp[0], cls: "warn" },
                { label: "dp[1]", value: s.dp[1], cls: "success" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "DP rolling — rob hoặc bỏ qua nhà i");
            sec.appendChild(V.arrayRow(s.nums, { active: s.done ? -1 : s.i, dimmed: idx => idx < s.i }));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            numsCtrl(c, cv, s, "Mảng", [2, 7, 9, 3, 1], 2);
        }
    });

    /* ── 322 Coin Change ── */
    reg(322, {
        initialize(s, log, cv) {
            V.applyNums(s, cv, "nums", [1, 2, 5]);
            V.applyTarget(s, cv, 11);
            s.dp = Array(s.target + 1).fill(Infinity); s.dp[0] = 0;
            s.coinIdx = 0; s.amt = 1; s.done = false;
            log(`[Khởi tạo] Coin Change — coins=[${s.nums.join(", ")}], amount=${s.target}`, "info");
        },
        step(s, log) {
            if (s.coinIdx >= s.nums.length) {
                s.done = true;
                const ans = s.dp[s.target] === Infinity ? -1 : s.dp[s.target];
                log(`[Kết quả] Số xu ít nhất = ${ans}`, ans >= 0 ? "success" : "error");
                return;
            }
            const coin = s.nums[s.coinIdx];
            if (s.amt > s.target) { s.coinIdx++; s.amt = 1; log(`Chuyển sang coin=${s.nums[s.coinIdx] || "—"}`, "info"); return; }
            if (s.amt >= coin) {
                s.dp[s.amt] = Math.min(s.dp[s.amt], s.dp[s.amt - coin] + 1);
                log(`Bước ${s.stepIndex}: dp[${s.amt}] = min(..., dp[${s.amt - coin}]+1) = ${s.dp[s.amt]}`, "info");
            }
            s.amt++;
        },
        render(s, canvas, stats) {
            const show = s.dp.slice(0, Math.min(s.target + 1, 12));
            V.statsBar(stats, [
                { label: "Coin", value: s.nums[s.coinIdx] || "—", cls: "warn" },
                { label: "Amount", value: s.amt, cls: "accent" },
                { label: "dp[target]", value: s.dp[s.target] === Infinity ? "∞" : s.dp[s.target], cls: "success" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Bảng DP — dp[a] = số xu ít nhất");
            sec.appendChild(V.arrayRow(show, { active: s.amt < show.length ? s.amt : -1 }));
            canvas.appendChild(stage);
        },
        renderControls(s, c, cv) {
            numsTargetCtrl(c, cv, s, [1, 2, 5], s.target, { nums: "Coins", target: "Amount" });
        }
    });

    /* ── Generic two-pointer on sorted array (15, 875, 33 simplified) ── */
    function makeTwoPointer(id, defaults, title) {
        reg(id, {
            initialize(s, log, cv) {
                V.applyNums(s, cv, "nums", defaults.nums.slice());
                if (defaults.target != null) V.applyTarget(s, cv, defaults.target);
                s.nums.sort((a, b) => a - b);
                s.i = 0; s.left = defaults.left != null ? defaults.left : 0;
                s.right = s.nums.length - 1; s.done = false; s.found = null;
                log(`[Khởi tạo] ${title}`, "info");
            },
            step(s, log) {
                if (defaults.triplet && s.i >= s.nums.length - 2) {
                    s.done = true; log("[Kết quả] Duyệt xong các anchor i", "success"); return;
                }
                if (!defaults.triplet && s.left >= s.right) {
                    s.done = true; log("[Kết quả] Hai con trỏ gặp nhau", "success"); return;
                }
                if (defaults.triplet) {
                    s.left = s.i + 1; s.right = s.nums.length - 1;
                    while (s.left < s.right) {
                        const sum = s.nums[s.i] + s.nums[s.left] + s.nums[s.right];
                        if (sum === 0) { s.found = [s.nums[s.i], s.nums[s.left], s.nums[s.right]]; s.done = true; log(`[Tìm thấy] [${s.found.join(", ")}]`, "success"); return; }
                        if (sum < 0) s.left++; else s.right--;
                    }
                    log(`Bước ${s.stepIndex}: anchor i=${s.i}, chưa tìm thấy bộ ba`, "info");
                    s.i++;
                    return;
                }
                log(`Bước ${s.stepIndex}: L=${s.left} (${s.nums[s.left]}), R=${s.right} (${s.nums[s.right]})`, "info");
                if (s.nums[s.left] < s.nums[s.right]) s.left++; else s.right--;
            },
            render(s, canvas, stats) {
                V.statsBar(stats, [
                    { label: defaults.triplet ? "i" : "L", value: defaults.triplet ? s.i : s.left, cls: "accent" },
                    { label: "R", value: s.right, cls: "warn" },
                    { label: "Sum/Tổng", value: s.found ? s.found.join("+") : (s.left < s.right ? s.nums[s.left] + "+" + s.nums[s.right] : "—"), cls: "success" }
                ]);
                const stage = V.stage();
                const sec = V.section(stage, 1, title);
                const hi = defaults.triplet ? [s.i, s.left, s.right] : [];
                sec.appendChild(V.arrayRow(s.nums, {
                    left: defaults.triplet ? s.i : s.left, right: s.right,
                    pointers: defaults.triplet ? [{ idx: s.i, label: "i ▼" }] : [],
                    found: hi.filter(x => x >= 0 && x < s.nums.length)
                }));
                canvas.appendChild(stage);
            },
            renderControls(s, c, cv) {
                if (defaults.target != null) {
                    numsTargetCtrl(c, cv, s, defaults.nums, defaults.target);
                } else {
                    numsCtrl(c, cv, s, "Mảng", defaults.nums, defaults.nums[0] || 0);
                }
            }
        });
    }

    makeTwoPointer(15, { nums: [-1, 0, 1, 2, -1, -4], triplet: true }, "3Sum — anchor i + two pointers");
    makeTwoPointer(875, { nums: [3, 6, 7, 11], target: 8 }, "Koko — binary search on speed (simplified 2-ptr view)");
    makeTwoPointer(33, { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }, "Search Rotated Array (simplified)");

    /* ── Hash frequency patterns (49, 347, 128) ── */
    function makeHashScan(id, defaults, title) {
        reg(id, {
            initialize(s, log, cv) {
                V.applyNums(s, cv, "nums", defaults.nums.slice());
                s.i = 0; s.map = {}; s.done = false; s.result = [];
                log(`[Khởi tạo] ${title}`, "info");
            },
            step(s, log) {
                if (s.i >= s.nums.length) {
                    s.done = true;
                    log(`[Kết quả] Map: ${JSON.stringify(s.map)}`, "success");
                    return;
                }
                const v = s.nums[s.i];
                s.map[v] = (s.map[v] || 0) + 1;
                log(`Bước ${s.stepIndex}: nums[${s.i}]=${v} → count=${s.map[v]}`, "info");
                s.i++;
            },
            render(s, canvas, stats) {
                V.statsBar(stats, [
                    { label: "i", value: s.done ? "done" : s.i, cls: "accent" },
                    { label: "nums[i]", value: s.done ? "—" : s.nums[s.i], cls: "warn" },
                    { label: "Map size", value: Object.keys(s.map).length, cls: "success" }
                ]);
                const stage = V.stage();
                const sec = V.section(stage, 1, title);
                sec.appendChild(V.arrayRow(s.nums, { active: s.done ? -1 : s.i, dimmed: idx => idx < s.i }));
                sec.appendChild(V.mapPanel("freq", s.map, s.done ? null : s.nums[s.i]));
                canvas.appendChild(stage);
            },
            renderControls(s, c, cv) {
                numsCtrl(c, cv, s, "Mảng", defaults.nums, defaults.nums[0] || 0);
            }
        });
    }

    makeHashScan(49, { nums: [1, 1, 1, 2, 2, 3] }, "Group Anagrams — đếm tần suất (bước 1)");
    makeHashScan(347, { nums: [1, 1, 1, 2, 2, 3] }, "Top K Frequent — đếm tần suất");
    makeHashScan(128, { nums: [100, 4, 200, 1, 3, 2] }, "Longest Consecutive — xây set");

    /* ── Tree as level-order array (226, 100, 104, 98, 102, 124, 297) ── */
    function makeTreeWalk(id, defaults, title) {
        reg(id, {
            initialize(s, log, cv) {
                V.applyNums(s, cv, "nums", defaults.nums.slice());
                s.order = defaults.order || "preorder";
                s.i = 0; s.visit = []; s.done = false;
                log(`[Khởi tạo] ${title} — tree=[${s.nums.join(", ")}]`, "info");
            },
            step(s, log) {
                if (s.i >= s.nums.length) {
                    s.done = true;
                    log(`[Kết quả] Thứ tự duyệt: [${s.visit.join(", ")}]`, "success");
                    return;
                }
                if (s.nums[s.i] === -1 || s.nums[s.i] === null) {
                    log(`Bước ${s.stepIndex}: index ${s.i} = null — bỏ qua`, "info");
                } else {
                    s.visit.push(s.nums[s.i]);
                    log(`Bước ${s.stepIndex}: thăm nút ${s.nums[s.i]} tại index ${s.i}`, "info");
                }
                s.i++;
            },
            render(s, canvas, stats) {
                V.statsBar(stats, [
                    { label: "Index", value: s.done ? "done" : s.i, cls: "accent" },
                    { label: "Giá trị", value: s.i < s.nums.length ? s.nums[s.i] : "—", cls: "warn" },
                    { label: "Đã thăm", value: s.visit.join("→") || "—", cls: "success" }
                ]);
                const stage = V.stage();
                const sec = V.section(stage, 1, title);
                sec.appendChild(V.arrayRow(s.nums.map(v => v === -1 ? "∅" : v), {
                    active: s.done ? -1 : s.i,
                    dimmed: idx => idx < s.i
                }));
                canvas.appendChild(stage);
            },
            renderControls(s, c, cv) {
                numsCtrl(c, cv, s, "Cây (level)", defaults.nums, defaults.nums[0] || 0);
            }
        });
    }

    makeTreeWalk(226, { nums: [4, 2, 7, 1, 3, 6, 9] }, "Invert Binary Tree — duyệt & hoán đổi");
    makeTreeWalk(100, { nums: [1, 2, 3] }, "Same Tree — so sánh đồng bộ");
    makeTreeWalk(104, { nums: [3, 9, 20, -1, -1, 15, 7] }, "Max Depth — DFS");
    makeTreeWalk(98, { nums: [2, 1, 3] }, "Validate BST");
    makeTreeWalk(102, { nums: [3, 9, 20, -1, -1, 15, 7] }, "Level Order Traversal");
    makeTreeWalk(124, { nums: [-10, 9, 20, -1, -1, 15, 7] }, "Max Path Sum");
    makeTreeWalk(297, { nums: [1, 2, 3, -1, -1, 4, 5] }, "Serialize / Deserialize");

    /* ── Grid island (200) ── */
    reg(200, {
        initialize(s, log, cv) {
            s.grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]];
            s.r = 0; s.c = 0; s.islands = 0; s.done = false;
            log("[Khởi tạo] Number of Islands — duyệt lưới 2D", "info");
        },
        step(s, log) {
            if (s.r >= s.grid.length) {
                s.done = true;
                log(`[Kết quả] Số đảo = ${s.islands}`, "success");
                return;
            }
            if (s.grid[s.r][s.c] === 1) {
                s.islands++;
                s.grid[s.r][s.c] = 2;
                log(`Bước ${s.stepIndex}: Phát hiện đảo mới tại (${s.r},${s.c}) → islands=${s.islands}`, "success");
            } else {
                log(`Bước ${s.stepIndex}: (${s.r},${s.c})=${s.grid[s.r][s.c] || 0} — bỏ qua`, "info");
            }
            s.c++;
            if (s.c >= s.grid[0].length) { s.c = 0; s.r++; }
        },
        render(s, canvas, stats) {
            V.statsBar(stats, [
                { label: "Cell", value: `(${s.r},${s.c})`, cls: "accent" },
                { label: "Islands", value: s.islands, cls: "success" },
                { label: "Rows", value: s.grid.length, cls: "" }
            ]);
            const stage = V.stage();
            const sec = V.section(stage, 1, "Lưới 2D — quét từng ô");
            const grid = document.createElement("div");
            grid.style.cssText = "display:flex;flex-direction:column;gap:4px;align-items:center;";
            s.grid.forEach((row, ri) => {
                const rowEl = document.createElement("div");
                rowEl.style.cssText = "display:flex;gap:4px;";
                row.forEach((cell, ci) => {
                    const d = document.createElement("div");
                    d.className = "viz-cell";
                    d.style.width = "36px"; d.style.height = "36px";
                    d.innerHTML = `<span class="val">${cell === 2 ? "✓" : cell}</span>`;
                    if (ri === s.r && ci === s.c) d.classList.add("active", "anim-active");
                    if (cell === 2) d.classList.add("found");
                    rowEl.appendChild(d);
                });
                grid.appendChild(rowEl);
            });
            sec.appendChild(grid);
            canvas.appendChild(stage);
        },
        renderControls(s, c) {
            c.innerHTML = '<span class="viz-ll-empty">Lưới mặc định — sẽ hỗ trợ nhập tùy chỉnh sau</span>';
        }
    });

    /* ── Remaining: use pattern stubs with correct defaults + controls ── */
    const STUBS = {
        141: { nums: [3, 2, 0, -4], label: "Linked List Cycle — Floyd slow/fast" },
        19: { nums: [1, 2, 3, 4, 5], label: "Remove Nth From End" },
        328: { nums: [1, 2, 3, 4, 5], label: "Odd Even Linked List" },
        23: { nums: [1, 4, 5], label: "Merge K Lists (list 1)" },
        25: { nums: [1, 2, 3, 4, 5], label: "Reverse K Group" },
        22: { str: "((()))", label: "Generate Parentheses" },
        155: { nums: [2, 1, 3], label: "Min Stack operations" },
        76: { str: "ADOBECODEBANC", label: "Minimum Window Substring" },
        239: { nums: [1, 3, -1, -3, 5, 3, 6, 7], label: "Sliding Window Maximum" },
        84: { nums: [2, 1, 5, 6, 2, 3], label: "Largest Rectangle in Histogram" },
        91: { str: "226", label: "Decode Ways" },
        139: { str: "leetcode", label: "Word Break" },
        62: { nums: [3, 7], label: "Unique Paths m×n" },
        1143: { str: "abcde", label: "Longest Common Subsequence" },
        133: { nums: [1, 2, 3], label: "Clone Graph" },
        207: { nums: [2, 2], label: "Course Schedule" },
        4: { nums: [1, 3], label: "Median of Two Sorted Arrays" }
    };

    Object.entries(STUBS).forEach(([id, cfg]) => {
        const numId = parseInt(id, 10);
        if (R[numId]) return;
        if (cfg.str) {
            reg(numId, {
                initialize(s, log, cv) {
                    s.str = cfg.str;
                    if (cv && cv.str) s.str = V.parseStr(cv.str);
                    s.i = 0; s.done = false;
                    log(`[Khởi tạo] ${cfg.label} — "${s.str}"`, "info");
                },
                step(s, log) {
                    if (s.i >= s.str.length) { s.done = true; log("[Kết quả] Duyệt xong chuỗi", "success"); return; }
                    log(`Bước ${s.stepIndex}: xét ký tự '${s.str[s.i]}' tại ${s.i}`, "info");
                    s.i++;
                },
                render(s, canvas, stats) {
                    V.statsBar(stats, [
                        { label: "i", value: s.done ? "done" : s.i, cls: "accent" },
                        { label: "Chuỗi", value: `"${s.str}"`, cls: "" },
                        { label: "Ký tự", value: s.done ? "—" : `"${s.str[s.i]}"`, cls: "warn" }
                    ]);
                    const stage = V.stage();
                    const sec = V.section(stage, 1, cfg.label);
                    sec.appendChild(V.charRow(s.str, { active: s.done ? -1 : s.i, dimmed: idx => idx < s.i }));
                    canvas.appendChild(stage);
                },
                renderControls(s, c, cv) {
                    strCtrl(c, cv, s, "Input", cfg.str, cfg.str);
                }
            });
        } else {
            reg(numId, {
                initialize(s, log, cv) {
                    V.applyNums(s, cv, "nums", cfg.nums.slice());
                    s.i = 0; s.left = 0; s.right = s.nums.length - 1; s.done = false;
                    log(`[Khởi tạo] ${cfg.label} — [${s.nums.join(", ")}]`, "info");
                },
                step(s, log) {
                    if (s.i >= s.nums.length) { s.done = true; log("[Kết quả] Hoàn tất", "success"); return; }
                    log(`Bước ${s.stepIndex}: nums[${s.i}]=${s.nums[s.i]}`, "info");
                    s.i++;
                },
                render(s, canvas, stats) {
                    V.statsBar(stats, [
                        { label: "i", value: s.done ? "done" : s.i, cls: "accent" },
                        { label: "Giá trị", value: s.done ? "—" : s.nums[s.i], cls: "warn" },
                        { label: "Size", value: s.nums.length, cls: "success" }
                    ]);
                    const stage = V.stage();
                    const sec = V.section(stage, 1, cfg.label);
                    if ([84].includes(numId)) sec.appendChild(V.barChart(s.nums, { active: s.done ? -1 : s.i }));
                    else sec.appendChild(V.arrayRow(s.nums, { active: s.done ? -1 : s.i, pointers: s.done ? [] : [{ idx: s.i, label: "i ▼" }], dimmed: idx => idx < s.i }));
                    canvas.appendChild(stage);
                },
                renderControls(s, c, cv) {
                    numsCtrl(c, cv, s, "Mảng", cfg.nums, cfg.nums[0] || 0);
                }
            });
        }
    });

})();
