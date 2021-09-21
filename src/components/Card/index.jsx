import React, { useRef } from "react";
import { getCardType } from "../../utils/cardTypes";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  CARD_NUMBER_MAX_LENGTH,
  CARD_NUMBER_PLACEHOLDER,
} from "../../utils/constants";
import { getFocusOverlayStyles } from "../../utils/functions";

const Card = ({
  cardCvv,
  cardNumber,
  cardMonth,
  cardYear,
  cardHolderName,
  currentBgImage,
  flipCard,
  focused,
}) => {
  const cardNumberRef = useRef(null);
  const cardHolderNameRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const renderCardDigits = (cardNumber) => {
    let digits = [];

    for (let index = 0; index < CARD_NUMBER_MAX_LENGTH; index++) {
      if (cardNumber.length > index) {
        digits.push(
          <span key={index} className="card-number-digit">
            {cardNumber[index]}
          </span>
        );
      } else {
        digits.push(
          <span key={index + 1} className="card-number-digit">
            {CARD_NUMBER_PLACEHOLDER[index]}
          </span>
        );
      }
    }
    return digits;
  };

  const renderCardHolderName = (cardHolderName) => {
    if (!cardHolderName) cardHolderName = "Enter Name";
    return cardHolderName.split("").map((letter, index) => (
      <span key={index} className="card-holder-name-letter">
        {letter}
      </span>
    ));
  };

  const renderCvvMask = (cardCvv) => {
    return cardCvv.split("").map((digit, index) => (
      <span key={digit + index} className="card-cvv-item">
        *
      </span>
    ));
  };

  const cardTypeName = getCardType(
    cardNumber.split(" ").join("")
  ).toLowerCase();

  const focusedTarget = (focusedName) => {
    switch (focusedName) {
      case "cardNumber":
        return cardNumberRef.current;
      case "cardHolderName":
        return cardHolderNameRef.current;
      case "cardMonth":
        return cardExpiryRef.current;
      case "cardYear":
        return cardExpiryRef.current;
      default:
        return null;
    }
  };

  return (
    <div className="card-wrapper">
      <div className={`card-item${flipCard ? " -active" : ""}`}>
        <div className="card-item__side -front">
          <div
            className="card-item__focus"
            style={getFocusOverlayStyles(focusedTarget(focused))}
          ></div>
          <div className="card-item__cover">
            <img
              src={
                require(`../../assets/images/${currentBgImage}.jpeg`).default
              }
              alt="card bg"
            />
          </div>
          <div className="card-item__content">
            <div className="card-item__content--first-row">
              <img
                src={require("../../assets/images/chip.png").default}
                alt="chip"
                className="chip"
              />
              <div className="card-type">
                {cardTypeName && (
                  <img
                    src={
                      require(`../../assets/images/${cardTypeName}.png`).default
                    }
                    alt="card type"
                  />
                )}
              </div>
            </div>
            <label
              htmlFor="cardNumber"
              className="card-item__content--second-row"
              ref={cardNumberRef}
            >
              <ReactCSSTransitionGroup
                transitionName="faded-1"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={0}
              >
                {renderCardDigits(cardNumber)}
              </ReactCSSTransitionGroup>
            </label>
            <div className="card-item__content--third-row">
              <label htmlFor="cardHolderName" ref={cardHolderNameRef}>
                <span>Card Holder</span>
                <div>
                  {" "}
                  <ReactCSSTransitionGroup
                    transitionName="faded"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                  >
                    {renderCardHolderName(cardHolderName)}
                  </ReactCSSTransitionGroup>
                </div>
              </label>
              <div className="card-item__date" ref={cardExpiryRef}>
                <label>Expiry</label>
                <label htmlFor="cardMonth">
                  <ReactCSSTransitionGroup
                    transitionName="hopped"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                  >
                    <span key={cardMonth}>{cardMonth}</span>
                  </ReactCSSTransitionGroup>
                </label>
                /{" "}
                <label htmlFor="cardYear">
                  <ReactCSSTransitionGroup
                    transitionName="hopped"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                  >
                    <span key={cardYear}>{+cardYear % 100}</span>
                  </ReactCSSTransitionGroup>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-item__side -back">
          <div className="card-item__cover">
            <img
              src={
                require(`../../assets/images/${currentBgImage}.jpeg`).default
              }
              alt="card bg"
            />
          </div>
          <div className="card__band"></div>
          <div className="card__cvv">
            <div className="card__cvv--title">CVV</div>
            <div className="card__cvv--band">
              <ReactCSSTransitionGroup
                transitionName="faded"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {renderCvvMask(cardCvv)}
              </ReactCSSTransitionGroup>
            </div>
            <div className="card__cvv--type">
              {cardTypeName && (
                <img
                  src={
                    require(`../../assets/images/${cardTypeName}.png`).default
                  }
                  alt="card type"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
