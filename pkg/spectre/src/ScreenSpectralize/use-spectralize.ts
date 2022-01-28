import zustand from "zustand"
import { Address, Direction, isEmail } from "kit"

export type FileType = "image" | "video" | "audio"

export type FieldError = string
export type FieldName = string
export type FieldErrorObject = { field: FieldName; error: FieldError }

export type SpectralizeData = {
  title: string
  description: string
  fileType: FileType
  file: null | File
  fileUrl: null | string
  previewFile: null | File
  previewUrl: null | string
  authorName: string
  authorEns: string
  authorEmail: string
  tokenName: string
  tokenSymbol: string
  rewardsPct: number
  rewardsSplit: Address[]
  nftBuyoutPrice: bigint
  totalMarketCap: bigint
  initialTokenPrice: bigint
  maxTokenSupplyCap: bigint
  buyoutMultiplier: number
  errors: FieldErrorObject[]
  currentStep: number
  suggestFromBuyout: boolean
}

export type SpectralizeMethods = {
  updateTitle(title: string): void
  updateDescription(description: string): void
  updateFileType(fileType: FileType): void
  updateFile(file: null | File): void
  updatePreviewFile(previewFile: null | File): void
  updateAuthorName(authorName: string): void
  updateAuthorEns(authorEns: string): void
  updateAuthorEmail(authorEmail: string): void
  updateTokenName(tokenName: string): void
  updateTokenSymbol(tokenSymbol: string): void
  updateRewardsPct(rewardsPct: number): void
  addRewardsSplitAddress(address: Address): void
  removeRewardsSplitAddress(address: Address): void
  updateNftBuyoutPrice(nftBuyoutPrice: bigint): void
  updateTotalMarketCap(totalMarketCap: bigint): void
  updateInitialTokenPrice(initialTokenPrice: bigint): void
  updateMaxTokenSupplyCap(maxTokenSupplyCap: bigint): void
  updateBuyoutMultiplier(buyoutMultiplier: number): void
  steps: {
    title: string
    validate(state: SpectralizeState): { errors: SpectralizeState["errors"] }
  }[]
  currentStepTitle(): string
  updateSuggestFromBuyout(suggestFromBuyout: boolean): void
  fieldError(name: string): undefined | FieldError
  clearError(name: string): void
  moveStep(direction: Direction): boolean
  nextStep(): boolean
  prevStep(): boolean
  reset(): void
  fillDemoData(): void
}

export type SpectralizeState = SpectralizeData & SpectralizeMethods

const initialState: SpectralizeData = {
  title: "",
  description: "",
  fileType: "image",
  file: null,
  fileUrl: null,
  previewFile: null,
  previewUrl: null,
  authorName: "",
  authorEns: "",
  authorEmail: "",
  tokenName: "",
  tokenSymbol: "",
  rewardsPct: 5,
  rewardsSplit: [],
  nftBuyoutPrice: 15000000000000000000n,
  totalMarketCap: 10000000000000000000n,
  initialTokenPrice: 1000000000000000n,
  maxTokenSupplyCap: 1_000_000n,
  buyoutMultiplier: 15,
  errors: [],
  currentStep: 0,
  suggestFromBuyout: true,
}

