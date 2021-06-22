const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const util = require("util");
const fs = require("fs");
const ejs = require("ejs");
//promisify
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
//setting up an ejs render
async function render(p) {
  try {
    //create output directory
    await mkdir("dist", { recursive: true });

    //render ejs template to html string
    const html = await ejs
      .renderFile(path.join(__dirname,"/views/"+p+".ejs"), { config:require('../config'),balance:require('../model/balance'),async: true})
      .then((output) => output);
    //create file and write html
    await writeFile(path.join(__dirname,"/dist/"+p+".html"), html, "utf8");
  } catch (error) {
    console.log(error);
  }
}

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,"/public/")));
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/jquery/dist/js")));

const main = async (req, res) => {
    let p = req._parsedOriginalUrl.path;
    if(p == '/')p = 'index';
    else p = p.replace('/','');
    await render(p);
    res.sendFile(path.join(__dirname,"/dist/"+p+".html"));
};

app.get('/',main);
app.get('/balance',main);

app.listen(3000, () => {
    console.log(`Loaded server on port ${chalk.green('3000')}`);
});