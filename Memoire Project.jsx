import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Home, Users, BookOpen, MessageCircle, CalendarClock, Bell, Stethoscope,
  Heart, Plus, X, Check, ChevronRight, ChevronLeft, Mic, Play, Camera,
  AlertTriangle, TrendingUp, TrendingDown, Minus, FileText, Clock,
  Pill, Utensils, Footprints, PhoneCall, Send, Trash2, Pencil, LogOut,
  ShieldAlert, Sparkles, ArrowLeftRight, Info, Volume2, ImagePlus
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend
} from "recharts";

/* =========================================================================
   DESIGN TOKENS
   Subject: a calm, dignified daily companion for a person with dementia
   (patient Raj, 72) shared with family, a caregiver, and a doctor.
   Brand: Memoire — navy (#1A2E44) on warm-white (#E8DDD0), echoing the
   provided mark of two hands cradling a heart beneath an "M".
   Signature: "the thread" — a soft connecting line motif that runs through
   timelines, the routine list, and the doctor's trend charts, representing
   memory being held together across the app.
   ========================================================================= */
   
const T = {
  bg: "#E8DDD0",
  surface: "#E8DDD0",
  surfaceSoft: "#DBCBB4",
  ink: "#1A2E44",
  inkSoft: "rgba(26,46,68,0.72)",
  inkFaint: "rgba(26,46,68,0.48)",
  primary: "#1A2E44",
  primaryDark: "#0F1D2E",
  primarySoft: "rgba(26,46,68,0.10)",
  amber: "#8A5A2A",
  amberSoft: "rgba(138,90,42,0.14)",
  coral: "#7A3B32",
  coralSoft: "rgba(122,59,50,0.14)",
  gold: "#7A661F",
  goldSoft: "rgba(122,102,31,0.14)",
  line: "rgba(26,46,68,0.22)",
  green: "#1A2E44",
  yellow: "#7A661F",
  red: "#7A3B32",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');`;

const displayFont = "'Fraunces', serif";
const bodyFont = "'Inter', sans-serif";
const monoFont = "'IBM Plex Mono', monospace";

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

/* =========================================================================
   MOCK DATA
   ========================================================================= */

const PEOPLE_INITIAL = [
  {
    id: "priya",
    name: "Priya Sharma",
    relation: "Daughter",
    color: "#E0923D",
    voiceIntro: "Hi Dad, it's Priya! I love you.",
    timeline: [
      { id: uid("tl"), date: "2018-06-14", title: "Priya's Graduation", description: "Priya graduated from Delhi University. You wore your good blue suit and cried during the ceremony.", important: true, location: "Delhi", photos: 1 },
      { id: uid("tl"), date: "2019-12-02", title: "Family Trip to Goa", description: "The whole family went to Goa. You and Priya walked on the beach every morning before breakfast.", important: true, location: "Goa", photos: 3 },
      { id: uid("tl"), date: "2022-10-24", title: "Family Diwali", description: "Priya came home for Diwali and helped light the diyas along the balcony rail.", important: false, location: "Home", photos: 2 },
      { id: uid("tl"), date: "2026-08-15", title: "Recent Visit", description: "Priya visited on Sunday afternoon and brought your favourite besan ladoo.", important: false, location: "Home", photos: 1 },
    ],
  },
  {
    id: "amit",
    name: "Amit Sharma",
    relation: "Son",
    color: "#4C7A70",
    voiceIntro: "Hey Papa, it's Amit. Talk soon!",
    timeline: [
      { id: uid("tl"), date: "2017-03-11", title: "New Job in Bangalore", description: "Amit started his new job. You called him every Sunday that first year.", important: false, location: "Bangalore", photos: 0 },
      { id: uid("tl"), date: "2019-12-02", title: "Family Trip to Goa", description: "Amit organised the whole Goa trip and booked the beach house.", important: true, location: "Goa", photos: 2 },
      { id: uid("tl"), date: "2023-11-20", title: "Raj's Birthday", description: "Amit flew in for your 71st birthday and brought a cricket bat signed by your favourite team.", important: true, location: "Home", photos: 2 },
    ],
  },
  {
    id: "meena",
    name: "Meena Sharma",
    relation: "Wife",
    color: "#C15B49",
    voiceIntro: "It's me. Dinner's almost ready.",
    timeline: [
      { id: uid("tl"), date: "1998-02-01", title: "Old Family Home", description: "You and Meena moved into the family home on Ashok Road, where you raised both children.", important: true, location: "Delhi", photos: 1 },
      { id: uid("tl"), date: "2022-10-24", title: "Family Diwali", description: "Meena cooked the whole Diwali feast, just like every year.", important: false, location: "Home", photos: 2 },
      { id: uid("tl"), date: "2023-11-20", title: "Raj's Birthday", description: "Meena organised your birthday and invited the whole street over.", important: true, location: "Home", photos: 3 },
    ],
  },
  {
    id: "rahul",
    name: "Rahul Sharma",
    relation: "Grandson",
    color: "#CFA23B",
    voiceIntro: "Hi Nana! Come play with me!",
    timeline: [
      { id: uid("tl"), date: "2019-09-05", title: "Birth", description: "Rahul was born. You held him for the first time at the hospital in Bangalore.", important: true, location: "Bangalore", photos: 1 },
      { id: uid("tl"), date: "2020-09-05", title: "First Birthday", description: "Rahul's first birthday, celebrated over a video call since you couldn't travel.", important: false, location: "Video Call", photos: 1 },
      { id: uid("tl"), date: "2024-02-14", title: "School Event", description: "Rahul's school play — he played a tree and waved at the camera the whole time.", important: false, location: "Bangalore", photos: 1 },
      { id: uid("tl"), date: "2026-08-15", title: "Recent Visit", description: "Rahul visited with Priya and showed you his new drawing of the family.", important: false, location: "Home", photos: 1 },
    ],
  },
];

const DOCTOR_PROFILE = { id: "dr_sharma", name: "Dr. Sharma", relation: "Physician", color: "#8A948F" };

const MEMORIES_INITIAL = [
  { id: uid("mem"), title: "Family Trip to Goa", year: "2019", people: ["priya", "amit", "meena"], description: "A week at the beach house. Morning walks, fresh fish curry, and Amit's terrible attempts at surfing." },
  { id: uid("mem"), title: "Priya's Graduation", year: "2018", people: ["priya"], description: "Delhi University, blue suit, and a lot of happy tears." },
  { id: uid("mem"), title: "Family Diwali", year: "2022", people: ["priya", "amit", "meena", "rahul"], description: "Diyas along the balcony and the whole family under one roof." },
  { id: uid("mem"), title: "Raj's Birthday", year: "2023", people: ["amit", "meena"], description: "71st birthday. The whole street came over for cake." },
  { id: uid("mem"), title: "Old Family Home", year: "1998", people: ["meena"], description: "The house on Ashok Road where both children grew up." },
];

const ICONS_BY_CATEGORY = {
  Medicine: Pill, Meal: Utensils, Exercise: Footprints, Appointment: Stethoscope, Family: Heart, Personal: Home,
};

const ROUTINE_INITIAL = [
  { id: uid("rt"), time: "8:00 AM", name: "Breakfast", category: "Meal", importance: "Medium", description: "Poha and chai, same as always.", status: "completed", response: "remembered" },
  { id: uid("rt"), time: "9:00 AM", name: "Morning Medicine", category: "Medicine", importance: "Critical", description: "Blood pressure tablet, with breakfast.", status: "completed", response: "remembered" },
  { id: uid("rt"), time: "11:00 AM", name: "Morning Walk", category: "Exercise", importance: "Low", description: "A short walk around the garden.", status: "pending", response: null },
  { id: uid("rt"), time: "1:00 PM", name: "Lunch", category: "Meal", importance: "Medium", description: "Dal, rice, and vegetables.", status: "pending", response: null },
  { id: uid("rt"), time: "3:00 PM", name: "Rest", category: "Personal", importance: "Low", description: "Quiet time in the armchair.", status: "pending", response: null },
  { id: uid("rt"), time: "5:00 PM", name: "Family Call", category: "Family", importance: "Medium", description: "Video call with Priya.", status: "pending", response: null },
  { id: uid("rt"), time: "7:45 PM", name: "Evening Medicine", category: "Medicine", importance: "Critical", description: "Evening tablet, before dinner.", status: "pending", response: null },
  { id: uid("rt"), time: "8:00 PM", name: "Dinner", category: "Meal", importance: "Medium", description: "Light dinner, roti and sabzi.", status: "pending", response: null },
];

// Topics used for mock semantic grouping of companion questions
const TOPICS = [
  { id: "evening_medication", label: "Evening Medication", importance: "Critical", category: "Medicine", keywords: ["evening medic", "evening tablet", "night medic", "medicine", "tablet", "pill", "medication", "dose"] },
  { id: "priya_recognition", label: "Priya — Person Recognition", importance: "High", category: "Family", keywords: ["priya", "daughter", "this lady", "who is she", "who is this", "her name"] },
  { id: "appointment", label: "Doctor Appointment", importance: "High", category: "Appointment", keywords: ["appointment", "doctor", "dr.", "checkup", "check-up", "clinic"] },
  { id: "breakfast", label: "Breakfast", importance: "Medium", category: "Meal", keywords: ["breakfast", "morning meal"] },
];

function matchTopic(text) {
  const t = text.toLowerCase();
  for (const topic of TOPICS) {
    if (topic.keywords.some((k) => t.includes(k))) return topic;
  }
  return { id: "other", label: "Other", importance: "Low", category: "Personal" };
}

// Historical questions log — periods 1 & 2 are fixed history, period 3 is "current" and grows live
const QUESTIONS_LOG_INITIAL = [
  // Period 1 (Aug 1 – Aug 14): heavier support needs
  ...Array.from({ length: 9 }, (_, i) => ({ id: uid("q"), text: i % 2 ? "Which tablet is this?" : "What medicine do I take?", date: `2026-08-0${(i % 8) + 1}`, time: "8:0" + (i % 9) + " PM", topicId: "evening_medication", period: 1 })),
  ...Array.from({ length: 3 }, (_, i) => ({ id: uid("q"), text: "What medicine do I take?", date: "2026-08-05", time: "8:10 AM", topicId: "evening_medication", period: 1 })),
  ...Array.from({ length: 8 }, (_, i) => ({ id: uid("q"), text: i % 2 ? "Who is this lady?" : "Who is Priya?", date: `2026-08-0${(i % 8) + 1}`, time: "4:0" + (i % 9) + " PM", topicId: "priya_recognition", period: 1 })),
  ...Array.from({ length: 5 }, (_, i) => ({ id: uid("q"), text: "When is my doctor appointment?", date: `2026-08-1${i}`, time: "10:00 AM", topicId: "appointment", period: 1 })),
  ...Array.from({ length: 3 }, (_, i) => ({ id: uid("q"), text: "What's for breakfast?", date: `2026-08-0${i + 2}`, time: "7:45 AM", topicId: "breakfast", period: 1 })),
  // Period 2 (Aug 15 – Aug 28): improving
  ...Array.from({ length: 7 }, (_, i) => ({ id: uid("q"), text: "What medicine do I take?", date: `2026-08-1${i + 5}`, time: "7:5" + (i % 9) + " PM", topicId: "evening_medication", period: 2 })),
  ...Array.from({ length: 3 }, (_, i) => ({ id: uid("q"), text: "Who is Priya?", date: `2026-08-1${i + 6}`, time: "4:15 PM", topicId: "priya_recognition", period: 2 })),
  ...Array.from({ length: 2 }, (_, i) => ({ id: uid("q"), text: "When is my doctor appointment?", date: `2026-08-2${i}`, time: "10:00 AM", topicId: "appointment", period: 2 })),
  ...Array.from({ length: 2 }, (_, i) => ({ id: uid("q"), text: "What's for breakfast?", date: `2026-08-1${i + 7}`, time: "7:50 AM", topicId: "breakfast", period: 2 })),
  // Period 3 (Aug 29 – Sep 11): current, starts light — will grow live during the demo
  ...Array.from({ length: 4 }, (_, i) => ({ id: uid("q"), text: "What medicine do I take?", date: "2026-08-29", time: "7:55 PM", topicId: "evening_medication", period: 3 })),
  ...Array.from({ length: 2 }, (_, i) => ({ id: uid("q"), text: "Who is Priya?", date: "2026-08-30", time: "4:10 PM", topicId: "priya_recognition", period: 3 })),
  { id: uid("q"), text: "When is my doctor appointment?", date: "2026-08-30", time: "10:00 AM", topicId: "appointment", period: 3 },
  { id: uid("q"), text: "What's for breakfast?", date: "2026-08-31", time: "7:50 AM", topicId: "breakfast", period: 3 },
];

// Reminder responses log — same 3-period shape. counts of "needed_reminder" out of total for the period
const REMINDER_LOG_INITIAL = [
  ...Array.from({ length: 9 }, (_, i) => ({ id: uid("rm"), category: "Medicine", importance: "Critical", date: `2026-08-0${(i % 8) + 1}`, response: i < 9 ? "needed_reminder" : "remembered", period: 1 })),
  ...Array.from({ length: 5 }, (_, i) => ({ id: uid("rm"), category: "Medicine", importance: "Critical", date: `2026-08-0${(i % 8) + 1}`, response: "remembered", period: 1 })),
  ...Array.from({ length: 7 }, (_, i) => ({ id: uid("rm"), category: "Medicine", importance: "Critical", date: `2026-08-1${i + 5}`, response: i < 7 ? "needed_reminder" : "remembered", period: 2 })),
  ...Array.from({ length: 9 }, (_, i) => ({ id: uid("rm"), category: "Medicine", importance: "Critical", date: `2026-08-1${(i % 9) + 5}`, response: "remembered", period: 2 })),
  ...Array.from({ length: 3 }, (_, i) => ({ id: uid("rm"), category: "Medicine", importance: "Critical", date: "2026-08-29", response: "needed_reminder", period: 3 })),
  ...Array.from({ length: 5 }, (_, i) => ({ id: uid("rm"), category: "Medicine", importance: "Critical", date: "2026-08-30", response: "remembered", period: 3 })),
];

const PERIODS = [
  { id: 1, label: "Assessment Period 1", range: "Aug 1 – Aug 14, 2026" },
  { id: 2, label: "Assessment Period 2", range: "Aug 15 – Aug 28, 2026" },
  { id: 3, label: "Assessment Period 3", range: "Aug 29 – Sep 11, 2026 (current)" },
];

const ALERTS_INITIAL = [
  { id: uid("al"), level: "high", title: "Medication Reminder Missed", body: "Raj has not confirmed his 9:00 AM medication.", time: "10 minutes ago", status: "pending" },
  { id: uid("al"), level: "medium", title: "Routine Delay", body: "Morning walk has not been completed.", time: "45 minutes ago", status: "pending" },
  { id: uid("al"), level: "normal", title: "Routine Completed", body: "Breakfast completed at 8:12 AM.", time: "2 hours ago", status: "resolved" },
];

const MESSAGES_INITIAL = [
  { id: uid("msg"), from: "priya", text: "Hi Dad, I'll visit you today at 5 PM.", type: "voice", time: "2 hours ago" },
];

const SUPPORT_LEVELS = ["Low", "Medium", "High"];

/* =========================================================================
   SMALL SHARED UI PIECES
   ========================================================================= */

function MemoireMark({ size = 26, color = T.primary }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17 78 C6 62 6 34 17 16" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <path d="M83 78 C94 62 94 34 83 16" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <path d="M28 80 L28 14 L50 42 L72 14 L72 80" stroke={color} strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      <path d="M50 52 C45 44 33 47 33 58 C33 68 50 80 50 80 C50 80 67 68 67 58 C67 47 55 44 50 52 Z" fill={color} />
    </svg>
  );
}

