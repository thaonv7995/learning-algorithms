(function () {
    const id = parseInt(new URLSearchParams(window.location.search).get('id'), 10);
    if (!id) {
        window.location.replace('../algorithms.html');
        return;
    }
    fetch('../data/catalog.json')
        .then(r => r.json())
        .then(data => {
            const p = (data.problems || []).find(x => x.id === id);
            if (!p) throw new Error('not found');
            const slug = p.slug || p.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
            window.location.replace(`${id}-${slug}.html`);
        })
        .catch(() => { window.location.replace('../algorithms.html'); });
})();
