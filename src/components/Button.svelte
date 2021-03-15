<script>
  export { _class as class };

  let _class
</script>

<style lang="scss">
  button/*, input[type="submit"], input[type="reset"]*/ {
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