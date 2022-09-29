import type { MutationStatus } from "@tanstack/react-query"
import type { Url } from "moire"
import type { SignTxAndWaitStatus } from "../types"

import {
  Button,
  ButtonText,
  Details,
  gu,
  IconGithubLogo,
  IconShare,
  IconShieldCheck,
  Moire,
  noop,
  ProgressIndicator,
  useTheme,
} from "moire"
import { match, P } from "ts-pattern"

type ModeAsyncTask = {
  type: "async-task"
  description: (status: MutationStatus) => string
  onRetry: () => void
  status: MutationStatus
  action: [string, (() => void) | null] // label of the main button, usually staying disabled and representing the next task
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
  signLabel: string
}

type Mode = ModeTransaction | ModeAsyncTask | ModeSuccess

export function AsyncTask({
  jobDescription,
  jobTitle,
  mode,
  onAbandon,
  preview,
  title,
}: {
  jobDescription: string
  jobTitle: string
  mode: Mode
  onAbandon?: () => void
  preview?: Url | string // URL or path
  title: string
}) {
  const { colors } = useTheme()
  return (
    <section
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "75gu",
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
          padding: "5gu 0 4gu",
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
            }}
          >
            <JobStatus
              description={match(mode)
                .with(
                  { type: "transaction", status: "tx:error" },
                  () =>
                    "An error has occured while signing the transaction, please retry.",
                )
                .with(
                  { type: "transaction", status: "tx:loading" },
                  () =>
                    "The transaction has been sent, waiting for confirmation.",
                )
                // Generic error message
                .with(
                  {
                    type: P.not("success"),
                    status: P.when((status) =>
                      status.endsWith(":error") || status === "error"
                    ),
                  },
                  () => "An error has occurred at this time, please retry.",
                )
                .otherwise(() => jobDescription)}
              jobNumber={mode.type === "transaction" ? mode.current : undefined}
              title={match(mode)
                .with(
                  { type: "transaction" },
                  (mode) =>
                    match(mode.status)
                      .with("tx:success", () => "Transaction confirmed")
                      .with(
                        "sign:error",
                        () => "Signing the transaction failed",
                      )
                      .with(
                        "prepare:error",
                        () => "Preparing the transaction failed",
                      )
                      .with(
                        "tx:error",
                        () => "The transaction failed",
                      )
                      .otherwise(() => jobTitle),
                )
                .otherwise(() => jobTitle)}
              status={match(mode)
                .with({ type: "success" }, () => "success" as const)
                .with({ type: "async-task" }, (mode) => mode.status)
                .with(
                  { type: "transaction", status: "tx:loading" },
                  () => "loading" as const,
                )
                .with(
                  {
                    type: "transaction",
                    status: P.union(
                      "prepare:error",
                      "sign:error",
                      "tx:error",
                    ),
                  },
                  () => "error" as const,
                )
                .with(
                  { type: "transaction", status: "tx:success" },
                  () => "success" as const,
                )
                .with(
                  { type: "transaction" },
                  () => "idle" as const,
                )
                .otherwise(() => "idle" as const)}
            />
          </div>
        </div>

        <div
          css={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "2gu",
            width: "100%",
            padding: "6gu 5gu 0",
          }}
        >
          {mode.type !== "success" && (
            <Button
              label="Abandon"
              wide
              onClick={() => {
                if (confirm("Are you sure you want to abandon?")) {
                  onAbandon?.()
                }
              }}
              disabled={match(mode)
                .with(
                  {
                    type: "transaction",
                    status: P.union("tx:loading", "tx:success"),
                  },
                  () => true,
                )
                .otherwise(() => false)}
            />
          )}
          <Button
            label={match(mode)
              .with(
                { type: "async-task" },
                (mode) => mode.action[0],
              )
              .with(
                { type: "transaction" },
                (mode) =>
                  match(mode.status)
                    .when(
                      (status) => status.endsWith(":error"),
                      () => "Retry",
                    )
                    .otherwise(() => mode.signLabel),
              )
              .with(
                { type: "success" },
                (mode) => mode.action[0],
              )
              .otherwise(() => "OK")}
            onClick={match(mode)
              .when(
                (mode) => (
                  mode.type !== "success" && (
                    mode.status.endsWith(":error") || mode.status === "error"
                  )
                ),
                (mode) =>
                  () => {
                    if (mode.type !== "success") {
                      mode.onRetry()
                    }
                  },
              )
              .with(
                { type: "transaction" },
                (mode) =>
                  () => {
                    mode.onSign()
                  },
              )
              .with(
                { type: "success" },
                (mode) => mode.action[1],
              )
              .otherwise(() => noop)}
            disabled={match(mode)
              .with(
                { type: "async-task" },
                (mode) => mode.action[1] === null,
              )
              .with(
                {
                  type: "transaction",
                  status: P.union("tx:loading", "tx:success"),
                },
                () => true,
              )
              .otherwise(() => false)}
            mode="primary"
            wide
          />
        </div>

        {mode.type === "transaction" && (
          <section css={{ width: "100%", padding: "0 5gu" }}>
            <Details
              contextual={null}
              heading={
                <span>
                  Contract information
                  <span
                    css={{
                      position: "absolute",
                      inset: "0 0 auto auto",
                      display: "flex",
                      alignItems: "center",
                      height: "6gu",
                      paddingRight: "1.5gu",
                    }}
                  >
                    <IconShieldCheck
                      size={3 * gu}
                      css={{
                        color: "colors.accent2",
                      }}
                    />
                  </span>
                </span>
              }
              headingColor={colors.contentHeading}
            >
              <div
                css={{
                  display: "flex",
                  gap: "2gu",
                  width: "100%",
                }}
              >
                <ButtonText
                  color={colors.link}
                  external
                  href=""
                  icon={<IconShare size={3 * gu} />}
                  label="Etherscan"
                  uppercase
                  css={{ fontSize: "16px" }}
                />
                <ButtonText
                  color={colors.link}
                  external
                  href=""
                  icon={<IconGithubLogo size={3 * gu} />}
                  label="GitHub"
                  uppercase
                  css={{ fontSize: "16px" }}
                />
              </div>
            </Details>
          </section>
        )}
      </div>
    </section>
  )
}

function JobStatus({
  description,
  jobNumber,
  title,
  status,
}: {
  description: string
  jobNumber?: number
  title: string
  status: MutationStatus
}) {
  return (
    <section
      css={{
        display: "flex",
        flexDirection: "row-reverse",
        gap: "3gu",
        width: "50gu",
        margin: "0 auto",
      }}
    >
      <div
        css={{
          font: "300 16px/22px fonts.mono",
          textAlign: "left",
          color: "colors.contentDimmed",
        }}
      >
        <h1 css={{ font: "20px/2.2 fonts.sans" }}>
          {title}
        </h1>
        <p
          css={{
            // truncate
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "3",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
      </div>
      <div css={{ paddingTop: "1.5gu" }}>
        <ProgressIndicator status={status} number={jobNumber} />
      </div>
    </section>
  )
}
