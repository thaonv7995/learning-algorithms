(function () {
    const STORAGE_KEY = 'detail-pane-width';

    function initTabs() {
        const params = new URLSearchParams(window.location.search);
        const initialTab = params.get('tab');

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => activateTab(btn.dataset.tab));
        });

        if (initialTab && document.getElementById('panel-' + initialTab)) {
            activateTab(initialTab);
        }
    }

    function activateTab(tabId) {
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        document.querySelectorAll('.tab-panel').forEach(p => {
            p.classList.toggle('active', p.id === 'panel-' + tabId);
        });
    }

    function initCodeTabs() {
        const btnCopyCode = document.getElementById('btn-copy-code');
        const codeC = document.getElementById('code-block-c');
        const codePython = document.getElementById('code-block-python');
        const codeCpp = document.getElementById('code-block-cpp');
        const langLabel = document.getElementById('code-lang-label');
        const tabBtns = document.querySelectorAll('.code-tab-btn');
        if (!btnCopyCode || !codeC) return;

        let activeLang = 'c';
        const fileMeta = {
            c: { name: 'solution.c', type: 'C99' },
            python: { name: 'solution.py', type: 'Python 3' },
            cpp: { name: 'solution.cpp', type: 'C++17' }
        };

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeLang = btn.dataset.lang;
                codeC.style.display = activeLang === 'c' ? 'block' : 'none';
                codePython.style.display = activeLang === 'python' ? 'block' : 'none';
                codeCpp.style.display = activeLang === 'cpp' ? 'block' : 'none';
                const meta = fileMeta[activeLang];
                langLabel.innerHTML =
                    '<span class="fname">' + meta.name + '</span>' +
                    '<span class="ftype">' + meta.type + '</span>';
            });
        });

        btnCopyCode.addEventListener('click', () => {
            let el = codeC;
            if (activeLang === 'python') el = codePython;
            else if (activeLang === 'cpp') el = codeCpp;
            const div = document.createElement('div');
            div.innerHTML = el.innerHTML;
            navigator.clipboard.writeText(div.textContent || '').then(() => {
                const orig = btnCopyCode.innerHTML;
                btnCopyCode.innerHTML = '<i class="fa-solid fa-check"></i> Đã sao chép';
                btnCopyCode.style.color = '#34d399';
                setTimeout(() => {
                    btnCopyCode.innerHTML = orig;
                    btnCopyCode.style.color = '';
                }, 1800);
            });
        });
    }

    function initResize() {
        const divider = document.getElementById('resize-divider');
        const layout = document.querySelector('.layout');
        if (!divider || !layout || window.innerWidth <= 1024) return;

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            document.documentElement.style.setProperty('--info-pane-width', saved);
        }

        let dragging = false;

        divider.addEventListener('mousedown', e => {
            dragging = true;
            divider.classList.add('dragging');
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', e => {
            if (!dragging) return;
            const rect = layout.getBoundingClientRect();
            let pct = ((e.clientX - rect.left) / rect.width) * 100;
            pct = Math.min(Math.max(pct, 28), 62);
            const val = pct.toFixed(1) + '%';
            document.documentElement.style.setProperty('--info-pane-width', val);
        });

        document.addEventListener('mouseup', () => {
            if (!dragging) return;
            dragging = false;
            divider.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            const current = getComputedStyle(document.documentElement)
                .getPropertyValue('--info-pane-width').trim();
            localStorage.setItem(STORAGE_KEY, current);
        });
    }

    function initProblemNav() {
        const footer = document.querySelector('.problem-nav');
        if (!footer) return;

        const idMatch = document.querySelector('.lc-num')?.textContent?.match(/#(\d+)/);
        if (!idMatch) return;
        const currentId = parseInt(idMatch[1], 10);

        fetch('../data/catalog.json')
            .then(r => { if (!r.ok) throw new Error('catalog'); return r.json(); })
            .then(catalog => {
                const probs = catalog.problems || [];
                const idx = probs.findIndex(p => p.id === currentId);
                if (idx < 0) return;

                const prev = idx > 0 ? probs[idx - 1] : null;
                const next = idx < probs.length - 1 ? probs[idx + 1] : null;

                function navBtn(p, dir) {
                    if (!p) {
                        return '<span class="problem-nav-btn disabled' + (dir === 'next' ? ' next' : '') + '">' +
                            (dir === 'prev' ? '<i class="fa-solid fa-chevron-left"></i>' : '') +
                            '<span class="nav-label"><small>' + (dir === 'prev' ? 'Trước' : 'Sau') + '</small><strong>—</strong></span>' +
                            (dir === 'next' ? '<i class="fa-solid fa-chevron-right"></i>' : '') +
                            '</span>';
                    }
                    const href = p.id + '-' + p.slug + '.html';
                    const label = '#' + p.id + ' · ' + p.title;
                    if (dir === 'prev') {
                        return '<a href="' + href + '" class="problem-nav-btn"><i class="fa-solid fa-chevron-left"></i>' +
                            '<span class="nav-label"><small>Trước</small><strong>' + label + '</strong></span></a>';
                    }
                    return '<a href="' + href + '" class="problem-nav-btn next"><span class="nav-label"><small>Sau</small><strong>' +
                        label + '</strong></span><i class="fa-solid fa-chevron-right"></i></a>';
                }

                footer.innerHTML = navBtn(prev, 'prev') + navBtn(next, 'next');
            })
            .catch(() => { /* static HTML nav — cần local server hoặc regenerate */ });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initTabs();
        initCodeTabs();
        initResize();
        initProblemNav();
    });
})();
