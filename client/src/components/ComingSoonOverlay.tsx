import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function ComingSoonOverlay({ children }: Props) {
  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="pointer-events-none select-none blur-[6px] brightness-50">
        {children}
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 px-6 text-center"
        >
          <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="font-bold tracking-widest text-white drop-shadow-lg"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
            COMING SOON
          </h2>
          <p className="max-w-md text-sm text-white/70 sm:text-base">
            We&apos;re crafting something incredible. Stay tuned for the full experience.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
