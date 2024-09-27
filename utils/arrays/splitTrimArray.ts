export const splitAndTrim = (input: string | undefined): string[] =>
  input?.split(',')?.map((item: string) => item.trim()) || []
