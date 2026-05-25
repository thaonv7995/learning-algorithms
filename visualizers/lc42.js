window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[42] = {
    initialize: function(state, log, customValues) {
        state.nums = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
        if (customValues && customValues.nums) {
            const parsed = customValues.nums.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
            if (parsed.length > 0) state.nums = parsed;
        }
        state.left = 0;
        state.right = state.nums.length - 1;
        state.leftMax = 0;
        state.rightMax = 0;
        state.water = 0;
        state.waterLevels = Array(state.nums.length).fill(0);
        state.activePointer = null; // 'L' or 'R'
        state.activeTrapped = null; // { idx, val }
        log(`[Khởi tạo] Trapping Rain Water. Cột độ cao: [${state.nums.join(", ")}]. Con trỏ L=0, R=${state.right}.`, "info");
    },
    step: function(state, log, stopAuto) {
        state.activeTrapped = null;

        if (state.left >= state.right) {
            state.done = true;
            log(`[KẾT QUẢ] Hai con trỏ chạm nhau tại L=R=${state.left}. Tổng lượng nước mưa đọng lại = ${state.water} đơn vị!`, "success");
            return;
        }

        const hl = state.nums[state.left];
        const hr = state.nums[state.right];

        if (hl < hr) {
            state.activePointer = 'L';
            if (hl >= state.leftMax) {
                state.leftMax = hl;
                log(`Bước ${state.stepIndex}: Cột L=${state.left} (h=${hl}) &ge; leftMax cũ. Cập nhật leftMax=${state.leftMax}. Không đọng nước.`, "info");
            } else {
                const trapped = state.leftMax - hl;
                state.water += trapped;
                state.waterLevels[state.left] = trapped;
                state.activeTrapped = { idx: state.left, val: trapped };
                log(`Bước ${state.stepIndex}: Cột L=${state.left} (h=${hl}) &lt; leftMax=${state.leftMax}. Tích lũy đọng +${trapped} đơn vị nước.`, "success");
            }
            state.left++;
        } else {
            state.activePointer = 'R';
            if (hr >= state.rightMax) {
                state.rightMax = hr;
                log(`Bước ${state.stepIndex}: Cột R=${state.right} (h=${hr}) &ge; rightMax cũ. Cập nhật rightMax=${state.rightMax}. Không đọng nước.`, "info");
            } else {
                const trapped = state.rightMax - hr;
                state.water += trapped;
                state.waterLevels[state.right] = trapped;
                state.activeTrapped = { idx: state.right, val: trapped };
                log(`Bước ${state.stepIndex}: Cột R=${state.right} (h=${hr}) &lt; rightMax=${state.rightMax}. Tích lũy đọng +${trapped} đơn vị nước.`, "success");
            }
            state.right--;
        }
    },
    render: function(state, sandboxCanvas, statsPanel) {
        statsPanel.innerHTML = `
            <div>TỔNG NƯỚC MƯA ĐỌNG: <span style="color:var(--primary); font-size:1.2rem; font-weight:bold;">${state.water} đơn vị</span></div>
            <div>LEFT MAX CỰC ĐẠI L: <span style="color:var(--easy); font-weight:bold;">${state.leftMax}</span></div>
            <div>RIGHT MAX CỰC ĐẠI R: <span style="color:var(--hard); font-weight:bold;">${state.rightMax}</span></div>
        `;

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "10px";
        container.style.width = "100%";
        container.style.padding = "5px";

        const canvas = document.createElement("div");
        canvas.style.display = "flex";
        canvas.style.justifyContent = "space-between";
        canvas.style.alignItems = "flex-end";
        canvas.style.height = "220px";
        canvas.style.background = "linear-gradient(180deg, #090d16 0%, #0f172a 100%)";
        canvas.style.border = "1px solid var(--border-color)";
        canvas.style.borderRadius = "12px";
        canvas.style.padding = "25px 12px 35px 12px";
        canvas.style.width = "100%";
        canvas.style.position = "relative";
        canvas.style.boxShadow = "inset 0 4px 15px rgba(0,0,0,0.5)";

        const maxVal = Math.max(...state.nums, 1);
        const scale = 140 / maxVal;

        // Draw LeftMax horizontal scanning guide line
        if (state.leftMax > 0) {
            const lLine = document.createElement("div");
            lLine.style.position = "absolute";
            lLine.style.bottom = `${35 + state.leftMax * scale}px`;
            lLine.style.left = "12px";
            lLine.style.width = "45%";
            lLine.style.borderTop = "1.5px dashed var(--easy)";
            lLine.style.opacity = "0.7";
            lLine.style.zIndex = "5";
            lLine.innerHTML = `<span style="font-size:0.55rem; color:var(--easy); position:absolute; top:-14px; left:2px; font-weight:bold; font-family:monospace; background:#090d16; padding:0 3px; border-radius:2px;">L-Max: ${state.leftMax}</span>`;
            canvas.appendChild(lLine);
        }

        // Draw RightMax horizontal scanning guide line
        if (state.rightMax > 0) {
            const rLine = document.createElement("div");
            rLine.style.position = "absolute";
            rLine.style.bottom = `${35 + state.rightMax * scale}px`;
            rLine.style.right = "12px";
            rLine.style.width = "45%";
            rLine.style.borderTop = "1.5px dashed var(--hard)";
            rLine.style.opacity = "0.7";
            rLine.style.zIndex = "5";
            rLine.innerHTML = `<span style="font-size:0.55rem; color:var(--hard); position:absolute; top:-14px; right:2px; font-weight:bold; font-family:monospace; background:#090d16; padding:0 3px; border-radius:2px;">R-Max: ${state.rightMax}</span>`;
            canvas.appendChild(rLine);
        }

        state.nums.forEach((h, idx) => {
            const isL = idx === state.left;
            const isR = idx === state.right;
            const waterH = state.waterLevels[idx];

            const colContainer = document.createElement("div");
            colContainer.style.display = "flex";
            colContainer.style.flexDirection = "column";
            colContainer.style.alignItems = "center";
            colContainer.style.width = "18px";
            colContainer.style.position = "relative";
            colContainer.style.zIndex = "10";

            // Water Block (trapped rain water)
            if (waterH > 0) {
                const waterBlock = document.createElement("div");
                waterBlock.style.width = "100%";
                waterBlock.style.height = `${waterH * scale}px`;
                waterBlock.style.background = "linear-gradient(180deg, rgba(56, 189, 248, 0.75) 0%, rgba(2, 132, 199, 0.45) 100%)";
                waterBlock.style.border = "1px solid rgba(56, 189, 248, 0.6)";
                waterBlock.style.borderRadius = "3px 3px 0 0";
                
                if (state.activeTrapped && state.activeTrapped.idx === idx) {
                    waterBlock.classList.add("anim-pop");
                    waterBlock.style.boxShadow = "0 0 10px rgba(56, 189, 248, 0.8)";
                } else {
                    waterBlock.style.boxShadow = "inset 0 1px 4px rgba(255,255,255,0.2)";
                }

                colContainer.appendChild(waterBlock);
            }

            // Pillar block
            const bar = document.createElement("div");
            bar.style.width = "100%";
            bar.style.height = `${h * scale}px`;
            bar.style.borderRadius = "2px 2px 0 0";
            bar.style.transition = "all 0.3s ease";
            bar.style.position = "relative";
            bar.innerHTML = `<span style="font-size:0.55rem; color:#64748b; margin-bottom:-22px; position:absolute; bottom:0; left:3px;">${idx}</span>`;
            
            if (h > 0) {
                bar.style.background = "linear-gradient(180deg, #334155 0%, #1e293b 100%)";
                bar.style.border = "1.5px solid #475569";
            } else {
                bar.style.background = "transparent";
            }
            
            if (isL) {
                bar.style.background = "linear-gradient(to top, var(--easy), #34d399)";
                bar.style.borderColor = "var(--easy)";
                bar.style.boxShadow = "0 0 10px rgba(16, 185, 129, 0.5)";
                bar.innerHTML += `<div style="position:absolute; bottom:-36px; left:4px; color:var(--easy); font-weight:900; font-size:0.75rem;">L</div>`;
            } else if (isR) {
                bar.style.background = "linear-gradient(to top, var(--hard), #f87171)";
                bar.style.borderColor = "var(--hard)";
                bar.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.5)";
                bar.innerHTML += `<div style="position:absolute; bottom:-36px; left:4px; color:var(--hard); font-weight:900; font-size:0.75rem;">R</div>`;
            }

            colContainer.appendChild(bar);
            canvas.appendChild(colContainer);
        });

        container.appendChild(canvas);
        sandboxCanvas.appendChild(container);
    },
    renderControls: function(state, container, customValues) {
        VizCore.controls(container, [{
            type: "array",
            id: "lc-input-nums",
            label: "Độ cao",
            values: VizCore.arrayValues(customValues, state, state.nums),
            placeholder: 0
        }], customValues);
    }
};
