---
name: wire-model-call
description: How this project calls the language model API from the Node backend. Use when adding or changing the chat reply or the suggested questions, or wiring the Gemini call.
---

When wiring the model call in server.js:

1. Read GEMINI_API_KEY and MODEL from the environment. Never hardcode either.
2. Build the system message from the persona files in persona/. Instruct the model to answer only about the owner and the booking, to use only the persona facts, and to decline anything else.
3. Call the Gemini generateContent endpoint for the model in MODEL. Send the system message and the visitor's message. Use a timeout of about 20 seconds and retry once on a network error or a 5xx response.
4. Read the reply text from the response and return it. Never place the key in any error text.
