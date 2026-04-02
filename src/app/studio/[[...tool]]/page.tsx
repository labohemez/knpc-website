"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";
import "../sanity-custom.css";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
