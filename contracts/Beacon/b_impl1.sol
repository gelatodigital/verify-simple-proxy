//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract Beacon_impl1  is Initializable {

    string public name;
    function initialize(string memory _name) external initializer {
       name = _name;
    }

    function v() external pure returns(uint) {
       return 1;
    }

}