<script>
import { fade } from 'svelte/transition';

  export let height= 300
  export let width = 300

  const em = 12;

  let node
  let loop
  let content = ""
  let lines = Math.floor()
  const init = () => {

  }

  const random = (long = true) => {
    const _long = '0123456789abcdefghijklmnopqrstuvwxyz-_)()><*$%`'
    const _short = 'abcdefghijklmnopqrstuvwxyz><*$%`'

    if (long) {
      return _long[Math.floor(Math.random() * _long.length)]
    } else {
      return _short[Math.floor(Math.random() * _short.length)]
    }

  }


  const draw = () => {
  


    console.log('draw')
    const lines = Math.floor(height * 1.6632 / em) 
    const columns = Math.ceil(width / em);
    let _content = ''
    let middle = Math.ceil(lines * columns / 2)
    let stop = true

    const _update = (index, letter, opts = { long: false }) => {
      // console.log(index, letter)
      if (!content[index]) {
        stop = false
        _content += random(opts.long)
      } else if (content[index] !== letter) {
        stop = false
        _content += random(opts.long)
      } else {
        _content += content[index]
      }
    }

    for (let i = 0; i <= lines * columns; i++) {

      switch (i) {
        case middle:
          _update(i, 's', { long: true })
          break
        case (middle + 1):
          _update(i, 'p', { long: true })
          break;
        case (middle + 2):
          _update(i, 'e', { long: true })
          break;
        case (middle + 3):
          _update(i, 'c', { long: true })
          break;
        case (middle + 4):
          _update(i, 't', { long: true })
          break;
        case (middle + 5):
          _update(i, 'r', { long: true })
          break;
        case (middle + 6):
          _update(i, 'e', { long: true })
          break;
        default:
          _update(i, '`')
      }
    }

    if (stop) {
      clearInterval(loop);
    }


    node.nodeValue = _content
    content = _content
  }

  const square = () => {
    const square = document.getElementById("square");
    node = document.createTextNode("test");
    square.appendChild(node);


    loop = setInterval(draw, 50);
  
  return {
    destroy() {
      // node.removeEventListener('focus', handleFocus)
    }
  }
}

</script>


<style lang="scss">
  #square {
    color: $cyan;
    position: absolute;
    top: 50%;
    right:0;
    height: 300px;
    width: 300px;
    transform: translateX(50%) translateY(-50%);
    // z-index: -1;
    opacity: 0.4;
    @media only screen and (max-width: 600px) {
    }
  }
</style>

<div transition:fade={{duration: 2500 }} id="square" use:square style="height: {height}px; width: {width}px; font-size: {em}px; line-height: {em}px; overflow: hidden;">

</div>