import { RpcProvider, Contract } from "starknet";
// https://starknet-goerli.g.alchemy.com/v2/hU1jbwgccRY8mnOWzvECf-C2tuu8Xtrz
const alchemyKey = "hU1jbwgccRY8mnOWzvECf-C2tuu8Xtrz";
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

export const writeContract = async (
  account,
  from,
  to,
  amount,
  window,
  delay
) => {
  const deployed_address =
    "0x06d381bc16bcd39b13bfe20d5501e32a35e981c08ce983dea3a7b791f8b37079";
  const { abi } = await providerRPC.getClassAt(deployed_address);
  const myContract = new Contract(abi, deployed_address, account);
  const userCallData = [
    {
      from: from,
      to: to,
      selector:
        "0x0041b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
      amount: amount,
      calldata: [from, changeValue("9")],
    },
  ];
  const contractCallData = [
    userCallData,
    { window: window, delay: delay },
    amount,
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

export const executeOi = async (account, from, to, amount) => {
  const deployed_address =
    "0x06d381bc16bcd39b13bfe20d5501e32a35e981c08ce983dea3a7b791f8b37079";
  console.log(
    feltToString("0x496e70757420746f6f2073686f727420666f7220617267756d656e7473")
  );
  const { abi } = await providerRPC.getClassAt(deployed_address);
  const myContract = new Contract(abi, deployed_address, account);
  const userCallData = [
    {
      from: from,
      to: to,
      selector:
        "0x0041b033f4a31df8067c24d1e9b550a2ce75fd4a29e1147af9752174f0e6cb20",
      amount: amount,
      calldata: [from, changeValue("9")],
    },
  ];
  const contractCallData = [userCallData];
  const result = await myContract.invoke("execute", contractCallData);
  console.log(result);
};

export const cancelIt = async (account, id) => {
  const deployed_address =
    "0x06d381bc16bcd39b13bfe20d5501e32a35e981c08ce983dea3a7b791f8b37079";

  const { abi } = await providerRPC.getClassAt(deployed_address);
  const myContract = new Contract(abi, deployed_address, account);
  const contractCallData = [id];
  const result = await myContract.invoke("cancel", contractCallData, {
    parseRequest: true,
  });
  const resp = await providerRPC.waitForTransaction(result.transaction_hash);
  console.log(resp);
};

export const mintMe = async (account, from) => {
  const deployed_address =
    "0x06d381bc16bcd39b13bfe20d5501e32a35e981c08ce983dea3a7b791f8b37079";

  const { abi } = await providerRPC.getClassAt(deployed_address);
  const myContract = new Contract(abi, deployed_address, account);
  const contractCallData = [from];
  const result = await myContract.invoke("mint_me", contractCallData, {
    parseRequest: true,
  });
  const resp = await providerRPC.waitForTransaction(result.transaction_hash);
  console.log(resp);
};
