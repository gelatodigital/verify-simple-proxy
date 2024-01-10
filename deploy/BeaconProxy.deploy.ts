import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, run } from "hardhat";

const deployBeaconAndProxies: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // Deploy Beacon_impl1 (initial implementation)
  const beaconImpl1 = await deploy("Beacon_impl1", {
    from: deployer,
    log: true,
  });

  // Deploy MyBeacon (the beacon)
  const myBeacon = await deploy("MyBeacon", {
    from: deployer,
    args: [beaconImpl1.address, deployer], // Address of Beacon_impl1 and deployer as the initial owner
    log: true,
  });

  // Encode the initialization call for Beacon_impl1
  const initData = new ethers.Interface([
    "function initialize(string memory _name)",
  ]).encodeFunctionData("initialize", ["Initial Name"]);

  // Deploy ProxyBeacon
  const proxyBeacon = await deploy("ProxyBeacon", {
    from: deployer,
    args: [myBeacon.address, initData], // Address of MyBeacon
    log: true,
    proxy: {
      proxyContract: "BeaconProxy", // Use 'BeaconProxy' or appropriate contract name if different
      proxyArgs: [myBeacon.address, initData], // Arguments for the BeaconProxy constructor
    },
  });

  // Wait for 10 seconds to ensure that the Etherscan has indexed the deployed contracts
  await new Promise((resolve) => setTimeout(resolve, 10000));
  // Verify Beacon_impl1
  try {
    await run("verify:verify", {
      address: beaconImpl1.address,
      constructorArguments: [], // Beacon_impl1 constructor arguments if any
    });
    console.log(`Verified Beacon_impl1 contract at ${beaconImpl1.address}`);
  } catch (error) {
    console.error("Verification of Beacon_impl1 failed", error);
  }

  // Verify MyBeacon
  try {
    await run("verify:verify", {
      address: myBeacon.address,
      constructorArguments: [beaconImpl1.address, deployer], // MyBeacon constructor arguments
    });
    console.log(`Verified MyBeacon contract at ${myBeacon.address}`);
  } catch (error) {
    console.error("Verification of MyBeacon failed", error);
  }
};

export default deployBeaconAndProxies;
deployBeaconAndProxies.tags = ["BeaconProxy"];
