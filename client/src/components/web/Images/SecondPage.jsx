import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { addHistory } from '../../../store/reducers/checker';
import { submitImages } from '../../../api/index';
import { useParams } from 'react-router-dom';

const SecondPage = () => {
  const { dealerName, dealerId, imageBase64, customerId } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();
  const { trade_id } = useParams();
  const [readStatePara1, setReadStatePara1] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let number = 0;
    for (let i = 0; i <= imageBase64.length - 1; i++) {
      const data = {
        dealer_id: dealerId,
        trade_in_id: trade_id,
        customer_id: customerId,
        path: imageBase64[i].base64,
      };
      const res = await submitImages(data);
      if (res.status == 201) {
        'status ImageSend', res;
        number += 1;
      } else {
        ('Faild ImageSend');
      }
    }
    'this is number ===>', number;
    if (number == imageBase64.length) {
      dispatch(addHistory(true));
    }
  };

  return (
    <div className="flex bg-gray-50 w-full justify-center items-center">
      <div className="w-2/3 flex flex-col mt-10 mx-20">
        <p className="w-2/3 text-4xl text-black my-3 font-medium">
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
            <p
              onClick={() => setReadStatePara1(!readStatePara1)}
              className={
                readStatePara1 == false
                  ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                  : null
              }
            >
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
                href="https://d2i2zqim3ahl97.cloudfront.net/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              to read our full Privacy Policy. If you would like to opt-out of
              having your information shared at all, please do so now by
              clicking{' '}
              <a
                href="https://d2i2zqim3ahl97.cloudfront.net/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              and exiting the application.
            </p>
            <span
              onClick={() => setReadStatePara1(!readStatePara1)}
              className={'text-blue-600 text-sm hover:underline cursor-pointer'}
            >
              {readStatePara1 == false ? 'More' : 'Less'}
            </span>
          </div>
          <div className="w-full mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#854fff] w-2/6 h-16 p-2 rounded-lg text-white text-xl  hover:bg-purple-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SecondPage;
