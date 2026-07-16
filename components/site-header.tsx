"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  ChevronDown,
  CircleUserRound,
  HelpCircle,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";

import { bikeNav } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV_ITEMS = ["Bikes", "Apparel", "Gear", "Stories", "Demo"];

/** Plain text logotype — inherits the header's current color */
function WixCyclesLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn("flex items-baseline gap-2 whitespace-nowrap", className)}
      aria-label="Wix Cycles"
    >
      <span className="display-heading text-2xl font-bold tracking-[0.15em]">WIX</span>
      <span className="display-heading text-2xl font-normal tracking-[0.08em]">Cycles</span>
    </span>
  );
}

export function SiteHeader() {
  const [hidden, setHidden] = React.useState(false);
  const [solid, setSolid] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const lastY = React.useRef(0);

  React.useEffect(() => {
    return scrollY.on("change", (y) => {
      const goingDown = y > lastY.current && y > 120;
      // Once you scroll into the hero the product sub-nav takes over.
      const subnavZone = y > window.innerHeight * 0.9;
      setHidden((goingDown || subnavZone) && openMenu === null);
      setSolid(y > 40);
      lastY.current = y;
    });
  }, [scrollY, openMenu]);

  const light = !solid && openMenu === null;

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseLeave={() => setOpenMenu(null)}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        light ? "bg-transparent text-white" : "bg-white text-ink shadow-sm"
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-[1600px] items-center px-5 lg:h-20 lg:px-14">
        <Link href="#" className="shrink-0" aria-label="Home">
          <WixCyclesLogo />
        </Link>

        {/* Centered nav */}
        <nav className="ml-14 hidden flex-1 items-center gap-9 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onMouseEnter={() => setOpenMenu(item === "Bikes" ? item : null)}
              className={cn(
                "group relative flex items-center gap-1 py-2 text-[13px] font-semibold uppercase tracking-[0.2em] transition-colors",
                openMenu === item && "text-turq"
              )}
            >
              {item}
              {item === "Bikes" && <ChevronDown className="size-3.5" />}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-turq transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
          <button aria-label="Search" className="transition-colors hover:text-turq">
            <Search className="size-5" />
          </button>
        </nav>

        {/* Right icons: help, dealer locator, account, cart */}
        <div className="ml-auto flex items-center gap-6 lg:gap-8">
          <button aria-label="Help center" className="hidden transition-colors hover:text-turq lg:block">
            <HelpCircle className="size-5" />
          </button>
          <button aria-label="Dealer locator" className="hidden transition-colors hover:text-turq lg:block">
            <MapPin className="size-5" />
          </button>
          <button aria-label="Account" className="hidden transition-colors hover:text-turq lg:block">
            <CircleUserRound className="size-5" />
          </button>
          <button aria-label="Cart" className="relative transition-colors hover:text-turq">
            <ShoppingCart className="size-5" />
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-turq text-[10px] font-bold text-white">
              0
            </span>
          </button>
          <button
            aria-label="Menu"
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Bikes mega menu — 0.4s ease-out entrance, 0.3s exit, like the reference nav-fade */}
      <AnimatePresence>
        {openMenu === "Bikes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
            className="absolute inset-x-0 top-full hidden border-t border-black/5 bg-white text-ink shadow-xl lg:block"
          >
            <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] gap-16 px-10 py-10">
              <div>
                <div className="grid grid-cols-[1fr_120px_120px] border-b border-black/10 pb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-black/40">
                  <span>Model</span>
                  <span>Rear Travel</span>
                  <span>Wheel Size</span>
                </div>
                <ul>
                  {bikeNav.map((bike) => (
                    <li key={bike.name}>
                      <Link
                        href="#"
                        className={cn(
                          "group grid grid-cols-[1fr_120px_120px] items-center border-b border-black/5 py-3 transition-colors hover:text-turq",
                          bike.name === "WX140" && "text-turq"
                        )}
                      >
                        <span className="display-heading flex items-center gap-3 text-2xl">
                          {bike.name}
                          {bike.isNew && (
                            <span className="rounded-sm bg-turq px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-widest text-white">
                              New
                            </span>
                          )}
                        </span>
                        <span className="text-sm text-black/60 transition-colors group-hover:text-turq">
                          {bike.travel}
                        </span>
                        <span className="text-sm text-black/60 transition-colors group-hover:text-turq">
                          {bike.wheel}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-56 flex-col gap-5 border-l border-black/10 pl-10 pt-2">
                {["Shop All Bikes", "Compare Models", "Bike Archive"].map((label) => (
                  <Link key={label} href="#" className="link-cta text-ink hover:text-turq">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-white text-ink lg:hidden"
          >
            <ul className="space-y-1 px-5 pb-6 pt-2">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="block border-b border-black/5 py-3 text-sm font-semibold uppercase tracking-[0.2em]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
