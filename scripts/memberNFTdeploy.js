const fs = require("fs");

const main = async () => {
    const addr1 = "0xfc6e27139611EE7154759884c93bfA4b60dF38f6";
    const addr2 = "0xe810290772B127f46A39D861d1236586a7575b46";
    const addr3 = "0xc94678EaF1914bD7Ca6112E8Dd85F68F984DBC11";

    const tokenURI1 = "https://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a.ipfs.w3s.link/metadata1.json"
    const tokenURI2 = "https://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a.ipfs.w3s.link/metadata2.json"
    const tokenURI3 = "https://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a.ipfs.w3s.link/metadata3.json"
    const tokenURI4 = "https://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a.ipfs.w3s.link/metadata4.json"
    const tokenURI5 = "https://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a.ipfs.w3s.link/metadata5.json"


    //deploy

    MemberNFT = await ethers.getContractFactory("MemberNFT");
    memberNFT = await MemberNFT.deploy();
    await memberNFT.deployed();

    console.log(`Contract deployed: https://sepolia.etherscan.io/address/${memberNFT.address}`)

    // NFTをmintする
    let tx = await memberNFT.nftMint(addr1, tokenURI1);
    await tx.wait();
    console.log("NFT#1 minted...");
    tx = await memberNFT.nftMint(addr2, tokenURI2);
    await tx.wait();
    console.log("NFT#2 minted...");
    tx = await memberNFT.nftMint(addr2, tokenURI3);
    await tx.wait();
    console.log("NFT#3 minted...");
    tx = await memberNFT.nftMint(addr2, tokenURI4);
    await tx.wait();
    console.log("NFT#4 minted...");

    //　コントラクトアドレスの書き出し
    fs.writeFileSync("./memberNFTContract.js",
    `
    module.exports = "${memberNFT.address}"
    `
    );

}

const memberNFTDeploy = async () => {
    try{
        await main();
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

memberNFTDeploy();
