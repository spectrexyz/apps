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
    display: flex;
    width: 18 * $GU;
    height: 19 * $GU;
    padding-top: 6 * $GU;
    position: relative;
    user-select: none;
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
    <h2 class="space-top">» where one becomes multitude</h2>
  </Typewriter>
</header>