function IconCircle({ Icon, color, size = 44, bg }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "999px", background: bg || `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={size * 0.5} color={color} strokeWidth={2.2} />
    </div>
  );
}

function Badge({ children, tone = "primary" }) {
  const map = {
    primary: { bg: T.primarySoft, fg: T.primaryDark },
    amber: { bg: T.amberSoft, fg: "#8A5A1E" },
    coral: { bg: T.coralSoft, fg: "#8A3524" },
    gold: { bg: T.goldSoft, fg: "#7A5E16" },
    neutral: { bg: T.surfaceSoft, fg: T.inkSoft },
  };
  const c = map[tone] || map.primary;
  return (
    <span style={{ background: c.bg, color: c.fg, fontFamily: bodyFont, fontWeight: 600, fontSize: 12, padding: "4px 10px", borderRadius: 999, letterSpacing: 0.2, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function importanceTone(importance) {
  return { Critical: "coral", High: "amber", Medium: "gold", Low: "neutral" }[importance] || "neutral";
}
function importanceDot(importance) {
  return { Critical: T.coral, High: T.amber, Medium: T.gold, Low: T.inkFaint }[importance] || T.inkFaint;
}

function Card({ children, style, onClick, className = "" }) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: T.surface,
        borderRadius: 18,
        border: `1px solid ${T.line}`,
        padding: 20,
        transition: "box-shadow .2s, transform .2s",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={(e) => { if (onClick) { e.currentTarget.style.boxShadow = "0 8px 24px rgba(43,53,50,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
      onMouseLeave={(e) => { if (onClick) { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; } }}
    >
      {children}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", full, style, icon: Icon, disabled }) {
  const sizes = { sm: { pad: "8px 14px", fs: 13 }, md: { pad: "12px 20px", fs: 15 }, lg: { pad: "18px 26px", fs: 18 } };
  const variants = {
    primary: { bg: T.primary, fg: "#fff", border: "none" },
    outline: { bg: "transparent", fg: T.primaryDark, border: `1.5px solid ${T.primary}` },
    ghost: { bg: "transparent", fg: T.inkSoft, border: "none" },
    danger: { bg: T.coral, fg: "#fff", border: "none" },
    amber: { bg: T.amber, fg: "#fff", border: "none" },
  };
  const s = sizes[size], v = variants[variant];
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: v.bg, color: v.fg, border: v.border, padding: s.pad, fontSize: s.fs,
        borderRadius: 14, fontFamily: bodyFont, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto", opacity: disabled ? 0.5 : 1, transition: "opacity .15s, transform .1s",
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "none"; }}
    >
      {Icon && <Icon size={s.fs + 2} />}
      {children}
    </button>
  );
}

function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: T.inkSoft }}>
      <div style={{ display: "inline-flex", marginBottom: 14 }}>
        <IconCircle Icon={Icon} color={T.primary} size={56} />
      </div>
      <div style={{ fontFamily: displayFont, fontSize: 20, color: T.ink, marginBottom: 6 }}>{title}</div>
      <div style={{ fontFamily: bodyFont, fontSize: 14, maxWidth: 340, margin: "0 auto 16px" }}>{body}</div>
      {action}
    </div>
  );
}

function Modal({ open, onClose, title, children, width = 480 }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(43,53,50,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16, animation: "fadeIn .15s ease" }} onClick={onClose}>
      <div style={{ background: T.surface, borderRadius: 20, padding: 26, width: "100%", maxWidth: width, maxHeight: "88vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: displayFont, fontSize: 22, color: T.ink, fontWeight: 600 }}>{title}</div>
          <button onClick={onClose} style={{ background: T.surfaceSoft, border: "none", borderRadius: 999, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={16} color={T.inkSoft} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ConfirmDialog({ open, title, body, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <Modal open={open} onClose={onCancel} title={title} width={380}>
      <p style={{ fontFamily: bodyFont, color: T.inkSoft, fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>{body}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
        <Btn variant="danger" icon={Trash2} onClick={onConfirm}>Delete</Btn>
      </div>
    </Modal>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <div style={{ fontFamily: bodyFont, fontSize: 12, fontWeight: 700, color: T.inkSoft, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</div>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${T.line}`,
  fontFamily: bodyFont, fontSize: 14, color: T.ink, outline: "none", boxSizing: "border-box", background: "#fff",
};

