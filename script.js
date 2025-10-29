/* General UI interactions + matrix background + small terminal typing */
document.addEventListener('DOMContentLoaded', ()=> {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Terminal flicker/demo
  const term = document.getElementById('terminal');
  const lines = [
    '// connecting to booking server...',
    '> auth: check',
    '> events: fetched (3 entries)',
    '> tip: press Book Now to reserve',
  ];
  let idx=0;
  setInterval(()=>{
    term.textContent = lines.slice(0, (idx%lines.length)+1).join('\n');
    idx++;
  }, 2000);
  

  // Matrix animation init
  initMatrix('matrix-canvas');
});

/* Booking submit handler: basic validation and fake submit */
function handleBookingSubmit(e){
  e.preventDefault();
  const msgEl = document.getElementById('formMsg');
  msgEl.textContent = 'Processing booking...';

  // Simple client-side validation (more in auth.js)
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const college = document.getElementById('college').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();

  if(!name || !email || !college || !whatsapp){
    msgEl.textContent = 'Please fill all fields.';
    return false;
  }

  // simulate network
  setTimeout(()=>{
    msgEl.textContent = '✅ Slot reserved! Confirmation sent to ' + email;
    document.getElementById('bookingForm').reset();
  }, 900);
  return false;
}

/* MATRIX BACKGROUND - simple small footprint */
function initMatrix(canvasId){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = innerWidth;
  let height = canvas.height = innerHeight;
  const cols = Math.floor(width / 16) + 1;
  const yPositions = Array(cols).fill(0);

  function resize(){
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;
  }
  addEventListener('resize', resize);

  function frame(){
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = 'rgba(0,255,138,0.9)';
    ctx.font = '13px Share Tech Mono, monospace';

    for(let i=0;i<yPositions.length;i++){
      const text = String.fromCharCode(33 + Math.random()*90);
      const x = i * 16;
      ctx.fillText(text, x, yPositions[i] * 16);
      if(yPositions[i]*16 > height && Math.random() > 0.975) yPositions[i]=0;
      yPositions[i]++;
    }
    requestAnimationFrame(frame);
  }
  frame();
}
