"use client";

import FormLogin from "@/components/FormLogin";
import React from "react";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen relative flex-col">
        <div className="z-10  w-full min-h-screen p- flex flex-col text-center items-center justify-center">
          <FormLogin />
        </div>
        <div className="w-[400px] h-[150px] blur-3xl rounded-full left-[40%] top-1/2 translate-x-[-50%] translate-y-[-50%] bg-gradient-to-t from-blue-300 via-purple-300 to-green-300 absolute"></div>
        <div className="w-[200px] h-[100px] blur-3xl rounded-full right-1/2 top-1/2 translate-x-1/2 translate-y-1/2 bg-gradient-to-t from-blue-500 via-purple-500 to-green-500 absolute"></div>
      </main>
    </>
  );
}
