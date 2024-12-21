import { useEffect, useState } from "react";
import Web3 from "web3";
import DonationPlatformABI from "@/Donations.json";

const useDonation = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<any>(null);
  const [donors, setDonors] = useState<
    { donorAddress: string; amount: string }[]
  >([]);
  const [totalDonations, setTotalDonations] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3("http://127.0.0.1:8545/");
      const donationContract = new web3.eth.Contract(
        DonationPlatformABI.abi as any,
        "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
      );
      setContract(donationContract);

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

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
    donors,
    totalDonations,
    donate,
  };
};

export default useDonation;
