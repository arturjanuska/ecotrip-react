export const convertRangeSizeToOptionType = (
  size: { from: number; to: number },
  category: string,
  productType?: string,
) => {
  const { from, to } = size;
  if (category === "flatScreenTv") {
    if (from === 0 && to === 23) {
      return "<23 inch";
    }
    if (from === 24 && to === 31) {
      return "23 - 31 inch";
    }
    if (from === 32 && to === 39) {
      return "32 - 39 inch";
    }
    if (from === 40 && to === 42) {
      return "40 - 42 inch";
    }
    if (from === 43 && to === 49) {
      return "43 - 49 inch";
    }
    if (from === 50 && to === 54) {
      return "50 - 54 inch";
    }
    if (from === 55 && to === 64) {
      return "55 - 64 inch";
    }
    if (from === 65 && to === 69) {
      return "65 - 69 inch";
    }
    if (from === 70 && to === 74) {
      return "70 - 74 inch";
    }
    if (from === 75 && to === 84) {
      return "75 - 84 inch";
    }
    if (from === 85 && to === Infinity) {
      return ">85 inch";
    }
    return "";
  } else {
    switch (productType) {
      case "setOfWheels":
        if (from === 0 && to === 15) {
          return "<R16";
        }
        if (from === 16 && to === 17) {
          return "R16 - R18";
        }
        if (from === 18 && to === 21) {
          return "R19 - R22";
        }
        if (from === 22 && to === Infinity) {
          return ">R22";
        }
        return "";
      case "electricScooter":
        if (from === 0 && to === 24) {
          return "<25 unit";
        }
        if (from === 25 && to === Infinity) {
          return ">25 unit";
        }
        return "";
      case "engine":
      case "gearbox":
        if (from === 0 && to === 999) {
          return ">1000 cm3";
        }
        if (from === 1000 && to === 1499) {
          return "1000 - 1500 cm3";
        }
        if (from === 1500 && to === 1999) {
          return "1500 - 2000 cm3";
        }
        if (from === 2000 && to === 2499) {
          return "2000 - 2500 cm3";
        }
        if (from === 2500 && to === 2999) {
          return "2500 - 3000 cm3";
        }
        if (from === 3000 && to === 3499) {
          return "3000 - 3500 cm3";
        }
        if (from === 3500 && to === 3999) {
          return "3500 - 4000 cm3";
        }
        if (from === 4000 && to === Infinity) {
          return ">4000 cm3";
        }
        return "";
      case "scooterMoped":
        if (from === 0 && to === 49) {
          return "<49 cm3";
        }
        if (from === 50 && to === 124) {
          return "50 - 125 cm3";
        }
        if (from === 125 && to === 249) {
          return "125 - 250 cm3";
        }
        if (from === 250 && to === Infinity) {
          return ">250 cm3";
        }
        return "";
      case "standardMotorcycle":
        if (from === 0 && to === 499) {
          return "<500 cm3";
        }
        if (from === 500 && to === 749) {
          return "500 - 750 cm3";
        }
        if (from === 750 && to === 999) {
          return "750 - 1000 cm3";
        }
        if (from === 1000 && to === Infinity) {
          return ">1000 cm3";
        }
        return "";
      case "motocrossMotorcycle":
        if (from === 0 && to === 124) {
          return "<125 cm3";
        }
        if (from === 125 && to === 249) {
          return "125 - 249 cm3";
        }
        if (from === 250 && to === 449) {
          return "250 - 449 cm3";
        }
        if (from === 450 && to === Infinity) {
          return ">450 cm3";
        }
        return "";
      case "touringMotorcycle":
        if (from === 0 && to === 799) {
          return "<800 cm3";
        }
        if (from === 800 && to === 1199) {
          return "800 - 1199 cm3";
        }
        if (from === 1200 && to === 1599) {
          return "1200 - 1599 cm3";
        }
        if (from === 1600 && to === Infinity) {
          return ">1600 cm3";
        }
        return "";
      case "sportsMotorcycle":
        if (from === 0 && to === 599) {
          return "<600 cm3";
        }
        if (from === 600 && to === 999) {
          return "600 - 1000 cm3";
        }
        if (from === 1000 && to === Infinity) {
          return ">1000 cm3";
        }
        return "";
      case "chopper":
        if (from === 0 && to === 799) {
          return "<800 cm3";
        }
        if (from === 800 && to === 1199) {
          return "800 - 1199 cm3";
        }
        if (from === 1200 && to === Infinity) {
          return ">1200 cm3";
        }
        return "";
      case "enduro":
        if (from === 0 && to === 249) {
          return "<250 cm3";
        }
        if (from === 250 && to === 649) {
          return "250 - 649 cm3";
        }
        if (from === 650 && to === 1199) {
          return "650 - 1200 cm3";
        }
        if (from === 1200 && to === Infinity) {
          return ">1200 cm3";
        }
        return "";
      case "quadBike":
        if (from === 0 && to === 399) {
          return "<400 cm3";
        }
        if (from === 400 && to === 799) {
          return "400 - 799 cm3";
        }
        if (from === 800 && to === 1199) {
          return "800 - 1200 cm3";
        }
        if (from === 1200 && to === Infinity) {
          return ">1200 cm3";
        }
        return "";
      case "motorcycleEngine":
        if (from === 0 && to === 44) {
          return "<45 cm3";
        }
        if (from === 45 && to === 249) {
          return "45 - 249 cm3";
        }
        if (from === 250 && to === 449) {
          return "250 - 450 cm3";
        }
        if (from === 450 && to === 599) {
          return "450 - 600 cm3";
        }
        if (from === 600 && to === 999) {
          return "600 - 1000 cm3";
        }
        if (from === 1000 && to === 1199) {
          return "1000 - 1200 cm3";
        }
        if (from === 1200 && to === 1599) {
          return "1200 - 1600 cm3";
        }
        if (from === 1600 && to === Infinity) {
          return ">1600 cm3";
        }
        return "";
      case "smallGardenTractor":
        if (from === 0 && to === 79) {
          return "<79 cm";
        }
        return "";
      case "averageGardenTractor":
        if (from === 80 && to === 119) {
          return "80 - 119 cm";
        }
        return "";
      case "bigGardenTractor":
        if (from === 120 && to === Infinity) {
          return ">120 cm";
        }

        return "";
      default:
        return "";
    }
  }
};

