import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  Compass,
  MapPin,
  Sparkles,
  Ticket,
  Plane,
  Hotel,
  Music,
  Trophy,
  Instagram,
  Facebook,
  ExternalLink,
  X,
  Expand,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import heroPoster from "@assets/poster-background-new.jpg";
import heroVideo from "@assets/lago-latino-trailer-web_1771240662943.mp4";
import heroVideoMobile from "@assets/lago-latino-reel-web.mp4";
import fullPoster from "@assets/poster-up-new.jpg";
import navLogo from "@assets/logo-new.jpg";

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.18, rootMargin: "-10% 0px -10% 0px", ...(options ?? {}) },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [options]);

  return { ref, inView };
}

function Section({
  id,
  label,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id: string;
  label: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInView();

  return (
    <section id={id} aria-label={label} className={cn("py-16 sm:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
          className="space-y-3"
        >
          {eyebrow ? (
            <div
              className="flex items-center gap-2"
              data-testid={`text-eyebrow-${id}`}
            >
              <span className="h-[1px] w-8 bg-border/70" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
            </div>
          ) : null}
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2
                className="font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl"
                data-testid={`text-title-${id}`}
              >
                {title}
              </h2>
              {description ? (
                <p
                  className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                  data-testid={`text-description-${id}`}
                >
                  {description}
                </p>
              ) : null}
            </div>
          </div>
        </motion.div>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allLinks = [
    { id: "about", label: "About", href: "#about" },
    { id: "artists", label: "Artists", href: "/artists" },
    { id: "competition", label: "Competition", href: "/competition" },
    { id: "schedule", label: "Schedule", href: "#schedule" },
    { id: "venue", label: "Venue", href: "#venue" },
    { id: "tickets", label: "Tickets", href: "#tickets" },
    { id: "hotels", label: "Hotels", href: "#hotels" },
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
              <a
                href="#top"
                className="group inline-flex items-center gap-2 rounded-xl px-2 py-2"
                data-testid="link-home"
              >
                <img src={navLogo} alt="Lago Latino" className="h-10 w-auto rounded-lg" />
              </a>

              <div className="hidden items-center gap-1 md:flex">
                {allLinks.map((l) => (
                  l.href.startsWith("/") ? (
                    <Link
                      key={l.id}
                      href={l.href}
                      className="rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
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
              {allLinks.map((l) => (
                l.href.startsWith("/") ? (
                  <Link
                    key={l.id}
                    href={l.href}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
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
              ))}
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

function PosterBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        src={heroVideoMobile}
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
      />
      <video
        className="absolute inset-0 h-full w-full object-cover hidden md:block"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 70%, hsl(var(--background)) 100%)" }} />
    </div>
  );
}

function StatPill({
  icon,
  label,
  value,
  testid,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  testid: string;
}) {
  return (
    <div
      className="grain inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-card/55 px-4 py-3 shadow-sm backdrop-blur"
      data-testid={testid}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </div>
        <div className="font-display text-lg tracking-tight">{value}</div>
      </div>
    </div>
  );
}

function Card({
  children,
  className,
  testid,
}: {
  children: React.ReactNode;
  className?: string;
  testid: string;
}) {
  return (
    <div
      className={cn(
        "grain group relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm backdrop-blur transition will-change-transform hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      data-testid={testid}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -top-20 right-[-70px] h-52 w-52 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.32),transparent_70%)] blur-xl" />
      </div>
      {children}
    </div>
  );
}

export default function FestivalLanding() {
  const reduceMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    if (lightboxOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Nav />
      {/* HERO */}
      <header
        ref={heroRef}
        className="relative isolate min-h-[100svh] overflow-hidden"
        data-testid="section-hero"
      >
        <PosterBackdrop />

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-2" data-testid="row-hero-badges">
              <Badge variant="secondary" className="rounded-full" data-testid="badge-hero-dates">
                <CalendarDays className="mr-2 h-3.5 w-3.5" />
                13–15 March 2026
              </Badge>
              <Badge variant="secondary" className="rounded-full" data-testid="badge-hero-location">
                <MapPin className="mr-2 h-3.5 w-3.5" />
                Ioannina, Greece
              </Badge>
              <Badge
                className="rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                data-testid="badge-hero-price"
              >Full pass from €119</Badge>
            </div>

            <h1
              className="mt-5 font-display text-5xl leading-[0.92] tracking-tight sm:text-6xl md:text-7xl"
              data-testid="text-hero-title"
            >
              LAGO LATINO
              <span className="block text-[hsl(var(--primary))]">FESTIVAL</span>
            </h1>

            <p
              className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
              data-testid="text-hero-subtitle"
            >
              The Ultimate Salsa & Bachata Festival! Dance, connect & celebrate by the stunning lakeside of historic Ioannina.
            </p>

            <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
              <a href="https://fienta.com/lago-latino?utm_source=ig&utm_medium=social&utm_content=link_in_bio" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <Button
                  size="lg"
                  className="w-full rounded-2xl px-6 md:w-auto"
                  data-testid="button-hero-tickets"
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  Get Tickets
                </Button>
              </a>
              <a
                href="#venue"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-border/70 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition hover:bg-white/5 md:w-auto"
                data-testid="link-hero-venue"
              >
                <Compass className="mr-2 h-4 w-4 text-[hsl(var(--primary))]" />
                How to get there
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <StatPill
                icon={<Music className="h-4 w-4 text-[hsl(var(--primary))]" />}
                label="Dance halls"
                value="850m² + 350m²"
                testid="stat-dance-halls"
              />
              <StatPill
                icon={<Hotel className="h-4 w-4 text-[hsl(var(--primary))]" />}
                label="Venue"
                value="Epirus Palace 5*"
                testid="stat-venue"
              />
              <StatPill
                icon={<Plane className="h-4 w-4 text-[hsl(var(--primary))]" />}
                label="Airport"
                value="IOA"
                testid="stat-airport"
              />
            </div>
          </motion.div>

          <div className="mt-12 flex items-center gap-3" data-testid="row-hero-scroll">
            <span className="h-px w-10 bg-white/15" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Scroll
            </span>
          </div>
        </div>
      </header>
      {/* ABOUT */}
      <Section
        id="about"
        label="About"
        eyebrow="The experience"
        title="The experience that becomes legacy"
        description="Set beside the lake in historic Ioannina, Lago Latino is a curated 3-day salsa escape — crafted for dancers who love quality, music, and unforgettable nights."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card testid="card-feature-workshops">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <Sparkles className="h-5 w-5 text-[hsl(var(--primary))]" />
              </span>
              <div>
                <div className="text-sm font-semibold" data-testid="text-feature-workshops-title">
                  Workshops & Bootcamps
                </div>
                <p
                  className="mt-2 text-sm text-muted-foreground"
                  data-testid="text-feature-workshops-desc"
                >
                  Sharpen technique, styling, musicality — with a premium learning flow.
                </p>
              </div>
            </div>
          </Card>

          <Card testid="card-feature-social">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <Music className="h-5 w-5 text-[hsl(var(--primary))]" />
              </span>
              <div>
                <div className="text-sm font-semibold" data-testid="text-feature-social-title">
                  Social Dancing & Parties
                </div>
                <p
                  className="mt-2 text-sm text-muted-foreground"
                  data-testid="text-feature-social-desc"
                >
                  Warm lighting, big smiles, and music that keeps you in the room.
                </p>
              </div>
            </div>
          </Card>

          <Card testid="card-feature-competition">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <Trophy className="h-5 w-5 text-[hsl(var(--primary))]" />
              </span>
              <div>
                <div
                  className="text-sm font-semibold"
                  data-testid="text-feature-competition-title"
                >
                  El Mundial Competition
                </div>
                <p
                  className="mt-2 text-sm text-muted-foreground"
                  data-testid="text-feature-competition-desc"
                >
                  High stakes, high energy — a show moment inside the weekend.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setLightboxOpen(true)}
            className="group relative overflow-hidden rounded-2xl border-2 border-[hsl(var(--primary)/0.5)] bg-card/60 p-2 shadow-lg transition hover:-translate-y-1 hover:border-[hsl(var(--primary))] hover:shadow-xl"
            data-testid="button-view-poster"
          >
            <img
              src={fullPoster}
              alt="Festival Poster"
              className="h-auto w-[200px] rounded-xl object-cover sm:w-[240px]"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))]">
                <Expand className="h-4 w-4" />
                View Poster
              </div>
            </div>
          </button>
        </div>
      </Section>
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
          data-testid="lightbox-backdrop"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/90"
          />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
            className="relative z-10 max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullPoster}
              alt="Festival Poster Full"
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              data-testid="img-lightbox-poster"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
              data-testid="button-lightbox-close"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      )}
      {/* SCHEDULE */}
      <Section
        id="schedule"
        label="Schedule"
        eyebrow="Three nights"
        title="Schedule"
        description="A clean, dancer-friendly flow — workshops by day, socials by night. (Placeholder timing)"
      >
        <Tabs defaultValue="fri" className="w-full" data-testid="tabs-schedule">
          <TabsList className="w-full justify-start rounded-2xl bg-card/50 p-1" data-testid="tabslist-schedule">
            <TabsTrigger value="fri" className="rounded-xl" data-testid="tab-fri">
              Fri
            </TabsTrigger>
            <TabsTrigger value="sat" className="rounded-xl" data-testid="tab-sat">
              Sat
            </TabsTrigger>
            <TabsTrigger value="sun" className="rounded-xl" data-testid="tab-sun">
              Sun
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fri" className="mt-6" data-testid="panel-fri">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarDays className="mb-4 h-12 w-12 text-[hsl(var(--primary)/0.6)]" />
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Schedule Coming Soon
              </h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Stay tuned — full workshop and party schedule will be announced shortly.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="sat" className="mt-6" data-testid="panel-sat">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarDays className="mb-4 h-12 w-12 text-[hsl(var(--primary)/0.6)]" />
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Schedule Coming Soon
              </h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Stay tuned — full workshop and party schedule will be announced shortly.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="sun" className="mt-6" data-testid="panel-sun">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarDays className="mb-4 h-12 w-12 text-[hsl(var(--primary)/0.6)]" />
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Schedule Coming Soon
              </h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Stay tuned — full workshop and party schedule will be announced shortly.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Section>
      {/* VENUE */}
      <Section
        id="venue"
        label="Venue"
        eyebrow="Epirus Palace"
        title="Venue"
        description="A 5-star hotel with two ballrooms, lakeside views, and a spa — built for comfort between dances."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Card testid="card-venue-text" className="p-7">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs font-semibold text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
                Epirus Palace Hotel Congress & Spa 5*
              </div>
              <h3 className="font-display text-2xl tracking-tight" data-testid="text-venue-title">
                Two rooms. One heartbeat.
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground" data-testid="text-venue-desc">
                Enjoy 850m² + 350m² ballrooms, smooth floors, and a layout that keeps the energy
                flowing. Step outside to lakeside air, or reset in the spa before the next set.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-white/5 p-4" data-testid="stat-venue-halls">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Ballrooms
                  </div>
                  <div className="mt-1 font-display text-xl">2 halls</div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-white/5 p-4" data-testid="stat-venue-spa">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Recovery
                  </div>
                  <div className="mt-1 font-display text-xl">Spa access</div>
                </div>
              </div>
            </div>
          </Card>

          <div
            className="grain relative overflow-hidden rounded-3xl border border-border/70 bg-card/55 shadow-sm"
            data-testid="img-venue-placeholder"
            aria-label="Venue image placeholder"
          >
            <div className="p-7 pb-0">
              <div className="font-display text-2xl tracking-tight" data-testid="text-venue-name">Epirus Palace Congress</div>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-venue-address">
                Ioannina, Greece
              </p>
            </div>
            <div className="p-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14028.16362916453!2d20.841077587405266!3d39.65951574270266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135be9ca7232227f%3A0xbb3fe03c009d5e60!2sEpirus%20Palace%20Congress!5e0!3m2!1sen!2sgr!4v1770971099144!5m2!1sen!2sgr"
                className="w-full rounded-2xl"
                style={{ height: "400px", border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Epirus Palace Congress - Venue Location"
                data-testid="iframe-map"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Card testid="card-how-to-get" className="p-7">
            <h3 className="font-display text-2xl tracking-tight" data-testid="text-howto-title">
              How to get there
            </h3>
            <div className="mt-5 space-y-4">
              <div className="flex gap-3" data-testid="row-howto-airport">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Plane className="h-5 w-5 text-[hsl(var(--primary))]" />
                </span>
                <div>
                  <div className="text-sm font-semibold" data-testid="text-howto-airport-title">
                    Fly to IOA
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground" data-testid="text-howto-airport-desc">
                    Ioannina Airport (IOA) is the closest — ideal for a quick arrival.
                  </p>
                </div>
              </div>
              <div className="flex gap-3" data-testid="row-howto-venue">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <MapPin className="h-5 w-5 text-[hsl(var(--primary))]" />
                </span>
                <div>
                  <div className="text-sm font-semibold" data-testid="text-howto-venue-title">
                    Head to Epirus Palace
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground" data-testid="text-howto-venue-desc">
                    Venue: Epirus Palace Hotel Congress & Spa 5*
                  </p>
                </div>
              </div>
              <div className="flex gap-3" data-testid="row-howto-tip">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Compass className="h-5 w-5 text-[hsl(var(--primary))]" />
                </span>
                <div>
                  <div className="text-sm font-semibold" data-testid="text-howto-tip-title">
                    Plan for nights
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground" data-testid="text-howto-tip-desc">
                    Bring layers and comfy shoes — the schedule is built for late socials.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>
      {/* TICKETS */}
      <Section
        id="tickets"
        label="Tickets"
        eyebrow="Passes"
        title="Tickets"
        description="Choose your weekend — early bird for the quick, VIP for the unforgettable."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <TicketCard
            title="Early Bird"
            price="€89"
            highlight={false}
            bullets={["Full weekend access", "Workshops & socials", "Limited quantity"]}
            testid="card-ticket-early"
          />
          <TicketCard
            title="Full Pass"
            price="€119"
            highlight={true}
            bullets={["Full weekend access", "Workshops + parties", "Best value"]}
            testid="card-ticket-full"
          />
          <TicketCard
            title="VIP"
            price="€179"
            highlight={false}
            bullets={["All access", "VIP seating / perks (placeholder)", "Priority entry (placeholder)"]}
            testid="card-ticket-vip"
          />
        </div>
      </Section>
      {/* HOTELS */}
      <Section
        id="hotels"
        label="Hotels"
        eyebrow="Stay"
        title="Partner hotels"
        description="Our partner hotels for the weekend — all fully booked!"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Epirus Palace Hotel Congress & Spa", stars: 5, tag: "MAIN VENUE" },
            { name: "Giotis Boutique Hotel", stars: 4 },
            { name: "Hotel Filoxenia", stars: 3 },
            { name: "AAR Hotel & Spa", stars: 4 },
          ].map((hotel, i) => (
            <Card key={i} testid={`card-hotel-${i}`} className="relative p-5 overflow-hidden">
              {"tag" in hotel && hotel.tag && (
                <div className="absolute top-3 right-3 rounded-full bg-[hsl(var(--primary))] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black" data-testid={`badge-hotel-tag-${i}`}>
                  {hotel.tag}
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Hotel className="h-5 w-5 text-[hsl(var(--primary))]" />
                </span>
                <div>
                  <div className="text-sm font-semibold leading-tight" data-testid={`text-hotel-name-${i}`}>
                    {hotel.name}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-[hsl(var(--primary))]" data-testid={`text-hotel-stars-${i}`}>
                    {"★".repeat(hotel.stars)}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex w-full items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 py-2.5 text-sm font-bold uppercase tracking-wider text-red-400" data-testid={`badge-hotel-soldout-${i}`}>
                Sold Out
              </div>
            </Card>
          ))}
        </div>
      </Section>
      {/* FOOTER */}
      <footer className="border-t border-border/70 bg-card/40" data-testid="footer">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="font-display text-xl tracking-tight" data-testid="text-footer-brand">
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

function TicketCard({
  title,
  price,
  bullets,
  highlight,
  testid,
}: {
  title: string;
  price: string;
  bullets: string[];
  highlight: boolean;
  testid: string;
}) {
  return (
    <div
      className={cn(
        "grain relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-7 shadow-sm transition will-change-transform hover:-translate-y-1 hover:shadow-lg",
        highlight && "ring-1 ring-[hsl(var(--primary)/0.45)]",
      )}
      data-testid={testid}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {title}
          </div>
          <div className="mt-3 font-display text-4xl tracking-tight" data-testid={`${testid}-price`}>
            {price}
          </div>
        </div>
        {highlight ? (
          <Badge
            className="rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
            data-testid={`${testid}-badge`}
          >
            Most popular
          </Badge>
        ) : null}
      </div>

      <ul className="mt-6 space-y-3" data-testid={`${testid}-list`}>
        {bullets.map((b, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-muted-foreground" data-testid={`${testid}-bullet-${idx}`}>
            <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--primary))]" strokeWidth={2} />
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a href="https://fienta.com/lago-latino?utm_source=ig&utm_medium=social&utm_content=link_in_bio" target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className={cn(
            "mt-7 w-full rounded-2xl",
            highlight
              ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.92)]"
              : "bg-white/5 text-foreground hover:bg-white/10",
          )}
          data-testid={`${testid}-cta`}
        >
          Choose {title}
        </Button>
      </a>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition hover:opacity-100" />
    </div>
  );
}
