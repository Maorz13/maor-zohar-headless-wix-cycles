"use client";

import * as React from "react";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { productsV3 } from "@wix/stores";
import { items } from "@wix/data";

import { kits as localKits, reviews as localReviews, type Kit, type Review } from "@/lib/data";

// Public OAuth client id — the appId from wix.config.json (not a secret).
const CLIENT_ID = "1272d3ec-a420-48a2-a8b7-2b271884fbfe";

export const wix = createClient({
  modules: { productsV3, items },
  auth: OAuthStrategy({ clientId: CLIENT_ID }),
});

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
          return {
            ...kit,
            name: p.name?.replace(/^WX140 /, "") ?? kit.name,
            price: amount ? `$${Number(amount).toLocaleString()}` : kit.price,
            spec: desc,
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
