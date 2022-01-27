import {
  ReactNode,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { css } from "@emotion/react"
import {
  Address,
  Badge,
  Button,
  ButtonIcon,
  ButtonText,
  Fieldset,
  IconPlus,
  IconTrash,
  Slider,
  TextInput,
  gu,
  shortenAddress,
  isAddress,
  useEsc,
} from "kit"
import {
  ContentLayout,
  ContentLayoutHeading,
  ContentLayoutSection,
} from "../ContentLayout"
import { useEthereum } from "../Ethereum"
import { useLayout } from "../styles"
import { ErrorSummary } from "./ErrorSummary"
import { StepProps } from "./types"
import { useSpectralize } from "./use-spectralize"

const REWARDS_MAX = 50

export function Step2({ title, onPrev, onNext }: StepProps) {
  const data = useSpectralize()
  const layout = useLayout()
  const { account } = useEthereum()
  const { rewardsSplit, addRewardsSplitAddress, removeRewardsSplitAddress } =
    data

  const submitAddingAccount = useRef<
    (() => { invalid: boolean; account: Address | null }) | undefined
  >()
  const handleSubmit = useCallback(
    (event) => {
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
    [addRewardsSplitAddress, onNext]
  )

  const hasFilledCurrentAccountInRewards = useRef(rewardsSplit.length > 0)
  useEffect(() => {
    if (
      rewardsSplit.length === 0 &&
      !hasFilledCurrentAccountInRewards.current
    ) {
      addRewardsSplitAddress(account)

      // Make sure we only prefill the account once
      hasFilledCurrentAccountInRewards.current = true
    }
  }, [account, rewardsSplit, addRewardsSplitAddress])

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
                  css={({ colors }) => css`
                    font-size: 18px;
                    colors: ${colors.contentDimmed};
                  `}
                >
                  {data.rewardsPct}%
                </span>
              }
            >
              <Slider
                keyboardStep={(value, dir) =>
                  Math.round((value + (1 / REWARDS_MAX) * dir) * 1000) / 1000
                }
                labels={["0%", `${REWARDS_MAX}%`]}
                onChange={(value) =>
                  data.updateRewardsPct(Math.round(value * REWARDS_MAX))
                }
                value={data.rewardsPct / REWARDS_MAX}
              />
            </Fieldset>

            <Fieldset
              label="Split creator & community rewards"
              error={data.fieldError("rewardsSplit")}
            >
              <div
                css={css`
                  padding-bottom: 2gu;
                `}
              >
                {data.rewardsSplit.map((account) => (
                  <EthAddressRow
                    key={account}
                    address={account}
                    onRemove={() => removeRewardsSplitAddress(account)}
                    reward={`${data.rewardsPct}%`}
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
                label="Back"
                mode="secondary-2"
                shadowInBox
                onClick={onPrev}
              />
              <Button type="submit" label="Next" mode="primary-2" shadowInBox />
            </div>
          )}
        </ContentLayoutSection>
      </ContentLayout>
    </form>
  )
}

type EthAddressRowProps = {
  address: Address
  onRemove: () => void
  reward: ReactNode
}

function EthAddressRow({ address, onRemove, reward }: EthAddressRowProps) {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding-top: 1.5gu;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            width: 22gu;
          `}
        >
          <Badge
            alt={address}
            label={
              <span
                css={({ colors }) => css`
                  font-size: 16px;
                  color: ${colors.accent};
                `}
              >
                {shortenAddress(address)}
              </span>
            }
          />
        </div>
        <ButtonIcon
          icon={<IconTrash size={2.5 * gu} />}
          label="Remove"
          onClick={onRemove}
          css={css`
            width: 3gu;
            height: 3gu;
          `}
        />
      </div>
      <span
        css={({ colors }) => css`
          display: flex;
          align-items: center;
          font-size: 18px;
          color: ${colors.contentDimmed};
        `}
      >
        {reward}
      </span>
    </div>
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
    []
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

  useEsc(() => {
    if (isFocused()) {
      setAccount(null)
    }
  }, true)

  useEffect(() => {
    setInvalid(false)
  }, [account])

  return account === null ? (
    <Button
      icon={<IconPlus />}
      label="Add ETH address"
      mode="flat-3"
      size="compact"
      onClick={() => setAccount("")}
      css={css`
        text-transform: uppercase;
      `}
    />
  ) : (
    <div
      ref={container}
      css={css`
        display: flex;
        align-items: center;
        gap: 2gu;
      `}
    >
      <div
        css={css`
          flex-grow: 1;
        `}
      >
        <TextInput
          error={invalid}
          autofocus={true}
          onChange={(value) => setAccount(value)}
          placeholder="0x…"
          value={account}
        />
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 1gu;
        `}
      >
        <ButtonText label="Cancel" onClick={() => setAccount(null)} />
        <Button label="Add" mode="flat-3" size="compact" type="submit" />
      </div>
    </div>
  )
}
