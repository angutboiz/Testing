import React, { useEffect, useState } from "react";
import axios from "axios";

const ProvineAPI = () => {
    const [cities, setCities] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const [wards, setWards] = useState<any>([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
                setCities(response.data);
            } catch (error) {
                console.error("Error fetching cities: ", error);
            }
        };

        fetchCities();
    }, []);

    const handleCityChange = (event: any) => {
        const cityId = event.target.value;
        setSelectedCity(cityId);
        setDistricts([]);
        setWards([]);

        if (cityId) {
            const selectedCityData = cities.find((city: any) => city.Id === cityId);
            if (selectedCityData) {
                setDistricts(selectedCityData.Districts);
            }
        }
    };

    const handleDistrictChange = (event: any) => {
        const districtId = event.target.value;
        setSelectedDistrict(districtId);
        setWards([]);

        if (districtId) {
            const selectedCityData = cities.find((city: any) => city.Id === selectedCity);
            const selectedDistrictData = selectedCityData.Districts.find((district: any) => district.Id === districtId);
            if (selectedDistrictData) {
                setWards(selectedDistrictData.Wards);
            }
        }
    };

    return (
        <div>
            <div>
                <label htmlFor="city">Chọn tỉnh/thành phố:</label>
                <select id="city" onChange={handleCityChange}>
                    <option value="">Chọn tỉnh/thành phố</option>
                    {cities.map((city: any) => (
                        <option key={city.Id} value={city.Id}>
                            {city.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="district">Chọn quận/huyện:</label>
                <select id="district" onChange={handleDistrictChange} disabled={!selectedCity}>
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district: any) => (
                        <option key={district.Id} value={district.Id}>
                            {district.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="ward">Chọn xã/phường:</label>
                <select id="ward" disabled={!selectedDistrict}>
                    <option value="">Chọn xã/phường</option>
                    {wards.map((ward: any) => (
                        <option key={ward.Id} value={ward.Id}>
                            {ward.Name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ProvineAPI;
