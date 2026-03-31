import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "갤러리",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "앨범 제목",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "날짜",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photos",
      title: "사진",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "설명",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "thumbnail",
      title: "대표 이미지",
      type: "image",
      options: { hotspot: true },
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
      date: "date",
      media: "thumbnail",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date,
        media,
      };
    },
  },
});
