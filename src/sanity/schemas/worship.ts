import { defineField, defineType } from "sanity";

export default defineType({
  name: "worship",
  title: "예배 안내",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "예배명",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "times",
      title: "시간",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "location",
      title: "장소",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "정렬 순서",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "정렬 순서",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
