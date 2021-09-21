import React, { useRef, useState } from "react";
import { CARD_NUMBER_MAX_LENGTH, MIN_CARD_YEAR } from "../../utils/constants";
import { formatCardNumber, generateMonthValue } from "../../utils/functions";
import Card from "../Card";
import Success from "../common/Success";

let minCardMonth = generateMonthValue(new Date().getMonth() + 1);

const Form = () => {
  const formRef = useRef(null);
  const [state, setState] = useState({
    cardNumber: "",
    cardHolderName: "",
    cardMonth: minCardMonth,
    cardYear: MIN_CARD_YEAR,
    cardCvv: "",
    focused: "",
    currentBgImage: Math.floor(Math.random() * 25 + 1),
    flipCard: false,
    success: false,
  });

  const handleInputChange = ({ target }) => {
    if (target.name === "cardNumber" || target.name === "cardCvv") {
      target.value = formatCardNumber(target.value);
    } else if (target.name === "cardHolderName") {
      target.value = target.value.replace(/[^a-zA-Z ]/g, "");
    }

    if (target.name === "cardYear") {
      minCardMonth =
        (+target.value === +MIN_CARD_YEAR ? new Date().getMonth() : 0) + 1;
    }
    setState({
      ...state,
      [target.name]: target.value,
      ...(+state.cardMonth < +minCardMonth && { cardMonth: minCardMonth }),
    });
  };

  const handleInputFocus = ({ target: { name } }) => {
    setState({
      ...state,
      focused: name,
      flipCard: name === "cardCvv",
    });
  };

  const handleInputBlur = () => {
    setState({
      ...state,
      focused: "",
      flipCard: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, success: true });

    setTimeout(() => {
      formRef.current.reset();
      setState({
        ...state,
        flipCard: false,
        cardNumber: "",
        cardHolderName: "",
        cardMonth: minCardMonth,
        cardYear: MIN_CARD_YEAR,
        cardCvv: "",
        focused: "",
        success: false,
      });
    }, 3000);
  };
  return (
    <div className="card-form">
      <Card
        {...state}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
      />
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="card-input">
          <label htmlFor="cardNumber" className="card-input__label">
            Card Number
          </label>
          <input
            type="tel"
            name="cardNumber"
            id="cardNumber"
            pattern="[\d| ]{16,22}"
            className="card-input__input"
            required
            maxLength={CARD_NUMBER_MAX_LENGTH}
            autoComplete="off"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={() => {
              handleInputBlur();
            }}
          />
        </div>
        <div className="card-input">
          <label htmlFor="cardHolderName" className="card-input__label">
            Card Holder
          </label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            required
            className="card-input__input"
            autoComplete="off"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
        <div className="card-form__row">
          <div className="card-form__col">
            <div className="card-form__group">
              <label htmlFor="cardMonth" className="card-input__label">
                Expiration Date
              </label>
              <select
                className="card-input__input -select"
                id="cardMonth"
                name="cardMonth"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={state.cardMonth}
              >
                <option value disabled>
                  Month
                </option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option
                    disabled={month < minCardMonth}
                    key={generateMonthValue(month)}
                    value={generateMonthValue(month)}
                  >
                    {generateMonthValue(month)}
                  </option>
                ))}
              </select>
              <select
                className="card-input__input -select"
                id="cardYear"
                name="cardYear"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={state.cardYear}
              >
                <option value disabled>
                  Year
                </option>
                {Array.from({ length: 12 }).map((n, index) => (
                  <option
                    key={index + MIN_CARD_YEAR}
                    value={index + MIN_CARD_YEAR}
                  >
                    {index + MIN_CARD_YEAR}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-form__col -cvv">
            <div className="card-input">
              <label htmlFor="cardCvv" className="card-input__label">
                CVV
              </label>
              <input
                type="tel"
                className="card-input__input"
                id="cardCvv"
                name="cardCvv"
                maxLength="4"
                autoComplete="off"
                pattern="\d{3,4}"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="card-form__button">
          Submit
        </button>
      </form>
      {state.success && <Success />}
    </div>
  );
};

export default Form;
