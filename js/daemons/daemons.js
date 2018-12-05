function delay(t) {
  return new Promise(function(resolve) {
    setTimeout(resolve, t)
  });
}

// PRICES VARIABLES
var crex24 = 0.00;
var orionx = 0.00;

// LUKA VARIABLES
var totalLukas = 0.00;
var height = 0;


async function runDaemonPrices() {

 // DAEMONS
 
 getGithubInfo();
 getLuKaInfoPHP();
 getPriceCrex();
 getPriceOrionx();



 await delay(15000);
 runDaemonPrices();
}



function getGithubInfo() {

  var req =  $.get('https://api.github.com/repos/cryptoluka/cryptoluka');
  var comm =  $.get('https://api.github.com/repos/cryptoluka/cryptoluka/commits?page=0');

  req.done(function(response) {

    $('#gitStar').html("<i class='fa fa-star'></i> " + response.stargazers_count);
    $('#gitFork').html(" <i class='fa fa-code-fork'></i>" + response.forks_count);
    $('#gitWatch').html(" <i class='fa fa-eye'></i> " + response.watchers_count);

  });


  req.fail(function(response) {
    console.log('No Github Info');
  });


  comm.done(function(response) {

    $('#commit_avatar').html("<img src='" + response[0].committer.avatar_url + "' />");
    $('#commit_message').text(response[0].commit.message);

  });


  comm.fail(function(response) {
    console.log('No Github Info');
  });



}



function getPriceCrex() {

  var req =  $.get('https://api.crex24.com/CryptoExchangeService/BotPublic/ReturnTicker?request=[NamePairs=BTC_LUK]');

  req.done(function(response) {

    // $('#price_luk').text(response.Tickers[0].Last + ' Ƀ');

    var percent = Number(response.Tickers[0].PercentChange);
    crex24 = response.Tickers[0].Last;
   
    $('#crexArrow').removeClass('fa-arrow-up');
    $('#crexArrow').removeClass('fa-arrow-down');

    if(percent > 0) {
      $('#crexArrow').addClass('fa-arrow-up');
      $('#crexPrice').html(crex24 + " <span class='percentPriceUp'>(+" + percent.toFixed(2) + "%)</span>");
    } else {
      $('#crexArrow').addClass('fa-arrow-down');
      $('#crexPrice').html(crex24 + " <span class='percentPriceDown'>(" + percent.toFixed(2) + "%)</span>");
    }
  });


  req.fail(function(response) {
    crex24 = 0.00;
  });

}

function getPriceOrionx() {

  var percent = 0.00;

  $('#orionxPrice').html('0.00000000' + " <span class='percentPriceDown'>(" + percent.toFixed(2) + "%)</span>");

}



function getLuKaInfo() {
  var info =  $.get('https://seed219.cryptoluka.cl/getinfo');
  var coin = $.get('https://seed219.cryptoluka.cl/gettotalcoins');

  info.done(function(response) {

    response = JSON.parse(response);

    $('#heightLuka').text(response.height);
    $('#totalTX').text(response.tx_count);
  });


  info.fail(function(response) {
    $('#heightLuka').text('No Info');
    $('#totalTX').text('No Info');
  });


  coin.done(function(response) {

    response = JSON.parse(response);
    totalLukas = response.alreadyGeneratedCoins;

    $('#totalLuka').text(totalLukas);
  });


  coin.fail(function(response) {
    $('#totalLuka').text('No Info');
  }); 


}

function getLuKaInfoPHP() {

  var req = $.get('external.php');

  req.done(function(response) {

    response = JSON.parse(response);

    $('#heightLuka').text(response.height);
    $('#totalLuka').text(response.coins);
    $('#totalTX').text(response.tx_count);
  });


  req.fail(function(response) {
    $('#heightLuka').text('No Info');
    $('#totalLuka').text('No Info');
    $('#totalTX').text('No Info');
  });


}








