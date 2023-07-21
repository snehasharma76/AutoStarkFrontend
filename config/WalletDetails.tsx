import { ConnectedStarknetWindowObject } from "@argent/get-starknet";
import { FC } from "react";
import truncateEthAddress from "truncate-eth-address";

export const WalletDetails: FC<{ wallet: ConnectedStarknetWindowObject }> = ({
  wallet,
}) => {
  return (
    <div className=" items-center justify-center space-y-4">
      <td className="border px-4 py-2">Address</td>
      <td className="border px-4 py-2">
        {truncateEthAddress(wallet.account.address)}
      </td>
    </div>
  );
};
