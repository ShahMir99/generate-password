import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";

const App = () => {
  // General States
  const [Password, setPassword] = useState<string>("Password Will Be Here !");
  const [PasswordRange, setPasswordRange] = useState<number>(4);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // functional States
  const [isUppercase, setIsUppercase] = useState<boolean>(true);
  const [isLowercase, setIsLowercase] = useState<boolean>(true);
  const [isNumber, setIsNumber] = useState<boolean>(false);
  const [isSymbols, setIsSymbols] = useState<boolean>(false);

  // constant to disble button is there is not any input is checked
  const IsDisabled = isUppercase || isLowercase || isNumber || isSymbols;

  // function for copying generated password
  const Copyhandler = () => {
    window.navigator.clipboard.writeText(Password);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  // function to generate password
  const GeneratePassword = () => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characters = "";

    if (isUppercase) {
      characters += uppercaseLetters;
    }
    if (isLowercase) {
      characters += lowercaseLetters;
    }
    if (isNumber) {
      characters += numbers;
    }
    if (isSymbols) {
      characters += symbols;
    }

    let password: string = "";

    for (let i = 0; i < PasswordRange; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    setPassword(password);
  };

  // Function to determine the strength of the password
  const determineStrength = () => {
    let strength = -1;

    if (isUppercase) strength++;
    if (isLowercase) strength++;
    if (isNumber) strength++;
    if (isSymbols) strength++;

    if (PasswordRange >= 10) strength++;
    return strength;
  };

  const strength  = determineStrength()
  const boxColors = Array(4).fill('bg-gray-300');

  for (let i = 0; i < strength; i++) {
    boxColors[i] = 'bg-yellow-400';
  }

  console.log(strength)

  return (
    <div
      className="w-full h-screen flex-justify-center bg-blue-100/50 font-poppins
       flex-col gap-10 text-3xl font-semibold"
    >
      <h1 className="text-zinc-900 text-3xl">
        <span className="text-[#0075ff]">Random</span> Password Generatorr
      </h1>
      <div className="w-96 flex flex-col gap-3">
        <div className="flex-justify-between bg-white p-5 shadow-card rounded-md">
          <p className="text-large">{Password}</p>
          {isCopied ? (
            <IoCheckmarkDone
              className="w-7 h-7 text-blue-500 cursor-pointer"
              onClick={Copyhandler}
            />
          ) : (
            <IoCopyOutline
              className="w-6 h-6 text-neutral-700 cursor-pointer"
              onClick={Copyhandler}
            />
          )}
        </div>

        <div className="bg-white p-5 flex flex-col items-center gap-3 shadow-card rounded-md">
          <div className="w-full flex items-center justify-between">
            <p className="text-medium">Character Length</p>
            <span className="text-lg font-semibold text-[#0075ff]">
              {PasswordRange}
            </span>
          </div>
          <input
            className="w-full h-2"
            type="range"
            value={PasswordRange}
            min="4"
            max="16"
            onChange={(e) => setPasswordRange(Number(e.target.value))}
          />
          <div className="flex-justify-start gap-3 mt-2">
            <input
              type="checkbox"
              className="size-4"
              checked={isUppercase}
              onChange={(e) => setIsUppercase(e.target.checked)}
            />
            <p className="text-small">Include Uppercase Letter</p>
          </div>
          <div className="flex-justify-start gap-3">
            <input
              type="checkbox"
              className="size-4"
              checked={isLowercase}
              onChange={(e) => setIsLowercase(e.target.checked)}
            />
            <p className="text-small">Include Lowercase Letter</p>
          </div>
          <div className="flex-justify-start gap-3">
            <input
              type="checkbox"
              className="size-4"
              checked={isNumber}
              onChange={(e) => setIsNumber(e.target.checked)}
            />
            <p className="text-small">Include Numbers</p>
          </div>
          <div className="flex-justify-start gap-3">
            <input
              type="checkbox"
              className="size-4"
              checked={isSymbols}
              onChange={(e) => setIsSymbols(e.target.checked)}
            />
            <p className="text-small">Include Symbols</p>
          </div>

          <div className="w-full bg-blue-100/50 p-3 mt-3 flex-justify-between rounded-md">
            <p className="text-base text-neutral-500 font-semibold flex-1">
              Strength
            </p>
            <div className="flex items-center gap-1">
              <p className="text-base text-neutral-800 mr-3">{strength >= 4 ? "Strong" : strength >= 2 ? "Medium" : "Weak"}</p>
              <span className={`span-box ${boxColors[0]} w-6 h-6 rounded-md`}></span>
              <span className={`span-box ${boxColors[1]} w-6 h-6 rounded-md`}></span>
              <span className={`span-box ${boxColors[2]} w-6 h-6 rounded-md`}></span>
              <span className={`span-box ${boxColors[3]} w-6 h-6 rounded-md`}></span>
            </div>
          </div>
          <button
            className="w-full p-2 text-base text-white font-medium tracking-wider bg-blue-500 hover:bg-blue-500/80 rounded-md disabled:bg-blue-500/40 disabled:cursor-not-allowed"
            onClick={GeneratePassword}
            disabled={!IsDisabled}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
