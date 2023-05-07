import { ethers } from "ethers";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { m } from "../plugins/magic";

type WalletContextProps = {
  currentWalletAddress: string;
  initMagicWallet: (email: string, address: string) => void;
  disconnect: () => void;
  isWalletConnected: boolean;
  email: string;
  setSigner: Function;
  signer: any;
  provider: any;
  setProvider: Function;
  magicBalance: number;
  balance: number;
  getConnectedWalletMetamask: () => void;
};

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletContext = createContext({} as WalletContextProps);

const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");
  const [email, setEmail] = useState<string>("");
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [magicBalance, setMagicBalance] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [walletType, setWalletType] = useState<
    "Magic" | "Metamask" | undefined
  >();

  const initMagicWallet = async (email: string, address: string) => {
    setWalletType("Magic");
    setEmail(email);
    setIsWalletConnected(true);
    setCurrentWalletAddress(address);
  };

  const disconnect = async () => {
    if (walletType === "Magic") {
      m.user.logout();
    }
    setIsWalletConnected(false);
    setCurrentWalletAddress("");
    setEmail("");
    setWalletType(undefined);
  };

  const getbalanceMagic = async () => {
    if (provider) {
      const balance = await provider.getBalance(currentWalletAddress);
      const balanceInEth = ethers.utils.formatEther(balance);
      setMagicBalance(Number(balanceInEth));
    }
  };

  const connect = (address: string) => {
    setCurrentWalletAddress(address);
    setIsWalletConnected(true);
  };

  const getConnectedWalletMetamask = async () => {
    const prov = window.ethereum;
    if (prov !== undefined) {
      const provider = new ethers.providers.Web3Provider(prov);
      setProvider(provider);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      setWalletType("Metamask");
      signer.getAddress().then((address) => {
        connect(address);
        provider
          .getBalance(address)
          .then((balance) =>
            setBalance(parseFloat(ethers.utils.formatEther(balance)))
          );
      });
    }
  };

  useEffect(() => {
    getConnectedWalletMetamask();
  }, []);

  useEffect(() => {
    getbalanceMagic();
  }, [isWalletConnected, signer]);

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        currentWalletAddress,
        initMagicWallet,
        disconnect,
        email,
        setSigner,
        signer,
        provider,
        setProvider,
        magicBalance,
        balance,
        getConnectedWalletMetamask,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
