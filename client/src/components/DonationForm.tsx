import { useState } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "./ConnectWallet";

interface DonationFormProps {
  totalDonations: string;
  donate: (amount: string) => void;
}

const DonationForm = ({
  totalDonations,
  donate,
}: DonationFormProps) => {
  const { isConnected, address } = useAccount();

  const [donationAmount, setDonationAmount] = useState("");

  return (
    <section className="bg-gray-900 p-12 text-center">
      <h2 className="text-3xl font-bold mb-6 text-white">Make a Donation</h2>
      {!isConnected ? (
        <ConnectWallet />
      ) : (
        <>
          <p>Your account: {address}</p>
          <p className="text-lg mb-6 text-gray-400">
            Total Donations: {totalDonations} ETH
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              donate(donationAmount);
            }}
            className="flex justify-center gap-4"
          >
            <input
              type="text"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Amount in ETH"
              className="w-64 p-2 border rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Donate
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default DonationForm;
