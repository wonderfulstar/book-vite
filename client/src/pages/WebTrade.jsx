import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Flat } from '@alptugidin/react-circular-progress-bar';
// checker step components
import PhoneVerification from '../components/web/trade/PhoneVerification';
import CheckVerifyCode from '../components/web/trade/CheckVerifyCode';
import Instant from '../components/web/trade/Instant';
import FirstPage from '../components/web/trade/FirstPage';
import SecondPage from '../components/web/trade/SecondPage';
import ThirdPage from '../components/web/trade/ThirdPage';
import Finish from '../components/web/trade/Finish';
import homeImg from '../assets/webhome.png';
import refImg from '../assets/webref.png';
import {
  clearHistory,
  getDealerInfo,
  setDealerId,
} from '../store/reducers/checker';

const WebTrade = () => {
  const { dealerLogo, step, history } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const { dealer_id } = useParams();
  const navigate = useNavigate();
  const [percent, setPercent] = useState(null);

  useEffect(() => {
    // when refresh app, set dealer_id and dealer_info of store
    const dealerInfoCall = dispatch(getDealerInfo(dealer_id));
    new Promise(dealerInfoCall);
    dispatch(setDealerId(dealer_id));
    setPercent(parseInt(step / 6*100));
  }, [history, step, dealer_id, dispatch]);

  const Refresh = () => {
    dispatch(clearHistory());
  };
  const handleRestart = () => {
    dispatch(clearHistory());
  };

  const handleBack = () => {
    navigate(-1);
    dispatch(clearHistory());
  };
  return (
    <div className="bg-gray-100 w-screen h-screen min-w-[755px] relative">
      <div className="w-full bg-white border-gray-100 border-b-2 flex justify-center items-center relative">
        <div className="w-2/3 my-5 flex justify-between items-center">
          <img
            onClick={Refresh}
            className="w-1/4 h-16 cursor-pointer"
            src={dealerLogo}
            alt="avatar"
          />
          <div className=" w-32 h-10">
            <Flat
              progress={percent}
              range={{ from: 0, to: 100 }}
              sign={{ value: '%', position: 'end' }}
              text={'Complete'}
              showMiniCircle={true}
              showValue={true}
              sx={{
                strokeColor: '#854fff',
                barWidth: 8,
                bgStrokeColor: '#ffffff',
                bgColor: { value: '#000000', transparency: '30' },
                shape: 'full',
                strokeLinecap: 'butt',
                valueSize: 20,
                valueWeight: 'bold',
                valueColor: '#854fff',
                valueFamily: 'Trebuchet MS',
                textSize: 15,
                textWeight: 'bold',
                textColor: '#854fff',
                textFamily: 'Trebuchet MS',
                loadingTime: 1000,
                miniCircleColor: '#854fff',
                miniCircleSize: 5,
                valueAnimation: true,
                intersectionEnabled: true,
              }}
            />
          </div>
        </div>
      </div>
      {step == 0 && <PhoneVerification />}
      {step == 1 && <CheckVerifyCode />}
      {step == 2 && <Instant />}
      {step == 3 && <FirstPage />}
      {step == 4 && <SecondPage />}
      {step == 5 && <ThirdPage />}
      {step == 6 && <Finish />}
      <div className="w-full bg-white border-gray-100 border-b-2 flex justify-between items-center md:absolute md:bottom-0">
        <img
          className=" w-10 cursor-pointer mx-5"
          src={homeImg}
          alt="Home Icon"
          onClick={handleBack}
        />
        <img
          className="w-12 cursor-pointer mx-5"
          src={refImg}
          alt="refresh icon"
          onClick={handleRestart}
        />
      </div>
    </div>
  );
};
export default WebTrade;