export const convertOptionTypeToRangeSize = (
  productType: string,
  option: string,
  category: string,
): { from: number; to: number } | null => {
  if (category === "flatScreenTv") {
    switch (option) {
      case "<23 inch":
        return { from: 0, to: 23 };
      case "23 - 31 inch":
        return { from: 24, to: 31 };
      case "32 - 39 inch":
        return { from: 32, to: 39 };
      case "40 - 42 inch":
        return { from: 40, to: 42 };
      case "43 - 49 inch":
        return { from: 43, to: 49 };
      case "50 - 54 inch":
        return { from: 50, to: 54 };
      case "55 - 64 inch":
        return { from: 55, to: 64 };
      case "65 - 69 inch":
        return { from: 65, to: 69 };
      case "70 - 74 inch":
        return { from: 70, to: 74 };
      case "75 - 84 inch":
        return { from: 75, to: 84 };
      case ">85 inch":
        return { from: 85, to: Infinity };
    }
  } else {
    switch (productType) {
      case "setOfWheels":
        switch (option) {
          case "<R16":
            return { from: 0, to: 15 };
          case "R16 - R18":
            return { from: 16, to: 17 };
          case "R19 - R22":
            return { from: 18, to: 21 };
          case ">R22":
            return { from: 22, to: Infinity };
        }
        break;
      case "electricScooter":
        switch (option) {
          case "<25 unit":
            return { from: 0, to: 24 };
          case ">25 unit":
            return { from: 25, to: Infinity };
        }
        break;
      case "engine":
      case "gearbox":
        switch (option) {
          case ">1000 cm3":
            return { from: 0, to: 999 };
          case "1000 - 1500 cm3":
            return { from: 1000, to: 1499 };
          case "1500 - 2000 cm3":
            return { from: 1500, to: 1999 };
          case "2000 - 2500 cm3":
            return { from: 2000, to: 2499 };
          case "2500 - 3000 cm3":
            return { from: 2500, to: 2999 };
          case "3000 - 3500 cm3":
            return { from: 3000, to: 3499 };
          case "3500 - 4000 cm3":
            return { from: 3500, to: 3999 };
          case ">4000 cm3":
            return { from: 4000, to: Infinity };
        }
        break;
      case "scooterMoped":
        switch (option) {
          case "<49 cm3":
            return { from: 0, to: 49 };
          case "50 - 125 cm3":
            return { from: 50, to: 124 };
          case "125 - 250 cm3":
            return { from: 125, to: 249 };
          case ">250 cm3":
            return { from: 250, to: Infinity };
        }
        break;
      case "standardMotorcycle":
        switch (option) {
          case "<500 cm3":
            return { from: 0, to: 499 };
          case "500 - 750 cm3":
            return { from: 500, to: 749 };
          case "750 - 1000 cm3":
            return { from: 750, to: 999 };
          case ">1000 cm3":
            return { from: 1000, to: Infinity };
        }
        break;
      case "motocrossMotorcycle":
        switch (option) {
          case "<125 cm3":
            return { from: 0, to: 124 };
          case "125 - 249 cm3":
            return { from: 125, to: 249 };
          case "250 - 449 cm3":
            return { from: 250, to: 449 };
          case ">450 cm3":
            return { from: 450, to: Infinity };
        }
        break;
      case "touringMotorcycle":
        switch (option) {
          case "<800 cm3":
            return { from: 0, to: 799 };
          case "800 - 1199 cm3":
            return { from: 800, to: 1199 };
          case "1200 - 1599 cm3":
            return { from: 1200, to: 1599 };
          case ">1600 cm3":
            return { from: 1600, to: Infinity };
        }
        break;
      case "sportsMotorcycle":
        switch (option) {
          case "<600 cm3":
            return { from: 0, to: 599 };
          case "600 - 1000 cm3":
            return { from: 600, to: 999 };
          case ">1000 cm3":
            return { from: 1000, to: Infinity };
        }
        break;
      case "chopper":
        switch (option) {
          case "<800 cm3":
            return { from: 0, to: 799 };
          case "800 - 1199 cm3":
            return { from: 800, to: 1199 };
          case ">1200 cm3":
            return { from: 1200, to: Infinity };
        }
        break;
      case "enduro":
        switch (option) {
          case "<250 cm3":
            return { from: 0, to: 249 };
          case "250 - 649 cm3":
            return { from: 250, to: 649 };
          case "650 - 1200 cm3":
            return { from: 650, to: 1199 };
          case ">1200 cm3":
            return { from: 1200, to: Infinity };
        }
        break;
      case "quadBike":
        switch (option) {
          case "<400 cm3":
            return { from: 0, to: 399 };
          case "400 - 799 cm3":
            return { from: 400, to: 799 };
          case "800 - 1200 cm3":
            return { from: 800, to: 1199 };
          case ">1200 cm3":
            return { from: 1200, to: Infinity };
        }
        break;
      case "motorcycleEngine":
        switch (option) {
          case "<45 cm3":
            return { from: 0, to: 44 };
          case "45 - 249 cm3":
            return { from: 45, to: 249 };
          case "250 - 450 cm3":
            return { from: 250, to: 449 };
          case "450 - 600 cm3":
            return { from: 450, to: 599 };
          case "600 - 1000 cm3":
            return { from: 600, to: 999 };
          case "1000 - 1200 cm3":
            return { from: 1000, to: 1199 };
          case "1200 - 1600 cm3":
            return { from: 1200, to: 1599 };
          case ">1600 cm3":
            return { from: 1600, to: Infinity };
        }
        break;
      case "smallGardenTractor":
        if (option === "<79 cm") {
          return { from: 0, to: 79 };
        }
        break;
      case "averageGardenTractor":
        if (option === "80 - 119 cm") {
          return { from: 80, to: 119 };
        }
        break;
      case "bigGardenTractor":
        if (option === ">120 cm") {
          return { from: 120, to: Infinity };
        }
        break;
      default:
        return null;
    }
  }

  return null;
};
