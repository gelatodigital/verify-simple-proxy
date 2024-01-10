# Beacon Proxy Pattern Deployment and Verification

This repository demonstrates the deployment and verification of smart contracts using the Beacon Proxy pattern on the Unreal network.

## Overview

The Beacon Proxy pattern allows for more efficient contract upgrades by using a beacon contract to manage the implementation logic for multiple proxy contracts.

## Deployment

To deploy the contracts:

1. Run `npx hardhat deploy --network [yourCustomNetwork]`. This deploys the contracts.
2. The script then verifies the implementation contract on the Unreal block explorer.

## Results

After running the scripts, you should see logs confirming the deployment addresses of the beacon and proxy contracts, and the successful verification of the implementation contract on the Unreal block explorer.

```
deploying "Beacon_impl1" (tx: 0x2648bf14bda573e2a6bb66339d3aef842d68df86bc209ee84f9ac56dd015ff77)...: deployed at 0x8a49C6dcBC2622D2e1Ec8A578fe4E2091D6ea0B6 with 544445 gas
deploying "MyBeacon" (tx: 0xb2719c1b524d765376e137eb7aebf0430d7d1149ef73ab1c08ad3a95cedbe131)...: deployed at 0xB3364ac01470e1D287f8C1cD9A3CB6624af14581 with 392175 gas
deploying "ProxyBeacon_Implementation" (tx: 0xba0509e3cd59695b30026f80d721ea96537d550127687a6867fb9542ce4684f0)...: deployed at 0x5755133AFe85049CB65BcdF785fb9538DE29bB83 with 260237 gas
deploying "ProxyBeacon_Proxy" (tx: 0x32b50a009f6b20932b95543fc2fccce7d4ad12428b439d4a40a96a66d9f25b07)...: deployed at 0xff21B97aF0dF6A3C66A6883F2dBa0762AC9d4Ac9 with 259943 gas
Successfully submitted source code for contract
contracts/Beacon/b_impl1.sol:Beacon_impl1 at 0x8a49C6dcBC2622D2e1Ec8A578fe4E2091D6ea0B6
for verification on the block explorer. Waiting for verification result...

Successfully verified contract Beacon_impl1 on the block explorer.
https://unreal.blockscout.com/address/0x8a49C6dcBC2622D2e1Ec8A578fe4E2091D6ea0B6#code

Verified Beacon_impl1 contract at 0x8a49C6dcBC2622D2e1Ec8A578fe4E2091D6ea0B6
Verifying implementation: 0x8a49C6dcBC2622D2e1Ec8A578fe4E2091D6ea0B6
The contract 0x8a49C6dcBC2622D2e1Ec8A578fe4E2091D6ea0B6 has already been verified on Etherscan.
https://unreal.blockscout.com/address/0x8a49C6dcBC2622D2e1Ec8A578fe4E2091D6ea0B6#code
Verifying beacon or beacon-like contract: 0xB3364ac01470e1D287f8C1cD9A3CB6624af14581
```
