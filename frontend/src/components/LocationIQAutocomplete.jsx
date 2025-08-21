import React, { useState } from "react";

const LocationIQAutocomplete = ({ onAddressSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const API_KEY = "pk.f77189c0f64e6392807380d9f67d9137";

  const fetchSuggestions = async (value) => {
    if (!value) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${encodeURIComponent(
          value
        )}&countrycodes=au&limit=5&format=json`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (place) => {
    const suburb = place.address?.suburb || place.address?.town || "";
    const postcode = place.address?.postcode || "";
    onAddressSelect({
      fullAddress: place.display_name,
      suburb,
      postcode,
    });
    setQuery(place.display_name);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder="Enter address"
        className="border p-2 w-full border-gray-300"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSelect(place)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationIQAutocomplete;
