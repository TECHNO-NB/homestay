// @ts-nocheck

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  X,
  Upload,
  Search,
  Bell,
  ChevronRight,
  Eye,
  TrendingUp,
  Menu,
  LogOut,
  Save,
  Image,
  Mail,
  Phone,
  Wrench,
  Clock,
  AlertCircle,
  CheckCircle2,
  CheckCircle,
  ImageIcon,
} from "lucide-react";
import process from "process";
import AvailabilityPage from "../components/AvailabilityComp";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Blog {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at?: string;
}
interface Contact {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  created_at?: string;
}
interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
  created_at?: string;
}
interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  created_at?: string;
}

type Tab = "dashboard" | "contacts" | "services" | "users" | "gallery" | "availability";

// ─── API Base ────────────────────────────────────────────────────────────────
const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
});

// ─── Toast ────────────────────────────────────────────────────────────────────
interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  };

  const navItems: { key: Tab; icon: React.ReactNode; label: string }[] = [
    {
      key: "dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
    { key: "appointment", icon: <Briefcase size={18} />, label: "Appointment" },
    { key: "contacts", icon: <MessageSquare size={18} />, label: "Contacts" },
    { key: "users", icon: <Users size={18} />, label: "Users" },
    { key: "gallery", icon: <ImageIcon size={18} />, label: "Gallery" },
    { key: "availability", icon: <CheckCircle size={18} />, label: "Availability" },
  ];

  return (
    <div
      className="min-h-screen flex max-w-screen overflow-hidden"
      style={{
        background: "#0d0d0f",
        color: "#e8e3d9",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={``}
        style={{
          width: sidebarOpen ? 240 : 68,
          background: "linear-gradient(160deg,#141416 0%,#111113 100%)",
          borderRight: "1px solid #222226",
          transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 16px 20px",
            borderBottom: "1px solid #1e1e22",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg,#c9a84c,#e8c86e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LayoutDashboard size={18} color="#0d0d0f" strokeWidth={2.5} />
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#f0ead8",
                  whiteSpace: "nowrap",
                }}
              >
                AdminStudio
              </div>
              <div style={{ fontSize: 11, color: "#6b6760", marginTop: 1 }}>
                Content Manager
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: sidebarOpen ? "10px 12px" : "10px 15px",
                borderRadius: 10,
                marginBottom: 4,
                background:
                  tab === item.key
                    ? "linear-gradient(90deg,rgba(201,168,76,0.18),rgba(201,168,76,0.06))"
                    : "transparent",
                border:
                  tab === item.key
                    ? "1px solid rgba(201,168,76,0.2)"
                    : "1px solid transparent",
                color: tab === item.key ? "#c9a84c" : "#787470",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (tab !== item.key)
                  (e.currentTarget as HTMLElement).style.color = "#c0b89a";
              }}
              onMouseLeave={(e) => {
                if (tab !== item.key)
                  (e.currentTarget as HTMLElement).style.color = "#787470";
              }}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && (
                <span style={{ fontSize: 13.5, fontWeight: 500 }}>
                  {item.label}
                </span>
              )}
              {sidebarOpen && tab === item.key && (
                <ChevronRight
                  size={14}
                  style={{ marginLeft: "auto", opacity: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Collapse + Logout */}
        <div style={{ padding: "12px 10px", borderTop: "1px solid #1e1e22" }}>
          <button
            onClick={() => setSidebarOpen((p) => !p)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 10,
              background: "transparent",
              border: "none",
              color: "#555",
              cursor: "pointer",
              marginBottom: 4,
            }}
          >
            <Menu size={18} />
            {sidebarOpen && <span style={{ fontSize: 13 }}>Collapse</span>}
          </button>
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 10,
              background: "transparent",
              border: "none",
              color: "#555",
              cursor: "pointer",
            }}
          >
            <LogOut size={18} />
            {sidebarOpen && <span style={{ fontSize: 13 }}>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            borderBottom: "1px solid #1c1c1f",
            background: "rgba(13,13,15,0.8)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#f0ead8",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {navItems.find((n) => n.key === tab)?.label}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              style={{
                position: "relative",
                background: "#18181b",
                border: "1px solid #26262a",
                borderRadius: 8,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#787470",
              }}
            >
              <Bell size={16} />
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 7,
                  height: 7,
                  background: "#c9a84c",
                  borderRadius: "50%",
                  border: "1.5px solid #0d0d0f",
                }}
              />
            </button>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#c9a84c,#e8c86e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#0d0d0f",
                cursor: "pointer",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ flex: 1, padding: "28px", overflowY: "auto" }}>
          {tab === "dashboard" && <Dashboard setTab={setTab} />}
          {tab === "contacts" && <ContactsPanel addToast={addToast} />}
          {tab === "appointment" && <AppointmentPanel addToast={addToast} />}
          {tab === "users" && <UsersPanel addToast={addToast} />}
          {tab === "gallery" && <Gallery addToast={addToast} />}
           {tab === "availability" && <AvailabilityPage addToast={addToast} />}
        </div>
      </main>

      {/* Toast container */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 9999,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              borderRadius: 10,
              background: t.type === "success" ? "#15281f" : "#2a1515",
              border: `1px solid ${t.type === "success" ? "#2a5c3a" : "#5c2a2a"}`,
              color: t.type === "success" ? "#6fcf97" : "#eb5757",
              fontSize: 13,
              fontWeight: 500,
              backdropFilter: "blur(8px)",
              animation: "slideIn 0.3s ease",
              minWidth: 260,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            {t.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {t.message}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a2f; border-radius: 10px; }
        input::placeholder { color: #454540; }
        textarea::placeholder { color: #454540; }
      `}</style>
    </div>
  );
}

// ─── Shared UI Components ─────────────────────────────────────────────────────
function Card({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#111113",
        border: "1px solid #1e1e22",
        borderRadius: 14,
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function GoldButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "ghost";
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg,#c9a84c,#ddb85e)",
      color: "#0d0d0f",
      border: "none",
    },
    danger: {
      background: "rgba(235,87,87,0.12)",
      color: "#eb5757",
      border: "1px solid rgba(235,87,87,0.25)",
    },
    ghost: {
      background: "rgba(255,255,255,0.04)",
      color: "#a09880",
      border: "1px solid #26262a",
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: "9px 18px",
        borderRadius: 9,
        fontSize: 13,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        gap: 7,
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  textarea = false,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base: React.CSSProperties = {
    width: "100%",
    background: "#0d0d0f",
    border: "1px solid #26262a",
    borderRadius: 9,
    padding: "10px 13px",
    fontSize: 13.5,
    color: "#d8d0c4",
    outline: "none",
    fontFamily: "inherit",
    resize: "vertical" as const,
    transition: "border-color 0.2s",
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: "#787470",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
        {required && <span style={{ color: "#c9a84c", marginLeft: 4 }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={base}
          onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
          onBlur={(e) => (e.target.style.borderColor = "#26262a")}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={base}
          onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
          onBlur={(e) => (e.target.style.borderColor = "#26262a")}
        />
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#6b6760",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 10,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#f0ead8",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: 12, color: "#555", marginTop: 6 }}>
              {sub}
            </div>
          )}
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ setTab }: { setTab: (t: Tab) => void }) {
  const [counts, setCounts] = useState({
    contacts: 0,
    appointment: 0,
    users: 0,
  });

  useEffect(() => {
    Promise.allSettled([
      API.get("/contacts"),
      API.get("/bookings"),
      API.get("/users"),
    ]).then(([b, c, s, u]) => {
      setCounts({
        contacts: b.status === "fulfilled" ? b.value.data.length : 0,
        appointment: c.status === "fulfilled" ? c.value.data.length : 0,
        bookings: s.status === "fulfilled" ? s.value.data.length : 0,
        users: u.status === "fulfilled" ? u.value.data.length : 0,
      });
    });
  }, []);

  const quickActions: { label: string; tab: Tab; icon: React.ReactNode }[] = [
    {
      label: "New Appointment ",
      tab: "appointment",
      icon: <FileText size={16} />,
    },
    { label: "Add Service", tab: "services", icon: <Briefcase size={16} /> },

    { label: "Manage Users", tab: "users", icon: <Users size={16} /> },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#f0ead8",
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Welcome back 👋
        </h2>
        <p style={{ color: "#5a5750", marginTop: 6, fontSize: 14 }}>
          Here's what's happening with your content today.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <StatCard
          icon={<MessageSquare size={20} />}
          label="Contacts"
          value={counts.contacts}
          sub="Inquiries received"
          color="#6fcf97"
        />
        <StatCard
          icon={<Briefcase size={20} />}
          label="Appointment"
          value={counts.appointment}
          sub="Active listings"
          color="#56b2e4"
        />
        <StatCard
          icon={<Users size={20} />}
          label="Users"
          value={counts.users}
          sub="Registered accounts"
          color="#bb87fa"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: "#c9a84c",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <TrendingUp size={16} /> Quick Actions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {quickActions.map((a) => (
              <button
                key={a.tab}
                onClick={() => setTab(a.tab)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "#16161a",
                  border: "1px solid #222226",
                  cursor: "pointer",
                  color: "#c0b89a",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#c9a84c33";
                  (e.currentTarget as HTMLElement).style.background = "#1b1b1f";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#222226";
                  (e.currentTarget as HTMLElement).style.background = "#16161a";
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 13.5,
                    fontWeight: 500,
                  }}
                >
                  {a.icon} {a.label}
                </span>
                <ChevronRight size={15} style={{ color: "#444" }} />
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: "#c9a84c",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Eye size={16} /> Platform Overview
          </div>
          {[
            {
              label: "Contacts",
              val: counts.contacts,
              total: Math.max(counts.contacts, 10),
              color: "#6fcf97",
            },
            {
              label: "Appointment",
              val: counts.appointment,
              total: Math.max(counts.appointment, 10),
              color: "#56b2e4",
            },
            {
              label: "Users",
              val: counts.users,
              total: Math.max(counts.users, 10),
              color: "#bb87fa",
            },
          ].map((s) => (
            <div key={s.label} style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12.5,
                  marginBottom: 6,
                  color: "#8a8480",
                }}
              >
                <span>{s.label}</span>
                <span style={{ color: s.color, fontWeight: 700 }}>{s.val}</span>
              </div>
              <div
                style={{ height: 5, background: "#1e1e22", borderRadius: 99 }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 99,
                    background: s.color,
                    width: `${Math.min((s.val / s.total) * 100, 100)}%`,
                    transition: "width 1s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── Contacts Panel ───────────────────────────────────────────────────────────
function ContactsPanel({
  addToast,
}: {
  addToast: (m: string, t?: "success" | "error") => void;
}) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);

  const fetch = async () => {
    try {
      const { data } = await API.get("/contacts");

      setContacts(data);
    } catch {
      addToast("Failed to load contacts", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this contact?")) return;
    try {
      await API.delete(`/contacts/${id}`);
      addToast("Contact deleted");
      fetch();
      setSelected(null);
    } catch {
      addToast("Delete failed", "error");
    }
  };

  const filtered = contacts.filter(
    (c) =>
      c?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#f0ead8",
              margin: 0,
            }}
          >
            Contact Inquiries
          </h3>
          <p style={{ color: "#5a5750", fontSize: 13, marginTop: 4 }}>
            {contacts.length} total inquiries
          </p>
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: 20 }}>
        <Search
          size={15}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#555",
          }}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search contacts…"
          style={{
            width: "100%",
            background: "#111113",
            border: "1px solid #1e1e22",
            borderRadius: 10,
            padding: "10px 12px 10px 36px",
            fontSize: 13,
            color: "#c8c0b4",
            outline: "none",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: selected ? "1fr 1fr" : "1fr",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {loading ? (
            <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
              Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
              No contacts found
            </div>
          ) : (
            filtered.map((c) => (
              <Card
                key={c.id}
                style={{
                  cursor: "pointer",
                  border:
                    selected?.id === c.id
                      ? "1px solid rgba(201,168,76,0.35)"
                      : "1px solid #1e1e22",
                  transition: "all 0.2s",
                }}
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg,#c9a84c22,#c9a84c44)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#c9a84c",
                        flexShrink: 0,
                      }}
                    >
                      {c.fullName?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#e8e3d9",
                        }}
                      >
                        {c.fullName}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: "#6b6760",
                          marginTop: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Mail size={11} />
                        {c.email}
                      </div>
                      {c.message}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span
                      style={{
                        fontSize: 11,
                        padding: "3px 9px",
                        borderRadius: 6,
                        background: "rgba(86,178,228,0.12)",
                        color: "#56b2e4",
                        border: "1px solid rgba(86,178,228,0.2)",
                        fontWeight: 500,
                      }}
                    >
                      {c.service}
                    </span>
                    <GoldButton
                      variant="danger"
                      onClick={(e) => {
                        e?.stopPropagation?.();
                        handleDelete(c.id);
                      }}
                    >
                      <Trash2 size={13} />
                    </GoldButton>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {selected && (
          <Card
            style={{
              border: "1px solid rgba(201,168,76,0.2)",
              alignSelf: "flex-start",
              position: "sticky",
              top: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: "#c9a84c" }}>
                Contact Detail
              </span>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  icon: <Users size={14} />,
                  label: "Name",
                  val: selected.fullName,
                },
                {
                  icon: <Mail size={14} />,
                  label: "Email",
                  val: selected.email,
                },
                {
                  icon: <Phone size={14} />,
                  label: "Phone",
                  val: selected.phone,
                },
                {
                  icon: <Wrench size={14} />,
                  label: "Service",
                  val: selected.service,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{ display: "flex", gap: 12, alignItems: "center" }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#1a1a1e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c9a84c",
                      flexShrink: 0,
                    }}
                  >
                    {row.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#555",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 2,
                      }}
                    >
                      {row.label}
                    </div>
                    <div style={{ fontSize: 13.5, color: "#d8d0c4" }}>
                      {row.val}
                    </div>
                  </div>
                </div>
              ))}
              <div
                style={{
                  background: "#0d0d0f",
                  borderRadius: 10,
                  padding: 14,
                  border: "1px solid #1e1e22",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#555",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 8,
                  }}
                >
                  Message
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#a09880",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {selected.message}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── Bookings Panel ───────────────────────────────────────────────────────────
function AppointmentPanel({
  addToast,
}: {
  addToast: (m: string, t?: "success" | "error") => void;
}) {
  const [appointment, setAppointment] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetch = async () => {
    try {
      const { data } = await API.get("/bookings");
      setAppointment(data);
    } catch {
      addToast("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this bookings?")) return;
    try {
      await API.delete(`/bookings/${id}`);
      addToast("Bookings deleted");
      fetch();
    } catch {
      addToast("Delete failed", "error");
    }
  };


  const handleApprove = async (id: number) => {
    if (!confirm("Approve this bookings?")) return;
    try {
      await API.post(`/bookings/accept/${id}`);
      addToast("Bookings Approved");
      fetch();
    } catch {
      addToast("Approved failed", "error");
    }
  };


  

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#f0ead8",
              margin: 0,
            }}
          >
            Appointment
          </h3>
          <p style={{ color: "#5a5750", fontSize: 13, marginTop: 4 }}>
            {appointment.length} total services
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          Loading…
        </div>
      ) : appointment.length === 0 ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          No Bookings yet
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: 16,
          }}
        >
          {appointment.map((b) => (
            <Card key={b.id}>
              {/* TOP */}
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{ fontSize: 15, fontWeight: 700, color: "#e8e3d9" }}
                >
                  {b.service_name}
                </div>
                <div style={{ fontSize: 12, color: "#c9a84c" }}>
                  {b.service_price} • {b.service_duration}
                </div>
              </div>

              {/* DATE & TIME */}
              <div
                style={{ fontSize: 12.5, color: "#6b6760", marginBottom: 10 }}
              >
                📅 {new Date(b.booking_date).toLocaleDateString()} <br />⏰{" "}
                {b.booking_time}
              </div>

              {/* CUSTOMER */}
              <div style={{ marginBottom: 10 }}>
                <div
                  style={{ fontSize: 13, color: "#f0ead8", fontWeight: 600 }}
                >
                  {b.name}
                </div>
                <div style={{ fontSize: 12, color: "#6b6760" }}>{b.email}</div>
                <div style={{ fontSize: 12, color: "#6b6760" }}>{b.phone}</div>
              </div>

              {/* CONCERNS */}
              <div style={{ marginBottom: 10 }}>
                <div
                  style={{ fontSize: 11, color: "#787470", marginBottom: 4 }}
                >
                  CONCERNS
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {b.concerns?.map((c: any, i: number) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 11,
                        padding: "4px 8px",
                        borderRadius: 6,
                        background: "#1a1a1e",
                        color: "#c9a84c",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* NOTES */}
              {b.notes && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b6760",
                    marginBottom: 12,
                    lineHeight: 1.5,
                  }}
                >
                  📝 {b.notes}
                </div>
              )}

              {/* ACTIONS */}
              <div style={{ display: "flex", gap: 8 }}>
                <GoldButton variant="danger" onClick={() => handleDelete(b.id)}>
                  <Trash2 size={14} />
                </GoldButton>
                   <GoldButton variant="primary" onClick={() => handleApprove(b.id)}>
                   Approved
                </GoldButton>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Users Panel ──────────────────────────────────────────────────────────────
function UsersPanel({
  addToast,
}: {
  addToast: (m: string, t?: "success" | "error") => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  const fetch = async () => {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch {
      addToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const openEdit = (u: User) => {
    setEditing(u);
    setName(u.name);
    setEmail(u.email);
    setPassword("");
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      addToast("Name and email required", "error");
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        await API.put(`/users/${editing.id}`, { name, email, password });
        addToast("User updated!");
      } else {
        await API.post("/users/register", { name, email, password });
        addToast("User created!");
      }
      closeForm();
      fetch();
    } catch {
      addToast("Operation failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      addToast("User deleted");
      fetch();
    } catch {
      addToast("Delete failed", "error");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const avatarColors = ["#c9a84c", "#6fcf97", "#56b2e4", "#bb87fa", "#f09060"];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#f0ead8",
              margin: 0,
            }}
          >
            Users
          </h3>
          <p style={{ color: "#5a5750", fontSize: 13, marginTop: 4 }}>
            {users.length} registered users
          </p>
        </div>
        <GoldButton
          onClick={() => {
            closeForm();
            setShowForm(true);
          }}
        >
          <Plus size={15} /> Add User
        </GoldButton>
      </div>

      {showForm && (
        <Card
          style={{ marginBottom: 24, border: "1px solid rgba(201,168,76,0.2)" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: "#c9a84c" }}>
              {editing ? "Edit User" : "Create User"}
            </span>
            <button
              onClick={closeForm}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <InputField
              label="Full Name"
              value={name}
              onChange={setName}
              placeholder="John Doe"
              required
            />
            <InputField
              label="Email"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <InputField
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder={
              editing ? "Leave blank to keep current" : "Set password…"
            }
          />
          <div style={{ display: "flex", gap: 10 }}>
            <GoldButton onClick={handleSubmit} disabled={submitting}>
              <Save size={15} />{" "}
              {submitting ? "Saving…" : editing ? "Update" : "Create"}
            </GoldButton>
            <GoldButton onClick={closeForm} variant="ghost">
              <X size={15} /> Cancel
            </GoldButton>
          </div>
        </Card>
      )}

      <div style={{ position: "relative", marginBottom: 20 }}>
        <Search
          size={15}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#555",
          }}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users…"
          style={{
            width: "100%",
            background: "#111113",
            border: "1px solid #1e1e22",
            borderRadius: 10,
            padding: "10px 12px 10px 36px",
            fontSize: 13,
            color: "#c8c0b4",
            outline: "none",
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          No users found
        </div>
      ) : (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1a1a1e" }}>
                {["User", "Email", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 20px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#555",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr
                  key={u.id}
                  style={{ borderBottom: "1px solid #16161a" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#141416")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={{ padding: "14px 20px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: `${avatarColors[i % 5]}22`,
                          border: `1.5px solid ${avatarColors[i % 5]}44`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          fontWeight: 700,
                          color: avatarColors[i % 5],
                          flexShrink: 0,
                        }}
                      >
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#e0d8cc",
                        }}
                      >
                        {u.name}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: 13.5,
                      color: "#787470",
                    }}
                  >
                    {u.email}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <GoldButton variant="ghost" onClick={() => openEdit(u)}>
                        <Edit3 size={14} />
                      </GoldButton>
                      <GoldButton
                        variant="danger"
                        onClick={() => handleDelete(u.id)}
                      >
                        <Trash2 size={14} />
                      </GoldButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}



// ─── Gallery Panel ───────────────────────────────────────────────────────────
function Gallery({
  addToast,
}: {
  addToast: (m: string, t?: "success" | "error") => void;
}) {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [posttype,setPostType] = useState("")
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Gallery | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetch = async () => {
    try {
      const { data } = await API.get("/gallery");
      setGallery(data);
    } catch {
      addToast("Failed to load Gallery", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const openEdit = (s: Gallery) => {
    setEditing(s);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setFile(null);
  };

  const handleSubmit = async () => {
 
    setSubmitting(true);
    try {

      if(!posttype){
        alert("Must Select PostType");
        return;
      }
      const fd = new FormData();
      if (file) fd.append("image", file);
      fd.append("posttype",posttype)
      
      if (editing) {
        await API.put(`/gallery/${editing.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        addToast("Gallery updated!");
      } else {
        await API.post("/gallery", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        addToast("Gallery created!");
      }
      closeForm();
      fetch();
    } catch {
      addToast("Operation failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this Gallery?")) return;
    try {
      await API.delete(`/gallery/${id}`);
      addToast("gallery deleted");
      fetch();
    } catch {
      addToast("Delete failed", "error");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#f0ead8",
              margin: 0,
            }}
          >
            Gallery
          </h3>
          <p style={{ color: "#5a5750", fontSize: 13, marginTop: 4 }}>
            {gallery.length} total Gallery
          </p>
        </div>
        <GoldButton
          onClick={() => {
            closeForm();
            setShowForm(true);
          }}
        >
          <Plus size={15} /> Add Gallery
        </GoldButton>
      </div>

      {showForm && (
        <Card
          style={{ marginBottom: 24, border: "1px solid rgba(201,168,76,0.2)" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: "#c9a84c" }}>
              {editing ? "Edit Gallery" : "Create Gallery"}
            </span>
            <button
              onClick={closeForm}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "#787470",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Image
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: "2px dashed #26262a",
                borderRadius: 10,
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Upload size={22} style={{ color: "#555", marginBottom: 8 }} />
              <p style={{ color: "#555", fontSize: 13, margin: 0 }}>
                {file
                  ? file.name
                  : editing?.image
                    ? "Replace image (optional)"
                    : "Upload image"}
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>

            <div style={{ marginBottom: 16,marginTop:16 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "#787470",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              PostType (If Product Image Select Product Else Select Gallery)
            </label>
            <select
  className="mt-4 px-4 py-2 bg-black text-white border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
  value={posttype}
  onChange={(e) => setPostType(e.target.value)}
>
  <option value="" className="bg-black text-white">
    ---Select PostType---
  </option>
  <option value="product" className="bg-black text-white">
    Product
  </option>
  <option value="gallery" className="bg-black text-white">
    Gallery
  </option>
</select>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <GoldButton onClick={handleSubmit} disabled={submitting}>
              <Save size={15} />{" "}
              {submitting ? "Saving…" : editing ? "Update" : "Create"}
            </GoldButton>
            <GoldButton onClick={closeForm} variant="ghost">
              <X size={15} /> Cancel
            </GoldButton>
          </div>
        </Card>
      )}

      {loading ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          Loading…
        </div>
      ) : gallery.length === 0 ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          No Gallery yet
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: 16,
          }}
        >
          {gallery?.map((s) => (
            <Card key={s.id}>
              <div
                style={{
                  width: "100%",
                  height: 140,
                  borderRadius: 10,
                  background: "#0d0d0f",
                  marginBottom: 14,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #1a1a1e",
                }}
              >
                {s.image ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${s.image}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <Briefcase size={32} color="#2a2a2f" />
                )}
              </div>

              <div className="mt-4 mb-4">
              <h1 className=" text-gray-300">PostType:<span className="text-white font-bold"> {s.posttype}</span> </h1>
              </div>
      
              <div style={{ display: "flex", gap: 8 }}>
                <GoldButton variant="danger" onClick={() => handleDelete(s.id)}>
                  <Trash2 size={14} />
                </GoldButton>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}