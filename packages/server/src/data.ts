import { WriteDescriptionData } from "@papillon/helpers/lib/types";

export const writeDescriptionQuestions: WriteDescriptionData[] = [
  {
    word: "Kreide",
    similarWords: ["Schreiben", "Tafel", "schwarz", "schwamm", "schule"],
    confusingWords: ["Tasse", "Toilettenpapier", "Stange"],
    englishSynonyms: ["Chalk"],
  },
  {
    word: "Mars",
    similarWords: ["Planet", "Sonnensystem", "Erde", "Wüste", "stein"],
    englishSynonyms: ["Mars"],
    confusingWords: ["Pickel", "Apfel", "Basketball"],
  },
  {
    word: "Förderband",
    similarWords: [
      "automation",
      "Maschine",
      "Fabrik",
      "Flughafen",
      "Industrie",
      "transport",
    ],
    confusingWords: ["Landeplatz", "Ski", "Rollbretts"],
    englishSynonyms: ["Conveyor belt"],
  },
];
