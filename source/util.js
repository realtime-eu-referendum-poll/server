export const capitalizeWords = sentence =>
  sentence.replace(/(?:^|\s)\S/g, match => match.toUpperCase())
