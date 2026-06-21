import PasswordUpdateForm from "../_components/PasswordUpdateForm";

export default function PasswordPage() {
  return (
    <section className="grid gap-5">
      <div>
        <p className="text-[13px] font-black uppercase tracking-[0.12em] text-[#e0a12b]">Password</p>
        <h1 className="text-[32px] font-black leading-tight text-[#f3f5f6]">Change Password</h1>
        <span className="mt-1.5 block text-[15px] text-[#aeb8c3]">
          Update your password using the same protected account update API.
        </span>
      </div>

      <div className="overflow-hidden rounded-[13px] border border-white/10 bg-[#282c2d] p-6">
        <PasswordUpdateForm />
      </div>
    </section>
  );
}
