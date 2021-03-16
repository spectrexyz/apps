<script>
  import { Appear, ASCII, Header, Square } from "../components";

  const transitions = {
    header: () => ({ delay: 100, scale: 1.4 }),
    item: (index) => ({ delay: 600 + index * 150, scale: 1.1 }),
    soon: () => ({ delay: 1400, scale: 1.3 }),
    icon: (index) => ({ delay: 1200 + index * 400, scale: 1.8 }),
  };

  const items = [
    [
      "Artists",
      "Turn your NFTs into ERC20s and benefit from your upcoming work appreciation.",
    ],
    [
      "Owners",
      "Own NFT shares and gain exposure to exclusive artworks or curated NFT indexes.",
    ],
    [
      "Traders",
      "Track the market dynamics of artworks or artists block per block.",
    ],
    ["Developers", "Use NFTs spectres as collaterals in any DeFi protocol."],
  ];

  const icons = [
    ["Discord", "https://discord.gg/2svAvzJm", "discord.svg"],
    ["Twitter", "https://twitter.com/spectrexyz", "twitter.svg"],
  ];
</script>

<style lang="scss">
  .content-items li {
    padding: 0.5 * $GU 0;
  }

  .emphasize {
    background-color: $cyan;
    color: $black;
    font-weight: $bold;
    padding: 0px calc(1em / 3);
    width: fit-content;
  }

  .icons {
    position: relative;
    display: flex;
    gap: 1 * $GU;
    a {
      display: flex;
    }
    img {
      border-radius: 0.5 * $GU;
    }
  }

  .soon {
    padding: 4 * $GU 0;
  }
</style>

<Appear {...transitions.header()}>
  <Header />
</Appear>

<ul class="content-items">
  {#each items as item, index}
    <Appear {...transitions.item(index)}>
      <li>
        <span class="emphasize">{item[0]}</span>
        {item[1]}
      </li>
    </Appear>
  {/each}
</ul>

<Appear {...transitions.soon()}>
  <div class="soon" title="Spectre is coming">
    <ASCII message="SPECTRE_IS_COMING" interval={25} />
  </div>
</Appear>

<div class="icons">
  {#each icons as icon, index}
    <Appear {...transitions.icon(index)}>
      <a href={icon[1]} title={icon[0]} target="_blank">
        <img src={`/img/${icon[2]}`} height="35" alt="" />
      </a>
    </Appear>
  {/each}
</div>
