import { Mail, Phone, Shield } from "lucide-react";
import { getCurrentUserAction } from "@/lib/actions/auth-action";
import ProfileImage from "../_components/ProfileImage";

export default async function ProfilePage() {
  const response = await getCurrentUserAction();
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