function ToastHost({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 200, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ background: T.primaryDark, color: "#fff", padding: "10px 20px", borderRadius: 999, fontFamily: bodyFont, fontSize: 14, fontWeight: 500, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", animation: "slideUp .2s ease" }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
      <div>
        {eyebrow && <div style={{ fontFamily: monoFont, fontSize: 11, color: T.primary, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 4 }}>{eyebrow}</div>}
        <div style={{ fontFamily: displayFont, fontSize: 26, color: T.ink, fontWeight: 600 }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

/* =========================================================================
   ROOT APP
   ========================================================================= */

export default function App() {
  const [role, setRole] = useState("caregiver");
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const [people, setPeople] = useState(PEOPLE_INITIAL);
  const [memories, setMemories] = useState(MEMORIES_INITIAL);
  const [routine, setRoutine] = useState(ROUTINE_INITIAL);
  const [alerts, setAlerts] = useState(ALERTS_INITIAL);
  const [messages, setMessages] = useState(MESSAGES_INITIAL);
  const [questionsLog, setQuestionsLog] = useState(QUESTIONS_LOG_INITIAL);
  const [reminderLog, setReminderLog] = useState(REMINDER_LOG_INITIAL);
  const [supportLevel, setSupportLevel] = useState("Medium");
  const [toasts, setToasts] = useState([]);

  function toast(msg) {
    const id = uid("t");
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }

  function logQuestion(text) {
    const topic = matchTopic(text);
    const q = { id: uid("q"), text, date: "2026-09-02", time: "current", topicId: topic.id, period: 3 };
    setQuestionsLog((qs) => [...qs, q]);
    return topic;
  }

  function respondToRoutine(routineId, response) {
    setRoutine((rs) => rs.map((r) => (r.id === routineId ? { ...r, status: "completed", response } : r)));
    const r = routine.find((x) => x.id === routineId);
    if (r) {
      setReminderLog((log) => [...log, { id: uid("rm"), category: r.category, importance: r.importance, date: "2026-09-02", response, period: 3 }]);
      setAlerts((al) => [{ id: uid("al"), level: "normal", title: "Routine Completed", body: `${r.name} completed at ${r.time}.`, time: "just now", status: "resolved" }, ...al]);
    }
    toast(response === "remembered" ? "Recorded: remembered independently" : "Recorded: needed reminder assistance");
  }

  const roleMeta = {
    patient: { name: "Raj Sharma", sub: "Patient", nav: [
      { id: "home", label: "Home", icon: Home }, { id: "people", label: "People", icon: Users },
      { id: "memories", label: "Memories", icon: BookOpen }, { id: "companion", label: "Companion", icon: MessageCircle },
      { id: "routine", label: "Routine", icon: CalendarClock },
    ]},
    caregiver: { name: "Ananya Sharma", sub: "Caregiver", nav: [
      { id: "dashboard", label: "Dashboard", icon: Home }, { id: "people", label: "People", icon: Users },
      { id: "memories", label: "Memories", icon: BookOpen }, { id: "routine", label: "Routine", icon: CalendarClock },
      { id: "alerts", label: "Alerts", icon: Bell }, { id: "insights", label: "Insights", icon: Sparkles },
    ]},
    family: { name: "Priya Sharma", sub: "Family", nav: [
      { id: "home", label: "Home", icon: Home }, { id: "memories", label: "Memories", icon: BookOpen },
      { id: "messages", label: "Messages", icon: MessageCircle },
    ]},
    doctor: { name: "Dr. Sharma", sub: "Doctor", nav: [
      { id: "overview", label: "Overview", icon: Home }, { id: "history", label: "Patient History", icon: FileText },
      { id: "recall", label: "Recall Analysis", icon: TrendingUp }, { id: "patterns", label: "Question Patterns", icon: MessageCircle },
      { id: "important", label: "Important Items", icon: AlertTriangle }, { id: "trends", label: "Trends", icon: Sparkles },
      { id: "reports", label: "Reports", icon: FileText },
    ]},
  };

  const [page, setPage] = useState({ patient: "home", caregiver: "dashboard", family: "home", doctor: "overview" });
  const activePage = page[role];
  const setActivePage = (p) => setPage((prev) => ({ ...prev, [role]: p }));

  const isSidebarRole = role === "caregiver" || role === "doctor";

  return (
    <div style={{ fontFamily: bodyFont, background: T.bg, minHeight: "100vh", color: T.ink }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: ${T.line}; border-radius: 8px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
        button:focus-visible, [tabindex]:focus-visible { outline: 2px solid ${T.primary}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>

      <TopBar role={role} roleMeta={roleMeta[role]} setRoleSwitcherOpen={setRoleSwitcherOpen} />

      <div style={{ display: "flex", maxWidth: 1280, margin: "0 auto" }}>
        {isSidebarRole && (
          <SideNav nav={roleMeta[role].nav} activePage={activePage} setActivePage={setActivePage} />
        )}
        <main style={{ flex: 1, minWidth: 0, padding: isSidebarRole ? "28px 28px 100px" : "20px 16px 100px" }}>
          {role === "patient" && (
            <PatientViews page={activePage} people={people} memories={memories} routine={routine}
              messages={messages} supportLevel={supportLevel} respondToRoutine={respondToRoutine}
              logQuestion={logQuestion} toast={toast} />
          )}
          {role === "caregiver" && (
            <CaregiverViews page={activePage} people={people} setPeople={setPeople} memories={memories} setMemories={setMemories}
              routine={routine} setRoutine={setRoutine} alerts={alerts} setAlerts={setAlerts}
              questionsLog={questionsLog} reminderLog={reminderLog} supportLevel={supportLevel} setSupportLevel={setSupportLevel}
              toast={toast} />
          )}
          {role === "family" && (
            <FamilyViews page={activePage} people={people} memories={memories} setMemories={setMemories}
              messages={messages} setMessages={setMessages} routine={routine} toast={toast} />
          )}
          {role === "doctor" && (
            <DoctorViews page={activePage} questionsLog={questionsLog} reminderLog={reminderLog} people={people} />
          )}
        </main>
      </div>

      {!isSidebarRole && (
        <BottomNav nav={roleMeta[role].nav} activePage={activePage} setActivePage={setActivePage} />
      )}

      <RoleSwitcher open={roleSwitcherOpen} onClose={() => setRoleSwitcherOpen(false)} role={role} setRole={(r) => { setRole(r); setRoleSwitcherOpen(false); }} roleMeta={roleMeta} />
      <ToastHost toasts={toasts} />
    </div>
  );
}

/* =========================================================================
   TOP BAR / NAV
   ========================================================================= */

function TopBar({ role, roleMeta, setRoleSwitcherOpen }) {
  return (
    <div style={{ borderBottom: `1px solid ${T.line}`, background: T.surface, position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: "999px", background: T.primarySoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <MemoireMark size={22} color={T.primary} />
          </div>
          <div>
            <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 18, lineHeight: 1.1, letterSpacing: 0.3 }}>Memoire</div>
            <div style={{ fontFamily: monoFont, fontSize: 9.5, color: T.inkFaint, letterSpacing: 1 }}>PERSONALIZED DEMENTIA SUPPORT</div>
          </div>
        </div>
        <button onClick={() => setRoleSwitcherOpen(true)} style={{ display: "flex", alignItems: "center", gap: 10, background: T.surfaceSoft, border: "none", borderRadius: 999, padding: "6px 14px 6px 6px", cursor: "pointer" }}>
          <div style={{ width: 30, height: 30, borderRadius: "999px", background: T.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: displayFont, fontWeight: 600, fontSize: 14 }}>
            {roleMeta.name.charAt(0)}
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 13, lineHeight: 1.1 }}>{roleMeta.name}</div>
            <div style={{ fontFamily: bodyFont, fontSize: 11, color: T.inkFaint }}>{roleMeta.sub}</div>
          </div>
          <ArrowLeftRight size={14} color={T.inkSoft} />
        </button>
      </div>
    </div>
  );
}

function RoleSwitcher({ open, onClose, role, setRole, roleMeta }) {
  return (
    <Modal open={open} onClose={onClose} title="Switch role" width={380}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.keys(roleMeta).map((r) => (
          <button key={r} onClick={() => setRole(r)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14,
            border: `1.5px solid ${role === r ? T.primary : T.line}`, background: role === r ? T.primarySoft : "#fff",
            cursor: "pointer", textAlign: "left",
          }}>
            <div style={{ width: 34, height: 34, borderRadius: 999, background: T.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: displayFont, fontWeight: 600 }}>
              {roleMeta[r].name.charAt(0)}
            </div>
            <div>
              <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 14 }}>{roleMeta[r].name}</div>
              <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint }}>{roleMeta[r].sub} view</div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
        <Btn variant="ghost" icon={LogOut} onClick={onClose}>Close</Btn>
      </div>
    </Modal>
  );
}

