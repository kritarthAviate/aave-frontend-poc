## AAVE V2 poc application
This project is configured to run on Goerli network. View contract on [Goerli Etherscan](https://goerli.etherscan.io/address/0xdB96bbCf428f7b5b09448315E9E11a072CBAAdB0#code). Integrates AAVE V2 contract to deposit and withdraw ETH using WETH Gateway.

[Github repo link to contract](https://github.com/kritarthAviate/aave-poc)

## Limitations
AAVE V2 contract has issues with their `withdraw` functions sometimes.


## Set up
The hardhat config is set up to deploy it on Goerli or Goerli fork. 
- copy `.env.exmaple` contents to `.env.local` file and add the relevant keys. 

```
$yarn install
$yarn dev
```

## Tech Stack
- Javascript
- NextJS
- Tailwind
- ethers.js
- Moralis

## Wallets
- It currently only supports **Metamask**

