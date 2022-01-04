import React from "react"
import { css } from "@emotion/react"
import {
  Button,
  Fieldset,
  IconWarningOctagon,
  RadioBox,
  RadioGroup,
  TextInput,
  gu,
} from "kit"

import { useLayout } from "../styles.js"
import { FileUpload } from "./FileUpload.jsx"
import { useSpectralize } from "./use-spectralize.js"

export function Step1({ title, onPrev }) {
  const data = useSpectralize()
  const layout = useLayout()

  const nftTypeSelectorWidth = layout.value({
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
          type and upload it. This information will be stored in IPFS and cannot
          be modify once the NFT is minted.
        </p>
        {layout.below("large") && (
          <div>
            <NftTypeSelector
              direction={layout.name === "small" ? "vertical" : "horizontal"}
              selected={data.fileType}
              onChange={data.updateFileType}
              file={data.file}
              onFile={data.updateFile}
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

        <Fieldset label="Email" error={data.fieldError("authorEmail")}>
          <TextInput
            onChange={data.updateAuthorEmail}
            value={data.authorEmail}
            placeholder="you@example.org"
          />
        </Fieldset>

        <Fieldset label="ENS Domain">
          <TextInput
            onChange={data.updateAuthorEns}
            value={data.authorEns}
            placeholder="example.eth"
          />
        </Fieldset>

        {data.errors.length > 0 && (
          <p
            css={({ colors, fonts }) => css`
              display: flex;
              padding-top: 2gu;
              color: ${colors.warning};
              font-family: ${fonts.sans};
              font-size: 14px;
            `}
          >
            <span
              css={css`
                padding-top: 0.5gu;
                padding-right: 0.75gu;
              `}
            >
              <IconWarningOctagon size={2 * gu} />
            </span>
            <span>
              The highlighted fields are mandatory, please complete them before
              you can continue.
            </span>
          </p>
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
            width: ${nftTypeSelectorWidth};
            height: 38gu;
          `}
        >
          <NftTypeSelector
            direction="vertical"
            file={data.file}
            fileError={data.fieldError("file")}
            onChange={data.updateFileType}
            onFile={data.updateFile}
            selected={data.fileType}
          />
        </div>
      )}
    </div>
  )
}

function NftTypeSelector({
  direction,
  onChange,
  selected,
  file,
  onFile,
  fileError,
}) {
  const layout = useLayout()
  const gridTemplateAxis = direction === "vertical" ? "rows" : "columns"
  const uploadLabel = layout.name === "medium" ? "Upload" : "Upload file"
  return (
    <RadioGroup onChange={onChange} selected={selected}>
      <div
        css={css`
          display: grid;
          grid-template-${gridTemplateAxis}: 1fr 1fr 1fr;
          gap: 1.5gu;
          width: 100%;
          height: ${direction === "vertical" ? "auto" : css`19gu`};
        `}
      >
        <RadioBox
          id="image"
          error={(selected === "image" && fileError) || undefined}
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
                <div>JPG,PNG,SVG,WEBP</div>
                {layout.name !== "medium" && <div>100MB limit</div>}
              </div>
              {selected === "image" && (
                <FileUpload file={file} onFile={onFile} label={uploadLabel} />
              )}
              {layout.name === "medium" && selected === "image" && (
                <div>100MB limit</div>
              )}
            </>
          }
        />
        <RadioBox
          id="video"
          error={(selected === "video" && fileError) || undefined}
          label="Video"
          secondary={
            <>
              <div>MP4,WEBM,GIF</div>
              {selected === "video" && (
                <FileUpload file={file} onFile={onFile} label={uploadLabel} />
              )}
            </>
          }
        />
        <RadioBox
          id="audio"
          error={(selected === "audio" && fileError) || undefined}
          label="Audio"
          secondary={
            <>
              <div>MP3,WAV,FLAC</div>
              {selected === "audio" && (
                <FileUpload file={file} onFile={onFile} label={uploadLabel} />
              )}
            </>
          }
        />
      </div>
    </RadioGroup>
  )
}
