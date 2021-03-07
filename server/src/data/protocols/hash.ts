export interface Hash {
  make(payload: string): Promise<string>;
}
