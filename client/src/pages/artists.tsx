import { Link } from "wouter";
import {
  Sparkles,
  Ticket,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroPoster from "@assets/poster-square.jpg";

function Nav() {
  const links = [
    { id: "about", label: "About", href: "/#about" },
    { id: "artists", label: "Artists", href: "/artists" },
    { id: "schedule", label: "Schedule", href: "/#schedule" },
    { id: "venue", label: "Venue", href: "/#venue" },
    { id: "tickets", label: "Tickets", href: "/#tickets" },
    { id: "hotels", label: "Hotels", href: "/#hotels" },
    { id: "location", label: "Location", href: "/#location" },
  ] as const;

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mt-3 rounded-2xl border border-border/70 bg-card/50 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/40">
          <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-xl px-2 py-2"
              data-testid="link-home"
            >
              <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-b from-[hsl(var(--primary)/0.24)] to-[hsl(var(--primary)/0.06)] ring-1 ring-[hsl(var(--primary)/0.35)]">
                <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" strokeWidth={2} />
              </span>
              <div className="hidden sm:block">
                <div className="font-display text-sm leading-none tracking-tight">
                  Lago Latino
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">Ioannina • 2026</div>
              </div>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                l.href.startsWith("/") && !l.href.includes("#") ? (
                  <Link
                    key={l.id}
                    href={l.href}
                    className={cn(
                      "rounded-xl px-3 py-2 text-xs font-semibold transition hover:bg-white/5 hover:text-foreground",
                      l.id === "artists" ? "text-foreground" : "text-muted-foreground"
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
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a href="https://fienta.com/lago-latino?utm_source=ig&utm_medium=social&utm_content=link_in_bio" target="_blank" rel="noopener noreferrer" data-testid="link-nav-tickets">
                <Button
                  size="sm"
                  className="rounded-xl"
                  data-testid="button-nav-tickets"
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  Get Tickets
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtistCard({ index }: { index: number }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)]"
      data-testid={`card-artist-${index}`}
    >
      <div className="relative aspect-square bg-gradient-to-br from-white/5 to-white/[0.02]">
        <div className="absolute inset-0 flex items-center justify-center">
          <User className="h-16 w-16 text-white/10" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <span className="rounded-full border border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.15)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
            Coming Soon
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground" data-testid={`artist-name-${index}`}>
          Artist TBA
        </h3>
        <p className="mt-1 text-sm text-muted-foreground" data-testid={`artist-role-${index}`}>
          Instructor / DJ / Performer
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="h-4 w-6 rounded-sm bg-white/10" />
          <span className="text-xs text-muted-foreground/60">Country TBA</span>
        </div>
      </div>
    </div>
  );
}

function SocialButton({
  icon,
  label,
  testid,
}: {
  icon: React.ReactNode;
  label: string;
  testid: string;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-white/5 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-foreground"
      data-testid={testid}
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export default function Artists() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section
        className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20"
        data-testid="section-artists-hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPoster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            data-testid="text-artists-title"
          >
            MEGA LINEUP
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
            data-testid="text-artists-subtitle"
          >
            Top international artists • Legendary DJs • World-class workshops & bootcamps
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" data-testid="section-artists-grid">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <ArtistCard key={i} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center" data-testid="section-artists-cta">
          <p className="text-lg text-muted-foreground">
            Stay tuned — full lineup announcement coming soon!
          </p>
          <a
            href="https://fienta.com/lago-latino?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block"
          >
            <Button size="lg" className="rounded-2xl px-8" data-testid="button-artists-tickets">
              <Ticket className="mr-2 h-4 w-4" />
              Get Tickets
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
              <SocialButton icon={<Instagram className="h-4 w-4" />} label="Instagram" testid="button-social-instagram" />
              <SocialButton icon={<Facebook className="h-4 w-4" />} label="Facebook" testid="button-social-facebook" />
              <SocialButton icon={<Youtube className="h-4 w-4" />} label="YouTube" testid="button-social-youtube" />
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
    </div>
  );
}
