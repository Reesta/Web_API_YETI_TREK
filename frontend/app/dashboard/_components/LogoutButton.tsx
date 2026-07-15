"use client";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <a
      href="/api/auth/logout"
      className="m-[18px] flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-lg border-0 bg-[#d89527] text-base font-black text-white max-[1000px]:absolute max-[1000px]:right-2 max-[1000px]:top-2 max-[1000px]:m-0 max-[1000px]:h-10 max-[1000px]:px-3.5"
    >
      <LogOut size={16} />
      Logout
    </a>
  );
}
