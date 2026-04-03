"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 쿠키에 admin-session이 있는지 확인
    const hasSession = document.cookie.includes("admin-session");
    if (!hasSession) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null;
  return <>{children}</>;
}
