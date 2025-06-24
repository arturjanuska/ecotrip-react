/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-mixed-spaces-and-tabs */
type Props = {
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  categoryValue?: string;
  amount: number;
  service?: string;
};

export const calculateShipmentPrice = ({
  weight = '0',
  length,
  width,
  height,
  amount,
}: Props) => {
  if (!weight || !length || !width || !height)
    return {
      price: '0.00',
      volume: 0,
      extent: 0,
    };
  let priceCalculatedByWeight = 0;
  let priceCalculatedByVolume = 0;
  const nWeight = Number(weight);
  const nLengthInMeters = Number(length) / 100;
  const nWidthInMeters = Number(width) / 100;
  const nHeightInMeters = Number(height) / 100;
  if (nWeight <= 2 && nWeight !== 0) {
    priceCalculatedByWeight = 25;
  }
  if (nWeight > 2 && nWeight <= 5) {
    priceCalculatedByWeight = 35;
  }
  if (nWeight > 5 && nWeight <= 15) {
    priceCalculatedByWeight = 40;
  }
  if (nWeight > 15 && nWeight <= 30) {
    priceCalculatedByWeight = 45;
  }
  if (nWeight > 30 && nWeight <= 40) {
    // priceCalculatedByWeight = nWeight * 1.5; // old algorithm
    priceCalculatedByWeight = 60;
  }
  if (nWeight > 40 && nWeight <= 50) {
    // priceCalculatedByWeight = nWeight * 1.49; old algorithm
    // priceCalculatedByWeight = priceCalculatedByWeight * 1.05; old algorithm
    priceCalculatedByWeight = 75;
  }
  if (nWeight > 50 && nWeight <= 75) {
    // priceCalculatedByWeight = nWeight * 1.46; old algorithm
    // priceCalculatedByWeight = priceCalculatedByWeight * 1.07;  old algorithm
    priceCalculatedByWeight = 110;
  }
  if (nWeight > 75 && nWeight <= 100) {
    priceCalculatedByWeight = 135;
  }
  if (nWeight > 100) {
    priceCalculatedByWeight = nWeight * 1.35;
    priceCalculatedByWeight = priceCalculatedByWeight * 1.1;
  }

  priceCalculatedByWeight = priceCalculatedByWeight * amount;

  const volumeInMeters = nLengthInMeters * nWidthInMeters * nHeightInMeters;

  const extent = nLengthInMeters + nWidthInMeters * 2 + nHeightInMeters * 2;

  let pricePerUnit = 200;

  if (volumeInMeters <= 0.16) {
    pricePerUnit = 230;
  }
  if (volumeInMeters > 0.16 && volumeInMeters <= 0.31) {
    pricePerUnit = 220;
  }
  if (volumeInMeters > 0.31 && volumeInMeters <= 0.47) {
    pricePerUnit = 210;
  }
  if (volumeInMeters > 0.47 && volumeInMeters <= 0.63) {
    pricePerUnit = 205;
  }
  if (volumeInMeters > 0.63) {
    pricePerUnit = 200;
  }

  priceCalculatedByVolume = pricePerUnit * volumeInMeters * amount;

  return priceCalculatedByWeight >= priceCalculatedByVolume
    ? {
        price: priceCalculatedByWeight.toFixed(2) ?? '0.00',
        volume: volumeInMeters,
        extent: extent * 100,
      }
    : {
        price: priceCalculatedByVolume.toFixed(2) ?? '0.00',
        volume: volumeInMeters,
        extent: extent * 100,
      };
};

export const calculateVolume = ({
  length,
  width,
  height,
  categoryValue,
  amount,
}: Props) => {
  if (!length || !width || !height) return { price: '0.00', volume: 0 };
  let pricePerUnit = 200;

  const lengthInMeters = Number(length) / 100;
  const widthInMeters = Number(width) / 100;
  const heightInMeters = Number(height) / 100;

  const volume = lengthInMeters * widthInMeters * heightInMeters;

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
    return { price: price.toFixed(2), volume };
  } else {
    return { price: '0.00', volume };
  }
};
