import { useState } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "./ConnectWallet";
import type { Address } from "@/types";
import Image from "next/image";
import Spinner from "./Spinner";
import { copyToClipboard } from "@/utils/helpers";
interface DonationFormProps {
  totalDonations: string;
  fetching: boolean;
  submitting: boolean;
  donate: (address: Address, amount: string, keyword: string) => void;
}

const DonationForm = ({
  totalDonations,
  fetching,
  submitting,
  donate,
}: DonationFormProps) => {
  const { isConnected, address } = useAccount();

  const [donationAmount, setDonationAmount] = useState("");
  const [keyword, setKeyword] = useState("");

  return (
    <section className="sm:p-12 p-2 text-center sm:mx-8 mx-4 my-4 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-16 text-white">Make a Donation</h2>
      {!isConnected ? (
        <ConnectWallet />
      ) : (
        <>
          <p>Your are connected with address:</p>
          {fetching ? (
            <Spinner size={16} />
          ) : address ? (
            <p className="flex text-lg font-semibold text-white mb-6 justify-center gap-2 items-center">
              {address.substring(0, 6)}...{address.slice(-4)}
              <button
                className="cursor-pointer hover:opacity-70"
                onClick={() => copyToClipboard(address)}
              >
                <Image
                  src="/icons/copy.svg"
                  alt="copy"
                  width={20}
                  height={20}
                />
              </button>
            </p>
          ) : (
            "No address found"
          )}
          <p className="flex text-lg mb-6 text-gray-400 justify-center gap-2 items-center">
            <span className="flex text-gray-300 justify-center gap-2 items-center">
              Total Donations:{" "}
              {fetching ? <Spinner size={16} /> : totalDonations}{" "}
            </span>{" "}
            <Image
              src="/icons/tokens/ethereum-eth.svg"
              alt="ethereum"
              width={20}
              height={20}
            />{" "}
            ETH
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              donate(address, donationAmount, keyword);
            }}
            className="bg-black md:w-1/2 lg:w-1/3 xl:w-1/4 w-full mx-auto p-10 rounded-lg shadow-lg flex flex-col gap-4 items-center"
          >
            <input
              type="text"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Amount in ETH"
              className="w-full p-2 border rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword"
              className="w-full p-2 border rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md mt-6 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={!donationAmount || !keyword}
            >
              {submitting ? "Processing..." : "Donate"}
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default DonationForm;
