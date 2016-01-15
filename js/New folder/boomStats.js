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

Boomstats.prototype.increaseBoom() { 
	this.numBoom++;
}


Boomstats.prototype.increaseBoom() { 
	this.numBoom++;
}
