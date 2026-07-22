import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import {
  PROJECTS,
  getProject,
  getProjectSlugs,
} from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Case study not found",
    };
  }

  return {
    title: `${project.title} | Client work`,
    description: project.outcome,
    openGraph: {
      title: `${project.title} — ${project.client}`,
      description: project.outcome,
      images: [project.imageSrc],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.client}`,
      description: project.outcome,
      images: [project.imageSrc],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  // Compute next project (wraps around)
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const nextProject =
    next && next.slug !== project.slug
      ? { slug: next.slug, title: next.title, client: next.client }
      : null;

  return <CaseStudyLayout project={project} nextProject={nextProject} />;
}
