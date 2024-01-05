import { deployments, ethers, getNamedAccounts } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";
import {
  getImplementationAddress,
  getAdminAddress,
} from "@openzeppelin/upgrades-core";

describe("Box (proxy)", function () {
  let box: Contract;
  const { deploy } = deployments;

  beforeEach(async function () {
    const { deployer } = await getNamedAccounts();
    await deployments.fixture(); // Ensure all scripts in the 'deploy' folder are executed and deployments are recorded.

    const boxDeployment = await deploy("Box", {
      from: deployer,
      args: [], // Arguments for the initializer function
      log: true,
      proxy: {
        owner: deployer,
        proxyContract: "OpenZeppelinTransparentProxy",
      },
    });

    const BoxDeployment = await deployments.get("Box"); // Get the deployment data
    const proxyAddress = boxDeployment.address;
    const implementationAddress = await getImplementationAddress(
      ethers.provider,
      proxyAddress
    );
    const adminAddress = await getAdminAddress(ethers.provider, proxyAddress);

    console.log(implementationAddress, "Box (implementation) address");
    console.log(adminAddress, "Box (admin) address");

    const Box = await ethers.getContractFactory("Box");
    box = (await Box.attach(BoxDeployment.address)) as Contract;

    await box.store(42);
  });

  it("should retrieve value previously stored", async function () {
    console.log(box.address, " box(proxy)");

    // Test goes here
    expect(await box.retrieve()).to.equal(42n);

    await box.store(100);
    expect(await box.retrieve()).to.equal(100n);
  });
});
