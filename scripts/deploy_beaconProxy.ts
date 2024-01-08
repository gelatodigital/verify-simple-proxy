// Import necessary Hardhat components
import { ethers, upgrades } from "hardhat";
import "@nomicfoundation/hardhat-verify";

async function main() {
  // Get the contract factory for the first version of the beacon proxy pattern
  const BeaconProxyPatternV1 = await ethers.getContractFactory(
    "BeaconProxyPatternV1"
  );

  // Deploy the beacon with the first version of the contract
  const beacon = await upgrades.deployBeacon(BeaconProxyPatternV1, {
    unsafeAllow: ["constructor"],
  });
  await beacon.waitForDeployment();
  console.log("Beacon deployed to:", await beacon.getAddress());

  // Deploy two beacon proxies using the deployed beacon
  const beaconProxy1 = await upgrades.deployBeaconProxy(
    await beacon.getAddress(),
    BeaconProxyPatternV1,
    []
  );
  let versionAwareContractName =
    await beaconProxy1.getContractNameWithVersion();
  console.log(
    `Proxy Pattern and Version from Proxy 1 Implementation: ${versionAwareContractName}`
  );

  const beaconProxy2 = await upgrades.deployBeaconProxy(
    await beacon.getAddress(),
    BeaconProxyPatternV1,
    []
  );
  versionAwareContractName = await beaconProxy2.getContractNameWithVersion();
  console.log(
    `Proxy Pattern and Version from Proxy 2 Implementation: ${versionAwareContractName}`
  );

  // Upgrade the beacon to use the second version of the contract
  const BeaconProxyPatternV2 = await ethers.getContractFactory(
    "BeaconProxyPatternV2"
  );
  const upgradedBeacon = await upgrades.upgradeBeacon(
    await beacon.getAddress(),
    BeaconProxyPatternV2,
    { unsafeAllow: ["constructor"] }
  );
  console.log(
    `Beacon upgraded with Beacon Proxy Pattern V2 as implementation at address: ${await upgradedBeacon.getAddress()}`
  );

  // Display the version information for both proxies after the upgrade
  versionAwareContractName = await beaconProxy1.getContractNameWithVersion();
  console.log(
    `Proxy Pattern and Version from Proxy 1 Implementation: ${versionAwareContractName}`
  );
  versionAwareContractName = await beaconProxy2.getContractNameWithVersion();
  console.log(
    `Proxy Pattern and Version from Proxy 2 Implementation: ${versionAwareContractName}`
  );

  // Initialize the first proxy and check the version information in storage
  const initTx = await beaconProxy1.initialize();
  const receipt = await initTx.wait();
  versionAwareContractName = await beaconProxy1.versionAwareContractName();
  console.log(
    `Proxy Pattern and Version from Proxy 1 Storage: ${versionAwareContractName}`
  );
  versionAwareContractName = await beaconProxy2.versionAwareContractName();
  console.log(
    `Proxy Pattern and Version from Proxy 2 Storage: ${versionAwareContractName}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
