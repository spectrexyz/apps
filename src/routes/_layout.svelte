<script>
  import { Main } from "../components";

  export let segment;
</script>

<style lang="scss" global>
  @import "reset.scss";
  @import "global.scss";
</style>

<Main><slot {segment} /></Main>
