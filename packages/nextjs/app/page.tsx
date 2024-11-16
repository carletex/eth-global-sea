"use client";

import React, { useState } from "react";
import { useWriteContracts } from "wagmi/experimental";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { AddressInput, EtherInput } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface Recipient {
  address: string;
}

const TokenSplitterPage = () => {
  const [amount, setAmount] = useState<string>("");
  const [recipients, setRecipients] = useState<Recipient[]>([{ address: "" }]);

  const handleAddRecipient = (): void => {
    setRecipients([...recipients, { address: "" }]);
  };

  const handleRemoveRecipient = (index: number): void => {
    if (recipients.length > 1) {
      const newRecipients = recipients.filter((_, i) => i !== index);
      setRecipients(newRecipients);
    }
  };

  const { data: Splitter } = useDeployedContractInfo("Splitter");
  const { writeContractsAsync } = useWriteContracts();
  const { writeContractAsync: writeScaffoldAsycn } = useScaffoldWriteContract("Splitter");

  const handleAddressChange = (index: number, value: string): void => {
    const newRecipients = [...recipients];
    newRecipients[index] = { address: value };
    setRecipients(newRecipients);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!Splitter) return;
      const validRecipients = recipients.filter(r => r.address);

      // Create an array of amounts, repeating the amount for each recipient
      const amounts = Array(validRecipients.length).fill(amount);
      const paymasterURL = process.env.NEXT_PUBLIC_PAYMASTER_URL;
      await writeContractsAsync({
        contracts: [
          {
            address: Splitter.address,
            abi: Splitter.abi,
            functionName: "multisendEther",
            args: [validRecipients.map(r => r.address), amounts],
          },
        ],
        capabilities: {
          paymasterService: {
            url: paymasterURL,
          },
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
        <div className="card-body">
          <h2 className="card-title text-3xl text-accent mb-2">Split ETH</h2>
          <EtherInput value={amount} onChange={setAmount} placeholder="Amount in ETH" />
          <div className="space-y-4 mt-4">
            {recipients.map((recipient, index) => (
              <div key={index} className="flex items-center space-x-2">
                <AddressInput
                  value={recipient.address}
                  placeholder="Recipient address"
                  onChange={value => handleAddressChange(index, value)}
                />
                <button
                  onClick={() => handleRemoveRecipient(index)}
                  className="btn btn-circle btn-sm btn-error"
                  disabled={recipients.length === 1}
                >
                  <MinusIcon className="size-[20px]" />
                </button>
              </div>
            ))}
            <button onClick={handleAddRecipient} className="btn btn-circle btn-sm btn-primary">
              <PlusIcon className="size-[20px]" />
            </button>
          </div>
          <div className="card-actions justify-end mt-6">
            <button
              className="btn btn-accent"
              onClick={handleSubmit}
              disabled={!amount || recipients.some(r => !r.address)}
            >
              Split ETH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenSplitterPage;
