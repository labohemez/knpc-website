"use client";

import AdminShell from "../../components/AdminShell";
import SermonForm from "../SermonForm";
import { createSermon } from "../actions";

export default function NewSermonPage() {
  return (
    <AdminShell>
      <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em] mb-5">설교 등록</h2>
      <div className="bg-white border border-[#eee] p-6">
        <SermonForm submitLabel="등록" onSubmit={createSermon} />
      </div>
    </AdminShell>
  );
}
