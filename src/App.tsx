/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import { Buffer } from "buffer";
import "./App.css";

window.Buffer = Buffer;

function App() {
  const [mnemonic, setMnemonic] = useState("");

  const generateRandomMnemonic = () => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
    console.log("Generated Mnemonic:", mnemonic);
  };
  useEffect(() => {
    generateRandomMnemonic();
  }, []);

  return (
    <div className="bg-gray-800 w-full h-screen">
      <Navbar />
      <div className="w-full flex flex-col justify-center p-12">
        <span className="text-2xl text-white font-bold my-6">
          Here is your Mnemonic Phrase if you wish to enter your own clear the
          input else leave untouched.
        </span>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setMnemonic(e.target.value);
            }}
            value={mnemonic}
            className="w-4/5 rounded-lg p-2 border text-white font-bold border-gray-800 focus:outline-none bg-gray-700"
          />
          <button
            onClick={() => {
              setMnemonic("");
            }}
            className="bg-blue-900 p-2 rounded-md text-white font-bold mx-6"
          >
            Clear
          </button>
          <button
            onClick={() => {}}
            className="bg-blue-900 p-2 rounded-md text-white font-bold "
          >
            Generate Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-gray-900">
      <div className="text-white p-6 font-bold">CIPHER WALLET</div>
    </nav>
  );
}

export default App;
