import { useDropzone } from "react-dropzone"
import { Button } from "../Button"
import { ButtonIcon } from "../ButtonIcon"
import { IconArrowCounterClockwise, IconUploadSimple } from "../icons"
import { gu } from "../styles"

type FileUploadProps = {
  accept?: { [key: string]: string[] }
  className?: string
  file?: File | null
  label?: string
  onFile: (file: File | null) => void
  withReset?: boolean
}

export function FileUpload({
  accept,
  className,
  file,
  label = "Upload file",
  onFile,
  withReset = true,
}: FileUploadProps) {
  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    accept,
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
      className={className}
      css={({ colors }) => ({
        position: "relative",
        maxWidth: "100%",
        "&:before": {
          content: "\"\"",
          display: isDragActive ? "block" : "none",
          position: "absolute",
          inset: "0",
          border: `2px solid ${colors.accent}`,
        },
      })}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input {...getInputProps()} />
        <div
          css={{
            maxWidth: withReset ? "calc(100% - 2.5gu - 2gu)" : "none",
            width: "auto",
            flexShrink: "1",
            flexGrow: "0",
            paddingRight: "1gu",
          }}
        >
          <Button
            adjustLabelAlignment
            icon={<IconUploadSimple />}
            label={file ? file.name : label}
            mode="flat-3"
            onClick={open}
            size="compact"
            wide
            css={{
              textTransform: file ? "none" : "uppercase",
            }}
          />
        </div>
        {withReset && (
          <ButtonIcon
            icon={<IconArrowCounterClockwise size={2.5 * gu} />}
            label="reset"
            onClick={() => onFile(null)}
          />
        )}
      </div>
    </div>
  )
}
