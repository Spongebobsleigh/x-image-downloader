window._xScroll?.stop?.();
window._xScroll = (() => {
  let timer = null;
  return {
    start(ms = 60000, stepMs = 600) {
      const end = Date.now() + ms;
      timer = setInterval(() => {
        window.scrollBy(0, Math.floor(window.innerHeight * 0.9));
        if (Date.now() > end) { clearInterval(timer); console.log('scroll finished'); }
      }, stepMs);
    },
    stop(){ if (timer) clearInterval(timer); console.log('scroll stopped'); }
  };
})();
