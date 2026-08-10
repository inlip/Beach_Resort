---
name: booking-rules
description: How this project reads availability and books appointments through the Google Calendar tool. Use when building the open-slots list or the booking action.
---

Working with the calendar:

1. Availability comes from the Google Calendar tool's free/busy query. Read only whether a time is open or busy. Never read or return event titles or details.
2. Slots are one hour long and fall within the owner's working hours. Build the open-slots list by taking the working hours and removing any hour that overlaps a busy period.
3. A booking creates one event through the calendar tool, with the visitor's name and contact in the description and a one-hour duration on the chosen slot.
4. Before creating the event, check availability again so two visitors cannot take the same slot.
5. Return a plain confirmation. Never expose anything about the owner's other events.
