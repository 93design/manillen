
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

var playDeck = makeDeck(manillenDeck);


function printDeck(deck) {
	var string = '';
	for (card in deck) {
		string = deck[card].suit + deck[card].number;
		$deck.append('<img id="cardObj" src="cards/' + string +'.svg" width="100px" height="200px"></img>');
	}

}

printDeck(playDeck);

function stringDeck(deck) {
	var string = '';
	for (var i = deck.length - 1; i >= 0; i--) {
		string += deck[i].suit + deck[i].number; 
	};
	return string;
}

function shuffelDeck(array, times) {
	var response;
	for (var i = times - 1; i >= 0; i--) {
		var rand = getRandomInt(0,array.length);
		var temp = array.slice(0, rand);
		var temp2 = array.slice(rand,array.length)
		temp.concat();
		array = temp2.concat(temp);
	};

	return array;

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



