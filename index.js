const { readAttributes } = require('./util')

let root

function crawl(html) {
    let s = 0, is_new_line = false, new_line_char = '\n'
    
    function dfs(parent_tag) {
      let new_child = { children: [] }, open_close = '', closed = false
      let children_records = {}
      let read_chars = '', is_closing_tag = false, attributes = false
      for(; s < html.length; s += 1) {
        if(html[s] == new_line_char) {
          is_new_line = true
          continue
        }
        if(html[s] == '<') {
          if(open_close == '<') {
            throw new Error('invalid html')
          }
          if(closed) {
            const n = dfs(new_child.tag)
            if(n.end) {
              if(!attributes && read_chars.length > 0) {
                new_child.children.push({
                  type: 'text',
                  value: read_chars
                })
              } 
              else if(n.end_tag !== new_child.tag && !children_records[n.end_tag]) {
                new_child.children.push({
                  children: [], 
                  end_tag: n.end_tag
                })
              }
              if(!children_records[n.end_tag]) {
                return new_child
              }
            }
            n.tag !== '\n' && !n.end && new_child.children.push(n)
            children_records[n.tag] = true
            continue
          }
          if(!closed && read_chars != '') {
            s -= 1
            if(read_chars == '\n') {
              return
            }
            return {
              ...new_child,
              type:'text',
              value: read_chars
            }
          }
          open_close = '<' 
          continue
        }
        if(html[s] == '>') {
          if(open_close !== '<') {
            throw Error('Invalid html')
          }
          open_close = ''
          closed = true
          if(is_closing_tag) {
            // means we are done with this guy
            new_child.end_tag = read_chars
            new_child.end = true
            return new_child
          } else {
            !new_child.tag && (new_child.tag = read_chars)
            s += 1
            let cal = dfs(new_child.tag)
            if(cal && cal.tag !== '\n') {
               children_records[cal.tag || cal.end_tag] = true
               new_child.children.push(cal) 
            }
            attributes && readAttributes(read_chars, new_child)
            attributes = false
            if(cal.end) {
              return new_child
            }
          }
          read_chars = ''
          continue
        }
        if(html[s] == '/' && open_close == '<' && !attributes) {
          is_closing_tag = true
          continue
        }
        if(html[s] == ' ') {
          if(is_new_line) {
            continue
          }
          if(!closed && open_close == '<') {
             // this means we need to read attributes
            new_child.tag = read_chars
            read_chars = ''
            attributes = true
          }
        }
        is_new_line = false
        read_chars += html[s]
        // if(new_child.tag == 'p') {
        //   console.log({ read_chars, attributes })
        // }
      }
      return new_child
    }
    return root = dfs()
}

crawl.find = function (tag) {
    if(!root) {
        throw new Error('Please crawl page')
    }
    const queue = [root]
    while(queue.length > 0) {
        const next = queue.pop()
        if(next.tag == tag) {
            return next
        }
        const childs = next.children
        for(let c of childs) {
            queue.push(c)
        }
    }
    return
}

crawl.findBy = function(val, by) {
    if(!root) {
        throw new Error('Please crawl page')
    }
    const queue = [root]
    while(queue.length > 0) {
        const next = queue.pop()
        if(next.attributes && next.attributes[by] && next.attributes[by] == val) {
            return next
        }
        const childs = next.children
        for(let c of childs) {
            queue.push(c)
        }
    }
    return
}


module.exports = crawl