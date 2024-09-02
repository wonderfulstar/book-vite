import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { addHistory, clearHistory } from '../../../store/reducers/checker';
import { SubmitQuote, usersUpdate } from '../../../api/index';
import { useNavigate } from 'react-router-dom';

const ThirdPage = () => {
  const {
    dealerName,
    dealerId,
    checkerMobileNumber,
    checkerFirstName,
    quoteStatus,
    checkerLastName,
    checkerEmail,
    quoteSource,
    dealType,
    quoteInterest,
    intentID,
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
  } = useSelector((state) => state.checker);
  '💎💎💎🧨🧨🧨💎💎💎🧨🧨🧨', intentID;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Tobegin = () => {
    ("I'm here");
    navigate(-1);
    dispatch(clearHistory());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      status: 'Completed',
      lang: 'EN',
      phone: checkerMobileNumber,
      page: 'Get Quote',
      last_question: '3',
    };
    const res = await usersUpdate(data, intentID);
    'this is update results ====>', res;
    dispatch(addHistory(true));

    const sub_data = {
      dealer_id: dealerId,
      first_name: checkerFirstName,
      last_name: checkerLastName,
      email: checkerEmail,
      mobile_phone: checkerMobileNumber,
      status: quoteStatus,
      source: quoteSource,
      interested_in: quoteInterest,
      deal_type: dealType,
    };

    const sub_res = await SubmitQuote(sub_data);
    if (sub_res.status == 201) {
      'status ImageSend', sub_res;
    } else {
      ('Faild ImageSend');
    }
  };

  return (
    <div className="flex bg-gray-50 w-full justify-center items-center">
      <div className="w-2/3 flex flex-col mt-10 mx-20">
        <p className="w-full text-4xl text-black my-3 font-medium">
          Please take a moment to review the information below.
        </p>
        <form
          className={classNames(
            'text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg font-sans'
          )}
        >
          <p className="bg-gray-50 rounded-3xl p-4 mt-2">
            We are committed to protecting your privacy. The information you
            provide is solely shared with our dealership for the purpose of
            assessing your request. It is not sold, marketed, or distributed in
            any way by {dealerName}. Your trust is paramount to us.
          </p>
          <div className="bg-gray-50 rounded-3xl p-4 mt-2">
            <p className="w-full">
              Please click{' '}
              <a
                href="https://d2i2zqim3ahl97.cloudfront.net/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              to read our Privacy Notice and click{' '}
              <a
                href="https://www.credit-apps.com/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              to read our full Privacy Policy. If you would like to opt-out of
              having your information shared at all, please do so now by
              clicking{' '}
              <span onClick={Tobegin} className="cursor-pointer text-blue-600">
                here
              </span>{' '}
              and exiting the application.
            </p>
          </div>
          <div className="w-full mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#854fff] w-1/4 h-20 p-2 rounded-lg text-white text-xl  hover:bg-purple-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ThirdPage;
