import { useEffect, useState } from "react";
import Web3 from "web3";
import { parseEther } from "viem";
import DonationPlatformABI from "@/Donations.json";
import type { Address } from "@/types";
import { sendTransaction } from "@wagmi/core";
import { wagmiConfig } from "@/wagmiConfigs";
import type { IDonartiondData } from "../types/index";

const SMART_WALLET_ADDRESS = "0x864f73103b059D095E0b6EcB483Fc04c3475006F";

type DonationContract = typeof DonationPlatformABI & {
  methods: {
    donate: (keyword: string) => {
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
  const [donors, setDonors] = useState<IDonartiondData[]>([]);
  const [totalDonations, setTotalDonations] = useState("");
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (!ethereum) {
          throw new Error(
            "No ethereum object found. Please connect your wallet."
          );
        }

        setFetching(true);

        const web3 = new Web3(ethereum);
        const donationContract = new web3.eth.Contract(
          DonationPlatformABI.abi,
          SMART_WALLET_ADDRESS
        ) as unknown as DonationContract;

        setContract(donationContract);

        const donations = (await donationContract.methods
          .getDonors()
          .call()) as IDonartiondData[];
        const totalDonations = (await donationContract.methods
          .getTotalDonations()
          .call()) as string;

        setDonors(donations);
        setTotalDonations(Web3.utils.fromWei(totalDonations, "ether"));
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      } finally {
        setFetching(false);
      }
    };

    loadBlockchainData();
  }, [ethereum]);

  const donate = async (address: Address, amount: string, keyword: string) => {
    try {
      if (submitting) {
        return;
      }

      setSubmitting(true);

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

      await contract.methods.donate(keyword).send({
        from: address,
        value: amountInWei,
      });

      const donations = (await contract.methods
        .getDonors()
        .call()) as IDonartiondData[];

      const totalDonations = (await contract.methods
        .getTotalDonations()
        .call()) as string;

      setDonors(donations);
      setTotalDonations(Web3.utils.fromWei(totalDonations, "ether"));
    } catch (error) {
      console.error("Error donating:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    donors,
    totalDonations,
    fetching,
    submitting,
    donate,
  };
};

export default useDonation;
