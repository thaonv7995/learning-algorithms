window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[11] = {
    initialize: function(state, log, customValues) {
        state.nums = [1, 8, 6, 2, 5, 4, 8, 3, 7];
        if (customValues && customValues.nums) {
            const parsed = customValues.nums.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
            if (parsed.length > 0) state.nums = parsed;
        }
        state.left = 0;
        state.right = state.nums.length - 1;
        state.maxArea = 0;
        state.currArea = 0;
        state.width = 0;
        state.minH = 0;
        log(`[Khởi tạo] Bài toán Container With Most Water. L=0 (h=${state.nums[0]}), R=${state.right} (h=${state.nums[state.right]}).`, "info");
    },
    step: function(state, log, stopAuto) {
        if (state.left >= state.right) {
            state.done = true;
            log(`[KẾT QUẢ] Hai con trỏ đụng độ tại L=R=${state.left}. Diện tích lớn nhất có thể chứa nước = ${state.maxArea}!`, "success");
            return;
        }

        const hl = state.nums[state.left];
        const hr = state.nums[state.right];
        state.width = state.right - state.left;
        state.minH = Math.min(hl, hr);
        state.currArea = state.width * state.minH;
        
        let updateMsg = "";
        if (state.currArea > state.maxArea) {
            state.maxArea = state.currArea;
            updateMsg = ` -> CẬP NHẬT KỶ LỤC DIỆN TÍCH LỚN NHẤT: ${state.maxArea}!`;
        }

        log(`Bước ${state.stepIndex}: Xét L=${state.left} (h=${hl}), R=${state.right} (h=${hr}). Chiều rộng=${state.width}, Chiều cao tối thiểu=${state.minH}. Diện tích = ${state.currArea}${updateMsg}`, state.currArea === state.maxArea ? "success" : "info");

        // Move pointer with lower height
        if (hl < hr) {
            state.left++;
        } else {
            state.right--;
        }
    },
    render: function(state, sandboxCanvas, statsPanel) {
        statsPanel.innerHTML = `
            <div>DIỆN TÍCH LỚN NHẤT: <span style="color:var(--accent); font-size:1.15rem; font-weight:bold;">${state.maxArea}</span></div>
            <div>DIỆN TÍCH HIỆN TẠI: <span style="color:var(--primary); font-weight:bold;">${state.currArea}</span></div>
            <div>VỊ TRÍ CON TRỎ: <span style="color:var(--easy); font-weight:bold;">L = ${state.left}</span>, <span style="color:var(--hard); font-weight:bold;">R = ${state.right}</span></div>
        `;

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "15px";
        container.style.width = "100%";
        container.style.padding = "5px";

        // Formula Calculator panel
        const calcBoard = document.createElement("div");
        calcBoard.style.background = "#0f172a";
        calcBoard.style.border = "1px solid var(--border-color)";
        calcBoard.style.borderRadius = "8px";
        calcBoard.style.padding = "8px 12px";
        calcBoard.style.fontFamily = "monospace";
        calcBoard.style.fontSize = "0.82rem";
        calcBoard.style.display = "flex";
        calcBoard.style.justifyContent = "center";
        calcBoard.style.alignItems = "center";
        calcBoard.style.gap = "10px";

        if (state.left < state.right && !state.done) {
            const hl = state.nums[state.left];
            const hr = state.nums[state.right];
            const w = state.right - state.left;
            const mh = Math.min(hl, hr);
            const a = w * mh;
            
            calcBoard.innerHTML = `
                <div style="color:var(--text-muted);">DIỆN TÍCH:</div>
                <div style="color:var(--primary); font-weight:bold;">${w} (R&minus;L)</div>
                <div style="color:var(--text-muted);">&times;</div>
                <div style="color:var(--medium); font-weight:bold;">${mh} (min)</div>
                <div style="color:var(--text-muted);">&equals;</div>
                <div style="color:var(--accent); font-weight:bold; font-size:0.95rem;">${a}</div>
            `;
        } else {
            calcBoard.innerHTML = `<span style="color:#64748b; font-style:italic;">-- Mô phỏng hoàn tất --</span>`;
        }
        container.appendChild(calcBoard);

        const canvas = document.createElement("div");
        canvas.style.display = "flex";
        canvas.style.justifyContent = "space-between";
        canvas.style.alignItems = "flex-end";
        canvas.style.height = "220px";
        canvas.style.background = "linear-gradient(180deg, #090d16 0%, #0f172a 100%)";
        canvas.style.border = "1px solid var(--border-color)";
        canvas.style.borderRadius = "12px";
        canvas.style.padding = "25px 15px 35px 15px";
        canvas.style.position = "relative";
        canvas.style.width = "100%";
        canvas.style.boxShadow = "inset 0 4px 15px rgba(0,0,0,0.5)";

        // Render columns
        const maxVal = Math.max(...state.nums);
        const scale = maxVal > 0 ? (150 / maxVal) : 1;

        state.nums.forEach((h, idx) => {
            const isL = idx === state.left;
            const isR = idx === state.right;

            const bar = document.createElement("div");
            bar.style.width = "22px";
            bar.style.height = `${h * scale}px`;
            bar.style.borderRadius = "4px 4px 0 0";
            bar.style.position = "relative";
            bar.style.zIndex = "10";
            bar.style.display = "flex";
            bar.style.flexDirection = "column";
            bar.style.alignItems = "center";
            bar.style.justifyContent = "flex-end";
            bar.style.color = "#cbd5e1";
            bar.style.fontSize = "0.7rem";
            bar.style.fontWeight = "bold";
            bar.style.transition = "all 0.3s ease";
            bar.innerHTML = `<span style="margin-bottom:4px; z-index: 12; text-shadow: 0 1px 4px rgba(0,0,0,0.8);">${h}</span><span style="font-size:0.55rem; color:#64748b; margin-bottom:-22px; position:absolute; bottom:0;">${idx}</span>`;

            if (isL) {
                bar.style.background = "linear-gradient(to top, var(--easy), #34d399)";
                bar.style.boxShadow = "0 0 12px rgba(16, 185, 129, 0.6)";
                bar.classList.add("anim-active");
                bar.innerHTML += `<div style="position:absolute; bottom:-36px; color:var(--easy); font-weight:900; font-size:0.8rem;">L</div>`;
            } else if (isR) {
                bar.style.background = "linear-gradient(to top, var(--hard), #f87171)";
                bar.style.boxShadow = "0 0 12px rgba(239, 68, 68, 0.6)";
                bar.classList.add("anim-active");
                bar.innerHTML += `<div style="position:absolute; bottom:-36px; color:var(--hard); font-weight:900; font-size:0.8rem;">R</div>`;
            } else {
                bar.style.background = "#1e293b";
            }

            canvas.appendChild(bar);
        });

        // Draw ocean water blue area between L and R
        if (state.left < state.right && !state.done) {
            const wl = state.left;
            const wr = state.right;
            const minHeightVal = Math.min(state.nums[wl], state.nums[wr]);

            const waterOverlay = document.createElement("div");
            waterOverlay.style.position = "absolute";
            waterOverlay.style.bottom = "35px";
            waterOverlay.style.background = "linear-gradient(180deg, rgba(56, 189, 248, 0.35) 0%, rgba(2, 132, 199, 0.15) 100%)";
            waterOverlay.style.borderTop = "2px dashed var(--primary)";
            waterOverlay.style.boxShadow = "0 4px 15px rgba(2, 132, 199, 0.15)";
            waterOverlay.style.zIndex = "2";
            waterOverlay.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
            
            // Calculate offsets
            setTimeout(() => {
                const bars = canvas.children;
                if (bars[wl] && bars[wr]) {
                    const lOffset = bars[wl].offsetLeft + 22; // start after L bar
                    const rOffset = bars[wr].offsetLeft; // end before R bar
                    waterOverlay.style.left = `${lOffset}px`;
                    waterOverlay.style.width = `${rOffset - lOffset}px`;
                    waterOverlay.style.height = `${minHeightVal * scale}px`;
                }
            }, 10);

            canvas.appendChild(waterOverlay);
        }

        container.appendChild(canvas);
        sandboxCanvas.appendChild(container);
    },
    renderControls: function(state, container, customValues) {
        container.innerHTML = `
            <div style="display: flex; gap: 8px; align-items: center;">
                <span style="color: var(--text-muted); font-size: 0.75rem;">Chiều cao:</span>
                <input type="text" id="lc-input-nums" value="${customValues.nums || state.nums.join(',')}" placeholder="ví dụ: 1,8,6,2,5" style="width: 140px; background: #090d16; border: 1px solid var(--border-color); border-radius: 4px; padding: 4px 8px; color: white; font-size: 0.75rem; font-family: monospace; outline: none;">
            </div>
        `;
    }
};
