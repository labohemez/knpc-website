import { defineField, defineType } from "sanity";

export default defineType({
  name: "sermon",
  title: "설교",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "제목",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "분류",
      type: "string",
      options: {
        list: [
          { title: "주일예배", value: "주일예배" },
          { title: "수요예배", value: "수요예배" },
          { title: "금요기도회", value: "금요기도회" },
          { title: "새벽기도회", value: "새벽기도회" },
          { title: "특별예배", value: "특별예배" },
          { title: "청년예배", value: "청년예배" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scripture",
      title: "성경구절",
      type: "string",
    }),
    defineField({
      name: "pastor",
      title: "설교자",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "날짜",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "영상 URL (유튜브)",
      type: "url",
    }),
    defineField({
      name: "thumbnail",
      title: "썸네일",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "audioFile",
      title: "음성 파일",
      type: "file",
    }),
  ],
  orderings: [
    {
      title: "날짜 (최신순)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      date: "date",
      media: "thumbnail",
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle} · ${date}`,
      };
    },
  },
});
