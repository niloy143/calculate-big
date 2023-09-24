const ZERO = "0";
const ONE = "1";
const TWO = "2";
const THREE = "3";
const FOUR = "4";
const FIVE = "5";
const SIX = "6";
const SEVEN = "7";
const EIGHT = "8";
const NINE = "9";
const POINT = ".";
const EQUAL = "=";
const PLUS = "+";
const MINUS = "-";
const INTO = "*";
const DIVIDE = "/";
const CLEAR = "CLEAR";
const RESET = "RESET";
const BRACE_1st = "(";
const BRACE_2nd = ")";

const buttons = [
    [BRACE_1st /**/, BRACE_2nd /**/, RESET /**/, CLEAR],
    [SEVEN /******/, EIGHT /******/, NINE /***/, DIVIDE],
    [FOUR /*******/, FIVE /*******/, SIX /****/, INTO],
    [ONE /********/, TWO /********/, THREE /**/, MINUS],
    [POINT /******/, ZERO /*******/, EQUAL /**/, PLUS],
];

export {
    ZERO,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    POINT,
    EQUAL,
    PLUS,
    MINUS,
    INTO,
    DIVIDE,
    CLEAR,
    RESET,
    BRACE_1st,
    BRACE_2nd,
}

export default buttons;