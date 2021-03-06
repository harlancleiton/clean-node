export interface Hasher {
  make(payload: string): Promise<string>;
}
