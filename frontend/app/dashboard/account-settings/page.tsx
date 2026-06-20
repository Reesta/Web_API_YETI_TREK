import AccountSettingsForm from "../_components/AccountSettingsForm";

export default function AccountSettingsPage() {
  return (
    <section className="yt-page-section">
      <div className="yt-page-heading">
        <p>Account Settings</p>
        <h1>Update Your Profile</h1>
        <span>
          Change your account details and upload a profile image for your Yeti Trek account.
        </span>
      </div>

      <div className="yt-panel-card">
        <AccountSettingsForm />
      </div>
    </section>
  );
}
