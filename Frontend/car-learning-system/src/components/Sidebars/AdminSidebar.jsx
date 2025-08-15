"use client";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconChalkboard,
  IconSchool,
  IconUsers
} from "@tabler/icons-react";
import { Sidebar, SidebarBody, useSidebar } from "../ui/Sidebar";
import { cn } from "../ui/Sidebar";

const links = [
  // { label: "Getting Started", href: "/admin", icon: <IconBrandTabler className="h-5 w-5 shrink-0" /> },
  { label: "Manager", href: "/admin/manager", icon: <IconUsers className="h-5 w-5 shrink-0" /> },
  { label: "Instructors", href: "/admin/instructorList", icon: <IconChalkboard className="h-5 w-5 shrink-0" /> },
  { label: "Learners", href: "/instructor/learnersList", icon: <IconSchool className="h-5 w-5 shrink-0" /> },
  { label: "Settings", href: "/instructor/settings", icon: <IconSettings className="h-5 w-5 shrink-0" /> },
  { label: "Logout", href: "/logout", icon: <IconArrowLeft className="h-5 w-5 shrink-0" /> }
];

// Link with react-router-dom active styles
const RouterSidebarLink = ({ link }) => {
  const { open, animate } = useSidebar();
  return (
    <NavLink
      to={link.href}
      end
      className={({ isActive }) =>
        cn(
          "flex items-center gap-5 p-2 rounded-lg group/sidebar",
          isActive
            ? "text-white bg-neutral-800 font-semibold"
            : "text-white hover:bg-neutral-700 transition-colors duration-200"
        )
      }
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1
        }}
        className="text-sm whitespace-pre inline-block"
      >
        {link.label}
      </motion.span>
    </NavLink>
  );
};

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const user = {
    name: "Kartikey Gupta",
    image: "" // replace with user image URL if available
  };

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="flex flex-col justify-between h-screen bg-black text-white">
        {/* Top links */}
        <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <RouterSidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>

        {/* Profile at bottom */}
        <div className="p-1 border-t border-neutral-700">
          <NavLink
            to="/admin/profile"
            className="flex items-center gap-3 hover:bg-neutral-700 rounded-lg"
          >
            {user.image ? (
              <img
                src={user.image}
                alt="User"
                className="h-5 w-5 shrink-0 rounded-full object-cover mt-3"
              />
            ) : (
              <IconUserBolt className="h-5 w-5 shrink-0 mt-3" />
            )}
            {open && (
              <span className="text-sm font-semibold mt-4">{user.name}</span>
            )}
          </NavLink>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

const Logo = () => (
  <a href="#" className="flex items-center gap-2 py-1">
    <div className="h-5 w-6 bg-white rounded" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium">
      DriveLearn
    </motion.span>
  </a>
);

const LogoIcon = () => (
  <a href="#" className="flex items-center gap-2 py-1">
    <div className="h-5 w-6 bg-white rounded" />
  </a>
);
