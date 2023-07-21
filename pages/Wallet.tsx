import React from "react";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  connect,
  disconnect,
  ConnectedStarknetWindowObject,
} from "@argent/get-starknet";
import { WalletPage } from "../config/WalletPage";
import { WalletDetails } from "../config/WalletDetails";
import Link from "next/link";

function Wallet() {
  const WW_URL = "https://web.argent.xyz";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connection, setConnection] = useState<
    ConnectedStarknetWindowObject | undefined
  >();
  const navigation = [
    { name: "Transactions", href: "/Automation" },
    { name: "Governance Votes", href: "#" },
    { name: "Wallet", href: "#" },
  ];

  const headerLogoSrc =
    "https://blogger.googleusercontent.com/img/a/AVvXsEhqJsWJhTV71WP49YDJZbVeh_I-btNsep9PfcNylfiPtiVzndyx6ofZlXSpWTFwvAbOklVQWanUJpYcLE6FFLwdXYYdO2E4n4ybolmQhBTJkwpBbjemUplbpKa4sWP1Wxo9WQdtCnEnpWDM0Fa3_ZtAC_FvWh7acbJ0FBmCHG10z9wSMWqzi40GKD3luYE";

  useEffect(() => {
    const connectToStarknet = async () => {
      const connection = await connect({
        modalMode: "neverAsk",
        webWalletUrl: WW_URL,
      }); // try to reconnect to a previously used wallet

      if (connection && connection.isConnected) {
        setConnection(connection);
      }
    };
    connectToStarknet();
  }, []);

  return (
    <div className="bg-black text-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex space-x-4 lg:flex-1">
            <Link href="/" className="flex space-x-4">
              <img className="h-14 w-auto" src={headerLogoSrc} alt="" />
              <p className="text-3xl text-blue-700 font-serif pt-2">
                Auto-stark
              </p>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="flex flex-col items-center justify-center space-y-4">
              {!connection ? (
                <button
                  onClick={async () => {
                    const connection = await connect({
                      webWalletUrl: WW_URL,
                    });

                    if (connection && connection.isConnected) {
                      setConnection(connection);
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Connect wallet
                </button>
              ) : (
                <>
                  <div className="flex">
                    <WalletDetails wallet={connection} />
                    <button
                      onClick={async () => {
                        await disconnect();
                        setConnection(undefined);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Disconnect wallet
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex space-x-4">
                <img className="h-12 w-auto" src={headerLogoSrc} alt="" />
                <p className="text-3xl text-blue-700 pt-2">auto-stark</p>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {!connection ? (
                      <button
                        onClick={async () => {
                          const connection = await connect({
                            webWalletUrl: WW_URL,
                          });

                          if (connection && connection.isConnected) {
                            setConnection(connection);
                          }
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Connect wallet
                      </button>
                    ) : (
                      <>
                        <WalletDetails wallet={connection} />
                        <button
                          onClick={async () => {
                            await disconnect();
                            setConnection(undefined);
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Disconnect wallet
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div className="relative isolate px-6  lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(40%-11rem)] aspect-[1155/678]  bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(40%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-4xl font-bold">Your Wallet Details</h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          {!connection ? (
            <button
              onClick={async () => {
                const connection = await connect({
                  webWalletUrl: WW_URL,
                });

                if (connection && connection.isConnected) {
                  setConnection(connection);
                }
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Connect wallet
            </button>
          ) : (
            <>
              <WalletPage wallet={connection} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
