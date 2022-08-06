import type { FormEvent } from "react"

import { Button, Fieldset, Modal, TextInput, Toggle } from "kit"
import { useCallback, useState } from "react"
import { useLayout } from "../styles"

export function EditProfileModal({
  onClose,
  visible,
}: {
  onClose: () => void
  visible: boolean
}) {
  const layout = useLayout()
  const introPadding = layout.value({
    small: "2gu 0",
    medium: "2gu 0",
    large: "1.5gu 0 1gu",
  })
  return (
    <Modal mode="large" onClose={onClose} visible={visible}>
      <header>
        <h1
          css={({ fonts }) => ({
            fontFamily: fonts.mono,
            fontSize: "18px",
            textTransform: "uppercase",
          })}
        >
          Edit Profile
        </h1>
        <p
          css={({ colors, fonts }) => ({
            padding: introPadding,
            fontFamily: fonts.sans,
            fontSize: "14px",
            color: colors.contentDimmed,
          })}
        >
          This information will be used to represent your account on this
          application.
        </p>
      </header>
      <EditProfileModalForm onSave={onClose} />
    </Modal>
  )
}

export function EditProfileModalForm({
  onSave,
}: {
  onSave(): void
}) {
  const save = useCallback(() => {}, [])
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()
      save()
      onSave()
    },
    [onSave, save],
  )

  const layout = useLayout()
  const saveLabel = layout.value({
    small: "Save",
    medium: "Save changes",
  })

  const [publicEmail, setPublicEmail] = useState(true)

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset label="Name / Alias" dimmed>
        <TextInput />
      </Fieldset>
      <Fieldset
        label="Email"
        dimmed
        contextual={
          <Toggle
            labels={["Private", "Public"]}
            value={publicEmail ? 0 : 1}
            onChange={() => {
              setPublicEmail((v) => !v)
            }}
          />
        }
      >
        <TextInput />
      </Fieldset>
      <Fieldset label="ENS domain" dimmed>
        <TextInput />
      </Fieldset>
      <Fieldset label="Biography" dimmed>
        <TextInput multiline />
      </Fieldset>
      <Fieldset label="Twitter" dimmed>
        <TextInput />
      </Fieldset>
      <Fieldset label="Website" dimmed>
        <TextInput />
      </Fieldset>

      <div css={{ paddingTop: "3gu" }}>
        <Button
          label={saveLabel}
          mode="primary-2"
          onClick={save}
          shadowInBox
          type="submit"
          wide
        />
      </div>
    </form>
  )
}
