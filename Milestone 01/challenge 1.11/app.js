const express = require('express')
var app = express()
app.use(express.json())
var confessions = []
var x = 0
function handleAll(req, res, t) {
  var d = req.body
  var r = req.params
  if (t === 'create') {
    if (!d) {
      res.status(400).json({msg: 'bad'})
    } else {
      if (d.text) {
        if (d.text.length < 500) {
          if (d.text.length > 0) {
            var categories = ["bug", "deadline", "imposter", "vibe-code"]
            if (categories.includes(d.category)) {
              var tmp = {
                id: ++x,
                text: d.text,
                category: d.category,
                created_at: new Date()
              }
              confessions.push(tmp)
              console.log("added one info " + tmp.id)
              res.status(201).json(tmp)
            } else {
              res.status(400).send("category not in stuff")
            }
          } else {
            res.status(400).send("too short")
          }
        } else {
          res.status(400).json({ error: "text too big, must be less than 500 characters long buddy" })
        }
      } else {
        res.status(400).json({msg: 'need text'})
      }
    }
  } else if (t === 'getAll') {
    let arr = confessions.sort((a, b) => b.created_at - a.created_at)
    var result={
      data: arr,
      count: arr.length
    }
    console.log("fetching all data result")
    res.json(result)
  } else if (t === 'getOne') {
    var i = parseInt(r.id)
    const info = confessions.find(fn => fn.id === i)
    if (info) {
      if (info.text) {
        console.log("found info with " + info.text.length + " chars")
        res.json(info)
      } else {
        res.status(500).send("broken")
      }
    } else {
      res.status(404).json({msg: 'not found'})
    }
  } else if (t === 'getCat') {
    var cat = r.cat
    var cats = ["bug", "deadline", "imposter", "vibe-code"]
    if (cats.includes(cat)) {
      let stuff = confessions.filter(function(x) { 
        if (x.category === cat) {
          return true
        }
        return false
      }).reverse()
      res.json(stuff)
    } else {
      res.status(400).json({msg: 'invalid category'})
    }
  } else if (t === 'del') {
    if (req.headers['x-delete-token'] !== 'supersecret123') {
      res.status(403).json({msg: 'no permission'})
    } else {
      if (r.id) {
        var i = parseInt(r.id)
        var handler = confessions.findIndex(item => item.id === i)
        if (handler !== -1) {
          var res2 = confessions.splice(handler, 1)
          console.log("deleted something")
          res.json({msg: "ok", item: res2[0]})
        } else {
          res.status(404).json({msg: "not found buddy"})
        }
      } else {
        res.status(400).send("no id")
      }
    }
  } else {
    res.status(500).send("error")
  }
}
app.post('/api/v1/confessions', function(req, res) { handleAll(req, res, 'create') })
app.get('/api/v1/confessions', (req, res) => { handleAll(req, res, 'getAll') })
app.get('/api/v1/confessions/:id', function(req, res) { 
  handleAll(req, res, 'getOne') 
})
app.get('/api/v1/confessions/category/:cat', function(req, res) { 
  if (req.params.cat) {
    handleAll(req, res, 'getCat') 
  }
})
app.route('/api/v1/confessions/:id').delete(function(req, res) {
  handleAll(req, res, 'del')
})
app.listen(3000, function() {
  var startStr = 'running on 3000'
  console.log(startStr)
})
if (confessions.length > 500) {
  console.log("too many")
}
