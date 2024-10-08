export interface Country {
    cca2: string;
    name: {
        common: string;
    };
}

export interface CountryOption {
    code: string;
    name: string;
}

export interface CityOption {
    name: string;
}

export interface City {
    name: string;
}

export interface CityResponse {
    totalResultsCount: number;
    geonames: City[];
}