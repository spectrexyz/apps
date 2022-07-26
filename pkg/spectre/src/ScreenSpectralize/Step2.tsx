import type { Address } from "kit"
import type { FormEvent, MutableRefObject } from "react"
import type { StepProps } from "./types"

import {
  Button,
  ButtonText,
  Fieldset,
  formatNumber,
  IconPlus,
  isAddress,
  Slider,
  TextInput,
  useKey,
} from "kit"
import { useCallback, useEffect, useRef, useState } from "react"
import { useAccount } from "wagmi"
import {
  ContentLayout,
  ContentLayoutHeading,
  ContentLayoutSection,
} from "../ContentLayout"
import { useLayout } from "../styles"
import { ErrorSummary } from "./ErrorSummary"
import { EthAddressRow } from "./EthAddressRow"
import { useSpectralize } from "./use-spectralize"

const REWARDS_MAX = 50

export function Step2({ title, onPrev, onNext }: StepProps) {
  const data = useSpectralize()
  const layout = useLayout()
  const { address } = useAccount()

  const { rewardsSplit, addRewardsSplitAddress, removeRewardsSplitAddress } =
    data

  const submitAddingAccount = useRef<
    (() => { invalid: boolean; account: Address | null }) | undefined
  >()
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      // Add an account to the rewards split
      const result = submitAddingAccount?.current?.()
      if (result?.invalid) {
        return
      }
      if (result?.account) {
        addRewardsSplitAddress(result.account)
        return
      }

      // Next screen
      onNext()
    },
    [addRewardsSplitAddress, onNext],
  )

  const hasFilledCurrentAccountInRewards = useRef(rewardsSplit.length > 0)
  useEffect(() => {
    if (
      rewardsSplit.length === 0
      && !hasFilledCurrentAccountInRewards.current
      && address
    ) {
      addRewardsSplitAddress(address)

      // Make sure we only prefill the account once
      hasFilledCurrentAccountInRewards.current = true
    }
  }, [address, rewardsSplit, addRewardsSplitAddress])

  return (
    <form onSubmit={handleSubmit}>
      <ContentLayout>
        <ContentLayoutHeading title={title}>
          Add the name and symbol of your token – this will be used to name your
          NFT fractions. Also, decide on the % of minting rewards that you’d
          like to assign to yourself and others, such as collaborators, friends,
          supporters, etc.
        </ContentLayoutHeading>
        <ContentLayoutSection type="two-parts">
          <div>
            <Fieldset label="Token name" error={data.fieldError("tokenName")}>
              <TextInput
                onChange={(value) => data.updateTokenName(value)}
                placeholder="Token"
                value={data.tokenName}
              />
            </Fieldset>
            <Fieldset
              label="Token symbol"
              error={data.fieldError("tokenSymbol")}
            >
              <TextInput
                onChange={(value) => data.updateTokenSymbol(value)}
                placeholder="TKN"
                value={data.tokenSymbol}
              />
            </Fieldset>
          </div>
          <div>
            <Fieldset
              label="Creator & community rewards"
              contextual={
                <span
                  css={({ colors }) => ({
                    fontSize: "18px",
                    colors: colors.contentDimmed,
                  })}
                >
                  {data.rewardsPct}%
                </span>
              }
            >
              <Slider
                keyboardStep={(value, dir) =>
                  Math.round((value + (1 / REWARDS_MAX) * dir) * 1000) / 1000}
                labels={["0%", `${REWARDS_MAX}%`]}
                onChange={(value) =>
                  data.updateRewardsPct(Math.round(value * REWARDS_MAX))}
                value={data.rewardsPct / REWARDS_MAX}
              />
            </Fieldset>

            <Fieldset
              label="Split creator & community rewards"
              error={data.fieldError("rewardsSplit")}
            >
              <div css={{ paddingBottom: "2gu" }}>
                {data.rewardsSplit.map((account) => (
                  <EthAddressRow
                    key={account}
                    address={account}
                    onRemove={() => removeRewardsSplitAddress(account)}
                    reward={`${
                      formatNumber(
                        data.rewardsPct / data.rewardsSplit.length,
                      )
                    }%`}
                  />
                ))}
              </div>

              <AddAccountModule submitRef={submitAddingAccount} />
            </Fieldset>
          </div>
        </ContentLayoutSection>
        {data.errors.length > 0 && (
          <ContentLayoutSection>
            <ErrorSummary>
              <p>Please fix the following issues before you can continue:</p>
              <ul>
                {data.errors.map(({ error }, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </ErrorSummary>
          </ContentLayoutSection>
        )}
        <ContentLayoutSection>
          {layout.below("medium")
            ? (
              <div css={{ padding: "3gu 0" }}>
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
                  label="Back"
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
        </ContentLayoutSection>
      </ContentLayout>
    </form>
  )
}

type AddAccountModuleProps = {
  submitRef: MutableRefObject<
    (() => { invalid: boolean; account: Address | null }) | undefined
  >
}

function AddAccountModule({ submitRef }: AddAccountModuleProps) {
  const container = useRef<HTMLDivElement>(null)

  // null means that the TextInput is hidden
  const [account, setAccount] = useState<null | string>(null)

  const [invalid, setInvalid] = useState(false)

  const isFocused = useCallback(
    () => container.current?.contains(document.activeElement) || false,
    [],
  )

  submitRef.current = () => {
    if (!isFocused() || account === null) {
      return { invalid: false, account: null }
    }

    if (isAddress(account)) {
      setAccount(null)
      return { invalid: false, account }
    }

    setInvalid(true)
    return { invalid: true, account: null }
  }

  useKey("Escape", () => {
    if (isFocused()) {
      setAccount(null)
    }
  })

  useEffect(() => {
    setInvalid(false)
  }, [account])

  return account === null
    ? (
      <Button
        icon={<IconPlus />}
        label="Add ETH address"
        mode="flat-3"
        size="compact"
        onClick={() => setAccount("")}
        css={{
          textTransform: "uppercase",
        }}
      />
    )
    : (
      <div
        ref={container}
        css={{
          display: "flex",
          alignItems: "center",
          gap: "2gu",
        }}
      >
        <div css={{ flexGrow: "1" }}>
          <TextInput
            error={invalid}
            autofocus={true}
            onChange={(value) => setAccount(value)}
            placeholder="0x…"
            value={account}
          />
        </div>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            gap: "1gu",
          }}
        >
          <ButtonText label="Cancel" onClick={() => setAccount(null)} />
          <Button label="Add" mode="flat-3" size="compact" type="submit" />
        </div>
      </div>
    )
}
