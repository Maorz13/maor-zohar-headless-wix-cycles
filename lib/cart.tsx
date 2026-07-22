"use client";

import * as React from "react";
import { currentCart } from "@wix/ecom";

import { wix, persistWixSession } from "@/lib/wix";

// Wix Stores catalog app id — fixed across all sites.
const STORES_APP_ID = "215238eb-22a5-4c36-9e7b-e7c08025e04e";

export type Cart = currentCart.Cart;
export type CartLineItem = currentCart.LineItem;

type CartContextValue = {
  cart: Cart | null;
  /** Total units across all line items. */
  count: number;
  /** True while a cart mutation or checkout handoff is in flight. */
  busy: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  setQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  /** Creates a checkout from the cart and hands off to Wix-hosted checkout. */
  startCheckout: () => Promise<void>;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<Cart | null>(null);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const existing = await wix.currentCart.getCurrentCart();
        if (!cancelled) setCart(existing);
      } catch {
        /* 404 — this visitor has no cart yet */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Serializes mutations behind one busy flag; `undefined` means "keep state"
  // (used by checkout, which navigates away instead of updating the cart).
  const run = React.useCallback(async (op: () => Promise<Cart | null | undefined>) => {
    setBusy(true);
    try {
      const next = await op();
      if (next !== undefined) setCart(next);
      persistWixSession();
    } finally {
      setBusy(false);
    }
  }, []);

  const addToCart = React.useCallback(
    (productId: string, quantity = 1) =>
      run(async () => {
        const res = await wix.currentCart.addToCurrentCart({
          lineItems: [
            {
              catalogReference: { appId: STORES_APP_ID, catalogItemId: productId },
              quantity,
            },
          ],
        });
        return res.cart ?? null;
      }),
    [run]
  );

  const setQuantity = React.useCallback(
    (lineItemId: string, quantity: number) =>
      run(async () => {
        if (quantity < 1) {
          const res = await wix.currentCart.removeLineItemsFromCurrentCart([lineItemId]);
          return res.cart ?? null;
        }
        const res = await wix.currentCart.updateCurrentCartLineItemQuantity([
          { _id: lineItemId, quantity },
        ]);
        return res.cart ?? null;
      }),
    [run]
  );

  const removeItem = React.useCallback(
    (lineItemId: string) =>
      run(async () => {
        const res = await wix.currentCart.removeLineItemsFromCurrentCart([lineItemId]);
        return res.cart ?? null;
      }),
    [run]
  );

  const startCheckout = React.useCallback(
    () =>
      run(async () => {
        const { checkoutId } = await wix.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });
        const { redirectSession } = await wix.redirects.createRedirectSession({
          ecomCheckout: { checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            cartPageUrl: `${window.location.origin}/cart`,
            thankYouPageUrl: `${window.location.origin}/thank-you`,
          },
        });
        persistWixSession();
        if (redirectSession?.fullUrl) window.location.assign(redirectSession.fullUrl);
        return undefined;
      }),
    [run]
  );

  const count = (cart?.lineItems ?? []).reduce((sum, li) => sum + (li.quantity ?? 0), 0);

  const value = React.useMemo(
    () => ({ cart, count, busy, addToCart, setQuantity, removeItem, startCheckout }),
    [cart, count, busy, addToCart, setQuantity, removeItem, startCheckout]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
