const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');
const fs = require('fs');

app.use(fileUpload({
  safeFileNames: true,
  preserveExtension: true
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
	const files = await fs.readdirSync('./file_uploads');
  // let filesSize = await fs.stats.size(files); //
	res.render("index.ejs", { files: files/*, size: filesSize*/ });
  // res.send('<meta http-equiv="refresh" content="0; url=https://dateanthony.com" />')
});

app.get('/favicon.ico', (req, res) => {
  res.status(404).send('Cannot GET /favicon.ico')
});

app.get('/:data', (req, res, next) => {
  let img = req.params.data;
  let imgExists = fs.existsSync(`/home/runner/${process.env.REPL_SLUG}/file_uploads/${img}`);
  if (!imgExists) return next() // Or in other words, return "Cannot GET /<path>"
  res.sendFile(`${__dirname}/file_uploads/${img}`)
})

app.post('/upload', async (req, res) => {
  if (!req.get('Authorization')) {
    return res.status(401).send(`You didn't specify an Authorization header in your request. Please specify it.`)
  }

  if (req.get('Authorization') != process.env.API_KEY) {
    return res.status(403).send(`Your upload key is invalid.`)    
  }
  let file = req.files.image;
  let fileName = req.files.image.name.split('.')
  fileName = fileName[fileName.length - 1]
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  var timestamp = new Date();
  var year = timestamp.getFullYear();
  var month = timestamp.getMonth() + 1;
  var month = month.toString();
  if(month.length==1){month="0"+month;};
  var day = timestamp.getDate();
  var day = day.toString();
  if(day.length==1){day="0"+day;};
  var hour = timestamp.getHours();
  var hour = hour.toString();
  if(hour.length==1){hour="0"+hour;};
  /* if(day >= 5) {
    if(month >= 11) {
      if(hour >= 23) {
        if(minute >= 59) {
          if(second >= 59) {
            var hour = 19 + getHours();
          }
        }
      }
    else {
      if(hour >= 23) {
        if(minute >= 59) {
          if(second >= 59) {
            var hour = 18 + getHours();
          }
        }
      }
    }
    }
  } */
  var minute = timestamp.getMinutes();
  var minute = minute.toString();
  console.log(minute.length);
  if(minute.length==1){minute="0"+minute;}
  var second = timestamp.getSeconds();
  console.log(minute.length);
  var second = second.toString();
  if(second.length==1){second="0"+second;};
  var name = year + '.' + month + '.' + day + '.' + hour + '.' + minute + '.' + second;
  file.mv(require('path').join(__dirname, `file_uploads/${name}.${fileName}`), async function (err)  {
    if(err) return res.status(500).send(err);
    res.send(`https://media.dateanthony.com/${name}.${fileName}`)
  })
})

// Do checks before making sure to turn on server:
if (!process.env.API_KEY) {
  console.error("Please make sure to specify an API key to verify it's you.")
  console.error("An easy way to do this is to generate a UUID, and then set the value to the API_KEY secret.")
  process.exit(1)
}

app.listen(3000, () => {
  console.log('ShareX uploader online!');
});