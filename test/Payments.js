// const {expect} = require('chai')
// const {ethers} = require('hardhat');
//
// describe("Payments", () => {
//     let acc1
//     let acc2
//     let payments
//
//     beforeEach(async () => {
//         [acc1, acc2] = await ethers.getSigners();
//         const Payments = await ethers.getContractFactory("Payments", acc1)
//         payments = await Payments.deploy()
//         await payments.deployed()
//     })
//
//     it('should be deployed', async function () {
//         expect(payments.address).to.be.properAddress
//     });
//
//     it('should be 0 ether by default', async function () {
//         const balance = await payments.currentBalance()
//         expect(balance).to.eq(0)
//     });
//
//     it('should be possible send', async function () {
//         let cost = 140000
//         const tx = await payments.connect(acc2).pay("hello from hardhat", {value: cost})
//
//         await expect(() => tx)
//             .to.changeEtherBalances([acc2, payments], [-cost, cost])
//
//         // await expect(() => tx).to.changeEtherBalance(acc2, -cost)
//         await tx.wait()
//
//         const newPayment = await payments.getPayment(acc2.address, 0)
//         expect(newPayment.amount).to.eq(cost)
//         expect(newPayment.from).to.eq(acc2.address)
//     });
//
//     it('should be owner', async function () {
//         let adr = await payments.getOwner();
//         console.log(adr);
//     });
//
//     it('should be withdraw', async function () {
//         let send = await payments.withdrawAll(10);
//         let recipient = await payments.getOwner();
//         return recipient;
//     });
// })
