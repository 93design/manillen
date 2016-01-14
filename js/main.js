

	//buttons 
	$('');

	//div
	$('#cardRow').on('click', function (e) {
	
	});

	var $playerDiv = $(".player" ).on('click', function(e) {
		alert('test');
	});


	var playDeck2 = makeDeck(manillenDeck);
	var playerArray = makeNewPlayers(4);

	console.log(playerArray);


	playerArray = dealDeck(playDeck2,playerArray);
	console.log('dealed', playerArray);

	console.log(playerArray);
	console.log($playerDiv);

	function printPlayerCards(players,div) {
		console.log(div);
		for (var i = 0; i <= players.length - 1 ; i++) {
			var cardstring = ''
			for (var j = 0; j < players[i].cards.length; j++) {
				var printCard = players[i].cards[j].suit + players[i].cards[j].number;
				cardstring = cardstring + '<img id="cardObj" src="cards/' + printCard +'.svg"></img>';			
			};
			div[i].innerHTML = cardstring;
		}	
	}


	printPlayerCards(playerArray, $playerDiv);

	console.log(playDeck2);
	playDeck2 = shuffelDeck(playDeck2, 2);
	console.log(playDeck2);

	playerArray = dealDeck(playDeck2,playerArray);
	printPlayerCards(playerArray, $playerDiv);
