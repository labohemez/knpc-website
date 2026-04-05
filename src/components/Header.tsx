"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLive } from "./LiveProvider";

/* ── 인라인 SVG 아이콘 (HeroIcons 24 outline 기반) ── */
function MenuIcon({ name, className = "" }: { name: string; className?: string }) {
  const p: Record<string, React.ReactNode> = {
    person:    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />,
    clock:     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    star:      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />,
    mapPin:    <><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></>,
    heart:     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />,
    check:     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    question:  <><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></>,
    book:      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />,
    bookmark:  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />,
    sunrise:   <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />,
    mic:       <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />,
    child:     <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />,
    academic:  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />,
    people:    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />,
    home:      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />,
    globe:     <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />,
    seedling:  <><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.5 7.5C15.5 5.5 14 3.5 12 3.5S8.5 5.5 8.5 7.5c0 2.5 2 4 3.5 5 1.5-1 3.5-2.5 3.5-5Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 14c1.5-1 3.5-1.5 5-1 1.5-.5 3.5 0 5 1" /></>,
    trophy:    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3-3h.375a.375.375 0 0 0 .375-.375v-.375a3.375 3.375 0 0 0-3.375-3.375h-.71A6.75 6.75 0 0 1 5.25 8.625v-.375c0-.621.504-1.125 1.125-1.125h1.5A2.625 2.625 0 0 0 5.25 4.5h-1.875A1.875 1.875 0 0 0 1.5 6.375v1.5c0 2.071 1.679 3.75 3.75 3.75h.71a6.742 6.742 0 0 0 5.29 5.38V18.75m0 0H8.25m3.75 0h3.75M12 2.25a4.5 4.5 0 0 0-4.5 4.5v1.875c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5V6.75a4.5 4.5 0 0 0-4.5-4.5Z" />,
    pencil:    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />,
    chat:      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />,
    shield:    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />,
    bell:      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />,
    document:  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />,
    clipboard: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H10.5a2.251 2.251 0 0 0-2.15 1.586m0 0A2.25 2.25 0 0 0 6 6.108v10.642A2.25 2.25 0 0 0 8.25 19.5h.253" />,
    photo:     <><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M2.25 18V6a1.5 1.5 0 0 1 1.5-1.5h16.5A1.5 1.5 0 0 1 21.75 6v12a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 8.25h.008v.008h-.008V8.25Z" /></>,
  };
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      {p[name] ?? p.star}
    </svg>
  );
}

