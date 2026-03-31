@AGENTS.md

# 강남교회 공식 홈페이지 - 개발 지침

## GitHub 저장소
https://github.com/labohemez/knpc-website

## 기술 스택
- **프레임워크**: Next.js (App Router, TypeScript)
- **스타일링**: Tailwind CSS
- **CMS**: Sanity (Headless CMS)
- **호스팅**: Vercel
- **현재 도메인**: knpc.or.kr

## 프로젝트 개요
대한예수교장로회 강남교회 공식 홈페이지 리뉴얼.
기존 아이엠웹(imweb) 사이트를 Next.js + Sanity CMS로 마이그레이션.

## 연관 프로젝트
- **예약 시스템**: reserve.knpc.or.kr (별도 저장소: kangnam-church-reservation)
  - 순수 HTML/JS + Supabase 구조
  - 디자인 톤 통일 검토 필요

## Sanity 설정
- Project ID: (추후 설정)
- Dataset: production
- API Version: 2024-01-01

## 디렉토리 구조
```
src/
  app/              # Next.js App Router 페이지
  components/       # 공통 컴포넌트
  lib/              # Sanity client, 유틸리티
  sanity/           # Sanity 스키마, 설정
```

## 페이지 구성 (예정)
| 페이지 | 경로 | 설명 |
|--------|------|------|
| 메인 | / | 히어로, 예배 안내, 최근 설교, 공지 |
| 교회소개 | /about | 인사말, 역사, 조직, 오시는길 |
| 예배안내 | /worship | 예배 시간, 장소 안내 |
| 설교 | /sermons | 설교 영상/음성 목록, 검색 |
| 소식 | /news | 공지사항, 교회 소식, 주보 |
| 갤러리 | /gallery | 사진 갤러리 |
| 교육부서 | /ministry | 각 부서 소개 |
| 오시는길 | /contact | 지도, 연락처 |

## 배포
- Vercel 자동 배포 (main 브랜치 push)
- 프리뷰 배포: PR 생성 시 자동
