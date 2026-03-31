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
- Project ID: o959kuy5
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

## Design Context

### Users
- **주요 사용자**: 강남교회 교인 (전 연령대, 특히 고령 사용자 비율 높음)
- **부차 사용자**: 교회를 방문하려는 새신자, 외부 방문자
- **핵심 Job**: 교회 생활에 필요한 정보를 빠르고 편하게 찾는 것

### Brand Personality
- **3단어**: 따뜻한 · 신뢰 · 전통
- **감정 목표**: 평안함과 안식, 영감과 감동, 환영과 소속감
- **브랜드 컬러**: 네이비(`#1B3C8E`) 메인, 그린(`#2E8B57`) 포인트, 레드(`#D32F2F`) 강조

### Aesthetic Direction
- **비주얼 톤**: 모던하고 세련된, 라이트 모드 전용
- **레퍼런스**: 만나교회(manna.or.kr) — 시원시원한 레이아웃 참고, 콘텐츠는 강남교회 자체
- **안티-레퍼런스**: 화려/복잡한 사이트, 올드한 교회 사이트, 스타트업풍

### Accessibility
- WCAG 2.1 AA 이상, 고령 사용자 배려 (본문 16px+, 대비 4.5:1+, 터치타겟 44px+)

### Design Principles
1. **명료함 우선**: 정보는 한눈에 파악, 명확한 구조와 가독성 우선
2. **따뜻한 절제**: 모던하되 차갑지 않게, 세련된 미니멀리즘에 교회의 온기
3. **누구나 쉽게**: 나이/기기/환경 관계없이 편하게 사용
4. **신뢰의 일관성**: 컬러/타이포/간격/톤 전체 일관 유지
5. **콘텐츠가 주인공**: UI는 콘텐츠를 돋보이게 하는 그릇
