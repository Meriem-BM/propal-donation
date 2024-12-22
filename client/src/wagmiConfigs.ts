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

export const projectId = "275cb569b0d41a83cb3e9ebc1250cb68";

export const metadata = {
	name: "Pro Palestinian Donation",
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
