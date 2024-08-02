interface ModifyUrlOptions {
  base: string;
  addQuery?: [string, string][];
  path?: string;
}

export function modifyUrl(options: ModifyUrlOptions): string {
  // addQueryがない場合[], pathがない場合はundefinedになる
  const { base, addQuery = [], path } = options;

  const url = new URL(base);

  if (path) {
    url.pathname = path;
  }

  addQuery.forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}
