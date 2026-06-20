"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Hotel, Map, User } from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    href: "/dashboard/stay",
    label: "Stay",
    icon: Hotel,
  },
  {
    href: "/dashboard/trails",
    label: "Trails",
    icon: Map,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="yt-sidebar-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href) && item.href !== "#";

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`yt-nav-item${isActive ? " active" : ""}`}
          >
            <Icon size={17} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
