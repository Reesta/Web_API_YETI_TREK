import AccountSettingsForm from "../_components/AccountSettingsForm";

export default function AccountSettingsPage() {
  return (
    <section className="grid gap-5">
      <div>
        <p className="text-[13px] font-black uppercase tracking-[0.12em] text-[#e0a12b]">Account Settings</p>
        <h1 className="text-[32px] font-black leading-tight text-[#f3f5f6]">Update Your Profile</h1>
        <span className="mt-1.5 block text-[15px] text-[#aeb8c3]">
          Change your account details and upload a profile image for your Yeti Trek account.
        </span>
      </div>

      <div className="overflow-hidden rounded-[13px] border border-white/10 bg-[#282c2d] p-6">
        <AccountSettingsForm />
      </div>
    </section>
  );
}
