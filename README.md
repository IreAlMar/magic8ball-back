# Magic 8 ball Back

## Back-end: NodeJS & Express

1. `npm init -y`
1. `npm install --save express`
1. `npm install --save-dev @babel/core @babel/node @babel/preset-env`
1. `npm install --save body-parser`
1. `npm install --save-dev nodemon`
1. Add script in `package.json` -> "start": "npx nodemon --exec npx babel-node src/server.js"

## MongoDB and NodeJS integration

1. `myproject-back-end> npm install --save mongodb`

## MongoDB Commands

1. Start MongoDB:
  `"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="C:\Users\path\to\the\folder\data\db"`
  Another command line window:
  `"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"`
1. Use/create DB:
`use.mydb`
1. Create collection:
`db.createCollection("mycollection", options)`
1. Insert object in collection:
`db.mycollection.insert({ "Your JavaScript code here" })`
1. Show all elements in a a collection (table):
`db.mycollection.find({}).pretty()`
1. Find an object matching a criteria:
`db.mycollection.find({ key: 'value' }).pretty()`
1. Find one result matching a criteria:
`db.mycollection.findOne({ key: 'value' })`
1. Change log level:
`db.setProfilingLevel(2)`
1. Show logs:
`db.system.profile.find().pretty()`
1. Remove all elements in a collection:
`db.questions.remove({})`
1. Exit
`ctrl + c`

## Release

1. Build front-end `npm run build`
1. Copy build front-end folder inside src back-end folder.
1. Tell express where to take the static images: `app.use(express.static(path.join(__dirname, '/build')));`
1. Tell express that all the routes that don't match the others go to the front-end:

```javascript
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});
