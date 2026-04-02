import { defineField, defineType } from "sanity";
import RichTextEditor from "../components/RichTextEditor";

export default defineType({
  name: "news",
  title: "교회 소식",
  type: "document",
  fieldsets: [
    {
      name: "meta",
      title: "기본 정보",
      options: { columns: 3 },
    },
  ],
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
      fieldset: "meta",
      options: {
        list: [
          { title: "공지사항", value: "공지사항" },
          { title: "모임안내", value: "모임안내" },
          { title: "교회소식", value: "교회소식" },
          { title: "교회주보", value: "교회주보" },
          { title: "교우소식", value: "교우소식" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "날짜",
      type: "date",
      fieldset: "meta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isNew",
      title: "새 글",
      type: "boolean",
      fieldset: "meta",
      initialValue: true,
    }),
    defineField({
      name: "body",
      title: "본문",
      type: "text",
      components: {
        input: RichTextEditor,
      },
    }),
    defineField({
      name: "attachments",
      title: "첨부파일",
      type: "array",
      of: [{ type: "file" }],
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
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle} · ${date}`,
      };
    },
  },
});
