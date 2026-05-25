window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[739] = {
    initialize: function(state, log, customValues) {
        state.nums = [73, 74, 75, 71, 69, 72, 76, 73];
        if (customValues && customValues.nums) {
            const parsed = customValues.nums.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
            if (parsed.length > 0) state.nums = parsed;
        }
        state.stack = []; // Stores indices
        state.ans = Array(state.nums.length).fill(0);
        state.left = 0; // Current scanning index
        state.activePop = null; // { poppedIdx, warmerIdx, dist }
        log(`[Khởi tạo] Bài toán Daily Temperatures. Mảng nhiệt độ: [${state.nums.join(", ")}]. Stack rỗng, mảng kết quả khởi tạo toàn 0.`, "info");
    },
    step: function(state, log, stopAuto) {
        state.activePop = null;

        if (state.left >= state.nums.length) {
            if (state.stack.length > 0) {
                const topIdx = state.stack.pop();
                log(`Bước ${state.stepIndex}: Duyệt xong mảng. Ngày còn lại ở chỉ số ${topIdx} (${state.nums[topIdx]}°C) không có ngày nào ấm hơn. Kết quả = 0.`, "info");
                return;
            }
            state.done = true;
            log(`[KẾT QUẢ] Đã duyệt xong toàn bộ! Mảng khoảng cách ngày chờ đợi ấm lên: [${state.ans.join(", ")}]`, "success");
            return;
        }

        const val = state.nums[state.left];

        // Check if stack top is colder than current temperature
        if (state.stack.length > 0) {
            const topIdx = state.stack[state.stack.length - 1];
            const topVal = state.nums[topIdx];
            if (val > topVal) {
                state.stack.pop();
                const dist = state.left - topIdx;
                state.ans[topIdx] = dist;
                state.activePop = { poppedIdx: topIdx, warmerIdx: state.left, dist: dist };
                log(`Bước ${state.stepIndex}: Nhiệt độ ngày ${state.left} (${val}°C) ấm hơn ngày đỉnh Stack ${topIdx} (${topVal}°C). Rút Stack, kết quả ans[${topIdx}] = ${state.left} &minus; ${topIdx} = ${dist} ngày.`, "success");
                return; // step pops one by one
            }
        }

        // Push current index to stack
        state.stack.push(state.left);
        log(`Bước ${state.stepIndex}: Nhiệt độ ngày ${state.left} (${val}°C) nhỏ hơn hoặc bằng đỉnh Stack. Đẩy chỉ số ngày ${state.left} vào Stack để chờ ngày ấm hơn.`, "info");
        state.left++;
    },
    render: function(state, sandboxCanvas, statsPanel) {
        statsPanel.innerHTML = `
            <div>QUÉT NGÀY: <span style="color:var(--primary); font-weight:800;">i = ${state.left >= state.nums.length ? "HẾT" : state.left}</span></div>
            <div>NHIỆT ĐỘ QUÉT: <span style="color:var(--medium); font-weight:800;">${state.left >= state.nums.length ? "-" : state.nums[state.left] + "°C"}</span></div>
            <div>ĐỈNH STACK CHỜ: <span style="color:var(--accent); font-weight:800;">${state.stack.length > 0 ? "ngày " + state.stack[state.stack.length - 1] + " (" + state.nums[state.stack[state.stack.length - 1]] + "°C)" : "Rỗng"}</span></div>
        `;

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "20px";
        container.style.width = "100%";
        container.style.padding = "5px";

        // Temperature blocks view
        const arrRow = document.createElement("div");
        arrRow.style.display = "flex";
        arrRow.style.gap = "10px";
        arrRow.style.justifyContent = "center";
        arrRow.style.position = "relative";
        arrRow.style.width = "100%";

        state.nums.forEach((val, idx) => {
            const cell = document.createElement("div");
            cell.style.width = "46px";
            cell.style.height = "80px";
            cell.style.border = "2px solid var(--border-color)";
            cell.style.borderRadius = "8px";
            cell.style.display = "flex";
            cell.style.flexDirection = "column";
            cell.style.justifyContent = "space-between";
            cell.style.alignItems = "center";
            cell.style.padding = "6px 0";
            cell.style.fontFamily = "monospace";
            cell.style.position = "relative";
            cell.style.background = "#151c2c";
            cell.style.transition = "all 0.3s ease";

            // Temp degree label
            const tempVal = document.createElement("div");
            tempVal.style.fontWeight = "800";
            tempVal.style.fontSize = "0.95rem";
            tempVal.style.color = "white";
            tempVal.innerText = `${val}°`;
            cell.appendChild(tempVal);

            // Wait value ans
            const waitLabel = document.createElement("div");
            waitLabel.style.fontSize = "0.7rem";
            waitLabel.style.fontWeight = "bold";
            waitLabel.style.color = "var(--accent)";
            waitLabel.innerText = state.ans[idx] > 0 ? `ans:${state.ans[idx]}` : "ans:0";
            cell.appendChild(waitLabel);

            // Index label
            const idxLabel = document.createElement("div");
            idxLabel.style.fontSize = "0.55rem";
            idxLabel.style.color = "#64748b";
            idxLabel.innerText = `ngày ${idx}`;
            cell.appendChild(idxLabel);

            // Highlight state
            if (idx === state.left) {
                cell.style.borderColor = "var(--primary)";
                cell.style.background = "rgba(56, 189, 248, 0.12)";
                cell.style.boxShadow = "0 0 10px rgba(56, 189, 248, 0.4)";
                cell.classList.add("anim-active");
                
                const label = document.createElement("div");
                label.style.position = "absolute";
                label.style.top = "-20px";
                label.style.color = "var(--primary)";
                label.style.fontSize = "0.55rem";
                label.style.fontWeight = "800";
                label.style.textTransform = "uppercase";
                label.innerText = "quét";
                cell.appendChild(label);
            } else if (state.stack.includes(idx)) {
                cell.style.borderColor = "var(--medium)";
                cell.style.background = "rgba(245, 158, 11, 0.08)";
                const isStackTop = state.stack[state.stack.length - 1] === idx;
                if (isStackTop) {
                    const label = document.createElement("div");
                    label.style.position = "absolute";
                    label.style.top = "-20px";
                    label.style.color = "var(--medium)";
                    label.style.fontSize = "0.55rem";
                    label.style.fontWeight = "800";
                    label.style.textTransform = "uppercase";
                    label.innerText = "đỉnh";
                    cell.appendChild(label);
                }
            }

            // Highlighting popped matching connection
            if (state.activePop && state.activePop.poppedIdx === idx) {
                cell.style.borderColor = "var(--easy)";
                cell.style.background = "rgba(16, 185, 129, 0.2)";
                cell.style.boxShadow = "0 0 15px var(--easy)";
                cell.classList.add("anim-pop");
            }

            arrRow.appendChild(cell);
        });

        // Drawing bridge connector on pop warmer match
        if (state.activePop) {
            const popped = state.activePop.poppedIdx;
            const warmer = state.activePop.warmerIdx;
            
            const bridge = document.createElement("div");
            bridge.style.position = "absolute";
            bridge.style.bottom = "-12px";
            bridge.style.border = "1.5px dashed var(--easy)";
            bridge.style.borderTop = "none";
            bridge.style.borderRadius = "0 0 8px 8px";
            bridge.style.zIndex = "100";
            bridge.style.transition = "all 0.3s ease";
            bridge.classList.add("anim-pop");

            setTimeout(() => {
                const cells = arrRow.children;
                if (cells[popped] && cells[warmer]) {
                    const leftOffset = cells[popped].offsetLeft + 23;
                    const rightOffset = cells[warmer].offsetLeft + 23;
                    bridge.style.left = `${leftOffset}px`;
                    bridge.style.width = `${rightOffset - leftOffset}px`;
                    bridge.style.height = "15px";
                    bridge.innerHTML = `<span style="position:absolute; bottom:-16px; left:50%; transform:translateX(-50%); font-size:0.55rem; color:var(--easy); font-weight:bold; font-family:monospace; background:#090d16; padding:0 3px;">+${state.activePop.dist} ngày</span>`;
                }
            }, 10);

            arrRow.appendChild(bridge);
        }

        container.appendChild(arrRow);

        // Stack Container view
        const bottomSection = document.createElement("div");
        bottomSection.style.display = "flex";
        bottomSection.style.justifyContent = "center";
        bottomSection.style.alignItems = "center";
        bottomSection.style.gap = "40px";
        bottomSection.style.width = "100%";

        const stackWrapper = document.createElement("div");
        stackWrapper.style.display = "flex";
        stackWrapper.style.flexDirection = "column";
        stackWrapper.style.alignItems = "center";
        stackWrapper.style.gap = "6px";

        const stackBox = document.createElement("div");
        stackBox.style.width = "130px";
        stackBox.style.height = "180px";
        stackBox.style.border = "4px solid rgba(148, 163, 184, 0.4)";
        stackBox.style.borderTop = "none";
        stackBox.style.borderRadius = "0 0 12px 12px";
        stackBox.style.background = "linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(9, 13, 22, 0.8) 100%)";
        stackBox.style.boxShadow = "inset 0 4px 15px rgba(0,0,0,0.5)";
        stackBox.style.display = "flex";
        stackBox.style.flexDirection = "column-reverse";
        stackBox.style.alignItems = "center";
        stackBox.style.gap = "6px";
        stackBox.style.padding = "8px";

        state.stack.forEach((dayIdx) => {
            const itemEl = document.createElement("div");
            itemEl.style.width = "110px";
            itemEl.style.height = "32px";
            itemEl.style.background = "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))";
            itemEl.style.border = "1.5px solid var(--medium)";
            itemEl.style.borderRadius = "6px";
            itemEl.style.display = "flex";
            itemEl.style.flexDirection = "column";
            itemEl.style.justifyContent = "center";
            itemEl.style.alignItems = "center";
            itemEl.style.color = "white";
            
            const mainLabel = document.createElement("div");
            mainLabel.style.fontWeight = "bold";
            mainLabel.style.fontSize = "0.75rem";
            mainLabel.innerText = `ngày ${dayIdx} (${state.nums[dayIdx]}°)`;
            itemEl.appendChild(mainLabel);
            
            stackBox.appendChild(itemEl);
        });

        stackWrapper.appendChild(stackBox);
        const stackLabel = document.createElement("div");
        stackLabel.style.fontSize = "0.7rem";
        stackLabel.style.fontWeight = "800";
        stackLabel.style.color = "var(--text-muted)";
        stackLabel.style.textTransform = "uppercase";
        stackLabel.innerText = "Stack Chỉ Số Giảm Dần";
        stackWrapper.appendChild(stackLabel);

        bottomSection.appendChild(stackWrapper);
        container.appendChild(bottomSection);

        sandboxCanvas.appendChild(container);
    },
    renderControls: function(state, container, customValues) {
        VizCore.controls(container, [{
            type: "array",
            id: "lc-input-nums",
            label: "Nhiệt độ",
            values: VizCore.arrayValues(customValues, state, state.nums),
            placeholder: 0
        }], customValues);
    }
};
