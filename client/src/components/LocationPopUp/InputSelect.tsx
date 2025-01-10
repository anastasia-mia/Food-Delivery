import React, {useEffect, useState} from 'react';
import './LocationPopUp.scss';
import {SelectProps} from "../../interfaces/geoInterfaces.ts";

export interface BaseOption {
    name: string;
    code?: string;
}

export const InputSelect = <T extends BaseOption>(
        {handleFunction,
            selectedOption,
            setSelectedOption,
            filterFunction,
            placeholder,
            countryCode,
            isDisabled
        }: SelectProps<T>) => {

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
                   className="locationPopUp-input"
                   value={typedValue}
                   onChange={(e) => handleInputChange(e)}
                   disabled={isDisabled}
            />
            {typedValue && !selectedOption && <ul className="locationPopUp-options">
                {optionsToDisplay.map((option: T) => (
                    <li key={option.code} onClick={() => {
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