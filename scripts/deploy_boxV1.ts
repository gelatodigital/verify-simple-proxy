import { deployments, ethers, getNamedAccounts, run } from "hardhat";
import {
  getImplementationAddress,
  getAdminAddress,
} from "@openzeppelin/upgrades-core";
import "@nomicfoundation/hardhat-verify";

async function main() {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying Box...");

  const boxDeployment = await deploy("Box", {
    from: deployer,
    args: [], // Arguments for the initializer function
    log: true,
    proxy: {
      owner: deployer,
      proxyContract: "OpenZeppelinTransparentProxy",
    },
  });

  console.log(boxDeployment.address, "Box (proxy) address");
  // Additional console logs can be added here if needed
  const proxyAddress = boxDeployment.address;
  const implementationAddress = await getImplementationAddress(
    ethers.provider,
    proxyAddress
  );
  const adminAddress = await getAdminAddress(ethers.provider, proxyAddress);

  console.log(implementationAddress, "Box (implementation) address");
  console.log(adminAddress, "Box (admin) address");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
