import React, { useState } from 'react';
import './CoinFlip.css';
import { useStateContext } from '../context/index.jsx';
import { ConnectWallet } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

function CoinFlip() {
  const { flipCoin, address, connect } = useStateContext();
  const [outcome, setOutcome] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [betAmount, setBetAmount] = useState(''); // New state for bet amount

  const getRandomNumber = () => Math.floor(Math.random() * 2) + 1;

  if (!address) {
    return (
        <div className="connect-wallet">
          <ConnectWallet />
        </div>
    );
  }
  const handleCoinFlip = async () => {

    if (!betAmount) {
      alert("Please enter a bet amount.");
      return;
    }

    setIsFlipping(true);
    setOutcome('');

    setTimeout(async () => {
      const randomNumber = getRandomNumber();
      setOutcome(randomNumber === 1 ? 'heads' : 'tails');
      const guess = randomNumber === 1;

      try {
        const betAmountInWei = ethers.utils.parseEther(betAmount); // Convert bet amount to wei
        // console.log(betAmountInWei.toString())
        // return;
        await flipCoin(guess, betAmountInWei); // Call flipCoin with guess and bet amount
        console.log("Flip coin transaction successful!");
      } catch (error) {
        console.log("Flip coin transaction failed!", error);
      }

      setIsFlipping(false);
    }, 800);
  };

  return (
    <div className="coin-flip">
      <div className={`outcome ${isFlipping ? 'flip toss' : ''}`}>
        {outcome}
      </div>
      <input
        type="text"
        placeholder="Enter bet amount in ETH"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
      />
      <button onClick={handleCoinFlip} style={{ fontFamily: "'Comfortaa', cursive" }}>
        Flip Coin
      </button>
    </div>
  );
}

export default CoinFlip;
