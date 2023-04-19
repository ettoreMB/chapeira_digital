export function somaResultados(arr: any[], key: string) {
  const total = arr?.reduce((acc = 0, obj: any) => {
    acc = acc + obj[key]
    return acc
  }, 0)
  return total
}
