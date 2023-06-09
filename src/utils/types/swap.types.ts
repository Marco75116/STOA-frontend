import React from "react";

export type Coins = {
  USDC: number;
  DAI: number;
  USDFI: number;
  ETH: number;
  BTC: number;
  ETHFI: number;
  BTCFI: number;
};

export type BalanceCoins = {
  USDC: bigint;
  DAI: bigint;
  USDFI: bigint;
  ETH: bigint;
  BTC: bigint;
  ETHFI: bigint;
  BTCFI: bigint;
};

export type CoinsString = {
  USDC: string;
  DAI: string;
  ETH: string;
  BTC: string;
  USDFI: string;
  ETHFI: string;
  BTCFI: string;
};

export type Token = {
  name: TokenSelected;
  svgLogo: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};

export type HistoryYield = {
  id: number;
  day: string;
  amountUSDFI: number;
  amountBTCFI: number;
  amountETHFI: number;
};

export type HistoryYiedAsset = {
  id: number;
  day: string;
  amount: number;
};

export type TokenName = "USDFI" | "ETHFI" | "BTCFI";

export type TokenSelected =
  | "USDC"
  | "DAI"
  | "COFI"
  | "ETH"
  | "BTC"
  | "USDFI"
  | "ETHFI"
  | "BTCFI";

export type FITokens = {
  USDFI: number;
  ETHFI: number;
  BTCFI: number;
};
