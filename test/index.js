const crawl = require('../index')

const parser = crawl(`
<html>
  <head>
    <title>Div Align Attribbute</title>
    <link rel="hello"/>
    <script id="adp2" data-cfasync="false">(function(w, d) {var s = d.createElement('script'); s.src = '//delivery.adrecover.com/18107/adRecover.js'; s.type = 'text/javascript'; s.async = true; (d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]).appendChild(s); })(window, document);</script>
  </head>
  <body>
    <div align="left">
      Lorems ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </div>
    <div align="right">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </div>
    <div align="center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </div>
    <div align="justify">
      Lorem ipsum dolor <b>sit amet<b/>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </div>
    <form>
      <label for="username">Username:</label>
      <label for="password">Password:</label>
      <datalist id="Options">
        <option value="Option1"></option>
        <option value="Option2"></option>
        <option value="Option3"></option>
        </br>
      </datalist>
    <nav>
    <ul>
        <li id="world"><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact us</a></li>
    </ul>
    </nav>
</form>
<footer>&copy;Company A</footer>
</body>
</html>`)

console.time('start')
//console.log({ parser: parser.children[0].children })
console.log({ parser: crawl.find('script').children })
console.log({ parser: crawl.findBy('hello', 'rel') })
console.timeEnd('start')