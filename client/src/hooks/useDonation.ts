import { useEffect, useState } from "react";
import Web3 from "web3";
import { parseEther } from "viem";
import DonationPlatformABI from "@/Donations.json";
import type { Address } from "@/types";
import { writeContract, sendTransaction, readContract } from "@wagmi/core";
import { wagmiConfig } from "@/wagmiConfigs";

interface TransactionParams {
  to: Address;
  value: string;
}

const SMART_WALLET_ADDRESS = "0x59861EC7670bE025Bd239A5Ae1B8Af32E98dF1F3";

const useDonation = () => {
  const { ethereum } = window;

  const [contract, setContract] = useState<any>(null);
  const [donors, setDonors] = useState<
    { donorAddress: string; amount: string }[]
  >([]);
  const [totalDonations, setTotalDonations] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const web3 = new Web3(ethereum);
        const donationContract = new web3.eth.Contract(
          DonationPlatformABI.abi as any,
          SMART_WALLET_ADDRESS
        );
        setContract(donationContract);

        const donations = (await donationContract.methods
          .getDonors()
          .call()) as {
          donorAddress: string;
          amount: string;
        }[];
        const totalDonations = (await donationContract.methods
          .getTotalDonations()
          .call()) as string;

        setDonors(donations);
        setTotalDonations(Web3.utils.fromWei(totalDonations, "ether"));
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };

    loadBlockchainData();
  }, []);

  const donate = async (address: Address, amount: string) => {
    try {
      if (!contract) {
        throw new Error("Contract not loaded. Please try again later.");
      }

      if (!address) {
        throw new Error("No wallet connected. Please connect your wallet.");
      }

      const amountInWei = parseEther(amount);

      const txHash = await sendTransaction(wagmiConfig, {
        to: SMART_WALLET_ADDRESS,
        value: amountInWei,
        data: "0x",
      });

      console.log("Transaction hash:", txHash);

      await contract.methods.donate().send({
        from: address,
        value: amountInWei,
      });

      const donations = (await contract.methods.getDonors().call()) as {
        donorAddress: string;
        amount: string;
      }[];

      const totalDonations = (await contract.methods
        .getTotalDonations()
        .call()) as string;

      setDonors(donations);
      setTotalDonations(Web3.utils.fromWei(totalDonations, "ether"));
    } catch (error) {
      console.error("Error donating:", error);
    }
  };

  return {
    donors,
    totalDonations,
    donate,
  };
};

export default useDonation;
