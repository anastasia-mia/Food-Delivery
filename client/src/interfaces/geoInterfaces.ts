export interface IMapProps {
    coords: ICoords;
    setAddress?: (address: string) => void;
    setCoords?: (coords: ICoords) => void;
}

export interface CountryOption{
    code: string;
    name: string;
}

export interface CityOption{
    name: string;
}

export interface ICoords {
    lat: number,
    lon: number
}

export interface SelectProps<T> {
    handleFunction: (setterFunction: (suggestions: T[]) => void, tapedValue?: string, countryCode?: string) => void;
    selectedOption: T | null;
    setSelectedOption: (selectedOption: T | null) => void;
    placeholder: string;
    filterFunction?: (typedValue: string,
                      suggestions: T[],
                      setFilteredCountries: (filteredOptions: T[]) => void) => void;
    countryCode?: string;
    isDisabled?: boolean
}