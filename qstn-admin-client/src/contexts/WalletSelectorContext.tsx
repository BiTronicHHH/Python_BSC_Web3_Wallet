import type { AccountState, WalletSelector } from "@near-wallet-selector/core";
import { CONTRACT_ID, NFT_CONTRACT_ID } from "./constants";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { distinctUntilChanged, map } from "rxjs";

import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupWalletSelector } from "@near-wallet-selector/core";

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);
//@ts-ignore
export const WalletSelectorContextProvider: React.FC = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: "mainnet",
      debug: true,
      modules: [...(await setupDefaultWallets()), setupNearWallet()],
    });
    const _modal = setupModal(_selector, { contractId: NFT_CONTRACT_ID });
    const state = _selector.store.getState();
    setAccounts(state.accounts);

    window.selector = _selector;
    window.modal = _modal;

    setSelector(_selector);
    setModal(_modal);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      alert("Failed to initialise wallet selector");
    });
  }, [init]);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        console.log("Accounts Update", nextAccounts);

        setAccounts(nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [selector]);

  if (!selector || !modal) {
    return null;
  }

  const accountId =
    accounts.find((account) => account.active)?.accountId || null;

  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error(
      "useWalletSelector must be used within a WalletSelectorContextProvider"
    );
  }

  return context;
}
