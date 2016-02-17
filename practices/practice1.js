var dictionary = [
  ['a', 'a\'s explanation'],
  ['ab', 'ab\'s explanation'],
  ['ac', 'ac\'s explanation'],
  ['ad', 'ad\'s explanation'],
  ['ae', 'ae\'s explanation'],
  ['af ag', 'af ag\'s explanation'],
  ['ah ai aj', 'ah ai aj\'s explanation'],
  ['b', 'b\'s explanation'],
  ['ba', 'ba\'s explanation'],
  ['bb', 'bb\'s explanation'],
  ['bc', 'bc\'s explanation'],
  ['bd', 'bd\'s explanation'],
  ['bf bg', 'bd\'s explanation'],
  ['bh bi bj', 'bh bi bj\'s explanation']
];

function search (input) {
  this.keyword = input;
};

search.prototype.matchWords = function (opt) {
  var matchedWords = [];
  var matchedIndexes = [];
  if (opt === 'head') {
  	var regex = new RegExp('^' + this.keyword);
  };
  if (opt === 'any') {
  	var regex = new RegExp(this.keyword);
  }; 
  if (opt === 'whole') {
  	var regex = new RegExp('^' + this.keyword + '$')
  };
  for (i = 0; i < dictionary.length; i ++) {
  	var word = dictionary[i][0];
  	var matchedWord = word.match(regex);
  	if (matchedWord) {
      matchedWords.push(word);
      matchedIndexes.push(i);
  	};
  };
  this.matchedWords = matchedWords;
  this.matchedIndexes = matchedIndexes;
  console.log(matchedWords);
  return this;
};

search.prototype.showExplanation = function() {
  if (!this.matchedIndexes) {
  	console.log('not search yet');
  	return this;
  };
  for (var i = 0; i < this.matchedIndexes.length; i ++) {
  	var index = this.matchedIndexes[i];
  	console.log(dictionary[index]);
  };
  return this;
}

var a = new search('a');
var b = new search('b');

a.matchWords('head').matchWords('any').matchWords('whole').showExplanation();
b.showExplanation();