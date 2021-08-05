var moment = require("moment");
var config = require("./../utility/config");
var ListenerStates = require("./../models/ListenerStates");

var asyncLoop = require("node-async-loop");
var utils = require("./../utility/utils");

var Client = require("node-rest-client").Client;
var client = new Client();

var ETHTokenTransferListener = function Constructor() { };

ETHTokenTransferListener.prototype.runCron = async function (callbackForCron) {
  try {
    const contractAddress = config.contractAddress;
    const tokenTransferAddress = config.tokenReceiverAddress;
    let listenerState = await ListenerStates.findOne({ 
      contractAddress, 
      networkId: config.web3Network 
    }).sort({ 'CreatedOnUTC': "desc" })
    if (!listenerState) {
      listenerState = new ListenerStates();
      listenerState.contractAddress = contractAddress;
      listenerState.ethBlockHeight = 0;
      listenerState.networkId = config.web3Network;
    }
    console.log(listenerState)

    const blockHeight = listenerState.ethBlockHeight;
    var url =
      `${config.ethCronLink}?module=account&action=tokentx` +
      "&contractaddress=" + contractAddress +
      "&address=" + tokenTransferAddress +
      "&startblock=" + blockHeight +
      "&sort=asc" +
      "&apikey=" + config.etherScanKey;
    console.log(url);
    client.get(url, function (data) {
      var eth_block_array = data.result;
      console.log("*****************ETH");
      console.log(eth_block_array);
      console.log("*****************");
      console.log(data.status)
      console.log(typeof data.status)
      if (parseInt(data.status) === 0) {
        return
      }
      else {
        console.log("else");
        if (eth_block_array !== undefined && eth_block_array != null && eth_block_array.length > 0) {
          console.log("eth_block_array");
          console.log(eth_block_array);
          processEthereumBlock(eth_block_array, listenerState, callbackForCron);
        } else {
          return
        }
      }
    });
  } catch (e) {
    console.log("It comes in error");
    console.log(e)
  }
}; //end of cron job
function processEthereumBlock(eth_block_array, listenerState, callbackForCron) {
  var blockHeight = listenerState.ethBlockHeight;
  asyncLoop(
    eth_block_array,
    function (item, next) {
      blockHeight = parseInt(item.blockNumber);
      if (item.value > 0 && item.from.toLowerCase() != config.tokenReceiverAddress.toLowerCase() && item.from) {
        processEthTransaction(item, next);
      } else {
        return
      }
    },
    function (err) {
      if (err) {
        console.log(err);
      }
      console.log("done")
      listenerState.ethBlockHeight = blockHeight + 1;
      listenerState.save(function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
        callbackForCron();
      });
    }
  );
}

async function processEthTransaction(tx, callback) {
  if (parseInt(tx.isError) == 1) {
    return callback();
  }
  let transaction = {};
  transaction.etherscanDetail = tx;
  transaction.sendingAddress = tx.from.toLowerCase();
  transaction.contractAddress = tx.contractAddress;
  transaction.txHash = tx.hash;
  transaction.tokenSymbol = tx.tokenSymbol;
  transaction.tokenName = tx.tokenName;
  transaction.tokenDecimal = tx.tokenDecimal;
  transaction.txDate = moment.unix(tx.timeStamp)
  transaction.tokens = transaction.tokenDecimal ? tx.value / (10 ** transaction.tokenDecimal) : tx.value;
  utils.processTransferTransaction(transaction, callback)
}
module.exports = ETHTokenTransferListener;
