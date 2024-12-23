import { useWeb3Modal } from "@web3modal/wagmi/react";

const ConnectWallet = () => {
	const { open } = useWeb3Modal();

	return (
		<div className="flex justify-center items-center gap-4">
			<button
				onClick={() => open()}
				className='w-fit rounded bg-blue-500 px-4 py-2 transition hover:bg-blue-600'
			>
				Connect Wallet
			</button>
		</div>
	);
};

export default ConnectWallet;
