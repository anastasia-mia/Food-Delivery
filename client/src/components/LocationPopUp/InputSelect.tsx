import React, {useEffect, useState} from 'react';
import './LocationPopUp.scss';
import {SelectProps} from "../../interfaces/geoInterfaces.ts";

export interface BaseOption {
    name: string;
    code?: string;
}

export const InputSelect = <T extends BaseOption>(
        {handleFunction, selectedOption, setSelectedOption, filterFunction, placeholder, countryCode}: SelectProps<T>) => {

    const [suggestions, setSuggestions] = useState<T[]>([]);
    const [typedValue, setTypedValue] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
    const optionsToDisplay: T[] = filteredOptions.length ? filteredOptions : suggestions;

    useEffect(() => {
        if(countryCode){
            handleFunction(setSuggestions as (suggestions: T[]) => void, typedValue, countryCode)
        }else{
            handleFunction(setSuggestions as (suggestions: T[]) => void)
        }

    }, [handleFunction, typedValue]);

    useEffect(() => {
        if (typedValue && filterFunction) {
            filterFunction(typedValue, suggestions, setFilteredOptions)
        } else {
            setFilteredOptions(suggestions);
        }
    }, [typedValue]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTypedValue(e.target.value);
        setSelectedOption(null)
    }

    return (
        <div>
            <input type="text"
                   placeholder={placeholder}
                   className="locationPopUp_input"
                   value={typedValue}
                   onChange={(e) => handleInputChange(e)}
            />
            {typedValue && !selectedOption && <ul className="locationPopUp_options">
                {optionsToDisplay.map((option: T, index: number) => (
                    <li key={index} onClick={() => {
                        setSelectedOption(option);
                        setTypedValue(option.name);
                    }}>
                        <span>{option.name}</span>
                        <span>{option.code}</span>
                    </li>
                ))}
            </ul>}
        </div>
    )
};