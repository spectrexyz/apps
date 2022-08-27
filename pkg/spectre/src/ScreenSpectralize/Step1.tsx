import type { FormEvent } from "react"
import type { StepProps } from "./types"
import type { FileType } from "./use-spectralize"

import {
  Button,
  ButtonIcon,
  co,
  Fieldset,
  FileUpload,
  gu,
  IconCheckBold,
  IconMagnifyingGlassPlus,
  IconTrash,
  RadioBox,
  RadioGroup,
  TextInput,
  Truncate,
  Video,
} from "moire"
import { useCallback } from "react"
import { NFT_FILE_TYPES } from "../constants"
import { useLayout } from "../styles"
import { ErrorSummary } from "./ErrorSummary"
import { useSpectralize } from "./use-spectralize"

export function Step1({ onNext, onPrev, title }: StepProps) {
  const data = useSpectralize()
  const layout = useLayout()

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onNext()
    },
    [onNext],
  )

  const fileSelectorWidth = layout.value({
    small: "32.5gu",
    xlarge: "37.5gu",
  })
  const introPadding = layout.value({
    small: "2gu 0",
    medium: "2gu 0",
    large: "1.5gu 0 1gu",
  })
  const flexGap = layout.value({
    small: "3.5gu",
    xlarge: "5gu",
  })

  return (
    <form onSubmit={handleSubmit}>
      <div
        css={{
          display: "flex",
          gap: flexGap,
          flexDirection: layout.below("medium") ? "column" : "row",
          width: "100%",
        }}
      >
        <div
          css={({ colors }) => ({
            padding: layout.below("medium") ? "0" : "4.5gu 5gu 3gu",
            background: layout.below("medium") ? "none" : colors.background,
            border: layout.below("medium")
              ? "none"
              : `2px solid ${colors.contrast}`,
          })}
        >
          {!layout.below("medium")
            ? (
              <h1
                css={({ fonts }) => ({
                  fontFamily: fonts.mono,
                  fontSize: "18px",
                  textTransform: "uppercase",
                })}
              >
                {title}
              </h1>
            )
            : (
              <div
                css={{
                  height: "6gu",
                }}
              />
            )}
          <p
            css={({ colors, fonts }) => ({
              padding: introPadding,
              fontFamily: fonts.sans,
              fontSize: "14px",
              color: colors.contentDimmed,
            })}
          >
            Add the NFT metadata such as a title, description. Select the file
            type and upload it. This information will be stored in IPFS and
            cannot be modify once the NFT is minted.
          </p>
          {layout.below("large") && (
            <div>
              <NftFileSelector
                direction={layout.name === "small" ? "vertical" : "horizontal"}
              />
            </div>
          )}
          <Fieldset label="NFT title" error={data.fieldError("title")}>
            <TextInput
              onChange={data.updateTitle}
              placeholder="Title of the NFT"
              value={data.title}
            />
          </Fieldset>

          <Fieldset
            label="NFT description"
            error={data.fieldError("description")}
          >
            <TextInput
              multiline
              onChange={data.updateDescription}
              value={data.description}
              placeholder="Description of the NFT"
              css={{
                height: "25gu",
              }}
            />
          </Fieldset>

          <Fieldset label="Your name / alias" optional>
            <TextInput
              onChange={data.updateAuthorName}
              value={data.authorName}
              placeholder="Your name"
            />
          </Fieldset>

          <Fieldset label="Your email" error={data.fieldError("authorEmail")}>
            <TextInput
              onChange={data.updateAuthorEmail}
              value={data.authorEmail}
              placeholder="you@example.org"
            />
          </Fieldset>

          <Fieldset label="Your ENS Domain" optional>
            <TextInput
              onChange={data.updateAuthorEns}
              value={data.authorEns}
              placeholder="example.eth"
            />
          </Fieldset>

          {data.errors.length > 0 && (
            <ErrorSummary>
              The highlighted fields are mandatory, please complete them before
              you can continue.
            </ErrorSummary>
          )}

          {layout.below("medium")
            ? (
              <div
                css={{
                  padding: "3gu 0",
                }}
              >
                <Button
                  type="submit"
                  label="Next"
                  mode="primary-2"
                  shadowInBox
                  wide
                />
              </div>
            )
            : (
              <div
                css={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "2gu",
                  paddingTop: "3gu",
                }}
              >
                <Button
                  label="Cancel"
                  mode="secondary-2"
                  shadowInBox
                  onClick={onPrev}
                />
                <Button
                  type="submit"
                  label="Next"
                  mode="primary-2"
                  shadowInBox
                />
              </div>
            )}
        </div>
        {!layout.below("large") && (
          <div
            css={{
              flexShrink: "0",
              width: fileSelectorWidth,
              height: "38gu",
            }}
          >
            <NftFileSelector direction="vertical" />
          </div>
        )}
      </div>
    </form>
  )
}

