import * as natural from "natural";

/**
 * Global Function
 */
export default (context, inject) => {
  const getSummary = async content => {
    const sentences = content.split(".");
    const totalDocument = sentences.length;

    const frequencyMatrix = await create_Frequency_Matrix(sentences);
    const tfMatrix = await create_TF_Matrix(frequencyMatrix);
    const countDocumentPerWords = await createDocumentsPerWords(tfMatrix);
    const idfMatrix = await create_IDF_Matrix(
      frequencyMatrix,
      countDocumentPerWords,
      totalDocument
    );
    const tfIdfMatrix = await create_TF_IDF_Matrix(tfMatrix, idfMatrix);
    const scoreSentences = await getScoreSentences(tfIdfMatrix);
    const treshold = await findAverageScore(scoreSentences);
    const summary = await generateSummary(sentences, scoreSentences, treshold);

    return summary;
  };
  const translateMarkdown = async content => {};
  // Inject $summary(contentArticle) in Vue, context and store.
  inject("summary", getSummary);
  inject("translateMarkdown", translateMarkdown);
  // For Nuxt <= 2.12, also add 👇
  context.$summary = getSummary;
  context.$translateMarkdown = translateMarkdown;
};

/**
 * Local Function
 */
const create_Frequency_Matrix = async sentences => {
  let frequencyMatrix = [];

  //tokenize and stemming all sentence
  natural.StemmerId.attach();
  natural.LancasterStemmer.attach();
  let sentencesTokenizeAndStem = [];
  for await (const sentence of sentences) {
    let freq_table = {};
    sentencesTokenizeAndStem = sentence.tokenizeAndStem();
    for await (const word of sentencesTokenizeAndStem) {
      //   alert(`word : ${word}, sentence : ${sentencesTokenizeAndStem} `);
      if (Object.prototype.hasOwnProperty.call(freq_table, word) == true) {
        freq_table[word] += 1;
      } else {
        freq_table[word] = 1;
      }
    }
    frequencyMatrix[sentence.substring(1, 15)] = freq_table;
  }
  return frequencyMatrix;
};
const create_TF_Matrix = async frequencyMatrix => {
  let TF_Matrix = {};

  for (const [sentence, f_table] of Object.entries(frequencyMatrix)) {
    let tf_table = {};

    const count_words_in_sentence = Object.keys(f_table).length; //because f_table is object and not array, so you can count word with the count key in object.

    for (const [word, count] of Object.entries(f_table)) {
      tf_table[word] = count / count_words_in_sentence;
    }
    TF_Matrix[sentence] = tf_table;
  }
  return TF_Matrix;
};

const createDocumentsPerWords = async frequencyMatrix => {
  let wordPerDocTable = {};

  for (const freq_table of Object.values(frequencyMatrix)) {
    for (const word of Object.keys(freq_table)) {
      if (Object.prototype.hasOwnProperty.call(wordPerDocTable, word) == true) {
        wordPerDocTable[word] += 1;
      } else {
        wordPerDocTable[word] = 1;
      }
    }
  }
  return wordPerDocTable;
};
const create_IDF_Matrix = async (
  frequencyMatrix,
  countDocumentPerWords,
  totalDocument
) => {
  let idfMatrix = {};

  for (const [sentence, freq_table] of Object.entries(frequencyMatrix)) {
    let idfTable = {};

    for (const word of Object.keys(freq_table)) {
      idfTable[word] = Math.log10(
        totalDocument / parseFloat(countDocumentPerWords[word])
      );
    }
    idfMatrix[sentence] = idfTable;
  }
  return idfMatrix;
};

const create_TF_IDF_Matrix = async (TF_Matrix, IDF_Matrix) => {
  const TF_IDF_Matrix = {};
  // console.log(Object.values(IDF_Matrix.values(IDF_Matrix)));

  TF_Matrix = Object.keys(TF_Matrix).map(e => ({
    sentence: e,
    freq_table: TF_Matrix[e]
  }));
  IDF_Matrix = Object.keys(IDF_Matrix).map(e => ({
    sentence: e,
    freq_table: IDF_Matrix[e]
  }));

  for (let i = 0; i < TF_Matrix.length; i++) {
    const TF_IDF_Table = {};
    const sentence = TF_Matrix[i]["sentence"];

    for (const [word, value] of Object.entries(TF_Matrix[i]["freq_table"])) {
      TF_IDF_Table[word] = value * IDF_Matrix[i]["freq_table"][word];
    }
    TF_IDF_Matrix[sentence] = TF_IDF_Table;
  }
  return TF_IDF_Matrix;
};
const getScoreSentences = async TF_IDF_Matrix => {
  const sentenceValue = {};
  TF_IDF_Matrix = Object.keys(TF_IDF_Matrix).map(e => ({
    sentence: e,
    freq_table: TF_IDF_Matrix[e]
  }));
  for (let i = 0; i < TF_IDF_Matrix.length; i++) {
    let total_score_per_sentence = 0;
    const sentence = TF_IDF_Matrix[i]["sentence"];
    const count_words_in_sentence = Object.keys(TF_IDF_Matrix[i]["freq_table"])
      .length; // count length property in object
    for (const score of Object.values(TF_IDF_Matrix[i]["freq_table"])) {
      total_score_per_sentence += score;
    }
    sentenceValue[sentence] =
      total_score_per_sentence / count_words_in_sentence;
  }
  return sentenceValue;
};
const findAverageScore = async sentenceValue => {
  let sumValues = 0;
  for (const value of Object.values(sentenceValue)) {
    if (
      sumValues + value != Number.NaN &&
      isNaN(sumValues + value) != true &&
      typeof (sumValues + value != Number.NaN) != "undefined"
    ) {
      sumValues += value;
    }
  }
  const average = sumValues / Object.keys(sentenceValue).length;
  return average;
};
const generateSummary = async (sentences, sentenceValue, treshold) => {
  let summary = "";
  for (const sentence of sentences) {
    for (const [key, value] of Object.entries(sentenceValue)) {
      if (key.includes(sentence.substring(1, 15)) && value >= treshold) {
        summary += sentence + ". ";
      }
    }
  }
  return summary;
};
