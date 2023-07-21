import { RpcProvider, Contract } from "starknet";
// https://starknet-goerli.g.alchemy.com/v2/hU1jbwgccRY8mnOWzvECf-C2tuu8Xtrz
const alchemyKey = "your alchemy key";
const providerRPC = new RpcProvider({
  nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/" + alchemyKey,
});

/**
 * this example uses argent X to add bravos add just the bravos in main.jsx just like argent x there
 * To operate user must need our custom token.
 * To do so: calling a `MintMe` function below with any valid user would provide some our token.
 * Now to create a task.
 * After getting our faucet token, user can schedule a task of transferring our faucet tokens to other valid addr
 * To do so: calling a `writeContract` function (first one) with the details of transferfrom like from, to, amount.
 * the order of sending the args must be same. Other props like selector, account_dummy are there to respect the earlier version
 * of code. Like they are just placeholder (don't remove) and change for every call. Like change everytime you invoke this write
 * contract. selector is felt252(just copy any random  entry_point_selector from block explorer). They are there for generating
 * unique ids inside contract. this writeContract spits out the id (i didn't found a way to get from starknet js, easily obtain
 * through block explorer).
 * After that window is the unix timestamp of the future and delay is just to increase the execution time(like if you missed there is 100s delay or something like that)
 * For execute call the `executeOi` just in time frame window+delay with the same `userCallData` only of `writeContract`
 * To cancel: just provide the `id` retrieved from the `writeContract or blockexplorers its felt252`
 *
 * Also there is felttosting func which converts felt messages(revert messages) into string.If using argentx they show txn simulation and error msg in felt
 */

export const writeContract = async (account) => {
  const deployed_address =
    "0x04f0f5b6af7a26394cfa1305aa51deb9c95329913732dca830d6a3664ab46f08";
  const { abi } = await providerRPC.getClassAt(deployed_address);
  const myContract = new Contract(abi, deployed_address, account);
  const userCallData = [
    {
      from: "0x04B1cd18ABe16a457c4675E453Fa5e43BDB243123eC5d97325d1BDf5365582f8",
      to: "0x079dFB2ef33323f866C07280F96c4497Ee419D1D0fBB39e2D7cCc63C0F28E819",
      selector:
        "0x1557182e4359a1f0c6301278e8f5b35a776ab58d39892581e357578fb287836",
      amount: 20,
      amount_dummy: [
        "0x079dFB2ef33323f866C07280F96c4497Ee419D1D0fBB39e2D7cCc63C0F28E819",
      ],
    },
  ];
  const contractCallData = [
    userCallData,
    { window: 1689789951, delay: 100 },
    20,
  ];
  const result = await myContract.invoke("queue", contractCallData, {
    parseRequest: true,
  });
  console.log(result);
};
const feltToString = (felt) =>
  felt
    // To hex
    // .toString(16)
    // Split into 2 chars
    .match(/.{2}/g)
    // Get char from code
    .map((c) => String.fromCharCode(parseInt(c, 16)))
    // Join to a string
    .join("");

export const executeOi = async (account) => {
  const deployed_address =
    "0x04f0f5b6af7a26394cfa1305aa51deb9c95329913732dca830d6a3664ab46f08";
  console.log(
    feltToString("0x496e70757420746f6f2073686f727420666f7220617267756d656e7473")
  );
  const { abi } = await providerRPC.getClassAt(deployed_address);
  const myContract = new Contract(abi, deployed_address, account);
  const userCallData = [
    {
      from: "0x04B1cd18ABe16a457c4675E453Fa5e43BDB243123eC5d97325d1BDf5365582f8",
      to: "0x079dFB2ef33323f866C07280F96c4497Ee419D1D0fBB39e2D7cCc63C0F28E819",
      selector:
        "0x1557182e4359a1f0c6301278e8f5b35a776ab58d39892581e357578fb287836",
      amount: 20,
      amount_dummy: [
        "0x079dFB2ef33323f866C07280F96c4497Ee419D1D0fBB39e2D7cCc63C0F28E819",
      ],
    },
  ];
  const contractCallData = [userCallData];
  const result = await myContract.invoke("execute", contractCallData);
  console.log(result);
};

export const cancelIt = async (account) => {
  const deployed_address =
    "0x04f0f5b6af7a26394cfa1305aa51deb9c95329913732dca830d6a3664ab46f08";

  const { abi } = await providerRPC.getClassAt(deployed_address);
  const myContract = new Contract(abi, deployed_address, account);
  const contractCallData = [
    "id felt252 you got from the blockexplorer or while calling the writeContract",
  ];
  const result = await myContract.invoke("cancel", contractCallData, {
    parseRequest: true,
  });
  const resp = await providerRPC.waitForTransaction(result.transaction_hash);
  console.log(resp);
};

export const mintMe = async (account) => {
  const deployed_address =
    "0x04f0f5b6af7a26394cfa1305aa51deb9c95329913732dca830d6a3664ab46f08";

  const { abi } = await providerRPC.getClassAt(deployed_address);
  const myContract = new Contract(abi, deployed_address, account);
  const contractCallData = [
    "0x4b1cd18abe16a457c4675e453fa5e43bdb243123ec5d97325d1bdf5365582f8",
  ];
  const result = await myContract.invoke("mint_me", contractCallData, {
    parseRequest: true,
  });
  const resp = await providerRPC.waitForTransaction(result.transaction_hash);
  console.log(resp);
};
