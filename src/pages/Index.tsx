import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { studies } from "@/data/mockData";
import StudyCard from "@/components/StudyCard";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [showAll, setShowAll] = useState(false);
  const displayedStudies = showAll ? studies : studies.slice(0, 3);

  return (
    <div>
      <HeroSection />

      <section id="studies" className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="mb-1 text-2xl font-bold text-foreground">Available Studies</h2>
            <p className="text-sm text-muted-foreground">
              Discover curated research projects matching your profile.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-2 rounded-full border-border px-4 text-sm font-medium text-foreground"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedStudies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>

        {!showAll && studies.length > 3 && (
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
              className="h-11 rounded-full border-trust px-8 text-sm font-medium text-trust hover:bg-trust/5"
            >
              View More
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
