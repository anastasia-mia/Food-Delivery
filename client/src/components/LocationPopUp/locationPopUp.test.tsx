import {act, fireEvent, render, screen} from '@testing-library/react';
import { LocationPopUp } from './LocationPopUp.tsx';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import {fetchCurrentAddress} from "./locationService/fetchCurrentAddress.ts";
import {ICoords} from "../../interfaces/geoInterfaces.ts";
import { expect, describe, it } from '@jest/globals';
import {useEffect} from "react";

jest.mock('./locationService/fetchCityCoordinates');
jest.mock('./locationService/fetchCurrentAddress');
jest.mock('./locationService/getCities');
jest.mock('./locationService/getCountries');
jest.mock('../../utils/fetchAddress.ts')
const mockFetchCurrentAddress = fetchCurrentAddress as jest.MockedFunction<typeof fetchCurrentAddress>;

jest.mock('../Map/Map.tsx', () => ({ setAddress }: {setAddress: (address: string) => void}) => {
    useEffect(() => {
        setAddress('Hoża 56, 00-682 Warsaw, Poland');
    }, [setAddress]);

    return <div data-testid="mock-map">Map Component</div>;
});

describe('LocationPopUp', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sets current position coords in localStorage', async() => {
        const mockCoords: ICoords = {lat: 48.85816464940564, lon: 2.2945117950439458};
        mockFetchCurrentAddress.mockResolvedValue(mockCoords);

        await act(async () => {
            render(
                <Provider store={store}>
                    <LocationPopUp />
                </Provider>
            );
        });

        const findMyPositionElement = screen.getByText('Find my position automatically');
        await act(async () => {
            fireEvent.click(findMyPositionElement);
        });

        expect(fetchCurrentAddress).toHaveBeenCalled();
        fireEvent.click(screen.getByText(/confirm my address/i));
        expect(localStorage.getItem('coords')).toEqual(JSON.stringify(mockCoords));
    })

    it('disables city input', async() => {

        await act(async () => {
            render(
                <Provider store={store}>
                    <LocationPopUp />
                </Provider>
            );
        });
        const inputCity = screen.getByPlaceholderText(/Select a city/i);
        expect(inputCity).toBeDisabled();
    })

    it('shows address', async() => {

        await act(async () => {
            render(
                <Provider store={store}>
                    <LocationPopUp />
                </Provider>
            );
        });

        const addressElement = screen.getByTestId('address');
        expect(addressElement).toHaveTextContent('Hoża 56, 00-682 Warsaw, Poland');
    })
})