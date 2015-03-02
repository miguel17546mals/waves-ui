# WAVES - UI

_visualisation part of the [`wavesjs`] library._

wavesUI is a set of low level audio visualisation components build on top of [d3](http://d3js.org/) 

## Documentation

[https://ircam-rnd.github.io/waves/ui](https://ircam-rnd.github.io/waves/ui)

## Use

#### CommonJS (browserify)

install with npm

```bash
npm install --save wavesjs/ui
```

consume in your modules

```javascript
var wavesUI = require('waves-ui');
```

#### AMD (requireJS)

add the waves library to your config

```javascript
requirejs.config({
  paths: {
    waves: 'path/to/waves-ui.umd'
  }
});
```

consume in your modules

```javascript
define(['waves-ui'], function(wavesUI) {
  var timeline = wavesUI.timeline();

  // ...
});
```

#### Global

add the script tag in your at the bottom of the `<body>`

```html
<script scr="/path/to/waves-ui.umd.js"></script>
```

the library is exposed in `window.waves`


## Custom build

to create your own custom build, you need to

```bash
npm install -g browserify
npm install -g uglify-js
```

remove/comment all the component you don't need in `waves.js`, then run

```bash
npm run build
```

## List of components

- `timeline`
- `layer`
- `waveform`
- `segment`
- `marker`
- `breakpoint`
- `label`
- `zoomer`
- `utils`

## License

This module is released under the BSD-3-Clause license.

Acknowledgments

This code is part of the WAVE project, funded by ANR (The French National Research Agency),
