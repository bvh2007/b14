window.api={
 async content(){const r=await fetch('/api/message');if(!r.ok)throw Error('Không tải được nội dung');return r.json();},
 async reply(message){const r=await fetch('/api/replies',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message})});const d=await r.json();if(!r.ok)throw Error(d.error||'Gửi thất bại');return d;}
};
