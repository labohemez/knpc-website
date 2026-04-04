"use client";

import AdminShell from "../../components/AdminShell";
import LiveForm from "../LiveForm";
import { createLive } from "../actions";

export default function LiveNewPage() {
  return (
    <AdminShell>
      <h2 className="text-[1.1rem] font-bold text-[#222] tracking-[-0.03em] mb-5">LIVE 등록</h2>
      <div className="bg-white border border-[#eee] p-6">
        <LiveForm submitLabel="등록" onSubmit={createLive} />
      </div>
    </AdminShell>
  );
}
