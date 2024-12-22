import { useWeb3Modal } from "@web3modal/wagmi/react";

const ConnectWallet = () => {
	const { open } = useWeb3Modal();

	return (
		<div>
			<button
				onClick={() => open()}
				className='w-full rounded bg-blue-500 px-4 py-2 transition hover:bg-blue-600'
			>
				Connect Wallet
			</button>
		</div>
	);
};

export default ConnectWallet;
