<script>
  import { createEventDispatcher } from "svelte";
  import Typewriter from "svelte-typewriter";
  import Square from "./Square.svelte";

  let done;

  const dispatch = createEventDispatcher();

  const handleDone = () => {
    done = true;
    dispatch("done");
  };
</script>

<style lang="scss">
  header {
    margin: $x-space 0;
    width: fit-content;
    position: relative;
  }
</style>

<header>
  {#if done}
    <Square />
  {/if}
  <Typewriter
    cascade
    interval={[40, 35, 60]}
    cursor="#95ffa4"
    on:done={handleDone}
  >
    <h1>spectre_</h1>
    <h2 class="space-top">» Where collectibles meet DeFi</h2>
  </Typewriter>
</header>