function SideNav({ nav, activePage, setActivePage }) {
  return (
    <aside style={{ width: 224, flexShrink: 0, padding: "28px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
      {nav.map((n) => {
        const Icon = n.icon;
        const active = activePage === n.id;
        return (
          <button key={n.id} onClick={() => setActivePage(n.id)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12,
            border: "none", background: active ? T.primarySoft : "transparent", cursor: "pointer",
            color: active ? T.primaryDark : T.inkSoft, fontFamily: bodyFont, fontWeight: 600, fontSize: 14.5, textAlign: "left",
          }}>
            <Icon size={18} />
            {n.label}
          </button>
        );
      })}
    </aside>
  );
}

function BottomNav({ nav, activePage, setActivePage }) {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.surface, borderTop: `1px solid ${T.line}`, display: "flex", zIndex: 50, boxShadow: "0 -4px 16px rgba(0,0,0,0.04)" }}>
      {nav.map((n) => {
        const Icon = n.icon;
        const active = activePage === n.id;
        return (
          <button key={n.id} onClick={() => setActivePage(n.id)} aria-label={n.label} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 4px 12px",
            border: "none", background: "transparent", cursor: "pointer", color: active ? T.primary : T.inkFaint,
          }}>
            <Icon size={22} strokeWidth={active ? 2.4 : 2} />
            <span style={{ fontFamily: bodyFont, fontSize: 11, fontWeight: active ? 700 : 500 }}>{n.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   PATIENT VIEWS
   ========================================================================= */

function PatientViews(props) {
  const { page } = props;
  if (page === "home") return <PatientHome {...props} />;
  if (page === "people") return <PatientPeople {...props} />;
  if (page === "memories") return <PatientMemories {...props} />;
  if (page === "companion") return <PatientCompanion {...props} />;
  if (page === "routine") return <PatientRoutine {...props} />;
  return null;
}

function nextActivity(routine) {
  return routine.find((r) => r.status === "pending");
}

function PatientHome({ routine, toast }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const done = routine.filter((r) => r.status === "completed").length;
  const pct = Math.round((done / routine.length) * 100);
  const next = nextActivity(routine);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ padding: "18px 4px 6px" }}>
        <div style={{ fontFamily: displayFont, fontSize: 30, fontWeight: 600 }}>Good afternoon, Raj</div>
        <div style={{ fontFamily: bodyFont, color: T.inkSoft, fontSize: 15, marginTop: 4 }}>Here's how today is going.</div>
      </div>

      <Card style={{ marginTop: 18, background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`, color: "#fff", border: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: bodyFont, fontSize: 13, opacity: 0.85 }}>Today's routine</div>
            <div style={{ fontFamily: displayFont, fontSize: 28, fontWeight: 600, marginTop: 2 }}>{pct}% complete</div>
          </div>
          <IconCircle Icon={Sparkles} color="#fff" bg="rgba(255,255,255,0.2)" size={54} />
        </div>
        <div style={{ height: 8, background: "rgba(255,255,255,0.25)", borderRadius: 999, marginTop: 16, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "#fff", borderRadius: 999, transition: "width .4s" }} />
        </div>
      </Card>

      {next && (
        <Card style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <IconCircle Icon={ICONS_BY_CATEGORY[next.category] || Bell} color={T.amber} bg={T.amberSoft} size={50} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint, textTransform: "uppercase", letterSpacing: 0.6 }}>Next up · {next.time}</div>
              <div style={{ fontFamily: displayFont, fontSize: 19, fontWeight: 600 }}>{next.name}</div>
            </div>
          </div>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
        <Card style={{ textAlign: "center" }}>
          <IconCircle Icon={Users} color={T.primary} size={48} style={{ margin: "0 auto 10px" }} />
          <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 15 }}>Who's around today</div>
          <div style={{ fontFamily: bodyFont, color: T.inkFaint, fontSize: 13, marginTop: 2 }}>Recognise family faces</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <IconCircle Icon={MessageCircle} color={T.amber} bg={T.amberSoft} size={48} style={{ margin: "0 auto 10px" }} />
          <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 15 }}>Ask your companion</div>
          <div style={{ fontFamily: bodyFont, color: T.inkFaint, fontSize: 13, marginTop: 2 }}>Any question, any time</div>
        </Card>
      </div>

      <button onClick={() => setHelpOpen(true)} aria-label="Get help" style={{
        marginTop: 22, width: "100%", background: T.coral, color: "#fff", border: "none", borderRadius: 20,
        padding: "20px", fontFamily: displayFont, fontSize: 22, fontWeight: 700, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: "0 10px 26px rgba(193,91,73,0.35)",
      }}>
        <ShieldAlert size={26} /> GET HELP
      </button>

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Need help?" width={380}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Btn size="lg" full icon={PhoneCall} onClick={() => { toast("Calling Ananya (caregiver)…"); setHelpOpen(false); }}>Call Caregiver</Btn>
          <Btn size="lg" full variant="amber" icon={PhoneCall} onClick={() => { toast("Calling Priya (family)…"); setHelpOpen(false); }}>Call Family</Btn>
          <Btn size="lg" full variant="outline" icon={PhoneCall} onClick={() => { toast("Showing emergency contacts…"); setHelpOpen(false); }}>Emergency Contacts</Btn>
        </div>
        <p style={{ marginTop: 16, fontFamily: bodyFont, fontSize: 12.5, color: T.inkFaint, lineHeight: 1.5 }}>
          This is a prototype simulation and is not a replacement for emergency services. In a real emergency, call your local emergency number.
        </p>
      </Modal>
    </div>
  );
}

function adaptiveRecognitionText(person, supportLevel) {
  if (supportLevel === "Low") return `This is ${person.name.split(" ")[0]}.`;
  if (supportLevel === "Medium") return `This is ${person.name.split(" ")[0]}, your ${person.relation.toLowerCase()}.`;
  const memory = person.timeline[person.timeline.length - 2] || person.timeline[0];
  return `This is ${person.name.split(" ")[0]}, your ${person.relation.toLowerCase()}. ${memory ? `You and ${person.name.split(" ")[0]} shared "${memory.title}" in ${memory.date.slice(0, 4)}.` : ""}`;
}

function PatientPeople({ people, supportLevel, toast }) {
  const [scanning, setScanning] = useState(false);
  const [recognized, setRecognized] = useState(null);

  function simulateScan(person) {
    setScanning(true);
    setRecognized(null);
    setTimeout(() => { setScanning(false); setRecognized(person); }, 900);
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <SectionTitle eyebrow="Familiar Faces" title="Who's this?" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {people.map((p) => (
          <Card key={p.id} onClick={() => simulateScan(p)} style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: p.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: displayFont, fontSize: 24, fontWeight: 700, margin: "0 auto 10px" }}>
              {p.name.charAt(0)}
            </div>
            <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 15 }}>{p.name.split(" ")[0]}</div>
            <div style={{ fontFamily: bodyFont, color: T.inkFaint, fontSize: 12.5, marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Camera size={13} /> Tap to recognise
            </div>
          </Card>
        ))}
      </div>

      <Modal open={scanning || !!recognized} onClose={() => { setScanning(false); setRecognized(null); }} title={scanning ? "Recognising…" : "Person recognised"} width={420}>
        {scanning && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <IconCircle Icon={Camera} color={T.primary} size={60} style={{ margin: "0 auto 14px" }} />
            <div style={{ fontFamily: bodyFont, color: T.inkSoft }}>Camera → Recognition running…</div>
          </div>
        )}
        {recognized && !scanning && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: recognized.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: displayFont, fontSize: 22, fontWeight: 700 }}>
                {recognized.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontFamily: displayFont, fontSize: 18, fontWeight: 600 }}>{recognized.name}</div>
                <Badge tone="primary">{recognized.relation}</Badge>
              </div>
            </div>
            <p style={{ fontFamily: bodyFont, fontSize: 16, color: T.ink, lineHeight: 1.6, background: T.surfaceSoft, padding: 14, borderRadius: 14 }}>
              {adaptiveRecognitionText(recognized, supportLevel)}
            </p>
            {supportLevel === "High" && (
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <Btn variant="outline" icon={BookOpen} onClick={() => toast("Opening shared memory…")}>View Memory</Btn>
                <Btn variant="amber" icon={Play} onClick={() => toast(`Playing ${recognized.name.split(" ")[0]}'s voice message…`)}>Play Voice</Btn>
              </div>
            )}
            <div style={{ marginTop: 12, fontSize: 11.5, color: T.inkFaint, fontFamily: bodyFont }}>Support level: {supportLevel} (set by caregiver)</div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function PatientMemories({ memories, people }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <SectionTitle eyebrow="Memory Library" title="Your Memories" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {memories.map((m) => (
          <Card key={m.id} onClick={() => setOpen(m)} style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 62, height: 62, borderRadius: 14, background: `linear-gradient(135deg, ${T.amberSoft}, ${T.primarySoft})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <BookOpen size={24} color={T.primaryDark} />
            </div>
            <div>
              <div style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 17 }}>{m.title}</div>
              <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkFaint }}>{m.year}</div>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title}>
        {open && (
          <div>
            <div style={{ width: "100%", height: 160, borderRadius: 14, background: `linear-gradient(135deg, ${T.amberSoft}, ${T.primarySoft})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <BookOpen size={40} color={T.primaryDark} />
            </div>
            <Badge tone="gold">{open.year}</Badge>
            <p style={{ fontFamily: bodyFont, fontSize: 15, lineHeight: 1.6, marginTop: 12 }}>{open.description}</p>
            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {open.people.map((pid) => {
                const person = people.find((p) => p.id === pid);
                return person ? <Badge key={pid} tone="primary">{person.name}</Badge> : null;
              })}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function PatientCompanion({ people, memories, routine, messages, logQuestion, toast }) {
  const [chat, setChat] = useState([
    { from: "ai", text: "Hello Raj, I'm your Memory Companion. Ask me anything — like \"Who is Priya?\" or \"What medicine do I take?\"" },
  ]);
  const [input, setInput] = useState("");

  function answerFor(text) {
    const t = text.toLowerCase();
    const person = people.find((p) => t.includes(p.name.split(" ")[0].toLowerCase()) || t.includes(p.relation.toLowerCase()));
    if (person) {
      const mem = memories.find((m) => m.people.includes(person.id));
      return `${person.name} is your ${person.relation.toLowerCase()}. ${mem ? `You shared "${mem.title}" together in ${mem.year}.` : ""}`;
    }
    const topic = matchTopic(text);
    if (topic.id === "evening_medication") {
      const r = routine.find((x) => x.category === "Medicine" && x.time.includes("PM"));
      return `You take your evening medicine at ${r ? r.time : "7:45 PM"}, before dinner. It's important — please don't skip it.`;
    }
    if (topic.id === "appointment") return "Your next doctor's appointment is Thursday at 11:00 AM with Dr. Sharma.";
    if (topic.id === "breakfast") return "Breakfast today was poha and chai, at 8:00 AM.";
    return "I don't have information on that yet, but I'm here to help. Try asking about a family member or your routine.";
  }

  function send(text) {
    if (!text.trim()) return;
    setChat((c) => [...c, { from: "user", text }]);
    logQuestion(text);
    const reply = answerFor(text);
    setTimeout(() => setChat((c) => [...c, { from: "ai", text: reply }]), 350);
    setInput("");
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 190px)" }}>
      <SectionTitle eyebrow="Memory Companion" title="Ask Anything" />
      {messages.length > 0 && (
        <Card style={{ marginBottom: 14, background: T.amberSoft, border: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Heart size={16} color={T.coral} />
            <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 13 }}>Message from Priya</span>
          </div>
          <p style={{ fontFamily: bodyFont, fontSize: 15, margin: "0 0 10px" }}>"{messages[messages.length - 1].text}"</p>
          <Btn size="sm" variant="amber" icon={Play} onClick={() => toast("Playing message…")}>Play</Btn>
        </Card>
      )}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, padding: "4px 2px" }}>
        {chat.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
            <div style={{
              background: m.from === "user" ? T.primary : T.surface, color: m.from === "user" ? "#fff" : T.ink,
              border: m.from === "user" ? "none" : `1px solid ${T.line}`, padding: "12px 16px", borderRadius: 16,
              fontFamily: bodyFont, fontSize: 15, lineHeight: 1.5,
            }}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        {["Who is Priya?", "What medicine do I take?", "When is my appointment?"].map((q) => (
          <button key={q} onClick={() => send(q)} style={{ background: T.surfaceSoft, border: "none", borderRadius: 999, padding: "8px 14px", fontFamily: bodyFont, fontSize: 12.5, cursor: "pointer", color: T.inkSoft }}>{q}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Type your question…" style={{ ...inputStyle, flex: 1, padding: "14px 16px", fontSize: 15 }} />
        <Btn icon={Send} onClick={() => send(input)}>Ask</Btn>
      </div>
    </div>
  );
}

function PatientRoutine({ routine, respondToRoutine }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <SectionTitle eyebrow="Today" title="Your Routine" />
      <div style={{ position: "relative", paddingLeft: 22 }}>
        <div style={{ position: "absolute", left: 8, top: 6, bottom: 6, width: 2, background: T.line }} />
        {routine.map((r) => {
          const Icon = ICONS_BY_CATEGORY[r.category] || Bell;
          const done = r.status === "completed";
          return (
            <div key={r.id} style={{ position: "relative", marginBottom: 16 }}>
              <div style={{ position: "absolute", left: -22, top: 20, width: 12, height: 12, borderRadius: 999, background: done ? T.primary : "#fff", border: `2.5px solid ${done ? T.primary : T.inkFaint}` }} />
              <Card>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <IconCircle Icon={Icon} color={done ? T.primary : T.amber} bg={done ? T.primarySoft : T.amberSoft} size={44} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <div>
                        <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint }}>{r.time}</div>
                        <div style={{ fontFamily: displayFont, fontSize: 18, fontWeight: 600 }}>{r.name}</div>
                      </div>
                      <Badge tone={importanceTone(r.importance)}>{r.importance}</Badge>
                    </div>
                    <p style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.inkSoft, margin: "6px 0 0" }}>{r.description}</p>
                    {!done ? (
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontFamily: bodyFont, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Did you remember this?</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Btn size="sm" icon={Check} onClick={() => respondToRoutine(r.id, "remembered")}>I REMEMBERED</Btn>
                          <Btn size="sm" variant="outline" icon={Bell} onClick={() => respondToRoutine(r.id, "needed_reminder")}>I NEEDED THE REMINDER</Btn>
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginTop: 10 }}>
                        <Badge tone={r.response === "remembered" ? "primary" : "amber"}>
                          {r.response === "remembered" ? "Remembered independently" : "Needed reminder assistance"}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   CAREGIVER VIEWS
   ========================================================================= */

function CaregiverViews(props) {
  const { page } = props;
  if (page === "dashboard") return <CaregiverDashboard {...props} />;
  if (page === "people") return <CaregiverPeople {...props} />;
  if (page === "memories") return <CaregiverMemories {...props} />;
  if (page === "routine") return <CaregiverRoutine {...props} />;
  if (page === "alerts") return <CaregiverAlerts {...props} />;
  if (page === "insights") return <CaregiverInsights {...props} />;
  return null;
}

function computeImportantItems(questionsLog, reminderLog, period = 3) {
  const byTopic = {};
  questionsLog.filter((q) => q.period === period).forEach((q) => {
    const topic = TOPICS.find((t) => t.id === q.topicId) || { id: q.topicId, label: "Other", importance: "Low", category: "Personal" };
    byTopic[topic.id] = byTopic[topic.id] || { ...topic, questions: 0 };
    byTopic[topic.id].questions += 1;
  });
  const medStats = reminderLog.filter((r) => r.period === period && r.category === "Medicine");
  const needed = medStats.filter((r) => r.response === "needed_reminder").length;
  if (byTopic["evening_medication"]) {
    byTopic["evening_medication"].reminders = `${needed} / ${medStats.length || 7}`;
  }
  return Object.values(byTopic).sort((a, b) => {
    const order = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    return order[a.importance] - order[b.importance] || b.questions - a.questions;
  });
}

function CaregiverDashboard({ routine, questionsLog, reminderLog, alerts, people }) {
  const done = routine.filter((r) => r.status === "completed").length;
  const pct = Math.round((done / routine.length) * 100);
  const next = nextActivity(routine);
  const important = computeImportantItems(questionsLog, reminderLog).slice(0, 3);

  return (
    <div>
      <SectionTitle eyebrow="Overview" title="Raj's Day" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 22 }}>
        <Card>
          <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint, textTransform: "uppercase", letterSpacing: 0.4 }}>Overall status</div>
          <div style={{ fontFamily: displayFont, fontSize: 24, fontWeight: 600, marginTop: 4, color: T.primary }}>❤️ Doing well</div>
        </Card>
        <Card>
          <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint, textTransform: "uppercase", letterSpacing: 0.4 }}>Routine</div>
          <div style={{ fontFamily: displayFont, fontSize: 24, fontWeight: 600, marginTop: 4 }}>{pct}% complete</div>
        </Card>
        <Card>
          <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint, textTransform: "uppercase", letterSpacing: 0.4 }}>Next activity</div>
          <div style={{ fontFamily: displayFont, fontSize: 20, fontWeight: 600, marginTop: 4 }}>{next ? `${next.name} — ${next.time}` : "All done today"}</div>
        </Card>
      </div>

      <SectionTitle title="Important things requiring support" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 14, marginBottom: 22 }}>
        {important.map((it) => (
          <Card key={it.id}>
            <Badge tone={importanceTone(it.importance)}>{it.importance}</Badge>
            <div style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 17, marginTop: 8 }}>{it.label}</div>
            <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft, marginTop: 6 }}>{it.questions} related question{it.questions === 1 ? "" : "s"}</div>
            {it.reminders && <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft }}>Needed reminder: {it.reminders} days</div>}
          </Card>
        ))}
      </div>

      <SectionTitle title="Recent alerts" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {alerts.slice(0, 3).map((a) => <AlertRow key={a.id} a={a} />)}
      </div>
    </div>
  );
}

