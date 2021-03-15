<script>
  import { fade } from 'svelte/transition';

  export let height = 300;
  export let width  = 300;
  export let em = 12;

  let columns, lines, loop, middle, current = '';

  $: {
    lines = Math.floor(height * 1.6632 / em);
    columns = Math.ceil(width / em);
    middle = Math.ceil(lines * columns / 2);
  }

  const _random = (long = true) => {
    const _long = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`';
    const _short = '0123456789abcdefghijklmnopqrstuvwxyz';

    if (_long) {
      return _long[Math.floor(Math.random() * _long.length)];
    } else {
      return _short[Math.floor(Math.random() * _short.length)];
    }
  }

  const _refresh = () => {
    let stop = true, _current = ''

    const _update = (index, letter, opts = { long: false }) => {
      if (!current[index]) {
        stop = false;
        _current += _random(opts.long);
      } else if (current[index] !== letter) {
        stop = false;
        _current += _random(opts.long);
      } else {
        _current += current[index];
      }
    }

    for (let i = 0; i <= lines * columns; i++) {
      switch (i) {
        case middle:
          _update(i, 's', { long: true });
          break;
        case (middle + 1):
          _update(i, 'p', { long: true });
          break;
        case (middle + 2):
          _update(i, 'e', { long: true });
          break;
        case (middle + 3):
          _update(i, 'c', { long: true });
          break;
        case (middle + 4):
          _update(i, 't', { long: true });
          break;
        case (middle + 5):
          _update(i, 'r', { long: true });
          break;
        case (middle + 6):
          _update(i, 'e', { long: true });
          break;
        default:
          _update(i, '`');
      }
    }

    current = _current

    if (stop) {
      clearInterval(loop);
    }
  }

  const square = () => {
    loop = setInterval(_refresh, 8);
  
    return {
      destroy() {
      }
    };
  }
</script>

<style lang="scss">
  #square {
    color: $cyan;
    opacity: 0.4;
    height: 300px;
    width: 300px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateX(50%) translateY(-50%);
    overflow: hidden;
    word-wrap: break-word;
  }
</style>

<div transition:fade={{duration: 2500 }} id="square" use:square style="height: {height}px; width: {width}px; font-size: {em}px; line-height: {em}px;">
  {current}
</div>