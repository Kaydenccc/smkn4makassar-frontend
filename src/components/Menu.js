"use client";
import { Axios } from "@/helper/axios";
import { clearAllCookies, getCookie } from "@/helper/cookie";
import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function BreadcrumbsWithIcon() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Breadcrumbs className="bg-blue-gray-50 ">
      <Link
        href="/system"
        className={`${
          pathname === "/system" ? "" : "opacity-60"
        } flex !justify-center !items-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>
      <Link
        href="/system/absens"
        className={`${pathname === "/system/absens" ? "" : "opacity-60"}`}
      >
        Daftar Absens
      </Link>
      <Link
        href="/system/absens"
        className={`${pathname === "/system/absens" ? "" : "opacity-60"}`}
      >
        Laporan
      </Link>
      <Link
        href="pengaturan"
        className={`${pathname === "/system/logout" ? "" : "opacity-60"}`}
      >
        Pengaturan
      </Link>
      <button
        onClick={async () => {
          await Axios.delete("/gurus/logout", {
            headers: {
              Authorization: getCookie("token"),
            },
          });
          clearAllCookies();
          router.push("/");
        }}
        className={`${pathname === "/system/logout" ? "" : "opacity-60"}`}
      >
        Keluar
      </button>
    </Breadcrumbs>
  );
}
