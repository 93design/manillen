
// var cardDeck = [['H1','H3','H3','H4','H5','H6','H7','H8','H9','H10','HJ','HQ','HK'],
// 			['D1','D3','D3','D4','D5','D6','D7','D8','D9','D10','DJ','DQ','DK'],
// 			['C1','C3','C3','C4','C5','C6','C7','C8','C9','C10','CJ','CQ','CK'],
// 			['S1','S3','S3','S4','S5','S6','S7','S8','S9','S10','SJ','SQ','SK']];


// var manillenDeck = [['H7','H8','H9','H10','HJ','HQ','HK'],
// 				['D7','D8','D9','D10','DJ','DQ','DK'],
// 				['C7','C8','C9','C10','CJ','CQ','CK'],
// 				['S7','S8','S9','S10','SJ','SQ','SK']];

 $deck = $('#deck');

var manillenDeck = [
					[['H','7','0'],['H','8','0'],['H','9','4'],['H','11','1'],['H','12','2'],['H','13','3'],['H','1','4'],['H','10','5']],
					[['D','7','0'],['D','8','0'],['D','9','4'],['D','11','1'],['D','12','2'],['D','13','3'],['D','1','4'],['D','10','5']],
					[['C','7','0'],['C','8','0'],['C','9','4'],['C','11','1'],['C','12','2'],['C','13','3'],['C','1','4'],['C','10','5']],
					[['S','7','0'],['S','8','0'],['S','9','4'],['S','11','1'],['S','12','2'],['S','13','3'],['S','1','4'],['S','10','5']]
				   ];


function cardsObj(suit,number,weight) {
		this.suit  = suit;
		this.number = number;
		this.weight = weight;
		this.troef = false;
}
// console.log(manillenDeck);


function makeDeck(array) {
	var newDeck = new Array();
	for (suits in array) {
		for (card in array[suits]) {
			var cardSuit = array[suits][card][0];
			var cardName = array[suits][card][1];
			var cardWeight= array[suits][card][2];
			var newCard = new cardsObj(cardSuit,cardName,cardWeight);
			newDeck.push(newCard);
		}
	}
	return newDeck;
}

function printDeck(deck) {
	var string = '';
	for (card in deck) {
		string = deck[card].suit + deck[card].number;
		$deck.append('<img id="cardObj" src="cards/' + string +'.svg" width="100px" height="200px"></img>');
	}

}

function stringDeck(deck) {
	var string = '';
	for (var i = deck.length - 1; i >= 0; i--) {
		string += deck[i].suit + deck[i].number; 
	};
	return string;
}

