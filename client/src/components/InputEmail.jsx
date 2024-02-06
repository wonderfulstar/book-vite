import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import { addHistory, setCheckerEmail } from '../store/reducers/checker';
import { classNames } from '../utils';

import { useDispatch, useSelector } from 'react-redux';

const InputEmail = () => {
  const { step, history, dealerName, checkerEmail } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleChangeInputEmail = (e) => {
    setError(null);
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('You should input your email');
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('Invalid email type');
    } else {
      dispatch(addHistory(true));
      dispatch(setCheckerEmail(email));
      setEmail('');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 7 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="py-2 flex flex-col md:flex-row md:items-center"
          style={step >= 7 ? { display: 'none' } : { display: 'block' }}
        >
          <input
            type="text"
            className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
            autoFocus
            placeholder="email adress"
            value={email.toLowerCase()}
            onChange={handleChangeInputEmail}
          />
          {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-100 rounded-3xl p-4">
          By providing your email you agree to receive notification messages
          from <b>{dealerName}</b> to the provided email address.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 7 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-sm md:text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        <p>{checkerEmail}</p>
      </div>
    </div>
  );

  return (
    <>
      {step > 5 ? (
        <>
          {history[6] == true ? (
            <>
              {renderDescription()}
              {renderReply()}
            </>
          ) : (
            renderDescription()
          )}
        </>
      ) : null}
    </>
  );
};
export default InputEmail;