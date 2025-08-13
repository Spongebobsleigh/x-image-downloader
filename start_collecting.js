// 既存の監視があれば止める
window._xMon?.stop?.();

(function(){
  const urls = new Set();

  const pickUrlFromImg = (img) => {
    const cands = [];
    if (img.src) cands.push(img.src);
    if (img.srcset) {
      img.srcset.split(',').forEach(s => {
        const u = s.trim().split(' ')[0];
        if (u) cands.push(u);
      });
    }
    for (const raw of cands) {
      if (!raw.includes('pbs.twimg.com/media/')) continue;
      try {
        const u = new URL(raw);
        u.searchParams.set('name', 'orig');   // 原寸に固定
        return u.toString();
      } catch(e){}
    }
    return null;
  };

  const addFromNode = (node) => {
    const imgs = node.tagName === 'IMG' ? [node] : node.querySelectorAll?.('img');
    if (!imgs) return;
    for (const img of imgs) {
      const u = pickUrlFromImg(img);
      if (u) urls.add(u);
    }
  };

  // 初期スキャン
  document.querySelectorAll('img').forEach(addFromNode);

  const observer = new MutationObserver(muts => {
    muts.forEach(m => m.addedNodes.forEach(addFromNode));
  });
  observer.observe(document.body, { subtree: true, childList: true });

  window._xMon = {
    get list(){ return [...urls]; },
    count(){ console.log('collected', urls.size); return urls.size; },
    stop(){ observer.disconnect(); console.log('observer stopped. total:', urls.size); }
  };
  console.log('collector started.');
})();
