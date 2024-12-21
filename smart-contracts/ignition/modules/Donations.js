const hre = require("hardhat");

const main = async () => {
  const Dnations = await hre.ethers.getContractFactory("Donations");
  const donations = await Dnations.deploy();

  await donations.deployed();

  console.log("Donations deployed to:", donations.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();