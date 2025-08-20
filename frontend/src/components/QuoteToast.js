import React, { useEffect, useMemo, useState } from 'react';

const QUOTES = [
  'A budget is telling your money where to go instead of wondering where it went. — Dave Ramsey',
  'Do not save what is left after spending; instead spend what is left after saving. — Warren Buffett',
  'Beware of little expenses; a small leak will sink a great ship. — Benjamin Franklin',
  'The goal isn’t more money. The goal is living life on your terms. — Chris Brogan',
  'It’s not your salary that makes you rich, it’s your spending habits. — Charles A. Jaffe'
];

export default function QuoteToast() {
  const [visible, setVisible] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('quoteToastDismissed') === 'true';
    } catch {
      return false;
    }
  });

  const current = useMemo(() => QUOTES[quoteIndex], [quoteIndex]);

  useEffect(() => {
    if (dismissed) return;
    const rotate = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % QUOTES.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 6000);
    }, 9000);

    const initialTimeout = setTimeout(() => setVisible(false), 6000);
    return () => { clearInterval(rotate); clearTimeout(initialTimeout); };
  }, [dismissed]);

  const onClose = () => {
    setVisible(false);
    setDismissed(true);
    try { sessionStorage.setItem('quoteToastDismissed', 'true'); } catch {}
  };

  if (dismissed) return null;

  return (
    <div className={`quote-toast animate__animated ${visible ? 'animate__fadeInUp' : 'animate__fadeOutDown'}`}>
      <div className={`toast ${visible ? 'show' : ''} bg-dark border-secondary text-light`} role="alert" aria-live="polite" aria-atomic="true">
        <div className="toast-header bg-black text-light border-secondary">
          <strong className="me-auto">Money Tip</strong>
          <small className="text-muted">Every 9s</small>
          <button type="button" className="btn-close btn-close-white ms-2" aria-label="Close" onClick={onClose}></button>
        </div>
        <div className="toast-body d-flex align-items-start gap-2">
          <span className="flex-grow-1">{current}</span>
          <button type="button" className="btn btn-sm btn-outline-light" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}


