"use client";

import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Axios } from "@/helper/axios";
import { clearAllCookies, getCookie } from "@/helper/cookie";

function NavList() {
  const isActive = usePathname();
  const router = useRouter();
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          href="/system/absens"
          className={
            isActive === "/system/absens"
              ? "flex items-center hover:text-blue-500 transition-colors text-blue-500"
              : "flex items-center hover:text-blue-500 transition-colors"
          }
        >
          Absensi Harian
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          href="/system/laporan"
          className={
            isActive === "/system/laporan"
              ? "flex items-center hover:text-blue-500 transition-colors text-blue-500"
              : "flex items-center hover:text-blue-500 transition-colors"
          }
        >
          Rekap Absensi
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          href="/system/pengaturan"
          className={
            isActive === "/system/pengaturan"
              ? "flex items-center hover:text-blue-500 transition-colors text-blue-500"
              : "flex items-center hover:text-blue-500 transition-colors"
          }
        >
          Pengaturan
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
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
        >
          Logout
        </button>
      </Typography>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-2 md:px-6 py-1 md:py-3 mb-4 md:mb-8">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/system"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Guru
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
