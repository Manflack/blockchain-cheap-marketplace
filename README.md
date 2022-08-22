# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npm install
npm run clean
npm run chain
npm run deploy
npm run console
```

In order to execute the project, you need create .env file at root folder with the follows params:
`FIRST_ACCOUNT_PRIVATE_KEY="..."` private key of first account, exported ex. with metamask wallet.
`SECOND_ACCOUNT_PRIVATE_KEY="..."` private key of second account.

We can use console to interact with the contracts:
1. Create an object inside console:
    ```
    const GameItem = await ethers.getContractFactory('GameItem');
    const gameitem = await GameItem.attach(${GameItemAddress});
    ```
2. Generate the item for second account:
    ```
    gameItem.
    ```