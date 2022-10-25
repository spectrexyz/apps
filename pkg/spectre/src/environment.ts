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

const zAddress = (name: string) =>
  z.string().transform(
    addressTransform(`VITE_ADDRESS_${name}`),
  )

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
  VITE_NFT_STORAGE_KEY: z.string().min(1),

  VITE_ADDRESS_SERC20: zAddress("VITE_ADDRESS_SERC20"),
  VITE_ADDRESS_SERC721: zAddress("VITE_ADDRESS_SERC721"),
  VITE_ADDRESS_VAULT: zAddress("VITE_ADDRESS_VAULT"),
  VITE_ADDRESS_BROKER: zAddress("VITE_ADDRESS_BROKER"),
  VITE_ADDRESS_ISSUER: zAddress("VITE_ADDRESS_ISSUER"),
  VITE_ADDRESS_SPLITTER: zAddress("VITE_ADDRESS_SPLITTER"),
  VITE_ADDRESS_POOLFACTORY: zAddress("VITE_ADDRESS_POOLFACTORY"),
  VITE_ADDRESS_CHANNELER: zAddress("VITE_ADDRESS_CHANNELER"),
}).parse(import.meta.env)

export const {
  VITE_CHAIN_ID: CHAIN_ID,
  VITE_DEMO_MODE: DEMO_MODE,
  VITE_INFURA_PROJECT_ID: INFURA_PROJECT_ID,
  VITE_NFT_STORAGE_KEY: NFT_STORAGE_KEY,

  VITE_ADDRESS_SERC20: ADDRESS_SERC20,
  VITE_ADDRESS_SERC721: ADDRESS_SERC721,
  VITE_ADDRESS_VAULT: ADDRESS_VAULT,
  VITE_ADDRESS_BROKER: ADDRESS_BROKER,
  VITE_ADDRESS_ISSUER: ADDRESS_ISSUER,
  VITE_ADDRESS_SPLITTER: ADDRESS_SPLITTER,
  VITE_ADDRESS_POOLFACTORY: ADDRESS_POOLFACTORY,
  VITE_ADDRESS_CHANNELER: ADDRESS_CHANNELER,
} = env
