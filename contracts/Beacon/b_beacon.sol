//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;


import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract MyBeacon is UpgradeableBeacon {
    constructor(address _implementation, address _initialOwner) UpgradeableBeacon(_implementation, _initialOwner) {}
}