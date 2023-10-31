function listWordOccurrences(words) {
  const wordFrequency = {};

  words.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  const wordFrequencyArray = Object.keys(wordFrequency).map((word) => ({
    word,
    frequency: wordFrequency[word],
  }));

  wordFrequencyArray.sort((a, b) => b.frequency - a.frequency);

  const sortedWordsWithCount = wordFrequencyArray.map((item) => `${item.word} (${item.frequency})`);

  return sortedWordsWithCount;
}



module.exports = { listWordOccurrences }
