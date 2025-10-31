// Users.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGetUserQuery } from "@/services/User";
import Users from ".";

// Mock Redux hooks
vi.mock("@/store", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

// Mock API query
vi.mock("@/services/User", () => ({
  useGetUserQuery: vi.fn(),
}));

// Mock child components
vi.mock("@/components/atoms/Table", () => ({
  default: ({ data }: any) => (
    <div data-testid="table">{JSON.stringify(data)}</div>
  ),
}));
vi.mock("@/components/atoms/NotFound", () => ({
  default: () => <div data-testid="not-found">Not Found</div>,
}));
vi.mock("@/components/molecules/UserModal", () => ({
  default: ({ open }: any) =>
    open ? <div data-testid="user-modal">Modal Open</div> : null,
}));

describe("Users component", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as any).mockReturnValue(mockDispatch);
    (useAppSelector as any).mockImplementation((cb: any) =>
      cb({ UserSlice: { users: [], total: 0 } })
    );
  });

  test("renders NotFound when API error", () => {
    (useGetUserQuery as any).mockReturnValue({ data: null, isError: true });
    render(<Users />);
    expect(screen.getByTestId("not-found")).toBeInTheDocument();
  });

  test("renders users from API", async () => {
    const mockData = [
      {
        id: 1,
        name: "Fariz",
        username: "fariz123",
        email: "fariz@mail.com",
        phone: "111",
        picture: "x",
      },
      {
        id: 2,
        name: "Rizki",
        username: "rizki123",
        email: "rizki@mail.com",
        phone: "222",
        picture: "y",
      },
    ];
    (useGetUserQuery as any).mockReturnValue({
      data: mockData,
      isError: false,
    });
    (useAppSelector as any).mockImplementation((cb: any) =>
      cb({ UserSlice: { users: mockData, total: 2 } })
    );

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByTestId("table")).toBeInTheDocument();
    });

    const tableContent = screen.getByTestId("table").textContent!;
    expect(tableContent).toContain("Fariz");
    expect(tableContent).toContain("Rizki");
  });

  test("filters users by search query", async () => {
    const mockData = [
      {
        id: 1,
        name: "Fariz",
        username: "fariz123",
        email: "fariz@mail.com",
        phone: "111",
        picture: "x",
      },
      {
        id: 2,
        name: "Rizki",
        username: "rizki123",
        email: "rizki@mail.com",
        phone: "222",
        picture: "y",
      },
    ];
    (useGetUserQuery as any).mockReturnValue({
      data: mockData,
      isError: false,
    });
    (useAppSelector as any).mockImplementation((cb: any) =>
      cb({ UserSlice: { users: mockData, total: 2 } })
    );

    render(<Users />);

    const input = screen.getByPlaceholderText("Search name or username");
    await userEvent.type(input, "Rizki");

    await waitFor(() => {
      const tableContent = screen.getByTestId("table").textContent!;
      expect(tableContent).toContain("Rizki");
      expect(tableContent).not.toContain("Fariz");
    });
  });

  test("opens modal when clicking 'Add User'", async () => {
    (useGetUserQuery as any).mockReturnValue({ data: [], isError: false });
    (useAppSelector as any).mockImplementation((cb: any) =>
      cb({ UserSlice: { users: [], total: 0 } })
    );

    render(<Users />);
    const addButton = screen.getByText("Add User");
    await userEvent.click(addButton);

    // Dispatch called to setUserDetail
    expect(mockDispatch).toHaveBeenCalled();
  });
});
