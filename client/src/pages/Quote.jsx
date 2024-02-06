import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// checker step components
import Greeting from '../Quotecomponents/Greeting';
import SendPhoneVerificationCode from '../Quotecomponents/SendPhoneVerificationCode';
import CheckPhoneVerificationCode from '../Quotecomponents/CheckPhoneVerificationCode';
import InputFirstName from '../Quotecomponents/InputFirstName';
import InputLastName from '../Quotecomponents/InputLastName';
import InputEmail from '../Quotecomponents/InputEmail';
import Submit from '../Quotecomponents/Submit';
import DealType from '../Quotecomponents/DealType';
import Vehicle from '../Quotecomponents/Vehicle';
import {
  getDealerInfo,
  setDealerId,
  clearHistory,
} from '../store/reducers/checker';
import refreshImg from '../assets/refresh.png';
import backImg from '../assets/back.png';

const Quote = () => {
  const { dealerLogo, step, history } = useSelector((state) => state.checker);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dealer_id } = useParams();

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
          <InputFirstName />
          <InputLastName />
          <InputEmail />
          <DealType />
          <Vehicle/>
          <Submit />
        </div>
      </div>
    </div>
  );
};

export default Quote;
