import {act, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {CheckoutOrder} from "./CheckoutOrder.tsx";
import configureMockStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";

const mockStore = configureMockStore();
const store = mockStore({
    cart: {
        menuItems: [
            {
                id: 29,
                quantity: 1,
                name: "Gazpacho",
                price: "6.00"
            },
            {
                id: 38,
                quantity: 2,
                name: "Sangria",
                price: "2.00"
            }
        ],
    },
    chosenRestaurant: {
        restaurantName: "Test Restaurant",
    },
    deliveryPrice: {
        price: 1.5
    }
});

jest.mock('../../../hooks/useDropDownVisibility.ts', () => ({
    useDropDownVisibility: () => ({
        isDropDownOpen: true,
        toggleDropDownOpen: jest.fn(),
    }),
}));

describe('Order', () => {
    const mockSetTotalPrice = jest.fn();

    const renderOrder = () =>
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <CheckoutOrder setTotalPrice={mockSetTotalPrice} />
                </Provider>
            </MemoryRouter>
        );

    it('renders correctly menu items', async() => {

        await act(async () => {
            renderOrder();
        });
        const menuItems = screen.getAllByTestId('order-item');
        expect(menuItems).toHaveLength(2);
    })

    it('calculates correct total price', async() => {
        await act(async () => {
            renderOrder();
        });
        const totalPrice = screen.getByTestId('checkout-order-total');
        expect(totalPrice).toHaveTextContent("12.40")
    })
})
