import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setCheckerAddress,
  setCheckerApt,
  setCheckerLocality,
  setCheckerState,
  setCheckerZipcode,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';

const SecondPage = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [apt, setApt] = useState('');
  const [errors, setErrors] = useState({});

  const {
    step,
    intentID,
    dealerId,
    deviceIP,
    deviceOS,
    deviceCity,
    deviceCountry,
    deviceState,
    deviceDate,
    deviceLat,
    deviceLon,
    deviceBrowser,
    type,
    checkerMobileNumber,
  } = useSelector((state) => state.checker);

  const addressRef = useRef(null);

  useEffect(() => {
    setErrors({});
  }, [step]);

  const initializeAutocomplete = useCallback(() => {
    const input = document.getElementById('autocomplete');
    const newAutocomplete = new window.google.maps.places.Autocomplete(input);

    newAutocomplete.addListener('place_changed', () => {
      const place = newAutocomplete.getPlace();
      if (place.formatted_address !== undefined) {
        setAddress(place.formatted_address);
        parseAddressComponents(place);
      }
    });
  }, []);

  useEffect(() => {
    if (addressRef.current) {
      const loadGoogleMapsScript = (callback) => {
        if (window.google && window.google.maps && window.google.maps.places) {
          // The Google Maps API is already loaded
          callback();
        } else {
          // Create a new <script> tag only if the API hasn't been loaded yet
          const existingScript = document.getElementById('googleMapsScript');
          if (!existingScript) {
            const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
            const script = document.createElement('script');
            script.id = 'googleMapsScript'; // Assign an ID to the script element to check for its existence later
            script.type = 'text/javascript';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
            script.onload = () => callback();
            document.body.appendChild(script);
          }
        }
      };

      loadGoogleMapsScript(initializeAutocomplete);
    }
  }, [initializeAutocomplete, step]);

  const parseAddressComponents = (place) => {
    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'locality':
          setLocality(component.long_name);
          break;
        case 'administrative_area_level_1':
          setState(component.short_name);
          break;
        case 'postal_code':
          setZipcode(component.long_name);
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors('');
    let newErrors = {};
    console.log(locality);

    if (!locality.trim()) {
      newErrors.locality = 'City field is required';
    }
    if (!state.trim()) {
      newErrors.state = 'State field is required';
    }
    if (!zipcode.trim()) {
      newErrors.zipcode = 'ZipCode field is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = {
        dealer_id: dealerId,
        device_ip_address: deviceIP,
        device_operating_system: deviceOS,
        device_browser: deviceBrowser,
        device_type: type,
        device_state: deviceState,
        device_city: deviceCity,
        device_country: deviceCountry,
        device_date_time: deviceDate,
        device_lat: deviceLat,
        device_lon: deviceLon,
        status: 'Started',
        lang: 'EN',
        phone: checkerMobileNumber,
        page: 'Short',
        last_question: '2',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setCheckerAddress(address));
      dispatch(setCheckerApt(apt));
      dispatch(setCheckerLocality(locality));
      dispatch(setCheckerState(state));
      dispatch(setCheckerZipcode(zipcode));
      setAddress('');
      setApt('');
      setLocality('');
      setState('');
      setZipcode('');
    }
  };
  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className="w-2/3 flex flex-col mt-10 mx-20">
          <p className="w-2/3 text-4xl text-black my-3 font-medium">
            Make sure this is a physical address and not a P.O Box
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full flex p-5 flex-col md:flex-row">
              <input
                className="md:w-[68%] w-full h-20 rounded-md text-center text-2xl border-2 my-3 md:mx-5"
                id="autocomplete"
                placeholder="Enter your address"
                type="text"
                autoFocus
                autoComplete="off"
                ref={addressRef}
              />
              {errors.address ? (
                <p className="text-red-500 pl-2">{errors.address}</p>
              ) : null}
              <input
                className="md:w-[32%] w-full h-20 rounded-md text-center text-2xl border-2 my-3 md:mx-5"
                onChange={(e) => setApt(e.target.value)}
                value={apt}
                placeholder="Apt/Suite (Optional)"
              />
            </div>
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <input
                className="md:w-1/3 w-full h-20 rounded-md text-center text-2xl border-2 my-3 md:mx-5"
                onChange={(e) => {
                  setLocality(e.target.value);
                  setErrors((prev) => ({ ...prev, locality: '' }));
                }}
                value={locality}
                placeholder="City"
              />
              {errors.locality ? (
                <p className="text-red-500 pl-2">{errors.locality}</p>
              ) : null}
              <input
                className="md:w-1/3 w-full h-20 rounded-md text-center text-2xl border-2 my-3 md:mx-5"
                onChange={(e) => {
                  setState(e.target.value);
                  setErrors((prev) => ({ ...prev, state: '' }));
                }}
                value={state}
                placeholder="State"
              />
              {errors.state ? (
                <p className="text-red-500 pl-2">{errors.state}</p>
              ) : null}
              <input
                className="md:w-1/3 w-full h-20 rounded-md text-center text-2xl border-2 my-3 md:mx-5"
                onChange={(e) => {
                  setZipcode(e.target.value);
                  setErrors((prev) => ({ ...prev, zipcode: '' }));
                }}
                value={zipcode}
                placeholder="Zip Code"
              />
              {errors.zipcode ? (
                <p className="text-red-500 pl-2">{errors.zipcode}</p>
              ) : null}
            </div>
            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#854fff] w-1/4 h-20 p-2 mx-5 rounded-lg text-white text-xl  hover:bg-purple-800"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SecondPage;
