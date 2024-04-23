import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDealerInfo, clearHistory } from '../store/reducers/checker';
import shield from '../assets/shield.jpg';

const Home = () => {
  const { dealer_id } = useParams();
  const { dealerName, dealerLogo } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting dealer_name and avatar
  useEffect(() => {
    const dealerInfoCall = dispatch(getDealerInfo(dealer_id));
    new Promise(dealerInfoCall);
  }, [dealer_id, dispatch]);

  const changePageQuote = () => {
    navigate(`/info-checker/${dealer_id}/quote`);
  };

  const changePagePrequalified = () => {
    navigate(`/info-checker/${dealer_id}/prequalified`);
  };
  const changePageAppointment = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/appointment`);
  };
  const changePageTradeIn = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/trade`);
  };
  const changePageCheckApp = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/check`);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="flex w-full justify-center bg-white">
        <div className="flex w-full justify-between py-5 px-5">
          <img
            className="w-40 h-16 cursor-pointer"
            src={dealerLogo}
            alt="avatar"
          />
          <img className="w-35 h-20 cursor-pointer" src={shield} alt="avatar" />
        </div>
      </div>
      <div className="w-3/4 md:w-1/2 flex-col text-center">
        <p className="text-2xl md:text-4xl font-bold">
          🌟 Welcome to {dealerName}! Let&apos;s Tailor Your Experience Together
          🤖
        </p>
        <p className="text-xl md:text-2xl font-serif mt-6">
          We&apos;re thrilled to have you here! At {dealerName}, we understand
          that your time is valuable, and we want to make sure your experience
          is seamless and tailored to your needs.
        </p>
        <div className="flex flex-col mt-10 justify-around">
          <button
            onClick={changePageQuote}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            GET A QUOTE
          </button>
          <button
            onClick={changePagePrequalified}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            GET PREQUALIFIED
          </button>
          <button
            onClick={changePageTradeIn}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            TRADE IN VALUE
          </button>
          <button
            // onClick={changePagePrequalified}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            CALL BACK
          </button>
          <button
            // onClick={changePagePrequalified}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            FULL CREDIT APPLICATION
          </button>
          <button
            onClick={changePageCheckApp}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            CHECK APPLICATION STATUS
          </button>
          <button
            onClick={changePageAppointment}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
