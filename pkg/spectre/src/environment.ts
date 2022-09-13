import type { RefinementCtx } from "zod"

import { isAddress } from "moire"
import { z } from "zod"

const addressTransform = (envName: string) =>
  (value: string, ctx: RefinementCtx) => {
    if (!isAddress(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${envName} is not a valid contract address`,
      })
      return z.NEVER
    }
    return value
  }

const env = z.object({
  VITE_CHAIN_ID: z.string().min(1).transform((value, ctx) => {
    const chainId = parseInt(value, 10)

    if (isNaN(chainId) || chainId <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "VITE_CHAIN_ID is not a number greater than 0",
      })
      return z.NEVER
    }

    return chainId
  }),
  VITE_DEMO_MODE: z
    .union([z.literal("0"), z.literal("1")])
    .default("0")
    .transform((value) => Boolean(parseInt(String(value), 10))),
  VITE_INFURA_PROJECT_ID: z.string().min(1),
  VITE_SUBGRAPH_ENDPOINT: z.string().url(),
  VITE_NFT_STORAGE_KEY: z.string().min(1),
  VITE_CHANNELER_ADDRESS: z.string().transform(
    addressTransform("VITE_CHANNELER_ADDRESS"),
  ),
  VITE_SERC721_ADDRESS: z.string().transform(
    addressTransform("VITE_SERC721_ADDRESS"),
  ),
  VITE_ERC1155_ADDRESS: z.string().transform(
    addressTransform("VITE_ERC1155_ADDRESS"),
  ),
}).parse(import.meta.env)

export const {
  VITE_CHAIN_ID: CHAIN_ID,
  VITE_DEMO_MODE: DEMO_MODE,
  VITE_INFURA_PROJECT_ID: INFURA_PROJECT_ID,
  VITE_SUBGRAPH_ENDPOINT: SUBGRAPH_ENDPOINT,
  VITE_NFT_STORAGE_KEY: NFT_STORAGE_KEY,
  VITE_CHANNELER_ADDRESS: CHANNELER_ADDRESS,
  VITE_SERC721_ADDRESS: SERC721_ADDRESS,
  VITE_ERC1155_ADDRESS: ERC1155_ADDRESS,
} = env
