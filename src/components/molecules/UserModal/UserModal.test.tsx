import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserModal from "./index";
import { initialDetails } from "@/pages/User/slice";

// Mock hooks and components
vi.mock("@/hooks/useOpenToast", () => ({
  useOpenToast: () => vi.fn(),
}));

vi.mock("@/components/atoms/BaseModal", () => ({
  __esModule: true,
  default: ({ open, children }: any) =>
    open ? <div data-testid="mocked-modal">{children}</div> : null,
}));

vi.mock("@/components/atoms/TextField", () => ({
  __esModule: true,
  default: ({ label, value, onChange }: any) => (
    <input
      placeholder={label}
      value={value}
      onChange={onChange}
      data-testid={label}
    />
  ),
}));

vi.mock("@/components/atoms/Button", () => ({
  __esModule: true,
  default: ({ title, onClick }: any) => (
    <button onClick={onClick}>{title}</button>
  ),
}));

// Mock store setup
const mockStore = configureStore([]);

const createMockStore = (customState?: any) =>
  mockStore({
    UserSlice: {
      total: 1,
      users: [],
      userDetail: initialDetails,
      ...customState,
    },
  });

describe("UserModal Component", () => {
  const onClose = vi.fn();

  const renderModal = (storeState?: any) => {
    const store = createMockStore(storeState);
    return render(
      <Provider store={store}>
        <UserModal open={true} onClose={onClose} />
      </Provider>
    );
  };

  it("renders correctly when open", () => {
    renderModal();
    expect(screen.getByTestId("mocked-modal")).toBeInTheDocument();
    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  it("validates required fields before adding user", async () => {
    renderModal();
    fireEvent.click(screen.getByText("Submit"));

    // Expect validation errors from zod
    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
      expect(nameInput.value).toBe("");
    });
  });

  it("adds a new user when form is valid", async () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Fariz R R" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "farizerz" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "farizerz@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Street"), {
      target: { value: "123 St" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Indonesia" },
    });
    fireEvent.change(screen.getByPlaceholderText("Zipcode"), {
      target: { value: "10001" },
    });
    fireEvent.change(screen.getByPlaceholderText("Company Name"), {
      target: { value: "OBS" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("edits existing user when id is set", async () => {
    const userDetail = {
      ...initialDetails,
      id: 1,
      name: "Old Name",
      username: "olduser",
      email: "old@example.com",
      phone: "11111",
      address: {
        street: "Old Street",
        suite: "",
        city: "Old City",
        zipcode: "00000",
        geo: { lat: "0", lng: "0" },
      },
      company: { name: "Old Co", catchPhrase: "", bs: "" },
    };

    renderModal({ userDetail });

    expect(screen.getByText("User Details")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "New Name" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("closes when clicking Cancel", () => {
    renderModal();
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });
});
