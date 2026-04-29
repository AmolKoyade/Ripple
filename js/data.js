/* ── STATIC DATA ── */
window.RIPPLE_DATA = {
  drinkEmojis: ['💧', '🥛', '🍵', '🧃', '🫖', '🧋'],
  weekDays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  nudges: {
    start:   { icon: '💧', text: 'Stay hydrated! Log your first drink.', cls: '' },
    behind:  { icon: '⚡', text: 'You\'re a bit behind — grab a glass now!', cls: 'urgent' },
    urgent:  { icon: '🚨', text: 'Far behind schedule — drink up, quickly!', cls: 'urgent' },
    onTrack: { icon: '✅', text: 'On track! Keep it up.', cls: 'on-track' },
    almost:  { icon: '🏁', text: 'So close! Just a bit more to reach your goal.', cls: 'on-track' },
    done:    { icon: '🎉', text: 'Daily goal reached! Notifications paused until tomorrow.', cls: 'done' }
  }
};
