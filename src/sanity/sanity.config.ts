import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "knpc",
  title: "강남교회 CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      name: "structure",
      structure: (S) =>
        S.list()
          .id("root")
          .title("콘텐츠")
          .items([
            // ── 콘텐츠 ──
            S.listItem()
              .id("news")
              .title("교회 소식")
              .schemaType("news")
              .child(S.documentTypeList("news").title("교회 소식")),

            S.listItem()
              .id("sermon")
              .title("설교")
              .schemaType("sermon")
              .child(S.documentTypeList("sermon").title("설교")),

            S.listItem()
              .id("gallery")
              .title("갤러리")
              .schemaType("gallery")
              .child(S.documentTypeList("gallery").title("갤러리")),

            S.listItem()
              .id("worship")
              .title("예배 안내")
              .schemaType("worship")
              .child(S.documentTypeList("worship").title("예배 안내")),

            S.divider(),

            // ── 설정 ──
            S.listItem()
              .id("banner")
              .title("히어로 배너")
              .schemaType("banner")
              .child(S.documentTypeList("banner").title("히어로 배너")),

            S.listItem()
              .id("siteSettings")
              .title("사이트 설정")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("사이트 설정")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
