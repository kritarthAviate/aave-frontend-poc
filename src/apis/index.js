import axios from "axios";

export const getEthPrice = async () => {
  const config = {
    headers: {
      accept: "application/json",
    },
    params: { ids: "ethereum", vs_currencies: "usd" },
  };
  const bal = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    config
  );
  return bal;
};

export const getStakeEthEventFromBE = async () => {
  return await axios.get("/api/getStakeEthEvents");
};
