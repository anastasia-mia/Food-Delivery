export interface Country {
    cca2: string;
    name: {
        common: string;
    };
}

export interface CountryOption{
    code: string;
    name: string;
}

export interface SelectProps<T> {
    handleFunction: (setterFunction: (suggestions: T[]) => void) => void;
    selectedOption: T | null;
    setSelectedOption: (selectedOption: T | null) => void;
    filterFunction?: (typedValue: string,
                       suggestions: T[],
                       setFilteredCountries: (filteredOptions: T[]) => void) => void;
}