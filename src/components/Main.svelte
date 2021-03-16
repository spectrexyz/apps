<style lang="scss">
  main {
    padding: $GU;
    margin: auto;
    min-height: 100vh;
    width: 100vw;
    position: relative;

    @media only screen and (min-width: 980px) {
      max-width: 980px;
    }
  }
</style>

<main><slot /></main>
