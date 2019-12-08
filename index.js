const TestNetEGT = "0x692a70D2e424a56D2C6C27aA97D1a86395877b3A";
const EGT = "0x8e1b448ec7adfc7fa35fc2e885678bd323176e34";

const NodeUrl = "HTTP://127.0.0.1:8545";
//const NodeUrl = "https://mainnet.infura.io/v3/24d2c3590549486981b3d9261e658ff5"; // @todo write the HOST of Ethereum-Node

const ABI = [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "INITIAL_SUPPLY",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "paused",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_subtractedValue", "type": "uint256"}],
    "name": "decreaseApproval",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_addedValue", "type": "uint256"}],
    "name": "increaseApproval",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
    "anonymous": false,
    "inputs": [],
    "name": "Pause",
    "type": "event"
}, {"anonymous": false, "inputs": [], "name": "Unpause", "type": "event"}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "previousOwner", "type": "address"}, {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {
        "indexed": true,
        "name": "spender",
        "type": "address"
    }, {"indexed": false, "name": "value", "type": "uint256"}],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
        "indexed": true,
        "name": "to",
        "type": "address"
    }, {"indexed": false, "name": "value", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}];

function getTransactionReceiptMined(txHash) {
    const transactionReceiptAsync = function (resolve, reject) {
        web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
            if (error) {
                reject(error);
            } else if (receipt == null) {
                setTimeout(() => transactionReceiptAsync(resolve, reject), 500);
            } else {
                resolve(receipt);
            }
        });
    };
    return new Promise(transactionReceiptAsync);
};

async function initPayment(unityInstance) {
    const payETH = async function (amount, receiver) {
        try {
        	console.log("!!!! Pay ETH");
            const accounts = await web3.eth.getAccounts();
            const sender = accounts[0];
            console.log("!!!! Pay from " + sender);
            console.log("!!!! Pay to " + receiver);
            const txHash = await new Promise(function (resolve, rej) {
                web3.eth.sendTransaction({
                    to: receiver,
                    from: sender,
                    value: web3.utils.toWei(amount.toString()),
                }, function (err, res) {
                	console.log("!!!! error: " + err);
                    if (err) rej(err);
                    resolve(res)
                })
            });
            const receipt = await getTransactionReceiptMined(txHash);
            unityInstance.SendMessage('PaymentManager', 'OnReceipt');
            console.log("!!!! OnReceipt ");
        } catch (e) {
            unityInstance.SendMessage('PaymentManager', 'OnFail', 0);
            console.log("!!!! Error: " + e);
        }
    };

    const payEGT = async function (amount, receiver) {
        try {
            // const contract = new web3.eth.Contract(ABI, EGT, {});
            console.log("!!!! PAY EGT");
            const contract = new web3.eth.Contract(ABI, TestNetEGT, {});
            const accounts = await web3.eth.getAccounts();
            const sender = accounts[0];
            const txHash = await new Promise(function (resolve, rej) {
                contract.methods.transfer(receiver, web3.utils.toWei(amount.toString())).send({
                    from: sender,
                    gas: 100000,
                }, function (err, res) {
                    if (err) rej(err);
                    resolve(res)
                })
            });
            const receipt = await getTransactionReceiptMined(txHash);
            unityInstance.SendMessage('PaymentManager', 'OnReceipt');
        } catch (e) {
            unityInstance.SendMessage('PaymentManager', 'OnFail', 0);
        }
    };
    
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    unityInstance.SendMessage('PaymentManager', 'SetPlayerAddress', address);
    
    window.pay = payEGT;
    window.payETH = payETH;
}

function UnityProgress(unityInstance, progress) {
    if (!unityInstance.Module) return;
    if (progress === 1) {
        window.unityInstance = unityInstance;
        initPayment(unityInstance);
    }
}

window.addEventListener('load', async () => {
    const isMordenDappBrowser = window.ethereum;
    const isLegacyDappBrowser = window.web3;
    if (isMordenDappBrowser) {
        console.log("web3 type: Morden Dapp Browser");
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            UnityLoader.instantiate("unityContainer", UNITY_WEBGL_BUILD_URL, {onProgress: UnityProgress});
        } catch (error) {
            alert("User Denied Account Access");
        }
    } else if (isLegacyDappBrowser) {
        console.log("web3 type: Legacy Dapp Browser");
        window.web3 = new Web3(web3.currentProvider);
        UnityLoader.instantiate("unityContainer", UNITY_WEBGL_BUILD_URL, {onProgress: UnityProgress});
    } else {
        alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
});
