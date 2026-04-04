import { getSermons, type Sermon } from "@/lib/queries";
import SermonsClient from "./SermonsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "말씀과 찬양",
  description: "강남교회 설교 영상과 음성을 다시 들으세요. 주일예배, 수요예배, 새벽기도회, 금요기도회, 특별예배, 청년예배.",
};

/* 하드코딩 폴백 데이터 (CMS 데이터가 없을 때) */
const fallbackSermons: Sermon[] = [
  { _id: "1", title: "온전한 믿음이란 무엇인가", category: "주일예배", scripture: "야고보서 2:14-26", pastor: "담임목사", date: "2026-03-29", videoUrl: "https://www.youtube.com/watch?v=eKtED6_4l3U" },
  { _id: "2", title: "두려움을 이기는 믿음", category: "주일예배", scripture: "야고보서 1:2-8", pastor: "담임목사", date: "2026-03-22" },
  { _id: "3", title: "기도하는 자의 복", category: "새벽기도회", scripture: "마태복음 7:7-11", pastor: "담임목사", date: "2026-03-18" },
  { _id: "4", title: "부활의 소망으로 살라", category: "주일예배", scripture: "고린도전서 15:19-28", pastor: "담임목사", date: "2026-03-15" },
  { _id: "5", title: "성령 안에서 기도하라", category: "수요예배", scripture: "에베소서 6:18-20", pastor: "부목사", date: "2026-03-11" },
  { _id: "6", title: "시험을 이기는 믿음", category: "주일예배", scripture: "야고보서 1:12-18", pastor: "담임목사", date: "2026-03-08" },
  { _id: "7", title: "금요 기도의 능력", category: "금요기도회", scripture: "사도행전 16:25-34", pastor: "담임목사", date: "2026-03-07" },
  { _id: "8", title: "청년이여 일어나라", category: "청년예배", scripture: "디모데전서 4:12", pastor: "청년부 목사", date: "2026-03-02" },
  { _id: "9", title: "인내로 완전하게 되는 길", category: "주일예배", scripture: "야고보서 5:7-11", pastor: "담임목사", date: "2026-02-22" },
];

export default async function SermonsPage() {
  let sermons: Sermon[];
  try {
    sermons = await getSermons(undefined, 1500);
    if (sermons.length === 0) sermons = fallbackSermons;
  } catch {
    sermons = fallbackSermons;
  }

  return <SermonsClient sermons={sermons} />;
}
