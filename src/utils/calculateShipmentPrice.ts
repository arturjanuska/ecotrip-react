type Props = {
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  categoryValue?: string;
  amount: number;
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
    };
  let priceCalculatedByWeight = 0;
  let priceCalculatedByVolume = 0;
  const nWeight = Number(weight);
  const nLengthInMeters = Number(length) / 100;
  const nWidthInMeters = Number(width) / 100;
  const nHeightInMeters = Number(height) / 100;
  if (nWeight <= 1 && nWeight !== 0) {
    priceCalculatedByWeight = 25;
  }
  if (nWeight > 1 && nWeight <= 5) {
    priceCalculatedByWeight = 35;
  }
  if (nWeight > 5 && nWeight <= 15) {
    priceCalculatedByWeight = 40;
  }
  if (nWeight > 15 && nWeight <= 30) {
    priceCalculatedByWeight = 45;
  }
  if (nWeight > 30 && nWeight <= 35) {
    priceCalculatedByWeight = nWeight * 1.5;
  }
  if (nWeight > 35 && nWeight <= 50) {
    priceCalculatedByWeight = nWeight * 1.49;
    priceCalculatedByWeight = priceCalculatedByWeight * 1.05;
  }
  if (nWeight > 50 && nWeight <= 100) {
    priceCalculatedByWeight = nWeight * 1.46;
    priceCalculatedByWeight = priceCalculatedByWeight * 1.07;
  }
  if (nWeight > 100) {
    priceCalculatedByWeight = nWeight * 1.35;
    priceCalculatedByWeight = priceCalculatedByWeight * 1.1;
  }

  priceCalculatedByWeight = priceCalculatedByWeight * amount;

  const volumeInMeters = nLengthInMeters * nWidthInMeters * nHeightInMeters;
  const volumeInCm = Number(length) * Number(width) * Number(height);
  let pricePerUnit = 286;

  if (volumeInCm <= 160000) {
    pricePerUnit = 286;
  }
  if (volumeInCm > 160000 && volumeInCm <= 310000) {
    pricePerUnit = 271;
  }
  if (volumeInCm > 310000 && volumeInCm <= 470000) {
    pricePerUnit = 257;
  }
  if (volumeInCm > 470000 && volumeInCm <= 630000) {
    pricePerUnit = 243;
  }
  if (volumeInCm > 630000) {
    pricePerUnit = 229;
  }

  priceCalculatedByVolume = pricePerUnit * volumeInMeters * amount;
  return priceCalculatedByWeight >= priceCalculatedByVolume
    ? {
        price: priceCalculatedByWeight.toFixed(2) ?? '0.00',
        volume: volumeInCm,
      }
    : {
        price: priceCalculatedByVolume.toFixed(2) ?? '0.00',
        volume: volumeInCm,
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
