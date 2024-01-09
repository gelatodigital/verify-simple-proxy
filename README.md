# Beacon Proxy Pattern Deployment and Verification

This repository demonstrates the deployment and verification of smart contracts using the Beacon Proxy pattern on the Unreal network.

## Overview

The Beacon Proxy pattern allows for more efficient contract upgrades by using a beacon contract to manage the implementation logic for multiple proxy contracts.

## Deployment

To deploy the contracts:

1. Run the `deploy_beaconProxy.ts` script. This deploys the beacon contract and two beacon proxy contracts.
2. The script then upgrades the beacon to use a new implementation (`BeaconProxyPatternV2`).
3. Each proxy contract automatically uses the updated implementation.

```
    You are using the `unsafeAllow.constructor` flag.

Beacon deployed to: 0x25416bB4f509855949Ed586f6801B48D768526fd
Beacon Proxy 1 deployed to: 0x3890DB55ff538FBF281c9152820A4a748f5D6F21
Proxy Pattern and Version from Proxy 1 Implementation: Beacon Proxy Pattern: V1
Beacon Proxy 2 deployed to: 0x4Ca850Ea965516092826724324d3aB0Ea4C8890b
Proxy Pattern and Version from Proxy 2 Implementation: Beacon Proxy Pattern: V1
Warning: Potentially unsafe deployment of contracts/Beacon/BeaconProxyPatternV2.sol:BeaconProxyPatternV2

    You are using the `unsafeAllow.constructor` flag.

Beacon upgraded with Beacon Proxy Pattern V2 as implementation at address: 0x25416bB4f509855949Ed586f6801B48D768526fd
Proxy Pattern and Version from Proxy 1 Implementation: Beacon Proxy Pattern: V2
Proxy Pattern and Version from Proxy 2 Implementation: Beacon Proxy Pattern: V2
Proxy Pattern and Version from Proxy 1 Storage: Beacon Proxy Pattern: V2
Proxy Pattern and Version from Proxy 2 Storage: Beacon Proxy Pattern: V1
Done in 29.77s.
```

## Verification

Verification of the implementation contract on the Unreal network is performed by the `verify_beacon.ts` script:

1. The script retrieves the beacon address from one of the deployed proxies.
2. It then fetches the current implementation address from the beacon.
3. Finally, the script submits the implementation contract for verification on the Unreal block explorer.

## Results

After running the scripts, you should see logs confirming the deployment addresses of the beacon and proxy contracts, and the successful verification of the implementation contract on the Unreal block explorer.

```
Beacon Address: 0x25416bB4f509855949Ed586f6801B48D768526fd
Implementation Address: 0x8Bf8CE5Ac32cC3b2c9A84112025E760085474aE4
Successfully submitted source code for contract
contracts/Beacon/BeaconProxyPatternV2.sol:BeaconProxyPatternV2 at 0x8Bf8CE5Ac32cC3b2c9A84112025E760085474aE4
for verification on the block explorer. Waiting for verification result...

Successfully verified contract BeaconProxyPatternV2 on the block explorer.
https://unreal.blockscout.com/address/0x8Bf8CE5Ac32cC3b2c9A84112025E760085474aE4#code

Verified implementation contract at 0x8Bf8CE5Ac32cC3b2c9A84112025E760085474aE4
Done in 13.21s.
```

[Verification Link](https://unreal.blockscout.com/address/0x8Bf8CE5Ac32cC3b2c9A84112025E760085474aE4#code)

## Note

- The `unsafeAllow.constructor` flag is used in deployment for demonstration purposes.
- The beacon proxy pattern allows for centralized updates of the contract logic while maintaining individual proxy states.
