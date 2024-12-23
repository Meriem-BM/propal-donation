import { useEffect, useState } from "react";
import Web3 from "web3";
import { parseEther } from "viem";
import DonationPlatformABI from "@/Donations.json";
import type { Address } from "@/types";
import { sendTransaction } from "@wagmi/core";
import { wagmiConfig } from "@/wagmiConfigs";

const SMART_WALLET_ADDRESS = "0x59861EC7670bE025Bd239A5Ae1B8Af32E98dF1F3";

type DonationContract = typeof DonationPlatformABI & {
  methods: {
    donate: () => {
      send: (options: { from: Address; value: bigint }) => Promise<void>;
    };
    getDonors: () => {
      call: () => Promise<{ donorAddress: string; amount: string }[]>;
    };
    getTotalDonations: () => {
      call: () => Promise<string>;
    };
  };
};

const useDonation = () => {
  const { ethereum } = window;

  const [contract, setContract] = useState<DonationContract | null>(null);
  const [donors, setDonors] = useState<
    { donorAddress: string; amount: string }[]
  >([]);
  const [totalDonations, setTotalDonations] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const web3 = new Web3(ethereum);
        const donationContract = new web3.eth.Contract(
          DonationPlatformABI.abi,
          SMART_WALLET_ADDRESS
        ) as unknown as DonationContract;

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
