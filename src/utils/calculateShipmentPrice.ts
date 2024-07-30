type Props = {
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  categoryValue?: string;
  amount: number;
};

export const calculateShipmentPrice = ({ weight, amount }: Props) => {
  if (!weight) return;
  let price;
  const value = Number(weight);
  if (value <= 1) {
    price = 25;
  }
  if (value > 1 && value <= 5) {
    price = 35;
  }
  if (value > 5 && value <= 15) {
    price = 40;
  }
  if (value > 15 && value <= 30) {
    price = 45;
  }
  if (value > 30 && value <= 35) {
    price = value * 1.5;
  }
  if (value > 35 && value <= 50) {
    price = value * 1.49; // + 5%
  }
  if (value > 50 && value <= 100) {
    price = value * 1.46; // + 7%
  }
  if (value > 100) {
    price = value * 1.35; // + 10%
  }
  if (price) {
    price = price * amount;
    return price.toFixed(2);
  } else {
    return '0.00';
  }
};

export const calculateVolume = ({
  length,
  width,
  height,
  categoryValue,
  amount,
}: Props) => {
  if (!length || !width || !height) return;
  let pricePerUnit = 200;

  const volume = Number(length) * Number(width) * Number(height);

  if (categoryValue === 'removals') {
    if (volume <= 1) {
      pricePerUnit = 200;
    }
    if (volume > 1 && volume <= 2) {
      pricePerUnit = 185;
    }
    if (volume > 2 && volume <= 3) {
      pricePerUnit = 170;
    }
    if (volume > 3 && volume <= 5) {
      pricePerUnit = 150;
    }
    if (volume > 5 && volume <= 10) {
      pricePerUnit = 130;
    }
    if (volume > 10) {
      pricePerUnit = 115;
    }
  }

  const price = volume * pricePerUnit * amount;

  if (price) {
    return price.toFixed(2);
  } else {
    return '0.00';
  }
};
