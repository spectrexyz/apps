import type { MutationStatus } from "@tanstack/react-query"
import type { Url } from "moire"
import type { SignTxAndWaitStatus } from "../types"

import {
  Button,
  Details,
  gu,
  IconArrowClockwise,
  IconGithubLogo,
  IconShare,
  IconShieldCheck,
  Moire,
  ProgressIndicator,
  springs,
  useDimensions,
  useTheme,
} from "moire"
import { a, useChain, useSpringRef, useTransition } from "react-spring"
import { match, P } from "ts-pattern"

type ModeAsyncTask = {
  type: "async-task"
  description: (status: MutationStatus) => string
  onRetry: () => void
  status: MutationStatus
}

type ModeSuccess = {
  type: "success"
  action: [string, () => void]
  description: string
}

type ModeTransaction = {
  type: "transaction"
  current: number
  etherscanUrl: Url
  githubUrl: Url
  onRetry: () => void
  onSign: () => void
  status: SignTxAndWaitStatus
  total: number
  txLabel: string
}

type Mode = ModeTransaction | ModeAsyncTask | ModeSuccess

function getDescription(mode: Mode) {
  return match(mode)
    .with({ type: "transaction" }, (mode) =>
      match(mode.status)
        .with(
          "sign:error",
          () =>
            "An error has occurred while signing the transaction. "
            + "Hit the retry button to sign the transaction again.",
        )
        .with("sign:idle", () => (
          "Hit the button below to sign the transaction in your wallet. "
          + "Don’t close this tab while the transaction is pending."
        ))
        .with("sign:loading", () => (
          "Check your wallet and sign the transaction there. "
          + "Don’t close this tab while the transaction is pending."
        ))
        .with("tx:loading", () => (
          "Please wait while your transaction is being confirmed. "
          + "Don’t close this tab while the transaction is pending."
        ))
        .with(
          "tx:error",
          () => ("An error has occurred preventing the transaction to be confirmed. "
            + "Hit the button below to retry signing the transaction."),
        )
        .with(
          "tx:success",
          () => "The transaction has been successfully confirmed.",
        )
        .otherwise(() => (
          "Confirm the transaction in your wallet to continue. "
          + "Don’t close this tab while the transaction is pending."
        )))
    .with({ type: "async-task" }, (mode) => mode.description(mode.status))
    .with({ type: "success" }, (mode) => mode.description)
    .exhaustive()
}

