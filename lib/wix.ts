"use client";

import * as React from "react";
import { createClient, OAuthStrategy, media, type Tokens } from "@wix/sdk";
import { productsV3 } from "@wix/stores";
import { items } from "@wix/data";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";

import { kits as localKits, reviews as localReviews, type Kit, type Review } from "@/lib/data";

// Public OAuth client id — the appId from wix.config.json (not a secret).
const CLIENT_ID = "1272d3ec-a420-48a2-a8b7-2b271884fbfe";

// Visitor tokens live in localStorage so the cart survives reloads. The module
// is also evaluated during `next build` prerendering, where there's no window.
const TOKENS_KEY = "wixcycles.visitorTokens";

function storedTokens(): Tokens | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return JSON.parse(window.localStorage.getItem(TOKENS_KEY) ?? "") as Tokens;
  } catch {
    return undefined;
  }
}

export const wix = createClient({
  modules: { productsV3, items, currentCart, redirects },
  auth: OAuthStrategy({ clientId: CLIENT_ID, tokens: storedTokens() }),
});

export function persistWixSession() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TOKENS_KEY, JSON.stringify(wix.auth.getTokens()));
  } catch {
    /* storage unavailable (private mode) — cart just won't survive reloads */
  }
}

/** Resolve a product/line-item image to a plain URL. */
export function wixImageUrl(
  raw: string | undefined,
  width: number,
  height: number
): string | undefined {
  if (!raw) return undefined;
  if (raw.startsWith("wix:image://")) {
    try {
      return media.getScaledToFillImageUrl(raw, width, height, {});
    } catch {
      return undefined;
    }
  }
  return raw.startsWith("https://") ? raw : undefined;
}

/**
 * Live builds from Wix Stores. Products are seeded as "WX140 <kit name>";
 * we join them onto the local kit entries (which carry the imagery) and
 * override name/price/description from the store. Any failure or gap falls
 * back to the local data so the page never blanks.
 */
export function useWixKits(): { kits: Kit[]; live: boolean } {
  const [state, setState] = React.useState<{ kits: Kit[]; live: boolean }>({
    kits: localKits,
    live: false,
  });

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await wix.productsV3.queryProducts().find();
        const products = res.items ?? [];
        if (!products.length) return;
        const merged = localKits.map((kit) => {
          const p = products.find(
            (pr: { name?: string | null }) => pr.name === `WX140 ${kit.name}`
          );
          if (!p) return kit;
          const amount = p.actualPriceRange?.minValue?.amount;
          const desc = p.plainDescription?.replace(/<[^>]+>/g, "") ?? kit.spec;
          // Product image from the store, if set. `wix:image://` URIs must go
          // through the SDK resolver; absolute URLs pass straight through.
          const raw = p.media?.main?.image as string | undefined;
          const image = wixImageUrl(raw, 772, 1026) ?? kit.image;
          return {
            ...kit,
            productId: p._id ?? undefined,
            name: p.name?.replace(/^WX140 /, "") ?? kit.name,
            price: amount ? `$${Number(amount).toLocaleString()}` : kit.price,
            spec: desc,
            image,
          };
        });
        if (!cancelled) setState({ kits: merged, live: true });
      } catch {
        /* keep local fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/** Live review quotes from the `reviews` CMS collection (public-read). */
export function useWixReviews(): { reviews: Review[]; live: boolean } {
  const [state, setState] = React.useState<{ reviews: Review[]; live: boolean }>({
    reviews: localReviews,
    live: false,
  });

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await wix.items.query("reviews").ascending("order").find();
        const rows = res.items ?? [];
        if (!rows.length) return;
        const mapped: Review[] = rows.map((r: Record<string, unknown>) => ({
          pre: (r.pre as string) ?? "",
          highlight: (r.highlight as string) ?? "",
          post: (r.post as string) ?? "",
          source: (r.source as string) ?? "",
          initials: (r.initials as string) ?? "",
        }));
        if (!cancelled) setState({ reviews: mapped, live: true });
      } catch {
        /* keep local fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
