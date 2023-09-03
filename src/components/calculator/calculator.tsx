import { useState } from "react";

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

export default function Calculator() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

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
              setResult(e.target.value);
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
