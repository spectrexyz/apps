import zustand from "zustand"
import { Address, Direction, isEmail } from "kit"

export type FileType = "image" | "video" | "audio"

export type FieldError = string
export type FieldName = string
export type FieldErrorObject = { field: FieldName; error: FieldError }

export type SpectralizeState = {
  title: string
  updateTitle: (title: string) => void

  description: string
  updateDescription: (description: string) => void

  fileType: FileType
  updateFileType: (fileType: FileType) => void

  file: null | File
  fileUrl: null | string
  updateFile: (file: null | File) => void

  previewFile: null | File
  previewUrl: null | string
  updatePreviewFile: (previewFile: null | File) => void

  authorName: string
  updateAuthorName: (authorName: string) => void

  authorEns: string
  updateAuthorEns: (authorEns: string) => void

  authorEmail: string
  updateAuthorEmail: (authorEmail: string) => void

  tokenName: string
  updateTokenName: (tokenName: string) => void

  tokenSymbol: string
  updateTokenSymbol: (tokenSymbol: string) => void

  rewardsPct: number
  updateRewardsPct: (rewardsPct: number) => void

  rewardsSplit: Address[]
  addRewardsSplitAddress: (address: Address) => void
  removeRewardsSplitAddress: (address: Address) => void

  nftBuyoutPrice: string
  updateNftBuyoutPrice: (nftBuyoutPrice: string) => void

  totalMarketCap: string
  updateTotalMarketCap: (totalMarketCap: string) => void

  initialTokenPrice: string
  updateInitialTokenPrice: (initialTokenPrice: string) => void

  maxTokenSupplyCap: bigint
  updateMaxTokenSupplyCap: (maxTokenSupplyCap: bigint) => void

  buyoutMultiplier: number
  updateBuyoutMultiplier: (buyoutMultiplier: number) => void

  errors: FieldErrorObject[]

  steps: {
    title: string
    validate: (state: SpectralizeState) => {
      errors: SpectralizeState["errors"]
    }
  }[]

  currentStep: number
  currentStepTitle: () => string

  fieldError: (name: string) => undefined | FieldError

  clearError: (name: string) => void

  moveStep: (direction: Direction) => boolean
  nextStep: () => boolean
  prevStep: () => boolean
}

