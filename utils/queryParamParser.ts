export const getParamAsInt = (
  queryParam: string | string[] | undefined,
  defaultValue: number,
) => {
  const num = parseInt(queryParam?.toString() ?? "")
  if (isNaN(num)) {
    return defaultValue
  }
  return num
}
