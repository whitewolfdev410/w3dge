import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Loader2, Wallet } from "lucide-react";

import { ethers } from "ethers";

import ERC20_ABI from "../../blockchain/abi.json";
import { useEthersSigner } from "../../blockchain/ethers";

import { useAccount } from "wagmi";
import { toast } from "react-toastify";

// Simulate backend delays and responses
const mockBackendCalls = {
  async getStakingDetails() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      stakingWallet: import.meta.env.VITE_STAKING_WALLET,
      tokenAddress: import.meta.env.VITE_TOKEN_ADDRESS,
    };
  },
};

const StakingPanel = ({
  amountStake,
  typePool,
  staked,
  setHandleStaked,
}: {
  amountStake: any;
  typePool: any;
  staked: boolean;
  setHandleStaked: any;
}) => {
  const [amount, setAmount] = useState(amountStake);
  const pools = [
    { id: "2%", name: "2% APY Pool", minStake: 500 },
    { id: "3%", name: "3% APY Pool", minStake: 800 },
    { id: "5%", name: "5% APY Pool", minStake: 1000 },
    { id: "10%", name: "10% APY Pool", minStake: 2000 },
  ];
  const [selectedPool, setSelectedPool] = useState<any>(
    pools.find((pool) => pool.id === typePool)
  );
  const [isStaking, setIsStaking] = useState<boolean>(staked);
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-lg absolute left-[37%] z-[1]">
      <div className="text-2xl font-bold text-gray-800 mb-6">Stake Tokens</div>

      {/* Pool Selection */}
      <div className="grid grid-cols-2 gap-4">
        {pools.map((pool) => (
          <button
            key={pool.id}
            onClick={() => setSelectedPool(pool)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedPool?.id === pool.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <div className="font-semibold text-lg">{pool.name}</div>
            <div className="text-sm text-gray-600">
              Min Stake: {pool.minStake.toLocaleString()} tokens
            </div>
          </button>
        ))}
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Amount to Stake
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter amount"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">tokens</span>
          </div>
        </div>
      </div>

      {/* Validation Messages */}
      {selectedPool && amount && (
        <div className="text-sm">
          {Number(amount) < selectedPool.minStake ? (
            <div className="text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Minimum stake is {selectedPool.minStake} tokens for this pool
            </div>
          ) : (
            <div className="text-green-500 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Amount meets minimum stake requirement
            </div>
          )}
        </div>
      )}

      {/* Staking Transaction Flow */}
      {isStaking ? (
        <StakingTransaction
          amount={Number(amount)}
          poolId={selectedPool.id}
          onComplete={() => setIsStaking(false)}
          onError={() => setIsStaking(false)}
          setHandleStaked={setHandleStaked}
        />
      ) : (
        <button
          onClick={() => setIsStaking(true)}
          disabled={
            !selectedPool ||
            !amount ||
            Number(amount) < (selectedPool?.minStake || 0)
          }
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Start Staking
        </button>
      )}
    </div>
  );
};

const StakingTransaction = ({
  amount,
  poolId,
  onComplete,
  onError,
  setHandleStaked,
}: {
  amount: number;
  poolId: string;
  onComplete: any;
  onError: any;
  setHandleStaked: any;
}) => {
  const [status, setStatus] = useState("initial");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const steps = [
    { id: "initial", label: "Preparing Transaction", progress: 0 },
    { id: "connecting", label: "Connecting Wallet", progress: 20 },
    { id: "approval", label: "Awaiting Approval", progress: 40 },
    { id: "confirming", label: "Confirming Transaction", progress: 60 },
    { id: "processing", label: "Processing Stake", progress: 80 },
    { id: "complete", label: "Staking Complete", progress: 100 },
  ];
  const signer = useEthersSigner();
  const { address } = useAccount();
  const verifyAndProcessStaking = async (
    amount: any,
    poolId: string,
    hashTx: string
  ) => {
    const apiUrl =
      "https://gygxr53i33.execute-api.ap-southeast-2.amazonaws.com/Prod/ButtonStake";
    const data = {
      wallet_id: address,
      pool_id: poolId,
      value: amount,
      transactionHash: hashTx,
    };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      console.log("here is response:::0", jsonResponse);
      if (!response.ok) {
        toast.error("Error to stake: " + jsonResponse);
      } else {
        toast.success("Staking successful!");
      }
      setHandleStaked(false);
    } catch (error: any) {
      toast.error(`An error occurred: ${error.message}`);
      setHandleStaked(false);
    }
  };
  const sendToken = async () => {
    try {
      const tokenContract = new ethers.Contract(
        import.meta.env.VITE_TOKEN_ADDRESS as string,
        ERC20_ABI,
        signer
      );

      const amountToSend = ethers.parseUnits(amount.toString(), 18); // Adjust decimals as per token
      const tx = await tokenContract.transfer(
        import.meta.env.VITE_STAKING_WALLET,
        amountToSend
      );
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        return receipt;
      } else {
        console.error("Transaction failed:", receipt);
        alert("Transaction failed.");
      }
      return tx;
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };

  // Simulate the full staking flow
  useEffect(() => {
    const simulateStakingFlow = async () => {
      try {
        // Initial setup
        setStatus("initial");
        await new Promise((r) => setTimeout(r, 1000));

        // Connect wallet
        setStatus("connecting");
        await new Promise((r) => setTimeout(r, 1000));
        // Approval step
        setStatus("approval");
        await new Promise((r) => setTimeout(r, 2000));
        const transaction = await sendToken();
        // Confirm transaction
        setStatus("confirming");
        const mockTxHash = transaction.hash;
        await verifyAndProcessStaking(amount, poolId, mockTxHash);
        await new Promise((r) => setTimeout(r, 2000));

        // Process stake
        setStatus("processing");

        // Complete
        setStatus("complete");
        if (onComplete) onComplete();
      } catch (err: any) {
        setError(err?.message);
        setStatus("error");
        if (onError) onError(err);
      }
    };

    if (signer) {
      simulateStakingFlow();
    }
  }, [signer]);

  // Update progress based on status
  useEffect(() => {
    const currentStep = steps.find((step) => step.id === status);
    if (currentStep) {
      setProgress(currentStep.progress);
    }
  }, [status]);

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              {status === "complete" ? "Complete" : "In Progress"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
          />
        </div>
      </div>

      {/* Status Message */}
      <div className="flex items-center justify-center gap-3 text-gray-600">
        {status === "error" ? (
          <AlertCircle className="text-red-500 animate-pulse" />
        ) : status === "complete" ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <Loader2 className="animate-spin text-blue-500" />
        )}
        <span className="font-medium">
          {steps.find((step) => step.id === status)?.label || "Processing..."}
        </span>
      </div>

      {/* Transaction Details */}
      {status !== "error" && status !== "initial" && (
        <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">
              {amount.toLocaleString()} tokens
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pool:</span>
            <span className="font-medium">{poolId} APY Pool</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  );
};

export default StakingPanel;
