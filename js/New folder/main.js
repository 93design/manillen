

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
	
