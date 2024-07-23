import { useState, useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { distinctLocations } from '@/server/actions/job-action';
import { useDebounce } from '@/lib/hook';

type LocationInputProps = {
  onLocationChange: (location: string) => void;
  value: string;
};

export default function LocationSuggestInput({
  onLocationChange,
  value,
}: LocationInputProps) {
  const [locationSearchInput, setLocationSearchInput] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchInput = useDebounce(locationSearchInput, 500);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchInput.trim() === '') {
        setSuggestions([]);
        return;
      }
      try {
        const locations = await distinctLocations();
        const filteredLocations = locations.filter((location) =>
          location.toLowerCase().includes(debouncedSearchInput.toLowerCase())
        );
        setSuggestions(filteredLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchInput]);

  const handleSelectSuggestion = (location: string) => {
    setLocationSearchInput(location);
    setSuggestions([]);
    setShowSuggestions(false);
    onLocationChange(location);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocationSearchInput(inputValue);
    setShowSuggestions(true);
    onLocationChange(inputValue);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder="Search for a city"
        type="text"
        value={locationSearchInput}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay hiding to allow click event to register
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1">
          {suggestions.map((location, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onMouseDown={() => handleSelectSuggestion(location)} // Use onMouseDown to handle selection before blur
            >
              {location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
