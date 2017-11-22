
// database    table       rows|records
// database    collections documents
var async = require("async");
var MongoClient = require("mongodb").MongoClient;

var url = 'mongodb://localhost:27017/photo_app';
// var url = 'mongodb://hostname:port/database_name' 
var db;

MongoClient.connect(url, 
    {
        poolSize: 100, 
        w: 1 // tells us how many servers to confirm with before a confirmed write 
    },
    (err, dbase) => {
    if(err){
        console.log("bad");
        process.exit(-1); 
    }
    console.log('i have a connection')
    db = dbase; 
})


var pix = [
    { filename: "picture_01.jpg",
      albumid: "italy2012",
      description: "rome!",
      date: "2012/02/15 16:20:40" },
    { filename: "picture_04.jpg",
      albumid: "italy2012",
      description: "fontana di trevi",
      date: "2012/02/19 16:20:40" },
    { filename: "picture_02.jpg",
      albumid: "italy2012",
      description: "it's the vatican!",
      date: "2012/02/17 16:35:04" },
    { filename: "picture_05.jpg",
      albumid: "italy2012",
      description: "rome!",
      date: "2012/02/19 16:20:40" },
    { filename: "picture_03.jpg",
      albumid: "italy2012",
      description: "spanish steps",
      date: "2012/02/18 16:20:40" },

    { filename: "photo_05.jpg",
      albumid: "japan2010",
      description: "something nice",
      date: "2010/06/14 12:21:40" },
    { filename: "photo_01.jpg",
      albumid: "japan2010",
      description: "tokyo tower!",
      date: "2010/06/11 12:20:40" },
    { filename: "photo_06.jpg",
      albumid: "japan2010",
      description: "kitty cats",
      date: "2010/06/14 12:23:40" },
    { filename: "photo_03.jpg",
      albumid: "japan2010",
      description: "kyoto is nice",
      date: "2010/06/12 08:50:40" },
    { filename: "photo_04.jpg",
      albumid: "japan2010",
      description: "eating suhi",
      date: "2010/06/12 08:34:40" },
    { filename: "photo_02.jpg",
      albumid: "japan2010",
      description: "osaka!",
      date: "2010/06/12 07:44:40" },
    { filename: "photo_07.jpg",
      albumid: "japan2010",
      description: "moo cow oink pig woo!!",
      date: "2010/06/15 12:55:40" },

    { filename: "photo_001.jpg",
      albumid: "australia2010",
      description: "sydney!",
      date: "2010/10/20 07:44:40" },
    { filename: "photo_002.jpg",
      albumid: "australia2010",
      description: "asdfasdf!",
      date: "2010/10/20 08:24:40" },
    { filename: "photo_003.jpg",
      albumid: "australia2010",
      description: "qwerqwr!",
      date: "2010/10/20 08:55:40" },
    { filename: "photo_004.jpg",
      albumid: "australia2010",
      description: "zzzxcv zxcv",
      date: "2010/10/21 14:29:40" },
    { filename: "photo_005.jpg",
      albumid: "australia2010",
      description: "ipuoip",
      date: "2010/10/22 19:08:40" },
    { filename: "photo_006.jpg",
      albumid: "australia2010",
      description: "asdufio",
      date: "2010/10/22 22:15:40" }
];

var a1 = { _id: "italy2012",
           name: "italy2012",
           title: "Visiting Italy in 2012",
           description: "This was a very nice trip ...",
           date: "2012-05-12" };

var a2 = { _id: "australia2010",
           name: "australia2010",
           title: "Australia wedding!",
           description: "Lovely time there  ...",
           date: "2010-10-20" };

var a3 = { _id: "japan2010",
           name: "japan2010",
           title: "A trip to Kyoto and Tokyo",
           description: "What a funcountry!",
           date: "2010-04-15" };

var albums_coll, photos_coll;


async.waterfall([
  function (cb) {
    MongoClient.connect(
      url,
      {
        poolSize: 100,
        w: 1,
      },
      (err, dbase) => {
        if (err) {
          console.log('bad!')
          process.exit(-1);
        }

        console.log("I have a connection!");
        db = dbase;
        cb(null);
      }
    );
  },

  function (cb) {
    db.collection("albums", cb);
  },

  function (albums_obj, cb) {
    albums_coll = albums_obj;
    db.collection("photos", cb);
  },

  function (photos_obj, cb) {
    photos_coll = photos_obj;
    cb(null);
  },

  function (cb) {
    albums_coll.insertMany([ a1, a2, a3 ], cb);
  },

  function (inserted_docs, cb) {
    console.log("I inserted a document!!");
    photos_coll.insertMany(pix, cb);
  },

  function (inserted_docs, cb) {
    console.log("I inserted all my photos!");

    photos_coll.updateOne(
      { filename: "photo_003.jpg", albumid: "australia2010"},
      { $set: { description: "kangaroos" } },
      cb);
  },

  function (results, cb) {
    var cursor = photos_coll.find({ albumid: "italy2012" }).sort({ filename: 1 }).skip(3).limit(3);

    cursor.on("data", (doc) => {
      console.log(doc);
    });

    cursor.on("error", cb);

    cursor.on("end", () => {
      cb(null);
    });
  },


], function (err, results) {
  console.log("Done!");
  console.log(err);
  console.log(results);
  db.close();
});
