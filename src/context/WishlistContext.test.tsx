import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CatalogProvider } from "./CatalogContext";
import { WishlistProvider, useWishlist } from "./WishlistContext";
import { products } from "@/lib/catalog";

const KEY = "oneup-wishlist-v1";
const realSlug = products[0].slug;
const otherSlug = products[1].slug;

function Readout() {
  const { slugs, count, ready, has, toggle, clear } = useWishlist();
  return (
    <div>
      <span data-testid="count">{ready ? count : "…"}</span>
      <span data-testid="slugs">{slugs.join(",")}</span>
      <span data-testid="has">{String(has(realSlug))}</span>
      <button onClick={() => toggle(realSlug)}>toggle</button>
      <button onClick={clear}>clear</button>
    </div>
  );
}

function mount() {
  return render(
    <CatalogProvider>
      <WishlistProvider>
        <Readout />
      </WishlistProvider>
    </CatalogProvider>,
  );
}

const ready = () =>
  waitFor(() => expect(screen.getByTestId("count")).not.toHaveTextContent("…"));

beforeEach(() => {
  localStorage.clear();
});

describe("wishlist storage is untrusted", () => {
  it("survives a stored value that isn't an array", async () => {
    // This used to throw `slugs.includes is not a function` during render of
    // every product card, taking out the shop, home and product pages.
    localStorage.setItem(KEY, JSON.stringify({ nope: 1 }));
    mount();
    await ready();

    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("has")).toHaveTextContent("false");
  });

  it("survives corrupt JSON", async () => {
    localStorage.setItem(KEY, "{not json");
    mount();
    await ready();

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("drops non-string and empty entries", async () => {
    localStorage.setItem(
      KEY,
      JSON.stringify([realSlug, 1, null, "", {}, otherSlug]),
    );
    mount();
    await ready();

    expect(screen.getByTestId("slugs")).toHaveTextContent(
      `${realSlug},${otherSlug}`,
    );
  });

  it("collapses duplicates so one product can't fill two grid cells", async () => {
    localStorage.setItem(KEY, JSON.stringify([realSlug, realSlug, realSlug]));
    mount();
    await ready();

    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("does not count saves whose product has left the catalog", async () => {
    localStorage.setItem(KEY, JSON.stringify([realSlug, "was-discontinued"]));
    mount();
    await ready();

    // The badge must never claim more than the wishlist page can show.
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("slugs")).toHaveTextContent(realSlug);
  });
});

describe("wishlist toggling", () => {
  it("adds and removes the same product", async () => {
    const user = userEvent.setup();
    mount();
    await ready();

    await user.click(screen.getByRole("button", { name: "toggle" }));
    await waitFor(() =>
      expect(screen.getByTestId("has")).toHaveTextContent("true"),
    );

    await user.click(screen.getByRole("button", { name: "toggle" }));
    await waitFor(() =>
      expect(screen.getByTestId("has")).toHaveTextContent("false"),
    );
  });

  it("persists a save so it is there on the next visit", async () => {
    const user = userEvent.setup();
    const { unmount } = mount();
    await ready();

    await user.click(screen.getByRole("button", { name: "toggle" }));
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(KEY)!)).toContain(realSlug),
    );

    unmount();
    mount();
    await ready();
    expect(screen.getByTestId("has")).toHaveTextContent("true");
  });

  it("clears every save", async () => {
    const user = userEvent.setup();
    localStorage.setItem(KEY, JSON.stringify([realSlug, otherSlug]));
    mount();
    await ready();

    await user.click(screen.getByRole("button", { name: "clear" }));
    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("0"),
    );
  });
});
