import { Coins, HistoryYield, TokenName } from "../types/swap.types";

import axios from "axios";

export const getPrices = async (): Promise<Coins> => {
  const usdcPrice = await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd"
    )
    .then((response) => {
      return response.data["usd-coin"].usd;
    })
    .catch((err) => {
      throw new Error(err);
    });

  const ethPrice = await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
    .then((response) => {
      return response.data.ethereum.usd;
    })
    .catch((err) => {
      throw new Error(err);
    });

  const btcPrice = await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    )
    .then((response) => {
      return response.data.bitcoin.usd;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return {
    USDC: usdcPrice,
    DAI: 1,
    USDFI: usdcPrice,
    ETH: ethPrice,
    BTC: btcPrice,
    ETHFI: ethPrice,
    BTCFI: btcPrice,
  };
};

export const getReceiveAmount = (
  depositAmount: bigint,
  fee: number | undefined,
  decimalIn: number | undefined,
  decimalOut: number | undefined
): bigint | undefined => {
  try {
    const percentageFactor = 10 ** 4;
    if (fee && decimalOut && decimalIn) {
      return (
        (depositAmount *
          BigInt((1 - fee) * percentageFactor) *
          BigInt(10 ** decimalOut)) /
        (BigInt(percentageFactor) * BigInt(10 ** decimalIn))
      );
    }
  } catch (error) {
    throw new Error("Error : " + error);
  }
};

export const getHistoryYieldArray = (
  historyYieldArray: HistoryYield[],
  tokenName: TokenName
) => {
  const historyYieldArrayAsset = historyYieldArray.map(
    (historyYiel: HistoryYield) => {
      const { day, amountUSDFI, amountETHFI, amountBTCFI, id } = historyYiel;
      return {
        id,
        day,
        amount:
          tokenName === "USDFI"
            ? amountUSDFI
            : tokenName === "ETHFI"
            ? amountETHFI
            : amountBTCFI,
      };
    }
  );

  return historyYieldArrayAsset;
};
