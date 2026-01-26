const hre = require("hardhat");

async function main() {
  // Pobranie kontraktu
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");

  // Deploy kontraktu
  const simpleStorage = await SimpleStorage.deploy();

  await simpleS
 
