interface GenerateMetadataOptions<T> {
  query: string;
  fn: (context: { queryKey: string[] }) => Promise<T>;
}

export const generatePageMetadata = async <T>({ query, fn }: GenerateMetadataOptions<T>) => {
  const queryKey: string[] = ['', query];

  return fn({ queryKey });
};
