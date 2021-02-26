import { SVD } from "svd-js";

/**
 * Global Function
 */
export default (context, inject) => {
  const getSummary = async content => {
    const sentences = await SplitIntoSentence(content);
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

    const { u, v, q } = await getSVD(tfIdfMatrix);
    const getSummary = await crossMethod(
      sentences,
      v,
      q,
      Math.ceil(sentences.length * 0.6)
    );

    /* Metode lain */
    // const scoreSentences = await getScoreSentences(tfIdfMatrix);
    // const treshold = await findAverageScore(scoreSentences);
    // const summary = await generateSummary(sentences, scoreSentences, treshold);

    return getSummary;
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
const SplitIntoSentence = async content => {
  const arraySentences = [];
  const sentences = content.split(".");
  sentences.forEach((element, i) => {
    if (i != 0) {
      element;
    }
  });
  for (let i = 0; i < sentences.length; i++) {
    const element = sentences[i];
    if (i != 0) {
      const beforeElement = sentences[i - 1];

      const pattern = new RegExp("[0-9]", "g");
      if (
        beforeElement.substring(beforeElement.length - 1).match(pattern) !=
          null &&
        element.substring(0, 1).match(pattern) != null
      ) {
        arraySentences[arraySentences.length - 1] += "." + element;
      } else if (element != "") {
        arraySentences.push(element);
      }
    } else {
      arraySentences.push(element);
    }
  }
  return arraySentences;
};
const create_Frequency_Matrix = async sentences => {
  const sastrawi = require("sastrawijs");

  const stemmer = new sastrawi.Stemmer();
  const tokenizer = new sastrawi.Tokenizer();

  let frequencyMatrix = [];

  for await (const sentence of sentences) {
    let stemmed = [];
    const words = tokenizer.tokenize(sentence);

    const sw = require("stopword");
    words.forEach(word => {
      stemmed.push(stemmer.stem(word));
    });

    const stopword = sw.removeStopwords(stemmed, sw.id);

    let freq_table = {};

    stopword.forEach(word => {
      if (Object.prototype.hasOwnProperty.call(freq_table, word) == true) {
        freq_table[word] += 1;
      } else {
        freq_table[word] = 1;
      }
      frequencyMatrix[sentence.substring(1, 15)] = freq_table;
    });
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

const getWords = async sentences => {
  const words = [];
  for await (const [indexSentence, sentence] of Object.entries(sentences)) {
    for await (const [indexword, word] of Object.entries(sentence)) {
      if (words.includes(indexword) == false) {
        words.push(indexword);
      }
    }
  }
  return words;
};

const getSVD = async sentences => {
  let inputSVD = new Array();

  const words = await getWords(sentences);

  let i = 0;
  for await (const word of words) {
    inputSVD[i] = new Array();
    for await (const [indexSentence, sentence] of Object.entries(sentences)) {
      if (indexSentence != "") {
        let exists = false;
        for await (const [indexWordInSentence, scoreWord] of Object.entries(
          sentence
        )) {
          if (word == indexWordInSentence) {
            exists = true;
            inputSVD[i].push(scoreWord);
          }
        }
        if (exists == false) {
          inputSVD[i].push(0);
        }
      }
    }
    i++;
  }

  return SVD(inputSVD);
};

const steinbergerAndJezek = async (sentences, vt, s, numberOfTopic) => {
  let summary = "";
  let s_square = [];
  let scores = [];
  s.forEach((element, index) => {
    if (index < numberOfTopic) {
      s_square.push(Math.pow(element, 2));
    } else {
      s_square.push(0);
    }
  });
  //transpose
  const v = vt[0].map((_, colIndex) => vt.map(row => row[colIndex]));
  v.forEach((element, index) => {
    let score = 0;
    //zip two array
    var joinArray = s_square.map(function(e, i) {
      // console.log(`${e} , ${element[i]}`);
      return [e, element[i]]; //ini cek bener apa gak
    });
    joinArray.forEach(element => {
      score += element[0] * Math.pow(element[1], 2);
    });
    scores.push(Math.sqrt(score));
  });
  //tambahkan index kalimat [0.372, 17] -> [score, index kalimat]
  let scoresWithIndex = [];
  scores.forEach((element, index) => {
    scoresWithIndex.push([element, index]);
  });
  //ubah urutan array dari angka terbesar ke angka terkecil
  const sortHighestScore = scoresWithIndex.sort(function(left, right) {
    return left[0] > right[0] ? -1 : 1;
  });

  // Potong jumlah kalimat yang dimasukkan kedalam ringkasan
  sortHighestScore.length = numberOfTopic;

  const sortIndexSentence = sortHighestScore.sort(function(left, right) {
    return left[1] > right[1] ? 1 : -1;
  });

  // Buat jadi paragraf utuh lagi
  sortIndexSentence.forEach(element => {
    //element[1] berisi index kalimat dan element[0] berisi score nya
    summary += sentences[element[1]] + ".";
  });

  return summary;
};
const crossMethod = async (sentences, vt, s, numberOfTopic) => {
  vt.forEach((element, indexElement, vt) => {
    const totalValue = element.reduce((a, b) => a + b);
    const length = element.length;
    const average = totalValue / length;

    vt[indexElement].forEach((value, indexValue, element) => {
      if (value < average) {
        element[indexValue] = 0;
      } else {
        element[indexValue] = element[indexValue];
      }
    });
  });
  return steinbergerAndJezek(sentences, vt, s, numberOfTopic);
};

/*  METODE LAIN */
// const getScoreSentences = async TF_IDF_Matrix => {
//   const sentenceValue = {};
//   TF_IDF_Matrix = Object.keys(TF_IDF_Matrix).map(e => ({
//     sentence: e,
//     freq_table: TF_IDF_Matrix[e]
//   }));
//   for (let i = 0; i < TF_IDF_Matrix.length; i++) {
//     let total_score_per_sentence = 0;
//     const sentence = TF_IDF_Matrix[i]["sentence"];
//     const count_words_in_sentence = Object.keys(TF_IDF_Matrix[i]["freq_table"])
//       .length; // count length property in object
//     for (const score of Object.values(TF_IDF_Matrix[i]["freq_table"])) {
//       total_score_per_sentence += score;
//     }
//     sentenceValue[sentence] =
//       total_score_per_sentence / count_words_in_sentence;
//   }
//   return sentenceValue;
// };
// const findAverageScore = async sentenceValue => {
//   let sumValues = 0;
//   for (const value of Object.values(sentenceValue)) {
//     if (
//       sumValues + value != Number.NaN &&
//       isNaN(sumValues + value) != true &&
//       typeof (sumValues + value != Number.NaN) != "undefined"
//     ) {
//       sumValues += value;
//     }
//   }
//   const average = sumValues / Object.keys(sentenceValue).length;
//   return average;
// };
// const generateSummary = async (sentences, sentenceValue, treshold) => {
//   let summary = "";
//   for (const sentence of sentences) {
//     for (const [key, value] of Object.entries(sentenceValue)) {
//       if (
//         key.includes(sentence.substring(1, 15)) &&
//         value >= treshold &&
//         sentence.length != 0
//       ) {
//         summary += sentence + ".";
//       }
//     }
//   }
//   return summary;
// };
