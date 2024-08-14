import './LocationPopUp.scss';
import {useState} from "react";
import {InputSelect} from "./InputSelect.tsx";
import {CityOption, CountryOption} from "./interfaces.ts";
import {getCountries, filterCountryOptions, getCities} from "./selectFunctions.ts";
import sprite from "../../assets/icons/sprite.svg";
import MapComponent from '../../pages/CheckoutPage/Map/Map.tsx'

type SelectedCountry = CountryOption | null;

export const LocationPopUp = () => {
    const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>(null);
    const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

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
                            <div className="locationPopUp_location_current">
                                <svg width="24" height="24">
                                    <use
                                        href={sprite + "#map-pin"}
                                        fill="none"
                                        stroke="red"
                                    ></use>
                                </svg>
                                <p>Find my position automatically</p>
                            </div>
                            <form>
                                <label>Or find your city and put a marker on map</label>
                                <InputSelect<CountryOption>
                                    handleFunction={getCountries}
                                    selectedOption={selectedCountry}
                                    setSelectedOption={setSelectedCountry}
                                    filterFunction={filterCountryOptions}
                                    placeholder="Select a country"
                                />
                                <InputSelect<CityOption>
                                    handleFunction={getCities}
                                    selectedOption={selectedCity}
                                    setSelectedOption={setSelectedCity}
                                    placeholder="Select a city"
                                    countryCode={selectedCountry?.code}
                                />
                                <button>Find</button>
                            </form>
                        </div>
                        <div className="locationPopUp_map">
                            <MapComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}