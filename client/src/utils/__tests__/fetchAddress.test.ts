import {fetchAddress} from "../fetchAddress";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchAddress', () => {
    beforeEach(() => {
        mockedAxios.get.mockClear();
    });

    it("should fetch address and set it in setAddress", async () => {
        const mockSetAddress = jest.fn();
        const mockResponse = {data: {formattedAddress: 'Eiffel Tower, 5 Avenue Anatole France, 75007 Paris, France'}};
        mockedAxios.get.mockResolvedValue(mockResponse);

        await fetchAddress(48.85816464940564, 2.2945117950439458, mockSetAddress);

        expect(mockSetAddress).toHaveBeenCalledWith('Eiffel Tower, 5 Avenue Anatole France, 75007 Paris, France');
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/api/address', {
            params: { lat: 48.85816464940564, lon: 2.2945117950439458 }
        })
    })

    it("should not call function if lat and lon are 0", async () => {
        const mockSetAddress = jest.fn();

        await fetchAddress(0, 0, mockSetAddress);

        expect(mockSetAddress).not.toHaveBeenCalled();
        expect(mockedAxios.get).not.toHaveBeenCalled();
    })
})