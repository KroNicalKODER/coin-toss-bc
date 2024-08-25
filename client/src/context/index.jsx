import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xAd13Ea1Ee4aB36dB0098c339c010928D183aCab8"
  );
  const { mutateAsync: flipCoin } = useContractWrite(contract, "flipCoin");
  const address = useAddress();
  const connect = useMetamask();

  const flipCoinFunction = async (guess, bet) => {
    try {
      // Ensure that guess is a boolean
      const data = await flipCoin({ args: [guess], overrides: { value: bet, gasLimit: 1000000 } });
      console.log("Call success", data);
    } catch (error) {
      console.log("Call failed", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        flipCoin: flipCoinFunction,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
