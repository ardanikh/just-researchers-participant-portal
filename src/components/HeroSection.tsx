import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToStudies = () => {
    document.getElementById("studies")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-background pb-8 pt-16 md:pb-12 md:pt-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground md:text-5xl md:leading-tight">
          Shape the future of{" "}
          <span className="text-trust">digital innovation.</span>
        </h1>

        {/* Search bar */}
        <div className="mx-auto flex max-w-xl items-center gap-2 rounded-full border border-border bg-background px-5 py-2 shadow-sm">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Find your next research opportunity..."
            className="h-11 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <Button
            onClick={scrollToStudies}
            className="h-9 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90"
          >
            Explore
          </Button>
        </div>
      </div>
    </section>
  );
}
