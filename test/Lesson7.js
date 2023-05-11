const {expect} = require('chai')
const {ethers} = require('hardhat');

describe("Lesson7", () => {
    let
        owner,
        other_wallet,
        payments

    beforeEach(async () => {
        [owner, other_wallet] = await ethers.getSigners();

        const contract = await ethers.getContractFactory("Payments", owner)
        payments = await contract.deploy()
        await payments.deployed();
    });

    async function sendMoney(sender, amount = 100) {
        const txData = {
            to: payments.address,
            value: amount
        }

        const tx = await sender.sendTransaction(txData);
        await tx.wait()

        return [tx, amount]
    }

    it('should allow to send money', async function () {
        let sum = 100000;
        const [sendMoneyTx, amount] = await sendMoney(other_wallet, sum)

        await expect(() => sendMoneyTx)
            .to.changeEtherBalance(payments, sum)

        let ts = (await ethers.provider.getBlock(sendMoneyTx.blockNumber)).timestamp
        console.log(ts);

        await expect(sendMoneyTx)
            .to.emit(payments, 'Paid')
            .withArgs(other_wallet.address, sum, ts)
    });

    it('should allow owner withdraw', async function () {
        const [x, amount] = await sendMoney(other_wallet);

        const tx = payments.withdrawAll(owner.address);

        await expect(tx)
            .to.changeEtherBalances([payments, owner], [-amount, amount])
    });

    it('should not allow other account to withdraw', async function () {
        await sendMoney(other_wallet);

        await expect(
            payments.connect(other_wallet).withdrawAll(other_wallet.address)
        ).to.be.revertedWith("you are not an someone!")
    });

});
