export function truncateString(value: string) {
  const substituto = 'X'
  let truncatedString = ''

  for (let i = 0; i < value?.length; i++) {
    if (Math.random() >= 0.8) {
      truncatedString += substituto
    } else {
      truncatedString += value[i]
    }
  }

  return truncatedString
}
