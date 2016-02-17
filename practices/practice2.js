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

var a = new search('a');

///////////////////////    call and apply

a.matchWords('any'); //    ['a', 'ab', 'ac', 'ad', 'ae', 'af ag', 'ah ai aj', 'ba'] 

function doubleSearch () {};

doubleSearch.prototype.doubleMatchWords = function(secondKeyword) { 
    // 以 keyword 'a' 的結果為基礎，輸入第二個 keyword 'b'
  var doubleMatchedWords = [];
  var reverseDoubleMatchIndexes = [];
  var firstMatchedWords = this.matchedWords;
  var regex = new RegExp(secondKeyword);
  for (i = 0; i < firstMatchedWords.length; i ++) {    
    var word = firstMatchedWords[i];
    var doubleMatchedWord = word.match(regex);
    if (doubleMatchedWord) {
      doubleMatchedWords.push(word);
      reverseDoubleMatchIndexes.push(i);
    };
  };
  console.log(doubleMatchedWords);    // ['ab', 'ba'], 有 'a' 和 'b' 的詞條
  this.reverseDoubleMatchIndexes = reverseDoubleMatchIndexes;
      // 記下 ['ab', 'ba'] 在 ['a', 'ab', 'ac', 'ad', 'ae', 'af ag', 'ah ai aj', 'ba'] 的位置
  return this;
};

var ab = new doubleSearch();
ab.doubleMatchWords.call(a, 'b');  

doubleSearch.prototype.explainReverseDoubleMatch = function(firstKeyword, secondKeyword) {
  this.reverseDoubleMatchIndexes.sort(function(a, b) {
    return b - a;
  });
  var reverseDoubleMatchWords = this.matchedWords;
  for (var i = 0; i < this.reverseDoubleMatchIndexes.length; i ++) {
    reverseDoubleMatchWords.splice(this.reverseDoubleMatchIndexes[i], 1);
  };
  console.log('The results of reverseDoubleMatchWords is : \n' 
    + reverseDoubleMatchWords    // a,ac,ad,ae,af ag,ah ai aj 是有 'a' 但沒有 'b' 的詞條
    + ', \nit means the words in the dictionary which match ' + firstKeyword 
    + ', but not match ' + secondKeyword + ' !');
};

ab.explainReverseDoubleMatch.apply(a, ['a', 'b']);