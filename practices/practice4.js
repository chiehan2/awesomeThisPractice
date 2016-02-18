var englishDict = [
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

function ConsultDict (dictionary) {
  this.dictionary = dictionary;
}

function matchWord (wordInformation) {
  var word = wordInformation[0];
  if (word.match(this.regex)) {
    return word;
  }
}

function matchIndex (wordInformation, index) {
  var word = wordInformation[0];
  if (word.match(this.regex)) {
    return index;
  }
}

function filterUndefined (value) {
  return undefined !== value;
}

ConsultDict.prototype.matchWords = function (keyword, matchType) {
  this.keyword = keyword;
  this.regex = new RegExp(matchType[0] + this.keyword + matchType[1]);

  this.matchedWords = this.dictionary.map(matchWord.bind(this)).filter(filterUndefined);    // 定義符合搜尋條件的詞條
  this.matchedIndexes = this.dictionary.map(matchIndex.bind(this)).filter(filterUndefined);    // 定義這些符合的詞條在字典的位置

  console.log(this.matchedWords);
  return this;
};

var consultEnglishDict = new ConsultDict(englishDict);

///////////////////////    call and apply

consultEnglishDict.matchWords('a', ['','']); //    ['a', 'ab', 'ac', 'ad', 'ae', 'af ag', 'ah ai aj', 'ba'] 

function DoubleConsultDict () {}

function doubleMatchWord (word) {
  if (word.match(this.secondKeyword)) {
    return word;
  }
}

function doubleMatchIndex (word, index) {
  if (word.match(this.secondKeyword)) {
    return index;
  }
}

DoubleConsultDict.prototype.doubleMatchWords = function(secondKeyword) {
    // 以 keyword 'a' 的結果為基礎，輸入第二個 keyword 'b'
  this.secondKeyword = secondKeyword;
  this.firstMatchedWords = this.matchedWords;

  this.doubleMatchedWords = this.firstMatchedWords.map(doubleMatchWord.bind(this)).filter(filterUndefined);
  this.doubleMatchedIndexes = this.firstMatchedWords.map(doubleMatchIndex.bind(this)).filter(filterUndefined);

  console.log(this.doubleMatchedWords);    // ['ab', 'ba'], 有 'a' 和 'b' 的詞條
  console.log(this.doubleMatchedIndexes);
      // ['ab', 'ba'] 在 ['a', 'ab', 'ac', 'ad', 'ae', 'af ag', 'ah ai aj', 'ba'] 的位置
  return this;
};

var doubleConsultDict = new DoubleConsultDict();
doubleConsultDict.doubleMatchWords.call(consultEnglishDict, 'b');  

DoubleConsultDict.prototype.explainReverseDoubleMatch = function(firstKeyword, secondKeyword) {
  this.doubleMatchedIndexes.sort(function(a, b) {
    return b - a;
  });

  var reverseDoubleMatchWords = this.firstMatchedWords;
  this.doubleMatchedIndexes.map(function(index) {
    reverseDoubleMatchWords.splice(index, 1);
  });    // reverseDoubleMatchWords : a,ac,ad,ae,af ag,ah ai aj; 是有 'a' 但沒有 'b' 的詞條

  console.log('The results of reverseDoubleMatchWords is : \n' + reverseDoubleMatchWords +
    ', \nit means the words in the dictionary which match ' + firstKeyword + ', but not match ' + secondKeyword + ' !');
};

doubleConsultDict.explainReverseDoubleMatch.apply(consultEnglishDict, ['a', 'b']);