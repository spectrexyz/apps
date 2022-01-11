import zustand from "zustand"

export const useSpectralize = zustand((set, get) => ({
  title: "",
  updateTitle: (title) => {
    set({ title })
    get().clearError("title")
  },

  description: "",
  updateDescription: (description) => {
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
  updateTokenName: (tokenName) => set({ tokenName }),

  tokenSymbol: "",
  updateTokenSymbol: (tokenSymbol) => set({ tokenSymbol }),

  rewards: 5,
  updateRewards: (rewards) => set({ rewards }),

  rewardsSplit: [],

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
        // optional
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
        } else if (!/.+@.+/.test(authorEmail)) {
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
      validate({ title }) {
        return { errors: [], title }
      },
    },
    {
      title: "03 Token economics",
      validate({ title }) {
        return { errors: [], title }
      },
    },
  ],

  currentStep: 0,
  currentStepTitle() {
    const { currentStep, steps } = get()
    return steps[currentStep].title
  },

  fieldError(name) {
    return get().errors.find(({ field }) => field === name)
  },

  clearError(name) {
    const { errors } = get()
    return set({
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
      return
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
