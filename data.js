/* ── STATIC DATA ── */

window.RIPPLE = window.RIPPLE || {};

RIPPLE.features = [
  {
    icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C7 1 3.5 7 3.5 9.5a3.5 3.5 0 007 0C10.5 7 7 1 7 1Z" fill="#00B4D8"/></svg>`,
    iconBg: '#00405A',
    title: 'One-tap logging',
    desc: 'A single tap logs your preset amount. No menus, no confirmations. The wave rises immediately, with haptic feedback and a 5-second undo window for slip-taps.'
  },
  {
    icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#3AC97B" stroke-width="1.2"/><path d="M7 4v3l2.2 1.3" stroke="#3AC97B" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    iconBg: '#0D2B18',
    title: 'Smart nudge engine',
    desc: 'Dynamic intervals adapt to remaining intake, hours left in your active window, and personal pace history. Urgent when behind, whisper-quiet when on track.'
  },
  {
    icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#9B7FE8" stroke-width="1.2"/><path d="M4.5 5l5 2.5L4.5 10V5Z" fill="#9B7FE8"/></svg>`,
    iconBg: '#1C1030',
    title: 'Active hours window',
    desc: 'Customizable wake-to-sleep window silences all alerts outside your schedule. HealthKit auto-detection available for zero-config setup.'
  },
  {
    icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="1" width="8" height="12" rx="1.5" stroke="#E87050" stroke-width="1.2"/><path d="M5 5.5h4M5 8h3M5 10.5h2" stroke="#E87050" stroke-width="1" stroke-linecap="round"/></svg>`,
    iconBg: '#2A1010',
    title: 'Actionable lock-screen alerts',
    desc: 'Log water directly from the lock screen — zero unlocks required. Progress syncs to the home screen widget in real time.'
  }
];

RIPPLE.specs = [
  {
    dot: '#00B4D8',
    title: 'Logging',
    rows: [
      { label: 'Default amount', value: '250 ml' },
      { label: 'Presets',        value: '150 / 250 / 500' },
      { label: 'Undo window',    value: '5 seconds' },
      { label: 'Haptic',         value: 'Light impact' },
      { label: 'Widget',         value: 'Home + Lock', color: '#3AC97B' }
    ]
  },
  {
    dot: '#3AC97B',
    title: 'Notifications',
    rows: [
      { label: 'Base interval',  value: '90 min' },
      { label: 'Catch-up mode',  value: '45 min' },
      { label: 'Goal reached',   value: 'All silenced', color: '#3AC97B' },
      { label: 'Copy style',     value: 'Conversational' },
      { label: 'Lock action',    value: '+ Log 250 ml', color: '#3AC97B' }
    ]
  },
  {
    dot: '#9B7FE8',
    title: 'Active hours',
    rows: [
      { label: 'Default window', value: '7 AM – 10 PM' },
      { label: 'Auto-detect',    value: 'HealthKit sync' },
      { label: 'Outside window', value: 'Zero alerts' },
      { label: 'Goal rollover',  value: 'Never' },
      { label: 'Weekend',        value: 'Custom schedule', color: '#9B7FE8' }
    ]
  }
];

RIPPLE.copyVariants = [
  { state: 'On track',       color: '#3AC97B', text: '"Looking good — only 500 ml left for the day."' },
  { state: 'Catching up',    color: '#F5B040', text: '"A little behind — one glass now and you\'ll still hit it."' },
  { state: 'Urgently behind',color: '#E87050', text: '"1,200 ml to go, 2 hrs left. Grab a big drink."' },
  { state: 'Goal met',       color: '#00B4D8', text: '"Daily goal reached. Notifications paused until tomorrow."' }
];

RIPPLE.tokens = [
  { name: 'Surface',      hex: '#06090F', border: 'border: .5px solid rgba(255,255,255,.15);' },
  { name: 'Card',         hex: '#0B1220' },
  { name: 'Accent',       hex: '#00B4D8' },
  { name: 'Accent deep',  hex: '#007EA8' },
  { name: 'Text primary', hex: '#E8EDF5' },
  { name: 'Text muted',   hex: '#8892A4' },
  { name: 'Border',       hex: '#1A2035' },
  { name: 'Success',      hex: '#3AC97B' },
  { name: 'Warning',      hex: '#F5B040' },
  { name: 'Danger',       hex: '#E87050' },
  { name: 'Purple',       hex: '#9B7FE8' }
];

RIPPLE.typography = [
  { lbl: 'TYPEFACE',  val: 'SF Pro Display', sub: 'System sans-serif' },
  { lbl: 'WEIGHTS',   val: '400 / 500',      sub: 'Regular · Medium' },
  { lbl: 'RADIUS',    val: '14 px / 28 px',  sub: 'Cards · Buttons' },
  { lbl: 'MOTION',    val: '200 ms ease',    sub: 'Spring on wave' },
  { lbl: 'GRID',      val: '8 pt base',      sub: '4 pt micro-grid' }
];

RIPPLE.GOAL    = 2500;
RIPPLE.LOG_AMT = 250;
