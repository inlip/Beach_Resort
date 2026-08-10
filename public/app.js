const chatLog = document.getElementById('chatlog');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('send');
const chatStatus = document.getElementById('chatStatus');
const nudgesEl = document.getElementById('nudges');
const slotsEl = document.getElementById('slots');
const bookingForm = document.getElementById('bookingForm');
const chosenEl = document.getElementById('chosen');
const nameEl = document.getElementById('name');
const contactEl = document.getElementById('contact');
const confirmBtn = document.getElementById('confirm');
const bookStatus = document.getElementById('bookStatus');
let chosenSlot = null;

function addMsg(text, who) {
  const d = document.createElement('div');
  d.className = 'msg ' + who; d.textContent = text; chatLog.appendChild(d);
  chatLog.scrollTop = chatLog.scrollHeight;
}
function setStatus(el, msg, kind) { el.textContent = msg || ''; el.className = 'status' + (kind ? ' ' + kind : ''); }

async function send() {
  const message = chatInput.value.trim();
  if (!message) return;
  addMsg(message, 'you'); chatInput.value = ''; sendBtn.disabled = true; setStatus(chatStatus, 'Thinking...');
  try {
    const data = await (await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) })).json();
    if (data.ok) { addMsg(data.reply, 'bot'); setStatus(chatStatus, ''); }
    else if (data.todo) setStatus(chatStatus, data.message, 'todo');
    else setStatus(chatStatus, data.message || 'Error.', 'error');
  } catch (e) { setStatus(chatStatus, 'Request failed. Is the server running?', 'error'); }
  finally { sendBtn.disabled = false; }
}

async function loadNudges() {
  try {
    const data = await (await fetch('/api/nudges')).json();
    if (data.ok && data.nudges) data.nudges.forEach(q => {
      const c = document.createElement('div'); c.className = 'nudge'; c.textContent = q;
      c.addEventListener('click', () => { chatInput.value = q; send(); });
      nudgesEl.appendChild(c);
    });
  } catch (e) {}
}

async function loadSlots() {
  try {
    const data = await (await fetch('/api/slots')).json();
    if (data.ok && data.slots) {
      slotsEl.innerHTML = '';
      data.slots.forEach(s => {
        const el = document.createElement('div'); el.className = 'slot'; el.textContent = s.label || s.start;
        el.addEventListener('click', () => {
          document.querySelectorAll('.slot').forEach(x => x.classList.remove('picked'));
          el.classList.add('picked'); chosenSlot = s.start; chosenEl.textContent = 'Chosen: ' + (s.label || s.start);
          bookingForm.classList.remove('hidden');
        });
        slotsEl.appendChild(el);
      });
    } else if (data.todo) setStatus(bookStatus, data.message, 'todo');
  } catch (e) { setStatus(bookStatus, 'Could not load slots.', 'error'); }
}

async function confirmBooking() {
  if (!chosenSlot) return;
  confirmBtn.disabled = true; setStatus(bookStatus, 'Booking...');
  try {
    const data = await (await fetch('/api/book', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slot: chosenSlot, name: nameEl.value, contact: contactEl.value }) })).json();
    if (data.ok) { setStatus(bookStatus, data.confirmation || 'Booked.'); bookingForm.classList.add('hidden'); loadSlots(); }
    else if (data.todo) setStatus(bookStatus, data.message, 'todo');
    else setStatus(bookStatus, data.message || 'Error.', 'error');
  } catch (e) { setStatus(bookStatus, 'Request failed.', 'error'); }
  finally { confirmBtn.disabled = false; }
}

sendBtn.addEventListener('click', send);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
confirmBtn.addEventListener('click', confirmBooking);
loadNudges(); loadSlots();
