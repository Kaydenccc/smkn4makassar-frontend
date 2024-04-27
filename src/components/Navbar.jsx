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
          href="/admin/daftar/guru"
          className={
            isActive === "/admin/daftar/guru"
              ? "flex items-center hover:text-blue-500 transition-colors text-blue-500"
              : "flex items-center hover:text-blue-500 transition-colors"
          }
        >
          Guru
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          href="/admin/daftar/admin"
          className={
            isActive === "/admin/daftar/admin"
              ? "flex items-center hover:text-blue-500 transition-colors text-blue-500"
              : "flex items-center hover:text-blue-500 transition-colors"
          }
        >
          Admin
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          href="/admin/daftar/siswa"
          className={
            isActive === "/admin/daftar/siswa"
              ? "flex items-center hover:text-blue-500 transition-colors text-blue-500"
              : "flex items-center hover:text-blue-500 transition-colors"
          }
        >
          Siswa
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          href="/admin/daftar/kelas"
          className={
            isActive === "/admin/daftar/kelas"
              ? "flex items-center text-blue-500"
              : "flex items-center hover:text-blue-500 transition-colors"
          }
        >
          Kelas
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          href="/admin/daftar/mapel"
          className={
            isActive === "/admin/daftar/mapel"
              ? "flex items-center text-blue-500"
              : "flex items-center hover:text-blue-500 transition-colors"
          }
        >
          Mapel
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
            await Axios.delete("/admin/logout", {
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
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 mb-8">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Admin
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