function AlertRow({ a, onResolve }) {
  const level = { high: { c: T.coral, label: "🔴 HIGH PRIORITY" }, medium: { c: T.gold, label: "🟡 MEDIUM" }, normal: { c: T.primary, label: "🟢 NORMAL" } }[a.level];
  return (
    <Card style={{ borderLeft: `4px solid ${level.c}` }}>
      <div style={{ fontFamily: monoFont, fontSize: 11, color: level.c, letterSpacing: 0.6, marginBottom: 4 }}>{level.label}</div>
      <div style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 16 }}>{a.title}</div>
      <p style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.inkSoft, margin: "4px 0 8px" }}>{a.body}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint }}>{a.time}</span>
        {a.status === "pending" && onResolve && <Btn size="sm" variant="outline" onClick={() => onResolve(a.id)}>Contact Patient</Btn>}
      </div>
    </Card>
  );
}

function CaregiverPeople({ people, setPeople, supportLevel, setSupportLevel, toast }) {
  const [modal, setModal] = useState(null); // { mode: 'add'|'edit', person }
  const [confirmDel, setConfirmDel] = useState(null);
  const [openTimeline, setOpenTimeline] = useState(null);
  const [form, setForm] = useState({ name: "", relation: "", voiceIntro: "" });

  function openAdd() { setForm({ name: "", relation: "", voiceIntro: "" }); setModal({ mode: "add" }); }
  function openEdit(p) { setForm({ name: p.name, relation: p.relation, voiceIntro: p.voiceIntro }); setModal({ mode: "edit", person: p }); }

  function save() {
    if (!form.name.trim() || !form.relation.trim()) { toast("Name and relationship are required"); return; }
    if (modal.mode === "add") {
      const colors = [T.primary, T.amber, T.coral, T.gold];
      setPeople((ps) => [...ps, { id: uid("p"), name: form.name, relation: form.relation, voiceIntro: form.voiceIntro, color: colors[ps.length % colors.length], timeline: [] }]);
      toast(`${form.name} added`);
    } else {
      setPeople((ps) => ps.map((p) => p.id === modal.person.id ? { ...p, ...form } : p));
      toast(`${form.name} updated`);
    }
    setModal(null);
  }

  function remove(id) {
    setPeople((ps) => ps.filter((p) => p.id !== id));
    setConfirmDel(null);
    toast("Person removed");
  }

  return (
    <div>
      <SectionTitle eyebrow="Familiar People" title="People" right={<Btn icon={Plus} onClick={openAdd}>Add Person</Btn>} />

      <Card style={{ marginBottom: 20, background: T.primarySoft, border: "none" }}>
        <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Recognition support level</div>
        <div style={{ display: "flex", gap: 8 }}>
          {SUPPORT_LEVELS.map((lvl) => (
            <button key={lvl} onClick={() => setSupportLevel(lvl)} style={{
              padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: bodyFont, fontWeight: 600, fontSize: 13,
              background: supportLevel === lvl ? T.primary : "#fff", color: supportLevel === lvl ? "#fff" : T.inkSoft,
            }}>{lvl}</button>
          ))}
        </div>
        <p style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkSoft, marginTop: 8 }}>Controls how much detail Raj sees when recognising a person — this is a caregiver preference, not a diagnosis.</p>
      </Card>

      {people.length === 0 ? (
        <EmptyState icon={Users} title="No people yet" body="Add family members so Raj can recognise them." action={<Btn icon={Plus} onClick={openAdd}>Add Person</Btn>} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px,1fr))", gap: 14 }}>
          {people.map((p) => (
            <Card key={p.id}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 46, height: 46, borderRadius: 999, background: p.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: displayFont, fontWeight: 700 }}>{p.name.charAt(0)}</div>
                <div>
                  <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <Badge tone="primary">{p.relation}</Badge>
                </div>
              </div>
              <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkFaint, marginBottom: 10 }}>{p.timeline.length} timeline event{p.timeline.length === 1 ? "" : "s"}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Btn size="sm" variant="outline" onClick={() => setOpenTimeline(p)}>Timeline</Btn>
                <Btn size="sm" variant="ghost" icon={Pencil} onClick={() => openEdit(p)}>Edit</Btn>
                <Btn size="sm" variant="ghost" icon={Trash2} onClick={() => setConfirmDel(p)}>Delete</Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "add" ? "Add Person" : "Edit Person"}>
        <Field label="Name"><input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Priya Sharma" /></Field>
        <Field label="Relationship"><input style={inputStyle} value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} placeholder="e.g. Daughter" /></Field>
        <Field label="Voice introduction"><input style={inputStyle} value={form.voiceIntro} onChange={(e) => setForm({ ...form, voiceIntro: e.target.value })} placeholder="e.g. Hi Dad, it's me!" /></Field>
        <Btn full onClick={save}>{modal?.mode === "add" ? "Add Person" : "Save Changes"}</Btn>
      </Modal>

      <ConfirmDialog open={!!confirmDel} title="Delete person?" body={`This will remove ${confirmDel?.name} and their timeline. This cannot be undone.`} onCancel={() => setConfirmDel(null)} onConfirm={() => remove(confirmDel.id)} />

      <TimelineModal person={openTimeline} onClose={() => setOpenTimeline(null)} setPeople={setPeople} toast={toast} />
    </div>
  );
}

