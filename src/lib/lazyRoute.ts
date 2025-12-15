export const lazyRoute =
  <T>(importFn: () => Promise<T>, componentName: keyof T) =>
  async () => {
    const module = await importFn();

    return { Component: module[componentName] };
  };
