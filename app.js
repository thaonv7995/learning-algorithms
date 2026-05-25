/* ==========================================================================
   INTERACTIVE APP & ALGORITHM VISUALIZER CONTROLLER (app.js)
   Sách Cấu Trúc Dữ Liệu & Giải Thuật Tương Tác Chuẩn A4
   ========================================================================== */

function startApp() {
    // DOM Elements
    const btnModeInteractive = document.getElementById("btn-mode-interactive");
    const btnModePrint = document.getElementById("btn-mode-print");
    const btnToggleSandbox = document.getElementById("btn-toggle-sandbox");
    const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
    const btnTriggerPrint = document.getElementById("btn-trigger-print");
    
    const interactiveLayout = document.getElementById("interactive-layout");
    const printLayout = document.getElementById("print-layout");
    const readingContent = document.getElementById("reading-content");
    const visualizerSandbox = document.getElementById("visualizer-sandbox");
    const tocSidebar = document.querySelector(".toc-sidebar");
    const sidebarItems = document.querySelectorAll(".toc-item");
    
    // Sandbox Elements
    const sandboxTitle = document.getElementById("sandbox-title");
    const sandboxControls = document.getElementById("sandbox-controls");
    const sandboxCanvas = document.getElementById("sandbox-canvas");
    const sandboxLogs = document.getElementById("sandbox-logs");

    // Global Visualizer States
    let activeChapter = 1;
    let animationSpeed = 500; // ms delay
    let currentTask = null; // To cancel running sorting / traversal animations

    // Global Sandbox States declared at the top to prevent temporal dead zone (TDZ) ReferenceErrors
    let variables = {};
    let pointers = {};
    let arrData = [10, 20, 30];
    let arrCapacity = 4;
    let listNodes = [10, 20, 30];
    let doublyNodes = [15, 25, 35];
    let sqData = [10, 20];
    let isStackMode = true;
    const cqSize = 8;
    let cqArray = Array(cqSize).fill(null);
    let cqFront = -1;
    let cqRear = -1;
    const hashCapacity = 5;
    let hashBuckets = Array(hashCapacity).fill(null).map(() => []);
    let heapData = [50, 30, 40, 10, 20];
    let bstRoot = null;
    const graphNodes = [
        { id: 0, label: "A", x: 80, y: 120 },
        { id: 1, label: "B", x: 200, y: 50 },
        { id: 2, label: "C", x: 200, y: 190 },
        { id: 3, label: "D", x: 320, y: 50 },
        { id: 4, label: "E", x: 320, y: 190 }
    ];
    const graphEdges = [
        { u: 0, v: 1 },
        { u: 0, v: 2 },
        { u: 1, v: 3 },
        { u: 2, v: 3 },
        { u: 2, v: 4 },
        { u: 3, v: 4 }
    ];
    let sortArray = [];
    let compareArrays = { bubble: [], selection: [], insertion: [], merge: [], quick: [] };
    let compareStats = {
        bubble: { comparisons: 0, swaps: 0, time: 0, active: false, done: false },
        selection: { comparisons: 0, swaps: 0, time: 0, active: false, done: false },
        insertion: { comparisons: 0, swaps: 0, time: 0, active: false, done: false },
        merge: { comparisons: 0, swaps: 0, time: 0, active: false, done: false },
        quick: { comparisons: 0, swaps: 0, time: 0, active: false, done: false }
    };
    
    // ==========================================================================
    // 1. NAVIGATION & MODE SWITCHING
    // ==========================================================================
    
    // Toggle between Interactive Dashboard and Print Preview
    btnModeInteractive.addEventListener("click", () => {
        btnModeInteractive.classList.add("active");
        btnModePrint.classList.remove("active");
        interactiveLayout.style.display = "flex";
        printLayout.style.display = "none";
        loadChapterContent(activeChapter);
    });

    btnModePrint.addEventListener("click", () => {
        btnModePrint.classList.add("active");
        btnModeInteractive.classList.remove("active");
        interactiveLayout.style.display = "none";
        printLayout.style.display = "block";
    });

    // Hide/Show sandbox in Interactive view
    btnToggleSandbox.addEventListener("click", () => {
        if (visualizerSandbox.style.display === "none") {
            visualizerSandbox.style.display = "flex";
            btnToggleSandbox.innerHTML = '<i class="fa-solid fa-cubes"></i> Ẩn Sandbox';
        } else {
            visualizerSandbox.style.display = "none";
            btnToggleSandbox.innerHTML = '<i class="fa-solid fa-cubes"></i> Hiện Sandbox';
        }
    });

    // Hide/Show left sidebar catalog
    if (btnToggleSidebar && tocSidebar) {
        btnToggleSidebar.addEventListener("click", () => {
            tocSidebar.classList.toggle("collapsed");
            if (tocSidebar.classList.contains("collapsed")) {
                btnToggleSidebar.innerHTML = '<i class="fa-solid fa-bars"></i> Hiện Danh Mục';
            } else {
                btnToggleSidebar.innerHTML = '<i class="fa-solid fa-bars"></i> Ẩn Danh Mục';
            }
        });
    }

    // Print button
    btnTriggerPrint.addEventListener("click", () => {
        // Automatically switch to A4 Print Preview to guarantee rendering prior to printing
        interactiveLayout.style.display = "none";
        printLayout.style.display = "block";
        btnModePrint.classList.add("active");
        btnModeInteractive.classList.remove("active");
        
        // Timeout to allow styles to adapt
        setTimeout(() => {
            window.print();
        }, 100);
    });

    // Sidebar navigation
    sidebarItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            sidebarItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            
            const chapNum = parseInt(item.getAttribute("data-chapter"));
            activeChapter = chapNum;
            loadChapterContent(chapNum);
        });
    });

    // Load active chapter contents into the reading pane
    function loadChapterContent(chapterNum) {
        // Clean current running animation task
        currentTask = null;
        hideTooltip();
        
        // Map chapter number to its respective A4 virtual page HTML
        const pageId = `page-${chapterNum + 2}`; // Chapter 1 starts at page 3
        const printPage = document.getElementById(pageId);
        
        if (printPage) {
            const contentEl = printPage.querySelector(".a4-content");
            if (contentEl) {
                readingContent.innerHTML = contentEl.innerHTML;
            } else {
                readingContent.innerHTML = printPage.innerHTML;
            }
        }
        
        // Initialize the interactive sandbox controls & canvas for this chapter
        initSandbox(chapterNum);
    }

    // Initialize the default view on startup (checking URL search parameters)
    const urlParams = new URLSearchParams(window.location.search);
    const startChapterParam = urlParams.get("chapter");
    const startChapter = startChapterParam ? parseInt(startChapterParam) : 1;
    
    if (startChapter >= 1 && startChapter <= 13) {
        activeChapter = startChapter;
        // Make sure the active class is set on the correct sidebar item
        sidebarItems.forEach(i => i.classList.remove("active"));
        const activeItem = document.querySelector(`.toc-item[data-chapter="${startChapter}"]`);
        if (activeItem) activeItem.classList.add("active");
        
        loadChapterContent(startChapter);
    } else {
        loadChapterContent(1);
    }

    // ==========================================================================
    // SPLIT PANE RESIZER LOGIC
    // ==========================================================================
    const resizer = document.getElementById("resize-divider");
    const rightPanel = document.getElementById("visualizer-sandbox");
    const container = document.getElementById("interactive-layout");

    if (resizer && rightPanel && container) {
        let isResizing = false;

        resizer.addEventListener("mousedown", (e) => {
            isResizing = true;
            resizer.classList.add("resizing");
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
        });

        document.addEventListener("mousemove", (e) => {
            if (!isResizing) return;
            
            const containerWidth = container.getBoundingClientRect().width;
            const containerLeft = container.getBoundingClientRect().left;
            const mouseX = e.clientX;
            
            let newWidth = containerLeft + containerWidth - mouseX;
            
            const minWidth = 320;
            const maxWidth = containerWidth - 350; // Leave at least 350px for left layout
            
            if (newWidth < minWidth) newWidth = minWidth;
            if (newWidth > maxWidth) newWidth = maxWidth;
            
            rightPanel.style.width = `${newWidth}px`;
        });

        document.addEventListener("mouseup", () => {
            if (isResizing) {
                isResizing = false;
                resizer.classList.remove("resizing");
                document.body.style.cursor = "";
                document.body.style.userSelect = "";
            }
        });
        
        // Touch support for tablets/mobile
        resizer.addEventListener("touchstart", (e) => {
            isResizing = true;
            resizer.classList.add("resizing");
        });

        document.addEventListener("touchmove", (e) => {
            if (!isResizing) return;
            const touch = e.touches[0];
            const containerWidth = container.getBoundingClientRect().width;
            const containerLeft = container.getBoundingClientRect().left;
            let newWidth = containerLeft + containerWidth - touch.clientX;
            const minWidth = 320;
            const maxWidth = containerWidth - 350;
            if (newWidth < minWidth) newWidth = minWidth;
            if (newWidth > maxWidth) newWidth = maxWidth;
            rightPanel.style.width = `${newWidth}px`;
        });

        document.addEventListener("touchend", () => {
            isResizing = false;
            resizer.classList.remove("resizing");
        });
    }

    // Toggle Console Logs Collapsible Panel
    const btnToggleLogs = document.getElementById("btn-toggle-logs");
    const logsContainer = document.getElementById("logs-container");
    if (btnToggleLogs && logsContainer) {
        btnToggleLogs.addEventListener("click", () => {
            logsContainer.classList.toggle("collapsed");
        });
    }

    // Unified Floating Tooltip Functions
    function showTooltip(element, title, htmlContent, structCode = null) {
        let tooltip = document.getElementById("visualizer-tooltip");
        if (!tooltip) {
            tooltip = document.createElement("div");
            tooltip.className = "visualizer-tooltip";
            tooltip.id = "visualizer-tooltip";
            sandboxCanvas.appendChild(tooltip);
        }
        
        let structHtml = structCode ? `<pre class="tooltip-struct">${structCode}</pre>` : "";
        
        tooltip.innerHTML = `
            <div class="tooltip-header">
                <span class="tooltip-title"><i class="fa-solid fa-microchip"></i> ${title}</span>
                <button class="tooltip-close" id="tooltip-close-btn">&times;</button>
            </div>
            <div class="tooltip-body">
                ${htmlContent}
                ${structHtml}
            </div>
        `;
        
        tooltip.style.display = "block";
        
        // Position relative to sandboxCanvas
        const rect = element.getBoundingClientRect();
        const canvasRect = sandboxCanvas.getBoundingClientRect();
        
        const tooltipWidth = tooltip.offsetWidth || 320;
        const tooltipHeight = tooltip.offsetHeight || 180;
        
        let top = rect.top - canvasRect.top - tooltipHeight - 10;
        let left = rect.left - canvasRect.left + (rect.width - tooltipWidth) / 2;
        
        // Boundary checking within the canvas
        if (left < 10) left = 10;
        if (left + tooltipWidth > canvasRect.width - 10) {
            left = canvasRect.width - tooltipWidth - 10;
        }
        if (top < 10) {
            top = rect.bottom - canvasRect.top + 10; // show below if top cut off
        }
        
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        
        // Bind close event
        document.getElementById("tooltip-close-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            tooltip.style.display = "none";
            document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
            document.querySelectorAll(".tree-node-circle").forEach(el => el.classList.remove("selected"));
        });
    }

    function hideTooltip() {
        const tooltip = document.getElementById("visualizer-tooltip");
        if (tooltip) {
            tooltip.style.display = "none";
        }
    }

    // Dismiss tooltip when clicking outside interactive elements
    document.addEventListener("click", (e) => {
        const tooltip = document.getElementById("visualizer-tooltip");
        if (!tooltip || tooltip.style.display === "none") return;
        
        // If click is inside the tooltip or on its close button, let tooltip handle it
        if (tooltip.contains(e.target)) return;
        
        // Check if the click was on one of our interactive elements
        const isInteractive = e.target.closest(
            ".array-cell, .list-node, .dlist-node, .stack-element, .queue-element, .cq-cell, .hash-node, .tree-node-circle, .heap-array-cell, .sort-bar"
        );
        
        if (!isInteractive) {
            hideTooltip();
            document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
            document.querySelectorAll(".tree-node-circle").forEach(el => el.classList.remove("selected"));
        }
    });

    // Intercept clicks on already-selected elements to close the tooltip (Toggle on click)
    sandboxCanvas.addEventListener("click", (e) => {
        const interactiveEl = e.target.closest(
            ".array-cell, .list-node, .dlist-node, .stack-element, .queue-element, .cq-cell, .hash-node, .tree-node-circle, .heap-array-cell, .sort-bar"
        );
        if (interactiveEl) {
            if (interactiveEl.classList.contains("selected")) {
                hideTooltip();
                document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
                document.querySelectorAll(".tree-node-circle").forEach(el => el.classList.remove("selected"));
                // Stop capturing phase to prevent reopening the tooltip
                e.stopPropagation();
                e.preventDefault();
            }
        }
    }, true); // useCapture = true

    // Helper: Sleep utility to slow down animations
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Helper: Logging in Sandbox console
    function log(message, type = "info") {
        const time = new Date().toLocaleTimeString().split(" ")[0];
        const logEntry = document.createElement("div");
        logEntry.className = `log-entry ${type}`;
        logEntry.innerHTML = `<span style="color:#64748b">[${time}]</span> ${message}`;
        sandboxLogs.appendChild(logEntry);
        sandboxLogs.scrollTop = sandboxLogs.scrollHeight;
    }

    // Clear logs
    function clearLogs() {
        sandboxLogs.innerHTML = "";
    }

    // Helper: Auto-Generate random value if empty
    function autoGetNumberVal(inputId, min = 10, max = 99) {
        const input = document.getElementById(inputId);
        let val = parseInt(input.value);
        if (isNaN(val)) {
            val = Math.floor(Math.random() * (max - min + 1)) + min;
            log(`Vì bạn để trống ô nhập, hệ thống tự động sinh số ngẫu nhiên: <b style="color:var(--primary);">${val}</b> để mô phỏng!`, "warning");
        }
        return val;
    }

    function autoGetStringVal(inputId) {
        const input = document.getElementById(inputId);
        let val = input.value.trim();
        if (!val) {
            const names = ["data", "temp", "node", "x", "y", "root", "val", "key"];
            val = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 9);
            log(`Vì bạn để trống ô nhập, hệ thống tự động sinh chuỗi ngẫu nhiên: <b style="color:var(--primary);">${val}</b>`, "warning");
        }
        return val;
    }

    // ==========================================================================
    // 2. INTERACTIVE SANDBOX ARCHITECTURE
    // ==========================================================================
    
    function initSandbox(chapterNum) {
        clearLogs();
        sandboxCanvas.innerHTML = "";
        sandboxControls.innerHTML = "";
        
        const urlParams = new URLSearchParams(window.location.search);
        const problemParam = urlParams.get("problem");
        const lcId = urlParams.get("lc_id");
        if (problemParam && lcId) {
            setupLeetCodeVisualizer(parseInt(lcId), decodeURIComponent(problemParam));
            return;
        }
        
        switch(chapterNum) {
            case 1: // Pointer & Memory
                setupPointerSandbox();
                break;
            case 2: // Array & Dynamic Array
                setupArraySandbox();
                break;
            case 3: // Singly Linked List
                setupListSandbox();
                break;
            case 4: // Doubly Linked List (New!)
                setupDoublyListSandbox();
                break;
            case 5: // Stack & Queue
                setupStackQueueSandbox();
                break;
            case 6: // Circular Queue (New!)
                setupCircularQueueSandbox();
                break;
            case 7: // Hash Table
                setupHashTableSandbox();
                break;
            case 8: // Binary Heap (New!)
                setupHeapSandbox();
                break;
            case 9: // BST
                setupBSTSandbox();
                break;
            case 10: // Graph (New!)
                setupGraphSandbox();
                break;
            case 11: // Sorting
                setupSortingSandbox();
                break;
            case 12: // Dynamic Programming
                setupDPSandbox();
                break;
            case 13: // Trie (Prefix Tree)
                setupTrieSandbox();
                break;
            default:
                setupPointerSandbox();
        }
    }

    function loadVisualizerScript(lcId, callback) {
        if (window.LeetCodeVisualizers && window.LeetCodeVisualizers[lcId]) {
            callback();
            return;
        }
        const script = document.createElement("script");
        script.src = `visualizers/lc${lcId}.js`;
        script.onload = () => {
            callback();
        };
        script.onerror = () => {
            console.warn(`Visualizer script for LC #${lcId} not found, using generic fallback.`);
            callback();
        };
        document.head.appendChild(script);
    }

    function readLcCustomValues() {
        const cv = {};
        if (window.VizCore) {
            document.querySelectorAll(".viz-array-editor").forEach(ae => {
                const hid = ae.dataset.hiddenId;
                const vals = VizCore.getArrayEditorValues(ae);
                if (!hid || !vals.length) return;
                const joined = vals.join(",");
                if (hid === "lc-input-nums") cv.nums = joined;
                else if (hid === "lc-input-str") cv.str = joined;
                else cv[hid.replace("lc-input-", "")] = joined;
            });
        }
        if (!cv.nums) {
            const inputNums = document.getElementById("lc-input-nums");
            if (inputNums) cv.nums = inputNums.value;
        }
        if (!cv.str) {
            const inputStr = document.getElementById("lc-input-str");
            if (inputStr && inputStr.type !== "hidden") cv.str = inputStr.value;
            else if (inputStr) cv.str = inputStr.value;
        }
        const inputTarget = document.getElementById("lc-input-target");
        const inputBoardSize = document.getElementById("lc-input-boardsize");
        if (inputTarget) cv.target = inputTarget.value;
        if (inputBoardSize) cv.boardSize = inputBoardSize.value;
        return cv;
    }

    function setupLeetCodeVisualizer(lcId, problemTitle) {
        // Read custom input values if they already exist in DOM before clearing
        let customValues = readLcCustomValues();

        clearLogs();
        sandboxCanvas.innerHTML = "";
        sandboxControls.innerHTML = "";
        
        sandboxTitle.innerHTML = `<i class="fa-solid fa-circle-nodes" style="color:var(--primary);"></i> Mô phỏng LC #${lcId}: ${problemTitle}`;
        
        let state = {
            id: lcId,
            title: problemTitle,
            stepIndex: 0,
            running: false,
            interval: null,
            done: false,
            nums: [],
            left: 0,
            right: 0,
            maxArea: 0,
            currArea: 0,
            target: 9,
            seenMap: {},
            str: "",
            stack: [],
            listNodes: [],
            prevIdx: -1,
            currIdx: 0,
            nextIdx: 1,
            water: 0,
            leftMax: 0,
            rightMax: 0,
            waterLevels: [],
            list1: [],
            list2: [],
            p1: 0,
            p2: 0,
            mergedList: [],
            queens: [],
            boardSize: 4,
            row: 0,
            conflictCells: []
        };

        sandboxControls.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
                <div class="lc-controls-row">
                    <div class="control-group lc-controls-btns">
                        <button class="btn-ctrl btn-primary" id="lc-btn-step" disabled><i class="fa-solid fa-forward-step"></i> Từng bước</button>
                        <button class="btn-ctrl btn-success" id="lc-btn-auto" disabled><i class="fa-solid fa-play"></i> Tự động</button>
                        <button class="btn-ctrl btn-danger" id="lc-btn-reset" disabled><i class="fa-solid fa-rotate-left"></i> Đặt lại</button>
                    </div>
                    <div id="lc-custom-inputs-container">
                        <!-- Custom settings form fields get injected here dynamically -->
                    </div>
                </div>
                <div id="lc-stats-panel">
                    <div style="color:#64748b; font-size:0.75rem; font-style:italic; padding-top:8px; border-top:1px solid #1e2a42;"><i class="fa-solid fa-spinner fa-spin"></i> Đang đồng bộ Sandbox...</div>
                </div>
            </div>
        `;

        const btnStep = document.getElementById("lc-btn-step");
        const btnAuto = document.getElementById("lc-btn-auto");
        const btnReset = document.getElementById("lc-btn-reset");
        const statsPanel = document.getElementById("lc-stats-panel");
        const customInputsContainer = document.getElementById("lc-custom-inputs-container");

        function applyCustomInputs() {
            stopAuto();
            document.querySelectorAll(".viz-array-editor").forEach(ae => {
                if (window.VizCore) VizCore.syncArrayEditorHidden(ae);
            });
            const cv = readLcCustomValues();
            state.stepIndex = 0;
            state.done = false;
            const viz = window.LeetCodeVisualizers && window.LeetCodeVisualizers[state.id];
            if (viz && viz.initialize) {
                viz.initialize(state, log, cv);
                log(`[Áp dụng] Đã tải dữ liệu mới — [${cv.nums || cv.str || "…"}]`, "success");
            }
            render();
        }

        window.__lcApplyInputs = applyCustomInputs;

        function bindControls() {
            btnStep.disabled = false;
            btnAuto.disabled = false;
            btnReset.disabled = false;

            btnStep.addEventListener("click", () => {
                stopAuto();
                step();
            });

            btnAuto.addEventListener("click", () => {
                if (state.running) {
                    stopAuto();
                } else {
                    startAuto();
                }
            });

            btnReset.addEventListener("click", () => {
                stopAuto();
                setupLeetCodeVisualizer(lcId, problemTitle);
            });
        }

        function startAuto() {
            state.running = true;
            btnAuto.innerHTML = `<i class="fa-solid fa-pause"></i> Dừng lại`;
            btnAuto.className = "btn-ctrl btn-danger";
            state.interval = setInterval(step, 1000);
        }

        function stopAuto() {
            state.running = false;
            btnAuto.innerHTML = `<i class="fa-solid fa-play"></i> Tự động`;
            btnAuto.className = "btn-ctrl btn-success";
            if (state.interval) {
                clearInterval(state.interval);
                state.interval = null;
            }
        }

        function render() {
            sandboxCanvas.innerHTML = "";
            const viz = window.LeetCodeVisualizers && window.LeetCodeVisualizers[state.id];
            if (viz && viz.render) {
                viz.render(state, sandboxCanvas, statsPanel);
            } else {
                renderMissingVisualizer();
            }
        }

        function step() {
            if (state.done) {
                log("[Đã hoàn tất] Nhấn 'Đặt lại' để bắt đầu mô phỏng lại.", "success");
                stopAuto();
                return;
            }

            state.stepIndex++;
            const viz = window.LeetCodeVisualizers && window.LeetCodeVisualizers[state.id];
            if (viz && viz.step) {
                viz.step(state, log, stopAuto);
            } else {
                stepGeneric();
            }

            render();
        }

        function renderMissingVisualizer() {
            statsPanel.innerHTML = `<div style="color:#64748b;font-size:0.75rem;padding-top:8px;border-top:1px solid #1e2a42;font-style:italic;">Visualizer chưa khả dụng cho LC #${state.id}</div>`;
            sandboxCanvas.innerHTML = `<div class="viz-stage"><span class="viz-ll-empty">Đang cập nhật mô phỏng cho bài toán này…</span></div>`;
        }

        function renderGenericArray() {
            renderMissingVisualizer();
        }

        // Fallback generic step algorithm when custom visualizer is absent
        function stepGeneric() {
            if (state.left >= state.nums.length - 1) {
                state.done = true;
                log(`[KẾT QUẢ] Duyệt mảng hoàn tất.`, "success");
                return;
            }
            state.left++;
            log(`Bước ${state.stepIndex}: Di chuyển sang vị trí ${state.left} (giá trị: ${state.nums[state.left]}).`, "info");
        }

        // Dynamically load visualizer script, initialize states, bind controls and render
        loadVisualizerScript(lcId, () => {
            const viz = window.LeetCodeVisualizers && window.LeetCodeVisualizers[lcId];
            if (viz && viz.initialize) {
                viz.initialize(state, log, customValues);
            } else {
                log(`[Cảnh báo] Chưa có visualizer tùy chỉnh cho LC #${lcId}.`, "warning");
            }

            // Inject custom inputs if visualizer exposes renderControls
            if (customInputsContainer && viz && viz.renderControls) {
                viz.renderControls(state, customInputsContainer, customValues);
                if (window.VizCore && VizCore.bindApply) {
                    VizCore.bindApply(customInputsContainer, applyCustomInputs);
                }
            }

            bindControls();
            render();
        });
    }


    // --------------------------------------------------------------------------
    // 2.1 CHAPTER 1: POINTER & MEMORY MANAGEMENT SANDBOX
    // --------------------------------------------------------------------------

    function setupPointerSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-memory"></i> Trực quan hóa ô nhớ RAM';
        
        sandboxControls.innerHTML = `
            <div class="control-group">
                <input type="text" id="var-name" class="control-input" placeholder="Tên biến (VD: a)" style="max-width: 100px;">
                <input type="number" id="var-val" class="control-input" placeholder="Giá trị (VD: 42)">
                <button id="btn-declare" class="btn-ctrl"><i class="fa-solid fa-plus"></i> Khai báo int</button>
            </div>
            <div class="control-group" style="margin-top: 5px;">
                <input type="text" id="ptr-name" class="control-input" placeholder="Tên con trỏ (VD: p)" style="max-width: 100px;">
                <input type="text" id="ptr-target" class="control-input" placeholder="Trỏ tới biến (VD: a)">
                <button id="btn-create-ptr" class="btn-ctrl"><i class="fa-solid fa-arrow-pointer"></i> Tạo int*</button>
                <button id="btn-deref-set" class="btn-ctrl" style="background:#fef3c7; color:#d97706;"><i class="fa-solid fa-pen"></i> Gán *p</button>
            </div>
            <div class="control-group" style="margin-top: 5px; justify-content: space-between;">
                <button id="btn-free-all" class="btn-ctrl" style="background:#fee2e2; color:#ef4444; width:100%;"><i class="fa-solid fa-trash"></i> Giải phóng Bộ nhớ (free)</button>
            </div>
        `;

        variables = { "data": { val: 42, addr: "0x100" } };
        pointers = { "ptr": { target: "data", addr: "0x208" } };
        renderMemoryCanvas();
        log("Hệ thống RAM đã khởi tạo. Mặc định có biến <b>data</b> ở địa chỉ <b>0x100</b> và con trỏ <b>ptr</b> lưu 0x100.", "success");

        // Action Handlers
        document.getElementById("btn-declare").addEventListener("click", () => {
            const name = autoGetStringVal("var-name");
            const val = autoGetNumberVal("var-val", 1, 100);
            
            if (variables[name] || pointers[name]) {
                log(`Biến hoặc con trỏ '${name}' đã tồn tại trong bộ nhớ!`, "warning");
                return;
            }
            
            const randAddr = "0x" + Math.floor(Math.random() * 200 + 300).toString(16).toUpperCase();
            variables[name] = { val: val, addr: randAddr };
            renderMemoryCanvas();
            log(`Khai báo biến: <code>int ${name} = ${val};</code> tại địa chỉ <b>${randAddr}</b>`, "info");
        });

        document.getElementById("btn-create-ptr").addEventListener("click", () => {
            const ptrName = autoGetStringVal("ptr-name");
            let target = document.getElementById("ptr-target").value.trim();
            
            if (!target) {
                const keys = Object.keys(variables);
                if (keys.length > 0) {
                    target = keys[Math.floor(Math.random() * keys.length)];
                    log(`Vì trống ô trỏ tới, hệ thống tự động chọn biến mục tiêu: <b>${target}</b>`, "warning");
                } else {
                    log("Không có biến nào trong RAM để trỏ tới!", "warning");
                    return;
                }
            }
            if (!variables[target]) {
                log(`Biến mục tiêu '${target}' không tồn tại!`, "warning");
                return;
            }
            
            const randAddr = "0x" + Math.floor(Math.random() * 200 + 500).toString(16).toUpperCase();
            pointers[ptrName] = { target: target, addr: randAddr };
            renderMemoryCanvas();
            log(`Tạo con trỏ: <code>int *${ptrName} = &amp;${target};</code> tại <b>${randAddr}</b>`, "info");
        });

        document.getElementById("btn-deref-set").addEventListener("click", () => {
            let ptrName = document.getElementById("ptr-name").value.trim();
            if (!ptrName) {
                const keys = Object.keys(pointers);
                if (keys.length > 0) {
                    ptrName = keys[0];
                } else {
                    log("Không có con trỏ nào để giải tham chiếu!", "warning");
                    return;
                }
            }
            if (!pointers[ptrName]) {
                log(`Con trỏ '${ptrName}' không tồn tại!`, "warning");
                return;
            }
            
            const val = autoGetNumberVal("var-val", 10, 99);
            const target = pointers[ptrName].target;
            const oldVal = variables[target].val;
            variables[target].val = val;
            renderMemoryCanvas();
            log(`Thao tác Dereference: <code>*${ptrName} = ${val};</code> làm thay đổi giá trị của <b>${target}</b> từ <b>${oldVal}</b> thành <b>${val}</b>!`, "success");
        });

        document.getElementById("btn-free-all").addEventListener("click", () => {
            variables = {};
            pointers = {};
            renderMemoryCanvas();
            log("Đã giải phóng toàn bộ ô nhớ vùng Heap (free). Bộ nhớ sạch hoàn toàn!", "warning");
        });
    }

    function renderMemoryCanvas() {
        let html = `<div style="display:flex; flex-direction:column; gap:20px; width:100%; padding:20px; align-items:center;">
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">VÙNG NHỚ RAM VẬT LÝ</div>
            <div style="display:flex; flex-wrap:wrap; gap:15px; justify-content:center; position:relative; width:100%;">
        `;
        
        for (const [name, info] of Object.entries(variables)) {
            html += `
                <div class="array-cell active" style="width:90px; height:80px; cursor:pointer;" id="mem-${name}" title="Click để xem chi tiết C">
                    <div style="font-size:0.7rem; color:var(--primary); font-weight:700; padding:2px;">int ${name}</div>
                    <div class="cell-val" style="font-size:1.3rem;">${info.val}</div>
                    <div class="cell-idx" style="font-size:0.6rem;">${info.addr}</div>
                </div>
            `;
        }

        for (const [name, info] of Object.entries(pointers)) {
            const targetAddr = variables[info.target] ? variables[info.target].addr : "NULL";
            html += `
                <div class="array-cell success" style="width:90px; height:80px; border-color:var(--accent); cursor:pointer;" id="mem-${name}" title="Click để xem chi tiết C">
                    <div style="font-size:0.7rem; color:var(--accent); font-weight:700; padding:2px;">int* ${name}</div>
                    <div class="cell-val" style="font-size:0.85rem; font-family:monospace; font-weight:500;">${targetAddr}</div>
                    <div class="cell-idx" style="font-size:0.6rem; background:#ecfdf5;">${info.addr}</div>
                </div>
            `;
        }

        if (Object.keys(variables).length === 0 && Object.keys(pointers).length === 0) {
            html += `<div style="color:var(--text-muted); font-style:italic; padding:20px;">Trống - Chưa cấp phát bộ nhớ</div>`;
        }

        html += `</div></div>`;
        sandboxCanvas.innerHTML = html;

        // Bind click handlers
        for (const [name, info] of Object.entries(variables)) {
            const el = document.getElementById(`mem-${name}`);
            if (el) {
                el.addEventListener("click", () => {
                    document.querySelectorAll(".array-cell").forEach(c => c.classList.remove("selected"));
                    el.classList.add("selected");
                    
                    const title = "Khai báo Biến C (RAM Cell)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Biến cục bộ: int ${name} = ${info.val};</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ RAM</td><td>${info.addr}</td></tr>
                            <tr><td>Kiểu dữ liệu</td><td>int (Số nguyên)</td></tr>
                            <tr><td>Kích thước</td><td>sizeof(int) = 4 Bytes</td></tr>
                            <tr><td>Giá trị trong RAM</td><td>${info.val}</td></tr>
                        </table>
                    `;
                    showTooltip(el, title, content);
                });
            }
        }

        for (const [name, info] of Object.entries(pointers)) {
            const el = document.getElementById(`mem-${name}`);
            if (el) {
                el.addEventListener("click", () => {
                    document.querySelectorAll(".array-cell").forEach(c => c.classList.remove("selected"));
                    el.classList.add("selected");
                    
                    const targetAddr = variables[info.target] ? variables[info.target].addr : "NULL";
                    const targetVal = variables[info.target] ? variables[info.target].val : "N/A";
                    
                    const title = "Khai báo Con trỏ C (Pointer RAM Cell)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Con trỏ: int* ${name} = &${info.target || '?'};</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ con trỏ</td><td>${info.addr}</td></tr>
                            <tr><td>Kiểu dữ liệu</td><td>int* (Con trỏ số nguyên)</td></tr>
                            <tr><td>Kích thước</td><td>sizeof(int*) = 8 Bytes</td></tr>
                            <tr><td>Giá trị lưu (Trỏ đến)</td><td>${targetAddr}</td></tr>
                            <tr><td>Giải tham chiếu (*${name})</td><td><strong>${targetVal}</strong></td></tr>
                        </table>
                    `;
                    showTooltip(el, title, content);
                });
            }
        }
    }

    // --------------------------------------------------------------------------
    // 2.2 CHAPTER 2: ARRAY & DYNAMIC ARRAY SANDBOX
    // --------------------------------------------------------------------------

    function setupArraySandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-table-cells-large"></i> Trực quan hóa Mảng động';
        
        sandboxControls.innerHTML = `
            <div class="control-group">
                <input type="number" id="arr-val" class="control-input" placeholder="Giá trị">
                <button id="btn-arr-append" class="btn-ctrl"><i class="fa-solid fa-plus"></i> Append</button>
            </div>
            <div class="control-group" style="margin-top: 5px;">
                <input type="number" id="arr-idx" class="control-input" placeholder="Index" style="max-width:80px;">
                <button id="btn-arr-insert" class="btn-ctrl" style="background:var(--neutral-dark); color:white;"><i class="fa-solid fa-indent"></i> Insert</button>
                <button id="btn-arr-delete" class="btn-ctrl" style="background:#fee2e2; color:#ef4444;"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
            <div class="speed-slider-container" style="margin-top:10px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-arr" min="100" max="1500" value="500">
            </div>
        `;

        document.getElementById("speed-arr").addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        renderArrayCanvas();
        log("Mảng động đã khởi tạo với kích thước size=3, sức chứa capacity=4.", "success");

        // Action Handlers
        document.getElementById("btn-arr-append").addEventListener("click", async () => {
            const val = autoGetNumberVal("arr-val");
            log(`Bắt đầu append(${val})...`, "step");
            
            if (arrData.length === arrCapacity) {
                log("Lưu ý: Mảng đã đầy! Thực hiện cấp phát động nhân đôi capacity...", "warning");
                const cells = document.querySelectorAll(".array-cell");
                cells.forEach(c => c.classList.add("highlight"));
                await sleep(animationSpeed * 1.2);
                
                arrCapacity *= 2;
                renderArrayCanvas();
                log(`realloc bộ nhớ thành công! Capacity mới = ${arrCapacity}. Sao chép phần tử cũ sang...`, "success");
                await sleep(animationSpeed);
            }
            
            arrData.push(val);
            renderArrayCanvas();
            const newCell = document.getElementById(`arr-cell-${arrData.length - 1}`);
            if (newCell) newCell.classList.add("success");
            log(`Đã thêm phần tử ${val} vào cuối mảng. Size hiện tại = ${arrData.length}`, "info");
        });

        document.getElementById("btn-arr-insert").addEventListener("click", async () => {
            const val = autoGetNumberVal("arr-val");
            let idx = parseInt(document.getElementById("arr-idx").value);
            if (isNaN(idx) || idx < 0 || idx > arrData.length) {
                idx = Math.floor(Math.random() * (arrData.length + 1));
                log(`Chỉ số trống hoặc sai, tự động sinh index chèn: <b>${idx}</b>`, "warning");
            }

            log(`Bắt đầu chèn ${val} tại index ${idx}...`, "step");

            if (arrData.length === arrCapacity) {
                log("Mảng đầy! Nhân đôi capacity và sao chép phần tử cũ sang...", "warning");
                const cells = document.querySelectorAll(".array-cell");
                cells.forEach(c => c.classList.add("highlight"));
                await sleep(animationSpeed * 1.2);
                
                arrCapacity *= 2;
                renderArrayCanvas();
                log(`Cấp phát động nhân đôi capacity thành công! Capacity mới = ${arrCapacity}.`, "success");
                await sleep(animationSpeed);
            }

            // High-fidelity step-by-step shifting animation on the DOM
            for (let i = arrData.length - 1; i >= idx; i--) {
                const curCell = document.getElementById(`arr-cell-${i}`);
                if (curCell) {
                    curCell.classList.add("highlight");
                }
                await sleep(animationSpeed * 0.4);

                const nextCell = document.getElementById(`arr-cell-${i + 1}`);
                if (nextCell) {
                    nextCell.style.borderStyle = "solid";
                    nextCell.style.borderColor = "var(--primary)";
                    nextCell.style.background = "var(--primary-light)";
                    const valEl = nextCell.querySelector(".cell-val");
                    if (valEl) {
                        valEl.textContent = arrData[i];
                        valEl.style.color = "var(--neutral-dark)";
                    }
                    nextCell.classList.add("highlight");
                }
                log(`Dịch chuyển: arr[${i}] (${arrData[i]}) -> arr[${i + 1}]`, "info");
                await sleep(animationSpeed * 0.4);

                if (curCell) curCell.classList.remove("highlight");
                if (nextCell) nextCell.classList.remove("highlight");
            }

            // Complete insertion in memory and update full canvas state
            arrData.splice(idx, 0, val);
            renderArrayCanvas();

            const instCell = document.getElementById(`arr-cell-${idx}`);
            if (instCell) {
                instCell.classList.add("success");
            }
            log(`Dịch chuyển bộ nhớ hoàn tất và chèn thành công ${val} vào index ${idx}!`, "success");
            await sleep(animationSpeed);
            if (instCell) instCell.classList.remove("success");
        });

        document.getElementById("btn-arr-delete").addEventListener("click", async () => {
            let idx = parseInt(document.getElementById("arr-idx").value);
            if (isNaN(idx) || idx < 0 || idx >= arrData.length) {
                if (arrData.length === 0) return;
                idx = Math.floor(Math.random() * arrData.length);
                log(`Chỉ số trống hoặc sai, tự động chọn index xóa: <b>${idx}</b>`, "warning");
            }

            log(`Xóa phần tử tại index ${idx}...`, "step");
            const deletedVal = arrData[idx];

            const delCell = document.getElementById(`arr-cell-${idx}`);
            if (delCell) {
                delCell.classList.add("highlight");
            }
            await sleep(animationSpeed);

            // High-fidelity step-by-step shifting animation on the DOM leftwards
            for (let i = idx + 1; i < arrData.length; i++) {
                const curCell = document.getElementById(`arr-cell-${i}`);
                if (curCell) {
                    curCell.classList.add("highlight");
                }
                await sleep(animationSpeed * 0.4);

                const prevCell = document.getElementById(`arr-cell-${i - 1}`);
                if (prevCell) {
                    prevCell.style.borderStyle = "solid";
                    prevCell.style.borderColor = "var(--primary)";
                    prevCell.style.background = "#fff1f2"; // flash deletion color
                    const valEl = prevCell.querySelector(".cell-val");
                    if (valEl) {
                        valEl.textContent = arrData[i];
                        valEl.style.color = "var(--neutral-dark)";
                    }
                    prevCell.classList.add("highlight");
                }
                log(`Dồn dịch: arr[${i}] (${arrData[i]}) -> arr[${i - 1}]`, "info");
                await sleep(animationSpeed * 0.4);

                if (curCell) curCell.classList.remove("highlight");
                if (prevCell) prevCell.classList.remove("highlight");
            }

            // Update the last cell visually to show it's now empty
            const lastCell = document.getElementById(`arr-cell-${arrData.length - 1}`);
            if (lastCell) {
                lastCell.style.borderStyle = "dashed";
                lastCell.style.borderColor = "var(--neutral-border)";
                lastCell.style.background = "transparent";
                const valEl = lastCell.querySelector(".cell-val");
                if (valEl) {
                    valEl.textContent = "-";
                    valEl.style.color = "var(--text-muted)";
                }
            }
            await sleep(animationSpeed * 0.4);

            // Complete deletion in memory and update full canvas state
            arrData.splice(idx, 1);
            renderArrayCanvas();

            for(let i = idx; i < arrData.length; i++) {
                const cell = document.getElementById(`arr-cell-${i}`);
                if (cell) cell.classList.add("success");
            }
            await sleep(animationSpeed * 0.8);
            renderArrayCanvas();
            log(`Đã xóa giá trị ${deletedVal} tại index ${idx}.`, "info");
        });
    }

    function renderArrayCanvas() {
        let html = `
            <div style="display:flex; flex-direction:column; gap:10px; width:100%; padding:20px; align-items:center;">
                <div class="array-meta">
                    <span>Size: <b style="color:var(--primary); font-size:1.1rem;">${arrData.length}</b></span>
                    <span>Capacity: <b style="color:var(--accent); font-size:1.1rem;">${arrCapacity}</b></span>
                </div>
                <div class="array-container">
        `;
        for (let i = 0; i < arrCapacity; i++) {
            if (i < arrData.length) {
                html += `
                    <div class="array-cell" id="arr-cell-${i}" style="cursor:pointer;" title="Click để xem địa chỉ ô nhớ">
                        <div class="cell-val">${arrData[i]}</div>
                        <div class="cell-idx">idx: ${i}</div>
                    </div>
                `;
            } else {
                html += `
                    <div class="array-cell" style="border: 2px dashed var(--neutral-border); background: transparent; cursor:pointer;" id="arr-cell-${i}" title="Ô chưa dùng trong Capacity">
                        <div class="cell-val" style="color:var(--text-muted); font-size:0.75rem;">-</div>
                        <div class="cell-idx" style="background:transparent;">idx: ${i}</div>
                    </div>
                `;
            }
        }
        html += `</div></div>`;
        sandboxCanvas.innerHTML = html;

        // Bind click handlers
        for (let i = 0; i < arrCapacity; i++) {
            const el = document.getElementById(`arr-cell-${i}`);
            if (el) {
                el.addEventListener("click", () => {
                    document.querySelectorAll(".array-cell").forEach(c => c.classList.remove("selected"));
                    el.classList.add("selected");
                    
                    const isUsed = i < arrData.length;
                    const val = isUsed ? arrData[i] : "Chưa khởi tạo";
                    const addr = "0x" + (16128 + i * 4).toString(16).toUpperCase();
                    
                    const title = "Mảng tĩnh/động (Contiguous Array)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Phần tử mảng: arr[${i}] = ${val}</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ ô RAM</td><td>${addr}</td></tr>
                            <tr><td>Kích thước</td><td>sizeof(int) = 4 Bytes</td></tr>
                            <tr><td>Độ dời (Offset)</td><td>+${i * 4} Bytes</td></tr>
                            <tr><td>Trạng thái ô</td><td>${isUsed ? '<b style="color:var(--accent)">Đã dùng (Used)</b>' : '<span style="color:var(--text-muted)">Trống (Reserved)</span>'}</td></tr>
                        </table>
                    `;
                    showTooltip(el, title, content);
                });
            }
        }
    }

    // --------------------------------------------------------------------------
    // 2.3 CHAPTER 3: SINGLY LINKED LIST SANDBOX
    // --------------------------------------------------------------------------

    function setupListSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-link"></i> Trực quan hóa Linked List';
        
        sandboxControls.innerHTML = `
            <div class="control-group">
                <input type="number" id="list-val" class="control-input" placeholder="Giá trị">
                <button id="btn-list-head" class="btn-ctrl">Chèn Head</button>
                <button id="btn-list-tail" class="btn-ctrl">Chèn Tail</button>
            </div>
            <div class="control-group" style="margin-top: 5px;">
                <input type="number" id="list-idx" class="control-input" placeholder="Index" style="max-width:80px;">
                <button id="btn-list-insert" class="btn-ctrl" style="background:var(--neutral-dark); color:white;">Chèn vị trí</button>
                <button id="btn-list-delete" class="btn-ctrl" style="background:#fee2e2; color:#ef4444;">Xóa vị trí</button>
            </div>
            <div class="speed-slider-container" style="margin-top:10px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-list" min="100" max="1500" value="500">
            </div>
        `;

        document.getElementById("speed-list").addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        renderListCanvas();
        log("Danh sách liên kết đơn đã khởi tạo với 3 Node.", "success");

        document.getElementById("btn-list-head").addEventListener("click", () => {
            const val = autoGetNumberVal("list-val");
            log(`Chèn Node(${val}) vào đầu Head...`, "step");
            listNodes.unshift(val);
            renderListCanvas();
            const head = document.querySelector(".list-node");
            if (head) head.classList.add("success");
            log(`Tạo Node mới và gán Node->next = Head. Cập nhật Head mới.`, "info");
        });

        document.getElementById("btn-list-tail").addEventListener("click", async () => {
            const val = autoGetNumberVal("list-val");
            log(`Duyệt danh sách tìm Node cuối...`, "step");
            
            const nodes = document.querySelectorAll(".list-node");
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].classList.add("active");
                await sleep(animationSpeed * 0.4);
                nodes[i].classList.remove("active");
            }
            
            listNodes.push(val);
            renderListCanvas();
            
            const elements = document.querySelectorAll(".list-node");
            const last = elements[elements.length - 1];
            if (last) last.classList.add("success");
            log(`Gán Node_Cuối->next = Node_Mới. Node_Mới->next = NULL.`, "info");
        });

        document.getElementById("btn-list-insert").addEventListener("click", async () => {
            const val = autoGetNumberVal("list-val");
            let idx = parseInt(document.getElementById("list-idx").value);
            
            if (isNaN(idx) || idx < 0 || idx > listNodes.length) {
                idx = Math.floor(Math.random() * (listNodes.length + 1));
                log(`Chỉ số trống hoặc sai, tự chọn index chèn: <b>${idx}</b>`, "warning");
            }

            log(`Duyệt đến vị trí chèn index = ${idx}...`, "step");
            const nodes = document.querySelectorAll(".list-node");
            for (let i = 0; i < Math.min(idx, nodes.length); i++) {
                nodes[i].classList.add("active");
                await sleep(animationSpeed * 0.5);
            }
            
            listNodes.splice(idx, 0, val);
            renderListCanvas();
            
            const updatedNodes = document.querySelectorAll(".list-node");
            if (updatedNodes[idx]) updatedNodes[idx].classList.add("success");
            log(`Đã chèn Node(${val}) tại index ${idx}. Sửa con trỏ liên kết thành công.`, "info");
        });

        document.getElementById("btn-list-delete").addEventListener("click", async () => {
            let idx = parseInt(document.getElementById("list-idx").value);
            if (isNaN(idx) || idx < 0 || idx >= listNodes.length) {
                if (listNodes.length === 0) return;
                idx = Math.floor(Math.random() * listNodes.length);
                log(`Chỉ số trống hoặc sai, tự chọn index xóa: <b>${idx}</b>`, "warning");
            }

            log(`Duyệt đến index = ${idx} để xóa...`, "step");
            const nodes = document.querySelectorAll(".list-node");
            
            for (let i = 0; i < idx; i++) {
                nodes[i].classList.add("active");
                await sleep(animationSpeed * 0.5);
            }
            
            if (nodes[idx]) nodes[idx].classList.add("highlight");
            await sleep(animationSpeed * 0.8);
            
            const delVal = listNodes[idx];
            listNodes.splice(idx, 1);
            renderListCanvas();
            log(`Đã ngắt liên kết Node(${delVal}) tại index ${idx} và free giải phóng bộ nhớ!`, "info");
        });
    }

    function renderSLLNodeDetails(idx, val) {
        const baseAddr = 23568 + idx * 32;
        const hexBaseAddr = "0x" + baseAddr.toString(16).toUpperCase();
        const hexDataAddr = hexBaseAddr;
        const hexNextPtrAddr = "0x" + (baseAddr + 8).toString(16).toUpperCase();
        
        const isLast = idx === listNodes.length - 1;
        const nextAddrVal = isLast ? 0 : 23568 + (idx + 1) * 32;
        const hexNextAddr = isLast ? "0x0000 (NULL)" : "0x" + nextAddrVal.toString(16).toUpperCase();
        
        // Generate Byte-Map HTML
        let byteMapHtml = `<div class="byte-map-container">`;
        byteMapHtml += `<div class="byte-map-title"><i class="fa-solid fa-server"></i> RAM Byte Map (16 Bytes):</div>`;
        byteMapHtml += `<div class="byte-map">`;
        
        // 16 bytes
        for (let b = 0; b < 16; b++) {
            let cellClass = "";
            let label = "";
            let hexOffset = `+${b}`;
            
            if (b >= 0 && b <= 3) {
                cellClass = "type-data";
                label = `d${b}`;
            } else if (b >= 4 && b <= 7) {
                cellClass = "type-pad";
                label = "pad";
            } else {
                cellClass = "type-next";
                label = `n${b - 8}`;
            }
            
            byteMapHtml += `
                <div class="byte-cell ${cellClass}">
                    <span class="byte-offset">${hexOffset}</span>
                    <span>${label}</span>
                </div>
            `;
        }
        byteMapHtml += `</div></div>`;
        
        // C code representation
        const structCode = `struct Node {
    int data;           // Giá trị: ${val}  (Địa chỉ: ${hexDataAddr}, offset +0, size 4B)
    char _pad[4];       // Căn lề bộ nhớ  (Địa chỉ: 0x${(baseAddr + 4).toString(16).toUpperCase()}, offset +4, size 4B)
    struct Node* next;  // Trỏ tới: ${hexNextAddr}  (Địa chỉ: ${hexNextPtrAddr}, offset +8, size 8B)
}; // sizeof(struct Node) = 16 bytes`;

        const htmlContent = `
            <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:6px;">Singly Node [${idx}] (Địa chỉ: ${hexBaseAddr})</div>
            ${byteMapHtml}
            <table class="tooltip-meta-table">
                <tr><td><code>data</code> (int)</td><td>${val} (Offset +0)</td></tr>
                <tr><td><code>_pad</code> (Padding)</td><td>Char[4] (Offset +4)</td></tr>
                <tr><td><code>next</code> (int*)</td><td>${hexNextAddr} (Offset +8)</td></tr>
                <tr><td>Kích thước</td><td>sizeof(struct Node) = 16 Bytes</td></tr>
            </table>
        `;
        
        return { htmlContent, structCode };
    }

    function renderListCanvas() {
        if (listNodes.length === 0) {
            sandboxCanvas.innerHTML = `<div style="color:var(--text-muted); font-style:italic; padding:20px;">Danh sách rỗng (Head = NULL)</div>`;
            return;
        }

        let html = `
            <div class="canvas-arena" style="height: 100%;">
                <div class="list-container">
        `;
        
        listNodes.forEach((val, idx) => {
            const isLast = idx === listNodes.length - 1;
            html += `
                <div class="list-node-wrapper">
                    <div class="list-node" id="list-node-${idx}" style="cursor:pointer;" title="Click để xem cấu trúc ô nhớ">
                        <div class="node-data">${val}</div>
                        <div class="node-next-ptr">${isLast ? "NULL" : "next"}</div>
                    </div>
            `;
            if (!isLast) {
                html += `
                    <div class="list-arrow">
                        <svg viewBox="0 0 40 20" fill="none">
                            <line x1="0" y1="10" x2="35" y2="10" />
                            <polygon points="35,10 28,6 28,14" fill="#64748b" />
                        </svg>
                    </div>
                `;
            }
            html += `</div>`;
        });
        
        html += `
                </div>
            </div>
        `;
        
        sandboxCanvas.innerHTML = html;

        // Bind Click Handlers
        listNodes.forEach((val, idx) => {
            const nodeEl = document.getElementById(`list-node-${idx}`);
            if (nodeEl) {
                nodeEl.addEventListener("click", () => {
                    document.querySelectorAll(".list-node").forEach(n => n.classList.remove("selected"));
                    nodeEl.classList.add("selected");
                    const { htmlContent, structCode } = renderSLLNodeDetails(idx, val);
                    showTooltip(nodeEl, "Singly Linked List Node", htmlContent, structCode);
                });
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2.4 CHAPTER 8: DOUBLY LINKED LIST SANDBOX (NEW!)
    // --------------------------------------------------------------------------

    function setupDoublyListSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-left-right"></i> Trực quan hóa Doubly Linked List';
        
        sandboxControls.innerHTML = `
            <div class="control-group">
                <input type="number" id="dlist-val" class="control-input" placeholder="Giá trị">
                <button id="btn-dlist-head" class="btn-ctrl">Chèn Head</button>
                <button id="btn-dlist-tail" class="btn-ctrl">Chèn Tail</button>
            </div>
            <div class="control-group" style="margin-top: 5px;">
                <input type="number" id="dlist-idx" class="control-input" placeholder="Index" style="max-width:80px;">
                <button id="btn-dlist-insert" class="btn-ctrl" style="background:var(--neutral-dark); color:white;">Chèn vị trí</button>
                <button id="btn-dlist-delete" class="btn-ctrl" style="background:#fee2e2; color:#ef4444;">Xóa vị trí</button>
            </div>
            <div class="speed-slider-container" style="margin-top:10px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-dlist" min="100" max="1500" value="500">
            </div>
        `;

        document.getElementById("speed-dlist").addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        renderDoublyListCanvas();
        log("Danh sách liên kết kép đã khởi tạo.", "success");

        document.getElementById("btn-dlist-head").addEventListener("click", () => {
            const val = autoGetNumberVal("dlist-val");
            doublyNodes.unshift(val);
            renderDoublyListCanvas();
            const head = document.querySelector(".dlist-node");
            if (head) head.classList.add("success");
            log(`Chèn vào Head: Cập nhật trỏ prev của Head cũ, và gán Head mới.`, "info");
        });

        document.getElementById("btn-dlist-tail").addEventListener("click", () => {
            const val = autoGetNumberVal("dlist-val");
            doublyNodes.push(val);
            renderDoublyListCanvas();
            const elements = document.querySelectorAll(".dlist-node");
            const last = elements[elements.length - 1];
            if (last) last.classList.add("success");
            log(`Chèn vào Tail: Gán next của Tail cũ và prev của Node mới dễ dàng.`, "info");
        });

        document.getElementById("btn-dlist-insert").addEventListener("click", async () => {
            const val = autoGetNumberVal("dlist-val");
            let idx = parseInt(document.getElementById("dlist-idx").value);
            
            if (isNaN(idx) || idx < 0 || idx > doublyNodes.length) {
                idx = Math.floor(Math.random() * (doublyNodes.length + 1));
                log(`Chỉ số trống, tự động chọn index chèn: <b>${idx}</b>`, "warning");
            }

            const nodes = document.querySelectorAll(".dlist-node");
            for (let i = 0; i < Math.min(idx, nodes.length); i++) {
                nodes[i].classList.add("active");
                await sleep(animationSpeed * 0.5);
            }
            
            doublyNodes.splice(idx, 0, val);
            renderDoublyListCanvas();
            const updated = document.querySelectorAll(".dlist-node");
            if (updated[idx]) updated[idx].classList.add("success");
            log(`Đã chèn Node(${val}) tại index ${idx} và thiết lập liên kết 2 chiều.`, "info");
        });

        document.getElementById("btn-dlist-delete").addEventListener("click", async () => {
            let idx = parseInt(document.getElementById("dlist-idx").value);
            if (isNaN(idx) || idx < 0 || idx >= doublyNodes.length) {
                if (doublyNodes.length === 0) return;
                idx = Math.floor(Math.random() * doublyNodes.length);
                log(`Chỉ số trống, tự động chọn index xóa: <b>${idx}</b>`, "warning");
            }

            const nodes = document.querySelectorAll(".dlist-node");
            for (let i = 0; i < idx; i++) {
                nodes[i].classList.add("active");
                await sleep(animationSpeed * 0.5);
            }
            
            if (nodes[idx]) nodes[idx].classList.add("highlight");
            await sleep(animationSpeed * 0.8);
            
            doublyNodes.splice(idx, 1);
            renderDoublyListCanvas();
            log(`Đã xóa Node tại index ${idx} và tự động kết nối liền mạch node trước & sau.`, "info");
        });
    }

    function renderDLLNodeDetails(idx, val) {
        const baseAddr = 36128 + idx * 48;
        const hexBaseAddr = "0x" + baseAddr.toString(16).toUpperCase();
        const hexPrevPtrAddr = hexBaseAddr;
        const hexDataAddr = "0x" + (baseAddr + 8).toString(16).toUpperCase();
        const hexNextPtrAddr = "0x" + (baseAddr + 16).toString(16).toUpperCase();
        
        const isFirst = idx === 0;
        const prevAddrVal = isFirst ? 0 : 36128 + (idx - 1) * 48;
        const hexPrevAddr = isFirst ? "0x0000 (NULL)" : "0x" + prevAddrVal.toString(16).toUpperCase();
        
        const isLast = idx === doublyNodes.length - 1;
        const nextAddrVal = isLast ? 0 : 36128 + (idx + 1) * 48;
        const hexNextAddr = isLast ? "0x0000 (NULL)" : "0x" + nextAddrVal.toString(16).toUpperCase();
        
        // Generate Byte-Map HTML
        let byteMapHtml = `<div class="byte-map-container">`;
        byteMapHtml += `<div class="byte-map-title"><i class="fa-solid fa-server"></i> RAM Byte Map (24 Bytes):</div>`;
        byteMapHtml += `<div class="byte-map">`;
        
        // 24 bytes
        for (let b = 0; b < 24; b++) {
            let cellClass = "";
            let label = "";
            let hexOffset = `+${b}`;
            
            if (b >= 0 && b <= 7) {
                cellClass = "type-prev";
                label = `p${b}`;
            } else if (b >= 8 && b <= 11) {
                cellClass = "type-data";
                label = `d${b - 8}`;
            } else if (b >= 12 && b <= 15) {
                cellClass = "type-pad";
                label = "pad";
            } else {
                cellClass = "type-next";
                label = `n${b - 16}`;
            }
            
            byteMapHtml += `
                <div class="byte-cell ${cellClass}">
                    <span class="byte-offset">${hexOffset}</span>
                    <span>${label}</span>
                </div>
            `;
        }
        byteMapHtml += `</div></div>`;
        
        // C code representation
        const structCode = `struct Node {
    struct Node* prev;  // Trỏ về trước: ${hexPrevAddr} (Địa chỉ: ${hexPrevPtrAddr}, offset +0, size 8B)
    int data;           // Giá trị: ${val}  (Địa chỉ: ${hexDataAddr}, offset +8, size 4B)
    char _pad[4];       // Căn lề bộ nhớ  (Địa chỉ: 0x${(baseAddr + 12).toString(16).toUpperCase()}, offset +12, size 4B)
    struct Node* next;  // Trỏ tới: ${hexNextAddr}  (Địa chỉ: ${hexNextPtrAddr}, offset +16, size 8B)
}; // sizeof(struct Node) = 24 bytes`;

        const htmlContent = `
            <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:6px;">Doubly Node [${idx}] (Địa chỉ: ${hexBaseAddr})</div>
            ${byteMapHtml}
            <table class="tooltip-meta-table">
                <tr><td><code>prev</code> (struct Node*)</td><td>${hexPrevAddr} (Offset +0)</td></tr>
                <tr><td><code>data</code> (int)</td><td>${val} (Offset +8)</td></tr>
                <tr><td><code>_pad</code> (Padding)</td><td>Char[4] (Offset +12)</td></tr>
                <tr><td><code>next</code> (struct Node*)</td><td>${hexNextAddr} (Offset +16)</td></tr>
                <tr><td>Kích thước</td><td>sizeof(struct Node) = 24 Bytes</td></tr>
            </table>
        `;
        
        return { htmlContent, structCode };
    }

    function renderDoublyListCanvas() {
        if (doublyNodes.length === 0) {
            sandboxCanvas.innerHTML = `<div style="color:var(--text-muted); font-style:italic; padding:20px;">Danh sách rỗng (Head = NULL)</div>`;
            return;
        }

        let html = `
            <div class="canvas-arena" style="height: 100%;">
                <div class="list-container">
        `;
        
        doublyNodes.forEach((val, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === doublyNodes.length - 1;
            html += `
                <div class="list-node-wrapper">
                    <div class="dlist-node" id="dlist-node-${idx}" style="cursor:pointer;" title="Click để xem cấu trúc ô nhớ">
                        <div class="node-prev-ptr">${isFirst ? "NULL" : "prev"}</div>
                        <div class="node-data" style="flex:1.4;">${val}</div>
                        <div class="node-next-ptr" style="border-left:2px solid var(--neutral-border);">${isLast ? "NULL" : "next"}</div>
                    </div>
            `;
            if (!isLast) {
                html += `
                    <div class="list-arrow" style="width:45px; display:flex; flex-direction:column; gap:4px;">
                        <!-- Forward Arrow -->
                        <svg viewBox="0 0 40 10" fill="none" style="height:8px;">
                            <line x1="0" y1="5" x2="35" y2="5" stroke="#2563eb" stroke-width="2"/>
                            <polygon points="35,5 29,1 29,9" fill="#2563eb"/>
                        </svg>
                        <!-- Backward Arrow -->
                        <svg viewBox="0 0 40 10" fill="none" style="height:8px;">
                            <line x1="40" y1="5" x2="5" y2="5" stroke="#10b981" stroke-width="2"/>
                            <polygon points="5,5 11,1 11,9" fill="#10b981"/>
                        </svg>
                    </div>
                `;
            }
            html += `</div>`;
        });
        
        html += `
                </div>
            </div>
        `;
        
        sandboxCanvas.innerHTML = html;

        // Bind Click Handlers
        doublyNodes.forEach((val, idx) => {
            const nodeEl = document.getElementById(`dlist-node-${idx}`);
            if (nodeEl) {
                nodeEl.addEventListener("click", () => {
                    document.querySelectorAll(".dlist-node").forEach(n => n.classList.remove("selected"));
                    nodeEl.classList.add("selected");
                    const { htmlContent, structCode } = renderDLLNodeDetails(idx, val);
                    showTooltip(nodeEl, "Doubly Linked List Node", htmlContent, structCode);
                });
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2.5 CHAPTER 5: STACK & QUEUE SANDBOX
    // --------------------------------------------------------------------------

    function setupStackQueueSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-layer-group"></i> Sandbox Stack & Queue';
        
        sandboxControls.innerHTML = `
            <div class="control-group" style="justify-content:center; margin-bottom:10px;">
                <button id="btn-toggle-sq-mode" class="btn-ctrl" style="background:var(--neutral-dark); color:white; width:100%;">
                    <i class="fa-solid fa-right-left"></i> Chuyển sang Hàng đợi (Queue)
                </button>
            </div>
            <div class="control-group">
                <input type="number" id="sq-val" class="control-input" placeholder="Giá trị">
                <button id="btn-sq-push" class="btn-ctrl">Push (Vào Stack)</button>
                <button id="btn-sq-pop" class="btn-ctrl" style="background:#fee2e2; color:#ef4444;">Pop (Ra Stack)</button>
            </div>
        `;

        const btnToggleMode = document.getElementById("btn-toggle-sq-mode");
        const btnPush = document.getElementById("btn-sq-push");
        const btnPop = document.getElementById("btn-sq-pop");

        renderSQCanvas();
        log("Cấu trúc Stack LIFO đã khởi tạo.", "success");

        btnToggleMode.addEventListener("click", () => {
            isStackMode = !isStackMode;
            if (isStackMode) {
                btnToggleMode.innerHTML = '<i class="fa-solid fa-right-left"></i> Chuyển sang Hàng đợi (Queue)';
                btnPush.innerHTML = "Push (Vào Stack)";
                btnPop.innerHTML = "Pop (Ra Stack)";
                log("Đã chuyển sang cấu trúc Ngăn xếp (Stack) - Cơ chế LIFO.", "success");
            } else {
                btnToggleMode.innerHTML = '<i class="fa-solid fa-right-left"></i> Chuyển sang Ngăn xếp (Stack)';
                btnPush.innerHTML = "Enqueue (Vào Queue)";
                btnPop.innerHTML = "Dequeue (Ra Queue)";
                log("Đã chuyển sang cấu trúc Hàng đợi (Queue) - Cơ chế FIFO.", "success");
            }
            renderSQCanvas();
        });

        btnPush.addEventListener("click", () => {
            const val = autoGetNumberVal("sq-val");
            sqData.push(val);
            
            if (isStackMode) {
                // Remove [Top] styling from previous top element
                const els = document.querySelectorAll(".stack-element");
                if (els.length > 0) {
                    const prevTop = els[els.length - 1];
                    prevTop.style.borderColor = "";
                    prevTop.style.background = "";
                    prevTop.innerHTML = prevTop.innerHTML.replace(/<span.*\[Top\].*<\/span>/, "");
                }
                
                // Append new top element
                const tube = document.querySelector(".stack-tube");
                if (tube) {
                    const newEl = document.createElement("div");
                    newEl.className = "stack-element";
                    newEl.style.borderColor = "var(--accent)";
                    newEl.style.background = "var(--accent-light)";
                    newEl.innerHTML = `${val} <span style="font-size:0.55rem; margin-left:4px; color:var(--accent)">[Top]</span>`;
                    tube.appendChild(newEl);
                }
                log(`Push(${val}) thành công lên Đỉnh (Top) của Stack.`, "info");
            } else {
                // Enqueue: Append new element to queue-belt
                const belt = document.querySelector(".queue-belt");
                if (belt) {
                    // Update Rear label on previous elements
                    const els = document.querySelectorAll(".queue-element");
                    els.forEach((el, idx) => {
                        const isFront = idx === 0;
                        const labelSpan = el.querySelector("span");
                        if (labelSpan) {
                            labelSpan.innerHTML = isFront ? "Front" : "";
                        }
                    });
                    
                    const isFront = els.length === 0;
                    const newEl = document.createElement("div");
                    newEl.className = "queue-element";
                    if (isFront) {
                        newEl.style.borderColor = "#e11d48";
                        newEl.style.background = "#fff1f2";
                    } else {
                        newEl.style.borderColor = "var(--accent)";
                        newEl.style.background = "var(--accent-light)";
                    }
                    newEl.innerHTML = `
                        ${val}
                        <span style="font-size:0.5rem; display:block; position:absolute; bottom:2px; font-weight:600; color:var(--text-muted);">
                            ${isFront ? 'Front' : 'Rear'}
                        </span>
                    `;
                    belt.appendChild(newEl);
                }
                log(`Enqueue(${val}) thành công vào Cuối (Rear) của Queue.`, "info");
            }
        });

        btnPop.addEventListener("click", async () => {
            if (sqData.length === 0) {
                log("Cấu trúc dữ liệu đang rỗng! Không có gì để rút.", "warning");
                return;
            }

            if (isStackMode) {
                const popped = sqData[sqData.length - 1];
                const els = document.querySelectorAll(".stack-element");
                const topEl = els[els.length - 1];
                if (topEl) {
                    topEl.classList.add("popped");
                }
                await sleep(350); // wait for pop animation to finish
                
                if (topEl) topEl.remove();
                
                // Update styling for the new top element
                const remainingEls = document.querySelectorAll(".stack-element");
                if (remainingEls.length > 0) {
                    const newTop = remainingEls[remainingEls.length - 1];
                    newTop.style.borderColor = "var(--accent)";
                    newTop.style.background = "var(--accent-light)";
                    if (!newTop.innerHTML.includes("[Top]")) {
                        newTop.innerHTML += ` <span style="font-size:0.55rem; margin-left:4px; color:var(--accent)">[Top]</span>`;
                    }
                }
                
                sqData.pop();
                log(`Pop() lấy ra phần tử <b>${popped}</b> từ Đỉnh (Top).`, "success");
            } else {
                const dequeued = sqData[0];
                const els = document.querySelectorAll(".queue-element");
                if (els[0]) {
                    els[0].classList.add("dequeued");
                }
                await sleep(350); // wait for dequeue animation to finish
                
                if (els[0]) els[0].remove();
                
                // Update labels for the remaining queue elements
                const remainingEls = document.querySelectorAll(".queue-element");
                remainingEls.forEach((el, idx) => {
                    const isFront = idx === 0;
                    const isRear = idx === remainingEls.length - 1;
                    
                    if (isFront) {
                        el.style.borderColor = "#e11d48";
                        el.style.background = "#fff1f2";
                    } else if (isRear) {
                        el.style.borderColor = "var(--accent)";
                        el.style.background = "var(--accent-light)";
                    } else {
                        el.style.borderColor = "";
                        el.style.background = "";
                    }
                    
                    const labelSpan = el.querySelector("span");
                    if (labelSpan) {
                        labelSpan.innerHTML = isFront ? 'Front' : (isRear ? 'Rear' : '');
                    }
                });
                
                sqData.shift();
                log(`Dequeue() lấy ra phần tử <b>${dequeued}</b> ở Đầu hàng (Front).`, "success");
            }
        });

        // Bind delegated click handler to sandboxCanvas for stack & queue elements
        sandboxCanvas.addEventListener("click", (e) => {
            const stackEl = e.target.closest(".stack-element");
            if (stackEl) {
                document.querySelectorAll(".stack-element").forEach(el => el.classList.remove("selected"));
                stackEl.classList.add("selected");
                
                const els = Array.from(document.querySelectorAll(".stack-element"));
                const idx = els.indexOf(stackEl);
                if (idx !== -1) {
                    const val = sqData[idx];
                    const isTop = idx === sqData.length - 1;
                    const addr = "0x" + (0x7FFF00A0 - (sqData.length - 1 - idx) * 4).toString(16).toUpperCase();
                    
                    const title = "Ngăn xếp (Stack Memory Frame)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Phần tử Stack: [${idx}] = ${val} ${isTop ? '<b style="color:var(--accent)">[Top]</b>' : ''}</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ RAM (Stack)</td><td>${addr}</td></tr>
                            <tr><td>Kiểu dữ liệu</td><td>int (Số nguyên)</td></tr>
                            <tr><td>Kích thước</td><td>sizeof(int) = 4 Bytes</td></tr>
                            <tr><td>Vai trò</td><td>${isTop ? 'Đỉnh ngăn xếp (Top)' : `Cách Top ${sqData.length - 1 - idx} ô`}</td></tr>
                            <tr><td>Định hướng Stack</td><td>Vùng nhớ phân bổ giảm dần (-4B)</td></tr>
                        </table>
                    `;
                    showTooltip(stackEl, title, content);
                }
            }
            
            const queueEl = e.target.closest(".queue-element");
            if (queueEl) {
                document.querySelectorAll(".queue-element").forEach(el => el.classList.remove("selected"));
                queueEl.classList.add("selected");
                
                const els = Array.from(document.querySelectorAll(".queue-element"));
                const idx = els.indexOf(queueEl);
                if (idx !== -1) {
                    const val = sqData[idx];
                    const isFront = idx === 0;
                    const isRear = idx === sqData.length - 1;
                    const addr = "0x" + (0x51A0 + idx * 4).toString(16).toUpperCase();
                    
                    const title = "Hàng đợi (Queue Memory Allocation)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Phần tử Queue: [${idx}] = ${val}</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ RAM (Heap-like)</td><td>${addr}</td></tr>
                            <tr><td>Kiểu dữ liệu</td><td>int (Số nguyên)</td></tr>
                            <tr><td>Kích thước</td><td>sizeof(int) = 4 Bytes</td></tr>
                            <tr><td>Độ dời (Offset)</td><td>+${idx * 4} Bytes</td></tr>
                            <tr><td>Vai trò</td><td>${isFront ? '<b style="color:#ef4444;">Đầu hàng (Front)</b>' : (isRear ? '<b style="color:var(--accent);">Cuối hàng (Rear)</b>' : 'Phần tử giữa')}</td></tr>
                        </table>
                    `;
                    showTooltip(queueEl, title, content);
                }
            }
        });
    }

    function renderSQCanvas() {
        sandboxCanvas.innerHTML = "";
        const arena = document.createElement("div");
        arena.className = "sq-container";
        
        if (isStackMode) {
            let tubeHtml = `<div class="stack-tube">`;
            for (let i = 0; i < sqData.length; i++) {
                const isTop = i === sqData.length - 1;
                tubeHtml += `
                    <div class="stack-element" style="${isTop ? 'border-color:var(--accent); background:var(--accent-light);' : ''}">
                        ${sqData[i]} ${isTop ? '<span style="font-size:0.55rem; margin-left:4px; color:var(--accent)">[Top]</span>' : ''}
                    </div>
                `;
            }
            tubeHtml += `</div>`;
            arena.innerHTML = tubeHtml;
        } else {
            let beltHtml = `<div class="queue-belt">`;
            sqData.forEach((val, idx) => {
                const isFront = idx === 0;
                const isRear = idx === sqData.length - 1;
                let extraBorder = "";
                if (isFront) extraBorder = "border-color:#e11d48; background:#fff1f2;";
                else if (isRear) extraBorder = "border-color:var(--accent); background:var(--accent-light);";
                
                beltHtml += `
                    <div class="queue-element" style="${extraBorder}">
                        ${val}
                        <span style="font-size:0.5rem; display:block; position:absolute; bottom:2px; font-weight:600; color:var(--text-muted);">
                            ${isFront ? 'Front' : (isRear ? 'Rear' : '')}
                        </span>
                    </div>
                `;
            });
            beltHtml += `</div>`;
            arena.innerHTML = beltHtml;
        }
        sandboxCanvas.appendChild(arena);
    }

    // --------------------------------------------------------------------------
    // 2.6 CHAPTER 9: CIRCULAR QUEUE SANDBOX (NEW!)
    // --------------------------------------------------------------------------

    function setupCircularQueueSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-circle-notch"></i> Trực quan hóa Hàng đợi vòng';
        
        sandboxControls.innerHTML = `
            <div class="control-group">
                <input type="number" id="cq-val" class="control-input" placeholder="Giá trị">
                <button id="btn-cq-enqueue" class="btn-ctrl">Enqueue (Thêm)</button>
                <button id="btn-cq-dequeue" class="btn-ctrl" style="background:#fee2e2; color:#ef4444;">Dequeue (Xóa)</button>
            </div>
            <div class="speed-slider-container" style="margin-top:10px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-cq" min="100" max="1500" value="500">
            </div>
        `;

        document.getElementById("speed-cq").addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        // Seed some data in CQ
        cqArray = Array(cqSize).fill(null);
        cqArray[0] = 10;
        cqArray[1] = 20;
        cqArray[2] = 30;
        cqFront = 0;
        cqRear = 2;

        renderCircularQueueCanvas();
        log(`Circular Queue khởi tạo: front = 0, rear = 2. Dung lượng tối đa = 8.`, "success");

        document.getElementById("btn-cq-enqueue").addEventListener("click", () => {
            const val = autoGetNumberVal("cq-val");
            
            // Check if full
            if ((cqRear + 1) % cqSize === cqFront) {
                log("Hàng đợi vòng ĐẦY! Không thể thêm phần tử.", "warning");
                return;
            }
            
            if (cqFront === -1) cqFront = 0;
            cqRear = (cqRear + 1) % cqSize;
            cqArray[cqRear] = val;
            
            renderCircularQueueCanvas();
            const cell = document.getElementById(`cq-cell-${cqRear}`);
            if (cell) cell.classList.add("success");
            log(`Enqueue(${val}) thành công! <code>rear = (rear + 1) % 8 = ${cqRear}</code>`, "info");
        });

        document.getElementById("btn-cq-dequeue").addEventListener("click", async () => {
            if (cqFront === -1) {
                log("Hàng đợi vòng RỖNG! Không có gì để dequeue.", "warning");
                return;
            }

            const val = cqArray[cqFront];
            const cell = document.getElementById(`cq-cell-${cqFront}`);
            if (cell) cell.classList.add("highlight");
            await sleep(animationSpeed * 0.8);

            cqArray[cqFront] = null;
            
            if (cqFront === cqRear) {
                // Queue becomes empty
                cqFront = -1;
                cqRear = -1;
                log(`Dequeue lấy ra ${val}. Queue trở nên RỖNG hoàn toàn!`, "success");
            } else {
                cqFront = (cqFront + 1) % cqSize;
                log(`Dequeue lấy ra ${val}! <code>front = (front + 1) % 8 = ${cqFront}</code>`, "success");
            }
            renderCircularQueueCanvas();
        });
    }

    function renderCircularQueueCanvas() {
        sandboxCanvas.innerHTML = "";
        const wrapper = document.createElement("div");
        wrapper.className = "circular-queue-container";
        
        // Calculate circle points
        for (let i = 0; i < cqSize; i++) {
            const cell = document.createElement("div");
            cell.className = "cq-cell";
            cell.id = `cq-cell-${i}`;
            cell.innerHTML = cqArray[i] !== null ? cqArray[i] : "-";
            if (cqArray[i] !== null) {
                cell.style.borderColor = "var(--primary)";
            } else {
                cell.style.borderStyle = "dashed";
                cell.style.color = "var(--text-muted)";
            }

            // Map index to angle (top node is index 0)
            const angle = (i * 2 * Math.PI) / cqSize - Math.PI / 2;
            const r = 70; // radius
            const x = 100 + r * Math.cos(angle) - 19; // center offset
            const y = 100 + r * Math.sin(angle) - 19;
            cell.style.left = `${x}px`;
            cell.style.top = `${y}px`;

            // Index label
            const label = document.createElement("span");
            label.className = "cq-cell-idx";
            label.innerHTML = i;
            const labelR = 92;
            const lx = 100 + labelR * Math.cos(angle) - 4;
            const ly = 100 + labelR * Math.sin(angle) - 6;
            label.style.left = `${lx}px`;
            label.style.top = `${ly}px`;

            wrapper.appendChild(cell);
            wrapper.appendChild(label);
        }

        // Draw pointers
        if (cqFront !== -1) {
            const fAngle = (cqFront * 2 * Math.PI) / cqSize - Math.PI / 2;
            const fx = 100 + 44 * Math.cos(fAngle) - 15;
            const fy = 100 + 44 * Math.sin(fAngle) - 10;
            const fPtr = document.createElement("div");
            fPtr.className = "cq-pointer front";
            fPtr.style.left = `${fx}px`;
            fPtr.style.top = `${fy}px`;
            fPtr.innerHTML = "F";
            wrapper.appendChild(fPtr);
        }

        if (cqRear !== -1) {
            const rAngle = (cqRear * 2 * Math.PI) / cqSize - Math.PI / 2;
            const rx = 100 + 44 * Math.cos(rAngle) - 15;
            const ry = 100 + 44 * Math.sin(rAngle) - 10;
            const rPtr = document.createElement("div");
            rPtr.className = "cq-pointer rear";
            rPtr.style.left = `${rx}px`;
            rPtr.style.top = `${ry}px`;
            rPtr.innerHTML = "R";
            
            // If overlapping front
            if (cqRear === cqFront) {
                rPtr.innerHTML = "F,R";
                rPtr.style.background = "#faf5ff";
                rPtr.style.color = "#a855f7";
                rPtr.style.borderColor = "#c084fc";
                if (wrapper.querySelector(".front")) {
                    wrapper.querySelector(".front").remove();
                }
            }
            wrapper.appendChild(rPtr);
        }

        sandboxCanvas.appendChild(wrapper);

        // Bind Click Handlers for Circular Queue Cells
        for (let i = 0; i < cqSize; i++) {
            const cellEl = document.getElementById(`cq-cell-${i}`);
            if (cellEl) {
                cellEl.style.cursor = "pointer";
                cellEl.title = "Click để xem chi tiết RAM";
                cellEl.addEventListener("click", () => {
                    document.querySelectorAll(".cq-cell").forEach(c => c.classList.remove("selected"));
                    cellEl.classList.add("selected");
                    
                    const isUsed = cqArray[i] !== null;
                    const val = isUsed ? cqArray[i] : "NULL (Trống)";
                    const addr = "0x" + (0x8C40 + i * 4).toString(16).toUpperCase();
                    
                    const isFront = i === cqFront;
                    const isRear = i === cqRear;
                    
                    let roleStr = "Ô trống";
                    if (isFront && isRear) roleStr = "Đầu hàng (Front) & Cuối hàng (Rear) [Trùng nhau]";
                    else if (isFront) roleStr = "Đầu hàng (Front)";
                    else if (isRear) roleStr = "Cuối hàng (Rear)";
                    else if (isUsed) roleStr = "Phần tử Hàng đợi";
                    
                    const title = "Hàng đợi vòng (Circular Queue Cell)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Ô nhớ: cqArray[${i}] = ${val}</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ RAM</td><td>${addr}</td></tr>
                            <tr><td>Kiểu dữ liệu</td><td>int (Số nguyên)</td></tr>
                            <tr><td>Kích thước</td><td>sizeof(int) = 4 Bytes</td></tr>
                            <tr><td>Độ dời (Offset)</td><td>+${i * 4} Bytes</td></tr>
                            <tr><td>Vai trò / Trạng thái</td><td>${roleStr}</td></tr>
                            <tr><td>Địa chỉ kế tiếp</td><td>0x${(0x8C40 + ((i + 1) % cqSize) * 4).toString(16).toUpperCase()} ((i+1)%8)</td></tr>
                        </table>
                    `;
                    showTooltip(cellEl, title, content);
                });
            }
        }
    }

    // --------------------------------------------------------------------------
    // 2.7 CHAPTER 5: HASH TABLE SANDBOX
    // --------------------------------------------------------------------------

    function setupHashTableSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-hashtag"></i> Trực quan hóa Bảng băm (DJB2 Chaining)';
        
        sandboxControls.innerHTML = `
            <div class="control-group">
                <input type="text" id="hash-key" class="control-input" placeholder="Khóa Key (VD: name)" style="max-width:130px;">
                <input type="number" id="hash-val" class="control-input" placeholder="Giá trị Value">
                <button id="btn-hash-put" class="btn-ctrl"><i class="fa-solid fa-plus"></i> Put(Key, Val)</button>
            </div>
            <div class="control-group" style="margin-top: 5px;">
                <input type="text" id="hash-search" class="control-input" placeholder="Tìm kiếm Key">
                <button id="btn-hash-get" class="btn-ctrl" style="background:var(--accent-light); color:var(--accent);"><i class="fa-solid fa-magnifying-glass"></i> Get(Key)</button>
                <button id="btn-hash-del" class="btn-ctrl" style="background:#fee2e2; color:#ef4444;"><i class="fa-solid fa-trash"></i> Delete(Key)</button>
            </div>
        `;

        renderHashCanvas();
        log("Khởi tạo Hash Table dung lượng capacity=5. Va chạm được xử lý bằng kết nối chuỗi Linked List.", "success");

        document.getElementById("btn-hash-put").addEventListener("click", async () => {
            const key = autoGetStringVal("hash-key");
            const val = autoGetNumberVal("hash-val");

            log(`Đang băm Key "${key}"...`, "step");
            let hashVal = 5381;
            for (let i = 0; i < key.length; i++) {
                hashVal = (hashVal * 33) + key.charCodeAt(i);
            }
            const bucketIdx = hashVal % hashCapacity;
            
            log(`Hàm băm trả về index = <b>${bucketIdx}</b> (bằng DJB2 % ${hashCapacity})`, "info");
            
            const bucketEl = document.getElementById(`hash-row-${bucketIdx}`);
            if (bucketEl) {
                bucketEl.querySelector(".hash-bucket-label").classList.add("active");
                await sleep(animationSpeed);
            }

            let list = hashBuckets[bucketIdx];
            let foundIdx = list.findIndex(node => node.key === key);
            
            if (foundIdx !== -1) {
                const oldVal = list[foundIdx].val;
                list[foundIdx].val = val;
                log(`Key "${key}" đã tồn tại. Cập nhật giá trị cũ <b>${oldVal}</b> thành <b>${val}</b>.`, "success");
            } else {
                list.push({ key: key, val: val });
                log(`Chèn cặp "${key}" -> ${val} vào danh sách liên kết của Bucket ${bucketIdx}.`, "success");
            }
            
            renderHashCanvas();
            await sleep(animationSpeed * 0.5);
            if (bucketEl) {
                bucketEl.querySelector(".hash-bucket-label").classList.remove("active");
            }
        });

        document.getElementById("btn-hash-get").addEventListener("click", async () => {
            let searchKey = document.getElementById("hash-search").value.trim();
            if (!searchKey) {
                // Find any key present
                let allKeys = [];
                hashBuckets.forEach(b => b.forEach(n => allKeys.push(n.key)));
                if (allKeys.length > 0) {
                    searchKey = allKeys[0];
                    log(`Tìm ngẫu nhiên key tồn tại: <b>${searchKey}</b>`, "warning");
                } else {
                    log("Bảng băm rỗng! Vui lòng thêm dữ liệu trước.", "warning");
                    return;
                }
            }

            log(`Bắt đầu truy vấn Key "${searchKey}"...`, "step");
            
            let hashVal = 5381;
            for (let i = 0; i < searchKey.length; i++) {
                hashVal = (hashVal * 33) + searchKey.charCodeAt(i);
            }
            const bucketIdx = hashVal % hashCapacity;

            const bucketEl = document.getElementById(`hash-row-${bucketIdx}`);
            if (bucketEl) bucketEl.querySelector(".hash-bucket-label").classList.add("active");
            await sleep(animationSpeed);

            const list = hashBuckets[bucketIdx];
            let foundNode = list.find(node => node.key === searchKey);
            
            if (foundNode) {
                log(`Đã tìm thấy Key "${searchKey}" trong Bucket ${bucketIdx}! Value = <b style="color:var(--accent); font-size:1.1rem;">${foundNode.val}</b>`, "success");
            } else {
                log(`Không tìm thấy Key "${searchKey}" trong bảng băm!`, "warning");
            }
            
            if (bucketEl) bucketEl.querySelector(".hash-bucket-label").classList.remove("active");
        });

        document.getElementById("btn-hash-del").addEventListener("click", async () => {
            let delKey = document.getElementById("hash-search").value.trim();
            if (!delKey) {
                let allKeys = [];
                hashBuckets.forEach(b => b.forEach(n => allKeys.push(n.key)));
                if (allKeys.length > 0) {
                    delKey = allKeys[0];
                    log(`Chọn xóa ngẫu nhiên key tồn tại: <b>${delKey}</b>`, "warning");
                } else {
                    log("Không có Key nào để xóa!", "warning");
                    return;
                }
            }

            log(`Bắt đầu xóa Key "${delKey}"...`, "step");
            let hashVal = 5381;
            for (let i = 0; i < delKey.length; i++) {
                hashVal = (hashVal * 33) + delKey.charCodeAt(i);
            }
            const bucketIdx = hashVal % hashCapacity;

            const bucketEl = document.getElementById(`hash-row-${bucketIdx}`);
            if (bucketEl) bucketEl.querySelector(".hash-bucket-label").classList.add("active");
            await sleep(animationSpeed);

            let list = hashBuckets[bucketIdx];
            let foundIdx = list.findIndex(node => node.key === delKey);
            
            if (foundIdx !== -1) {
                list.splice(foundIdx, 1);
                log(`Đã xóa Key "${delKey}" khỏi Bucket ${bucketIdx}.`, "success");
                renderHashCanvas();
            } else {
                log(`Không tồn tại Key "${delKey}" để xóa!`, "warning");
            }
            
            if (bucketEl) bucketEl.querySelector(".hash-bucket-label").classList.remove("active");
        });
    }

    function renderHashCanvas() {
        let html = `<div class="hash-container">`;
        for (let i = 0; i < hashCapacity; i++) {
            html += `
                <div class="hash-row" id="hash-row-${i}">
                    <div class="hash-bucket-label">Bucket ${i}</div>
                    <div class="hash-chain">
            `;
            const list = hashBuckets[i];
            if (list.length === 0) {
                html += `<div style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">NULL</div>`;
            } else {
                list.forEach((node, nIdx) => {
                    html += `
                        <div class="hash-node" id="hash-node-${i}-${nIdx}" style="cursor:pointer;" title="Click để xem chi tiết RAM">
                            <span class="key">"${node.key}"</span>: 
                            <span class="val">${node.val}</span>
                        </div>
                    `;
                    if (nIdx < list.length - 1) {
                        html += `<div style="width:20px; text-align:center; color:var(--primary); font-weight:700;">→</div>`;
                    }
                });
            }
            html += `</div></div>`;
        }
        html += `</div>`;
        sandboxCanvas.innerHTML = html;

        // Bind Click Handlers
        for (let i = 0; i < hashCapacity; i++) {
            const list = hashBuckets[i];
            list.forEach((node, nIdx) => {
                const nodeEl = document.getElementById(`hash-node-${i}-${nIdx}`);
                if (nodeEl) {
                    nodeEl.addEventListener("click", () => {
                        document.querySelectorAll(".hash-node").forEach(el => el.classList.remove("selected"));
                        nodeEl.classList.add("selected");
                        
                        const baseAddr = 0xA800 + i * 128 + nIdx * 32;
                        const hexAddr = "0x" + baseAddr.toString(16).toUpperCase();
                        
                        const isLast = nIdx === list.length - 1;
                        const nextAddrVal = isLast ? 0 : 0xA800 + i * 128 + (nIdx + 1) * 32;
                        const hexNextAddr = isLast ? "0x0000 (NULL)" : "0x" + nextAddrVal.toString(16).toUpperCase();
                        
                        const structCode = `struct HashNode {
    char key[16];          // Khoá: "${node.key}" (offset +0, size 16B)
    int value;             // Giá trị: ${node.val} (offset +16, size 4B)
    char _pad[4];          // Padding căn lề (offset +20, size 4B)
    struct HashNode* next; // Trỏ tới: ${hexNextAddr} (offset +24, size 8B)
}; // sizeof(struct HashNode) = 32 bytes`;

                        const title = "Cơ chế băm Chaining (Hash Node struct)";
                        const content = `
                            <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Node băm: Bucket ${i} [${nIdx}]</div>
                            <table class="tooltip-meta-table">
                                <tr><td>Địa chỉ RAM Node</td><td>${hexAddr}</td></tr>
                                <tr><td><code>key</code> (char[16])</td><td>"${node.key}" (Offset +0)</td></tr>
                                <tr><td><code>value</code> (int)</td><td>${node.val} (Offset +16)</td></tr>
                                <tr><td><code>next</code> (pointer)</td><td>${hexNextAddr} (Offset +24)</td></tr>
                                <tr><td>Kích thước Node</td><td>32 Bytes</td></tr>
                            </table>
                        `;
                        showTooltip(nodeEl, title, content, structCode);
                    });
                }
            });
        }
    }

    // --------------------------------------------------------------------------
    // 2.8 CHAPTER 10: BINARY HEAP SANDBOX (NEW!)
    // --------------------------------------------------------------------------

    function setupHeapSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-cubes"></i> Trực quan hóa Cây Heap nhị phân (Max-Heap)';
        
        sandboxControls.innerHTML = `
            <div class="control-group">
                <input type="number" id="heap-val" class="control-input" placeholder="Giá trị">
                <button id="btn-heap-insert" class="btn-ctrl"><i class="fa-solid fa-plus"></i> Chèn Node</button>
                <button id="btn-heap-extract" class="btn-ctrl" style="background:#fee2e2; color:#ef4444;"><i class="fa-solid fa-trash"></i> Lấy gốc Max</button>
            </div>
            <div class="speed-slider-container" style="margin-top:10px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-heap" min="100" max="1500" value="500">
            </div>
        `;

        document.getElementById("speed-heap").addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        renderHeapCanvas();
        log("Cấu trúc Max-Heap đã khởi động với 5 phần tử xếp cân bằng.", "success");

        document.getElementById("btn-heap-insert").addEventListener("click", async () => {
            const val = autoGetNumberVal("heap-val");
            log(`Chèn ${val} vào cuối Max-Heap (vị trí chỉ số ${heapData.length})...`, "step");
            
            heapData.push(val);
            renderHeapCanvas();
            await sleep(animationSpeed);
            
            // Heapify Up animation
            let i = heapData.length - 1;
            while (i > 0) {
                let parentIdx = Math.floor((i - 1) / 2);
                
                // Highlight elements
                highlightHeapElements([i, parentIdx], "active");
                log(`So sánh con: <b>${heapData[i]}</b> vs cha: <b>${heapData[parentIdx]}</b>...`, "info");
                await sleep(animationSpeed);

                if (heapData[i] > heapData[parentIdx]) {
                    log(`Phát hiện ${heapData[i]} > ${heapData[parentIdx]}: Đổi chỗ (Swap)!`, "success");
                    let temp = heapData[i];
                    heapData[i] = heapData[parentIdx];
                    heapData[parentIdx] = temp;
                    
                    renderHeapCanvas();
                    highlightHeapElements([i, parentIdx], "highlight");
                    await sleep(animationSpeed);
                    
                    i = parentIdx;
                } else {
                    log(`Đúng cấu trúc Max-Heap (${heapData[i]} &lt;= ${heapData[parentIdx]}). Dừng Heapify Up.`, "info");
                    break;
                }
            }
            renderHeapCanvas();
        });

        document.getElementById("btn-heap-extract").addEventListener("click", async () => {
            if (heapData.length === 0) {
                log("Cây Heap rỗng!", "warning");
                return;
            }

            const max = heapData[0];
            log(`Bắt đầu lấy gốc Max lớn nhất: <b style="color:var(--accent); font-size:1.1rem;">${max}</b>`, "step");
            
            const cell = document.getElementById(`heap-node-0`);
            if (cell) cell.classList.add("highlight");
            await sleep(animationSpeed);

            if (heapData.length === 1) {
                heapData.pop();
                renderHeapCanvas();
                log("Heap chỉ còn 1 nút gốc, lấy ra thành công.", "success");
                return;
            }

            // Put last element to root
            const lastVal = heapData.pop();
            heapData[0] = lastVal;
            log(`Đưa phần tử cuối mảng <b>${lastVal}</b> lên thay Root. Bắt đầu Heapify Down...`, "warning");
            renderHeapCanvas();
            await sleep(animationSpeed);

            // Heapify Down
            let i = 0;
            const n = heapData.length;
            while (true) {
                let leftIdx = 2 * i + 1;
                let rightIdx = 2 * i + 2;
                let largestIdx = i;

                if (leftIdx < n && heapData[leftIdx] > heapData[largestIdx]) {
                    largestIdx = leftIdx;
                }
                if (rightIdx < n && heapData[rightIdx] > heapData[largestIdx]) {
                    largestIdx = rightIdx;
                }

                if (largestIdx !== i) {
                    highlightHeapElements([i, largestIdx], "active");
                    log(`So sánh cha: <b>${heapData[i]}</b> vs con lớn nhất: <b>${heapData[largestIdx]}</b> -> Đổi chỗ!`, "info");
                    await sleep(animationSpeed);

                    let temp = heapData[i];
                    heapData[i] = heapData[largestIdx];
                    heapData[largestIdx] = temp;

                    renderHeapCanvas();
                    highlightHeapElements([i, largestIdx], "highlight");
                    await sleep(animationSpeed);

                    i = largestIdx;
                } else {
                    log(`Cha <b>${heapData[i]}</b> đã lớn hơn tất cả nút con. Kết thúc Heapify Down!`, "success");
                    break;
                }
            }
            renderHeapCanvas();
        });
    }

    function highlightHeapElements(indices, cssClass) {
        indices.forEach(idx => {
            const nodeCircle = document.getElementById(`heap-node-${idx}`);
            if (nodeCircle) {
                nodeCircle.className.baseVal = `tree-node-circle ${cssClass}`;
            }
            const arrayCell = document.getElementById(`heap-array-${idx}`);
            if (arrayCell) {
                arrayCell.className = `heap-array-cell ${cssClass}`;
            }
        });
    }

    function renderHeapCanvas() {
        sandboxCanvas.innerHTML = "";
        
        if (heapData.length === 0) {
            sandboxCanvas.innerHTML = `<div style="color:var(--text-muted); font-style:italic; padding:20px;">Cây Heap rỗng (NULL)</div>`;
            return;
        }

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.width = "100%";
        container.style.height = "100%";

        // 1. Draw SVG Tree representation
        const width = 440;
        const height = 150;
        let svgHtml = `<svg class="tree-svg" viewBox="0 0 ${width} ${height}" style="flex:1;">`;
        
        let links = [];
        let nodes = [];
        
        function getCoords(i) {
            const depth = Math.floor(Math.log2(i + 1));
            const levelIdx = i - (Math.pow(2, depth) - 1);
            const levelNodes = Math.pow(2, depth);
            const y = 25 + depth * 40;
            const x = (levelIdx + 0.5) * (width / levelNodes);
            return { x, y };
        }

        for (let i = 0; i < heapData.length; i++) {
            const coords = getCoords(i);
            nodes.push({ idx: i, val: heapData[i], x: coords.x, y: coords.y });
            
            // Connect to parent
            if (i > 0) {
                const parentIdx = Math.floor((i - 1) / 2);
                const parentCoords = getCoords(parentIdx);
                links.push({ x1: parentCoords.x, y1: parentCoords.y, x2: coords.x, y2: coords.y });
            }
        }

        // Links
        links.forEach(l => {
            svgHtml += `<line class="tree-link" x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" style="stroke-width:1.5px;" />`;
        });

        // Nodes
        nodes.forEach(n => {
            svgHtml += `
                <g>
                    <circle class="tree-node-circle" cx="${n.x}" cy="${n.y}" r="12" id="heap-node-${n.idx}" style="cursor:pointer;" />
                    <text class="tree-node-text" x="${n.x}" y="${n.y}" style="font-size:9px; cursor:pointer;">${n.val}</text>
                </g>
            `;
        });

        svgHtml += `</svg>`;
        
        // 2. Draw flat Array representation underneath
        let arrHtml = `<div class="heap-array-container">`;
        heapData.forEach((val, idx) => {
            arrHtml += `
                <div class="heap-array-cell" id="heap-array-${idx}" style="cursor:pointer;">
                    <div class="cell-val" style="font-size:0.9rem;">${val}</div>
                    <div class="cell-idx" style="font-size:0.55rem; height:14px; background:var(--primary-light);">[${idx}]</div>
                </div>
            `;
        });
        arrHtml += `</div>`;

        container.innerHTML = svgHtml + arrHtml;
        sandboxCanvas.appendChild(container);

        // Bind click handlers for Heap Elements (Tree & Flat Array)
        for (let idx = 0; idx < heapData.length; idx++) {
            const val = heapData[idx];
            
            const bindClick = (el) => {
                el.addEventListener("click", (e) => {
                    e.stopPropagation();
                    
                    // Clear previous selection
                    document.querySelectorAll(".tree-node-circle").forEach(c => c.classList.remove("selected"));
                    document.querySelectorAll(".heap-array-cell").forEach(c => c.classList.remove("selected"));
                    
                    // Highlight both tree node & array cell
                    const treeNode = document.getElementById(`heap-node-${idx}`);
                    const arrayCell = document.getElementById(`heap-array-${idx}`);
                    if (treeNode) treeNode.classList.add("selected");
                    if (arrayCell) arrayCell.classList.add("selected");
                    
                    // Parent and children
                    const pIdx = idx > 0 ? Math.floor((idx - 1) / 2) : -1;
                    const lIdx = 2 * idx + 1 < heapData.length ? 2 * idx + 1 : -1;
                    const rIdx = 2 * idx + 2 < heapData.length ? 2 * idx + 2 : -1;
                    
                    const pStr = pIdx !== -1 ? `index [${pIdx}] (${heapData[pIdx]})` : "Không có (Root)";
                    const lStr = lIdx !== -1 ? `index [${lIdx}] (${heapData[lIdx]})` : "Không có (Nút lá)";
                    const rStr = rIdx !== -1 ? `index [${rIdx}] (${heapData[rIdx]})` : "Không có (Nút lá)";
                    
                    const addr = "0x" + (0xA400 + idx * 4).toString(16).toUpperCase();
                    
                    const title = "Mảng phẳng Binary Heap";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Nút Heap: heap[${idx}] = ${val}</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ RAM mảng</td><td>${addr}</td></tr>
                            <tr><td>Kiểu dữ liệu</td><td>int (Số nguyên)</td></tr>
                            <tr><td>Kích thước</td><td>sizeof(int) = 4 Bytes</td></tr>
                            <tr><td>Nút cha (Parent)</td><td>${pStr}</td></tr>
                            <tr><td>Con Trái (Left)</td><td>${lStr}</td></tr>
                            <tr><td>Con Phải (Right)</td><td>${rStr}</td></tr>
                        </table>
                    `;
                    showTooltip(el, title, content);
                });
            };
            
            const treeNode = document.getElementById(`heap-node-${idx}`);
            const arrayCell = document.getElementById(`heap-array-${idx}`);
            if (treeNode) bindClick(treeNode);
            if (arrayCell) bindClick(arrayCell);
        }
    }

    // --------------------------------------------------------------------------
    // 2.9 CHAPTER 6: BINARY SEARCH TREE SANDBOX
    // --------------------------------------------------------------------------
    class BSTNode {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }

    function setupBSTSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-sitemap"></i> Trực quan hóa Cây Tìm Kiếm Nhị Phân (BST)';
        
        sandboxControls.innerHTML = `
            <div class="control-group">
                <input type="number" id="bst-val" class="control-input" placeholder="Giá trị">
                <button id="btn-bst-insert" class="btn-ctrl"><i class="fa-solid fa-plus"></i> Chèn Node</button>
                <button id="btn-bst-search" class="btn-ctrl" style="background:var(--accent-light); color:var(--accent);"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
            </div>
            <div class="control-group" style="margin-top: 5px;">
                <button id="btn-bst-inorder" class="btn-ctrl" style="flex:1;">Inorder (LNR)</button>
                <button id="btn-bst-preorder" class="btn-ctrl" style="flex:1;">Preorder (NLR)</button>
                <button id="btn-bst-postorder" class="btn-ctrl" style="flex:1;">Postorder (LRN)</button>
            </div>
            <div class="speed-slider-container" style="margin-top:10px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-bst" min="100" max="1500" value="500">
            </div>
        `;

        document.getElementById("speed-bst").addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        bstRoot = new BSTNode(20);
        bstRoot.left = new BSTNode(10);
        bstRoot.right = new BSTNode(30);
        bstRoot.left.left = new BSTNode(5);
        bstRoot.left.right = new BSTNode(15);
        
        renderBSTCanvas();
        log("Cây tìm kiếm nhị phân được gieo hạt sẵn một số giá trị cơ bản.", "success");

        document.getElementById("btn-bst-insert").addEventListener("click", async () => {
            const val = autoGetNumberVal("bst-val");
            log(`Chuẩn bị chèn ${val} vào cây BST...`, "step");
            
            let current = bstRoot;
            let parent = null;
            
            if (bstRoot === null) {
                bstRoot = new BSTNode(val);
                renderBSTCanvas();
                log(`Cây rỗng, chèn ${val} trực tiếp làm Root!`, "success");
                return;
            }

            while (current !== null) {
                const nodeEl = document.getElementById(`node-${current.value}`);
                if (nodeEl) nodeEl.classList.add("active");
                await sleep(animationSpeed);
                if (nodeEl) nodeEl.classList.remove("active");

                parent = current;
                if (val < current.value) {
                    log(`${val} < ${current.value}: đi về phía Cây con Trái.`, "info");
                    current = current.left;
                } else if (val > current.value) {
                    log(`${val} > ${current.value}: đi về phía Cây con Phải.`, "info");
                    current = current.right;
                } else {
                    log(`Giá trị ${val} đã tồn tại trong cây (BST không chứa trùng lặp). Dừng chèn!`, "warning");
                    return;
                }
            }

            const newNode = new BSTNode(val);
            if (val < parent.value) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
            
            renderBSTCanvas();
            const nodeEl = document.getElementById(`node-${val}`);
            if (nodeEl) nodeEl.classList.add("success");
            log(`Chèn Node(${val}) hoàn tất làm con của Node(${parent.value})!`, "success");
        });

        document.getElementById("btn-bst-search").addEventListener("click", async () => {
            const val = autoGetNumberVal("bst-val");
            log(`Đang tìm kiếm giá trị ${val} trên BST...`, "step");
            let current = bstRoot;
            let found = false;

            while (current !== null) {
                const nodeEl = document.getElementById(`node-${current.value}`);
                if (nodeEl) nodeEl.classList.add("active");
                await sleep(animationSpeed);
                if (nodeEl) nodeEl.classList.remove("active");

                if (val === current.value) {
                    found = true;
                    if (nodeEl) nodeEl.classList.add("success");
                    log(`Đã tìm thấy Node(${val}) trên cây nhị phân!`, "success");
                    break;
                } else if (val < current.value) {
                    log(`${val} < ${current.value}: đi xuống nhánh Trái.`, "info");
                    current = current.left;
                } else {
                    log(`${val} > ${current.value}: đi xuống nhánh Phải.`, "info");
                    current = current.right;
                }
            }

            if (!found) {
                log(`Không tìm thấy giá trị ${val} trong cây BST!`, "warning");
            }
        });

        document.getElementById("btn-bst-inorder").addEventListener("click", async () => {
            log("Bắt đầu duyệt Inorder (Left - Root - Right)...", "step");
            let path = [];
            const taskId = Math.random();
            currentTask = taskId;
            
            async function traverse(node) {
                if (!node || currentTask !== taskId) return;
                await traverse(node.left);
                
                if (currentTask !== taskId) return;
                const el = document.getElementById(`node-${node.value}`);
                if (el) el.classList.add("active");
                path.push(node.value);
                log(`Duyệt Node: <b>${node.value}</b>`, "info");
                await sleep(animationSpeed);
                if (el) el.classList.remove("active");
                
                await traverse(node.right);
            }
            await traverse(bstRoot);
            if (currentTask === taskId) {
                log(`Kết quả Inorder: <b>[${path.join(", ")}]</b>`, "success");
            }
        });

        document.getElementById("btn-bst-preorder").addEventListener("click", async () => {
            log("Bắt đầu duyệt Preorder (Root - Left - Right)...", "step");
            let path = [];
            const taskId = Math.random();
            currentTask = taskId;
            
            async function traverse(node) {
                if (!node || currentTask !== taskId) return;
                const el = document.getElementById(`node-${node.value}`);
                if (el) el.classList.add("active");
                path.push(node.value);
                log(`Duyệt Node: <b>${node.value}</b>`, "info");
                await sleep(animationSpeed);
                if (el) el.classList.remove("active");
                
                await traverse(node.left);
                await traverse(node.right);
            }
            await traverse(bstRoot);
            if (currentTask === taskId) {
                log(`Kết quả Preorder: <b>[${path.join(", ")}]</b>`, "success");
            }
        });

        document.getElementById("btn-bst-postorder").addEventListener("click", async () => {
            log("Bắt đầu duyệt Postorder (Left - Right - Root)...", "step");
            let path = [];
            const taskId = Math.random();
            currentTask = taskId;
            
            async function traverse(node) {
                if (!node || currentTask !== taskId) return;
                await traverse(node.left);
                await traverse(node.right);
                
                if (currentTask !== taskId) return;
                const el = document.getElementById(`node-${node.value}`);
                if (el) el.classList.add("active");
                path.push(node.value);
                log(`Duyệt Node: <b>${node.value}</b>`, "info");
                await sleep(animationSpeed);
                if (el) el.classList.remove("active");
            }
            await traverse(bstRoot);
            if (currentTask === taskId) {
                log(`Kết quả Postorder: <b>[${path.join(", ")}]</b>`, "success");
            }
        });
    }

    function findBSTNode(root, val) {
        if (!root) return null;
        if (root.value === val) return root;
        if (val < root.value) return findBSTNode(root.left, val);
        return findBSTNode(root.right, val);
    }

    function renderBSTCanvas() {
        if (!bstRoot) {
            sandboxCanvas.innerHTML = `<div style="color:var(--text-muted); font-style:italic; padding:20px;">Cây rỗng (Root = NULL)</div>`;
            return;
        }

        const width = 440;
        const height = 240;
        let svgHtml = `<svg class="tree-svg" viewBox="0 0 ${width} ${height}">`;
        
        let links = [];
        let nodes = [];

        function calculateCoords(node, x, y, spacing) {
            if (!node) return;
            nodes.push({ value: node.value, x: x, y: y });
            if (node.left) {
                links.push({ x1: x, y1: y, x2: x - spacing, y2: y + 55 });
                calculateCoords(node.left, x - spacing, y + 55, spacing * 0.5);
            }
            if (node.right) {
                links.push({ x1: x, y1: y, x2: x + spacing, y2: y + 55 });
                calculateCoords(node.right, x + spacing, y + 55, spacing * 0.5);
            }
        }

        calculateCoords(bstRoot, width / 2, 30, 90);

        links.forEach(l => {
            svgHtml += `<line class="tree-link" x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" />`;
        });

        nodes.forEach(n => {
            svgHtml += `
                <g>
                    <circle class="tree-node-circle" cx="${n.x}" cy="${n.y}" r="15" id="node-${n.value}" style="cursor:pointer;" />
                    <text class="tree-node-text" x="${n.x}" y="${n.y}" style="cursor:pointer;">${n.value}</text>
                </g>
            `;
        });
        svgHtml += `</svg>`;
        sandboxCanvas.innerHTML = svgHtml;

        // Bind Click Handlers
        nodes.forEach(n => {
            const nodeEl = document.getElementById(`node-${n.value}`);
            if (nodeEl) {
                nodeEl.addEventListener("click", (e) => {
                    e.stopPropagation();
                    
                    document.querySelectorAll(".tree-node-circle").forEach(el => el.classList.remove("selected"));
                    nodeEl.classList.add("selected");
                    
                    const nodeObj = findBSTNode(bstRoot, n.value);
                    if (nodeObj) {
                        const baseAddr = 0x4320 + n.value * 16;
                        const hexAddr = "0x" + baseAddr.toString(16).toUpperCase();
                        
                        const hexLeftAddr = nodeObj.left ? "0x" + (0x4320 + nodeObj.left.value * 16).toString(16).toUpperCase() : "0x0000 (NULL)";
                        const hexRightAddr = nodeObj.right ? "0x" + (0x4320 + nodeObj.right.value * 16).toString(16).toUpperCase() : "0x0000 (NULL)";
                        
                        const structCode = `struct BSTNode {
    int value;             // Giá trị: ${n.value} (offset +0, size 4B)
    char _pad[4];          // Căn lề bộ nhớ (offset +4, size 4B)
    struct BSTNode* left;  // Con trái: ${hexLeftAddr} (offset +8, size 8B)
    struct BSTNode* right; // Con phải: ${hexRightAddr} (offset +16, size 8B)
}; // sizeof(struct BSTNode) = 24 bytes`;

                        const title = "Cây BST (BST Node struct)";
                        const content = `
                            <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Nút BST: [${n.value}]</div>
                            <table class="tooltip-meta-table">
                                <tr><td>Địa chỉ RAM Node</td><td>${hexAddr}</td></tr>
                                <tr><td><code>value</code> (int)</td><td>${n.value} (Offset +0)</td></tr>
                                <tr><td><code>left</code> (pointer)</td><td>${hexLeftAddr} (Offset +8)</td></tr>
                                <tr><td><code>right</code> (pointer)</td><td>${hexRightAddr} (Offset +16)</td></tr>
                                <tr><td>Kích thước Node</td><td>24 Bytes</td></tr>
                            </table>
                        `;
                        showTooltip(nodeEl, title, content, structCode);
                    }
                });
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2.10 CHAPTER 11: GRAPH & TRAVERSALS SANDBOX (NEW!)
    // --------------------------------------------------------------------------

    function setupGraphSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-diagram-project"></i> Duyệt đồ thị BFS &amp; DFS trực quan';
        
        sandboxControls.innerHTML = `
            <div class="control-group" style="justify-content:space-between;">
                <button id="btn-graph-bfs" class="btn-ctrl" style="flex:1;"><i class="fa-solid fa-play"></i> Duyệt BFS (Chiều rộng)</button>
                <button id="btn-graph-dfs" class="btn-ctrl" style="flex:1; background:var(--neutral-dark); color:white;"><i class="fa-solid fa-play"></i> Duyệt DFS (Chiều sâu)</button>
            </div>
            <div class="speed-slider-container" style="margin-top:10px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-graph" min="200" max="2000" value="800">
            </div>
        `;

        document.getElementById("speed-graph").addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        renderGraphCanvas();
        log("Đồ thị gồm 5 đỉnh A, B, C, D, E đã được thiết lập mạng liên kết.", "success");

        document.getElementById("btn-graph-bfs").addEventListener("click", async () => {
            log("Bắt đầu duyệt BFS từ Đỉnh A (0). Sử dụng hàng đợi Hàng đợi (Queue)...", "step");
            renderGraphCanvas();
            
            const taskId = Math.random();
            currentTask = taskId;
            
            let visited = Array(5).fill(false);
            let queue = [0];
            visited[0] = true;
            
            while (queue.length > 0) {
                if (currentTask !== taskId) return;
                
                let u = queue.shift();
                log(`Lấy <b>${graphNodes[u].label}</b> ra khỏi Queue và duyệt.`, "info");
                
                const nodeEl = document.getElementById(`graph-node-${u}`);
                if (nodeEl) nodeEl.className.baseVal = "tree-node-circle active";
                await sleep(animationSpeed);
                
                if (nodeEl) nodeEl.className.baseVal = "tree-node-circle success";
                
                // Get adjacent nodes
                for (let edge of graphEdges) {
                    let v = -1;
                    if (edge.u === u) v = edge.v;
                    else if (edge.v === u) v = edge.u;
                    
                    if (v !== -1 && !visited[v]) {
                        if (currentTask !== taskId) return;
                        
                        visited[v] = true;
                        queue.push(v);
                        
                        // Highlight edge in BFS
                        const edgeEl = document.getElementById(`graph-edge-${edge.u}-${edge.v}`);
                        if (edgeEl) edgeEl.style.stroke = "var(--primary)";
                        
                        log(`Nút kề chưa duyệt: <b>${graphNodes[v].label}</b> -> Đánh dấu Visited và đưa vào Queue.`, "info");
                        const vEl = document.getElementById(`graph-node-${v}`);
                        if (vEl) vEl.className.baseVal = "tree-node-circle highlight";
                        await sleep(animationSpeed * 0.6);
                    }
                }
            }
            log("Hoàn thành duyệt đồ thị theo chiều rộng (BFS)!", "success");
        });

        document.getElementById("btn-graph-dfs").addEventListener("click", async () => {
            log("Bắt đầu duyệt DFS từ Đỉnh A (0). Sử dụng cơ chế Ngăn xếp (Stack/Đệ quy)...", "step");
            renderGraphCanvas();
            
            const taskId = Math.random();
            currentTask = taskId;
            
            let visited = Array(5).fill(false);
            
            async function dfsVisit(u) {
                if (currentTask !== taskId) return;
                
                visited[u] = true;
                log(`Duyệt sâu vào Đỉnh: <b style="color:var(--accent);">${graphNodes[u].label}</b>`, "info");
                
                const nodeEl = document.getElementById(`graph-node-${u}`);
                if (nodeEl) nodeEl.className.baseVal = "tree-node-circle active";
                await sleep(animationSpeed);
                if (nodeEl) nodeEl.className.baseVal = "tree-node-circle success";
                
                for (let edge of graphEdges) {
                    let v = -1;
                    if (edge.u === u) v = edge.v;
                    else if (edge.v === u) v = edge.u;
                    
                    if (v !== -1 && !visited[v]) {
                        if (currentTask !== taskId) return;
                        
                        // Highlight edge
                        const edgeEl = document.getElementById(`graph-edge-${edge.u}-${edge.v}`);
                        if (edgeEl) edgeEl.style.stroke = "var(--accent)";
                        
                        await dfsVisit(v);
                    }
                }
            }
            
            await dfsVisit(0);
            log("Hoàn thành duyệt đồ thị theo chiều sâu (DFS)!", "success");
        });
    }

    function renderGraphCanvas() {
        const width = 440;
        const height = 240;
        
        let html = `<svg class="tree-svg" viewBox="0 0 ${width} ${height}">`;
        
        // Render Edges
        graphEdges.forEach(e => {
            const uNode = graphNodes[e.u];
            const vNode = graphNodes[e.v];
            html += `<line id="graph-edge-${e.u}-${e.v}" class="tree-link" x1="${uNode.x}" y1="${uNode.y}" x2="${vNode.x}" y2="${vNode.y}" style="stroke:#cbd5e1; stroke-width:3px;" />`;
        });

        // Render Vertices
        graphNodes.forEach(n => {
            html += `
                <g>
                    <circle class="tree-node-circle" cx="${n.x}" cy="${n.y}" r="16" id="graph-node-${n.id}" style="stroke-width:3px; cursor:pointer;" />
                    <text class="tree-node-text" x="${n.x}" y="${n.y}" style="font-weight:700; font-size:12px; cursor:pointer;">${n.label}</text>
                </g>
            `;
        });

        html += `</svg>`;
        sandboxCanvas.innerHTML = html;

        // Bind Click Handlers
        graphNodes.forEach(n => {
            const nodeEl = document.getElementById(`graph-node-${n.id}`);
            if (nodeEl) {
                nodeEl.addEventListener("click", (e) => {
                    e.stopPropagation();
                    
                    document.querySelectorAll(".tree-node-circle").forEach(el => el.classList.remove("selected"));
                    nodeEl.classList.add("selected");
                    
                    const baseAddr = 0xB500 + n.id * 16;
                    const hexAddr = "0x" + baseAddr.toString(16).toUpperCase();
                    
                    const edgesAddr = 0xC2A0 + n.id * 32;
                    const hexEdgesAddr = "0x" + edgesAddr.toString(16).toUpperCase();
                    
                    const neighbors = graphEdges
                        .filter(edge => edge.u === n.id || edge.v === n.id)
                        .map(edge => edge.u === n.id ? graphNodes[edge.v].label : graphNodes[edge.u].label)
                        .join(", ");
                        
                    const structCode = `struct Vertex {
    char label;            // Tên đỉnh: '${n.label}' (offset +0, size 1B)
    char _pad[7];          // Căn lề bộ nhớ (offset +1, size 7B)
    struct Edge* edges;    // Trỏ tới Cạnh kề: ${hexEdgesAddr} (offset +8, size 8B)
}; // sizeof(struct Vertex) = 16 bytes`;

                    const title = "Cấu trúc đồ thị (Vertex struct)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Đỉnh Đồ thị: Vertex ${n.label}</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ RAM Đỉnh</td><td>${hexAddr}</td></tr>
                            <tr><td><code>label</code> (char)</td><td>'${n.label}' (Offset +0)</td></tr>
                            <tr><td><code>edges</code> (struct Edge*)</td><td>${hexEdgesAddr} (Offset +8)</td></tr>
                            <tr><td>Đỉnh kề (Neighbors)</td><td>${neighbors || "Trống (Đỉnh cô lập)"}</td></tr>
                            <tr><td>Kích thước Vertex</td><td>16 Bytes</td></tr>
                        </table>
                    `;
                    showTooltip(nodeEl, title, content, structCode);
                });
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2.11 CHAPTER 7: SORTING SANDBOX
    // --------------------------------------------------------------------------

    function setupSortingSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-arrow-down-wide-short"></i> Trực quan hóa Giải thuật Sắp xếp';
        
        sandboxControls.innerHTML = `
            <div class="control-group" style="display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:5px;">
                <button id="btn-sort-reset" class="btn-ctrl" style="background:var(--neutral-dark); color:white; padding: 4px 8px;"><i class="fa-solid fa-rotate-right"></i> Mảng Mới</button>
                <div style="display:flex; align-items:center; gap:4px; background:#1e293b; padding:2px 8px; border-radius:6px; border:1px solid #334155;">
                    <span style="font-size:0.65rem; color:#94a3b8; font-weight:600;">Size:</span>
                    <input type="number" id="sort-size" min="5" max="100" value="10" style="width:35px; background:transparent; border:none; color:white; font-size:0.75rem; font-weight:700; text-align:center;">
                </div>
                <div style="display:flex; align-items:center; gap:4px; background:#1e293b; padding:2px 8px; border-radius:6px; border:1px solid #334155;">
                    <span style="font-size:0.65rem; color:#94a3b8; font-weight:600;">Chế độ:</span>
                    <select id="sort-mode-select" style="background:transparent; border:none; color:var(--accent); font-size:0.75rem; font-weight:700; cursor:pointer;">
                        <option value="single" style="background:#0f172a;">Hoạt họa (Đơn)</option>
                        <option value="compare" style="background:#0f172a;">So sánh song song</option>
                    </select>
                </div>
            </div>
            
            <div id="sort-single-buttons" class="control-group" style="display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:5px; align-items:center;">
                <span style="font-size:0.65rem; color:#94a3b8; font-weight:700; margin-right:4px;">SẮP XẾP:</span>
                <button id="btn-bubble-sort" class="btn-ctrl" style="padding: 4px 6px;"><i class="fa-solid fa-play"></i> Bubble</button>
                <button id="btn-selection-sort" class="btn-ctrl" style="padding: 4px 6px;"><i class="fa-solid fa-play"></i> Selection</button>
                <button id="btn-insertion-sort" class="btn-ctrl" style="padding: 4px 6px;"><i class="fa-solid fa-play"></i> Insertion</button>
                <button id="btn-merge-sort" class="btn-ctrl" style="background:#10b981; color:white; padding: 4px 6px;"><i class="fa-solid fa-play"></i> Merge</button>
                <button id="btn-quick-sort" class="btn-ctrl" style="background:#a855f7; color:white; padding: 4px 6px;"><i class="fa-solid fa-play"></i> Quick</button>
            </div>
            
            <div id="search-single-buttons" class="control-group" style="display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:5px; align-items:center; border-top:1px solid #1e293b; padding-top:5px; margin-top:5px;">
                <span style="font-size:0.65rem; color:#94a3b8; font-weight:700; margin-right:4px;">TÌM KIẾM:</span>
                <input type="number" id="sort-search-val" placeholder="Số" style="width:45px; background:#1e293b; border:1px solid #334155; color:white; font-size:0.75rem; font-weight:700; text-align:center; border-radius:4px; padding:2px 4px;">
                <button id="btn-linear-search" class="btn-ctrl" style="background:#3b82f6; color:white; padding: 4px 6px;"><i class="fa-solid fa-magnifying-glass"></i> Tuyến tính</button>
                <button id="btn-binary-search" class="btn-ctrl" style="background:#ec4899; color:white; padding: 4px 6px;"><i class="fa-solid fa-magnifying-glass"></i> Nhị phân</button>
            </div>
            
            <div id="sort-compare-buttons" class="control-group" style="display:none; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:5px;">
                <button id="btn-start-compare" class="btn-ctrl" style="background:linear-gradient(135deg, var(--accent), #10b981); color:white; font-weight:700; padding: 4px 15px;">
                    <i class="fa-solid fa-bolt"></i> CHẠY SO SÁNH SONG SONG
                </button>
            </div>

            <div class="speed-slider-container" style="margin-top:5px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-sort" min="50" max="1000" value="300">
            </div>
        `;

        const modeSelect = document.getElementById("sort-mode-select");
        const singleBtns = document.getElementById("sort-single-buttons");
        const searchBtns = document.getElementById("search-single-buttons");
        const compareBtns = document.getElementById("sort-compare-buttons");
        const sizeInput = document.getElementById("sort-size");

        document.getElementById("speed-sort").addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        // Set initial array state
        generateRandomSortArray(10);
        renderSortingCanvas();
        log("Mảng số ngẫu nhiên đã được tạo. Hãy chọn thuật toán hoặc Chế độ so sánh song song!", "success");

        function handleRandomize() {
            currentTask = null;
            let size = parseInt(sizeInput.value);
            if (isNaN(size) || size < 5) size = 5;
            if (size > 100) size = 100;
            sizeInput.value = size;

            generateRandomSortArray(size);
            
            if (modeSelect.value === "single") {
                renderSortingCanvas();
            } else {
                compareArrays.bubble = [...sortArray];
                compareArrays.selection = [...sortArray];
                compareArrays.insertion = [...sortArray];
                compareArrays.merge = [...sortArray];
                compareArrays.quick = [...sortArray];
                
                const keys = ["bubble", "selection", "insertion", "merge", "quick"];
                keys.forEach(k => {
                    compareStats[k] = { comparisons: 0, swaps: 0, time: 0, active: false, done: false };
                });
                renderCompareCanvas();
            }
        }

        sizeInput.addEventListener("change", handleRandomize);
        document.getElementById("btn-sort-reset").addEventListener("click", () => {
            handleRandomize();
            log(`Đã tạo mảng mới ngẫu nhiên kích thước size = ${sizeInput.value}.`, "success");
        });

        modeSelect.addEventListener("change", (e) => {
            currentTask = null;
            if (e.target.value === "single") {
                singleBtns.style.display = "flex";
                searchBtns.style.display = "flex";
                compareBtns.style.display = "none";
                renderSortingCanvas();
                log("Đã chuyển về chế độ Hoạt họa đơn từng bước.", "info");
            } else {
                singleBtns.style.display = "none";
                searchBtns.style.display = "none";
                compareBtns.style.display = "flex";
                handleRandomize();
                log("Đã chuyển sang chế độ So sánh song song cả 5 giải thuật.", "info");
            }
        });

        // 1. Single Mode Handlers
        document.getElementById("btn-bubble-sort").addEventListener("click", async () => {
            log("Bắt đầu nổi bọt Bubble Sort...", "step");
            const taskId = Math.random();
            currentTask = taskId;
            
            let arr = [...sortArray];
            let n = arr.length;
            
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    if (currentTask !== taskId) return;
                    
                    highlightBars([j, j + 1], "active");
                    await sleep(animationSpeed);
                    
                    if (arr[j] > arr[j + 1]) {
                        log(`So sánh: ${arr[j]} > ${arr[j + 1]} -> Đổi chỗ!`, "info");
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                        
                        sortArray = [...arr];
                        renderSortingCanvas();
                        highlightBars([j, j + 1], "highlight");
                        await sleep(animationSpeed);
                    }
                    highlightBars([j, j + 1], "");
                }
                const sortedBar = document.getElementById(`sort-bar-${n - i - 1}`);
                if (sortedBar) sortedBar.classList.add("success");
            }
            renderSortingCanvas();
            const bars = document.querySelectorAll(".sort-bar");
            bars.forEach(b => b.classList.add("success"));
            log("Hoàn thành giải thuật Sắp xếp Nổi bọt (Bubble Sort)!", "success");
        });

        document.getElementById("btn-selection-sort").addEventListener("click", async () => {
            log("Bắt đầu sắp xếp chọn Selection Sort...", "step");
            const taskId = Math.random();
            currentTask = taskId;
            
            let arr = [...sortArray];
            let n = arr.length;
            
            for (let i = 0; i < n - 1; i++) {
                let minIdx = i;
                log(`Lấy mốc nhỏ nhất ban đầu min_idx = <b>${i}</b> (giá trị: ${arr[i]})`, "info");
                
                const curMinBar = document.getElementById(`sort-bar-${minIdx}`);
                if (curMinBar) curMinBar.classList.add("highlight");
                
                for (let j = i + 1; j < n; j++) {
                    if (currentTask !== taskId) return;
                    
                    const testBar = document.getElementById(`sort-bar-${j}`);
                    if (testBar) testBar.classList.add("active");
                    await sleep(animationSpeed * 0.8);
                    
                    if (arr[j] < arr[minIdx]) {
                        log(`Phát hiện ${arr[j]} < ${arr[minIdx]} -> Cập nhật min_idx = <b>${j}</b>`, "info");
                        if (curMinBar) curMinBar.classList.remove("highlight");
                        minIdx = j;
                        const newMinBar = document.getElementById(`sort-bar-${minIdx}`);
                        if (newMinBar) newMinBar.classList.add("highlight");
                    }
                    if (testBar) testBar.classList.remove("active");
                }
                
                if (minIdx !== i) {
                    log(`Đổi chỗ phần tử mốc <b>${arr[i]}</b> (index ${i}) với nhỏ nhất <b>${arr[minIdx]}</b> (index ${minIdx})!`, "success");
                    let temp = arr[i];
                    arr[i] = arr[minIdx];
                    arr[minIdx] = temp;
                    
                    sortArray = [...arr];
                    renderSortingCanvas();
                    await sleep(animationSpeed);
                }
                const sortedBar = document.getElementById(`sort-bar-${i}`);
                if (sortedBar) sortedBar.classList.add("success");
            }
            
            renderSortingCanvas();
            const bars = document.querySelectorAll(".sort-bar");
            bars.forEach(b => b.classList.add("success"));
            log("Hoàn thành giải thuật Sắp xếp Chọn (Selection Sort)!", "success");
        });

        document.getElementById("btn-insertion-sort").addEventListener("click", async () => {
            log("Bắt đầu sắp xếp chèn Insertion Sort...", "step");
            const taskId = Math.random();
            currentTask = taskId;
            
            let arr = [...sortArray];
            let n = arr.length;
            
            for (let i = 1; i < n; i++) {
                if (currentTask !== taskId) return;
                
                let key = arr[i];
                let j = i - 1;
                
                log(`Lấy khóa key = <b>${key}</b> tại index ${i}. Bắt đầu chèn vào mảng con đã sắp xếp phía trước...`, "info");
                
                const keyBar = document.getElementById(`sort-bar-${i}`);
                if (keyBar) keyBar.classList.add("highlight");
                await sleep(animationSpeed);
                
                while (j >= 0 && arr[j] > key) {
                    if (currentTask !== taskId) return;
                    
                    highlightBars([j, j + 1], "active");
                    log("So sánh dịch chuyển con số lớn hơn sang bên phải...", "info");
                    await sleep(animationSpeed * 0.8);
                    
                    arr[j + 1] = arr[j];
                    sortArray = [...arr];
                    renderSortingCanvas();
                    
                    const shiftedBar = document.getElementById(`sort-bar-${j + 1}`);
                    if (shiftedBar) shiftedBar.classList.add("active");
                    const prevBar = document.getElementById(`sort-bar-${j}`);
                    if (prevBar) prevBar.classList.add("highlight");
                    await sleep(animationSpeed * 0.6);
                    
                    j = j - 1;
                }
                
                if (currentTask !== taskId) return;
                arr[j + 1] = key;
                sortArray = [...arr];
                renderSortingCanvas();
                
                const placedBar = document.getElementById(`sort-bar-${j + 1}`);
                if (placedBar) placedBar.classList.add("success");
                log(`Chèn key = <b>${key}</b> vào vị trí index <b>${j + 1}</b> thành công.`, "success");
                await sleep(animationSpeed);
                
                // Show current sorted sub-array state
                for (let k = 0; k <= i; k++) {
                    const bar = document.getElementById(`sort-bar-${k}`);
                    if (bar) bar.classList.add("success");
                }
                await sleep(animationSpeed * 0.5);
            }
            
            renderSortingCanvas();
            const bars = document.querySelectorAll(".sort-bar");
            bars.forEach(b => b.classList.add("success"));
            log("Hoàn thành giải thuật Sắp xếp Chèn (Insertion Sort)!", "success");
        });

        document.getElementById("btn-quick-sort").addEventListener("click", async () => {
            log("Bắt đầu sắp xếp nhanh Quick Sort (Lomuto Partition)...", "step");
            const taskId = Math.random();
            currentTask = taskId;
            
            let arr = [...sortArray];
            
            async function quickSort(low, high) {
                if (low < high) {
                    if (currentTask !== taskId) return;
                    let pIdx = await partition(low, high);
                    await quickSort(low, pIdx - 1);
                    await quickSort(pIdx + 1, high);
                } else if (low >= 0 && low < arr.length) {
                    const bar = document.getElementById(`sort-bar-${low}`);
                    if (bar) bar.classList.add("success");
                }
            }
            
            async function partition(low, high) {
                let pivot = arr[high];
                log(`[Phân hoạch] Chọn Pivot = <b>${pivot}</b> tại chốt cuối index ${high}. Phân đoạn đang xét: arr[${low}...${high}]`, "warning");
                
                renderSortingCanvas([low, high]);
                const pivotBar = document.getElementById(`sort-bar-${high}`);
                if (pivotBar) pivotBar.style.background = "#a855f7"; // purple for pivot
                await sleep(animationSpeed);
                
                let i = low - 1;
                for (let j = low; j < high; j++) {
                    if (currentTask !== taskId) return;
                    
                    const jBar = document.getElementById(`sort-bar-${j}`);
                    if (jBar) jBar.classList.add("active");
                    await sleep(animationSpeed * 0.7);
                    
                    if (arr[j] < pivot) {
                        i++;
                        log(`So sánh: arr[${j}] (${arr[j]}) < Pivot (${pivot}) -> Tăng biên i = ${i}, swap arr[${i}] & arr[${j}].`, "info");
                        
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                        
                        sortArray = [...arr];
                        renderSortingCanvas([low, high]);
                        
                        const pBar = document.getElementById(`sort-bar-${high}`);
                        if (pBar) pBar.style.background = "#a855f7";
                        highlightBars([i, j], "highlight");
                        await sleep(animationSpeed);
                    }
                    if (jBar) jBar.classList.remove("active");
                }
                
                if (currentTask !== taskId) return;
                log(`[Đổi chỗ Pivot] Đưa Pivot về đúng vị trí biên phân hoạch Lomuto: swap arr[${i + 1}] & arr[${high}].`, "success");
                let temp = arr[i + 1];
                arr[i + 1] = arr[high];
                arr[high] = temp;
                
                sortArray = [...arr];
                renderSortingCanvas([low, high]);
                
                const placedPivotBar = document.getElementById(`sort-bar-${i + 1}`);
                if (placedPivotBar) placedPivotBar.classList.add("success");
                await sleep(animationSpeed * 1.2);
                
                return i + 1;
            }
            
            await quickSort(0, arr.length - 1);
            
            if (currentTask === taskId) {
                renderSortingCanvas();
                const bars = document.querySelectorAll(".sort-bar");
                bars.forEach(b => b.classList.add("success"));
                log("Hoàn thành giải thuật Sắp xếp Nhanh (Quick Sort)!", "success");
            }
        });

        document.getElementById("btn-merge-sort").addEventListener("click", async () => {
            log("Bắt đầu sắp xếp trộn Merge Sort (Divide & Conquer)...", "step");
            const taskId = Math.random();
            currentTask = taskId;
            
            let arr = [...sortArray];
            
            async function mergeSort(low, high) {
                if (low < high) {
                    if (currentTask !== taskId) return;
                    let mid = Math.floor((low + high) / 2);
                    
                    log(`[Divide] Chia phân đoạn arr[${low}...${high}] tại mid = ${mid}`, "info");
                    renderSortingCanvas([low, high]);
                    highlightBars([mid], "highlight");
                    await sleep(animationSpeed);
                    
                    await mergeSort(low, mid);
                    await mergeSort(mid + 1, high);
                    
                    await merge(low, mid, high);
                }
            }
            
            async function merge(low, mid, high) {
                if (currentTask !== taskId) return;
                
                log(`[Conquer & Merge] Trộn hai phân đoạn đã sắp xếp: arr[${low}...${mid}] và arr[${mid+1}...${high}]`, "warning");
                renderSortingCanvas([low, high]);
                await sleep(animationSpeed);
                
                let left = arr.slice(low, mid + 1);
                let right = arr.slice(mid + 1, high + 1);
                
                let i = 0, j = 0, k = low;
                
                while (i < left.length && j < right.length) {
                    if (currentTask !== taskId) return;
                    
                    renderSortingCanvas([low, high]);
                    highlightBars([low + i, mid + 1 + j], "active");
                    await sleep(animationSpeed * 0.8);
                    
                    if (left[i] <= right[j]) {
                        arr[k] = left[i];
                        i++;
                    } else {
                        arr[k] = right[j];
                        j++;
                    }
                    
                    sortArray = [...arr];
                    renderSortingCanvas([low, high]);
                    highlightBars([k], "success");
                    await sleep(animationSpeed * 0.6);
                    k++;
                }
                
                while (i < left.length) {
                    if (currentTask !== taskId) return;
                    arr[k] = left[i];
                    i++;
                    
                    sortArray = [...arr];
                    renderSortingCanvas([low, high]);
                    highlightBars([k], "success");
                    await sleep(animationSpeed * 0.5);
                    k++;
                }
                
                while (j < right.length) {
                    if (currentTask !== taskId) return;
                    arr[k] = right[j];
                    j++;
                    
                    sortArray = [...arr];
                    renderSortingCanvas([low, high]);
                    highlightBars([k], "success");
                    await sleep(animationSpeed * 0.5);
                    k++;
                }
            }
            
            await mergeSort(0, arr.length - 1);
            
            if (currentTask === taskId) {
                renderSortingCanvas();
                const bars = document.querySelectorAll(".sort-bar");
                bars.forEach(b => b.classList.add("success"));
                log("Hoàn thành giải thuật Sắp xếp Trộn (Merge Sort)!", "success");
            }
        });

        document.getElementById("btn-linear-search").addEventListener("click", async () => {
            let targetInput = document.getElementById("sort-search-val");
            let targetVal = parseInt(targetInput.value);
            
            if (isNaN(targetVal)) {
                targetVal = sortArray[Math.floor(Math.random() * sortArray.length)];
                targetInput.value = targetVal;
                log(`Mục tiêu trống! Đã chọn ngẫu nhiên con số có sẵn: <b>${targetVal}</b>`, "warning");
            }
            
            log(`[Linear Search] Bắt đầu tìm kiếm tuyến tính cho giá trị Target = <b>${targetVal}</b>...`, "step");
            const taskId = Math.random();
            currentTask = taskId;
            
            let foundIdx = -1;
            renderSortingCanvas();
            await sleep(animationSpeed);
            
            for (let i = 0; i < sortArray.length; i++) {
                if (currentTask !== taskId) return;
                
                highlightBars([i], "active");
                log(`Kiểm tra arr[${i}] = ${sortArray[i]} với Target ${targetVal}...`, "info");
                await sleep(animationSpeed);
                
                if (sortArray[i] === targetVal) {
                    foundIdx = i;
                    highlightBars([i], "success");
                    log(`Đã tìm thấy Target <b>${targetVal}</b> tại vị trí index = <b>${i}</b>!`, "success");
                    break;
                }
                highlightBars([i], "");
            }
            
            if (currentTask === taskId && foundIdx === -1) {
                log(`Không tìm thấy giá trị <b>${targetVal}</b> trong mảng!`, "error");
            }
        });

        document.getElementById("btn-binary-search").addEventListener("click", async () => {
            let targetInput = document.getElementById("sort-search-val");
            let targetVal = parseInt(targetInput.value);
            
            if (isNaN(targetVal)) {
                targetVal = sortArray[Math.floor(Math.random() * sortArray.length)];
                targetInput.value = targetVal;
                log(`Mục tiêu trống! Đã chọn ngẫu nhiên con số có sẵn: <b>${targetVal}</b>`, "warning");
            }
            
            let isSorted = true;
            for (let i = 0; i < sortArray.length - 1; i++) {
                if (sortArray[i] > sortArray[i + 1]) {
                    isSorted = false;
                    break;
                }
            }
            
            if (!isSorted) {
                log(`Binary Search yêu cầu mảng phải được sắp xếp trước. Đang tự động sắp xếp mảng...`, "warning");
                sortArray.sort((a, b) => a - b);
                renderSortingCanvas();
                await sleep(animationSpeed * 1.5);
            }
            
            log(`[Binary Search] Bắt đầu tìm kiếm nhị phân cho Target = <b>${targetVal}</b>...`, "step");
            const taskId = Math.random();
            currentTask = taskId;
            
            let low = 0;
            let high = sortArray.length - 1;
            let foundIdx = -1;
            
            while (low <= high) {
                if (currentTask !== taskId) return;
                
                let mid = Math.floor((low + high) / 2);
                
                renderSortingCanvas([low, high]);
                highlightBars([low, high], "active");
                highlightBars([mid], "highlight");
                
                log(`Khoảng tìm kiếm hiện tại: arr[${low}...${high}] (Biên trái: ${sortArray[low]}, Biên phải: ${sortArray[high]}). Chốt giữa Mid = <b>${mid}</b> (giá trị: ${sortArray[mid]})`, "info");
                await sleep(animationSpeed * 1.5);
                
                if (sortArray[mid] === targetVal) {
                    foundIdx = mid;
                    renderSortingCanvas([low, high]);
                    highlightBars([mid], "success");
                    log(`Đã tìm thấy Target <b>${targetVal}</b> tại chốt giữa Mid = <b>${mid}</b>!`, "success");
                    break;
                } else if (sortArray[mid] < targetVal) {
                    log(`Vì arr[${mid}] (${sortArray[mid]}) < Target (${targetVal}) -> Thu hẹp phạm vi sang nửa bên phải: low = mid + 1`, "info");
                    low = mid + 1;
                } else {
                    log(`Vì arr[${mid}] (${sortArray[mid]}) > Target (${targetVal}) -> Thu hẹp phạm vi sang nửa bên trái: high = mid - 1`, "info");
                    high = mid - 1;
                }
                
                await sleep(animationSpeed);
            }
            
            if (currentTask === taskId && foundIdx === -1) {
                renderSortingCanvas();
                log(`Không tìm thấy giá trị <b>${targetVal}</b> trong mảng!`, "error");
            }
        });

        // 2. Parallel Compare Mode Handler
        document.getElementById("btn-start-compare").addEventListener("click", async () => {
            log("Khởi chạy song song cả 5 thuật toán trên mảng đầu vào giống hệt nhau...", "step");
            const taskId = Math.random();
            currentTask = taskId;

            compareArrays.bubble = [...sortArray];
            compareArrays.selection = [...sortArray];
            compareArrays.insertion = [...sortArray];
            compareArrays.merge = [...sortArray];
            compareArrays.quick = [...sortArray];

            const keys = ["bubble", "selection", "insertion", "merge", "quick"];
            keys.forEach(k => {
                compareStats[k] = { comparisons: 0, swaps: 0, time: 0, active: true, done: false };
            });

            renderCompareCanvas();

            const startTime = performance.now();

            const runBubble = async () => {
                let arr = compareArrays.bubble;
                let n = arr.length;
                let comp = 0;
                let sw = 0;

                for (let i = 0; i < n - 1; i++) {
                    for (let j = 0; j < n - i - 1; j++) {
                        if (currentTask !== taskId) return;
                        comp++;
                        compareStats.bubble.comparisons = comp;

                        if (arr[j] > arr[j + 1]) {
                            sw++;
                            compareStats.bubble.swaps = sw;
                            let temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;

                            renderCompareCanvas();
                            await sleep(animationSpeed);
                        }
                    }
                }
                compareStats.bubble.active = false;
                compareStats.bubble.done = true;
                compareStats.bubble.time = Math.round(performance.now() - startTime);
                renderCompareCanvas();
            };

            const runSelection = async () => {
                let arr = compareArrays.selection;
                let n = arr.length;
                let comp = 0;
                let sw = 0;

                for (let i = 0; i < n - 1; i++) {
                    let minIdx = i;
                    for (let j = i + 1; j < n; j++) {
                        if (currentTask !== taskId) return;
                        comp++;
                        compareStats.selection.comparisons = comp;
                        if (arr[j] < arr[minIdx]) {
                            minIdx = j;
                        }
                        await sleep(animationSpeed * 0.4);
                        renderCompareCanvas();
                    }
                    if (minIdx !== i) {
                        sw++;
                        compareStats.selection.swaps = sw;
                        let temp = arr[i];
                        arr[i] = arr[minIdx];
                        arr[minIdx] = temp;

                        renderCompareCanvas();
                        await sleep(animationSpeed);
                    }
                }
                compareStats.selection.active = false;
                compareStats.selection.done = true;
                compareStats.selection.time = Math.round(performance.now() - startTime);
                renderCompareCanvas();
            };

            const runInsertion = async () => {
                let arr = compareArrays.insertion;
                let n = arr.length;
                let comp = 0;
                let sw = 0;

                for (let i = 1; i < n; i++) {
                    let key = arr[i];
                    let j = i - 1;

                    while (j >= 0) {
                        if (currentTask !== taskId) return;
                        comp++;
                        compareStats.insertion.comparisons = comp;

                        if (arr[j] > key) {
                            sw++;
                            compareStats.insertion.swaps = sw;
                            arr[j + 1] = arr[j];
                            j = j - 1;

                            renderCompareCanvas();
                            await sleep(animationSpeed * 0.5);
                        } else {
                            break;
                        }
                    }
                    if (currentTask !== taskId) return;
                    arr[j + 1] = key;
                    sw++;
                    compareStats.insertion.swaps = sw;
                    renderCompareCanvas();
                    await sleep(animationSpeed * 0.5);
                }
                compareStats.insertion.active = false;
                compareStats.insertion.done = true;
                compareStats.insertion.time = Math.round(performance.now() - startTime);
                renderCompareCanvas();
            };

            const runMerge = async () => {
                let arr = compareArrays.merge;
                let comp = 0;
                let sw = 0;

                async function mSort(low, high) {
                    if (low < high) {
                        let mid = Math.floor((low + high) / 2);
                        await mSort(low, mid);
                        await mSort(mid + 1, high);
                        await merge(low, mid, high);
                    }
                }

                async function merge(low, mid, high) {
                    let left = arr.slice(low, mid + 1);
                    let right = arr.slice(mid + 1, high + 1);
                    
                    let i = 0, j = 0, k = low;
                    
                    while (i < left.length && j < right.length) {
                        if (currentTask !== taskId) return;
                        comp++;
                        compareStats.merge.comparisons = comp;
                        
                        if (left[i] <= right[j]) {
                            arr[k] = left[i];
                            i++;
                        } else {
                            arr[k] = right[j];
                            j++;
                        }
                        sw++;
                        compareStats.merge.swaps = sw;
                        
                        renderCompareCanvas();
                        await sleep(animationSpeed * 0.5);
                        k++;
                    }
                    
                    while (i < left.length) {
                        if (currentTask !== taskId) return;
                        arr[k] = left[i];
                        i++;
                        sw++;
                        compareStats.merge.swaps = sw;
                        
                        renderCompareCanvas();
                        await sleep(animationSpeed * 0.4);
                        k++;
                    }
                    
                    while (j < right.length) {
                        if (currentTask !== taskId) return;
                        arr[k] = right[j];
                        j++;
                        sw++;
                        compareStats.merge.swaps = sw;
                        
                        renderCompareCanvas();
                        await sleep(animationSpeed * 0.4);
                        k++;
                    }
                }

                await mSort(0, arr.length - 1);
                compareStats.merge.active = false;
                compareStats.merge.done = true;
                compareStats.merge.time = Math.round(performance.now() - startTime);
                renderCompareCanvas();
            };

            const runQuick = async () => {
                let arr = compareArrays.quick;
                let comp = 0;
                let sw = 0;

                async function qSort(low, high) {
                    if (low < high) {
                        let pIdx = await partition(low, high);
                        await qSort(low, pIdx - 1);
                        await qSort(pIdx + 1, high);
                    }
                }

                async function partition(low, high) {
                    let pivot = arr[high];
                    let i = low - 1;

                    for (let j = low; j < high; j++) {
                        if (currentTask !== taskId) return;
                        comp++;
                        compareStats.quick.comparisons = comp;

                        if (arr[j] < pivot) {
                            i++;
                            sw++;
                            compareStats.quick.swaps = sw;
                            let temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;

                            renderCompareCanvas();
                            await sleep(animationSpeed * 0.5);
                        }
                    }
                    if (currentTask !== taskId) return;
                    sw++;
                    compareStats.quick.swaps = sw;
                    let temp = arr[i + 1];
                    arr[i + 1] = arr[high];
                    arr[high] = temp;

                    renderCompareCanvas();
                    await sleep(animationSpeed);
                    return i + 1;
                }

                await qSort(0, arr.length - 1);
                compareStats.quick.active = false;
                compareStats.quick.done = true;
                compareStats.quick.time = Math.round(performance.now() - startTime);
                renderCompareCanvas();
            };

            await Promise.all([
                runBubble(),
                runSelection(),
                runInsertion(),
                runMerge(),
                runQuick()
            ]);

            if (currentTask === taskId) {
                log("Đã hoàn tất chạy mô phỏng so sánh song song cả 5 thuật toán!", "success");
            }
        });
    }

    function renderCompareCanvas() {
        let html = `
            <div class="compare-arena-container" style="
                display: flex; 
                flex-direction: column; 
                gap: 8px; 
                width: 100%; 
                max-width: 650px; 
                margin: 0 auto; 
                padding: 16px; 
                background: linear-gradient(135deg, #0b1329 0%, #111c44 100%); 
                border-radius: 16px; 
                border: 1px solid rgba(255, 255, 255, 0.08); 
                box-shadow: 0 20px 40px rgba(2, 6, 23, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.1);
                color: #f8fafc;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
            ">
                <div style="
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
                    padding-bottom: 8px; 
                    margin-bottom: 4px;
                ">
                    <span style="
                        font-size: 0.8rem; 
                        font-weight: 800; 
                        color: #38bdf8; 
                        text-transform: uppercase; 
                        letter-spacing: 1px; 
                        display: flex; 
                        align-items: center; 
                        gap: 6px;
                    ">
                        <i class="fa-solid fa-gauge-high" style="color: #38bdf8;"></i> BẢNG SO SÁNH HIỆU NĂNG GIẢI THUẬT
                    </span>
                    <span style="
                        font-size: 0.65rem; 
                        color: #94a3b8; 
                        background: rgba(255, 255, 255, 0.06); 
                        padding: 2px 8px; 
                        border-radius: 20px;
                        border: 1px solid rgba(255, 255, 255, 0.05);
                    ">
                        N = ${sortArray.length} phần tử
                    </span>
                </div>
        `;
        
        const algos = [
            { key: "bubble", name: "Bubble Sort", complexity: "O(N²)", badgeBg: "rgba(239, 68, 68, 0.15)", badgeBorder: "#ef4444", badgeText: "#fca5a5" },
            { key: "selection", name: "Selection Sort", complexity: "O(N²)", badgeBg: "rgba(239, 68, 68, 0.15)", badgeBorder: "#ef4444", badgeText: "#fca5a5" },
            { key: "insertion", name: "Insertion Sort", complexity: "O(N²)", badgeBg: "rgba(245, 158, 11, 0.15)", badgeBorder: "#f59e0b", badgeText: "#fcd34d" },
            { key: "merge", name: "Merge Sort", complexity: "O(N log N)", badgeBg: "rgba(16, 185, 129, 0.15)", badgeBorder: "#10b981", badgeText: "#a7f3d0" },
            { key: "quick", name: "Quick Sort (Lomuto)", complexity: "O(N log N)", badgeBg: "rgba(16, 185, 129, 0.15)", badgeBorder: "#10b981", badgeText: "#a7f3d0" }
        ];

        algos.forEach(algo => {
            const stats = compareStats[algo.key];
            const arr = compareArrays[algo.key];
            
            let trackBorder = "rgba(255, 255, 255, 0.05)";
            let trackBg = "rgba(15, 23, 42, 0.4)";
            let statusIcon = "";
            let statusText = "Chờ...";
            let statusColor = "#64748b";

            if (stats.active) {
                trackBorder = "rgba(56, 189, 248, 0.4)";
                trackBg = "rgba(30, 41, 59, 0.6)";
                statusIcon = `<span style="
                    display: inline-block; 
                    width: 6px; 
                    height: 6px; 
                    background: #38bdf8; 
                    border-radius: 50%; 
                    margin-right: 4px; 
                    box-shadow: 0 0 8px #38bdf8; 
                    animation: pulse 0.8s infinite alternate;
                "></span>`;
                statusText = "Chạy";
                statusColor = "#38bdf8";
            } else if (stats.done) {
                trackBorder = "rgba(16, 185, 129, 0.4)";
                trackBg = "rgba(16, 185, 129, 0.03)";
                statusIcon = `<i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 4px; filter: drop-shadow(0 0 3px rgba(16, 185, 129, 0.4));"></i>`;
                statusText = "Xong";
                statusColor = "#10b981";
            }

            html += `
                <div class="compare-track" style="
                    background: ${trackBg}; 
                    border: 1px solid ${trackBorder}; 
                    border-radius: 12px; 
                    padding: 8px 12px; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.03);
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span style="font-size: 0.78rem; font-weight: 700; color: #f1f5f9;">${algo.name}</span>
                            <span style="
                                background: ${algo.badgeBg}; 
                                border: 1px solid ${algo.badgeBorder}; 
                                color: ${algo.badgeText}; 
                                font-size: 0.58rem; 
                                font-weight: 700; 
                                padding: 1px 5px; 
                                border-radius: 4px;
                                font-family: monospace;
                            ">${algo.complexity}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.68rem; color: #94a3b8;">
                            <span style="display: flex; align-items: center; color: ${statusColor}; font-weight: 700; background: rgba(255,255,255,0.03); padding: 1px 6px; border-radius: 10px;">
                                ${statusIcon}${statusText}
                            </span>
                            <span style="display: flex; align-items: center; gap: 3px;">
                                <i class="fa-solid fa-code-compare" style="color: #60a5fa; font-size: 0.6rem;"></i> So sánh: 
                                <strong style="color: #f1f5f9; font-family: monospace; font-size: 0.75rem;">${stats.comparisons}</strong>
                            </span>
                            <span style="display: flex; align-items: center; gap: 3px;">
                                <i class="fa-solid fa-arrows-rotate" style="color: #fb923c; font-size: 0.6rem;"></i> Ghi/Swap: 
                                <strong style="color: #f1f5f9; font-family: monospace; font-size: 0.75rem;">${stats.swaps}</strong>
                            </span>
                            <span style="display: flex; align-items: center; gap: 3px;">
                                <i class="fa-solid fa-clock" style="color: #34d399; font-size: 0.6rem;"></i> Thời gian: 
                                <strong style="
                                    color: ${stats.done ? '#10b981' : '#cbd5e1'}; 
                                    font-family: monospace; 
                                    font-size: 0.75rem;
                                    text-shadow: ${stats.done ? '0 0 6px rgba(16, 185, 129, 0.4)' : 'none'};
                                ">${stats.done ? stats.time + ' ms' : (stats.active ? 'Chạy...' : '--')}</strong>
                            </span>
                        </div>
                    </div>
                    <div class="compare-bars-wrapper" style="
                        display: flex; 
                        align-items: flex-end; 
                        gap: 2px; 
                        height: 30px; 
                        background: rgba(2, 6, 23, 0.5); 
                        border-radius: 6px; 
                        padding: 3px 5px; 
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
                    ">
            `;

            const maxVal = Math.max(...arr, 50);
            arr.forEach((val, idx) => {
                const barHeight = Math.max(3, Math.round((val / maxVal) * 24));
                let barGradient = "linear-gradient(180deg, #64748b 0%, #334155 100%)";
                let barBorder = "rgba(255, 255, 255, 0.02)";
                let barGlow = "none";
                
                if (stats.done) {
                    barGradient = "linear-gradient(180deg, #10b981 0%, #047857 100%)";
                    barBorder = "rgba(16, 185, 129, 0.3)";
                    barGlow = "0 0 4px rgba(16, 185, 129, 0.2)";
                } else if (stats.active) {
                    barGradient = "linear-gradient(180deg, #38bdf8 0%, #0369a1 100%)";
                    barBorder = "rgba(56, 189, 248, 0.3)";
                    barGlow = "0 0 4px rgba(56, 189, 248, 0.2)";
                }
                
                html += `
                    <div title="${algo.name}: arr[${idx}] = ${val}" style="
                        flex: 1; 
                        height: ${barHeight}px; 
                        background: ${barGradient}; 
                        border: 1px solid ${barBorder};
                        border-top-left-radius: 2px; 
                        border-top-right-radius: 2px;
                        box-shadow: ${barGlow};
                        transition: height 0.1s, background-color 0.1s;
                    "></div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        sandboxCanvas.innerHTML = html;
    }

    function generateRandomSortArray(size = 10) {
        sortArray = [];
        for (let i = 0; i < size; i++) {
            sortArray.push(Math.floor(Math.random() * 40 + 10));
        }
    }

    function highlightBars(indices, cssClass) {
        indices.forEach(idx => {
            const bar = document.getElementById(`sort-bar-${idx}`);
            if (bar) {
                bar.classList.remove("active", "highlight");
                if (cssClass) bar.classList.add(cssClass);
            }
        });
    }

    function renderSortingCanvas(activeRange = null) {
        const gapSize = sortArray.length > 50 ? 1 : 2;
        let html = `<div class="sort-container" style="display:flex; align-items:flex-end; justify-content:center; gap:${gapSize}px; height:180px; width:100%; padding:0 10px;">`;
        sortArray.forEach((val, idx) => {
            const barHeight = val * 3;
            // Only render the number text inside the bar if size <= 25 to avoid text overlap
            const showValue = sortArray.length <= 25 ? val : "";
            
            // Calculate opacity for divide and conquer visualization
            let opacity = 1.0;
            if (activeRange) {
                const [low, high] = activeRange;
                if (idx < low || idx > high) {
                    opacity = 0.25; // Dimmed out if outside active partition range
                }
            }
            html += `<div class="sort-bar" id="sort-bar-${idx}" title="arr[${idx}] = ${val}" style="height:${barHeight}px; flex:1; max-width:35px; cursor:pointer; font-size:0.65rem; display:flex; flex-direction:column; justify-content:flex-end; align-items:center; padding-bottom:4px; font-weight:700; opacity:${opacity}; transition: opacity 0.2s, height 0.2s;">${showValue}</div>`;
        });
        html += `</div>`;
        sandboxCanvas.innerHTML = html;

        // Bind Click Handlers
        sortArray.forEach((val, idx) => {
            const barEl = document.getElementById(`sort-bar-${idx}`);
            if (barEl) {
                barEl.addEventListener("click", () => {
                    document.querySelectorAll(".sort-bar").forEach(b => b.classList.remove("selected"));
                    barEl.classList.add("selected");
                    
                    const addr = "0x" + (0xD200 + idx * 4).toString(16).toUpperCase();
                    
                    const title = "Mảng số sắp xếp (Contiguous Array Cell)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Phần tử mảng: arr[${idx}] = ${val}</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ RAM</td><td>${addr}</td></tr>
                            <tr><td>Kiểu dữ liệu</td><td>int (Số nguyên)</td></tr>
                            <tr><td>Kích thước</td><td>sizeof(int) = 4 Bytes</td></tr>
                            <tr><td>Độ dời (Offset)</td><td>+${idx * 4} Bytes</td></tr>
                        </table>
                    `;
                    showTooltip(barEl, title, content);
                });
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2.12 CHAPTER 12: DYNAMIC PROGRAMMING SANDBOX
    // --------------------------------------------------------------------------

    function setupDPSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-code"></i> Trực quan hóa Quy hoạch động (Dynamic Programming)';
        
        sandboxControls.innerHTML = `
            <div class="control-group" style="display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:5px;">
                <div style="display:flex; align-items:center; gap:4px; background:#1e293b; padding:2px 8px; border-radius:6px; border:1px solid #334155;">
                    <span style="font-size:0.65rem; color:#94a3b8; font-weight:600;">Bài toán:</span>
                    <select id="dp-problem-select" style="background:transparent; border:none; color:var(--accent); font-size:0.75rem; font-weight:700; cursor:pointer;">
                        <option value="fib" style="background:#0f172a;">Dãy số Fibonacci</option>
                        <option value="knapsack" style="background:#0f172a;">Bài toán Cái túi (0/1 Knapsack)</option>
                    </select>
                </div>
            </div>
            
            <!-- Fibonacci Sub-Controls -->
            <div id="dp-fib-controls" class="control-group" style="display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:5px;">
                <div style="display:flex; align-items:center; gap:4px; background:#1e293b; padding:2px 8px; border-radius:6px; border:1px solid #334155;">
                    <span style="font-size:0.65rem; color:#94a3b8; font-weight:600;">N =</span>
                    <input type="number" id="dp-fib-n" min="3" max="7" value="5" style="width:30px; background:transparent; border:none; color:white; font-size:0.75rem; font-weight:700; text-align:center;">
                </div>
                <button id="btn-dp-fib-naive" class="btn-ctrl" style="background:#ef4444; color:white; padding: 4px 8px;"><i class="fa-solid fa-tree"></i> Đệ quy lặp (Wasteful)</button>
                <button id="btn-dp-fib-tab" class="btn-ctrl" style="background:#10b981; color:white; padding: 4px 8px;"><i class="fa-solid fa-table"></i> DP Lập bảng (Tabulation)</button>
            </div>
            
            <!-- Knapsack Sub-Controls -->
            <div id="dp-knapsack-controls" class="control-group" style="display:none; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:5px;">
                <div style="display:flex; align-items:center; gap:4px; background:#1e293b; padding:2px 8px; border-radius:6px; border:1px solid #334155;">
                    <span style="font-size:0.65rem; color:#94a3b8; font-weight:600;">Sức chứa W =</span>
                    <input type="number" id="dp-knapsack-w" min="4" max="7" value="6" style="width:30px; background:transparent; border:none; color:white; font-size:0.75rem; font-weight:700; text-align:center;">
                </div>
                <button id="btn-dp-knapsack-run" class="btn-ctrl" style="background:#a855f7; color:white; padding: 4px 15px;"><i class="fa-solid fa-play"></i> Quy hoạch Knapsack</button>
            </div>
            
            <div class="speed-slider-container" style="margin-top:5px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-dp" min="100" max="1500" value="500">
            </div>
        `;

        const problemSelect = document.getElementById("dp-problem-select");
        const fibControls = document.getElementById("dp-fib-controls");
        const knapsackControls = document.getElementById("dp-knapsack-controls");
        const sizeInput = document.getElementById("dp-fib-n");
        const knapsackWInput = document.getElementById("dp-knapsack-w");

        document.getElementById("speed-dp").addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        // Set initial view
        renderFibonacciCanvas(5);
        log("Học thuyết Quy hoạch động: Chọn bài toán Fibonacci hoặc Cái túi Knapsack để học đệ quy trùng lặp và lập bảng tối ưu!", "success");

        problemSelect.addEventListener("change", (e) => {
            currentTask = null;
            if (e.target.value === "fib") {
                fibControls.style.display = "flex";
                knapsackControls.style.display = "none";
                const n = parseInt(sizeInput.value) || 5;
                renderFibonacciCanvas(n);
                log("Đã chuyển sang mô phỏng Dãy số Fibonacci.", "info");
            } else {
                fibControls.style.display = "none";
                knapsackControls.style.display = "flex";
                const w = parseInt(knapsackWInput.value) || 6;
                renderKnapsackCanvas(w);
                log("Đã chuyển sang mô phỏng Cái túi 0/1 Knapsack.", "info");
            }
        });

        // 1. Fibonacci Handlers
        sizeInput.addEventListener("change", (e) => {
            currentTask = null;
            let n = parseInt(e.target.value);
            if (isNaN(n) || n < 3) n = 3;
            if (n > 7) n = 7;
            e.target.value = n;
            renderFibonacciCanvas(n);
        });

        document.getElementById("btn-dp-fib-naive").addEventListener("click", async () => {
            const n = parseInt(sizeInput.value);
            log(`[Đệ quy thuần túy] Bắt đầu dựng cây đệ quy Fibonacci F(${n}) độ phức tạp O(2^N)...`, "step");
            
            const taskId = Math.random();
            currentTask = taskId;
            
            let nodesList = [];
            let uniqueCallIds = 0;

            function buildTree(val, depth, x, width, parentId = null) {
                const id = uniqueCallIds++;
                const node = { id, val, depth, x, y: 30 + depth * 32, parentId, status: "idle" };
                nodesList.push(node);
                
                if (val > 1) {
                    const nextWidth = width / 2;
                    buildTree(val - 1, depth + 1, x - nextWidth, nextWidth, id);
                    buildTree(val - 2, depth + 1, x + nextWidth, nextWidth, id);
                }
                return id;
            }

            buildTree(n, 0, 220, 100);

            let visitedCount = {};
            let stepOrder = [];
            
            function recurseStep(nodeId) {
                const node = nodesList.find(nd => nd.id === nodeId);
                if (!node) return;
                
                stepOrder.push({ type: "enter", node });
                
                if (!visitedCount[node.val]) {
                    visitedCount[node.val] = 1;
                } else {
                    visitedCount[node.val]++;
                }
                
                const isRedundant = visitedCount[node.val] > 1 && node.val >= 2;

                const children = nodesList.filter(nd => nd.parentId === nodeId);
                if (children.length > 0) {
                    recurseStep(children[0].id);
                    recurseStep(children[1].id);
                }
                
                stepOrder.push({ type: "exit", node, isRedundant });
            }

            recurseStep(0);
            renderFibonacciTreeSVG(nodesList);

            for (let step of stepOrder) {
                if (currentTask !== taskId) return;
                
                const nodeCircle = document.getElementById(`fib-node-circle-${step.node.id}`);
                if (!nodeCircle) continue;

                if (step.type === "enter") {
                    nodeCircle.style.fill = "#38bdf8"; 
                    nodeCircle.style.stroke = "#0284c7";
                    log(`Gọi đệ quy: <b>F(${step.node.val})</b>`, "info");
                    await sleep(animationSpeed);
                } else {
                    if (step.isRedundant) {
                        nodeCircle.style.fill = "#ef4444"; 
                        nodeCircle.style.stroke = "#b91c1c";
                        log(`LẶP LẠI! <b>F(${step.node.val})</b> đã được tính trước đó ở nhánh khác! Bị tính trùng lặp lãng phí CPU.`, "warning");
                        await sleep(animationSpeed * 1.5);
                    } else {
                        nodeCircle.style.fill = "#10b981"; 
                        nodeCircle.style.stroke = "#047857";
                        log(`Hoàn thành nhánh F(${step.node.val})`, "success");
                        await sleep(animationSpeed * 0.8);
                    }
                }
            }

            log("Hoàn thành mô phỏng cây đệ quy. Hãy quan sát số lượng nút ĐỎ lãng phí bộ nhớ Stack!", "success");
        });

        document.getElementById("btn-dp-fib-tab").addEventListener("click", async () => {
            const n = parseInt(sizeInput.value);
            log(`[DP Tabulation] Bắt đầu lập bảng quy hoạch động F(${n}) từ dưới lên độ phức tạp O(N)...`, "step");
            
            const taskId = Math.random();
            currentTask = taskId;
            
            let dp = Array(n + 1).fill(0);
            renderFibonacciGrid(n, dp);
            await sleep(animationSpeed);

            if (currentTask !== taskId) return;
            dp[0] = 0;
            updateFibGridCell(0, 0, "success");
            log("Điền bài toán cơ sở thứ nhất: dp[0] = 0", "info");
            await sleep(animationSpeed * 1.5);

            if (currentTask !== taskId) return;
            dp[1] = 1;
            updateFibGridCell(1, 1, "success");
            log("Điền bài toán cơ sở thứ hai: dp[1] = 1", "info");
            await sleep(animationSpeed * 1.5);

            for (let i = 2; i <= n; i++) {
                if (currentTask !== taskId) return;
                
                updateFibGridCell(i - 1, dp[i - 1], "active");
                updateFibGridCell(i - 2, dp[i - 2], "active");
                log(`Tính F(${i}) = F(${i-1}) + F(${i-2}) = ${dp[i-1]} + ${dp[i-2]}`, "info");
                await sleep(animationSpeed * 1.5);
                
                dp[i] = dp[i - 1] + dp[i - 2];
                
                updateFibGridCell(i - 1, dp[i - 1], "success");
                updateFibGridCell(i - 2, dp[i - 2], "success");
                updateFibGridCell(i, dp[i], "success");
                log(`Đã ghi nhận: F(${i}) = <b>${dp[i]}</b> vào bảng lưu trữ dp[${i}].`, "success");
                await sleep(animationSpeed * 1.2);
            }
            
            log(`Quy hoạch động hoàn tất! F(${n}) = <b>${dp[n]}</b> chạy cực nhanh không tính trùng lặp bất kỳ phép nào!`, "success");
        });

        // 2. Knapsack Handlers
        knapsackWInput.addEventListener("change", (e) => {
            currentTask = null;
            let w = parseInt(e.target.value);
            if (isNaN(w) || w < 4) w = 4;
            if (w > 7) w = 7;
            e.target.value = w;
            renderKnapsackCanvas(w);
        });

        document.getElementById("btn-dp-knapsack-run").addEventListener("click", async () => {
            const W = parseInt(knapsackWInput.value);
            const taskId = Math.random();
            currentTask = taskId;
            
            log(`[0/1 Knapsack] Bắt đầu dựng bảng quy hoạch động 2D sức chứa W = ${W}...`, "step");
            
            const items = [
                { name: "Đồ vật A", wt: 2, val: 3 },
                { name: "Đồ vật B", wt: 3, val: 4 },
                { name: "Đồ vật C", wt: 4, val: 5 }
            ];

            let n = items.length;
            let dp = Array(n + 1).fill(0).map(() => Array(W + 1).fill(0));
            
            renderKnapsackGrid(items, W, dp);
            await sleep(animationSpeed);

            for (let i = 1; i <= n; i++) {
                const item = items[i - 1];
                log(`Bắt đầu xét vật phẩm: <b>${item.name}</b> (Trọng lượng: ${item.wt}, Giá trị: ${item.val})`, "warning");
                await sleep(animationSpeed);

                for (let w = 1; w <= W; w++) {
                    if (currentTask !== taskId) return;
                    
                    const cellEl = document.getElementById(`ks-cell-${i}-${w}`);
                    if (cellEl) {
                        cellEl.style.background = "rgba(56, 189, 248, 0.25)"; 
                        cellEl.style.borderColor = "#38bdf8";
                    }
                    
                    let prevVal = dp[i - 1][w];
                    const aboveCell = document.getElementById(`ks-cell-${i - 1}-${w}`);
                    if (aboveCell) aboveCell.style.background = "rgba(245, 158, 11, 0.2)"; 

                    if (item.wt <= w) {
                        let includeVal = item.val + dp[i - 1][w - item.wt];
                        const pickCell = document.getElementById(`ks-cell-${i - 1}-${w - item.wt}`);
                        if (pickCell) pickCell.style.background = "rgba(168, 85, 247, 0.2)"; 

                        log(`Xét dp[${i}][${w}]: Sức chứa ${w} đủ chứa ${item.name} (${item.wt}). Công thức lựa chọn:`, "info");
                        log(`- Không lấy: dp[${i-1}][${w}] = ${prevVal}`, "info");
                        log(`- Có lấy: val + dp[${i-1}][${w-item.wt}] = ${item.val} + ${dp[i-1][w-item.wt]} = ${includeVal}`, "info");
                        await sleep(animationSpeed * 1.5);

                        dp[i][w] = Math.max(prevVal, includeVal);

                        if (cellEl) {
                            cellEl.innerHTML = dp[i][w];
                            cellEl.style.background = "rgba(16, 185, 129, 0.2)"; 
                            cellEl.style.borderColor = "#10b981";
                        }
                        log(`Chọn giá trị lớn nhất: dp[${i}][${w}] = <b>${dp[i][w]}</b>`, "success");
                        await sleep(animationSpeed);

                        if (pickCell) pickCell.style.background = "transparent";
                    } else {
                        log(`Xét dp[${i}][${w}]: Sức chứa ${w} nhỏ hơn trọng lượng ${item.name} (${item.wt}). Không thể chọn lấy!`, "info");
                        log(`- Mượn giá trị hàng trên: dp[${i}][${w}] = dp[${i-1}][${w}] = ${prevVal}`, "info");
                        await sleep(animationSpeed * 1.2);

                        dp[i][w] = prevVal;

                        if (cellEl) {
                            cellEl.innerHTML = dp[i][w];
                            cellEl.style.background = "rgba(16, 185, 129, 0.2)";
                            cellEl.style.borderColor = "#10b981";
                        }
                        log(`Cập nhật: dp[${i}][${w}] = <b>${dp[i][w]}</b>`, "success");
                        await sleep(animationSpeed);
                    }

                    if (aboveCell) aboveCell.style.background = "transparent";
                    if (cellEl) {
                        cellEl.style.background = "transparent";
                        cellEl.style.borderColor = "#334155";
                    }
                }
            }

            log(`Lập bảng Quy hoạch hoàn thành! Giá trị tối đa thu được trong túi là: <b>${dp[n][W]}</b>`, "success");
        });
    }

    function renderFibonacciCanvas(n) {
        let html = `
            <div style="display:flex; flex-direction:column; align-items:center; width:100%; height:100%; justify-content:center;">
                <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:10px;"><i class="fa-solid fa-circle-info"></i> Bấm "Đệ quy" để vẽ cây, "DP Lập bảng" để xem mảng tuyến tính</div>
                <div id="fib-arena" style="width:100%; min-height:180px; display:flex; justify-content:center; align-items:center;">
                </div>
            </div>
        `;
        sandboxCanvas.innerHTML = html;
    }

    function renderFibonacciTreeSVG(nodesList) {
        const width = 440;
        const height = 180;
        let html = `<svg class="tree-svg" viewBox="0 0 ${width} ${height}">`;
        
        nodesList.forEach(nd => {
            if (nd.parentId !== null) {
                const parent = nodesList.find(p => p.id === nd.parentId);
                if (parent) {
                    html += `<line x1="${parent.x}" y1="${parent.y}" x2="${nd.x}" y2="${nd.y}" style="stroke:#475569; stroke-width:2px;" />`;
                }
            }
        });

        nodesList.forEach(nd => {
            html += `
                <g>
                    <circle cx="${nd.x}" cy="${nd.y}" r="11" id="fib-node-circle-${nd.id}" style="fill:#1e293b; stroke:#334155; stroke-width:2px; transition: all 0.3s; cursor:pointer;" />
                    <text x="${nd.x}" y="${nd.y}" dy="3" style="fill:white; font-size:8px; font-weight:700; text-anchor:middle; cursor:pointer;">F${nd.val}</text>
                </g>
            `;
        });

        html += `</svg>`;
        document.getElementById("fib-arena").innerHTML = html;
        
        nodesList.forEach(nd => {
            const circleEl = document.getElementById(`fib-node-circle-${nd.id}`);
            if (circleEl) {
                circleEl.addEventListener("click", (e) => {
                    e.stopPropagation();
                    document.querySelectorAll("circle").forEach(el => el.classList.remove("selected"));
                    circleEl.classList.add("selected");
                    
                    const baseAddr = 0xD280 + nd.id * 8;
                    const hexAddr = "0x" + baseAddr.toString(16).toUpperCase();
                    
                    const title = "Bài toán con Đệ quy (Stack Frame)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Lời gọi đệ quy: F(${nd.val})</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ Khung Stack</td><td>${hexAddr}</td></tr>
                            <tr><td>Tham số truyền vào</td><td>n = ${nd.val}</td></tr>
                            <tr><td>Độ sâu cuộc gọi</td><td>Depth = ${nd.depth}</td></tr>
                            <tr><td>Kích thước khung</td><td>sizeof(StackFrame) = 32 Bytes</td></tr>
                        </table>
                    `;
                    showTooltip(circleEl, title, content);
                });
            }
        });
    }

    function renderFibonacciGrid(n, dp) {
        let html = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
                <div style="font-weight:700; font-size:0.8rem; color:#38bdf8;">Mảng bộ nhớ Quy hoạch động: dp[0...${n}]</div>
                <div style="display:flex; gap:4px;">
        `;
        
        for (let i = 0; i <= n; i++) {
            html += `
                <div style="display:flex; flex-direction:column; align-items:center;">
                    <span style="font-size:0.6rem; color:#64748b; margin-bottom:2px;">dp[${i}]</span>
                    <div id="fib-grid-cell-${i}" style="width:40px; height:40px; border:2px solid #334155; border-radius:6px; display:flex; justify-content:center; align-items:center; font-weight:700; font-size:0.85rem; color:#94a3b8; transition:all 0.3s; cursor:pointer;">
                        ${dp[i]}
                    </div>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
        document.getElementById("fib-arena").innerHTML = html;

        for (let i = 0; i <= n; i++) {
            const cellEl = document.getElementById(`fib-grid-cell-${i}`);
            if (cellEl) {
                cellEl.addEventListener("click", () => {
                    document.querySelectorAll('[id^="fib-grid-cell-"]').forEach(el => el.classList.remove("selected"));
                    cellEl.classList.add("selected");
                    
                    const baseAddr = 0xE100 + i * 4;
                    const hexAddr = "0x" + baseAddr.toString(16).toUpperCase();
                    
                    const title = "Ô nhớ mảng Lập bảng (Tabulation Array Cell)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Phần tử mảng: dp[${i}] = ${dp[i]}</div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ bộ nhớ RAM</td><td>${hexAddr}</td></tr>
                            <tr><td>Kiểu dữ liệu</td><td>int (Số nguyên)</td></tr>
                            <tr><td>Kích thước</td><td>4 Bytes</td></tr>
                            <tr><td>Độ dời (Offset)</td><td>+${i * 4} Bytes</td></tr>
                        </table>
                    `;
                    showTooltip(cellEl, title, content);
                });
            }
        }
    }

    function updateFibGridCell(i, val, status) {
        const cell = document.getElementById(`fib-grid-cell-${i}`);
        if (cell) {
            cell.innerHTML = val;
            cell.style.borderColor = "#334155";
            cell.style.background = "transparent";
            cell.style.color = "#94a3b8";
            
            if (status === "active") {
                cell.style.borderColor = "#fb923c"; 
                cell.style.background = "rgba(251, 146, 60, 0.15)";
                cell.style.color = "white";
            } else if (status === "success") {
                cell.style.borderColor = "var(--accent)"; 
                cell.style.background = "rgba(16, 185, 129, 0.15)";
                cell.style.color = "white";
            }
        }
    }

    function renderKnapsackCanvas(w) {
        let html = `
            <div style="display:flex; flex-direction:column; align-items:center; width:100%; height:100%; justify-content:center; padding:5px;">
                <div style="font-size:0.65rem; color:#94a3b8; margin-bottom:5px;"><i class="fa-solid fa-circle-info"></i> Bấm "Quy hoạch Knapsack" để lập bảng lặp, click ô để xem công thức</div>
                <div id="knapsack-arena" style="width:100%; display:flex; justify-content:center; align-items:center;">
                </div>
            </div>
        `;
        sandboxCanvas.innerHTML = html;
        renderKnapsackGrid([
            { name: "Đồ vật A", wt: 2, val: 3 },
            { name: "Đồ vật B", wt: 3, val: 4 },
            { name: "Đồ vật C", wt: 4, val: 5 }
        ], w, Array(4).fill(0).map(() => Array(w + 1).fill(0)));
    }

    function renderKnapsackGrid(items, W, dp) {
        let html = `
            <div style="display:flex; flex-direction:column; align-items:center;">
                <div style="font-weight:700; font-size:0.75rem; color:#38bdf8; margin-bottom:5px;">Bảng trạng thái Quy hoạch động 2D: dp[i][w]</div>
                <table style="border-collapse:collapse; font-size:0.65rem; text-align:center;">
                    <thead>
                        <tr style="background:#1e293b; color:#94a3b8;">
                            <th style="border:1px solid #334155; padding:4px 6px;">Vật phẩm (i)</th>
                            <th style="border:1px solid #334155; padding:4px 6px;">(wt, val)</th>
        `;
        
        for (let w = 0; w <= W; w++) {
            html += `<th style="border:1px solid #334155; padding:4px 6px; width:32px;">w=${w}</th>`;
        }

        html += `
                        </tr>
                    </thead>
                    <tbody>
        `;

        for (let i = 0; i <= items.length; i++) {
            const item = i > 0 ? items[i - 1] : { name: "Nền cơ sở", wt: 0, val: 0 };
            const isBase = i === 0;

            html += `
                <tr style="background:${isBase ? 'rgba(255,255,255,0.02)' : 'transparent'};">
                    <td style="border:1px solid #334155; padding:4px 6px; text-align:left; font-weight:700; color:#e2e8f0;">i=${i} (${i > 0 ? item.name[7] : 'Nền'})</td>
                    <td style="border:1px solid #334155; padding:4px 6px; color:#64748b;">${i > 0 ? '(' + item.wt + ', ' + item.val + ')' : '--'}</td>
            `;

            for (let w = 0; w <= W; w++) {
                const val = dp[i] && dp[i][w] !== undefined ? dp[i][w] : 0;
                html += `
                    <td id="ks-cell-${i}-${w}" style="border:1px solid #334155; width:32px; height:24px; color:#cbd5e1; font-weight:700; transition:all 0.2s; cursor:pointer;">
                        ${val}
                    </td>
                `;
            }
            html += `</tr>`;
        }

        html += `
                    </tbody>
                </table>
            </div>
        `;
        document.getElementById("knapsack-arena").innerHTML = html;

        for (let i = 0; i <= items.length; i++) {
            const item = i > 0 ? items[i - 1] : { name: "Nền", wt: 0, val: 0 };
            for (let w = 0; w <= W; w++) {
                const cellEl = document.getElementById(`ks-cell-${i}-${w}`);
                if (cellEl) {
                    cellEl.addEventListener("click", () => {
                        document.querySelectorAll('[id^="ks-cell-"]').forEach(el => {
                            el.style.boxShadow = "none";
                            el.classList.remove("selected");
                        });
                        cellEl.classList.add("selected");
                        
                        const baseAddr = 0xF200 + (i * (W + 1) + w) * 4;
                        const hexAddr = "0x" + baseAddr.toString(16).toUpperCase();
                        
                        let formula = `dp[${i}][${w}] = 0 (Base Case)`;
                        if (i > 0 && w > 0) {
                            if (item.wt <= w) {
                                formula = `dp[${i}][${w}] = max(dp[${i-1}][${w}], ${item.val} + dp[${i-1}][${w - item.wt}])`;
                            } else {
                                formula = `dp[${i}][${w}] = dp[${i-1}][${w}]`;
                            }
                        }

                        const title = "Ô nhớ Bảng Quy hoạch 2D (2D Table Cell)";
                        const content = `
                            <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">Giá trị dp[${i}][${w}] = ${cellEl.innerHTML.trim()}</div>
                            <table class="tooltip-meta-table">
                                <tr><td>Địa chỉ bộ nhớ RAM</td><td>${hexAddr}</td></tr>
                                <tr><td>Xét vật phẩm</td><td>${i > 0 ? item.name + ' (wt=' + item.wt + ')' : 'Nền cơ sở (dp[0])'}</td></tr>
                                <tr><td>Sức chứa túi hiện tại</td><td>w = ${w} kg</td></tr>
                                <tr><td>Công thức trạng thái</td><td style="color:#fb923c; font-size:0.65rem;"><code>${formula}</code></td></tr>
                                <tr><td>Kích thước phần tử</td><td>4 Bytes (sizeof(int))</td></tr>
                            </table>
                        `;
                        showTooltip(cellEl, title, content);
                    });
                }
            }
        }
    }

    // --------------------------------------------------------------------------
    // 2.13 CHAPTER 13: TRIE (PREFIX TREE) & AUTOCOMPLETE SANDBOX (NEW!)
    // --------------------------------------------------------------------------
    let trieUniqueId = 0;
    let trieRoot = null;

    class TrieNode {
        constructor(char = '') {
            this.id = ++trieUniqueId;
            this.char = char;
            this.children = {}; // key is char ('a'-'z'), value is TrieNode
            this.isEndOfWord = false;
            this.address = 0xA200 + this.id * 224; // Simulated Heap RAM address
            this.status = "idle"; // "idle", "active", "created", "success", "fail"
            this.x = 0;
            this.y = 0;
        }
    }

    function insertWordSilent(root, word) {
        let curr = root;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i].toLowerCase();
            if (!curr.children[ch]) {
                curr.children[ch] = new TrieNode(ch);
            }
            curr = curr.children[ch];
        }
        curr.isEndOfWord = true;
    }

    function findWordsWithPrefix(root, prefix) {
        let curr = root;
        for (let i = 0; i < prefix.length; i++) {
            const ch = prefix[i];
            if (!curr.children[ch]) return [];
            curr = curr.children[ch];
        }
        
        let results = [];
        function collect(node, currentWord) {
            if (node.isEndOfWord) {
                results.push(currentWord);
            }
            for (let ch in node.children) {
                collect(node.children[ch], currentWord + ch);
            }
        }
        collect(curr, prefix);
        return results;
    }

    function calculateTrieCoords(root, width = 440) {
        function assign(node, x, y, span) {
            node.x = x;
            node.y = y;
            const keys = Object.keys(node.children).sort();
            if (keys.length === 0) return;
            
            const segment = span / keys.length;
            const startX = x - span / 2 + segment / 2;
            keys.forEach((k, idx) => {
                const childX = startX + idx * segment;
                const childY = y + 42;
                assign(node.children[k], childX, childY, segment * 0.85);
            });
        }
        assign(root, 220, 22, width * 0.85);
    }

    function collectTrieNodesAndLinks(root) {
        let nodes = [];
        let links = [];
        function traverse(node) {
            nodes.push(node);
            for (let k in node.children) {
                const child = node.children[k];
                links.push({
                    x1: node.x,
                    y1: node.y,
                    x2: child.x,
                    y2: child.y,
                    parent: node,
                    child: child
                });
                traverse(child);
            }
        }
        traverse(root);
        return { nodes, links };
    }

    function setupTrieSandbox() {
        sandboxTitle.innerHTML = '<i class="fa-solid fa-folder-tree"></i> Cây tiền tố Trie &amp; Autocomplete';
        
        if (!trieRoot) {
            trieUniqueId = 0;
            trieRoot = new TrieNode('');
            const defaults = ["cat", "car", "cart", "dog", "do"];
            defaults.forEach(w => insertWordSilent(trieRoot, w));
        }
        
        sandboxControls.innerHTML = `
            <div class="control-group" style="display:flex; flex-direction:column; gap:4px; align-items:center; width:100%;">
                <div style="display:flex; gap:4px; width:100%; justify-content:center;">
                    <div style="position:relative; display:flex; flex-direction:column; width:120px;">
                        <input type="text" id="trie-input-word" placeholder="Nhập từ..." maxlength="8" style="background:#1e293b; border:1px solid #334155; color:white; font-size:0.75rem; font-weight:700; padding:4px 8px; border-radius:6px; outline:none; text-align:center;">
                    </div>
                    <button id="btn-trie-insert" class="btn-ctrl" style="background:var(--accent); color:white; padding:4px 8px; font-size:0.75rem;"><i class="fa-solid fa-plus"></i> Thêm</button>
                    <button id="btn-trie-search" class="btn-ctrl" style="background:#38bdf8; color:white; padding:4px 8px; font-size:0.75rem;"><i class="fa-solid fa-magnifying-glass"></i> Tìm</button>
                </div>
                
                <div id="trie-suggestions-container" style="display:flex; gap:4px; flex-wrap:wrap; justify-content:center; width:100%; min-height:18px; margin-top:2px;">
                    <!-- Autocomplete suggestion tags go here -->
                </div>
            </div>
            
            <div class="speed-slider-container" style="margin-top:2px;">
                <span>Tốc độ:</span>
                <input type="range" class="speed-slider" id="speed-trie" min="100" max="1500" value="500">
            </div>
        `;

        const trieInput = document.getElementById("trie-input-word");
        const btnInsert = document.getElementById("btn-trie-insert");
        const btnSearch = document.getElementById("btn-trie-search");
        const suggestionsContainer = document.getElementById("trie-suggestions-container");
        const speedSlider = document.getElementById("speed-trie");
        
        speedSlider.addEventListener("input", (e) => {
            animationSpeed = parseInt(e.target.value);
        });

        trieInput.addEventListener("input", () => {
            updateSuggestions();
        });

        function updateSuggestions() {
            const val = trieInput.value.toLowerCase().trim();
            suggestionsContainer.innerHTML = "";
            if (val === "") return;
            
            const matches = findWordsWithPrefix(trieRoot, val);
            if (matches.length > 0) {
                matches.forEach(word => {
                    const tag = document.createElement("span");
                    tag.innerHTML = word;
                    tag.style.background = "#1e293b";
                    tag.style.border = "1px solid #334155";
                    tag.style.color = "var(--accent)";
                    tag.style.padding = "1px 6px";
                    tag.style.borderRadius = "4px";
                    tag.style.cursor = "pointer";
                    tag.style.fontSize = "0.6rem";
                    tag.style.fontWeight = "700";
                    tag.style.transition = "all 0.2s";
                    
                    tag.addEventListener("mouseover", () => {
                        tag.style.background = "var(--accent)";
                        tag.style.color = "white";
                    });
                    tag.addEventListener("mouseout", () => {
                        tag.style.background = "#1e293b";
                        tag.style.color = "var(--accent)";
                    });
                    tag.addEventListener("click", () => {
                        trieInput.value = word;
                        updateSuggestions();
                    });
                    suggestionsContainer.appendChild(tag);
                });
            }
        }

        renderTrie();
        log("Cây tiền tố Trie đã sẵn sàng. Hãy bấm nút 'Thêm' hoặc 'Tìm' để xem hoạt họa bộ nhớ RAM!", "success");

        btnInsert.addEventListener("click", async () => {
            let word = trieInput.value.toLowerCase().trim();
            if (word === "") {
                word = "caps";
                trieInput.value = word;
                log("Từ rỗng! Hệ thống tự động điền từ mẫu: <b>caps</b>", "warning");
            }
            
            if (!/^[a-z]+$/.test(word)) {
                log("Lỗi: Từ nhập vào chỉ được phép chứa các ký tự chữ cái viết liền không dấu (a-z)!", "error");
                return;
            }

            const taskId = Math.random();
            currentTask = taskId;
            
            log(`[Insert] Bắt đầu thêm từ "${word}" vào cây Trie...`, "step");
            
            let curr = trieRoot;
            resetTrieNodeStatuses(trieRoot);
            renderTrie();
            await sleep(animationSpeed);

            for (let i = 0; i < word.length; i++) {
                if (currentTask !== taskId) return;
                const ch = word[i];
                
                curr.status = "active";
                renderTrie();
                await sleep(animationSpeed * 0.8);
                
                if (!curr.children[ch]) {
                    if (currentTask !== taskId) return;
                    log(`Ký tự '${ch}' chưa tồn tại dưới nút này. Thực hiện <b>malloc(sizeof(TrieNode))</b> cấp phát ô nhớ mới!`, "info");
                    
                    const newNode = new TrieNode(ch);
                    newNode.status = "created";
                    curr.children[ch] = newNode;
                    
                    renderTrie();
                    await sleep(animationSpeed * 1.2);
                    newNode.status = "active";
                } else {
                    log(`Ký tự '${ch}' đã tồn tại ở địa chỉ ${"0x" + curr.children[ch].address.toString(16).toUpperCase()}. **Chia sẻ tiền tố** để tối ưu RAM!`, "success");
                    curr.children[ch].status = "active";
                }
                
                curr = curr.children[ch];
            }
            
            if (currentTask !== taskId) return;
            curr.isEndOfWord = true;
            curr.status = "success";
            renderTrie();
            log(`Thêm từ "${word}" thành công! Cờ <b>isEndOfWord</b> được bật lên TRUE (xanh lá).`, "success");
            
            trieInput.value = "";
            suggestionsContainer.innerHTML = "";
        });

        btnSearch.addEventListener("click", async () => {
            let word = trieInput.value.toLowerCase().trim();
            if (word === "") {
                word = "car";
                trieInput.value = word;
                log("Từ rỗng! Hệ thống tự động tìm kiếm từ mẫu: <b>car</b>", "warning");
            }
            
            if (!/^[a-z]+$/.test(word)) {
                log("Lỗi: Từ tìm kiếm chỉ được phép chứa các ký tự chữ cái viết liền không dấu (a-z)!", "error");
                return;
            }

            const taskId = Math.random();
            currentTask = taskId;
            
            log(`[Search] Bắt đầu tìm kiếm từ "${word}" trên cây Trie...`, "step");
            
            let curr = trieRoot;
            resetTrieNodeStatuses(trieRoot);
            renderTrie();
            await sleep(animationSpeed);

            let success = true;
            for (let i = 0; i < word.length; i++) {
                if (currentTask !== taskId) return;
                const ch = word[i];
                
                curr.status = "active";
                renderTrie();
                await sleep(animationSpeed * 0.8);
                
                if (!curr.children[ch]) {
                    success = false;
                    log(`Mất dấu tại ký tự '${ch}'! Không có con trỏ nào trỏ tới nút này. Kết luận: Từ không tồn tại!`, "warning");
                    curr.status = "fail";
                    renderTrie();
                    break;
                } else {
                    log(`Khớp ký tự '${ch}' -> Di chuyển xuống nút con ở địa chỉ ${"0x" + curr.children[ch].address.toString(16).toUpperCase()}.`, "info");
                    curr.children[ch].status = "active";
                    curr = curr.children[ch];
                }
            }
            
            if (currentTask !== taskId) return;
            if (success) {
                if (curr.isEndOfWord) {
                    curr.status = "success";
                    renderTrie();
                    log(`Tìm thấy từ "${word}"! Điểm dừng khớp với cờ isEndOfWord = TRUE.`, "success");
                } else {
                    curr.status = "fail";
                    renderTrie();
                    log(`Chuỗi "${word}" có khớp ký tự nhưng cờ isEndOfWord = FALSE (không phải là từ hoàn chỉnh). Tìm kiếm thất bại!`, "warning");
                }
            } else {
                log(`Không tìm thấy từ "${word}" trên cây Trie.`, "warning");
            }
        });
    }

    function resetTrieNodeStatuses(node) {
        if (!node) return;
        node.status = "idle";
        for (let k in node.children) {
            resetTrieNodeStatuses(node.children[k]);
        }
    }

    function renderTrie() {
        if (!trieRoot) return;
        
        calculateTrieCoords(trieRoot, 440);
        
        const { nodes, links } = collectTrieNodesAndLinks(trieRoot);
        
        const width = 440;
        const height = 240;
        
        let svgHtml = `<svg class="tree-svg" viewBox="0 0 ${width} ${height}">`;
        
        links.forEach(l => {
            let strokeColor = "#475569";
            let strokeWidth = "1.5px";
            if (l.child.status === "active" || l.child.status === "success") {
                strokeColor = "var(--accent)";
                strokeWidth = "2.5px";
            } else if (l.child.status === "created") {
                strokeColor = "#fb7185";
                strokeWidth = "2.5px";
            } else if (l.child.status === "fail") {
                strokeColor = "#ef4444";
                strokeWidth = "2.5px";
            }
            svgHtml += `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" style="stroke:${strokeColor}; stroke-width:${strokeWidth}; transition: all 0.3s;" />`;
        });
        
        nodes.forEach(nd => {
            let border = "#334155";
            let fill = "#1e293b";
            let strokeWidth = nd.isEndOfWord ? "3px" : "2px";
            
            if (nd.isEndOfWord) {
                border = "#10b981";
            }
            
            if (nd.status === "active") {
                border = "#fb923c";
                fill = "rgba(251, 146, 60, 0.2)";
            } else if (nd.status === "created") {
                border = "#fb7185";
                fill = "rgba(251, 113, 133, 0.25)";
            } else if (nd.status === "success") {
                border = "#10b981";
                fill = "rgba(16, 185, 129, 0.25)";
            } else if (nd.status === "fail") {
                border = "#ef4444";
                fill = "rgba(239, 68, 68, 0.25)";
            }
            
            svgHtml += `
                <g>
                    <circle cx="${nd.x}" cy="${nd.y}" r="11" id="trie-node-circle-${nd.id}" style="fill:${fill}; stroke:${border}; stroke-width:${strokeWidth}; cursor:pointer; transition: all 0.3s;" />
                    <text x="${nd.x}" y="${nd.y}" dy="3.5" style="fill:white; font-size:8px; font-weight:700; text-anchor:middle; cursor:pointer; user-select:none;">
                        ${nd.char === '' ? '★' : nd.char.toUpperCase()}
                    </text>
                </g>
            `;
        });
        
        svgHtml += `</svg>`;
        sandboxCanvas.innerHTML = svgHtml;
        
        nodes.forEach(nd => {
            const circleEl = document.getElementById(`trie-node-circle-${nd.id}`);
            if (circleEl) {
                circleEl.addEventListener("click", (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('[id^="trie-node-circle-"]').forEach(el => {
                        el.style.boxShadow = "none";
                        el.classList.remove("selected");
                    });
                    circleEl.classList.add("selected");
                    
                    const hexAddr = "0x" + nd.address.toString(16).toUpperCase();
                    
                    let activePtrsHtml = "";
                    let childrenKeys = Object.keys(nd.children).sort();
                    
                    if (childrenKeys.length > 0) {
                        childrenKeys.forEach(k => {
                            const childNode = nd.children[k];
                            const childHex = "0x" + childNode.address.toString(16).toUpperCase();
                            activePtrsHtml += `
                                <div style="display:flex; justify-content:space-between; width:100%; padding: 1px 0;">
                                    <span style="color:var(--accent);">children['${k}']</span>
                                    <span style="color:#e2e8f0;">-&gt; ${childHex}</span>
                                </div>
                            `;
                        });
                    } else {
                        activePtrsHtml = `<div style="color:#64748b; font-style:italic; font-size:0.6rem; text-align:center;">Tất cả 26 con trỏ con đều là NULL</div>`;
                    }
                    
                    const structCode = `struct TrieNode {
    struct TrieNode* children[26]; // Mảng 26 con trỏ (offset +0, size 208B)
    int isEndOfWord;             // Cờ kết thúc: ${nd.isEndOfWord ? 1 : 0} (offset +208, size 4B)
    char _pad[4];                // Căn lề bộ nhớ (offset +212, size 4B)
}; // sizeof(struct TrieNode) = 216 bytes`;

                    const title = "Cây tiền tố (TrieNode Struct)";
                    const content = `
                        <div style="font-weight:700; font-size:0.8rem; color:#38bdf8; margin-bottom:4px;">
                            ${nd.char === '' ? 'Nút gốc Root (★)' : 'Nút ký tự: \'' + nd.char + '\''}
                        </div>
                        <table class="tooltip-meta-table">
                            <tr><td>Địa chỉ vật lý Heap</td><td>${hexAddr}</td></tr>
                            <tr><td>Cờ kết thúc từ</td><td><code>isEndOfWord = ${nd.isEndOfWord ? '1 (TRUE)' : '0 (FALSE)'}</code></td></tr>
                            <tr><td>Mảng con trỏ</td><td>children[26] (208 Bytes)</td></tr>
                            <tr><td>Kích thước Node</td><td>216 Bytes (64-bit alignment)</td></tr>
                        </table>
                        <div style="margin-top:5px; border-top:1px solid #334155; padding-top:4px;">
                            <div style="font-weight:600; font-size:0.65rem; color:#f8fafc; margin-bottom:2px;">Con trỏ con đang hoạt động:</div>
                            <div style="max-height:60px; overflow-y:auto; background:#0f172a; padding:4px; border-radius:4px; border:1px solid #1e293b;">
                                ${activePtrsHtml}
                            </div>
                        </div>
                    `;
                    
                    showTooltip(circleEl, title, content, structCode);
                });
            }
        });
    }
}

// Safe bootstrap block to guarantee execution
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startApp);
} else {
    startApp();
}
