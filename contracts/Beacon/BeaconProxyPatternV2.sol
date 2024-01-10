// SPDX-License-Identifier: Unlicense

pragma solidity 0.8.20;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {VersionAware} from "../VersionAware.sol";

contract BeaconProxyPatternV2 is Initializable, VersionAware {
    constructor(){
        _disableInitializers();
    }

    function initialize() external reinitializer(2) {
        versionAwareContractName = "Beacon Proxy Pattern: V2";
    }

    function getContractNameWithVersion() external pure override returns (string memory) {
        return "Beacon Proxy Pattern: V2";
    }
}