"use client";

import useDonation from "@/hooks/useDonation";
import DonationForm from "@/components/DonationForm";
import TransactionCard from "@/components/TxCard";

const LandingPage = ({
  children,
}: Readonly<{ children?: React.ReactNode }>) => {
  const { totalDonations, donors, fetching, donate } = useDonation();

  return (
    <>
      <DonationForm totalDonations={totalDonations} donate={donate} />
      {children}
      <section className="p-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Recent Donations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {donors?.length === 0 ? (
            <p className="text-white text-center">No donations yet</p>
          ) : fetching ? (
            <p className="text-white text-center">Loading...</p>
          ) : (
            donors.map((donor, index) => (
              <TransactionCard key={index} donor={donor} index={index} />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
