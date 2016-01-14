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