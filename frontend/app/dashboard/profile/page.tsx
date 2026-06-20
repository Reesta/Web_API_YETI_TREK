import { Mail, Phone, Shield } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUserAction } from "@/lib/actions/auth-action";
import AccountSettingsForm from "../_components/AccountSettingsForm";
import PasswordUpdateForm from "../_components/PasswordUpdateForm";
import ProfileImage from "../_components/ProfileImage";

export default async function ProfilePage() {
  const response = await getCurrentUserAction();

  if (!response?.success || !response.data) {
    redirect("/login");
  }

  const user = response.data;

  return (
    <section className="yt-page-section">
      <div className="yt-page-heading">
        <p>Profile</p>
        <h1>Trekker Profile</h1>
      </div>

      <div className="yt-panel-card">
        <div className="yt-profile-head">
          <ProfileImage user={user} />
          <div>
            <h2>{user.fullName}</h2>
            <p>Yeti Trek community member</p>
          </div>
        </div>

        <div className="yt-info-grid">
          <InfoItem icon={<Mail size={18} />} label="Email" value={user.email} />
          <InfoItem icon={<Phone size={18} />} label="Phone" value={user.phoneNumber} />
          <InfoItem icon={<Shield size={18} />} label="Role" value={user.role} />
        </div>
      </div>

      <div id="edit-profile" className="yt-panel-card">
        <div className="yt-card-heading">
          <p>Edit Profile</p>
          <span>Update the account details shared by the web and Flutter apps.</span>
        </div>
        <AccountSettingsForm />
      </div>

      <div id="change-password" className="yt-panel-card">
        <div className="yt-card-heading">
          <p>Change Password</p>
          <span>Keep the same protected account flow for both clients.</span>
        </div>
        <PasswordUpdateForm />
      </div>
    </section>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="yt-info-card">
      <div>
        {icon}
        <span>{label}</span>
      </div>
      <p>{value}</p>
    </div>
  );
}
