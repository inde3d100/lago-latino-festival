import { Link } from "wouter";
import { useState, useEffect } from "react";
import {
  Ticket,
  Instagram,
  Facebook,
  ExternalLink,
  Menu,
  X,
  FileText,
  Download,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import navLogo from "@assets/logo-new.jpg";
import heroPoster from "@assets/poster-background-new.jpg";

interface PdfDocument {
  title: string;
  description: string;
  path: string;
}

const pdfDocuments: PdfDocument[] = [
  {
    title: "Competition Rules",
    description: "Official rules and regulations for all competition categories",
    path: "/competition-rules.pdf",
  },
];

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { id: "about", label: "About", href: "/#about" },
    { id: "artists", label: "Artists", href: "/artists" },
    { id: "competition", label: "Competition", href: "/competition" },
    { id: "schedule", label: "Schedule", href: "/#schedule" },
    { id: "venue", label: "Venue", href: "/#venue" },
    { id: "tickets", label: "Tickets", href: "/#tickets" },
    { id: "hotels", label: "Hotels", href: "/#hotels" },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mt-3 rounded-2xl border border-border/70 bg-card/50 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/40">
            <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-xl px-2 py-2"
                data-testid="link-home"
              >
                <img src={navLogo} alt="Lago Latino" className="h-10 w-auto rounded-lg" />
              </Link>

              <div className="hidden items-center gap-1 md:flex">
                {links.map((l) =>
                  l.href.startsWith("/") && !l.href.includes("#") ? (
                    <Link
                      key={l.id}
                      href={l.href}
                      className={cn(
                        "rounded-xl px-3 py-2 text-xs font-semibold transition hover:bg-white/5 hover:text-foreground",
                        l.id === "competition" ? "text-foreground" : "text-muted-foreground"
                      )}
                      data-testid={`link-nav-${l.id}`}
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      key={l.id}
                      href={l.href}
                      className="rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                      data-testid={`link-nav-${l.id}`}
                    >
                      {l.label}
                    </a>
                  )
                )}
              </div>

              <div className="flex items-center gap-2">
                <a href="https://fienta.com/lago-latino?utm_source=ig&utm_medium=social&utm_content=link_in_bio" target="_blank" rel="noopener noreferrer" data-testid="link-nav-tickets" className="hidden md:block">
                  <Button
                    size="sm"
                    className="rounded-xl"
                    data-testid="button-nav-tickets"
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    Get Tickets
                  </Button>
                </a>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-xl text-foreground transition hover:bg-white/5 md:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                  data-testid="button-mobile-menu-open"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            data-testid="mobile-menu-backdrop"
          />
          <div className="absolute right-0 top-0 h-full w-72 border-l border-border/70 bg-background/95 shadow-2xl backdrop-blur-lg">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-4">
              <span className="font-display text-sm font-semibold">Menu</span>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-xl text-foreground transition hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                data-testid="button-mobile-menu-close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {links.map((l) =>
                l.href.startsWith("/") && !l.href.includes("#") ? (
                  <Link
                    key={l.id}
                    href={l.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-white/5 hover:text-foreground",
                      l.id === "competition" ? "text-foreground" : "text-muted-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${l.id}`}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.id}
                    href={l.href}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${l.id}`}
                  >
                    {l.label}
                  </a>
                )
              )}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 border-t border-border/70 p-4">
              <a
                href="https://fienta.com/lago-latino?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full rounded-xl" data-testid="button-mobile-tickets">
                  <Ticket className="mr-2 h-4 w-4" />
                  Get Tickets
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PdfModal({
  doc,
  onClose,
}: {
  doc: PdfDocument;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" data-testid="modal-pdf">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border/70 bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
          <h3 className="font-display text-lg font-semibold" data-testid="text-modal-title">
            {doc.title}
          </h3>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl text-foreground transition hover:bg-white/5"
            onClick={onClose}
            aria-label="Close modal"
            data-testid="button-close-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-6 px-6 py-10">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-b from-[hsl(var(--primary)/0.24)] to-[hsl(var(--primary)/0.06)] ring-1 ring-[hsl(var(--primary)/0.35)]">
            <FileText className="h-8 w-8 text-[hsl(var(--primary))]" />
          </div>
          <p className="text-center text-muted-foreground">{doc.description}</p>
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <a
              href={doc.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              data-testid="button-view-pdf"
            >
              <Button className="w-full rounded-xl">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Rules
              </Button>
            </a>
            <a
              href={doc.path}
              download
              className="flex-1"
              data-testid="button-download-pdf"
            >
              <Button variant="outline" className="w-full rounded-xl">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialButton({
  icon,
  label,
  href,
  testid,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  testid: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-white/5 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-foreground"
      data-testid={testid}
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

export default function Competition() {
  const [activePdf, setActivePdf] = useState<PdfDocument | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section
        className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20"
        data-testid="section-competition-hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPoster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <Trophy className="mx-auto mb-4 h-12 w-12 text-[hsl(var(--primary))]" />
          <h1
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            data-testid="text-competition-title"
          >
            COMPETITION
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
            data-testid="text-competition-subtitle"
          >
            Show your skills on the dance floor and compete alongside the best dancers from around the world
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6" data-testid="section-competition-video">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">by Karen & Ricardo</h2>
          <p className="mt-2 text-muted-foreground">EL MUNDIAL 2026</p>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl border border-border/70" style={{ paddingTop: "56.25%" }} data-testid="video-competition">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/WFRqV3ro49U"
            title="Competition Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6" data-testid="section-competition-rules">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Rules & Documents
          </h2>
          <p className="mt-2 text-muted-foreground">
            Read the official competition rules and guidelines before registering
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {pdfDocuments.map((doc, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActivePdf(doc)}
              className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card/60 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)]"
              data-testid={`button-pdf-${i}`}
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-[hsl(var(--primary)/0.24)] to-[hsl(var(--primary)/0.06)] ring-1 ring-[hsl(var(--primary)/0.35)]">
                <FileText className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                  {doc.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {doc.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <div className="text-center" data-testid="section-competition-cta">
          <p className="text-lg text-muted-foreground">
            Ready to compete? Secure your spot at the festival!
          </p>
          <a
            href="https://www.elmundial.dance/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block"
          >
            <Button size="lg" className="rounded-2xl px-8" data-testid="button-competition-register">
              <Ticket className="mr-2 h-4 w-4" />
              Register Here
            </Button>
          </a>
        </div>
      </section>
      <footer className="border-t border-border/70 bg-card/30" data-testid="section-footer">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <div className="font-display text-lg font-semibold tracking-tight" data-testid="text-footer-brand">
                LAGO LATINO FESTIVAL
              </div>
              <div className="mt-2 text-sm text-muted-foreground" data-testid="text-footer-contact">
                lagolatinofestival@gmail.com
              </div>
            </div>

            <div className="flex items-center gap-2" data-testid="row-footer-social">
              <SocialButton icon={<Instagram className="h-4 w-4" />} label="Instagram" href="https://www.instagram.com/lagolatino/" testid="button-social-instagram" />
              <SocialButton icon={<Facebook className="h-4 w-4" />} label="Facebook" href="https://www.facebook.com/profile.php?id=61577140017082" testid="button-social-facebook" />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div data-testid="text-footer-copyright">
              © {new Date().getFullYear()} Lago Latino Festival. All rights reserved.
            </div>
            <a
              href="https://fienta.com/lago-latino?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:underline"
              data-testid="link-footer-tickets"
            >
              Get tickets
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>
      {activePdf && (
        <PdfModal doc={activePdf} onClose={() => setActivePdf(null)} />
      )}
    </div>
  );
}