export function AsyncTask({
  mode,
  preview,
  title,
}: {
  mode: Mode
  preview?: Url | string // URL or path
  title: string
}) {
  const { colors } = useTheme()

  const description = getDescription(mode)

  const footerBounds = useDimensions()

  const transitionRefs = [
    useSpringRef(),
    useSpringRef(),
    useSpringRef(),
  ]

  const descriptionTransitions = useTransition(description, {
    ref: transitionRefs[0],
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(1.1)" },
    config: springs.appear,
  })

  const contentTransitions = useTransition(mode, {
    ref: transitionRefs[1],
    keys: (mode) => {
      return mode.type + (
        mode.type === "transaction" && mode.status === "sign:idle"
      )
    },
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(1.1)" },
    config: springs.appear,
  })

  const footerTransitions = useTransition(mode, {
    ref: transitionRefs[2],
    keys: (mode) => {
      return mode.type + (
        mode.type === "transaction" && mode.status.endsWith(":error")
      )
    },
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(1.1)" },
    config: springs.appear,
  })

  useChain(transitionRefs, [0, 0.05, 0.1])

  return (
    <section
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "5gu 0",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4gu",
          width: "100%",
          paddingTop: "5gu",
          background: "colors.background",
          border: "1px solid colors.layer2",
        }}
      >
        <div
          css={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "42.5gu",
            aspectRatio: "1",
          }}
        >
          <Moire
            height={42.5 * gu}
            width={42.5 * gu}
            linesColor={colors.accent}
            backgroundColor={colors.background}
            css={{
              position: "absolute",
              zIndex: "1",
              inset: "0 auto auto 0",
              opacity: 0.5,
            }}
          />
          <div
            css={{
              position: "relative",
              zIndex: "2",
              background: `url(${preview}) no-repeat 50% 50%`,
              backgroundSize: "cover",
              height: "36.25gu",
              width: "36.25gu",
            }}
          />
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3gu",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1 css={{ font: "500 32px fonts.sans" }}>
            {title}
          </h1>
          <div
            css={{
              position: "relative",
              width: "100%",
              height: "66px", // 22px line height x 3
            }}
          >
            {descriptionTransitions((styles, description) => (
              <a.div
                style={styles}
                css={{
                  position: "absolute",
                  inset: "0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  css={{
                    width: "100%",
                    padding: "0 5gu",
                    font: "300 16px/22px fonts.mono",
                    color: "colors.contentDimmed",

                    // truncate
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: "3",
                    overflow: "hidden",
                  }}
                >
                  {description}
                </p>
              </a.div>
            ))}
          </div>
        </div>

        <div
          css={{
            position: "relative",
            width: "100%",
            height: "6gu",
          }}
        >
          {contentTransitions((styles, mode) => (
            <a.div
              style={styles}
              css={{
                position: "absolute",
                inset: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {match(mode)
                .with(
                  { type: "transaction", status: "sign:idle" },
                  (mode) => (
                    <Button
                      label="Create transaction"
                      mode="primary"
                      onClick={mode.onSign}
                    />
                  ),
                )
                .with(
                  { type: "transaction" },
                  (mode) => (
                    <div
                      css={{
                        display: "grid",
                        gap: "1.5gu",
                        gridTemplateColumns: "6gu 1fr",
                      }}
                    >
                      <div>
                        {match(mode)
                          .with(
                            { status: P.when((s) => s.endsWith(":error")) },
                            () => <ProgressIndicator status="error" />,
                          )
                          .with(
                            { status: P.when((s) => s.endsWith(":loading")) },
                            () => <ProgressIndicator status="loading" />,
                          )
                          .with(
                            { status: P.when((s) => s.endsWith(":success")) },
                            () => <ProgressIndicator status="success" />,
                          )
                          .otherwise(() => null)}
                      </div>
                      <div
                        css={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          padding: "0.25gu 0",
                          font: "14px/1.5 fonts.sans",
                        }}
                      >
                        <div
                          css={{
                            fontSize: "12px",
                            textTransform: "uppercase",
                            color: "colors.contentDimmed",
                          }}
                        >
                          <span>
                            {match(mode)
                              .when(
                                (mode) => mode.status.startsWith("sign:"),
                                () => "Signing transaction",
                              )
                              .when(
                                (mode) => mode.status.startsWith("tx:"),
                                () => "Confirming transaction",
                              )
                              .otherwise(() => "Ethereum transaction")}
                          </span>
                          <span>
                            {` (${mode.current}/${mode.total})`}
                          </span>
                        </div>
                        <div css={{ color: "colors.content" }}>
                          {mode.txLabel}
                        </div>
                      </div>
                    </div>
                  ),
                )
                .with(
                  { type: "async-task", status: "loading" },
                  () => <ProgressIndicator status="loading" />,
                )
                .with(
                  { type: "async-task", status: "success" },
                  () => <ProgressIndicator status="success" />,
                )
                .with(
                  { type: "success" },
                  (mode) => (
                    <Button
                      label={mode.action[0]}
                      onClick={mode.action[1]}
                    />
                  ),
                )
                .otherwise(() =>
                  mode.type + " · " + (mode.type !== "success" && mode.status)
                )}
            </a.div>
          ))}
        </div>

        <div
          css={{
            position: "relative",
            width: "100%",
            height: "11gu",
          }}
        >
          {footerTransitions((styles, mode) => (
            <a.div
              ref={footerBounds.observe}
              style={styles}
              css={{
                position: "absolute",
                inset: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "11gu",
              }}
            >
              {match(mode)
                .with(
                  { type: "transaction" },
                  (mode) =>
                    mode.status.endsWith(":error")
                      ? (
                        <div css={{ height: "11gu" }}>
                          <Button
                            icon={<IconArrowClockwise />}
                            label="Retry"
                            mode="flat"
                            onClick={mode.onRetry}
                            size="compact"
                            uppercase={true}
                          />
                        </div>
                      )
                      : (
                        <section css={{ width: "100%", paddingBottom: "5gu" }}>
                          <Details
                            background={colors.background}
                            contextual={null}
                            heading={
                              <span
                                css={{
                                  display: "flex",
                                  gap: "1.5gu",
                                  alignItems: "center",
                                }}
                              >
                                <IconShieldCheck
                                  size={3 * gu}
                                  css={{ color: "colors.accent2" }}
                                />
                                <span>
                                  Contract information
                                </span>
                              </span>
                            }
                            headingCentered
                            headingColor={colors.contentHeading}
                          >
                            <div
                              css={{
                                display: "flex",
                                gap: "1.5gu",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                external={true}
                                href={mode.etherscanUrl}
                                icon={<IconShare />}
                                label="Etherscan"
                                mode="flat"
                              />
                              <Button
                                external={true}
                                href={mode.githubUrl}
                                icon={<IconGithubLogo />}
                                label="GitHub"
                                mode="flat"
                              />
                            </div>
                          </Details>
                        </section>
                      ),
                )
                .otherwise(() => null)}
            </a.div>
          ))}
        </div>
      </div>
    </section>
  )
}
