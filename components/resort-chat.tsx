'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { RESORT } from '@/lib/data';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const welcomeMessage: ChatMessage = {
  role: 'assistant',
  content: `Hello! I’m the ${RESORT.name} concierge. Ask me about rooms, dining, experiences, offers, or your stay.`,
};

export function ResortChat() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([welcomeMessage]);
  const [draft, setDraft] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    const message = draft.trim();
    if (!message || isSending) return;

    const nextMessages = [...messages, { role: 'user' as const, content: message }];
    setMessages(nextMessages);
    setDraft('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: messages.slice(-10),
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        reply?: string;
        error?: string;
      };

      if (!response.ok || !result.ok || !result.reply) {
        throw new Error(result.error || 'Chat request failed');
      }

      setMessages((current) => [
        ...current,
        { role: 'assistant', content: result.reply! },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: `Sorry, I’m having trouble right now — call us at ${RESORT.phone} instead.`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 flex h-[30rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-luxe ring-1 ring-ocean-100 dark:bg-ocean-800 dark:ring-white/10"
          >
            <div className="bg-gradient-to-r from-teal-400 to-ocean-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-display text-lg font-semibold">Azurea Concierge</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full p-1 transition hover:bg-white/15"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-1 text-xs text-white/85">Resort questions, answered here</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-sand-50 p-4 dark:bg-ocean-900/60">
              {messages.map((item, index) => (
                <div
                  key={`${item.role}-${index}-${item.content}`}
                  className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      item.role === 'user'
                        ? 'rounded-br-sm bg-ocean-500 text-white'
                        : 'rounded-tl-sm bg-white text-ocean-800 shadow-sm dark:bg-ocean-800 dark:text-white'
                    }`}
                  >
                    {item.content}
                  </p>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm text-ocean-700 shadow-sm dark:bg-ocean-800 dark:text-white">
                    <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
                    Azurea Concierge is typing…
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="flex gap-2 border-t border-ocean-100 bg-white p-3 dark:border-white/10 dark:bg-ocean-800">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={500}
                disabled={isSending}
                placeholder="Ask about your stay…"
                aria-label="Chat message"
                className="min-w-0 flex-1 rounded-full border border-ocean-100 bg-sand-50 px-4 py-2 text-sm text-ocean-800 outline-none placeholder:text-muted-foreground focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-ocean-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={!draft.trim() || isSending}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-500 text-white transition hover:bg-ocean-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? 'Close concierge chat' : 'Open concierge chat'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ocean-600 text-white shadow-luxe"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
