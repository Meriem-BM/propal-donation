import { useEffect, useState } from "react";
import Web3 from "web3";
import DonationPlatformABI from "@/Donations.json";

const SMART_WALLET_ADDRESS = "0x9ff27C8408a3F9f987f9A372665F3e73a4d2bDfb";

const useDonation = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<any>(null);
  const [donors, setDonors] = useState<
    { donorAddress: string; amount: string }[]
  >([]);
  const [totalDonations, setTotalDonations] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_URL);
      const donationContract = new web3.eth.Contract(
        DonationPlatformABI.abi as any,
        SMART_WALLET_ADDRESS
      );
      setContract(donationContract);

      const donations = (await donationContract.methods.getDonors().call()) as {
        donorAddress: string;
        amount: string;
      }[];

      const totalDonations = (await donationContract.methods
        .getTotalDonations()
        .call()) as string;

      setDonors(donations);
      setTotalDonations(Web3.utils.fromWei(totalDonations, "ether"));
    };

    loadBlockchainData();
  }, []);

  const donate = async (amount: string) => {
    await contract.methods.donate().send({
      from: account,
      value: Web3.utils.toWei(amount, "ether"),
    });
    window.location.reload();
  };

  return {
    account,
    setAccount,
    donors,
    totalDonations,
    donate,
  };
};

export default useDonation;
