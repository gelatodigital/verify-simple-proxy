// Script for verifying the BoxV1 contract and its proxy contract
// Path: scripts/verify_boxV1.ts

// Import the ethers and hardhat libraries
import { ethers, run } from "hardhat";

// Import the helper functions from @openzeppelin/upgrades-core
import {
  getImplementationAddress,
  getAdminAddress,
} from "@openzeppelin/upgrades-core";

async function main() {
  // Get the BoxV1 contract deployed address
  const proxyAddress = "0xe3689ABC2F6648BA8be68cE41620988C4e2708bd";

  // Get the BoxV1 contract deployed address
  const implementationAddress = await getImplementationAddress(
    ethers.provider,
    proxyAddress
  );

  // Get the BoxV1 contract admin address
  const adminAddress = await getAdminAddress(ethers.provider, proxyAddress);

  // Verify the implementation contract
  await run("verify:verify", {
    address: implementationAddress,
  });

  console.log("Verified implementation contract");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
