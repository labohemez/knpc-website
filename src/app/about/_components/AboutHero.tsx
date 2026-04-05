import PageHero from "@/components/PageHero";

interface Props {
  pageName: string;
}

export default function AboutHero({ pageName }: Props) {
  return (
    <PageHero
      breadcrumbs={[
        { name: "홈", href: "/" },
        { name: "교회소개", href: "/about/greeting" },
        { name: pageName },
      ]}
      title={pageName}
    />
  );
}
