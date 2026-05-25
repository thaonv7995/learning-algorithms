window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[4] = {
    initialize: function (state, log, customValues) {
        state.nums1 = [1, 3];
        state.nums2 = [2];
        if (customValues && customValues.nums) {
            const a = VizCore.parseNums(customValues.nums);
            if (a.length) state.nums1 = a;
        }
        if (customValues && customValues.str) {
            const b = VizCore.parseNums(customValues.str);
            if (b.length) state.nums2 = b;
        }
        state.lo = 0;
        state.hi = state.nums1.length;
        state.mid = Math.floor((state.lo + state.hi) / 2);
        state.found = false;
        log(`[Khởi tạo] Median — nums1=[${state.nums1}], nums2=[${state.nums2}]`, "info");
    },

    partition: function (nums1, nums2, i) {
        const m = nums1.length, n = nums2.length;
        const j = Math.floor((m + n + 1) / 2) - i;
        const maxLX = i === 0 ? -Infinity : nums1[i - 1];
        const minRX = i === m ? Infinity : nums1[i];
        const maxLY = j === 0 ? -Infinity : nums2[j - 1];
        const minRY = j === n ? Infinity : nums2[j];
        return { i, j, maxLX, minRX, maxLY, minRY, ok: maxLX <= minRY && maxLY <= minRX };
    },

    step: function (state, log) {
        if (state.found || state.done) {
            state.done = true;
            return;
        }
        const p = this.partition(state.nums1, state.nums2, state.mid);
        state.part = p;
        log(`Bước ${state.stepIndex}: partitionX=${p.i}, partitionY=${p.j} | maxL=${p.maxLX},${p.maxLY} minR=${p.minRX},${p.minRY}`, "info");

        if (p.ok) {
            state.found = true;
            state.done = true;
            const m = state.nums1.length, n = state.nums2.length;
            let med;
            if ((m + n) % 2 === 1) med = Math.max(p.maxLX, p.maxLY);
            else med = (Math.max(p.maxLX, p.maxLY) + Math.min(p.minRX, p.minRY)) / 2;
            state.median = med;
            s.outputText = String(`Partition hợp lệ → median = ${med}`); log(`[KẾT QUẢ] Partition hợp lệ → median = ${med}`, "success");
            return;
        }
        if (p.maxLX > p.minRY) {
            state.hi = state.mid - 1;
            log(`maxLeftX > minRightY → thu hi partitionX (hi=${state.hi})`, "info");
        } else {
            state.lo = state.mid + 1;
            log(`maxLeftY > minRightX → tăng partitionX (lo=${state.lo})`, "info");
        }
        if (state.lo > state.hi) {
            state.done = true;
            log("[Lỗi] Không tìm thấy partition (input bất thường)", "error");
            return;
        }
        state.mid = Math.floor((state.lo + state.hi) / 2);
    },

    render: function (state, sandboxCanvas, statsPanel) {
        const p = state.part || this.partition(state.nums1, state.nums2, state.mid);
        VizCore.statsBar(statsPanel, [
            { label: "partitionX", value: p.i, cls: "accent" },
            { label: "partitionY", value: p.j, cls: "warn" },
            { label: "lo/hi", value: `${state.lo}/${state.hi}`, cls: "" },
            { label: "median", value: state.median != null ? state.median : "—", cls: "success" }
        ]);

        const stage = VizCore.stage();
        const sec = VizCore.section(stage, 1, "Binary search trên đường cắt nums1 (mảng nhỏ hơn)");

        function arrayPartitionRow(label, arr, cut) {
            const row = document.createElement("div");
            row.style.cssText = "display:flex;align-items:center;gap:10px;margin:8px 0;flex-wrap:wrap;";
            const lab = document.createElement("span");
            lab.textContent = label;
            lab.style.cssText = "font-size:0.7rem;font-weight:700;color:var(--muted);min-width:52px;";
            row.appendChild(lab);
            const cells = document.createElement("div");
            cells.className = "viz-array-row";
            arr.forEach((v, idx) => {
                const wrap = document.createElement("div");
                wrap.className = "viz-cell-wrap";
                const cell = document.createElement("div");
                cell.className = "viz-cell";
                if (idx < cut) cell.style.borderColor = "#818cf8";
                else cell.style.borderColor = "#f87171";
                cell.innerHTML = `<span class="val">${v}</span><span class="idx">${idx}</span>`;
                wrap.appendChild(cell);
                cells.appendChild(wrap);
            });
            row.appendChild(cells);
            return row;
        }

        sec.appendChild(arrayPartitionRow("nums1", state.nums1, p.i));
        sec.appendChild(arrayPartitionRow("nums2", state.nums2, p.j));

        sec.appendChild(VizCore.flowEquation([
            { label: "maxL", val: `${p.maxLX}|${p.maxLY}`, cls: "accent" },
            { op: "≤" },
            { label: "minR", val: `${p.minRY}|${p.minRX}`, cls: "warn" },
            { op: p.ok ? "✓" : "…" }
        ]));

        sandboxCanvas.appendChild(stage);
    },

    renderControls: function (state, container, customValues) {
        VizCore.controls(container, [
            { type: "array", id: "lc-input-nums", label: "nums1", values: VizCore.parseNums(customValues.nums || state.nums1.join(",")).length ? VizCore.parseNums(customValues.nums || state.nums1.join(",")) : state.nums1 },
            { type: "array", id: "lc-input-str", label: "nums2", values: VizCore.parseNums(customValues.str || state.nums2.join(",")).length ? VizCore.parseNums(customValues.str || state.nums2.join(",")) : state.nums2 }
        ], customValues);
    }
};
