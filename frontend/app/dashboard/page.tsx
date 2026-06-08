export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020910] px-4">
      <div className="rounded-2xl border border-[#1d2a36] bg-[#07111b] px-10 py-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-[#e0a12b]">
          Welcome to Yeti Trek Dashboard
        </h1>

        <p className="mt-3 text-gray-300">
          Login successful. You are now inside the Yeti Trek dashboard.
        </p>
      </div>
    </main>
  );
}