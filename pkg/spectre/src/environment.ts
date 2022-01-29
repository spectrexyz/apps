export const CHAIN_ID: number = Number(import.meta.env.VITE_CHAIN_ID ?? 1)
export const INFURA_PROJECT_ID: string | null =
  String(import.meta.env.VITE_INFURA_PROJECT_ID) || null
