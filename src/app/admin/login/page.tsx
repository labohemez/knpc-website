"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await loginAction(password);
    if (result.ok) {
      router.push("/admin/news");
    } else {
      setError(result.error || "로그인 실패");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-content-center">
      <div className="w-full max-w-[360px] mx-auto">
        <div className="bg-white p-8 shadow-sm" style={{ borderTop: "3px solid #294a3a" }}>
          <h1 className="text-[1.1rem] font-bold text-[#222] mb-1 tracking-[-0.03em]">강남교회 CMS</h1>
          <p className="text-[0.8rem] text-[#999] mb-6">관리자 로그인</p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              autoFocus
              className="w-full px-3 py-2.5 text-[0.85rem] border border-[#ddd] focus:border-[#294a3a] focus:ring-1 focus:ring-[#294a3a]/20 outline-none transition-colors mb-3"
            />
            {error && <p className="text-[0.75rem] text-red-500 mb-3">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-2.5 bg-[#294a3a] text-white text-[0.85rem] font-medium hover:bg-[#1e3a2d] disabled:opacity-50 transition-colors"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
