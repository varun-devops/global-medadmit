"use client";

import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { AuthProvider } from "@/lib/auth/AuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: { borderRadius: "12px", fontSize: "14px" },
            success: { iconTheme: { primary: "#0a8f6a", secondary: "#fff" } },
          }}
        />
      </AuthProvider>
    </LanguageProvider>
  );
}
