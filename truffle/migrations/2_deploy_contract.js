const LoadsCalc = artifacts.require("LoadsCalc");

module.exports = function(deployer) {
  deployer.deploy(LoadsCalc);
};
