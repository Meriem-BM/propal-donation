export type Address = `0x${string}` | undefined;

export interface IDonartiondData {
  donorAddress: string;
  amount: string;
  keyword: string;
  timestamp: string;
}