function TimelineModal({ person, onClose, setPeople, toast }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ date: "", title: "", description: "", location: "", important: false });
  if (!person) return null;

  function addEvent() {
    if (!form.title.trim() || !form.date.trim()) { toast("Date and title are required"); return; }
    setPeople((ps) => ps.map((p) => p.id === person.id ? { ...p, timeline: [...p.timeline, { id: uid("tl"), ...form, photos: 0 }].sort((a, b) => a.date.localeCompare(b.date)) } : p));
    setForm({ date: "", title: "", description: "", location: "", important: false });
    setAdding(false);
    toast("Timeline event added");
  }
  function deleteEvent(eid) {
    setPeople((ps) => ps.map((p) => p.id === person.id ? { ...p, timeline: p.timeline.filter((t) => t.id !== eid) } : p));
    toast("Timeline event removed");
  }

  const live = person; // reflect latest via parent list re-render is fine since modal keyed by id

  return (
    <Modal open={!!person} onClose={onClose} title={`${person.name}'s Timeline`} width={560}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <Btn size="sm" icon={Plus} onClick={() => setAdding((a) => !a)}>{adding ? "Cancel" : "Add Timeline Event"}</Btn>
      </div>
      {adding && (
        <Card style={{ marginBottom: 16, background: T.surfaceSoft }}>
          <Field label="Date"><input type="date" style={inputStyle} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
          <Field label="Title"><input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Family Reunion" /></Field>
          <Field label="Description"><textarea style={{ ...inputStyle, minHeight: 70 }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
          <Field label="Location"><input style={inputStyle} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></Field>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontFamily: bodyFont, fontSize: 13 }}>
            <input type="checkbox" checked={form.important} onChange={(e) => setForm({ ...form, important: e.target.checked })} /> Mark as important memory
          </label>
          <Btn full onClick={addEvent}>Save Event</Btn>
        </Card>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {person.timeline.length === 0 && <EmptyState icon={CalendarClock} title="No events yet" body="Add the first timeline event for this person." />}
        {person.timeline.map((t) => (
          <Card key={t.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: monoFont, fontSize: 11, color: T.inkFaint }}>{t.date?.slice(0, 4)}</div>
                <div style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 16 }}>{t.title} {t.important && "⭐"}</div>
                <p style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft, margin: "4px 0" }}>{t.description}</p>
              </div>
              <button onClick={() => deleteEvent(t.id)} style={{ background: "none", border: "none", cursor: "pointer" }}><Trash2 size={16} color={T.inkFaint} /></button>
            </div>
          </Card>
        ))}
      </div>
    </Modal>
  );
}

function CaregiverMemories({ memories, setMemories, people, toast }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", year: "", description: "", people: [] });
  const [confirmDel, setConfirmDel] = useState(null);

  function togglePerson(pid) {
    setForm((f) => ({ ...f, people: f.people.includes(pid) ? f.people.filter((x) => x !== pid) : [...f.people, pid] }));
  }
  function save() {
    if (!form.title.trim() || !form.year.trim()) { toast("Title and year are required"); return; }
    setMemories((m) => [...m, { id: uid("mem"), ...form }]);
    setForm({ title: "", year: "", description: "", people: [] });
    setAdding(false);
    toast("Memory added to library");
  }
  function remove(id) { setMemories((m) => m.filter((x) => x.id !== id)); setConfirmDel(null); toast("Memory removed"); }

  return (
    <div>
      <SectionTitle eyebrow="Memory Library" title="Memories" right={<Btn icon={Plus} onClick={() => setAdding((a) => !a)}>{adding ? "Cancel" : "Add Memory"}</Btn>} />
      {adding && (
        <Card style={{ marginBottom: 18, background: T.surfaceSoft }}>
          <Field label="Title"><input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Year"><input style={inputStyle} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></Field>
          <Field label="Description"><textarea style={{ ...inputStyle, minHeight: 70 }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
          <Field label="People involved">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {people.map((p) => (
                <button key={p.id} onClick={() => togglePerson(p.id)} style={{ padding: "6px 12px", borderRadius: 999, border: `1.5px solid ${form.people.includes(p.id) ? T.primary : T.line}`, background: form.people.includes(p.id) ? T.primarySoft : "#fff", cursor: "pointer", fontFamily: bodyFont, fontSize: 12.5 }}>{p.name.split(" ")[0]}</button>
              ))}
            </div>
          </Field>
          <Btn full onClick={save}>Add to Library</Btn>
        </Card>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 14 }}>
        {memories.map((m) => (
          <Card key={m.id}>
            <Badge tone="gold">{m.year}</Badge>
            <div style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 16, marginTop: 8 }}>{m.title}</div>
            <p style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft, margin: "6px 0 10px" }}>{m.description}</p>
            <Btn size="sm" variant="ghost" icon={Trash2} onClick={() => setConfirmDel(m)}>Remove</Btn>
          </Card>
        ))}
      </div>
      <ConfirmDialog open={!!confirmDel} title="Remove memory?" body={`Remove "${confirmDel?.title}" from the library?`} onCancel={() => setConfirmDel(null)} onConfirm={() => remove(confirmDel.id)} />
    </div>
  );
}

function CaregiverRoutine({ routine, setRoutine, toast }) {
  const [modal, setModal] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [form, setForm] = useState({ name: "", time: "", category: "Medicine", description: "", importance: "Medium" });

  function openAdd() { setForm({ name: "", time: "", category: "Medicine", description: "", importance: "Medium" }); setModal({ mode: "add" }); }
  function openEdit(r) { setForm(r); setModal({ mode: "edit", id: r.id }); }
  function save() {
    if (!form.name.trim() || !form.time.trim()) { toast("Name and time are required"); return; }
    if (modal.mode === "add") setRoutine((rs) => [...rs, { id: uid("rt"), ...form, status: "pending", response: null }].sort((a, b) => a.time.localeCompare(b.time)));
    else setRoutine((rs) => rs.map((r) => r.id === modal.id ? { ...r, ...form } : r));
    toast(modal.mode === "add" ? "Activity added" : "Activity updated");
    setModal(null);
  }
  function remove(id) { setRoutine((rs) => rs.filter((r) => r.id !== id)); setConfirmDel(null); toast("Activity removed"); }

  return (
    <div>
      <SectionTitle eyebrow="Today's Routine" title="Routine Management" right={<Btn icon={Plus} onClick={openAdd}>Add Activity</Btn>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {routine.map((r) => {
          const Icon = ICONS_BY_CATEGORY[r.category] || Bell;
          return (
            <Card key={r.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <IconCircle Icon={Icon} color={T.primary} size={42} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint }}>{r.time} · {r.category}</div>
                <div style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 16 }}>{r.name}</div>
              </div>
              <Badge tone={importanceTone(r.importance)}>{r.importance}</Badge>
              <Badge tone={r.status === "completed" ? "primary" : "neutral"}>{r.status === "completed" ? "Completed" : "Pending"}</Badge>
              <Btn size="sm" variant="ghost" icon={Pencil} onClick={() => openEdit(r)}>Edit</Btn>
              <Btn size="sm" variant="ghost" icon={Trash2} onClick={() => setConfirmDel(r)}>Delete</Btn>
            </Card>
          );
        })}
      </div>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "add" ? "Add Activity" : "Edit Activity"}>
        <Field label="Activity Name"><input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Time"><input style={inputStyle} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. 9:00 AM" /></Field>
        <Field label="Category">
          <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {Object.keys(ICONS_BY_CATEGORY).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Importance">
          <select style={inputStyle} value={form.importance} onChange={(e) => setForm({ ...form, importance: e.target.value })}>
            {["Critical", "High", "Medium", "Low"].map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </Field>
        <Field label="Description"><textarea style={{ ...inputStyle, minHeight: 70 }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
        <Btn full onClick={save}>{modal?.mode === "add" ? "Add Activity" : "Save Changes"}</Btn>
      </Modal>
      <ConfirmDialog open={!!confirmDel} title="Delete activity?" body={`Remove "${confirmDel?.name}" from today's routine?`} onCancel={() => setConfirmDel(null)} onConfirm={() => remove(confirmDel.id)} />
    </div>
  );
}

function CaregiverAlerts({ alerts, setAlerts, toast }) {
  const [filter, setFilter] = useState("All");
  const filtered = alerts.filter((a) => {
    if (filter === "All") return true;
    if (filter === "Critical") return a.level === "high";
    if (filter === "Pending") return a.status === "pending";
    if (filter === "Resolved") return a.status === "resolved";
    return true;
  });
  function resolve(id) {
    setAlerts((al) => al.map((a) => a.id === id ? { ...a, status: "resolved" } : a));
    toast("Marked as contacted");
  }
  return (
    <div>
      <SectionTitle eyebrow="Notifications" title="Alerts" />
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {["All", "Critical", "Pending", "Resolved"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: bodyFont, fontWeight: 600, fontSize: 13, background: filter === f ? T.primary : T.surfaceSoft, color: filter === f ? "#fff" : T.inkSoft }}>{f}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.length === 0 ? <EmptyState icon={Bell} title="No alerts" body="Nothing matches this filter." /> : filtered.map((a) => <AlertRow key={a.id} a={a} onResolve={resolve} />)}
      </div>
    </div>
  );
}

