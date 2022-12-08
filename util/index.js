function readAttributes(attrs, obj) {
    attrs = attrs.trimStart()
    const attr_pl = attrs.split(/\s/)
    obj.attributes = {}
    for(let i = 0;  i < attr_pl.length; i += 1) {
      key_value = attr_pl[i].split('=')
      obj.attributes[key_value[0]] = key_value[1].replace(/"/g, '')
    }
}

function stripQuotes() {

}


module.exports = {
    readAttributes
}