export const CHANNELER_ABI_MINT_AND_FRACTIONALIZE = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tokenURI",
        "type": "string",
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "guardian",
            "type": "address",
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string",
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string",
          },
          {
            "internalType": "uint256",
            "name": "cap",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "buyoutReserve",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "multiplier",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "timelock",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "sMaxNormalizedWeight",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "sMinNormalizedWeight",
            "type": "uint256",
          },
          {
            "internalType": "address[]",
            "name": "beneficiaries",
            "type": "address[]",
          },
          {
            "internalType": "uint256[]",
            "name": "shares",
            "type": "uint256[]",
          },
          {
            "internalType": "uint256",
            "name": "swapFeePercentage",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "issuanceReserve",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256",
          },
          {
            "internalType": "bool",
            "name": "buyoutFlash",
            "type": "bool",
          },
          {
            "internalType": "bool",
            "name": "issuanceFlash",
            "type": "bool",
          },
        ],
        "internalType": "struct IChanneler.FractionalizationData",
        "name": "data",
        "type": "tuple",
      },
    ],
    "name": "mintAndFractionalize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
] as const

export const VAULT_ABI_EVENT_FRACTIONALIZE = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "contract IERC721",
        "name": "collection",
        "type": "address",
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256",
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256",
      },
      {
        "indexed": false,
        "internalType": "contract sIERC20",
        "name": "sERC20",
        "type": "address",
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "broker",
        "type": "address",
      },
    ],
    "name": "Fractionalize",
    "type": "event",
  },
] as const

export const ISSUER_ABI_PRICE_OF = [
  {
    "inputs": [
      {
        "internalType": "contract sIERC20",
        "name": "sERC20",
        "type": "address",
      },
    ],
    "name": "priceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
] as const
