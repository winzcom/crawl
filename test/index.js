const crawl = require('../index')

const parser = crawl(`
<html>
  <head>
    <title>Div Align Attribbute</title>
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
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
console.log({ parser: crawl.find('div')})
console.log({ parser: crawl.findBy('"Options"', 'id')})
console.timeEnd('start')