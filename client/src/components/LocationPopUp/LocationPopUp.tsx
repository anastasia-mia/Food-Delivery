import './LocationPopUp.scss';
import {useState} from "react";
import {InputSelect} from "./InputSelect.tsx";
import {CountryOption} from "./interfaces.ts";
import {getCountries, filterCountryOptions} from "./selectFunctions.ts";

type SelectedCountry = CountryOption | null;

export const LocationPopUp = () => {
    const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>(null);

    return (
        <div className="locationPopUp_background">
            <div className="locationPopUp">
                <div className="locationPopUp_container">
                    <div className="locationPopUp_header">
                        <p className="locationPopUp_title">Your location</p>
                        <div className="locationPopUp_cross"></div>
                    </div>
                    <div className="locationPopUp_main">
                        <div className="locationPopUp_location">
                            <p>Find my position</p>
                            <form>
                                <InputSelect<CountryOption>
                                    handleFunction={getCountries}
                                    selectedOption={selectedCountry}
                                    setSelectedOption={setSelectedCountry}
                                    filterFunction={filterCountryOptions}
                                />
                            </form>
                        </div>
                        <div className="locationPopUp_map"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}