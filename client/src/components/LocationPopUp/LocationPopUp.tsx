import './LocationPopUp.scss';
import React, {useEffect, useState} from "react";
import {InputSelect} from "./InputSelect.tsx";
import {CityOption, CountryOption, ICoords} from "../../interfaces/geoInterfaces.ts";
import {getCountries} from "./locationService/getCountries.ts";
import {filterCountryOptions} from "./locationService/filterCountryOptions.ts";
import {getCities} from "./locationService/getCities.ts";
import {fetchCityCoordinates} from "./locationService/fetchCityCoordinates.ts";
import {fetchCurrentAddress} from "./locationService/fetchCurrentAddress.ts"
const sprite = "/assets/icons/sprite.svg";
import Map from '../Map/Map.tsx'
import useStoredCoords from "../../hooks/useStoredCoords.ts";
import {useDispatch} from "react-redux";
import {setIsLocationPopUpDisplayed} from "../../redux/popUpDisplayingSlice.ts";
import useNoScroll from "../../hooks/useNoScroll.ts";

type SelectedCountry = CountryOption | null;

export const LocationPopUp = () => {
    const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>(null);
    const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
    const [coords, setCoords] = useState<ICoords>({lat: 0, lon: 0});
    const [address, setAddress] = useState<string | null>(null);
    const storedCoords = useStoredCoords();
    const dispatch = useDispatch();
    useNoScroll(true);

    useEffect(() => {
        if (storedCoords) {
            setCoords(storedCoords);
        }
    }, [storedCoords]);

    const setLocationByUserData = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (selectedCountry && selectedCity) {
            const coords = await fetchCityCoordinates(selectedCountry.name, selectedCity.name);
            if (coords) {
                setCoords({lat: coords.lat, lon: coords.lon});
            }
        }
    }

    const setCurrentLocation = async () => {
        const coords = await fetchCurrentAddress();
        setCoords({lat: coords.lat, lon: coords.lon})
    }

    const closePopUp = (): void => {
        dispatch(setIsLocationPopUpDisplayed(false))
    }

    const confirmUserLocation = () => {
        localStorage.setItem('coords', JSON.stringify(coords));
        window.dispatchEvent(new Event('storageChange'));
        closePopUp();
    }

    return (
        <div className="popUp-background">
            <div className="locationPopUp">
                <div className="locationPopUp_container">
                    <div className="locationPopUp_header">
                        <p className="locationPopUp_title">Your location</p>
                        <div className="cross" onClick={closePopUp}></div>
                    </div>
                    <div className="locationPopUp_main">
                        <div className="locationPopUp_location">
                            <div className="locationPopUp_location_current" onClick={setCurrentLocation}>
                                <svg width="24" height="24">
                                    <use
                                        href={sprite + "#map-pin"}
                                        fill="none"
                                        stroke="red"
                                    ></use>
                                </svg>
                                <p>Find my position automatically</p>
                            </div>
                            <label>Or find your city and put a marker on map</label>
                            <form>
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
                                    isDisabled={!selectedCountry}
                                />
                            </form>
                            <button onClick={setLocationByUserData}
                                    className={`${(selectedCity && selectedCountry) ? '' : `nonactive`}`}
                                    disabled={!selectedCity}
                            >
                                Find
                            </button>
                            {window.innerWidth > 768 &&
                                <button
                                    className={`locationPopUp_confirmBtn 
                                ${!address ? `nonactive` : ''}`}
                                    onClick={confirmUserLocation}
                                >
                                    Confirm my address
                                </button>
                            }
                        </div>
                        <div className="locationPopUp_map">
                            <p data-testid="address"><span>Address:</span> {address}</p>
                            <div>
                                <Map coords={coords} setAddress={setAddress} setCoords={setCoords}/>
                            </div>
                        </div>
                        {window.innerWidth <= 768 &&
                            <button
                                className={`locationPopUp_confirmBtn 
                                ${!address ? `nonactive` : ''}`}
                                onClick={confirmUserLocation}
                            >
                                Confirm my address
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}