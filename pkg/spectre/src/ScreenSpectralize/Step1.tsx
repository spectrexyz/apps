import React, { useCallback } from "react"
import { css } from "@emotion/react"
import {
  Button,
  ButtonIcon,
  Fieldset,
  FileUpload,
  IconCheckBold,
  IconMagnifyingGlassPlus,
  IconTrash,
  IconWarningOctagon,
  RadioBox,
  RadioGroup,
  TextInput,
  Video,
  co,
  gu,
} from "kit"
import { NFT_FILE_TYPES } from "../constants"
import { useLayout } from "../styles"
import { FileType, useSpectralize } from "./use-spectralize"
import { ErrorSummary } from "./ErrorSummary"

type Step1Props = {
  onNext: () => void
  onPrev: () => void
  title: string
}

export function Step1({ onNext, onPrev, title }: Step1Props) {
  const data = useSpectralize()
  const layout = useLayout()

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      onNext()
    },
    [onNext]
  )

  const fileSelectorWidth = layout.value({
    small: css`32.5gu`,
    xlarge: css`37.5gu`,
  })
  const introPadding = layout.value({
    small: css`2gu 0`,
    medium: css`2gu 0`,
    large: css`1.5gu 0 1gu`,
  })
  const flexGap = layout.value({
    small: css`3.5gu`,
    xlarge: css`5gu`,
  })

  return (
    <form onSubmit={handleSubmit}>
      <div
        css={css`
          display: flex;
          gap: ${flexGap};
          flex-direction: ${layout.below("medium") ? "column" : "row"};
          width: 100%;
        `}
      >
        <div
          css={({ colors }) => css`
            padding: ${layout.below("medium") ? "0" : css`4.5gu 5gu 3gu`};
            background: ${layout.below("medium") ? "none" : colors.background};
          `}
        >
          {!layout.below("medium") ? (
            <h1
              css={({ fonts }) => css`
                font-family: ${fonts.families.mono};
                font-size: 18px;
                text-transform: uppercase;
              `}
            >
              {title}
            </h1>
          ) : (
            <div
              css={css`
                height: 6gu;
              `}
            />
          )}
          <p
            css={({ colors, fonts }) => css`
              padding: ${introPadding};
              font-family: ${fonts.families.sans};
              font-size: 14px;
              color: ${colors.contentDimmed};
            `}
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
              css={css`
                height: 8em;
              `}
            />
          </Fieldset>

          <Fieldset label="Your name / alias">
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

          <Fieldset label="Your ENS Domain">
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

          {layout.below("medium") ? (
            <div
              css={css`
                padding: 3gu 0;
              `}
            >
              <Button
                type="submit"
                label="Next"
                mode="primary-2"
                shadowInBox
                wide
              />
            </div>
          ) : (
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                gap: 2gu;
                padding-top: 3gu;
              `}
            >
              <Button
                label="Cancel"
                mode="secondary-2"
                shadowInBox
                onClick={onPrev}
              />
              <Button type="submit" label="Next" mode="primary-2" shadowInBox />
            </div>
          )}
        </div>
        {!layout.below("large") && (
          <div
            css={css`
              flex-shrink: 0;
              width: ${fileSelectorWidth};
              height: 38gu;
            `}
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
  const gridTemplateAxis1 = direction === "vertical" ? "rows" : "columns"
  const gridTemplateAxis2 = direction === "vertical" ? "columns" : "rows"

  const { fieldError, file, fileType, updateFile, updateFileType } =
    useSpectralize()

  const hasError = Boolean(fieldError("file"))

  const uploadButton = (
    <FileUpload
      file={file}
      onFile={updateFile}
      label={layout.name === "medium" ? "Upload" : "Upload file"}
      accept={NFT_FILE_TYPES[fileType].mediaTypes}
      css={css`
        padding-top: 1gu;
      `}
    />
  )

  return (
    <div>
      {file ? (
        <NftFilePreview />
      ) : (
        <RadioGroup
          onChange={(fileType) => updateFileType(fileType as FileType)}
          selected={fileType}
        >
          <div
            css={css`
              display: grid;
              grid-template-${gridTemplateAxis1}: 1fr 1fr 1fr;
              grid-template-${gridTemplateAxis2}: 100%;
              gap: 1.5gu;
              width: 100%;
              height: ${direction === "vertical" ? "auto" : css`19gu`};
            `}
          >
            <RadioBox
              id="image"
              error={(fileType === "image" && hasError) || undefined}
              label="Image"
              secondary={
                <>
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                      width: 100%;
                    `}
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
        css={css`
          position: relative;
          padding-bottom: 2gu;
        `}
      >
        {fileType === "image" && (
          <a
            href={fileUrl ?? undefined}
            target="_blank"
            css={css`
              display: block;
              position: relative;
              min-height: 5gu;
            `}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt=""
                css={css`
                  display: block;
                  width: 100%;
                `}
              />
            ) : (
              <div
                css={({ colors }) => css`
                  height: 10gu;
                  background: ${colors.background};
                `}
              />
            )}
            <div
              css={({ colors }) => css`
                position: absolute;
                inset: auto 0 0 auto;
                display: flex;
                place-items: center;
                padding: 1gu;
                color: ${colors.accent};
                background: ${co(colors.translucid).alpha(0.6).toHex()};
              `}
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
            css={({ colors }) => css`
              display: block;
              width: 100%;
              background: ${colors.background};
            `}
          />
        )}
      </div>
      <section
        css={({ colors }) => css`
          padding: 2gu;
          background: ${colors.layer2};
          h1 {
            display: flex;
            align-items: center;
            height: 3gu;
            padding-bottom: 1gu;
            font-size: 12px;
            text-transform: uppercase;
          }
        `}
      >
        <h1>Artwork files</h1>

        {file?.name && (
          <FileEntry name={file.name} onReset={() => updateFile(null)} />
        )}

        {hasPreview &&
          (previewFile ? (
            <FileEntry
              name={previewFile.name}
              onReset={() => updatePreviewFile(null)}
            />
          ) : (
            <div
              css={css`
                padding-top: 1gu;
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                `}
              >
                <FileUpload
                  accept={NFT_FILE_TYPES.image.mediaTypes}
                  file={previewFile}
                  label="Thumbnail"
                  onFile={updatePreviewFile}
                  withReset={false}
                />

                <span
                  css={({ colors, fonts }) => css`
                    font-family: ${fonts.families.sans};
                    font-size: 12px;
                    color: ${colors.contentDimmed};
                  `}
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
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-top: 1.5gu;
      `}
    >
      <div
        css={({ colors }) => css`
          display: flex;
          align-items: center;
          gap: 1.25gu;
          height: 4gu;
          padding: 0 1.5gu 0 1gu;
          color: ${colors.accent};
          background: ${colors.layer1};
        `}
      >
        <IconCheckBold size={2.5 * gu} />
        <span>{name}</span>
      </div>

      <ButtonIcon
        icon={<IconTrash size={2.5 * gu} />}
        label="reset"
        onClick={onReset}
        css={css`
          width: 3gu;
          height: 3gu;
        `}
      />
    </div>
  )
}
