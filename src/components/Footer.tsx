export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-background">JustResearchers</p>
          <p className="mt-1 text-xs text-background/60">
            &copy; {new Date().getFullYear()} JustResearchers. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6 text-sm text-background/60">
          <span className="cursor-pointer transition-colors hover:text-background">Privacy Policy</span>
          <span className="cursor-pointer transition-colors hover:text-background">Terms of Service</span>
          <span className="cursor-pointer transition-colors hover:text-background">Contact Support</span>
          <span className="cursor-pointer transition-colors hover:text-background">Methodology</span>
        </div>
      </div>
    </footer>
  );
}
