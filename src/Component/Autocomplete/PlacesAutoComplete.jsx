import React, { useRef, useState, useEffect } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];
const key = import.meta.env.VITE_GOOGLE_API_KEY;

export default function PlacesAutocompleteInput({
  value,
  onPlaceSelected,
  placeholder,
  name,
  onChange, // Add onChange prop
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
    libraries,
  });

  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState(value || "");

  // Update local state when value prop changes
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const places = autocompleteRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const formattedAddress = place.formatted_address || "";
        setInputValue(formattedAddress);
        onPlaceSelected(place);
      }
    } else {
      console.warn("Autocomplete not yet loaded.");
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Call onChange to update parent component's state
    if (onChange) {
      onChange(e);
    }
  };

  if (!isLoaded) return null;

  return (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlaceChanged}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="form-control"
        value={inputValue}
        onChange={handleInputChange}
      />
    </StandaloneSearchBox>
  );
}
