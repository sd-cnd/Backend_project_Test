// let books = {
//       1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
//       2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
//       3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
//       4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
//       5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
//       6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
//       7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
//       8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
//       9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
//       10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
// }

// module.exports=books;

// The books object was missing isbn and comments were also empty. So, the books object has been modified a bit to make it better.

let books = {
      1: {
          "isbn": "9780141186887",
          "author": "Chinua Achebe",
          "title": "Things Fall Apart",
          "reviews": {
              "user1": "A compelling story of a man and his culture's struggle.",
              "user2": "An insightful look into the impact of colonialism."
          }
      },
      2: {
          "isbn": "9780141328030",
          "author": "Hans Christian Andersen",
          "title": "Fairy tales",
          "reviews": {
              "user3": "Timeless tales that enchant readers of all ages.",
              "user4": "A delightful collection of classic fairy tales."
          }
      },
      3: {
          "isbn": "9780142437223",
          "author": "Dante Alighieri",
          "title": "The Divine Comedy",
          "reviews": {
              "user5": "A profound journey through the realms of the afterlife.",
              "user6": "A masterpiece of world literature."
          }
      },
      4: {
          "isbn": "9780140441000",
          "author": "Unknown",
          "title": "The Epic Of Gilgamesh",
          "reviews": {
              "user7": "An ancient tale of heroism and friendship.",
              "user8": "A fascinating glimpse into early literature."
          }
      },
      5: {
          "isbn": "9780140449242",
          "author": "Unknown",
          "title": "The Book Of Job",
          "reviews": {
              "user9": "A profound exploration of faith and suffering.",
              "user10": "A thought-provoking biblical story."
          }
      },
      6: {
          "isbn": "9780140449389",
          "author": "Unknown",
          "title": "One Thousand and One Nights",
          "reviews": {
              "user11": "A mesmerizing collection of Middle Eastern stories.",
              "user12": "A rich tapestry of tales full of wonder."
          }
      },
      7: {
          "isbn": "9780140447699",
          "author": "Unknown",
          "title": "Njál's Saga",
          "reviews": {
              "user13": "An epic story of family and feuds in medieval Iceland.",
              "user14": "A captivating saga of honor and revenge."
          }
      },
      8: {
          "isbn": "9780141439518",
          "author": "Jane Austen",
          "title": "Pride and Prejudice",
          "reviews": {
              "user15": "A timeless romance with sharp social commentary.",
              "user16": "A delightful read full of wit and charm."
          }
      },
      9: {
          "isbn": "9780140449723",
          "author": "Honoré de Balzac",
          "title": "Le Père Goriot",
          "reviews": {
              "user17": "A powerful novel about ambition and social mobility.",
              "user18": "A poignant portrayal of Parisian society."
          }
      },
      10: {
          "isbn": "9780141180088",
          "author": "Samuel Beckett",
          "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
          "reviews": {
              "user19": "A challenging yet rewarding read, full of existential insights.",
              "user20": "A deeply introspective and philosophical work."
          }
      }
  };
  
  module.exports = books;
  