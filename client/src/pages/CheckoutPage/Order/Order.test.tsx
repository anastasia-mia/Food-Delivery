import {act, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {Order} from "./Order.tsx";
import configureMockStore from "redux-mock-store";

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
    deliveryPrice: {
        price: 1.5
    }
});

describe('Order', () => {

    it('renders correctly menu items', async() => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <Order/>
                </Provider>
            );
        });
        const menuItems = screen.getAllByTestId('order-item');
        expect(menuItems).toHaveLength(2);
    })

    it('calculates correct total price', async() => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <Order/>
                </Provider>
            );
        });
        const totalPrice = screen.getByTestId('order-total');
        expect(totalPrice).toHaveTextContent("12.40")
    })
})
