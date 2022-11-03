const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.providers.InfuraProvider();

  const lastBlockNumber = await provider.getBlockNumber();
  console.log(lastBlockNumber);

  const lastBlock = await provider.getBlockWithTransactions(lastBlockNumber);

  console.log(
    "Base fee: " +
      ethers.utils.formatUnits(lastBlock.baseFeePerGas.toString(), "gwei")
  );

  const transactions = lastBlock.transactions;

  let ordered = true;
  let lastValue = 0;

  for (i = 0; i < transactions.length; i++) {
    const gas = ethers.utils.formatUnits(
      lastBlock.transactions[i].gasPrice.toString(),
      "gwei"
    );

    if (ordered) {
      if (gas > lastValue) {
        lastValue = gas;
      }
      if (gas < lastValue) {
        ordered = false;
      }
    }
    console.log(gas);
  }

  console.log("ordered: " + (ordered ? "✅" : "❌"));
}

main();
