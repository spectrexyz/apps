<script>
  export { _class as class };

  let _class;
</script>

<style lang="scss">
  button {
    // reset
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: inherit;

    // style
    background: $green;
    color: $black;
    padding: $GU;

    &:hover {
      background: $cyan;
    }
  }
</style>

<button class={_class}>
  <slot />
</button>
