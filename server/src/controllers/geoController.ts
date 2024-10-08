import {Request, Response} from "express";
import axios from "axios";
import {CityOption, CityResponse, Country, CountryOption} from "../models/geoModel";

export const getCountries = async (req: Request, res: Response) => {
    try {
        const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');

        const countryOptions: CountryOption[] = response.data.map(country => ({
            code: country.cca2,
            name: country.name.common
        }));

        res.json(countryOptions);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({message: 'Error fetching countries'});
    }
}

export const getCities = async (req: Request, res: Response) => {
    try {
        const tapedValue = typeof req.query.tapedValue === 'string' ? req.query.tapedValue : '';
        const countryCode = typeof req.query.countryCode === 'string' ? req.query.countryCode : '';
        const username = process.env.GEONAMES_USERNAME;

        const response =
            await axios.get<CityResponse>(`http://api.geonames.org/searchJSON?q=${tapedValue}&country=${countryCode}&maxRows=30&username=${username}`);
        const cityOptions: CityOption[] = response.data.geonames
            .filter((city) => tapedValue ? city.name.toLowerCase().includes(tapedValue.toLowerCase()) : true)
            .map((city) => ({
                name: city.name
            }));

        res.json(cityOptions);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({message: 'Error fetching cities'});
    }
}

export const fetchCityCoordinates = async (req: Request, res: Response) => {
    try{
        const {city, country} = req.query;

        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: `${city}, ${country}`,
                format: 'json',
                limit: 1,
            },
        });

        const data = response.data[0];
        if (data) {
            const lat = parseFloat(data.lat);
            const lon = parseFloat(data.lon);

            res.json({lat, lon});
        } else {
            res.json(null);
        }
    }catch (error) {
        console.error('Error fetching city coordinates:', error);
        res.status(500).json({ message: 'Error fetching coordinates' });
    }
}

export const fetchAddress = async (req: Request, res: Response) => {
    try{
        const apiKey = process.env.OPENCAGEDATA_KEY;
        const {lat, lon} = req.query;

        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: `${lat}+${lon}`,
                key: apiKey
            }
        });

        const result = response.data.results[0];
        if (result) {
            res.json({ formattedAddress: result.formatted });
        }
    }catch (error) {
        console.error('Error fetching address:', error);
        res.status(500).json({ message: 'Error fetching address' });
    }
}