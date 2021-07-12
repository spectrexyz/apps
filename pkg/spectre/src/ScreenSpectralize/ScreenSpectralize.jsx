import { forwardRef } from "react"
import { css } from "@emotion/react"
import { useDropzone } from "react-dropzone"
import zustand from "zustand"
import { useLocation } from "wouter"
import {
  Button,
  ButtonIcon,
  IconArrowCounterClockwise,
  IconArrowLeft,
  IconGearSix,
  IconUploadSimple,
  TextInput,
  gu,
  useUid,
} from "kit"
import { useLayout } from "../styles.js"
import { AppScreen } from "../AppLayout/AppScreen.jsx"

const useSpectralize = zustand((set) => ({
  description: "",
  file: null,
  title: "",
  updateDescription: (description) => set({ description }),
  updateFile: (file) => set({ file }),
  updateTitle: (title) => set({ title }),
}))

export function ScreenSpectralize() {
  const [_, setLocation] = useLocation()
  const data = useSpectralize()
  const titleId = useUid()
  const descriptionId = useUid()
  const layout = useLayout()

  const fullWidth = layout.below(601)

  return (
    <AppScreen
      title="Add NFT metadata"
      onBack={() => setLocation("/")}
      contextual={
        <div
          css={({ colors }) => css`
            display: flex;
            align-items: center;
            height: 100%;
            color: ${colors.accent2};
          `}
        >
          1/3
        </div>
      }
    >
      <div
        css={css`
          padding-bottom: 3gu;
        `}
      >
        <div
          css={css`
            margin: 0 auto;
          `}
        >
          <p
            css={({ fonts }) => css`
              padding-bottom: 1gu;
              font-family: ${fonts.families.sans};
              font-size: 14px;
            `}
          >
            Look at me. No plans, no backup, no weapons worth a damn. Oh, and
            something else I don't have: anything to lose.
          </p>
          <Group heading="NFT title" labelFor={titleId}>
            <TextInput
              id={titleId}
              value={data.title}
              onChange={data.updateTitle}
              placeholder=""
            />
          </Group>

          <Group heading="NFT description" labelFor={descriptionId}>
            <TextInput
              id={descriptionId}
              value={data.description}
              onChange={data.updateDescription}
              multiline
              css={css`
                height: 8em;
              `}
            />
          </Group>

          <FileGroup
            contextual="Image or video"
            file={data.file}
            heading="NFT file"
            onFile={data.updateFile}
          />

          <div
            css={css`
              display: flex;
              justify-content: flex-end;
              padding-top: 3gu;
            `}
          >
            <div
              css={css`
                display: flex;
                width: ${fullWidth ? "100%" : "50%"};
              `}
            >
              <Button label="Next" mode="primary-2" wide shadowInBox />
            </div>
          </div>
        </div>
      </div>
    </AppScreen>
  )
}

const Group = forwardRef(function Group(
  { heading, contextual, children, labelFor, ...props },
  ref
) {
  return (
    <section
      ref={ref}
      {...props}
      css={({ colors, fonts }) => css`
        margin-top: 2gu;
        padding: 2gu;
        background: ${colors.layer2};
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding-bottom: 1gu;
          user-select: none;
        }
        header h1 {
          font-family: ${fonts.families.sans};
          font-size: 12px;
          text-transform: uppercase;
          color: ${colors.contentHeading};
        }
      `}
    >
      <header>
        <h1>
          {labelFor ? <label htmlFor={labelFor}>{heading}</label> : heading}
        </h1>
        {contextual && (
          <div
            css={({ colors, fonts }) => css`
              font-family: ${fonts.families.sans};
              font-size: 12px;
              color: ${colors.contentDimmed};
            `}
          >
            {contextual}
          </div>
        )}
      </header>
      <div>{children}</div>
    </section>
  )
})

function FileGroup({ contextual, file, heading, onFile }) {
  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
    open,
  } = useDropzone({
    accept: ["image/*", "video/*"],
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop: ([file]) => {
      onFile(file)
    },
  })

  return (
    <Group
      heading={heading}
      contextual={contextual}
      {...getRootProps()}
      css={({ colors }) => css`
        position: relative;
        &:before {
          content: "";
          display: ${isDragActive ? "block" : "none"};
          position: absolute;
          inset: 0;
          border: 2px solid ${colors.accent};
        }
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1gu;
        `}
      >
        <input {...getInputProps()} />
        <div
          css={css`
            max-width: calc(100% - 2.5gu - 2gu);
            width: auto;
            flex-shrink: 1;
            flex-grow: 0;
            padding-right: 1gu;
          `}
        >
          <Button
            adjustLabelAlignment
            icon={<IconUploadSimple />}
            label={file ? file.name : "Upload file"}
            mode="flat-3"
            onClick={open}
            wide
            css={css`
              text-transform: uppercase;
            `}
          />
        </div>
        <ButtonIcon
          icon={<IconArrowCounterClockwise size={2.5 * gu} />}
          label="reset"
          onClick={() => onFile(null)}
        />
      </div>
    </Group>
  )
}
