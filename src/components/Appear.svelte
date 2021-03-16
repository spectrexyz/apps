<script>
  import { spring as svelteSpring } from "svelte/motion";

  export let delay = 0;
  export let scale = 1.05;
  export let spring = {};

  const appearSpring = svelteSpring(
    { scale, opacity: 0 },
    { stiffness: 0.05, damping: 0.5, precision: 0.0001, ...spring }
  );

  setTimeout(() => {
    appearSpring.set({ opacity: 1, scale: 1 });
  }, delay);
</script>

<style lang="scss">
  .content {
    display: flex;
  }
</style>

<div class="content">
  <div
    style="
      opacity: {$appearSpring.opacity};
      transform: scale3d({$appearSpring.scale}, {$appearSpring.scale}, {$appearSpring.scale});
      transform-origin: 50% 50%;
    "
  >
    <slot />
  </div>
</div>
