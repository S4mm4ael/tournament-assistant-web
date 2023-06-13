export default function generateID() {
  function getRandomLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  const id = `${getRandomLetter()}${getRandomNumber(99)}${getRandomLetter()}${getRandomNumber(9)}`;

  return `[#${id}]`;
}
