import { studies } from "@/data/mockData";
import StudyCard from "@/components/StudyCard";
import HeroSection from "@/components/HeroSection";

export default function Index() {
  return (
    <div>
      <HeroSection />

      <section id="studies" className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Available Studies</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Browse openly — no account needed to explore.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {studies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      </section>
    </div>
  );
}
