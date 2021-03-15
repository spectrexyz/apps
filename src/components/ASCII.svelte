<script>
  import { onMount } from 'svelte';

  export { _class as class };

  export let message = 0;
  export let interval = 50;

  let _class, loop, current = '';

  const _random = () => {
    const alphabet = '0123456789ABCDEFGHIJKLMONOPRSTUVWXYZ-_)()><*$%`';

    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  const _refresh = () => {
    console.log('refresh')
    let stop = true, _current = '';

    for (let i = 0; i < message.length; i++) {
      if (current && current[i] === message[i]) {
        _current += current[i];
      } else {
        stop = false;
        _current += _random();
      }
    }

    current = _current;

    if (stop) clearInterval(loop);
  }

  onMount(() => {
    loop = setInterval(_refresh, interval);
  })
</script>

<style lang="scss">
  p {
    background: $green;
    color: $black;
    font-weight: bold;
    padding: 0px calc(1em/3);
    width: fit-content;
  }
</style>

<p class={_class}>
  {current}
</p>