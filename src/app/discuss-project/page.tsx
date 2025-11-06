"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProjectDiscussionFormFullPage } from "@/components/ProjectDiscussionFormFullPage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Suspense } from "react";

function DiscussProjectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceName = searchParams?.get("service") || undefined;

  return (
    <ProjectDiscussionFormFullPage 
      onClose={() => router.back()}
      serviceName={serviceName}
    />
  );
}

export default function DiscussProjectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <div className="min-h-screen bg-black">
        <DiscussProjectContent />
      </div>
    </Suspense>
  );
}

