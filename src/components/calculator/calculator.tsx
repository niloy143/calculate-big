import { useState, useRef, LegacyRef } from "react";
import calculate from "ultra-calc";
import { FaBackspace } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import buttons, {
  CLEAR,
  DIVIDE,
  EQUAL,
  INTO,
  MINUS,
  PLUS,
  POINT,
  RESET,
} from "../../utils/buttons";

const symbol: { [key: string]: React.ReactNode } = {
  [MINUS]: "−",
  [INTO]: "×",
  [DIVIDE]: "÷",
  [CLEAR]: <FaBackspace />,
  [RESET]: <RxReset />,
};

const getResult = (input: string) => {
  try {
    let newInput = "";
    for (const x of input) {
      switch (x) {
        case symbol[DIVIDE]:
          newInput += DIVIDE;
          break;
        case symbol[INTO]:
          newInput += INTO;
          break;
        case symbol[PLUS]:
          newInput += PLUS;
          break;
        case symbol[MINUS]:
          newInput += MINUS;
          break;
        default:
          newInput += x;
      }
    }
    return calculate(newInput);
  } catch (e) {
    return "Invalid Syntax";
  }
};

export default function Calculator() {
  const [result, setResult] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-full h-full max-w-[600px] max-h-[900px] bg-gray-500 flex flex-col">
        <div className="flex-grow overflow-auto">
          <p className="text-xl p-5 break-words">{result || "0"}</p>
        </div>
        <div>
          <input
            ref={inputRef as LegacyRef<HTMLInputElement>}
            className="w-full bg-white/80 text-gray-700 p-3 text-xl focus:outline-none"
            type="text"
            placeholder="0"
            onFocus={(e) => setResult(getResult(e.target.value))}
            onChange={(e) => setResult(getResult(e.target.value))}
          />
        </div>
        <div>
          {buttons.map((row, i) => {
            return (
              <div key={`${i}`} className="flex">
                {row.map((btn, j) => {
                  return (
                    <button
                      key={`${i}${j}`}
                      className="w-full bg-slate-800 p-3 flex items-center justify-center text-3xl active:scale-90 border border-gray-500 active:rounded-lg transition"
                      onClick={() => {
                        const inputEl = inputRef.current;

                        if (inputEl) {
                          const input = inputEl.value;

                          let start = inputEl.selectionStart;
                          let end = inputEl.selectionEnd;

                          if (start === null) start = input.length;
                          if (end === null) end = input.length;

                          let prev = input.slice(0, start);
                          let curr = input.slice(start, end);
                          let next = input.slice(end, input.length);

                          switch (btn) {
                            case RESET:
                              prev = "";
                              curr = "";
                              next = "";
                              break;
                            case CLEAR:
                              if (curr) curr = "";
                              else {
                                start--;
                                if (start >= 0) prev = input.slice(0, start);
                                else start = 0;
                              }
                              break;
                            case EQUAL:
                              setResult(getResult(input));
                              break;
                            case POINT:
                              if (!input.includes(POINT)) curr = POINT;
                              break;
                            default:
                              curr = (symbol[btn] || btn) as string;
                          }

                          inputEl.value = prev + curr + next;
                          const position = start + curr.length;

                          inputEl.selectionStart = position;
                          inputEl.selectionEnd = position;
                          inputEl.focus();
                        }
                      }}
                    >
                      {symbol[btn] || btn}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
