function Human() {
  this.speak = function() {
  	console.log(this);    // Human
  }
}

var human = new Human();

human.speak();