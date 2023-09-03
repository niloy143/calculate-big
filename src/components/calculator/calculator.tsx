import { useState, useEffect } from "react";
import calculate from "ultra-calc";

const buttons = [
  ["(", ")", "Reset", "Clear"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  [".", "0", "=", "+"],
];

const symbol: { [key: string]: React.ReactNode } = {
  ["0"]: "0",
  ["1"]: "1",
  ["2"]: "2",
  ["3"]: "3",
  ["4"]: "4",
  ["5"]: "5",
  ["6"]: "6",
  ["7"]: "7",
  ["8"]: "8",
  ["9"]: "9",
  ["+"]: "+",
  ["-"]: "−",
  ["*"]: "×",
  ["/"]: "÷",
  ["="]: "=",
  ["."]: ".",
  ["("]: "(",
  [")"]: ")",
  ["Clear"]: <span className="text-xl">Clear</span>,
  ["Reset"]: <span className="text-xl">Reset</span>,
};

const getResult = (input: string) => {
  let newInput = "";
  for (const x of input) {
    switch (x) {
      case symbol["/"]:
        newInput += "/";
        break;
      case symbol["*"]:
        newInput += "*";
        break;
      case symbol["+"]:
        newInput += "+";
        break;
      case symbol["-"]:
        newInput += "-";
        break;
      default:
        newInput += x;
    }
  }
  return calculate(newInput);
};

export default function Calculator() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    try {
      setResult(getResult(input));
    } catch {
      // here goes error
    }
  }, [input]);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div
        className="w-full h-full max-w-[600px] max-h-[900px] bg-gray-500 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          setResult(input || "0");
        }}
      >
        <div className="flex-grow overflow-auto">
          <p className="text-xl p-5 break-words">{result || "0"}</p>
        </div>
        <div>
          <input
            className="w-full bg-white/80 text-gray-700 p-3 text-xl focus:outline-none"
            type="text"
            placeholder="0"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
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
                        switch (btn) {
                          case "Reset":
                            setInput("");
                            break;
                          case "Clear":
                            setInput((input) =>
                              input.slice(0, input.length - 1)
                            );
                            break;
                          case "=":
                            getResult(input);
                            break;
                          case ".":
                            if (!input.includes("."))
                              setInput((input) => input + ".");
                            break;
                          default:
                            setInput((input) => input + symbol[btn]);
                        }
                      }}
                    >
                      {symbol[btn]}
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
