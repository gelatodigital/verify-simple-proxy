import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";
import { BaseContract } from "ethers";

describe("Beacon and Proxy Contract Tests", function () {
  let beaconImpl1: Contract;
  let myBeacon: Contract;
  let proxyBeacon: Contract;
  let deployer: Signer;
  let user: Signer;
  let deployerAddress: string;
  let userAddress: string;

  interface BeaconImpl1Contract extends BaseContract {
    name: () => Promise<string>;
    v: () => Promise<number>;
    [key: string]: any;
  }

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    userAddress = await user.getAddress();

    // Deploy Beacon_impl1
    const BeaconImpl1 = await ethers.getContractFactory("Beacon_impl1");
    beaconImpl1 = (await BeaconImpl1.deploy()) as unknown as Contract;
    await beaconImpl1.waitForDeployment();
    const beaconImpl1Address = await beaconImpl1.getAddress();

    // Deploy MyBeacon with Beacon_impl1 address
    const MyBeacon = await ethers.getContractFactory("MyBeacon");
    myBeacon = (await MyBeacon.deploy(
      beaconImpl1Address,
      deployerAddress
    )) as unknown as Contract;
    await myBeacon.waitForDeployment();
    const myBeaconAddress = await myBeacon.getAddress();

    // Deploy ProxyBeacon with MyBeacon address and encoded initialization data
    // Encode the initialization call for Beacon_impl1
    const initData = new ethers.Interface([
      "function initialize(string memory _name)",
    ]).encodeFunctionData("initialize", ["Initial Name"]);

    const ProxyBeacon = await ethers.getContractFactory("ProxyBeacon");
    proxyBeacon = (await ProxyBeacon.deploy(
      myBeaconAddress,
      initData
    )) as unknown as Contract;
    await proxyBeacon.waitForDeployment();
  });

  it("should set the correct deployer as the owner of MyBeacon", async function () {
    expect(await myBeacon.owner()).to.equal(deployerAddress);
  });

  it("should correctly initialize Beacon_impl1 through the proxy", async function () {
    const BeaconImpl1Contract = await ethers.getContractFactory("Beacon_impl1");
    const impl1ConnectedToProxy = BeaconImpl1Contract.attach(
      await proxyBeacon.getAddress()
    ) as BeaconImpl1Contract;
    expect(await impl1ConnectedToProxy.name()).to.equal("Initial Name");
  });

  it("should return the correct version number from Beacon_impl1", async function () {
    const BeaconImpl1Contract = await ethers.getContractFactory("Beacon_impl1");
    const impl1ConnectedToProxy = BeaconImpl1Contract.attach(
      await proxyBeacon.getAddress()
    ) as BeaconImpl1Contract;
    expect(await impl1ConnectedToProxy.v()).to.equal(1);
  });

  // Add more tests as needed
});
