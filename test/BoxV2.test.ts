import { deployments, ethers, getNamedAccounts } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";

describe("Box (proxy)", function () {
  let boxV2: Contract;

  beforeEach(async function () {
    await deployments.fixture(); // Ensure all scripts in the 'deploy' folder are executed and deployments are recorded.

    const BoxV2 = await ethers.getContractFactory("BoxV2");
    boxV2 = (await BoxV2.deploy()) as unknown as Contract;
  });

  it("should retrieve value previously stored", async function () {
    // Test goes here
    await boxV2.store(42);
    expect(await boxV2.retrieve()).to.equal(42n);

    await boxV2.store(100);
    expect(await boxV2.retrieve()).to.equal(100n);
  });

  it("should increment value", async function () {
    await boxV2.store(42);
    await boxV2.increment();
    expect(await boxV2.retrieve()).to.equal(43n);
  });
});
