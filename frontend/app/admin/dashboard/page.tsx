import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Activity,
  ArrowRight,
  Database,
  Hotel,
  Map,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { getCurrentUserAction } from "@/lib/actions/auth-action";

const metrics = [
  {
    label: "Admin Access",
    value: "Active",
    text: "Role-based guard enabled",
    icon: ShieldCheck,
  },
  {
    label: "Users API",
    value: "Ready",
    text: "Protected endpoint available",
    icon: Users,
  },
  {
    label: "System Status",
    value: "Stable",
    text: "Backend build passing",
    icon: Activity,
  },
];

const modules = [
  {
    title: "Users",
    text: "View registered users through the protected admin endpoint.",
    icon: Users,
    status: "Available",
  },
  {
    title: "Trails",
    text: "Add trail management next for creating and updating trek routes.",
    icon: Map,
    status: "Next",
  },
  {
    title: "Stays",
    text: "Add lodge management next for stay listings and images.",
    icon: Hotel,
    status: "Next",
  },
];

export default async function AdminDashboardPage() {
  const response = await getCurrentUserAction();

  if (!response?.success || !response.data) {
    redirect("/admin/login");
  }

  if (response.data.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#070b13] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,19,0.98),rgba(7,11,19,0.72)),url('/trail1.png')] bg-cover bg-center" />
        <div className="relative mx-auto max-w-7xl px-8 py-10">
          <nav className="flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3 text-lg font-black">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9a127] text-[#121a18]">
                <ShieldCheck size={23} />
              </span>
              Yeti Trek Admin
            </Link>

            <Link
              href="/dashboard"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-slate-200 transition hover:border-[#e9a127]"
            >
              User Dashboard
            </Link>
          </nav>

          <div className="grid gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e9a127]/30 bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#e9a127] backdrop-blur">
                <Sparkles size={14} />
                Admin authentication
              </span>

              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-tight md:text-6xl">
                Welcome, {response.data.fullName}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                This dashboard is only visible to users with the admin role.
                Use it to verify protected admin access and prepare future
                management tools.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0d1314]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-wider text-[#e9a127]">
                Current Admin
              </p>
              <h2 className="mt-4 text-2xl font-black">{response.data.fullName}</h2>
              <p className="mt-2 text-sm text-slate-400">{response.data.email}</p>
              <div className="mt-5 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-200">
                Role verified: {response.data.role}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-[#101822] p-6 shadow-xl shadow-black/20"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9a127]/15 text-[#e9a127]">
                    <Icon size={23} />
                  </span>
                  <strong className="text-xl font-black text-[#e9a127]">
                    {metric.value}
                  </strong>
                </div>
                <h2 className="mt-5 text-lg font-black">{metric.label}</h2>
                <p className="mt-2 text-sm text-slate-400">{metric.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-2xl border border-white/10 bg-[#101822] p-6 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#e9a127]">
                  Admin Modules
                </p>
                <h2 className="mt-2 text-2xl font-black">Management Area</h2>
              </div>
              <Database className="text-[#e9a127]" size={28} />
            </div>

            <div className="mt-6 grid gap-4">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <div
                    key={module.title}
                    className="flex items-center justify-between gap-5 rounded-xl border border-white/10 bg-[#0d1314] p-5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9a127]/15 text-[#e9a127]">
                        <Icon size={21} />
                      </span>
                      <div>
                        <h3 className="font-black">{module.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {module.text}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-black uppercase text-[#e9a127]">
                      {module.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="rounded-2xl border border-[#e9a127]/30 bg-[#0d1314] p-6 shadow-xl shadow-black/20">
            <p className="text-xs font-black uppercase tracking-wider text-[#e9a127]">
              Postman Test
            </p>
            <h2 className="mt-3 text-2xl font-black">Protected endpoint</h2>
            <p className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-sm text-[#e9a127]">
              GET /api/v1/admin/users
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Login as admin, copy the token, then send this request with
              Authorization set to Bearer Token. A normal user token should be
              rejected.
            </p>
            <Link
              href="/admin/login"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#e9a127] text-sm font-black text-[#121a18]"
            >
              Back to Admin Login
              <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
