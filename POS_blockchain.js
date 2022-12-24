const  SHA256 = require('crypto-js/sha256')
const prompt = require("prompt-sync")({ sigint: true });
class Block
{
    constructor(index, timestamp, data, prevHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = '';
        this.hash = this.calculateHash()
    }

    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    hasValidTransactions()
    {
        for(const tx of this.transactions)
        {
            if(!tx.isValid())
            {
                return false;
            }
        }

        return true;
    }
}

class Blockchain
{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.i
    }
    createGenesisBlock()
    {
       var today = new Date();
       return new Block(0,today.toLocaleString(),"Genesis block", "0");
    }

    getNewBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock)
    {
        newBlock.prevHash = this.getNewBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid()
    {
        for(let i=1;i < this.chain.length; i++){
            const presentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if(presentBlock.hash != presentBlock.calculateHash()){
                return false;
            }

            if(presentBlock.prevHash != prevBlock.hash){
                return false;
            }
        }
        return true;

}
}
class Transaction
{
    constructor(fromAddress, toAddress, amount, attachedMessage){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.attachedMessage = attachedMessage;
    }
    addTransaction(transaction)
    {
        if(!transaction.fromAddress || !transaction.toAddress)
        {
            console.log('Transaction must include from and to address!');
        }
        else if(!transaction.isValid())
        {
            console.log('Cannot add invalid transaction to chain!')
        }
        else if(transaction.amount >= this.getBalanceOfAddress(transaction.fromAddress))
        {
            console.log("Not enough funds in account! ", transaction.fromAddress)
        }
        else
        {
           transactions.push(transaction);
        }
    }

    getBalanceOfAddress(address)
    {
        let balance = 0;

        for(const block of block.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress == address)
                {
                    balance -= trans.amount;
                }

                if(trans.toAddress == address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid()
    {
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

            if(!currentBlock.hasValidTransactions()){
                return false;
            }
        }
        calculateHash()
        {
        return SHA256(this.index+this.timestamp + this.prevHash + JSON.stringify(this.transactions)).toString();
    }
 
 }
}

let myblock = new Blockchain();
function viewBlockchain()
{
    console.log(JSON.stringify(myblock, null, 4))
}


acc_holders = []
pending_transactions = []
allowed_validators=[]
index = 1
chosenvalidator = 0
function viewTransactions()
{
    console.log(pending_transactions)
}
function createAccount()
{
    d = new Date()
    const name= prompt("Enter name: ");
    const username=prompt("Enter username: ");
    const password=prompt("Enter your password: ");
    const eth = prompt("Enter no. of ethers: ");
    myblock.addBlock(new Block( index, d.toLocaleString(), {"amount": eth}));
    index+=1
    acc_holders.push({"index" : index, "name": name, "username": username, "password": password, "ethers": eth})
}


function UserMenu(user)
{
    k = 1
    do
    {
        var i = 1;
        console.log("1. Initiate Transaction\n2. Validate Blockchain\n3. Log Out\n")
        i = prompt();
        switch(parseInt(i))
        {
            case 1: console.log("Enter Transaction details: ");
                    fromAddress = user.index;
                    toAddress = prompt("Enter toAddress (index): ")
                    amount = prompt("Enter Amount: ")
                    attachedMessagetransactions = prompt("Enter attachedMessagetransactions: ")
                    var t = {"fromAddress": fromAddress, "toAddress": toAddress, "amount": amount, "attachedMessagetransactions": attachedMessagetransactions}
                    pending_transactions.push(t);
                    console.log("\nTransaction request added to queue.\n")
                    break;
            case 2: let val_users = allowed_validators.map(a => a.user);
                    var flag = 0
                    for(i =0; i<val_users.length; i++)
                    {
                        if(user == val_users[i])
                            flag = 1
                    }
                    if(flag)
                    {
                        validate(user);
                    }
                    else
                    {
                        console.log("You are presently not a validator..Become Validator? (Y/N) ")
                        y = prompt();
                        if(y == 'Y')
                            become_validator(user);
                        else
                            break;
                    }
                    break;
            
                    case 3: return start();
            default: k = 0; break;
        }
    }while(k);
}

function validate(user)
{
    if(chosenvalidator == user.index)
    {
        console.log("Pending Transactions: ",viewTransactions())
        console.log("Validate Transactions: ")
        for(i = 0; i<transactions.length; i++)
        {
            if(transactions[i].isValid)
            from = transactions[i].fromAddress
            to = transactions[i].toAddress
            acc_holders[from].ethers = transactions[i].getBalanceOfAddress(from)
            acc_holders[to].ethers = transactions[i].getBalanceOfAddress(to)
        }

    }
    else
    {
        console.log("\nYou are not the chosen validator.\n")
    }
}

function login()
{
    var i;
    const username=prompt("Enter username: ");
    for( i =0; i < acc_holders.length; i++)
    {
        if(username == acc_holders[i].username)
        {
            const password=prompt("Enter your password: ");
            if(password == acc_holders[i].password)
            {
                console.log("\nLogin Successful!\n")
                UserMenu(acc_holders[i]);
                break;
            }
            else
            {
                console.log("Invalid Password\n")
                break;
            }
        }
    }
    if(i == acc_holders.length)
    {
        console.log("\n Invalid username\n")
    }
}

function start()
{
    k = 1
    do
    {
        var i = 1;
        console.log("\nWelcome to Blockchain!\n1. Create Account\n2. Log in\n3. View Blockchain\n4. Choose Validator\n5. View Blockchain status\n6. View Transactions\n\nEnter a choice: ")
        i = prompt();
        switch(parseInt(i))
        {
            case 1:  createAccount(); break;
            case 2: login(); break;
            case 3: viewBlockchain(); break;
            case 4: choose_validator(); break;
            case 5: console.log(myblock.isChainValid()); break;
            case 6: console.log("\nPending Transactions:\n");
                    viewTransactions();
                    break;
            default: k = 0; break;
        }
    }while(k);
}
function become_validator(user)
{  
    if (user["ethers"]>5)
    {
        console.log("You are allowed to become a validator.");
        const stake=prompt("How much stake do you want to put?");
        if (stake>(user["ethers"]-5))
        {
            console.log("Invalid stake amount entered.\n");
        }
        else
            allowed_validators.push({"user":user,"stake":stake});
    }
    else
    {
        console.log("You are not allowed to become a validator.\n");

    }
}
function choose_validator()
{
    if(pending_transactions.length>0)
    {
        anything=[]
        var sum=allowed_validators.reduce((min, p) => p.stake+min,0);
        var avg=sum/allowed_validators.length;
        for (i=0;i<allowed_validators.length;i++)
        {
            for (j=0;j<allowed_validators[i].stake/avg;j++)
            anything.push(allowed_validators[i])
        }
        const random = Math.floor(Math.random() * allowed_validators.length);
        console.log("\nChosen Validator: ", anything[random].user)
        choosenvalidator = anything[random].index
        return anything[random];
    }
    else
    {
        console.log("\nBlockchain has no pending transactions.\n")
    }
}
start()