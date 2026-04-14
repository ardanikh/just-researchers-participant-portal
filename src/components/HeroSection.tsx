import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToStudies = () => {
    document.getElementById("studies")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Left */}
        <div>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Find trusted research studies and get rewarded for your time
          </h1>
          <p className="mb-8 text-base text-muted-foreground md:text-lg">
            Browse studies freely. Join only when you're ready.
          </p>
          <Button
            onClick={scrollToStudies}
            className="h-12 px-8 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Explore Studies
          </Button>
        </div>

        {/* Right — placeholder */}
        <div className="hidden items-center justify-center lg:flex">
          <div className="flex h-72 w-full max-w-md items-center justify-center rounded-lg border border-border bg-muted">
            <span className="text-sm text-muted-foreground">Illustration placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
}
