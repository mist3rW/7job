import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Input } from './input';

import thaiCities from '@/lib/cities';

type LocationInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onLocationSelected: (location: string) => void;
};

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationInput, setLocationInput] = useState('');
    const [hasFocus, setHasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationInput) return [];
      const searchInput = locationInput.split(' ');

      return thaiCities
        .map((city) => ` ${city.district}, ${city.province} `)
        .filter(
          (city) =>
            city.toLowerCase().includes(searchInput[0].toLowerCase()) &&
            searchInput.every((word) =>
              city.toLowerCase().includes(word.toLowerCase())
            )
        )
        .slice(0, 5);
    }, [locationInput]);

    return (
      <div className="relative w-full">
        <Input
          placeholder="Search for Thai cities"
          type="search"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          ref={ref}
        />
        {locationInput && hasFocus && (
          <div className="absolute divide-y w-full bg-background shadow-xl border-x border-b rounded-b-lg z-20">
            {!cities.length && <div>No results found</div>}
            {cities.map((city) => (
              <button
                key={city}
                className="block w-full text-start p-2"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationInput('');
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
