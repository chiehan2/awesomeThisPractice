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

ConsultDict.prototype.showExplanation = function() {
  if (!this.matchedIndexes) {
    console.log('not search yet');
  }
  else {
    this.matchedIndexes.forEach(function(index) {
      console.log(this.dictionary[index]);
    }.bind(this));    // 利用之前存的 indexes 到字典 json 撈資料
  }
  return this;
};

var consultEnglishDict = new ConsultDict(englishDict);
consultEnglishDict.matchWords('a', ['','']).showExplanation().matchWords("b", ['^', '$']).showExplanation();