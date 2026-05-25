window.LeetCodeVisualizers = window.LeetCodeVisualizers || {};
window.LeetCodeVisualizers[51] = {
    initialize: function(state, log, customValues) {
        state.boardSize = 4;
        if (customValues && customValues.boardSize) {
            const parsed = parseInt(customValues.boardSize);
            if (!isNaN(parsed) && [4, 5, 6, 8].includes(parsed)) state.boardSize = parsed;
        }
        state.row = 0;
        state.queens = Array(state.boardSize).fill(-1);
        state.conflictCells = [];
        state.history = [];
        state.stepIndex = 0;

        // Generate N-Queens backtracking steps list dynamically
        const N = state.boardSize;
        const history = [];

        function solveBacktrack(r, currentQueens) {
            if (r === N) {
                history.push({
                    row: r,
                    queens: [...currentQueens],
                    conflictCells: [],
                    activeCol: -1,
                    msg: `🎉 THÀNH CÔNG! Đã xếp thành công ${N} quân hậu an toàn trên bàn cờ ${N}x${N}!`,
                    type: "success",
                    done: true
                });
                return true;
            }

            for (let c = 0; c < N; c++) {
                // Try placement
                currentQueens[r] = c;
                
                // Check conflict
                let conflicts = [];
                for (let prevR = 0; prevR < r; prevR++) {
                    let prevC = currentQueens[prevR];
                    if (prevC === c) {
                        conflicts.push({ r: prevR, c: prevC }); // Vertical conflict
                    } else if (Math.abs(prevC - c) === Math.abs(prevR - r)) {
                        conflicts.push({ r: prevR, c: prevC }); // Diagonal conflict
                    }
                }

                if (conflicts.length > 0) {
                    history.push({
                        row: r,
                        queens: [...currentQueens],
                        conflictCells: [...conflicts, { r, c }],
                        activeCol: c,
                        msg: `Hàng ${r}: Thử đặt Hậu tại Cột ${c}. Bị XUNG ĐỘT đường chéo/cột với Hậu ở các ô đỏ!`,
                        type: "error"
                    });
                    currentQueens[r] = -1; // clear
                } else {
                    history.push({
                        row: r,
                        queens: [...currentQueens],
                        conflictCells: [],
                        activeCol: c,
                        msg: `Hàng ${r}: Đặt Hậu tại Cột ${c} thành công (An toàn). Tiếp tục xuống hàng tiếp theo.`,
                        type: "info"
                    });
                    
                    if (solveBacktrack(r + 1, currentQueens)) {
                        return true;
                    }
                    
                    // Backtrack
                    history.push({
                        row: r,
                        queens: [...currentQueens],
                        conflictCells: [],
                        activeCol: c,
                        msg: `Hàng ${r + 1} bế tắc. QUAY LUI: Nhấc quân Hậu tại Hàng ${r}, Cột ${c} để thử cột kế tiếp.`,
                        type: "warning"
                    });
                    currentQueens[r] = -1;
                }
            }
            return false;
        }

        solveBacktrack(0, Array(N).fill(-1));
        state.history = history;
        log(`[Khởi tạo] Quay lui N-Queens trên bàn cờ ${N}x${N}. Tổng số bước mô phỏng: ${history.length} bước.`, "info");
    },
    step: function(state, log, stopAuto) {
        if (state.stepIndex >= state.history.length) {
            state.done = true;
            log(`[Kết thúc] Đã kết thúc tiến trình mô phỏng xếp quân hậu.`, "success");
            return;
        }

        const currState = state.history[state.stepIndex];
        state.row = currState.row;
        state.queens = [...currState.queens];
        state.conflictCells = [...currState.conflictCells];
        state.activeCol = currState.activeCol;
        state.done = currState.done || false;
        
        log(currState.msg, currState.type);
        state.stepIndex++;
    },
    render: function(state, sandboxCanvas, statsPanel) {
        statsPanel.innerHTML = `
            <div>KÍCH THƯỚC BÀN CỜ: <span style="color:var(--primary); font-weight:800;">${state.boardSize} &times; ${state.boardSize}</span></div>
            <div>BẢO MẬT HẬU: <span style="font-family:monospace; color:var(--accent); font-weight:bold;">${JSON.stringify(state.queens.map(q => q === -1 ? null : q))}</span></div>
            <div>BƯỚC HIỆN TẠI: <span style="color:var(--medium); font-weight:bold;">${state.stepIndex} / ${state.history.length}</span></div>
        `;

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.gap = "15px";
        container.style.width = "100%";

        const board = document.createElement("div");
        board.style.display = "grid";
        board.style.gridTemplateColumns = `repeat(${state.boardSize}, 36px)`;
        board.style.gridTemplateRows = `repeat(${state.boardSize}, 36px)`;
        board.style.gap = "3px";
        board.style.border = "4px solid rgba(148, 163, 184, 0.3)";
        board.style.background = "#0f172a";
        board.style.padding = "6px";
        board.style.borderRadius = "12px";
        board.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.4)";
        board.style.margin = "0 auto";
        board.style.width = `${state.boardSize * 39 + 12}px`;

        for (let r = 0; r < state.boardSize; r++) {
            for (let c = 0; c < state.boardSize; c++) {
                const cell = document.createElement("div");
                cell.style.width = "36px";
                cell.style.height = "36px";
                cell.style.display = "flex";
                cell.style.justifyContent = "center";
                cell.style.alignItems = "center";
                cell.style.fontSize = "1.2rem";
                cell.style.borderRadius = "4px";
                cell.style.transition = "all 0.2s ease";
                cell.style.position = "relative";
                
                const isDark = (r + c) % 2 === 1;
                cell.style.background = isDark ? "#1e293b" : "#0f172a";

                const isQueen = state.queens[r] === c;
                const isConflict = state.conflictCells.some(cell => cell.r === r && cell.c === c);
                const isActiveCheck = r === state.row && c === state.activeCol;

                if (isQueen) {
                    cell.innerHTML = `👑`;
                    cell.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.15))";
                    cell.style.border = "1px solid var(--easy)";
                    cell.style.boxShadow = "0 0 10px rgba(16, 185, 129, 0.4)";
                    cell.classList.add("anim-pop");
                }

                if (isConflict) {
                    cell.style.background = "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.15))";
                    cell.style.border = "1px solid var(--hard)";
                    cell.classList.add("anim-conflict");
                } else if (isActiveCheck && !isQueen) {
                    cell.style.border = "2px solid var(--primary)";
                    cell.style.background = "rgba(56, 189, 248, 0.1)";
                    cell.classList.add("anim-active");
                }

                board.appendChild(cell);
            }
        }

        container.appendChild(board);
        sandboxCanvas.appendChild(container);
    },
    renderControls: function(state, container, customValues) {
        VizCore.controls(container, [{
            type: "select",
            id: "lc-input-boardsize",
            label: "Board",
            value: customValues.boardSize || state.boardSize || 4,
            options: [
                { value: "4", label: "4×4" },
                { value: "5", label: "5×5" },
                { value: "6", label: "6×6" },
                { value: "8", label: "8×8" }
            ]
        }], customValues);
    }
};
