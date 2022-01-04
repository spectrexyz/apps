import { css } from "@emotion/react"
import { useDropzone } from "react-dropzone"
import {
  Button,
  ButtonIcon,
  IconArrowCounterClockwise,
  IconUploadSimple,
  gu,
} from "kit"

export function FileUpload({ label = "Upload file", file, onFile }) {
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
    <div
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
            label={file ? file.name : label}
            mode="flat-3"
            onClick={open}
            size="compact"
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
    </div>
  )
}
