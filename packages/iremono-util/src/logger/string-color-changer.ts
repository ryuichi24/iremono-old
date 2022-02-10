const RED = '\u001b[31m';
const BLUE = '\u001b[34m';
const GREEN = '\u001b[32m';
const YELLOW = '\u001b[33m';
const MAGENTA = '\u001b[35m';
const CYAN = '\u001b[36m';
const DARK_GRAY = '\u001b[38;5;8m';
const RESET = '\u001b[0m';

const ANSIColorCodes = Object.freeze({
  RED,
  BLUE,
  GREEN,
  YELLOW,
  MAGENTA,
  CYAN,
  RESET,
  DARK_GRAY,
});

const toRED = (message: string) => {
  return `${ANSIColorCodes.RED}${message}${ANSIColorCodes.RESET}`;
};

const toBLUE = (message: string) => {
  return `${ANSIColorCodes.BLUE}${message}${ANSIColorCodes.RESET}`;
};

const toGREEN = (message: string) => {
  return `${ANSIColorCodes.GREEN}${message}${ANSIColorCodes.RESET}`;
};

const toYELLOW = (message: string) => {
  return `${ANSIColorCodes.YELLOW}${message}${ANSIColorCodes.RESET}`;
};

const toMAGENTA = (message: string) => {
  return `${ANSIColorCodes.MAGENTA}${message}${ANSIColorCodes.RESET}`;
};

const toCYAN = (message: string) => {
  return `${ANSIColorCodes.CYAN}${message}${ANSIColorCodes.RESET}`;
};

const toDARK_GRAY = (message: string) => {
  return `${ANSIColorCodes.DARK_GRAY}${message}${ANSIColorCodes.RESET}`;
};

export const stringColorChanger = Object.freeze({
  toRED,
  toBLUE,
  toGREEN,
  toYELLOW,
  toMAGENTA,
  toCYAN,
  toDARK_GRAY,
});
