import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("Box", function () {
  let box: Contract;
  beforeEach(async function () {
    const Box = await ethers.getContractFactory("Box");
    box = (await Box.deploy()) as unknown as Contract;
  });

  it("should retrieve value previously stored", async function () {
    await box.store(42);
    expect(await box.retrieve()).to.equal(42n);

    await box.store(100);
    expect(await box.retrieve()).to.equal(100n);
  });
});
