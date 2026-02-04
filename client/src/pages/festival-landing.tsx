import { useEffect, useMemo, useRef, useState } from "react";
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
  Youtube,
  ExternalLink,
  X,
  Expand,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import heroPoster from "@assets/poster-square.jpg";
import fullPoster from "@assets/poster-up.jpg";

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
  const links = useMemo(
    () =>
      [
        { id: "about", label: "About" },
        { id: "schedule", label: "Schedule" },
        { id: "venue", label: "Venue" },
        { id: "tickets", label: "Tickets" },
        { id: "hotels", label: "Hotels" },
        { id: "location", label: "Location" },
      ] as const,
    [],
  );

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mt-3 rounded-2xl border border-border/70 bg-card/50 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/40">
          <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
            <a
              href="#top"
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
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                  data-testid={`link-nav-${l.id}`}
                >
                  {l.label}
                </a>
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

function PosterBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden group">
      <img
        src={heroPoster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(15,15,26,0.9) 0%, rgba(15,15,26,0.6) 50%, rgba(15,15,26,0.4) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--background))]" />
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


function TimelineItem({
  time,
  title,
  desc,
  icon,
  testid,
}: {
  time: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  testid: string;
}) {
  return (
    <div className="relative pl-10" data-testid={testid}>
      <div className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
        {icon}
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs font-semibold text-muted-foreground" data-testid={`${testid}-time`}>
          {time}
        </div>
        <div className="h-px flex-1 bg-border/70" />
      </div>
      <div className="mt-2">
        <div className="text-sm font-semibold" data-testid={`${testid}-title`}>
          {title}
        </div>
        <div className="mt-1 text-xs text-muted-foreground" data-testid={`${testid}-desc`}>
          {desc}
        </div>
      </div>
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
              >
                Full pass from €89
              </Badge>
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="https://fienta.com/lago-latino?utm_source=ig&utm_medium=social&utm_content=link_in_bio" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="rounded-2xl px-6"
                  data-testid="button-hero-tickets"
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  Get Tickets
                </Button>
              </a>
              <a
                href="#location"
                className="inline-flex items-center justify-center rounded-2xl border border-border/70 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition hover:bg-white/5"
                data-testid="link-hero-location"
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
            <div className="grid gap-5 md:grid-cols-2">
              <Card testid="card-schedule-fri-day" className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Day
                </div>
                <div className="mt-4 space-y-5">
                  <TimelineItem
                    time="14:00"
                    title="Registration & Welcome"
                    desc="Arrivals, wristbands, warm-up vibes"
                    icon={<Ticket className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-fri-0"
                  />
                  <TimelineItem
                    time="16:00"
                    title="Workshops Block"
                    desc="Technique + musicality (placeholder)"
                    icon={<Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-fri-1"
                  />
                </div>
              </Card>
              <Card testid="card-schedule-fri-night" className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Night
                </div>
                <div className="mt-4 space-y-5">
                  <TimelineItem
                    time="22:00"
                    title="Opening Party"
                    desc="Social dancing until late"
                    icon={<Music className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-fri-2"
                  />
                  <TimelineItem
                    time="00:30"
                    title="Showtime"
                    desc="Performance slot (placeholder)"
                    icon={<Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-fri-3"
                  />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sat" className="mt-6" data-testid="panel-sat">
            <div className="grid gap-5 md:grid-cols-2">
              <Card testid="card-schedule-sat-day" className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Day
                </div>
                <div className="mt-4 space-y-5">
                  <TimelineItem
                    time="12:00"
                    title="Bootcamp"
                    desc="Deep dive session (placeholder)"
                    icon={<Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-sat-0"
                  />
                  <TimelineItem
                    time="16:00"
                    title="Workshops Block"
                    desc="Partnerwork + styling (placeholder)"
                    icon={<Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-sat-1"
                  />
                </div>
              </Card>
              <Card testid="card-schedule-sat-night" className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Night
                </div>
                <div className="mt-4 space-y-5">
                  <TimelineItem
                    time="22:30"
                    title="Main Party"
                    desc="Two rooms, DJ rotation (placeholder)"
                    icon={<Music className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-sat-2"
                  />
                  <TimelineItem
                    time="01:00"
                    title="El Mundial"
                    desc="Competition round (placeholder)"
                    icon={<Trophy className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-sat-3"
                  />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sun" className="mt-6" data-testid="panel-sun">
            <div className="grid gap-5 md:grid-cols-2">
              <Card testid="card-schedule-sun-day" className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Day
                </div>
                <div className="mt-4 space-y-5">
                  <TimelineItem
                    time="13:00"
                    title="Workshops Block"
                    desc="Flow + musicality (placeholder)"
                    icon={<Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-sun-0"
                  />
                  <TimelineItem
                    time="17:00"
                    title="Closing Jam"
                    desc="Last dances + highlights"
                    icon={<Music className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-sun-1"
                  />
                </div>
              </Card>
              <Card testid="card-schedule-sun-night" className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Night
                </div>
                <div className="mt-4 space-y-5">
                  <TimelineItem
                    time="21:30"
                    title="Farewell Party"
                    desc="One last room, one last song"
                    icon={<Music className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-sun-2"
                  />
                  <TimelineItem
                    time="23:30"
                    title="Goodnight Ioannina"
                    desc="See you next year"
                    icon={<Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />}
                    testid="timeline-sun-3"
                  />
                </div>
              </Card>
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
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_30%_10%,hsl(var(--primary)/0.2),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]" />
            <div className="relative h-full min-h-[320px] p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-black/30 px-3 py-1 text-xs font-semibold text-muted-foreground">
                Image placeholder
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
              <div className="mt-6 max-w-sm">
                <div className="font-display text-2xl tracking-tight">Lakeside views & boutique comfort</div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Swap in a real venue photo when ready — the layout is built to shine on mobile.
                </p>
              </div>
            </div>
          </div>
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
        description="Four nearby options to match your vibe. (Placeholders — replace with real partners)"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} testid={`card-hotel-${i}`} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold" data-testid={`text-hotel-name-${i}`}>
                    Partner Hotel
                  </div>
                  <div
                    className="mt-1 text-xs text-muted-foreground"
                    data-testid={`text-hotel-distance-${i}`}
                  >
                    5–12 min from venue
                  </div>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Hotel className="h-5 w-5 text-[hsl(var(--primary))]" />
                </span>
              </div>

              <Button
                variant="secondary"
                className="mt-4 w-full rounded-2xl"
                data-testid={`button-book-hotel-${i}`}
              >
                Book Now
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* LOCATION */}
      <Section
        id="location"
        label="Location"
        eyebrow="Ioannina"
        title="Location"
        description="Arrive via Ioannina Airport (IOA) and settle into the lakeside — the venue is designed for easy, comfortable movement all weekend."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div
            className="grain relative overflow-hidden rounded-3xl border border-border/70 bg-card/55 shadow-sm"
            data-testid="map-placeholder"
            aria-label="Google Map placeholder"
          >
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_30%_10%,rgba(255,255,255,0.08),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]" />
            <div className="relative p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-black/30 px-3 py-1 text-xs font-semibold text-muted-foreground">
                Map placeholder
              </div>
              <div className="mt-6 max-w-sm">
                <div className="font-display text-2xl tracking-tight">Ioannina, Greece</div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Replace with an embedded map when you’re ready.
                </p>
              </div>
            </div>
          </div>

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
                    Venue: Epirus Palace Hotel Congress & Spa 5* (placeholder directions).
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
