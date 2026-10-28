const { Pool } = require('pg');
let pool;
async function reply(req,res){
  const message = req.body?.message;
  if (typeof message !== 'string' || message.trim().length < 1 || message.length > 1200) return res.status(400).json({error:'Lời nhắn phải từ 1 đến 1200 ký tự.'});
  if (!process.env.DATABASE_URL) return res.status(503).json({error:'Chưa cấu hình DATABASE_URL để lưu phản hồi. Vui lòng thử lại sau.'});
  try {
    if (!pool) pool = new Pool({connectionString:process.env.DATABASE_URL, ssl:process.env.PGSSL === 'true' ? {rejectUnauthorized:false} : undefined});
    await pool.query('CREATE TABLE IF NOT EXISTS replies (id BIGSERIAL PRIMARY KEY, message TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
    await pool.query('INSERT INTO replies(message) VALUES($1)',[message.trim()]);
    res.status(201).json({ok:true});
  } catch(e){console.error('Database error:',e.message); res.status(503).json({error:'Chưa thể lưu lời nhắn. Vui lòng thử lại sau.'});}
}
module.exports={reply};