export const useSpectralize = zustand<SpectralizeState>((set, get) => ({
  ...initialState,

  updateTitle(title) {
    set({ title })
    get().clearError("title")
  },
  updateDescription(description: string) {
    set({ description })
    get().clearError("description")
  },
  updateFileType(newFileType) {
    set({
      fileType: newFileType,
      file: null,
      previewFile: null,
      previewUrl: null,
    })
    get().clearError("file")
  },
  updateFile(newFile) {
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
  updatePreviewFile(newPreviewFile) {
    const { previewUrl } = get()

    // Clear previous URL object for the preview
    if (previewUrl) URL.revokeObjectURL(previewUrl)

    set({
      previewFile: newPreviewFile,
      previewUrl: newPreviewFile ? URL.createObjectURL(newPreviewFile) : null,
    })
  },
  updateAuthorName(authorName) {
    set({ authorName })
  },
  updateAuthorEns(authorEns) {
    set({ authorEns })
  },
  updateAuthorEmail(authorEmail) {
    set({ authorEmail })
    get().clearError("authorEmail")
  },
  updateTokenName(tokenName) {
    set({ tokenName })
    get().clearError("tokenName")
  },
  updateTokenSymbol(tokenSymbol) {
    set({ tokenSymbol })
    get().clearError("tokenSymbol")
  },
  updateRewardsPct(rewardsPct) {
    set({ rewardsPct })
  },
  addRewardsSplitAddress(address) {
    set({
      rewardsSplit: [...new Set([...get().rewardsSplit, address])],
    })
    get().clearError("rewardsSplit")
  },
  removeRewardsSplitAddress(address) {
    const { rewardsSplit } = get()
    set({
      rewardsSplit: [...rewardsSplit].filter(
        (_address) => address !== _address
      ),
    })
  },
  updateNftBuyoutPrice(nftBuyoutPrice) {
    const { buyoutMultiplier, maxTokenSupplyCap } = get()
    const totalMarketCap = (nftBuyoutPrice / BigInt(buyoutMultiplier)) * 10n
    const initialTokenPrice = totalMarketCap / maxTokenSupplyCap
    set({
      initialTokenPrice,
      nftBuyoutPrice,
      totalMarketCap,
    })
  },
  updateTotalMarketCap(totalMarketCap) {
    const { buyoutMultiplier, maxTokenSupplyCap } = get()
    const initialTokenPrice = totalMarketCap / maxTokenSupplyCap
    const nftBuyoutPrice = (totalMarketCap * BigInt(buyoutMultiplier)) / 10n
    set({
      initialTokenPrice,
      nftBuyoutPrice,
      totalMarketCap,
    })
  },
  updateInitialTokenPrice(initialTokenPrice) {
    const { maxTokenSupplyCap, buyoutMultiplier } = get()
    const totalMarketCap = initialTokenPrice * maxTokenSupplyCap
    const nftBuyoutPrice = (totalMarketCap * BigInt(buyoutMultiplier)) / 10n
    set({
      initialTokenPrice,
      totalMarketCap,
      nftBuyoutPrice,
    })
  },
  updateMaxTokenSupplyCap(maxTokenSupplyCap) {
    const { totalMarketCap } = get()
    set({
      maxTokenSupplyCap,
      initialTokenPrice: totalMarketCap / maxTokenSupplyCap,
    })
  },
  updateBuyoutMultiplier(buyoutMultiplier) {
    const { totalMarketCap } = get()
    set({
      buyoutMultiplier,
      nftBuyoutPrice: (totalMarketCap * BigInt(buyoutMultiplier)) / 10n,
    })
  },

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
    {
      title: "Summary",
      validate({ title }) {
        return { errors: [], title }
      },
    },
  ],
  currentStepTitle() {
    const { currentStep, steps } = get()
    return steps[currentStep].title
  },
  updateSuggestFromBuyout: (suggestFromBuyout) => {
    set({ suggestFromBuyout })
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
  nextStep() {
    return get().moveStep(1)
  },
  prevStep() {
    return get().moveStep(-1)
  },
  reset() {
    set(initialState)
  },
  fillDemoData() {
    get().reset()

    // screen 1
    get().updateTitle("Two Discs")
    get().updateDescription(
      "Artworks have always been powerful vectors of collectives structuration " +
        "and we now see that the internet of money could make us pass from the " +
        "status of consumer of artworks to a world where artworks are, in their " +
        "inner form, the organizational layer of tomorrow’s collectives."
    )
    get().updateAuthorEmail("hi@example.org")
    get().updateFile(
      new File(
        [
          `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
             <rect width="100%" height="100%" fill="lightblue"/>
             <circle cx="54%" cy="54%" r="20%" fill="lightsteelblue" />
             <circle cx="50%" cy="50%" r="10%" fill="palevioletred" />
           </svg>`,
        ],
        "two-discs.svg",
        { type: "image/svg+xml" }
      )
    )

    // screen 2
    get().updateTokenName("Two Discs Token")
    get().updateTokenSymbol("DSCS")
    get().addRewardsSplitAddress("0x627306090abab3a6e1400e9345bc60c78a8bef57")
    get().addRewardsSplitAddress("0xf17f52151ebef6c7334fad080c5704d77216b732")

    set({ currentStep: 0 })
  },
}))
