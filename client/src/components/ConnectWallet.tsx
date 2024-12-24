import { useWeb3Modal } from "@web3modal/wagmi/react";

const ConnectWallet = () => {
	const { open } = useWeb3Modal();

	return (
		<div className="flex justify-center items-center gap-4">
			<button
				onClick={() => open()}
				className='w-fit rounded bg-primary px-4 py-2 transition hover:bg-secondary text-white'
			>
				Connect Wallet
			</button>
		</div>
	);
};

export default ConnectWallet;
