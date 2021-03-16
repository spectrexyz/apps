<script>
  import { Appear, ASCII, Header, Square } from "../components";

  const transitions = {
    header: { delay: 100, scale: 1.4 },
    content: { delay: 600, scale: 1.1 },
    soon: { delay: 1400, scale: 1.3 },
    icons: { delay: 1000, scale: 1.2 },
  };
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

  .soon {
    padding: 4 * $GU 0;
  }
</style>

<Appear {...transitions.header}>
  <Header />
</Appear>

<Appear {...transitions.content}>
  <ul>
    <li>
      <span class="emphasize">Artists</span> Turn your NFTs into ERC20s and benefit
      from your upcoming work appreciation.
    </li>
    <li>
      <span class="emphasize">Owners</span> Own shares of NFTs to gain exposure to
      exclusive artworks or community-curated NFTs indexes.
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
</Appear>

<Appear {...transitions.soon}>
  <div class="soon" title="Spectre is coming">
    <ASCII message="SPECTRE_IS_COMING" />
  </div>
</Appear>

<Appear {...transitions.icons}>
  <div class="icons">
    <a href="https://discord.gg/2svAvzJm" target="_blank"
      ><img class="discord" src="/img/discord.svg" alt="Discord" /></a
    >
    <a href="https://twitter.com/spectrexyz" target="_blank"
      ><img class="twitter" src="/img/twitter.svg" alt="Twitter" /></a
    >
  </div>
</Appear>
