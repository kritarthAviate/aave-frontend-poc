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

    const response = await Moralis.EvmApi.events.getContractEvents({
      chain: "0x5",
      topic:
        "0x6d3e5f2222ab57d0981e3ce9d7e33e36f0a1d9e4e7019cf3119af24dcc9083de",
      address: networkConfig.AAVE_POC_ADDRESS,
      abi: artifact.abi[2],
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.error(e);
  }
};

export default handler;
