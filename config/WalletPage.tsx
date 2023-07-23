import { ConnectedStarknetWindowObject } from "@argent/get-starknet";
import { FC, useState } from "react";
import { number, stark, uint256 } from "starknet";

export const WalletPage: FC<{ wallet: ConnectedStarknetWindowObject }> = ({
  wallet,
}) => {
  const [txHash, setTxHash] = useState<string>();
  const [signature, setSignature] = useState<string[]>();

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <table className="table-auto">
        <tbody>
          <tr>
            <td className="border px-4 py-2">Wallet</td>
            <td className="border px-4 py-2">{wallet.name}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Address</td>
            <td className="border px-4 py-2">{wallet.account.address}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Chain id</td>
            <td className="border px-4 py-2">{wallet.account.chainId}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Actions</td>
            <td className="border px-4 py-2">
              {!txHash && !signature ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <button
                  
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Transfer
                  </button>
                  <button
                   
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign message
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  {txHash ? (
                    <>
                      <p className="text-green-500">Transaction submitted</p>
                      <p className="text-green-500">{txHash}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-green-500">Message signed</p>
                      <p className="text-green-500 max-w-4xl">
                        ({signature?.join(", ")})
                      </p>
                    </>
                  )}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
