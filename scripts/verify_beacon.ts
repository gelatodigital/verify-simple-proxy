// Import the necessary functions from Hardhat
import { ethers, upgrades, run } from "hardhat";

async function main() {
  // Replace 'proxyAddress' with the address of your deployed beacon proxy
  const proxyAddress = "0x3890DB55ff538FBF281c9152820A4a748f5D6F21";

  // Retrieve the beacon address from the proxy
  const beaconAddress = await upgrades.erc1967.getBeaconAddress(proxyAddress);
  console.log("Beacon Address:", beaconAddress);

  // Retrieve the implementation address from the beacon
  const implementationAddress = await upgrades.beacon.getImplementationAddress(
    beaconAddress
  );
  console.log("Implementation Address:", implementationAddress);

  // Verify the implementation contract using Hardhat's verify task
  try {
    await run("verify:verify", {
      address: implementationAddress,
      constructorArguments: [], // Provide constructor arguments if any
    });
    console.log(`Verified implementation contract at ${implementationAddress}`);
  } catch (error) {
    console.error("Verification failed", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