const navigation = [
  {
    name: "교회소개",
    href: "/about/greeting",
    groups: [
      { label: "교회소개", children: [
        { name: "환영인사",     desc: "담임목사님의 환영 인사말",           href: "/about/greeting",  icon: "person" },
        { name: "교회비전",     desc: "강남교회의 5대 비전",               href: "/about/vision",    icon: "star" },
        { name: "교회연혁",     desc: "1951년 창립부터의 발자취",           href: "/about/history",   icon: "clock" },
        { name: "섬기는사람들", desc: "담임목사와 교역자 소개",             href: "/about/staff",     icon: "people" },
      ]},
      { label: "안내", children: [
        { name: "예배시간",     desc: "주일·수요·새벽 예배 시간 안내",      href: "/about/worship",   icon: "clock" },
        { name: "헌금안내",     desc: "온라인 헌금 계좌 및 방법 안내",      href: "/about/donation",  icon: "heart" },
        { name: "오시는길",     desc: "교회 위치와 교통편 안내",            href: "/about/location",  icon: "mapPin" },
      ]},
    ],
  },
  {
    name: "새가족안내",
    href: "/newcomer",
    groups: [
      { label: "환영", children: [
        { name: "새가족 환영",    desc: "새가족을 위한 환영 안내",          href: "/newcomer",         icon: "heart" },
        { name: "등록 절차",      desc: "단계별 등록 과정을 안내합니다",    href: "/newcomer#steps",   icon: "check" },
      ]},
      { label: "안내", children: [
        { name: "자주 묻는 질문", desc: "새가족이 궁금해하는 질문 모음",    href: "/newcomer#faq",     icon: "question" },
        { name: "예배 시간",      desc: "각 예배별 시간과 장소 안내",       href: "/newcomer#worship", icon: "clock" },
      ]},
    ],
  },
  {
    name: "말씀과찬양",
    href: "/sermons",
    groups: [
      { label: "설교", children: [
        { name: "주일예배",   desc: "주일 예배 말씀을 다시 들으세요", href: "/sermons?cat=주일예배",   icon: "book" },
        { name: "수요예배",   desc: "수요 예배 말씀 영상과 음성",    href: "/sermons?cat=수요예배",   icon: "bookmark" },
        { name: "새벽기도회", desc: "새벽을 여는 기도와 말씀",       href: "/sermons?cat=새벽기도회", icon: "sunrise" },
        { name: "금요기도회", desc: "금요일 저녁 기도와 찬양",       href: "/sermons?cat=금요기도회", icon: "star" },
        { name: "특별예배",   desc: "부흥회, 수련회 등 특별 예배",    href: "/sermons?cat=특별예배",   icon: "mic" },
      ]},
      { label: "청년", children: [
        { name: "청년1부",   desc: "청년1부(다솔) 예배 말씀",  href: "/sermons?cat=청년1부",   icon: "people" },
        { name: "청년2,3부", desc: "청년2,3부(다니엘,다드림) 예배", href: "/sermons?cat=청년2,3부", icon: "people" },
      ]},
      { label: "찬양", children: [
        { name: "할렐루야",     desc: "할렐루야 찬양대",         href: "/sermons?cat=찬양-할렐루야",   icon: "mic" },
        { name: "호산나",       desc: "호산나 찬양대",           href: "/sermons?cat=찬양-호산나",     icon: "mic" },
        { name: "시온",         desc: "시온 찬양대",             href: "/sermons?cat=찬양-시온",       icon: "mic" },
        { name: "주일찬양",     desc: "주일예배 찬양 영상",       href: "/sermons?cat=찬양-주일예배",   icon: "mic" },
        { name: "금요찬양",     desc: "금요기도회 찬양 영상",     href: "/sermons?cat=찬양-금요기도회", icon: "mic" },
        { name: "기타",         desc: "특별 찬양 및 앙상블",     href: "/sermons?cat=찬양-기타",       icon: "mic" },
      ]},
    ],
  },
  {
    name: "공동체",
    href: "/community",
    groups: [
      { label: "교육 부서", children: [
        { name: "유아·유치·초등부", desc: "어린이 신앙 교육",       href: "/community#children",    icon: "child" },
        { name: "중·고등부",        desc: "다음 세대를 세우는 교육", href: "/community#youth",       icon: "academic" },
        { name: "청년부",            desc: "청년 예배와 교제",       href: "/community#young-adult", icon: "people" },
      ]},
      { label: "교회 공동체", children: [
        { name: "구역예배",          desc: "가정에서 드리는 소모임",  href: "/community#small-group", icon: "home" },
        { name: "선교회",            desc: "남·여 선교회 활동",      href: "/community#mission",     icon: "globe" },
        { name: "장애인부",          desc: "함께하는 통합 예배",      href: "/community#special",     icon: "heart" },
      ]},
    ],
  },
  {
    name: "양육",
    href: "/nurture",
    groups: [
      { label: "기초 과정", children: [
        { name: "새가족 양육", desc: "새가족을 위한 기초 신앙 과정", href: "/nurture#newcomer", icon: "seedling" },
        { name: "성경공부",    desc: "체계적인 말씀 공부 과정",      href: "/nurture#bible",    icon: "book" },
      ]},
      { label: "심화 과정", children: [
        { name: "제자훈련",    desc: "그리스도의 제자로 세워지는 훈련", href: "/nurture#disciple", icon: "trophy" },
        { name: "QT 나눔",     desc: "매일 큐티 나눔과 묵상",        href: "/nurture#qt",       icon: "pencil" },
      ]},
    ],
  },
  {
    name: "훈련",
    href: "/training",
    groups: [
      { label: "사역 훈련", children: [
        { name: "전도훈련",   desc: "복음 전파의 사명을 감당하는 훈련", href: "/training#evangelism", icon: "chat" },
        { name: "리더십훈련", desc: "섬기는 리더로 세워지는 과정",     href: "/training#leadership", icon: "shield" },
      ]},
      { label: "선교 훈련", children: [
        { name: "선교훈련",   desc: "국내외 선교를 준비하는 훈련",     href: "/training#mission",    icon: "globe" },
      ]},
    ],
  },
  {
    name: "커뮤니티",
    href: "/board",
    groups: [
      { label: "소식", children: [
        { name: "공지사항", desc: "교회 주요 공지와 안내",        href: "/news",              icon: "bell" },
        { name: "교회소식", desc: "교회 안팎의 다양한 소식",      href: "/news?tab=교회소식", icon: "document" },
        { name: "주보",     desc: "이번 주 주보를 확인하세요",    href: "/news?tab=주보",     icon: "clipboard" },
      ]},
      { label: "자료", children: [
        { name: "갤러리",   desc: "교회 행사 사진을 모아봅니다",  href: "/gallery",           icon: "photo" },
      ]},
    ],
  },
];

