# Contract Verification on Custom Chain

## Overview

This repository showcases how to deploy and verify smart contracts on a custom blockchain network like Unreal using Hardhat. It includes examples with two contracts, `Box.sol` and `BoxV2.sol`, demonstrating a simple proxy pattern.

## Contracts

- `Box.sol`: Initial version of our contract.
- `BoxV2.sol`: Updated version for demonstrating upgrades.

## Deployment

We use the `hardhat-deploy` plugin for deploying our contracts. The deployment script deploys `Box.sol` using a proxy pattern.

### Deploy Script

The deploy script, located in `scripts/deploy_boxV1.ts`, handles the deployment of `Box.sol` and logs the proxy, implementation, and admin addresses.

## Verification

Verification of contracts on the custom chain is performed using `@nomicfoundation/hardhat-verify` along with `@openzeppelin/upgrades-core`.

### Verify Script

The verify script in `scripts/verify_boxV1.ts` verifies the implementation and proxy contracts on the Unreal blockchain's explorer.

## Verification Result

The contracts are successfully verified, and their code is available on the block explorer.

- [BoxProxy](https://unreal.blockscout.com/address/0xe3689ABC2F6648BA8be68cE41620988C4e2708bd)
- [BoxImplementation](https://unreal.blockscout.com/address/0x7b8d30c0F605fCa77F2ec04661C11c369f630753#code)
