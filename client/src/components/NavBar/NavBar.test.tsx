import {act, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import NavBar from "./NavBar.tsx";
import configureMockStore from "redux-mock-store";
import {CartItem} from "../../interfaces/interfaces.ts";

interface NavBarStore {
    auth: {
        user: string | null,
        isLoggedIn: boolean
    },
    cart: {
        menuItems: CartItem[]
    }
}

const mockStore = configureMockStore<NavBarStore>();

describe('NavBar', () => {
    let store: ReturnType<typeof mockStore>

    const renderComponent = () =>
        render(
            <Provider store={store}>
                <NavBar />
            </Provider>
        );

    it('renders correctly', async() => {
        store = mockStore({
            auth: {
                user: null,
                isLoggedIn: false,
            },
            cart: {
                menuItems: [],
            },
        });

        await act(async () => {
            renderComponent();
        });

        const tabList = screen.getByRole('list');
        expect(tabList).toBeInTheDocument();

        const loginElement = screen.getByText('Login');
        expect(loginElement).toBeInTheDocument();

        const cartIcon = screen.getByTestId('navbar-cart');
        expect(cartIcon).toBeInTheDocument();
    });

    it("shows greeting when logged in", async() => {
        store = mockStore({
            auth: {
                user: "Maria",
                isLoggedIn: true,
            },
            cart: {
                menuItems: [],
            },
        });

        await act(async () => {
            renderComponent();
        });

        const greeting = screen.getByText('Hello, Maria!');
        expect(greeting).toBeInTheDocument();
    })

    it("displays the number of items in the cart", async() => {
        store = mockStore({
            auth: {
                user: null,
                isLoggedIn: false,
            },
            cart: {
                menuItems: [
                    {
                        "id": 29,
                        "quantity": 1,
                        "name": "Gazpacho",
                        "price": 6.00
                    },
                    {
                        "id": 38,
                        "quantity": 2,
                        "name": "Sangria",
                        "price": 2.00
                    }
                ],
            },
        });

        await act(async () => {
            renderComponent();
        });

        const cartItemQuantity = screen.getByTestId('navbar-cart-quantity');
        expect(cartItemQuantity).toHaveTextContent('3');
    })
})