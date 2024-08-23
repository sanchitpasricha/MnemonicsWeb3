import { useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Buffer } from "buffer";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

import "./App.css";

window.Buffer = Buffer;

interface Key {
  publicKey: string;
}

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [count, setCount] = useState(0);
  const [keys, setKeys] = useState<Key[]>([]);

  const path = `m/44'/501'/${count}'/0'`;

  const generateRandomMnemonic = () => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
    console.log("Generated Mnemonic:", mnemonic);
  };

  const generatewallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const derivedSeed = nacl.hash(Buffer.concat([seed, Buffer.from(path)]));
    const secret = nacl.sign.keyPair.fromSeed(
      derivedSeed.slice(0, 32)
    ).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    console.log(publicKey);
    setCount(count + 1);
    setKeys((prevKeys) => [...prevKeys, { publicKey }]);
  };

  useEffect(() => {
    generateRandomMnemonic();
  }, []);

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full flex flex-col justify-center p-12">
        <span className="text-2xl text-white font-bold my-6">
          Here is your Mnemonic Phrase if you wish to enter your own clear the
          input else leave untouched.
        </span>
        <div>
          <input
            type="text"
            onChange={(e) => setMnemonic(e.target.value)}
            value={mnemonic}
            className="w-4/5 rounded-lg p-2 border text-white font-bold border-gray-800 focus:outline-none bg-gray-700"
          />
          <button
            onClick={() => {
              setMnemonic("");
              setKeys([]);
              setCount(0);
            }}
            className="bg-blue-900 p-2 rounded-md text-white font-bold mx-6"
          >
            Clear
          </button>
          <button
            onClick={generatewallet}
            className="bg-blue-900 p-2 rounded-md text-white font-bold"
          >
            Generate Wallet
          </button>
        </div>
        {keys.map((key, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-lg shadow-lg p-6 mt-8 w-4/5"
          >
            <h2 className="text-xl text-white font-bold mb-4">
              Solana Wallet Public Key {index + 1}
            </h2>
            <p className="text-white break-all">{key.publicKey}</p>
          </div>
        ))}
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