function NftFileSelector({
  direction,
}: {
  direction: "vertical" | "horizontal"
}) {
  const layout = useLayout()
  const gridTemplateAxis1 = direction === "vertical" ? "Rows" : "Columns"
  const gridTemplateAxis2 = direction === "vertical" ? "Columns" : "Rows"

  const {
    fieldError,
    file,
    fileType,
    updateFile,
    updateFileType,
  } = useSpectralize()

  const hasError = Boolean(fieldError("file"))

  const uploadButton = (
    <FileUpload
      file={file}
      onFile={updateFile}
      label={layout.name === "medium" ? "Upload" : "Upload file"}
      accept={NFT_FILE_TYPES[fileType].accept}
      css={{
        paddingTop: "1gu",
      }}
    />
  )

  return (
    <div css={{ userSelect: "none" }}>
      {file ? <NftFilePreview /> : (
        <RadioGroup
          onChange={(fileType: FileType) => updateFileType(fileType)}
          selected={fileType}
        >
          <div
            css={{
              display: "grid",
              [`gridTemplate${gridTemplateAxis1}`]: "1fr 1fr 1fr",
              [`gridTemplate${gridTemplateAxis2}`]: "100%",
              gap: "1.5gu",
              width: "100%",
              height: direction === "vertical" ? "auto" : "19gu",
            }}
          >
            <RadioBox
              id="image"
              error={(fileType === "image" && hasError) || undefined}
              label="Image"
              secondary={
                <>
                  <div
                    css={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>{NFT_FILE_TYPES.image.label}</div>
                    {layout.name !== "medium" && <div>100MB limit</div>}
                  </div>
                  {fileType === "image" && uploadButton}
                  {layout.name === "medium" && fileType === "image" && (
                    <div>100MB limit</div>
                  )}
                </>
              }
            />
            <RadioBox
              id="video"
              error={(fileType === "video" && hasError) || undefined}
              label="Video"
              secondary={
                <>
                  <div>{NFT_FILE_TYPES.video.label}</div>
                  {fileType === "video" && uploadButton}
                </>
              }
            />
            <RadioBox
              id="audio"
              error={(fileType === "audio" && hasError) || undefined}
              label="Audio"
              secondary={
                <>
                  <div>{NFT_FILE_TYPES.audio.label}</div>
                  {fileType === "audio" && uploadButton}
                </>
              }
            />
          </div>
        </RadioGroup>
      )}
    </div>
  )
}

function NftFilePreview() {
  const {
    file,
    fileType,
    fileUrl,
    previewFile,
    previewUrl,
    updateFile,
    updatePreviewFile,
  } = useSpectralize()

  const hasPreview = fileType === "video" || fileType === "audio"

  return (
    <div>
      <div
        css={{
          position: "relative",
          paddingBottom: "2gu",
        }}
      >
        {fileType === "image" && (
          <a
            href={fileUrl ?? undefined}
            target="_blank"
            rel="noreferrer"
            css={{
              display: "block",
              position: "relative",
              minHeight: "5gu",
            }}
          >
            {previewUrl
              ? (
                <img
                  src={previewUrl}
                  alt=""
                  css={{
                    display: "block",
                    width: "100%",
                  }}
                />
              )
              : (
                <div
                  css={({ colors }) => ({
                    height: "10gu",
                    background: colors.background,
                  })}
                />
              )}
            <div
              css={({ colors }) => ({
                position: "absolute",
                inset: "auto 0 0 auto",
                display: "flex",
                placeItems: "center",
                padding: "1gu",
                color: colors.accent,
                background: co(colors.translucid).alpha(0.6).toHex(),
              })}
            >
              <IconMagnifyingGlassPlus size={3 * gu} />
            </div>
          </a>
        )}
        {(fileType === "video" || fileType === "audio") && fileUrl && (
          <Video
            loop={true}
            src={fileUrl}
            poster={previewUrl ?? undefined}
            css={({ colors }) => ({
              display: "block",
              width: "100%",
              background: `${colors.background}`,
            })}
          />
        )}
      </div>
      <section
        css={({ colors }) => ({
          padding: "2gu",
          background: colors.layer2,
          "h1": {
            display: "flex",
            alignItems: "center",
            height: "3gu",
            paddingBottom: "1gu",
            fontSize: "12px",
            textTransform: "uppercase",
          },
        })}
      >
        <h1>Artwork files</h1>

        {file?.name && (
          <FileEntry
            name={file.name}
            onReset={() => updateFile(null)}
          />
        )}

        {hasPreview
          && (previewFile
            ? (
              <FileEntry
                name={previewFile.name}
                onReset={() => updatePreviewFile(null)}
              />
            )
            : (
              <div
                css={{
                  paddingTop: "1gu",
                }}
              >
                <div
                  css={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <FileUpload
                    accept={NFT_FILE_TYPES.image.accept}
                    file={previewFile}
                    label="Thumbnail"
                    onFile={updatePreviewFile}
                    withReset={false}
                  />

                  <span
                    css={({ colors, fonts }) => ({
                      fontFamily: fonts.sans,
                      fontSize: "12px",
                      color: colors.contentDimmed,
                    })}
                  >
                    (Optional)
                  </span>
                </div>
              </div>
            ))}
      </section>
    </div>
  )
}

function FileEntry({ name, onReset }: { name: string; onReset: () => void }) {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1gu",
        width: "100%",
        paddingTop: "1.5gu",
      }}
    >
      <div
        css={({ colors }) => ({
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          gap: "1.25gu",
          height: "4gu",
          padding: "0 1.5gu 0 1gu",
          whiteSpace: "nowrap",
          color: colors.accent,
          background: colors.layer1,
        })}
      >
        <div css={{ flex: "0", display: "flex", alignItems: "center" }}>
          <IconCheckBold size={2.5 * gu} />
        </div>
        <Truncate text={name} />
      </div>

      <div css={{ flex: "0", display: "flex", alignItems: "center" }}>
        <ButtonIcon
          icon={<IconTrash size={2.5 * gu} />}
          label="reset"
          onClick={onReset}
          css={{
            flexShrink: "0",
            width: "3gu",
            height: "3gu",
          }}
        />
      </div>
    </div>
  )
}
