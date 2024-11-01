import {act, fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {CustomerInfo} from "./CustomerInfo.tsx";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore();

beforeAll(() => {
    HTMLFormElement.prototype.requestSubmit = jest.fn();
});

describe('CustomerInfo', () => {
    const onSubmitOrder = jest.fn();

    beforeEach(async() => {
        onSubmitOrder.mockClear();
        await act(async () => {
            render(
                <Provider store={store}>
                    <CustomerInfo onSubmitOrder={onSubmitOrder}/>
                </Provider>
            );
        });
    })

    test('should render correctly', async() => {
        const nameInput = screen.getByLabelText(/^Name/i);
        expect(nameInput).toBeInTheDocument();
        const surNameInput = screen.getByLabelText(/Surname/i);
        expect(surNameInput).toBeInTheDocument();
        const phoneNumberInput = screen.getByLabelText(/Phone number/i);
        expect(phoneNumberInput).toBeInTheDocument();
        const emailInput = screen.getByLabelText(/Email/i);
        expect(emailInput).toBeInTheDocument();
    })

    test('should call onSubmitOrder when form is submitted', async() => {
        const nameInput = screen.getByLabelText(/^Name/i);
        const surNameInput = screen.getByLabelText(/Surname/i);
        const phoneNumberInput = screen.getByLabelText(/Phone number/i);
        const emailInput = screen.getByLabelText(/Email/i);

        await act(async () => {
            fireEvent.change(nameInput, { target: { value: "Maria" } });
            fireEvent.change(surNameInput, { target: { value: "Smith" } });
            fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });
            fireEvent.change(emailInput, { target: { value: "string@test.com" } });
        });

        const form = screen.getByTestId('customer-info-form');

        await act(async () => {
            fireEvent.submit(form);
        });

        expect(onSubmitOrder).toHaveBeenCalled();
    })
})