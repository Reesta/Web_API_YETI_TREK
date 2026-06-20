import Image from "next/image";
import { User } from "lucide-react";
import { YetiTrekUser } from "@/lib/api/auth";

const apiRoot =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1$/, "") ||
  "http://localhost:4000";

export default function ProfileImage({
  user,
  size = "large",
}: {
  user: YetiTrekUser;
  size?: "small" | "large";
}) {
  const imageUrl = user.profileImage?.startsWith("/uploads")
    ? `${apiRoot}${user.profileImage}`
    : user.profileImage;
  const dimensions = size === "small" ? "h-11 w-11" : "h-28 w-28";
  const iconSize = size === "small" ? 20 : 44;

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={user.fullName}
        width={size === "small" ? 44 : 112}
        height={size === "small" ? 44 : 112}
        unoptimized
        className={`${dimensions} rounded-full border border-[#D89A2B]/50 object-cover`}
      />
    );
  }

  return (
    <div className={`${dimensions} flex items-center justify-center rounded-full border border-[#D89A2B]/50 bg-[#111d2a] text-[#D89A2B]`}>
      <User size={iconSize} />
    </div>
  );
}
