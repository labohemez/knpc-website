"use client";

import AdminShell from "../../components/AdminShell";
import NewsForm from "../NewsForm";
import { createNews } from "../actions";

export default function NewNewsPage() {
  return (
    <AdminShell>
      <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em] mb-5">새 소식 작성</h2>
      <div className="bg-white border border-[#eee] p-6">
        <NewsForm submitLabel="등록" onSubmit={createNews} />
      </div>
    </AdminShell>
  );
}
