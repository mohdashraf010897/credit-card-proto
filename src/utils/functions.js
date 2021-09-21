export const generateMonthValue = (n) => {
  return n < 10 ? `0${n}` : n;
};

export const formatCardNumber = (value) => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const onlyNumbers = value.replace(/[^\d]/g, "");

  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(" ")
  );
};

export const getFocusOverlayStyles = (target) => {
  if (!target) return {};
  return {
    opacity: 1,
    width: `${target.offsetWidth}px`,
    height: `${target.offsetHeight}px`,
    transform: `translate(${target.offsetLeft}px, ${target.offsetTop}px)`,
  };
};
