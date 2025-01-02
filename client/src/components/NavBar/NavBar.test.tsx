import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import NavBar from "./NavBar.tsx";
import configureMockStore from "redux-mock-store";
import {ICartItem} from "../../interfaces/cartInterfaces.ts";
import {MemoryRouter} from "react-router-dom";

interface NavBarStore {
    auth: {
        user: string | null,
        isLoggedIn: boolean
    },
    cart: {
        menuItems: ICartItem[]
    },
    popUpDisplaying: {
        isCartDisplayed: boolean
    }
}

const mockStore = configureMockStore<NavBarStore>();

describe('NavBar', () => {
    const createMockStore = (state: Partial<NavBarStore>) =>
        mockStore({
            auth: {
                user: null,
                isLoggedIn: false,
                ...state.auth,
            },
            cart: {
                menuItems: [],
                ...state.cart,
            },
            popUpDisplaying: {
                isCartDisplayed: false,
                ...state.popUpDisplaying,
            },
        });

    const renderNavBar = (store: ReturnType<typeof mockStore>) =>
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <NavBar />
                </Provider>
            </MemoryRouter>
        );

    it('renders correctly', async() => {
        const store = createMockStore({});
        renderNavBar(store);

        const tabList = screen.getByRole('list');
        expect(tabList).toBeInTheDocument();

        const loginElement = screen.getByText('Login');
        expect(loginElement).toBeInTheDocument();

        const cartIcon = screen.getByTestId('navbar-cart');
        expect(cartIcon).toBeInTheDocument();
    });

    it("shows greeting when logged in", async() => {
        const store = createMockStore({
            auth: {
                user: "Maria",
                isLoggedIn: true,
            },
        });
        renderNavBar(store);

        const greeting = screen.getByText('Hello, Maria!');
        expect(greeting).toBeInTheDocument();
    })

    it("displays the number of items in the cart", async() => {
        const store = createMockStore({
            cart: {
                menuItems: [
                    { id: 1, name: "Item 1", price: 10, quantity: 1 },
                    { id: 2, name: "Item 2", price: 15, quantity: 2 },
                ],
            },
        });
        renderNavBar(store);

        const cartItemQuantity = screen.getByTestId('navbar-cart-quantity');
        expect(cartItemQuantity).toHaveTextContent('3');
    })
})