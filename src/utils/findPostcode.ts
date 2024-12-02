export const findPostcode = (address: string) => {
  function findUKPostcode(address: string) {
    const postcodePattern = /\b[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}\b/;

    const match = address.match(postcodePattern);

    if (match) {
      return match[0];
    } else {
      return null;
    }
  }

  function findLithuanianPostcode(address: string) {
    const postcodePattern = /\b\d{5}\b/;

    const match = address.match(postcodePattern);

    if (match) {
      return match[0];
    } else {
      return null;
    }
  }

  const ukPostcode = findUKPostcode(address);
  const ltPostcode = findLithuanianPostcode(address);

  if (ukPostcode) {
    return ukPostcode;
  } else if (ltPostcode) {
    return ltPostcode;
  } else {
    return null;
  }
};
