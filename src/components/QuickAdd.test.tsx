import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CartProvider, useCart } from "@/context/CartContext";
import { QuickAdd, type QuickAddProduct } from "./QuickAdd";

const product: QuickAddProduct = {
  id: "sg-klr-ultimate",
  slug: "sg-klr-ultimate",
  name: "SG KLR ULTIMATE",
  brand: "SG",
  art: "bat",
  accent: "#c8901c",
  price: 27999,
  size: "Men's",
};

function CartReadout() {
  const { count, lines } = useCart();
  return (
    <span data-testid="cart">
      {lines.length}:{count}
    </span>
  );
}

function mount() {
  return render(
    <CartProvider>
      <QuickAdd product={product} />
      <CartReadout />
    </CartProvider>,
  );
}

describe("quick add", () => {
  it("adds the product to the bag", async () => {
    const user = userEvent.setup();
    mount();

    await user.click(screen.getByRole("button", { name: /add .* to bag/i }));
    await waitFor(() =>
      expect(screen.getByTestId("cart")).toHaveTextContent("1:1"),
    );
  });

  it("confirms inline rather than through a toast", async () => {
    const user = userEvent.setup();
    mount();

    await user.click(screen.getByRole("button", { name: /add .* to bag/i }));

    // The button itself reports the result, and its label follows.
    expect(
      await screen.findByRole("button", { name: /added to bag/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/added to your bag/i)).not.toBeInTheDocument();
  });

  it("merges rapid repeat clicks onto one line", async () => {
    const user = userEvent.setup();
    mount();

    const button = screen.getByRole("button", { name: /add .* to bag/i });
    await user.click(button);
    await user.click(button);
    await user.click(button);

    // One line, quantity three — not three separate lines.
    await waitFor(() =>
      expect(screen.getByTestId("cart")).toHaveTextContent("1:3"),
    );
  });

  it("is reachable and operable from the keyboard", async () => {
    const user = userEvent.setup();
    mount();

    await user.tab();
    expect(screen.getByRole("button", { name: /add .* to bag/i })).toHaveFocus();

    await user.keyboard("{Enter}");
    await waitFor(() =>
      expect(screen.getByTestId("cart")).toHaveTextContent("1:1"),
    );
  });
});
