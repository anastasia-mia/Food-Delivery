import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {Header} from "./Header.tsx";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { setIsLocationPopUpDisplayed } from "../../redux/popUpDisplayingSlice";
import mocked = jest.mocked;
import useGetAddressWithCoords from "../../hooks/useGetAddressWithCoords.ts";

const mockStore = configureMockStore();
const store = mockStore({});

jest.mock('../NavBar/NavBar', () => () => <div data-testid="navbar" />);

jest.mock('../../hooks/useGetAddressWithCoords');

describe('Header', () => {
    it('renders correctly', async() => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </Provider>
            );
        });

        const logoElement = screen.getByText('DELIVERY');
        expect(logoElement).toBeInTheDocument();
        const svgElement = screen.getByTestId('location-icon');
        expect(svgElement).toBeInTheDocument();
        const addressText = screen.getByText("Enter your location");
        expect(addressText).toBeInTheDocument();
    })

    it('opens location popUp', async() => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </Provider>
            );
        });

        const locationIcon = screen.getByTestId("location-icon");
        fireEvent.click(locationIcon);

        const actions = store.getActions();
        expect(actions).toContainEqual(setIsLocationPopUpDisplayed(true));
    })

    it('sets address in paragraph', async() => {
        mocked(useGetAddressWithCoords)
            .mockImplementationOnce((setAddress) => setAddress('221B, Baker Street, London'));

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Header />
                    </MemoryRouter>
                </Provider>
            );
        });

        const paragraph = screen.getByTestId('address-paragraph');

        await waitFor(() => {
            expect(paragraph.textContent).toBe('221B, Baker Street, London');
        })
    })
})