export const useSpectralize = zustand<SpectralizeState>((set, get) => ({
  title: "",
  updateTitle: (title) => {
    set({ title })
    get().clearError("title")
  },

  description: "",
  updateDescription: (description: string) => {
    set({ description })
    get().clearError("description")
  },

  fileType: "image",
  updateFileType: (newFileType) => {
    set({
      fileType: newFileType,
      file: null,
      previewFile: null,
      previewUrl: null,
    })
    get().clearError("file")
  },

  file: null,
  fileUrl: null,
  updateFile: (newFile) => {
    const { fileType, fileUrl } = get()

    get().clearError("file")

    // Clear previous URL object for the file
    if (fileUrl) URL.revokeObjectURL(fileUrl)

    set({
      file: newFile,
      fileUrl: newFile ? URL.createObjectURL(newFile) : null,
    })

    // Set preview file with the image
    if (fileType === "image") {
      get().updatePreviewFile(newFile)
    }
  },

  previewFile: null,
  previewUrl: null,
  updatePreviewFile: (newPreviewFile) => {
    const { previewUrl } = get()

    // Clear previous URL object for the preview
    if (previewUrl) URL.revokeObjectURL(previewUrl)

    set({
      previewFile: newPreviewFile,
      previewUrl: newPreviewFile ? URL.createObjectURL(newPreviewFile) : null,
    })
  },

  authorName: "",
  updateAuthorName: (authorName) => set({ authorName }),

  authorEns: "",
  updateAuthorEns: (authorEns) => set({ authorEns }),

  authorEmail: "",
  updateAuthorEmail: (authorEmail) => {
    set({ authorEmail })
    get().clearError("authorEmail")
  },

  tokenName: "",
  updateTokenName: (tokenName) => {
    set({ tokenName })
    get().clearError("tokenName")
  },

  tokenSymbol: "",
  updateTokenSymbol: (tokenSymbol) => {
    set({ tokenSymbol })
    get().clearError("tokenSymbol")
  },

  rewardsPct: 5,
  updateRewardsPct: (rewardsPct) => set({ rewardsPct }),

  rewardsSplit: [],
  addRewardsSplitAddress: (address) => {
    set({
      rewardsSplit: [...new Set([...get().rewardsSplit, address])],
    })
    get().clearError("rewardsSplit")
  },
  removeRewardsSplitAddress: (address) => {
    const { rewardsSplit } = get()
    set({
      rewardsSplit: [...rewardsSplit].filter(
        (_address) => address !== _address
      ),
    })
  },

  nftBuyoutPrice: "50",
  updateNftBuyoutPrice: (nftBuyoutPrice) => {
    set({ nftBuyoutPrice })
  },

  totalMarketCap: "50",
  updateTotalMarketCap: (totalMarketCap) => {
    set({ totalMarketCap })
  },

  initialTokenPrice: "0.001",
  updateInitialTokenPrice: (initialTokenPrice) => {
    set({ initialTokenPrice })
  },

  maxTokenSupplyCap: 10_000n,
  updateMaxTokenSupplyCap: (maxTokenSupplyCap) => {
    set({ maxTokenSupplyCap })
  },

  buyoutMultiplier: 15,
  updateBuyoutMultiplier: (buyoutMultiplier) => {
    set({ buyoutMultiplier })
  },

  errors: [],

  steps: [
    {
      title: "01 NFT information",
      validate({
        title,
        description,
        authorName,
        authorEmail,
        authorEns,
        file,
      }) {
        const errors = []

        authorEmail = authorEmail.trim()
        description = description.trim()
        title = title.trim()
        authorEns = authorEns.trim()
        authorName = authorName.trim()

        if (!title) {
          errors.push({ field: "title", error: "The NFT title is missing." })
        }

        if (!description) {
          errors.push({
            field: "description",
            error: "The NFT description is missing.",
          })
        }

        if (!authorEmail) {
          errors.push({ field: "authorEmail", error: "Your email is missing." })
        } else if (!isEmail(authorEmail)) {
          errors.push({
            field: "authorEmail",
            error: "Your email seems incorrect.",
          })
        }

        if (!file) {
          errors.push({ field: "file", error: "The NFT file is missing." })
        }

        return {
          errors,
          title,
          description,
          authorName,
          authorEmail,
          authorEns,
        }
      },
    },
    {
      title: "02 Token information",
      validate({ rewardsSplit, title, tokenName, tokenSymbol }) {
        const errors = []

        tokenName = tokenName.trim()
        tokenSymbol = tokenSymbol.trim().toUpperCase()

        if (!tokenName) {
          errors.push({
            field: "tokenName",
            error: "The token name is missing.",
          })
        }

        if (!tokenSymbol) {
          errors.push({
            field: "tokenSymbol",
            error: "The token symbol is missing.",
          })
        }

        if (rewardsSplit.length === 0) {
          errors.push({
            field: "rewardsSplit",
            error:
              "At least one address must be added to the creator & community rewards split.",
          })
        }

        return {
          errors,
          rewardsSplit,
          title,
          tokenName,
          tokenSymbol,
        }
      },
    },
    {
      title: "03 Token economics",
      validate({ title }) {
        return { errors: [], title }
      },
    },
  ],

  currentStep: 2,
  currentStepTitle() {
    const { currentStep, steps } = get()
    return steps[currentStep].title
  },

  fieldError(name) {
    return get().errors.find(({ field }) => field === name)?.error
  },

  clearError(name) {
    const { errors } = get()
    set({
      errors: [...errors].filter(({ field }) => field !== name),
    })
  },

  moveStep(direction) {
    const data = get()
    const { currentStep } = data

    const nextStep = Math.max(
      0,
      Math.min(data.steps.length - 1, currentStep + direction)
    )

    // Same screen
    if (currentStep === nextStep) {
      return true
    }

    // Only validate data when moving forward
    const validatedData =
      direction === 1 ? data.steps[currentStep].validate(data) : { errors: [] }

    const hasErrors = validatedData.errors.length > 0

    set({
      ...validatedData,
      currentStep: hasErrors ? currentStep : nextStep,
    })

    return !hasErrors
  },
  nextStep: () => get().moveStep(1),
  prevStep: () => get().moveStep(-1),
}))
