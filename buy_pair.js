const ethers = require('ethers')

// setting list address
const addresses = {
	factory:'0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351' /* ROPSTEN UNISWAP CORE*/ ,
	weth:'0xc778417e063141139fce010982780140aa0cd5ab' /*WRAP ETHER (ETHER IN ERC20) IN ROPSTEN*/,
	recipient:'0x0b9A658E9145C052486975BF02B082AeA6d1929F',
  	router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' /*UNISWAP V2 ROUTER IN ROPSTEN*/,
}


/*
	------INFURA CONNECTIONS -----------
*/

// api key of infura
const PROJECT_ID_SECRET = ""

// creating a websocket connection to smart contract
const factoryWebSocket = new ethers.providers.WebSocketProvider(`wss://ropsten.infura.io/ws/v3/${PROJECT_ID_SECRET}`)

/*
	-------END OF INFURA CONNECTIONS ---------------
*/

/*
	------make script able to sign transactions automatically -----
*/

const mnemonic = ""
const wallet = ethers.Wallet.fromMnemonic(mnemonic)

// connecting wallet setted to the factorywebsocket calls
const account = wallet.connect(factoryWebSocket)
/*
	----end of signs transactions automatically ---------
*/

// parameters contract instance
/*
	1 = Address of the main contract factory
	2 = ABI of the contract, but in this case we only need
	to call a event so we can pass only it thanks to ethers.js technology.
	3 = Account which we are able to send transactions
*/
const factoryContractInstance = new ethers.Contract(
	addresses.factory,
	['event PairCreated(address token0, address token1, uint256 price)'],
	account
	)

/* --------- LISTEN TO EVENTS ----------*/
// instance.on() create a new listen object to constantly listen to events
factoryContractInstance.on("PairCreated", async (token0, token1, price_pair) => {
	console.log(`
		-------------
		NEW PAIR CREATED
		-------------
		TOKEN 0 = ${token0}
		TOKEN 1 = ${token1}
		INITIAL PRICE = ${price_pair}
		`)
})

/*  COMING SOON = LOGIC TO BUY NEW PAIR AND SELL IT LATER */