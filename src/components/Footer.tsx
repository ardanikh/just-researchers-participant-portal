export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left lg:px-8">
        <p>&copy; {new Date().getFullYear()} JustResearchers. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-foreground">Privacy</span>
          <span className="cursor-pointer hover:text-foreground">Terms</span>
          <span className="cursor-pointer hover:text-foreground">Contact</span>
        </div>
      </div>
    </footer>
  );
}
