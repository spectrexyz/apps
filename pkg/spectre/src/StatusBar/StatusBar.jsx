import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { AddressBadge, Button, springs } from "kit"
import { a, useTransition } from "react-spring"
import { ConnectionModal } from "./ConnectionModal.jsx"
import { Actions } from "../Actions/Actions.jsx"
import { useEthereum } from "../Ethereum"
import { useAppReady } from "../App/AppReady.jsx"

export function StatusBar() {
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const { account, wallet } = useEthereum()
  const { appReadyTransition } = useAppReady()

  useEffect(() => {
    if (account) {
      setShowConnectionModal(false)
    }
  }, [account])

  return (
    <>
      <div
        css={css`
          position: relative;
          overflow: hidden;
          height: 8gu;
        `}
      >
        {appReadyTransition(
          ({ progress, bottomBarTransform }, ready) =>
            ready && (
              <a.div
                style={{ opacity: progress, transform: bottomBarTransform }}
                css={({ colors }) => css`
                  display: flex;
                  align-items: center;
                  height: 100%;
                  padding: 0 2gu;
                  border-top: 1px solid ${colors.outline2};
                  justify-content: space-between;
                `}
              >
                {account ? (
                  <AddressBadge address={account} />
                ) : (
                  <Button
                    label="Connect account"
                    onClick={() => setShowConnectionModal(true)}
                  />
                )}
                <Actions />
              </a.div>
            )
        )}
      </div>
      <ConnectionModal
        visible={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
      />
    </>
  )
}
