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
]
