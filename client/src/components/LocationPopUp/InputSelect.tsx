import React, {useEffect, useState} from 'react';
import './LocationPopUp.scss';
import {SelectProps} from "./interfaces.ts";

export interface BaseOption {
    name: string;
    code?: string;
}

export const InputSelect = <T extends BaseOption>(
        {handleFunction, selectedOption, setSelectedOption, filterFunction}: SelectProps<T>) => {

    const [suggestions, setSuggestions] = useState<T[]>([]);
    const [typedValue, setTypedValue] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<T[]>([]);

    useEffect(() => {
        handleFunction(setSuggestions as (suggestions: T[]) => void)
    }, [handleFunction]);

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
                   placeholder="Select a country"
                   className="locationPopUp_input"
                   value={typedValue}
                   onChange={(e) => handleInputChange(e)}
            />
            {typedValue && !selectedOption && <ul className="locationPopUp_options">
                {filteredOptions.map((option: T, index: number) => (
                    <li key={index} onClick={() => {
                        setSelectedOption(option)
                        setTypedValue(option.name)
                    }}>
                        <span>{option.name}</span>
                        <span>{option.code}</span>
                    </li>
                ))}
            </ul>}
        </div>
    )
};