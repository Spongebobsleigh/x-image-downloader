// YYYYMMDD_HHMMSS 
function getDateTimeString() {
  const d = new Date();
  const pad = n => n.toString().padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

async function downloadAll(urls, delayMs = 600) {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const blob = await res.blob();

      const id  = (url.match(/media\/([^.?]+)/)?.[1]) || `x_like_${i}`;
      const ext = (blob.type.split('/')[1] || (url.match(/format=([a-z0-9]+)/)?.[1]) || 'jpg');
      const dateStr = getDateTimeString(); 

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${dateStr}_${id}.${ext}`; 
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);

      console.log(`Downloaded (${i+1}/${urls.length}): ${a.download}`);
      await new Promise(r => setTimeout(r, delayMs));
    } catch (e) {
      console.warn('Failed:', url, e);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  console.log('Done.');
}
