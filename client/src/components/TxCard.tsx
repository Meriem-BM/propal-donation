import { Web3 } from "web3";
import type { IDonartiondData } from "../types/index";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import Spinner from "./Spinner";
import { copyToClipboard } from "@/utils/helpers";

const fallbackGifUrl =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGJrdjh3bWNveWtsbzVmMGlrdWo4cjV2dWtkcnRpaXY1cTlyMXlrcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.webp";

const TransactionCard = ({
  donor,
  index,
}: Readonly<{ donor: IDonartiondData; index: number }>) => {
  const { gifUrl, loading } = useFetch({ keyword: donor.keyword });

  return (
    <div
      key={index}
      className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700"
    >
      <div className="flex gap-2 text-lg font-semibold text-white mb-6">
        <p>
          {donor.donorAddress.substring(0, 6)}...
          {donor.donorAddress.slice(-4)}
        </p>
        <button
          className="cursor-pointer hover:opacity-70"
          onClick={() => copyToClipboard(donor.donorAddress)}
        >
          <Image src="/icons/copy.svg" alt="copy" width={20} height={20} />
        </button>
      </div>
      <div className="flex gap-2 border border-gray-700 rounded-lg p-2 justify-center items-center">
        <span className="text-gray-300">Donated</span>{" "}
        <span className="text-gray-400">
          {Web3.utils.fromWei(donor.amount, "ether")}
        </span>{" "}
        <Image
          src="/icons/tokens/ethereum-eth.svg"
          alt="ethereum"
          width={20}
          height={20}
        />
        <span className="text-gray-300">ETH</span>
      </div>
      <div className="flex justify-center mt-4">
        {loading ? (
          <div className="flex w-48 h-48 justify-center items-center">
            <Spinner size={35} />
          </div>
        ) : (
          <Image
            src={gifUrl || fallbackGifUrl}
            alt="gif"
            width={300}
            height={300}
            onError={(e) => {
              e.currentTarget.src = fallbackGifUrl;
            }}
          />
        )}
      </div>
      <p className="flex justify-end text-gray-400 text-sm mt-4">
        <span className="border border-gray-700 px-2 py-0.5 rounded-lg">
          {new Date(parseInt(donor.timestamp) * 1000).toLocaleString()}
        </span>
      </p>
    </div>
  );
};

export default TransactionCard;
