import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CommandPalette } from "./CommandPalette";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

async function open() {
  const user = userEvent.setup();
  render(<CommandPalette />);
  await user.click(screen.getByRole("button", { name: /search products/i }));
  return { user, input: await screen.findByRole("combobox") };
}

describe("command palette", () => {
  it("opens from the header trigger", async () => {
    const { input } = await open();
    expect(input).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: /search/i })).toBeInTheDocument();
  });

  it("opens with Ctrl+K and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    await user.keyboard("{Control>}k{/Control}");
    expect(await screen.findByRole("combobox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("combobox")).not.toBeInTheDocument(),
    );
  });

  it('opens with "/" when focus is not in a field', async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    await user.keyboard("/");
    expect(await screen.findByRole("combobox")).toBeInTheDocument();
  });

  it("filters to real products as you type", async () => {
    const { user, input } = await open();
    await user.type(input, "badminton racquet under 5000");

    const options = await screen.findAllByRole("option");
    expect(options.length).toBeGreaterThan(0);
    expect(screen.getByText(/racquets under ₹5,000/i)).toBeInTheDocument();
  });

  it("moves the highlight with the arrow keys and wraps", async () => {
    const { user, input } = await open();
    await user.type(input, "badminton racquet under 5000");
    await screen.findAllByRole("option");

    const first = input.getAttribute("aria-activedescendant");

    await user.keyboard("{ArrowDown}");
    const second = input.getAttribute("aria-activedescendant");
    expect(second).not.toBe(first);

    await user.keyboard("{ArrowUp}");
    expect(input.getAttribute("aria-activedescendant")).toBe(first);
  });

  it("jumps to the last and first result with End and Home", async () => {
    const { user, input } = await open();
    await user.type(input, "badminton racquet under 5000");
    const options = await screen.findAllByRole("option");

    await user.keyboard("{End}");
    expect(input.getAttribute("aria-activedescendant")).toBe(
      options[options.length - 1].id,
    );

    await user.keyboard("{Home}");
    expect(input.getAttribute("aria-activedescendant")).toBe(options[0].id);
  });

  it("opens the highlighted product on Enter", async () => {
    push.mockClear();
    const { user, input } = await open();
    await user.type(input, "badminton racquet under 5000");
    await screen.findAllByRole("option");

    await user.keyboard("{ArrowDown}{Enter}");

    await waitFor(() => expect(push).toHaveBeenCalled());
    expect(push.mock.calls[0][0]).toMatch(/^\/product\//);
  });

  it("marks the highlighted option for assistive tech", async () => {
    const { user, input } = await open();
    await user.type(input, "badminton racquet under 5000");
    const options = await screen.findAllByRole("option");

    const selected = options.filter(
      (o) => o.getAttribute("aria-selected") === "true",
    );
    expect(selected).toHaveLength(1);
    expect(selected[0].id).toBe(input.getAttribute("aria-activedescendant"));
  });

  it("offers sports and prompts before anything is typed", async () => {
    await open();
    expect(screen.getByText(/ask oneup/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cricket" })).toBeInTheDocument();
  });

  it("says nothing matched instead of showing unrelated products", async () => {
    const { user, input } = await open();
    await user.type(input, "zzzqqqnomatch");

    expect(
      await screen.findByText(/nothing in the catalog matches/i),
    ).toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });
});
