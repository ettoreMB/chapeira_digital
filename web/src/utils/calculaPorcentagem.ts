export function calcularPercentual(n: number, total: number): String {
  const result = Math.floor((n * 100) / total)

  if (!result) {
    return `0 %`
  }

  return `${result} %`
}
