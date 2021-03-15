<script>
  import { ASCII, Header, Square } from "../components";
  import { fly } from "svelte/transition";

  let typed = false;
</script>

<style lang="scss">
  .emphasize {
    background-color: $cyan;
    color: $black;
    font-weight: $bold;
    padding: 0px calc(1em / 3);
    width: fit-content;
  }

  .icons {
    position: relative;

    a {
      padding: 0;

      &:hover {
        background-color: transparent;
      }
    }

    img {
      height: 35px;

      &.twitter {
        margin-left: $GU;
        position: relative;
        top: -2px;
      }
    }
  }
</style>

<Header on:done={() => (typed = true)} />
{#if typed}
  <div transition:fly={{ y: 100, duration: 600 }}>
    <ul>
      <li>
        <span class="emphasize">Artists</span> Spectralize your NFTs into fungible
        ERC20s and pre-allocate some to yourself to benefit from your upcoming work
        appreciation.
      </li>
      <li>
        <span class="emphasize">Owners</span> Own shares of NFTs to gain exposure
        to exclusive artworks or community-curated NFTs indexes.
      </li>
      <li>
        <span class="emphasize">Traders</span> Track the market dynamics of artworks
        or artists block per block.
      </li>
      <li>
        <span class="emphasize">Developers</span> Use NFTs spectres as collaterals
        in any DeFi protocol.
      </li>
    </ul>
    <ASCII class="x-space-top" message="SPECTRE_IS_COMING" />
    <div class="icons x-space-top">
      <a href="https://discord.gg/2svAvzJm" target="_blank"
        ><img class="discord" src="/img/discord.svg" alt="discord" /></a
      >
      <a href="https://twitter.com/spectrexyz" target="_blank"
        ><img class="twitter" src="/img/twitter.svg" alt="twitter" /></a
      >
    </div>
  </div>
{/if}
