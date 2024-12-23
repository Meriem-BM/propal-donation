import { cookieStorage, createConfig, createStorage } from "wagmi";
import { createClient, http } from "viem";
import {
  // arbitrum,
  // base,
  // gnosis,
  // mainnet,
  // optimism,
  // polygon,
  sepolia,
} from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;

export const metadata = {
  name: "ProPal",
  description: "Donate to the Palestinian cause",
  url: "",
  icons: [],
};

export const wagmiConfig = createConfig({
  chains: [sepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});