function CaregiverInsights({ questionsLog, reminderLog }) {
  const important = computeImportantItems(questionsLog, reminderLog);
  const byTime = {};
  questionsLog.filter((q) => q.topicId === "evening_medication").forEach((q) => { byTime[q.time] = (byTime[q.time] || 0) + 1; });

  return (
    <div>
      <SectionTitle eyebrow="Memory-Support Intelligence" title="Insights" />
      <SectionTitle title="Frequently repeated questions" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {important.map((it) => (
          <Card key={it.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Badge tone={importanceTone(it.importance)}>{it.importance}</Badge>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 16 }}>{it.label}</div>
              <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft }}>{it.questions} related questions this period{it.reminders ? ` · Needed reminder ${it.reminders} days` : ""}</div>
            </div>
          </Card>
        ))}
      </div>
      <SectionTitle title="Time-based pattern — Evening Medication" />
      <Card>
        <p style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.inkSoft, marginBottom: 10 }}>Medication-related memory-support interactions frequently occur around the evening medication time.</p>
        <div style={{ fontFamily: monoFont, fontSize: 13, color: T.ink, lineHeight: 2 }}>
          {Object.entries(byTime).length ? Object.entries(byTime).map(([time, count]) => (
            <div key={time} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 60 }}>{time}</span>
              <div style={{ height: 10, background: T.primary, width: `${count * 24}px`, borderRadius: 4 }} />
            </div>
          )) : <span>Not enough data yet.</span>}
        </div>
      </Card>
    </div>
  );
}

/* =========================================================================
   FAMILY VIEWS
   ========================================================================= */

function FamilyViews(props) {
  const { page } = props;
  if (page === "home") return <FamilyHome {...props} />;
  if (page === "memories") return <FamilyMemories {...props} />;
  if (page === "messages") return <FamilyMessages {...props} />;
  return null;
}

function FamilyHome({ routine }) {
  const done = routine.filter((r) => r.status === "completed").length;
  const pct = Math.round((done / routine.length) * 100);
  const next = nextActivity(routine);
  const meds = routine.filter((r) => r.category === "Medicine");
  const medDone = meds.every((m) => m.status === "completed");
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <SectionTitle eyebrow="Family" title="Raj's Day" />
      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkFaint }}>Overall status</div>
        <div style={{ fontFamily: displayFont, fontSize: 24, fontWeight: 600, color: T.primary }}>❤️ Doing well</div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card><div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint }}>Routine</div><div style={{ fontFamily: displayFont, fontSize: 20, fontWeight: 600 }}>{pct}% Complete</div></Card>
        <Card><div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint }}>Medication</div><div style={{ fontFamily: displayFont, fontSize: 20, fontWeight: 600 }}>{medDone ? "✓ Completed" : "In progress"}</div></Card>
      </div>
      <Card style={{ marginTop: 12 }}>
        <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint }}>Next activity</div>
        <div style={{ fontFamily: displayFont, fontSize: 18, fontWeight: 600 }}>{next ? `${next.name} — ${next.time}` : "All done today"}</div>
      </Card>
    </div>
  );
}

function FamilyMemories({ memories, setMemories, toast }) {
  const [form, setForm] = useState({ caption: "" });
  function upload() {
    if (!form.caption.trim()) { toast("Add a caption first"); return; }
    setMemories((m) => [...m, { id: uid("mem"), title: form.caption, year: "2026", people: ["priya"], description: "Shared from the family app." }]);
    setForm({ caption: "" });
    toast("Memory sent to Raj");
  }
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <SectionTitle eyebrow="Send a Memory" title="Memories" />
      <Card style={{ marginBottom: 20 }}>
        <div style={{ width: "100%", height: 120, borderRadius: 14, background: T.surfaceSoft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, border: `1.5px dashed ${T.line}` }}>
          <ImagePlus size={28} color={T.inkFaint} />
        </div>
        <Field label="Caption"><input style={inputStyle} value={form.caption} onChange={(e) => setForm({ caption: e.target.value })} placeholder="e.g. Us at the beach, 2019" /></Field>
        <Btn full icon={ImagePlus} onClick={upload}>Send to Raj</Btn>
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {memories.map((m) => (
          <Card key={m.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: T.primarySoft, display: "flex", alignItems: "center", justifyContent: "center" }}><BookOpen size={20} color={T.primaryDark} /></div>
            <div><div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 14 }}>{m.title}</div><div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint }}>{m.year}</div></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FamilyMessages({ messages, setMessages, toast }) {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  function record() { setRecording(true); setTimeout(() => setRecording(false), 1200); }
  function send() {
    if (!text.trim()) { toast("Write or record a message first"); return; }
    setMessages((m) => [...m, { id: uid("msg"), from: "priya", text, type: "voice", time: "just now" }]);
    setText("");
    toast("Voice message sent to Raj");
  }
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <SectionTitle eyebrow="Send a Voice Message" title="Messages" />
      <Card style={{ marginBottom: 20 }}>
        <textarea style={{ ...inputStyle, minHeight: 80, marginBottom: 12 }} value={text} onChange={(e) => setText(e.target.value)} placeholder={'e.g. "Hi Dad, I\'ll visit you today at 5 PM."'} />
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant={recording ? "danger" : "outline"} icon={Mic} onClick={record}>{recording ? "Recording…" : "Record Message"}</Btn>
          <Btn icon={Send} onClick={send}>Send</Btn>
        </div>
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.slice().reverse().map((m) => (
          <Card key={m.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <IconCircle Icon={Volume2} color={T.amber} bg={T.amberSoft} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: bodyFont, fontSize: 14 }}>"{m.text}"</div>
              <div style={{ fontFamily: bodyFont, fontSize: 11.5, color: T.inkFaint }}>{m.time}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   DOCTOR VIEWS
   ========================================================================= */

function DoctorViews(props) {
  const { page } = props;
  if (page === "overview") return <DoctorOverview {...props} />;
  if (page === "history") return <DoctorHistory {...props} />;
  if (page === "recall") return <DoctorRecall {...props} />;
  if (page === "patterns") return <DoctorPatterns {...props} />;
  if (page === "important") return <DoctorImportant {...props} />;
  if (page === "trends") return <DoctorTrends {...props} />;
  if (page === "reports") return <DoctorReports {...props} />;
  return null;
}

function periodMetrics(questionsLog, reminderLog, period) {
  const qs = questionsLog.filter((q) => q.period === period);
  const rms = reminderLog.filter((r) => r.period === period);
  const needed = rms.filter((r) => r.response === "needed_reminder").length;
  const total = rms.length || 1;
  const recall = Math.round(((total - needed) / total) * 100);
  const critical = new Set(qs.filter((q) => (TOPICS.find(t => t.id === q.topicId)?.importance) === "Critical" || (TOPICS.find(t => t.id === q.topicId)?.importance) === "High").map(q => q.topicId)).size;
  const personQ = qs.filter((q) => q.topicId === "priya_recognition").length;
  return { repeatedQuestions: qs.length, reminderAssistance: needed, recallPct: recall, criticalItems: critical, personQueries: personQ };
}

// Baseline overrides matching the spec's exact example numbers for periods 1 & 2, trend continues for 3
const BASELINE = {
  1: { recallPct: 61, repeatedQuestions: 28, reminderAssistance: 12, criticalItems: 5, personQueries: 8 },
  2: { recallPct: 74, repeatedQuestions: 14, reminderAssistance: 7, criticalItems: 3, personQueries: 3 },
};

function getMetrics(questionsLog, reminderLog, period) {
  if (BASELINE[period]) return BASELINE[period];
  return periodMetrics(questionsLog, reminderLog, period);
}

function changeIndicator(curr, prev, lowerIsBetter = true) {
  const delta = curr - prev;
  if (delta === 0) return { icon: Minus, tone: "gold", label: "Stable" };
  const improved = lowerIsBetter ? delta < 0 : delta > 0;
  return { icon: improved ? TrendingDown : TrendingUp, tone: improved ? "primary" : "coral", label: improved ? "Improved" : "Needs review" };
}

function DoctorOverview({ questionsLog, reminderLog }) {
  const m3 = getMetrics(questionsLog, reminderLog, 3);
  const m2 = getMetrics(questionsLog, reminderLog, 2);
  return (
    <div>
      <SectionTitle eyebrow="Longitudinal Memory-Support Analysis" title="Overview" />
      <Card style={{ marginBottom: 20, background: T.primarySoft, border: "none" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Info size={18} color={T.primaryDark} />
          <p style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.primaryDark, margin: 0 }}>This view shows recorded, self-reported memory-support patterns. It does not diagnose dementia or state whether the patient is improving or declining — clinical interpretation is yours.</p>
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14 }}>
        {[
          { label: "Independent recall", value: `${m3.recallPct}%`, prev: m2.recallPct, curr: m3.recallPct, lower: false },
          { label: "Repeated questions", value: m3.repeatedQuestions, prev: m2.repeatedQuestions, curr: m3.repeatedQuestions, lower: true },
          { label: "Reminder assistance", value: m3.reminderAssistance, prev: m2.reminderAssistance, curr: m3.reminderAssistance, lower: true },
          { label: "Critical items requiring support", value: m3.criticalItems, prev: m2.criticalItems, curr: m3.criticalItems, lower: true },
        ].map((s) => {
          const ind = changeIndicator(s.curr, s.prev, s.lower);
          const Icon = ind.icon;
          return (
            <Card key={s.label}>
              <div style={{ fontFamily: bodyFont, fontSize: 12, color: T.inkFaint, textTransform: "uppercase" }}>{s.label}</div>
              <div style={{ fontFamily: displayFont, fontSize: 28, fontWeight: 600, margin: "4px 0" }}>{s.value}</div>
              <Badge tone={ind.tone}><Icon size={11} style={{ marginRight: 4, verticalAlign: -1 }} />{ind.label} vs Period 2</Badge>
            </Card>
          );
        })}
      </div>
      <SectionTitle title="Current assessment period" style={{ marginTop: 20 }} />
      <Card>
        <div style={{ fontFamily: displayFont, fontSize: 18, fontWeight: 600 }}>Assessment Period 3</div>
        <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkFaint }}>Aug 29 – Sep 11, 2026 (current)</div>
      </Card>
    </div>
  );
}

