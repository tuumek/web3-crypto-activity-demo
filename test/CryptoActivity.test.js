const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CryptoActivity", function () {
  let cryptoActivity;
  let owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const CryptoActivity = await ethers.getContractFactory("CryptoActivity");
    cryptoActivity = await CryptoActivity.deploy();
    await cryptoActivity.deployed();
  });

  it("Should deploy correctly", async function () {
    expect(cryptoActivity.address).to.properAddress;
  });

  it("Should allow user to record activity", async function () {
    const tx = await cryptoActivity
      .connect(user)
      .recordActivity("First activity");

    await tx.wait();

    const activity = await cryptoActivity.activities(user.address, 0);
    expect(activity).to.equal("First activity");
  });

  it("Should store multiple activities per user", async function () {
    await cryptoActivity.connect(user).recordActivity("A1");
    await cryptoActivity.connect(user).recordActivity("A2");

    const first = await cryptoActivity.activities(user.address, 0);
    const second = await cryptoActivity.activities(user.address, 1);

    expect(first).to.equal("A1");
    expect(second).to.equal("A2");
  });

  it("Should revert if activity text is empty", async function () {
    await expect(
      cryptoActivity.connect(user).recordActivity("")
    ).to.be.revertedWith("Activity cannot be empty");
  });
});

