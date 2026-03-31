import { defineField, defineType } from "sanity";

export default defineType({
  name: "banner",
  title: "히어로 배너",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "제목 (관리용)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "배경 이미지",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "정렬 순서",
      type: "number",
    }),
    defineField({
      name: "isActive",
      title: "활성화",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "정렬 순서",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      active: "isActive",
    },
    prepare({ title, media, active }) {
      return {
        title: `${active ? "✓" : "✗"} ${title}`,
        media,
      };
    },
  },
});