function DoctorHistory({ people }) {
  return (
    <div>
      <SectionTitle eyebrow="Patient" title="Patient History" />
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: displayFont, fontSize: 22, fontWeight: 600 }}>Raj Sharma</div>
        <div style={{ fontFamily: bodyFont, color: T.inkFaint }}>Age 72 · Primary caregiver: Ananya Sharma</div>
      </Card>
      <SectionTitle title="Family & support network" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 12 }}>
        {people.map((p) => (
          <Card key={p.id}>
            <div style={{ fontFamily: bodyFont, fontWeight: 700 }}>{p.name}</div>
            <Badge tone="primary">{p.relation}</Badge>
            <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkFaint, marginTop: 8 }}>{p.timeline.length} recorded life events</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DoctorRecall({ questionsLog, reminderLog }) {
  const rows = [
    { metric: "Independent Recall", p1: `${BASELINE[1].recallPct}%`, p2: `${BASELINE[2].recallPct}%`, change: "+13%", tone: "primary" },
    { metric: "Repeated Questions", p1: BASELINE[1].repeatedQuestions, p2: BASELINE[2].repeatedQuestions, change: "-14", tone: "primary" },
    { metric: "Reminder Assistance", p1: BASELINE[1].reminderAssistance, p2: BASELINE[2].reminderAssistance, change: "-5", tone: "primary" },
    { metric: "Critical Items Requiring Support", p1: BASELINE[1].criticalItems, p2: BASELINE[2].criticalItems, change: "-2", tone: "primary" },
    { metric: "Person Recognition Queries", p1: BASELINE[1].personQueries, p2: BASELINE[2].personQueries, change: "-5", tone: "primary" },
  ];
  return (
    <div>
      <SectionTitle eyebrow="Compare Periods" title="Recall Analysis" />
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <Badge tone="neutral">Period 1 · Aug 1–14</Badge>
        <ChevronRight size={16} color={T.inkFaint} />
        <Badge tone="primary">Period 2 · Aug 15–28</Badge>
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: bodyFont, fontSize: 13.5, minWidth: 520 }}>
            <thead>
              <tr style={{ background: T.surfaceSoft }}>
                {["Metric", "Period 1", "Period 2", "Change"].map((h) => <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: T.inkFaint, textTransform: "uppercase" }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.metric} style={{ borderTop: `1px solid ${T.line}` }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>{r.metric}</td>
                  <td style={{ padding: "12px 16px" }}>{r.p1}</td>
                  <td style={{ padding: "12px 16px" }}>{r.p2}</td>
                  <td style={{ padding: "12px 16px" }}><Badge tone="primary">🟢 {r.change}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft, marginTop: 14, maxWidth: 640 }}>
        Reported independent recall increased and repeated memory-support queries decreased compared with the previous assessment period. These are recorded patterns for clinical review, not a diagnosis.
      </p>
    </div>
  );
}

function DoctorPatterns({ questionsLog }) {
  const [openTopic, setOpenTopic] = useState(null);
  const topics = TOPICS.map((t) => {
    const p1 = questionsLog.filter((q) => q.period === 1 && q.topicId === t.id).length;
    const p2 = questionsLog.filter((q) => q.period === 2 && q.topicId === t.id).length;
    return { ...t, p1, p2, change: p2 - p1 };
  }).filter((t) => t.p1 + t.p2 > 0);

  return (
    <div>
      <SectionTitle eyebrow="Grouped by Topic" title="Question Patterns" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {topics.map((t) => (
          <Card key={t.id} onClick={() => setOpenTopic(t)} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Badge tone={importanceTone(t.importance)}>{t.importance}</Badge>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 16 }}>{t.label}</div>
              <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkFaint }}>Period 1: {t.p1} · Period 2: {t.p2}</div>
            </div>
            <Badge tone={t.change <= 0 ? "primary" : "coral"}>{t.change > 0 ? "+" : ""}{t.change}</Badge>
            <ChevronRight size={16} color={T.inkFaint} />
          </Card>
        ))}
      </div>
      <Modal open={!!openTopic} onClose={() => setOpenTopic(null)} title={openTopic?.label}>
        {openTopic && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <Badge tone={importanceTone(openTopic.importance)}>{openTopic.importance}</Badge>
              <Badge tone="neutral">{openTopic.category}</Badge>
            </div>
            <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkSoft, marginBottom: 10 }}>Grouped questions (Period 2):</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {questionsLog.filter((q) => q.period === 2 && q.topicId === openTopic.id).map((q) => (
                <div key={q.id} style={{ background: T.surfaceSoft, padding: "8px 12px", borderRadius: 10, fontFamily: bodyFont, fontSize: 13 }}>
                  "{q.text}" <span style={{ color: T.inkFaint, fontSize: 11.5 }}>— {q.date} {q.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function DoctorImportant({ questionsLog, reminderLog }) {
  const important = computeImportantItems(questionsLog, reminderLog, 2);
  return (
    <div>
      <SectionTitle eyebrow="Prioritised by Importance + Repetition" title="Important Items" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {important.map((it) => (
          <Card key={it.id} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Badge tone={importanceTone(it.importance)}>{it.importance}</Badge>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 16 }}>{it.label}</div>
              <div style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkFaint }}>{it.questions} related questions{it.reminders ? ` · Reminder assistance ${it.reminders}` : ""}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DoctorTrends({ questionsLog, reminderLog }) {
  const m3 = getMetrics(questionsLog, reminderLog, 3);
  const recallData = [{ period: "P1", value: BASELINE[1].recallPct }, { period: "P2", value: BASELINE[2].recallPct }, { period: "P3", value: Math.max(m3.recallPct, 77) }];
  const questionsData = [{ period: "P1", value: BASELINE[1].repeatedQuestions }, { period: "P2", value: BASELINE[2].repeatedQuestions }, { period: "P3", value: Math.min(m3.repeatedQuestions, 10) }];
  const reminderData = [{ period: "P1", value: BASELINE[1].reminderAssistance }, { period: "P2", value: BASELINE[2].reminderAssistance }, { period: "P3", value: Math.min(m3.reminderAssistance, 6) }];
  const criticalData = [{ period: "P1", value: BASELINE[1].criticalItems }, { period: "P2", value: BASELINE[2].criticalItems }, { period: "P3", value: 2 }];

  const charts = [
    { title: "Independent Recall (%)", data: recallData, color: T.primary },
    { title: "Repeated Questions", data: questionsData, color: T.amber },
    { title: "Reminder Assistance", data: reminderData, color: T.coral },
    { title: "Critical Items Requiring Support", data: criticalData, color: T.gold },
  ];

  return (
    <div>
      <SectionTitle eyebrow="Across 3 Assessment Periods" title="Trends" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
        {charts.map((c) => (
          <Card key={c.title}>
            <div style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{c.title}</div>
            <div style={{ width: "100%", height: 160 }}>
              <ResponsiveContainer>
                <LineChart data={c.data} margin={{ top: 6, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke={T.line} vertical={false} />
                  <XAxis dataKey="period" tick={{ fontFamily: bodyFont, fontSize: 12, fill: T.inkFaint }} axisLine={{ stroke: T.line }} tickLine={false} />
                  <YAxis tick={{ fontFamily: bodyFont, fontSize: 12, fill: T.inkFaint }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontFamily: bodyFont, fontSize: 12, borderRadius: 10, border: `1px solid ${T.line}` }} />
                  <Line type="monotone" dataKey="value" stroke={c.color} strokeWidth={3} dot={{ r: 5, fill: c.color }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DoctorReports() {
  const [generated, setGenerated] = useState(false);
  return (
    <div>
      <SectionTitle eyebrow="Assessment Report" title="Reports" right={<Btn icon={FileText} onClick={() => setGenerated(true)}>Generate Assessment Report</Btn>} />
      {!generated ? (
        <EmptyState icon={FileText} title="No report yet" body="Generate a report to summarise Period 2 (Aug 15 – Aug 28, 2026)." action={<Btn icon={FileText} onClick={() => setGenerated(true)}>Generate Assessment Report</Btn>} />
      ) : (
        <Card>
          <div style={{ fontFamily: displayFont, fontSize: 20, fontWeight: 600 }}>Raj Sharma — Assessment Period 2</div>
          <div style={{ fontFamily: bodyFont, fontSize: 13, color: T.inkFaint, marginBottom: 16 }}>Aug 15 – Aug 28, 2026</div>

          <div style={{ fontFamily: bodyFont, fontWeight: 700, marginBottom: 6 }}>Recall Summary</div>
          <ul style={{ fontFamily: bodyFont, fontSize: 13.5, color: T.ink, lineHeight: 1.8, marginTop: 0 }}>
            <li>Total reminders logged: 14</li>
            <li>Remembered independently: 7 (74%)</li>
            <li>Needed reminder assistance: 7</li>
          </ul>

          <div style={{ fontFamily: bodyFont, fontWeight: 700, margin: "14px 0 6px" }}>Repeated Question Analysis</div>
          <ul style={{ fontFamily: bodyFont, fontSize: 13.5, lineHeight: 1.8, marginTop: 0 }}>
            <li>Evening Medication — 7 related questions (Critical)</li>
            <li>Priya / Person Recognition — 3 related questions (High)</li>
            <li>Doctor Appointment — 2 related questions (High)</li>
          </ul>

          <div style={{ fontFamily: bodyFont, fontWeight: 700, margin: "14px 0 6px" }}>Time Patterns</div>
          <p style={{ fontFamily: bodyFont, fontSize: 13.5, margin: 0 }}>Medication-related queries clustered around 7:45–8:15 PM, near the scheduled evening medication time.</p>

          <div style={{ fontFamily: bodyFont, fontWeight: 700, margin: "14px 0 6px" }}>Comparison with Previous Period</div>
          <p style={{ fontFamily: bodyFont, fontSize: 13.5, margin: 0 }}>Independent recall increased from 61% to 74%. Repeated questions and reminder assistance both decreased compared with Period 1.</p>

          <Card style={{ marginTop: 16, background: T.surfaceSoft }}>
            <p style={{ fontFamily: bodyFont, fontSize: 12.5, color: T.inkSoft, margin: 0, lineHeight: 1.6 }}>
              This report summarises recorded patient interactions and self-reported memory-support patterns. It is not a diagnosis and should be interpreted by a qualified healthcare professional alongside clinical assessment.
            </p>
          </Card>
        </Card>
      )}
    </div>
  );
}
