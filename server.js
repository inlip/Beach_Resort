require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// The portfolio site is served separately. Allow only its configured origin;
// the model key remains in this server's environment and never crosses CORS.
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
app.use((req, res, next) => {
  if (req.headers.origin === ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const PERSONA_DIR = path.join(__dirname, 'persona');

function readPersona() {
  // Provided helper: the persona text the assistant is grounded on.
  const resume = fs.readFileSync(path.join(PERSONA_DIR, 'resume.md'), 'utf-8');
  let captions = '';
  try { captions = fs.readFileSync(path.join(PERSONA_DIR, 'photos', 'captions.md'), 'utf-8'); } catch (e) {}
  return resume + '\n\n' + captions;
}

function notBuilt(res, what) {
  return res.status(501).json({
    ok: false, todo: true,
    message: what + ' is not built yet. Follow the class prompt chain to build it.'
  });
}

// -----------------------------------------------------------------------------
// TASK 1, build in class: ground the assistant and the suggested questions.
// Use the wire-model-call skill. Read the persona, call the model with the key
// from the environment, keep the assistant in scope, and never expose the key.
// -----------------------------------------------------------------------------
async function generateReply(visitorMessage) { throw new Error('NOT_BUILT'); }
async function generateNudges() { throw new Error('NOT_BUILT'); }

// -----------------------------------------------------------------------------
// TASK 2, build in class: read open slots and book, through the calendar tool.
// Use the booking-rules skill. Read free/busy only, build one-hour open slots,
// and create one event on booking. Never expose event details.
// -----------------------------------------------------------------------------
async function listOpenSlots() { throw new Error('NOT_BUILT'); }
async function bookSlot(slotStartIso, name, contact) { throw new Error('NOT_BUILT'); }

app.post('/api/chat', async (req, res) => {
  const message = req.body && req.body.message;
  if (!message) return res.status(400).json({ ok: false, message: 'Say something first.' });
  try { const reply = await generateReply(message); res.json({ ok: true, reply }); }
  catch (e) { if (e.message === 'NOT_BUILT') return notBuilt(res, 'The chat reply'); res.status(500).json({ ok: false, message: e.message }); }
});

app.get('/api/nudges', async (req, res) => {
  try { const nudges = await generateNudges(); res.json({ ok: true, nudges }); }
  catch (e) { if (e.message === 'NOT_BUILT') return notBuilt(res, 'The suggested questions'); res.status(500).json({ ok: false, message: e.message }); }
});

app.get('/api/slots', async (req, res) => {
  try { const slots = await listOpenSlots(); res.json({ ok: true, slots }); }
  catch (e) { if (e.message === 'NOT_BUILT') return notBuilt(res, 'Open slots'); res.status(500).json({ ok: false, message: e.message }); }
});

app.post('/api/book', async (req, res) => {
  const b = req.body || {};
  if (!b.slot || !b.name) return res.status(400).json({ ok: false, message: 'A slot and a name are needed.' });
  try { const conf = await bookSlot(b.slot, b.name, b.contact || ''); res.json({ ok: true, confirmation: conf }); }
  catch (e) { if (e.message === 'NOT_BUILT') return notBuilt(res, 'Booking'); res.status(500).json({ ok: false, message: e.message }); }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Portfolio assistant running on http://localhost:' + PORT));

// readPersona is used by the chat once you build it.
module.exports = { readPersona };
