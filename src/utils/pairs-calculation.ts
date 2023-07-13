export function calculateWTC(diff: number) {
  if (diff >= 6 && diff <= 10) {
    return [11, 9];
  }
  if (diff >= 11 && diff <= 15) {
    return [12, 8];
  }
  if (diff >= 16 && diff <= 20) {
    return [13, 7];
  }
  if (diff >= 21 && diff <= 25) {
    return [14, 6];
  }
  if (diff >= 26 && diff <= 30) {
    return [15, 5];
  }
  if (diff >= 31 && diff <= 35) {
    return [16, 4];
  }
  if (diff >= 36 && diff <= 40) {
    return [17, 3];
  }
  if (diff >= 41 && diff <= 45) {
    return [18, 2];
  }
  if (diff >= 46 && diff <= 50) {
    return [19, 1];
  }
  if (diff >= 51) {
    return [20, 0];
  } else return [0, 0];
}

export function calculateELO(to: number, rating1: number, rating2: number) {
  const ELO_K = 100;
  const Ea = 1 / (1 + 10 ** ((rating2 - rating1) / 400));
  const Sa = to / 20;
  return +(rating1 + ELO_K * (Sa - Ea)).toFixed(1);
}
