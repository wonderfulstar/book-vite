import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setCheckerIsSkipMiddleName,
  setQuoteInterest,
} from '../store/reducers/checker';
import { classNames } from '../utils';

const InputMiddleName = () => {
  const { step, history, checkerIsSkipMiddleName, quoteInterest } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();

  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const handleMake = (e) => {
    setMake(e.target.value);
  };
  const handleModel = (e) => {
    setModel(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let interest = year + ' ' + make + ' ' + ' ' + model;
    dispatch(addHistory(true));
    dispatch(setQuoteInterest(interest));
    setYear('');
    setMake('');
    setModel('');
  };

  const skipThisStep = () => {
    dispatch(setCheckerIsSkipMiddleName(true));
    dispatch(addHistory(true));
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 8 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          <input
            type="text"
            className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
            autoFocus
            placeholder="Year"
            value={year}
            onChange={handleYearChange}
          />
          <input
            type="text"
            className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
            placeholder="Make"
            value={make}
            onChange={handleMake}
          />
          <input
            type="text"
            className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
            placeholder="Model"
            value={model}
            onChange={handleModel}
          />
        </div>
        <p className="bg-gray-100 rounded-3xl p-4">
          What is the vehicle's year/make/model?
        </p>
        <button
          onClick={skipThisStep}
          type="button"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          SKIP
        </button>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {quoteInterest}
      </div>
    </div>
  );

  return (
    <>
      {step > 6 && checkerIsSkipMiddleName == false ? (
        <>
          {history[7] == true ? (
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
export default InputMiddleName;
