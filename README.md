# Contract Verification on Custom Chain

## Overview

This repository demonstrates how to deploy and verify smart contracts on a custom blockchain network like Unreal using Hardhat. It includes examples with contracts, showcasing a proxy pattern.

## Contracts

- `Box.sol`: The initial version of our contract.

## Deployment and Verification

We now use the `deploy/` directory for deploying our contracts using the `hardhat-deploy` plugin. The deployment script deploys `Box.sol` using a Transparent Proxy pattern, and contract verification is integrated within the deployment process.

### Deploy Script

The deploy script, now located in `deploy/`, handles the deployment of `Box.sol` and logs the proxy, implementation, and admin addresses.

### Deployment Output

After running the deployment script, the following output is generated:

- Proxy Address: `0xe3689ABC2F6648BA8be68cE41620988C4e2708bd`
- Implementation Address: `0x7b8d30c0F605fCa77F2ec04661C11c369f630753`
- Admin Address: `0xdDF2D006e3010e62c354508D42a2eA5910A88bD2`

### Verification Result

The implementation contract at `0x7b8d30c0F605fCa77F2ec04661C11c369f630753` has been verified on the Unreal blockchain's block explorer:

- [Box Implementation on Blockscout](https://unreal.blockscout.com/address/0x7b8d30c0F605fCa77F2ec04661C11c369f630753#code)

### Running the Deployment

To deploy the contracts, run the following command:

```bash
npx hardhat deploy --network <network-name>
```

## Output

```
PS C:\Users\aniru\OneDrive\Desktop\Gelato_internship\RaaS\verify-simple-proxy> npx hardhat deploy --network unreal
Nothing to compile
No need to generate any newer typings.
reusing "DefaultProxyAdmin" at 0xdDF2D006e3010e62c354508D42a2eA5910A88bD2
reusing "Box_Implementation" at 0x7b8d30c0F605fCa77F2ec04661C11c369f630753
0xe3689ABC2F6648BA8be68cE41620988C4e2708bd Box (proxy) address
0x7b8d30c0F605fCa77F2ec04661C11c369f630753 Box (implementation) address
0xdDF2D006e3010e62c354508D42a2eA5910A88bD2 Box (admin) address
The contract 0x7b8d30c0F605fCa77F2ec04661C11c369f630753 has already been verified on Etherscan.
https://unreal.blockscout.com/address/0x7b8d30c0F605fCa77F2ec04661C11c369f630753#code
Verified implementation contract at 0x7b8d30c0F605fCa77F2ec04661C11c369f630753
```
