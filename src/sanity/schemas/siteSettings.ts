import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "사이트 설정",
  type: "document",
  fields: [
    defineField({
      name: "annualSlogan",
      title: "연간 표어",
      type: "string",
    }),
    defineField({
      name: "annualYear",
      title: "표어 연도",
      type: "string",
    }),
    defineField({
      name: "annualVerse",
      title: "표어 성경구절",
      type: "text",
    }),
    defineField({
      name: "annualVerseRef",
      title: "표어 구절 출처",
      type: "string",
    }),
    defineField({
      name: "annualSubtitle",
      title: "표어 부제",
      type: "string",
    }),
    defineField({
      name: "offeringAccount",
      title: "헌금 계좌",
      type: "string",
    }),
    defineField({
      name: "offeringBank",
      title: "헌금 은행",
      type: "string",
    }),
    defineField({
      name: "offeringHolder",
      title: "예금주",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "교회 주소",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "전화번호",
      type: "string",
    }),
    defineField({
      name: "fax",
      title: "팩스",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "이메일",
      type: "string",
    }),
    defineField({
      name: "prayerEmail",
      title: "기도요청 이메일",
      type: "string",
    }),
    defineField({
      name: "youtubeUrl",
      title: "유튜브 URL",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "사이트 설정" };
    },
  },
});
