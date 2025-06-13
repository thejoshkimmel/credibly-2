export function Footer() {
  return (
    <footer className="container mx-auto px-4 py-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Credibly. All rights reserved.
        </div>
        <nav className="flex gap-4">
          <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms of Service
          </a>
          <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy Policy
          </a>
          <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
} 