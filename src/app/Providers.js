// app/providers.tsx
"use client";

import { DialogDefault } from "@/components/Popup";
import { ContextProvider } from "@/context/context.createabsen";
import { ThemeProvider } from "@material-tailwind/react";

export function Providers({ children }) {
  return (
    <ContextProvider>
      <DialogDefault />
      <ThemeProvider>{children}</ThemeProvider>
    </ContextProvider>
  );
}
