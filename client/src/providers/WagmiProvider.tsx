"use client";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig, projectId, metadata } from "@/wagmiConfigs";

if (!projectId) {
  throw new Error("Missing WALLET_CONNECT_ID");
}

createWeb3Modal({
  wagmiConfig,
  projectId,
  metadata,
  themeMode: "light",
  allowUnsupportedChain: false,
  enableAnalytics: true,
});

export default function WagmiWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
}
