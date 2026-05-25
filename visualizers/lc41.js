window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};

window.LeetCodeVisualizers[41] = (function () {
    const PRESETS = {
        lc1: "1,2,0",
        lc2: "3,4,-1,1",
        lc3: "7,8,9,11,12",
        dup: "1,1",
        sparse: "2,3,5"
    };
    const PRESET_OPTS = [
        { value: "lc1", label: "LC mẫu 1 → 3" },
        { value: "lc2", label: "LC mẫu 2 → 2" },
        { value: "lc3", label: "LC mẫu 3 → 1" },
        { value: "dup", label: "Trùng 1,1 → 3" },
        { value: "sparse", label: "Thiếu 1,4 → 1" }
    ];

    function loadNums(cv) {
        const fb = [1, 2, 0];
        if (cv && cv.preset && PRESETS[cv.preset]) {
            return VizCore.parseNums(PRESETS[cv.preset]);
        }
        if (cv && cv.nums) {
            const p = VizCore.parseNums(cv.nums);
            if (p.length) return p;
        }
        return fb.slice();
    }

    function canPlace(nums, i) {
        const v = nums[i];
        return v >= 1 && v <= nums.length && nums[v - 1] !== v;
    }

    return {
        initialize(s, log, cv) {
            s.nums = loadNums(cv);
            s.n = s.nums.length;
            s.i = 0;
            s.phase = "place";
            s.answer = null;
            s.lastSwap = null;
            s.done = false;
            log(`[Khởi tạo] First Missing Positive — cyclic sort in-place`, "info");
            log(`nums=[${s.nums.join(", ")}]`, "info");
        },

        step(s, log) {
            if (s.done) return;
            s.lastSwap = null;

            if (s.phase === "place") {
                if (s.i >= s.n) {
                    s.phase = "scan";
                    s.i = 0;
                    log(`[Giai đoạn 2] Quét tìm i đầu tiên: nums[i] ≠ i+1`, "info");
                    return;
                }
                const v = s.nums[s.i];
                if (canPlace(s.nums, s.i)) {
                    const j = v - 1;
                    s.nums[s.i] = s.nums[j];
                    s.nums[j] = v;
                    s.lastSwap = [s.i, j];
                    log(`Hoán vị: đặt ${v} vào index ${j} (từ i=${s.i})`, "info");
                } else {
                    log(`i=${s.i}, nums[i]=${v} — đã đúng vị trí hoặc ngoài [1,n], i++`, "info");
                    s.i++;
                }
                return;
            }

            if (s.phase === "scan") {
                if (s.i >= s.n) {
                    s.answer = s.n + 1;
                    s.done = true;
                    s.outputText = String(`Đủ 1..${s.n} → trả ${s.answer}`); log(`[KẾT QUẢ] Đủ 1..${s.n} → trả ${s.answer}`, "success");
                    return;
                }
                if (s.nums[s.i] !== s.i + 1) {
                    s.answer = s.i + 1;
                    s.done = true;
                    s.outputText = String(`nums[${s.i}]=${s.nums[s.i]} ≠ ${s.i + 1} → thiếu ${s.answer}`); log(`[KẾT QUẢ] nums[${s.i}]=${s.nums[s.i]} ≠ ${s.i + 1} → thiếu ${s.answer}`, "success");
                    return;
                }
                log(`i=${s.i}: nums[i]=${s.nums[s.i]} ✓`, "info");
                s.i++;
            }
        },

        render(s, c, st) {
            const expected = s.phase === "scan" && s.i < s.n ? s.i + 1 : null;
            VizCore.statsBar(st, [
                { label: "phase", value: s.phase, cls: "accent" },
                { label: "i", value: s.done ? "—" : s.i, cls: "warn" },
                { label: "answer", value: s.answer != null ? s.answer : "?", cls: s.done ? "success" : "" }
            ]);
            const stage = VizCore.stage();
            const sec = VizCore.section(stage, 1,
                s.phase === "place"
                    ? "Cyclic sort — đặt x vào index x−1"
                    : "Quét — tìm vị trí đầu tiên nums[i] ≠ i+1");
            const pointers = [];
            if (!s.done && s.phase === "place") pointers.push({ idx: s.i, label: "i▼" });
            if (!s.done && s.phase === "scan") pointers.push({ idx: s.i, label: "scan▼" });
            const found = [];
            if (s.lastSwap) found.push(...s.lastSwap);
            else if (s.phase === "place" && s.i < s.n && canPlace(s.nums, s.i))
                found.push(s.nums[s.i] - 1);
            sec.appendChild(VizCore.arrayRow(s.nums, {
                pointers,
                found: [...new Set(found)],
                highlight: idx => s.phase === "scan" && idx === s.i && s.nums[idx] !== idx + 1
            }));
            if (expected != null && s.phase === "scan") {
                const hint = document.createElement("p");
                hint.style.cssText = "font-size:0.72rem;color:#94a3b8;margin-top:8px;";
                hint.textContent = `Kỳ vọng tại i=${s.i}: nums[i] = ${expected}`;
                sec.appendChild(hint);
            }
            if (s.done && s.answer != null) {
                const box = document.createElement("div");
                box.style.cssText = "margin-top:10px;padding:10px 14px;border-radius:8px;background:#14532d33;border:1px solid #22c55e;color:#86efac;font-family:monospace;font-size:0.9rem;";
                box.textContent = `firstMissingPositive = ${s.answer}`;
                sec.appendChild(box);
            }
            c.appendChild(stage);
        },

        renderControls(s, c, cv) {
            const preset = (cv && cv.preset) || "lc1";
            VizCore.controls(c, [
                { type: "select", id: "lc-input-preset", label: "Mẫu", value: preset, options: PRESET_OPTS },
                { type: "array", id: "lc-input-nums", label: "nums", values: VizCore.arrayValues(cv, s, s.nums) }
            ], cv);
            const sel = c.querySelector("#lc-input-preset");
            const ae = c.querySelector(".viz-array-editor");
            if (sel && ae) {
                sel.addEventListener("change", () => {
                    if (!PRESETS[sel.value]) return;
                    const vals = PRESETS[sel.value].split(",").map(x => parseInt(x.trim(), 10));
                    ae.querySelectorAll(".viz-array-edit-cell input").forEach((inp, idx) => {
                        if (vals[idx] != null) inp.value = vals[idx];
                    });
                    if (window.VizCore) VizCore.syncArrayEditorHidden(ae);
                });
            }
        }
    };
})();
