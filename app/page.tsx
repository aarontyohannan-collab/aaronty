import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { SkillsPreview } from "@/components/sections/SkillsPreview";
import { JourneyPreview } from "@/components/sections/JourneyPreview";
import { InterestsPreview } from "@/components/sections/InterestsPreview";
import { ProjectEmptyState } from "@/components/sections/ProjectEmptyState";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Futuristic Hero Section with 3D Core */}
      <HeroSection />

      {/* 2. Core Skills & Foundations Preview */}
      <SkillsPreview />

      {/* 3. Engineering Journey Preview */}
      <JourneyPreview />

      {/* 4. Beyond the Code (Gaming & Interests) */}
      <InterestsPreview />

      {/* 5. Project Showcase Blueprint & Empty State */}
      <ProjectEmptyState />

      {/* 6. Contact & Opportunity CTA */}
      <ContactCTA />
    </div>
  );
}
