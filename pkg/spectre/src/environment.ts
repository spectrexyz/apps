export const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID ?? 1)

export const DEMO_MODE = Boolean(
  parseInt(
    String(import.meta.env.VITE_DEMO_MODE) || "0",
    10,
  ),
)

export const INFURA_PROJECT_ID = String(
  import.meta.env.VITE_INFURA_PROJECT_ID,
) || null

export const SUBGRAPH_ENDPOINT = String(
  import.meta.env.VITE_SUBGRAPH_ENDPOINT,
) || null

export const NFT_STORAGE_KEY = String(
  import.meta.env.VITE_NFT_STORAGE_KEY,
) || null

export const CHANNELER_ADDRESS = String(import.meta.env.VITE_CHANNELER_ADDRESS)
export const SERC721_ADDRESS = String(import.meta.env.VITE_SERC721_ADDRESS)
export const ERC1155_ADDRESS = String(import.meta.env.VITE_ERC1155_ADDRESS)