type Sermon = { title: string; pastor: string; date: string; video_url: string | null };

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [latestSermon, setLatestSermon] = useState<Sermon | null>(null);
  const { isLive, liveUrl } = useLive();

  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    supabase
      .from("sermons")
      .select("title, pastor, date, video_url")
      .eq("category", "주일예배")
      .order("date", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => { if (data) setLatestSermon(data as Sermon); });
  }, []);

  const handleMouseEnter = useCallback((name: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(name);
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const cancelLeave = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" onMouseLeave={handleMouseLeave}>

      {/* 헤더 바 */}
      <div className="bg-white border-b border-[#e8e8e8] lg:shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <div className="flex h-[70px] lg:h-[90px] items-center justify-between">
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/images/logo.png" alt="강남교회" width={1961} height={405}
                className="h-[30px] lg:h-[36px] w-auto object-contain" priority unoptimized />
            </Link>

            <nav className="hidden lg:flex items-center h-full">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-4 py-1.5 text-[clamp(0.83rem,0.93vw,1.02rem)] font-semibold tracking-tight transition-colors duration-200 cursor-pointer ${
                      activeMenu === item.name ? "text-primary" : "text-[#1d1d1f] hover:text-primary"
                    }`}
                  >
                    {item.name}
                    <svg className={`w-3 h-3 transition-transform duration-200 ${activeMenu === item.name ? "rotate-180 text-primary" : "text-[#aaa]"}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </Link>
                </div>
              ))}
            </nav>

            {isLive && liveUrl && (
              <a href={liveUrl.trim().split(/\s/)[0]} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-[0.68rem] font-bold tracking-wider transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                ON AIR
              </a>
            )}

            <button type="button" className="lg:hidden p-2 -mr-2 text-[#1d1d1f] cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen
                ? <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Dropdown — 풀 메가메뉴 */}
      <div
        className={`hidden lg:block absolute left-0 right-0 bg-white border-b border-[#e8e8e8] shadow-[0_8px_30px_rgba(0,0,0,0.08)] -mt-[1px] transition-all duration-300 ${
          activeMenu ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        onMouseEnter={cancelLeave}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 py-7 flex gap-6">
          {/* 전체 메뉴 그리드 */}
          <div className="flex-1 grid grid-cols-7 gap-4 min-w-0">
            {navigation.map((item) => (
              <div key={item.name}>
                {/* 섹션 헤더 */}
                <Link
                  href={item.href}
                  onClick={() => setActiveMenu(null)}
                  className="block text-[0.7rem] font-bold text-primary tracking-[0.08em] uppercase mb-3 hover:text-accent transition-colors cursor-pointer"
                >
                  {item.name}
                </Link>
                <div className="flex flex-col gap-0.5">
                  {item.groups.flatMap(g => g.children).slice(0, 7).map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      onClick={() => setActiveMenu(null)}
                      className="group inline-block text-[0.82rem] text-[#444] hover:text-primary font-medium py-1 transition-colors leading-snug cursor-pointer"
                    >
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                        {child.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 최신 설교 패널 */}
          <div className="w-[200px] shrink-0 bg-[#294a3a] rounded-lg p-5 flex flex-col">
            <span className="text-[0.62rem] font-bold text-[#c69d6c] tracking-[0.12em] uppercase mb-3">최신 설교</span>
            {latestSermon ? (
              <>
                <p className="text-[0.9rem] font-bold text-white leading-snug mb-2 flex-1">
                  {latestSermon.title}
                </p>
                <p className="text-[0.72rem] text-white/50 mb-4">
                  {latestSermon.pastor} · {latestSermon.date}
                </p>
                <Link
                  href={latestSermon.video_url ? `/sermons` : "/sermons"}
                  onClick={() => setActiveMenu(null)}
                  className="flex items-center gap-1.5 text-[0.78rem] text-[#c69d6c] font-semibold hover:text-white transition-colors cursor-pointer"
                >
                  <span className="text-[0.7rem]">▶</span> 바로 보기
                </Link>
              </>
            ) : (
              <p className="text-[0.8rem] text-white/40 flex-1">불러오는 중...</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[#e0e0e0] ${
        mobileMenuOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
      }`}>
        <nav>
          {navigation.map((item) => (
            <div key={item.name} className="border-b border-[#f0f0f0] last:border-0">
              <div className="flex items-center">
                <Link href={item.href}
                  className="flex-1 px-5 py-4 text-[0.95rem] font-semibold text-[#1d1d1f] hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}>
                  {item.name}
                </Link>
                <button className="px-4 py-4 text-[#bbb]"
                  onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                  aria-label="하위 메뉴">
                  <svg className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === item.name ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
              <div className={`overflow-hidden transition-all duration-200 ${mobileExpanded === item.name ? "max-h-[500px]" : "max-h-0"}`}>
                <div className="bg-[#f8f8f6] px-5 py-2">
                  {item.groups.flatMap((g) => g.children).map((child) => (
                    <Link key={child.name} href={child.href}
                      className="block py-3 text-[0.9rem] font-medium text-[#333] hover:text-primary transition-colors tracking-[-0.02em] border-b border-[#efefef] last:border-0"
                      onClick={() => setMobileMenuOpen(false)}>
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
