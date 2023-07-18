export function calculateWTC(diffPlayers: number) {
  let isReverse = false;
  let diff = diffPlayers;
  let resultArray = [10, 10];
  if (diff < 0) {
    isReverse = true;
    diff = Math.abs(diffPlayers);
  }
  if (diff <= 5) {
    resultArray = [10, 10];
  }
  if (diff >= 6 && diff <= 10) {
    resultArray = [11, 9];
  }
  if (diff >= 11 && diff <= 15) {
    resultArray = [12, 8];
  }
  if (diff >= 16 && diff <= 20) {
    resultArray = [13, 7];
  }
  if (diff >= 21 && diff <= 25) {
    resultArray = [14, 6];
  }
  if (diff >= 26 && diff <= 30) {
    resultArray = [15, 5];
  }
  if (diff >= 31 && diff <= 35) {
    resultArray = [16, 4];
  }
  if (diff >= 36 && diff <= 40) {
    resultArray = [17, 3];
  }
  if (diff >= 41 && diff <= 45) {
    resultArray = [18, 2];
  }
  if (diff >= 46 && diff <= 50) {
    resultArray = [19, 1];
  }
  if (diff >= 51) {
    resultArray = [20, 0];
  }
  return isReverse ? resultArray.reverse() : resultArray;
}

export function calculateELO(to: number, rating1: number, rating2: number) {
  const ELO_K = 100;
  const Ea = 1 / (1 + 10 ** ((rating2 - rating1) / 400));
  const Sa = to / 20;
  return +(rating1 + ELO_K * (Sa - Ea)).toFixed(1);
}
