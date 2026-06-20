import PasswordUpdateForm from "../_components/PasswordUpdateForm";

export default function PasswordPage() {
  return (
    <section className="yt-page-section">
      <div className="yt-page-heading">
        <p>Password</p>
        <h1>Change Password</h1>
        <span>
          Update your password using the same protected account update API.
        </span>
      </div>

      <div className="yt-panel-card">
        <PasswordUpdateForm />
      </div>
    </section>
  );
}