function shuffelDeck(array, times) {
	var response = array;
	for (var i = 0; i < times; i++) {
		console.log('shuffle');
		var rand = getRandomInt(0,array.length);
		var temp = array.slice(0, rand);
		var temp2 = array.slice(rand,array.length)
		temp.concat();
		response = temp2.concat(temp);
	};

	return response;

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dealDeckPart(array, players, aantal) {

		for (var i = 0; i <= players.length - 1 ; i++) {
		var begin = 0 + (3*i);
		var einde = 3 + (3*i);
		console.log(begin,einde);
		var slice = array.slice(begin,einde);
		var sliceString = [];
		for (var j = slice.length - 1; j >= 0; j--) {
			sliceString.push(slice[j]); 
		};
		playersTemp[i].cards.push(sliceString); 
		card++;
		console.log(sliceString);
	};
	ronde++;
	console.log(ronde, players);
	return array
}

function dealDeck(array,players, info) {
	console.log(array);
	console.log(players);
	var ronde = 0;
	var card = 0;   
	var playersTemp = players;

	console.log([array[0],array[1],array[1],array[1],array[1],array[1]]);
	
	players[0].cards = [array[0],array[1],array[2],array[12],array[13],array[20],array[21],array[22]];
	players[1].cards = [array[3],array[4],array[5],array[14],array[15],array[23],array[24],array[25]];
	players[2].cards = [array[6],array[7],array[8],array[16],array[17],array[26],array[27],array[28]];
	players[3].cards = [array[9],array[10],array[11],array[18],array[19],array[29],array[30],array[31]];
	

	//ronde 2
// 	for (var i = 0; i <= players.length - 1 ; i++)  {
// 		var begin = 12 + 0 + (2*i);
// 		var einde = 12 +  2 + (2*i);
// 		console.log(begin,einde);
// 		var slice = array.slice(begin,einde);
// 		var sliceString = [];
// 		 for (var j = 0; j < slice.length; j++) {
// 		 	sliceString.push(slice[j]);
// 		 };
// 		playersTemp[i].cards.push(sliceString); 
// 		card++;
// 		console.log(sliceString);
// 	};

// 	ronde++;
// 	console.log(ronde, players);
	
// 	//ronde 3
// 	for (var i = 0; i <= players.length - 1 ; i++)  {
// 		var begin = 20 + 0 + (3*i);
// 		var einde = 20 +  3 + (3*i);
// 		console.log(begin,einde);
// 		var slice = array.slice(begin,einde);
// 		var sliceString = [];
// 		 for (var j = 0; j < slice.length; j++) {
// 		 	sliceString.push(slice[j]);
// 		 };

// 		playersTemp[i].cards.push(sliceString); 
// 		card++;
// 		console.log(sliceString);
// 	};

// 	ronde++;
// 	console.log(ronde, players);

// 	return playersTemp;
// }

// function joinPlayerCards(players) {
// 	console.log(players);
// 	for (var i = 0; i < players.length; i++) {
// 		var cards = new Array();
// 		console.log(players[i]);
// 		for (var j = 0; j < players[i].cards.length; j++) {
// 			for (var k = 0; k < players[i].cards[j].length; k++) {
// 				cards.push(players[i].cards[j][k]);
// 				};
// 		};
// 		players[i].cards = cards;
// 	};
return players
}





// }

// console.log(cardDeck);




function toJSON(input) {
	this.response = $.stringyfy(input);
	return response;
}

function fromJSON (key) {
	this.obj = $.parseJSON();
	return obj;
}

function toLS(key, value) {
	this.entry = key;
	this.data = toJSON(value); 
	localStorage.setItem(key,value);
	console.log(key, 'was added tto LS');
}

function fromLS(key) {
	console.log(key, ' got from LS');
	this.data = localStorage.getItem(key);
	this.response = fromJSON(data);
	return response;
}

function clearLS () {
	clearlocalStorage();
	console.log('LS cleared');
}


	//buttons 
	$('');

	//div
	$('#cardRow').on('click', function (e) {
	
	});

	var $playerDiv = $(".player" );
	var $cardDeck = $(".cardDeck" );

	$cardDeck.on('click', function(e) {
		alert('card' + $card.id);
	});

	var $cardDeck = $(".cardDeck" );

	var manDeck= makeDeck(manillenDeck);
	var playerArray = makeNewPlayers(4);
	console.log(playerArray);

	function printPlayerCards(players,div) {
		console.log(div);
		for (var i = 0; i <= players.length - 1 ; i++) {
			var cardstring = ''
			for (var j = 0; j < players[i].cards.length; j++) {
				var printCard = players[i].cards[j].suit + players[i].cards[j].number;
				cardstring = cardstring + '<img id ="' + printCard + '" class="cardObj" src="cards/' + printCard +'.svg"></img>';			
			};
			div[i].innerHTML = cardstring;
		}	
	}
	manDeck = shuffelDeck(manDeck, 0);
	playerArray = dealDeck(manDeck,playerArray);
	printPlayerCards(playerArray, $cardDeck);

	var $cardObj = $(".cardObj" );

	$cardObj.on('click', function(e) {
		alert('card' + $cardObj.id);
	});

	var $shuffle = $('#shuffle');
	console.log($shuffle);

	$shuffle.on('click', function(e) {
		console.log('shuffle');
		playDeck2 = shuffelDeck(playDeck2, 4);
		playerArray = dealDeck(playDeck2,playerArray);
		printPlayerCards(playerArray, $cardDeck);
	});
	

function playerObj(name,number, cards) {
		this.playerName  = name;
		this.number = number;
		this.cards = new Array();
}

function makeNewPlayers(number) {
	var players = new Array();
	for (var i = number - 1; i >= 0; i--) {
		var obj = new playerObj('player', i, []);
		players[i] = obj;
	};
	console.log('test');

	return players;

}
function HistoryStats(){
	this.gamesPlayed = parseInt(fromJSON('gamesPlayed'), 10) || 0;
	this.gamesWon = parseInt(fromJSON('gamesWon'), 10) || 0;
	this.gamesLost = parseInt(fromJSON('gamesLost'), 10) || 0;
	this.handsWon = parseInt(fromJSON('handsWon'), 10) || 0;
	this.gamesQuit = parseInt(fromJSON('totalShots'), 10) || 0;
}

// Stats.prototype.incrementShots = function() {
// 	this.shotsTaken++;
// };
// Stats.prototype.hitShot = function() {
// 	this.shotsHit++;
// };
// Stats.prototype.wonGame = function() {
// 	this.gamesPlayed++;
// 	this.gamesWon++;
// 	if (!DEBUG_MODE) {
// 		ga('send', 'event', 'gameOver', 'win', this.uuid);
// 	}
// };
// Stats.prototype.lostGame = function() {
// 	this.gamesPlayed++;
// 	if (!DEBUG_MODE) {
// 		ga('send', 'event', 'gameOver', 'lose', this.uuid);
// 	}
// };
// // Saves the game statistics to localstorage, also uploads where the user placed
// // their ships to Google Analytics so that in the future I'll be able to see
// // which cells humans are disproportionately biased to place ships on.
// Stats.prototype.syncStats = function() {
// 	if(!this.skipCurrentGame) {
// 		var totalShots = parseInt(localStorage.getItem('totalShots'), 10) || 0;
// 		totalShots += this.shotsTaken;
// 		var totalHits = parseInt(localStorage.getItem('totalHits'), 10) || 0;
// 		totalHits += this.shotsHit;
// 		localStorage.setItem('totalShots', totalShots);
// 		localStorage.setItem('totalHits', totalHits);
// 		localStorage.setItem('gamesPlayed', this.gamesPlayed);
// 		localStorage.setItem('gamesWon', this.gamesWon);
// 		localStorage.setItem('uuid', this.uuid);
// 	} else {
// 		this.skipCurrentGame = false;
// 	}
	
// 	var stringifiedGrid = '';
// 	for (var x = 0; x < Game.size; x++) {
// 		for (var y = 0; y < Game.size; y++) {
// 			stringifiedGrid += '(' + x + ',' + y + '):' + mainGame.humanGrid.cells[x][y] + ';\n';
// 		}
// 	}

// 	if (!DEBUG_MODE) {
// 		ga('send', 'event', 'humanGrid', stringifiedGrid, this.uuid);
// 	}
// };
// // Updates the sidebar display with the current statistics
// Stats.prototype.updateStatsSidebar = function() {
// 	var elWinPercent = document.getElementById('stats-wins');
// 	var elAccuracy = document.getElementById('stats-accuracy');
// 	elWinPercent.innerHTML = this.gamesWon + " of " + this.gamesPlayed;
// 	elAccuracy.innerHTML = Math.round((100 * this.totalHits / this.totalShots) || 0) + "%";
// };
// // Reset all game vanity statistics to zero. Doesn't reset your uuid.
// Stats.prototype.resetStats = function(e) {
// 	// Skip tracking stats until the end of the current game or else
// 	// the accuracy percentage will be wrong (since you are tracking
// 	// hits that didn't start from the beginning of the game)
// 	Game.stats.skipCurrentGame = true;
// 	localStorage.setItem('totalShots', 0);
// 	localStorage.setItem('totalHits', 0);
// 	localStorage.setItem('gamesPlayed', 0);
// 	localStorage.setItem('gamesWon', 0);
// 	localStorage.setItem('showTutorial', true);
// 	Game.stats.shotsTaken = 0;
// 	Game.stats.shotsHit = 0;
// 	Game.stats.totalShots = 0;
// 	Game.stats.totalHits = 0;
// 	Game.stats.gamesPlayed = 0;
// 	Game.stats.gamesWon = 0;
// 	Game.stats.updateStatsSidebar();
// };
// Stats.prototype.createUUID = function(len, radix) {
// 	/*!
// 	Math.uuid.js (v1.4)
// 	http://www.broofa.com
// 	mailto:robert@broofa.com
// 	Copyright (c) 2010 Robert Kieffer
// 	Dual licensed under the MIT and GPL licenses.
// 	*/
// 	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
// 	uuid = [], i;
// 	radix = radix || chars.length;

// 	if (len) {
// 		// Compact form
// 		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
// 	} else {
// 		// rfc4122, version 4 form
// 		var r;

// 		// rfc4122 requires these characters
// 		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
// 		uuid[14] = '4';

// 		// Fill in random data.  At i==19 set the high bits of clock sequence as
// 		// per rfc4122, sec. 4.1.5
// 		for (i = 0; i < 36; i++) {
// 			if (!uuid[i]) {
// 				r = 0 | Math.random()*16;
// 				uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
// 			}
// 		}
// 	}

// 	return uuid.join('');
// };

//connection svg with JS


function boom() {
	
}
function Boomstats(){
	this.handsPlayed = parseInt(localStorage.getItem('handsPlayed'), 10) || 0;
	this.handsWon = parseInt(localStorage.getItem('handsWon'), 10) || 0;
	this.handsLost = parseInt(localStorage.getItem('handsLost'), 10) || 0;
	this.pointsWieder = parseInt(localStorage.getItem('pointsWieder'), 10) || 0;
	this.pointsZieder = parseInt(localStorage.getItem('pointsZieder'), 10) || 0;
	this.nextHandMultiplyer = parseInt(localStorage.getItem('nextHandMultiplyer'), 10) || 0;
	this.numBoom = parseInt(localStorage.getItem('numBoom'), 10) || 0;	
	this.totalPoint = parseInt(localStorage.getItem('totalPoint'), 10) || 0;
}

Boomstats.prototype.increaseBoom = function() { 
	this.numBoom++;
}


boom = new Boomstats();
console.log(boom);


