"use client";

import Web3 from "web3";
import useDonation from "@/hooks/useDonation";
import FeaturesSection from "@/components/Sections/FeaturesSection";
import Header from "@/components/Sections/Header";
import DonationForm from "@/components/DonationForm";

const App = () => {
  const { account, totalDonations, donors, donate } = useDonation();

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans">
      <Header />
      <DonationForm
        account={account}
        totalDonations={totalDonations}
        donate={donate}
      />
      <FeaturesSection />

      <section className="p-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Recent Donations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {donors.map((donor, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700"
            >
              <p className="text-lg font-semibold text-white">
                {donor.donorAddress.substring(0, 6)}...
                {donor.donorAddress.slice(-4)}
              </p>
              <p className="text-gray-400">
                <span className="font-bold text-gray-300">Amount:</span>{" "}
                {Web3.utils.fromWei(donor.amount, "ether")} ETH
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
