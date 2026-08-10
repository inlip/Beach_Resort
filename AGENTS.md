# Portfolio assistant, project standards

- The model API key is read from the environment as GEMINI_API_KEY. Never print, log, commit, or send it to the browser.
- The assistant answers questions about the site owner and helps a visitor book an appointment. It politely declines anything outside that scope.
- Answer only from the persona files. Never invent a skill, a project, a client, or a date that is not in the persona.
- Calendar privacy: expose only whether a time is open or busy. Never reveal an event title, a guest, or any detail of an existing event.
- Appointments are one hour long and fall within the owner's working hours. Never double-book a slot that is already busy.
- The persona and the calendar access stay on the server. If a request is ambiguous, ask before acting.
