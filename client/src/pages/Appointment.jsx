import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { browserName, osName } from 'react-device-detect';
// checker step components
import Greeting from '../components/Mobile/appointment/Greeting';
import SendPhoneVerificationCode from '../components/Mobile/appointment/SendPhoneVerificationCode';
import CheckPhoneVerificationCode from '../components/Mobile/appointment/CheckPhoneVerificationCode';
import InputFirstName from '../components/Mobile/appointment/InputFirstName';
import InputLastName from '../components/Mobile/appointment/InputLastName';
import InputEmail from '../components/Mobile/appointment/InputEmail';
import Submit from '../components/Mobile/appointment/Submit';
import AppointmentDate from '../components/Mobile/appointment/AppointmentDate';
import {
  getDealerInfo,
  setDealerId,
  clearHistory,
  setDeviceBrowser,
  setDeviceCity,
  setDeviceCountry,
  setDeviceDate,
  setDeviceIP,
  setDeviceLat,
  setDeviceLon,
  setDeviceOS,
  setDeviceState,
  setTimezone
} from '../store/reducers/checker';
import refreshImg from '../assets/refresh.png';
import backImg from '../assets/back.png';
import { deviceInfo } from '../api/index';

const Quote = () => {
  const { dealerLogo, step, history } = useSelector((state) => state.checker);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dealer_id } = useParams();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then(async (data) => {
        console.log('this is IP address===>', data.ip);
        dispatch(setDeviceIP(data.ip));
        deviceInfo(data.ip).then((deviceData) => {
          console.log('this is device=======>', deviceData);
          dispatch(setDeviceCountry(deviceData.country));
          dispatch(setDeviceCity(deviceData.city));
          dispatch(setDeviceState(deviceData.region));
          dispatch(setDeviceLat(deviceData.ll[0]));
          dispatch(setDeviceLon(deviceData.ll[1]));
          dispatch(setTimezone(deviceData.timezone))
        });
        const currentTime = moment
          .tz(data.timezone)
          .format('YYYY-MM-DD HH:mm:ss');
        dispatch(setDeviceDate(currentTime));
        dispatch(setDeviceBrowser(browserName));
        dispatch(setDeviceOS(osName));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // You can access the DOM node directly with myDivRef.current
    containerRef.current.scrollTop = containerRef.current.scrollHeight;

    // when refresh app, set dealer_id and dealer_info of store
    const dealerInfoCall = dispatch(getDealerInfo(dealer_id));
    new Promise(dealerInfoCall);
    dispatch(setDealerId(dealer_id));
  }, [history, step, dealer_id, dispatch]);

  const handleRestart = () => {
    dispatch(clearHistory());
  };

  const handleBack = () => {
    navigate(-1);
    dispatch(clearHistory());
  };

  return (
    <div
      className="relative w-full h-screen flex justify-center items-center overflow-y-scroll scroll-smooth"
      ref={containerRef}
    >
      <div className="h-full w-[95%] md:w-full flex flex-col items-center">
        <div className="w-[95%] md:w-[500px] fixed top-0 h-12 bg-white"></div>
        <div className="w-[95%] md:w-[500px] fixed top-12 rounded-lg flex justify-between items-center py-6 px-4 bg-white shadow-[10px_10px_20px_-5px_rgba(0,0,0,0.3)]">
          <img
            className="w-4 md:w-6 cursor-pointer"
            src={backImg}
            alt="back icon"
            onClick={handleBack}
          />
          <img className="w-1/3" src={dealerLogo} alt="avatar" />
          <img
            className="w-4 md:w-6 cursor-pointer"
            src={refreshImg}
            alt="refresh icon"
            onClick={handleRestart}
          />
        </div>
        <div className="w-full md:w-[500px] text-lg font-serif pb-[15vh] pt-44 px-4">
          <Greeting />
          <SendPhoneVerificationCode />
          <CheckPhoneVerificationCode />
          <AppointmentDate />
          <InputFirstName />
          <InputLastName />
          <InputEmail />
          <Submit />
        </div>
      </div>
    </div>
  );
};

export default Quote;