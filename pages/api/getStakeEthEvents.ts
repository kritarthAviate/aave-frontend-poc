import Moralis from "moralis";
import artifact from "../../src/utils/artifact.json";
import { networkConfig } from "../../src/utils/constants";

const handler = async (req, res) => {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      });
    }

    const response1 = await Moralis.EvmApi.events.getContractEvents({
      chain: "0x5",
      topic:
        "0x12b07dc802b9024f3b9a0d0f713e98fb2f2cd379060499a9bb717fbe04c6530b",
      address: networkConfig.AAVE_POC_ADDRESS,
      abi: artifact.abi[1],
    });
    // add type of StakeETH to the response
    const jsonResponse1 = response1.toJSON().result.map((event) => {
      return { ...event, type: "StakeETH" };
    });
    const response2 = await Moralis.EvmApi.events.getContractEvents({
      chain: "0x5",
      topic:
        "0x6d3e5f2222ab57d0981e3ce9d7e33e36f0a1d9e4e7019cf3119af24dcc9083de",
      address: networkConfig.AAVE_POC_ADDRESS,
      abi: artifact.abi[2],
    });
    // add type of WithdrawETH to the response
    const jsonResponse2 = response2.toJSON().result.map((event) => {
      return { ...event, type: "WithdrawETH" };
    });

    res.status(200).json({ events: [...jsonResponse1, ...jsonResponse2] });
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.error(e);
  }
};

export default handler;
