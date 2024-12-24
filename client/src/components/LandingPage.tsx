"use client";

import Image from "next/image";
import useDonation from "@/hooks/useDonation";
import DonationForm from "@/components/DonationForm";
import TransactionCard from "@/components/TxCard";
import Spinner from "@/components/Spinner";

const NoDonations = () => (
  <div className="w-full bg-black mx-auto p-12 text-white text-center border border-gray-800 rounded-lg mt-12">
    <p className="text-2xl font-bold mb-6">No donations yet</p>
    <div className="flex justify-center items-center mt-12">
      <Image
        src="/images/empty-box.png"
        alt="ethereum"
        width={90}
        height={90}
      />
    </div>
  </div>
);

const LandingPage = ({
  children,
}: Readonly<{ children?: React.ReactNode }>) => {
  const { totalDonations, donors, fetching, submitting, donate } =
    useDonation();

  return (
    <>
      <DonationForm
        totalDonations={totalDonations}
        fetching={fetching}
        submitting={submitting}
        donate={donate}
      />
      {children}
      <section className="p-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Recent Donations
        </h2>
        {donors?.length === 0 ? (
          <NoDonations />
        ) : fetching ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {donors.map((donor, index) => (
              <TransactionCard key={index} donor={donor} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default LandingPage;
