const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Donations", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployDonationsFixture() {
        const [owner, otherAccount] = await ethers.getSigners();

        const Donations = await ethers.getContractFactory("Donations");
        const donations = await Donations.deploy();

        return { donations, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { donations, owner } = await loadFixture(deployDonationsFixture);

            expect(await donations.owner()).to.equal(owner.address);
        });

        it("Should have a 0 balance", async function () {
            const { donations } = await loadFixture(deployDonationsFixture);

            expect(await ethers.provider.getBalance(donations.address)).to.equal(0);
        });
    });

    describe("Donating", function () {
        it("Should receive and store the funds", async function () {
            const { donations } = await loadFixture(deployDonationsFixture);

            const donationAmount = 1;
            await donations.donate({ value: donationAmount });

            expect(await ethers.provider.getBalance(donations.address)).to.equal(
                donationAmount
            );
        });

        it("Should emit a Donation event", async function () {
            const { donations, otherAccount } = await loadFixture(deployDonationsFixture);

            const donationAmount = 1;
            await expect(donations.connect(otherAccount).donate({ value: donationAmount }))
                .to.emit(donations, "DonationReceived")
                .withArgs(otherAccount.address, donationAmount);
        });

        it("Should fail if the donation is 0", async function () {
            const { donations } = await loadFixture(deployDonationsFixture);

            await expect(donations.donate({ value: 0 })).to.be.revertedWith(
                "Donation amount must be greater than 0"
            );
        });
    });

    describe("Withdrawing", function () {
        it("Should withdraw the funds", async function () {
            const { donations, owner } = await loadFixture(deployDonationsFixture);

            const donationAmount = 1;

            const ownerInitialBalance = await ethers.provider.getBalance(owner.address);

            const donateTx = await donations.donate({ value: donationAmount });
            const donateReceipt = await donateTx.wait();
            const gasUsedForDonate = donateReceipt.gasUsed.mul(donateReceipt.effectiveGasPrice);

            expect(await ethers.provider.getBalance(donations.address)).to.equal(donationAmount.toString());

            const withdrawTx = await donations.withdraw(donationAmount);
            const withdrawReceipt = await withdrawTx.wait();
            const gasUsedForWithdraw = withdrawReceipt.gasUsed.mul(withdrawReceipt.effectiveGasPrice);

            const ownerBalance = await ethers.provider.getBalance(owner.address);
            const expectedOwnerBalance = ownerInitialBalance
                .sub(gasUsedForDonate)
                .sub(gasUsedForWithdraw);

            expect(await ethers.provider.getBalance(donations.address)).to.equal(0);
            expect(ownerBalance).to.equal(expectedOwnerBalance);
        });


        it("Should emit a Withdrawal event", async function () {
            const { donations, owner } = await loadFixture(deployDonationsFixture);

            const donationAmount = 1;
            await donations.donate({ value: donationAmount });

            await expect(donations.withdraw(donationAmount))
                .to.emit(donations, "FundsWithdrawn")
                .withArgs(owner.address, donationAmount);
        });

        it("Should fail if the caller is not the owner", async function () {
            const { donations, otherAccount } = await loadFixture(deployDonationsFixture);

            await expect(donations.connect(otherAccount).withdraw(1)).to.be.revertedWith(
                "Only admin can call this function"
            );
        });

        it("Should fail if the balance is 0", async function () {
            const { donations } = await loadFixture(deployDonationsFixture);

            await expect(donations.withdraw(0)).to.be.revertedWith(
                "Withdrawal amount must be greater than zero"
            );
        });

        it("Should fail if the balance is insufficient", async function () {
            const { donations } = await loadFixture(deployDonationsFixture);

            await expect(donations.withdraw(1)).to.be.revertedWith(
                "Insufficient balance"
            );
        });
    });
});