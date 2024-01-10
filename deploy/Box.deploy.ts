import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, run } from "hardhat";
import {
  getImplementationAddress,
  getAdminAddress,
} from "@openzeppelin/upgrades-core";

const deployBeaconAndProxies: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Deploy your contract with a Transparent Proxy
  const boxDeployment = await deploy("Box", {
    contract: "Box", // Replace with your actual contract name
    from: deployer,
    args: [], // Constructor arguments for your contract (if any)
    log: true,
    proxy: {
      owner: deployer,
      proxyContract: "OpenZeppelinTransparentProxy",
    },
  });

  console.log(boxDeployment.address, "Box (proxy) address");

  // Wait for 10 seconds to ensure Etherscan has indexed the contract
  await new Promise((resolve) => setTimeout(resolve, 10000));

  // Retrieve implementation and admin addresses
  const proxyAddress = boxDeployment.address;
  const implementationAddress = await getImplementationAddress(
    ethers.provider,
    proxyAddress
  );
  const adminAddress = await getAdminAddress(ethers.provider, proxyAddress);

  console.log(implementationAddress, "Box (implementation) address");
  console.log(adminAddress, "Box (admin) address");

  // Verify the implementation contract
  try {
    await run("verify:verify", {
      address: implementationAddress,
      constructorArguments: [], // Add constructor arguments of your implementation contract if any
    });
    console.log(`Verified implementation contract at ${implementationAddress}`);
  } catch (error) {
    console.error("Verification of implementation contract failed", error);
  }

  // Additional logic for verifying other contracts can be added here if needed
};

export default deployBeaconAndProxies;
deployBeaconAndProxies.tags = ["Box"];
