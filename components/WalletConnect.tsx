'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletConnect() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="px-6 py-2 bg-oil-white text-oil-black font-mono text-sm font-bold hover:bg-oil-gray hover:text-oil-white transition-colors"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="px-6 py-2 bg-red-600 text-white font-mono text-sm font-bold"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="flex gap-2">
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="px-4 py-2 bg-oil-gray text-oil-white font-mono text-xs border border-oil-white/20"
                    >
                      {chain.name}
                    </button>
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="px-4 py-2 bg-oil-white text-oil-black font-mono text-xs font-bold hover:bg-oil-gray hover:text-oil-white transition-colors"
                    >
                      {account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

