import { useState, useEffect } from 'react';
import { addHistory, removeHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCheckerFirstName,
    setCheckerLastName,
    setCheckerEmail,
    setProgress,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import TextField from '@mui/material/TextField';

const FifthPage = () => {

    const {
        step,
        dealerName,
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
    const dispatch = useDispatch();
    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [errorEmailAddress, setErrorEmailAddress] = useState('');
    const [errorZipcode, setErrorZipcode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [focusFirstName, setFocusFirstName] = useState(Boolean);
    const [focusLastName, setFocusLastName] = useState(Boolean);
    const [focusEmailAddress, setFocusEmailAddress] = useState(Boolean);

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        setErrorFirstName('');
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
        setErrorLastName('');
    };
    const handleEmailAddress = (e) => {
        setEmailAddress(e.target.value);
        setErrorEmailAddress('');
    };

    useEffect(() => {
        setErrorFirstName('');
        setErrorLastName('');
        setErrorEmailAddress('');
        setErrorZipcode('');
    }, [step]);

    const handleBack = () => {
        dispatch(removeHistory())
    };
    const handleSubmit = async () => {
        let pass = 0;
        if (!firstName) {
            setErrorFirstName('*field is required');
        } else if (!/^[A-Za-z]+$/.test(firstName)) {
            setErrorFirstName('*contains only characters');
        } else {
            pass += 1;
        }
        if (!lastName) {
            setErrorLastName('*field is required');
        } else if (!/^[A-Za-z]+$/.test(lastName)) {
            setErrorLastName('*contains only characters');
        } else {
            pass += 1;
        }
        if (!zipcode) {
            setErrorZipcode('input your zipcode');
        } else if (!/^\d+$/.test(zipcode)) {
            setErrorZipcode('Invalid social security number');
        } else {
            pass += 1;
        }
        if (!emailAddress) {
            setErrorEmailAddress('input your email');
        } else if (
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)
        ) {
            setErrorEmailAddress('Invalid email type');
        } else {
            pass += 1;
        }
        if (pass == 4) {
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
                page: 'Full',
                last_question: '1',
            };
            const res = await usersUpdate(data, intentID);
            console.log('this is update results ====>', res);
            dispatch(addHistory(true));
            dispatch(setProgress());
            dispatch(setCheckerFirstName(firstName));
            dispatch(setCheckerLastName(lastName));
            dispatch(setCheckerEmail(emailAddress));
        }
    }
    return (
        <>
            <div className="flex bg-gray-50 w-full justify-center items-center">
                <div className=" w-2/3 flex flex-col mt-20 mx-20">
                    <p className="w-full text-4xl my-3 font-medium text-center">
                        Experience the thrill of a Yamaha MT-10! Please enter your contact information to schedule your appointment with <b>RideNow Powersports Austin</b>.
                    </p>
                    <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
                        <div className="w-full p-5 flex justify-between flex-col md:flex-row">
                            <div className="flex flex-col w-full my-3 md:mx-5">
                                <TextField
                                    onFocus={() => setFocusFirstName(true)}
                                    onBlur={() => setFocusFirstName(false)} // onBlur is triggered when the input loses focus
                                    value={firstName}
                                    onChange={handleFirstName}
                                    fullWidth
                                    autoFocus
                                    label="First Name"
                                    variant="standard"
                                    InputProps={{
                                        style: {
                                            height: '50px', // Set the height of the TextField
                                            fontSize: '25px',
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '25px'
                                        },
                                    }}
                                />

                                {errorFirstName !== '' && (
                                    <p className="text-red-500 pl-2">{errorFirstName}</p>
                                )}
                                {focusFirstName && (
                                    <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                                        Please enter your first name.
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col w-full my-3 md:mx-5">
                                <TextField
                                    onFocus={() => setFocusLastName(true)}
                                    onBlur={() => setFocusLastName(false)} // onBlur is triggered when the input loses focus
                                    value={lastName}
                                    onChange={handleLastName}
                                    fullWidth
                                    label="Last Name"
                                    variant="standard"
                                    InputProps={{
                                        style: {
                                            height: '50px', // Set the height of the TextField
                                            fontSize: '25px',
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '25px'
                                        },
                                    }}
                                />
                                {errorLastName !== '' && (
                                    <p className="text-red-500 pl-2">{errorLastName}</p>
                                )}
                                {focusLastName && (
                                    <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                                        Please enter your last name.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex p-5 justify-between flex-col md:flex-row">

                            <div className="flex flex-col w-full my-3 md:mx-5">
                                <TextField
                                    onFocus={() => setFocusEmailAddress(true)}
                                    onBlur={() => setFocusEmailAddress(false)} // onBlur is triggered when the input loses focus
                                    value={emailAddress}
                                    onChange={handleEmailAddress}
                                    fullWidth
                                    label="Email Address"
                                    variant="standard"
                                    InputProps={{
                                        style: {
                                            height: '50px', // Set the height of the TextField
                                            fontSize: '25px',
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '25px'
                                        },
                                    }}
                                />
                                {errorEmailAddress !== '' && (
                                    <p className="text-red-500 pl-2">{errorEmailAddress}</p>
                                )}
                                {focusEmailAddress && (
                                    <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                                        By providing your email you agree to receive notification
                                        messages from <b>{dealerName}</b> to the provided email
                                        address.
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col w-full my-3 md:mx-5">
                                <TextField
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                    fullWidth
                                    label="Zipcode"
                                    variant="standard"
                                    InputProps={{
                                        style: {
                                            height: '50px', // Set the height of the TextField
                                            fontSize: '25px',
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '25px'
                                        },
                                    }}
                                />
                                {errorZipcode !== '' && (
                                    <p className="text-red-500 pl-2">{errorZipcode}</p>
                                )}
                            </div>
                        </div>
                        <div className="w-full p-5 flex justify-between">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-[#854fff] w-[30%] h-16 mx-1 rounded-lg text-white text-xl  hover:bg-purple-800"
                            >
                                BACK
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-[#854fff] w-[30%] h-16 mx-1 rounded-lg text-white text-xl  hover:bg-purple-800"
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
export default FifthPage;