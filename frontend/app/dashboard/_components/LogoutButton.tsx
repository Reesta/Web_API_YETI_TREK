"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth-action";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="m-[18px] flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-lg border-0 bg-[#d89527] text-base font-black text-white max-[1000px]:absolute max-[1000px]:right-2 max-[1000px]:top-2 max-[1000px]:m-0 max-[1000px]:h-10 max-[1000px]:px-3.5"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}
