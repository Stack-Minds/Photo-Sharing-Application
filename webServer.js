const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const async = require("async");

const express = require("express");
const app = express();

// Import the Mongoose schema for User, Photo, and SchemaInfo
const User = require("./schema/user.js");
const Photo = require("./schema/photo.js");
const SchemaInfo = require("./schema/schemaInfo.js");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/project6", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(__dirname));

app.get("/", function (request, response) {
  response.send("Simple web server of files from " + __dirname);
});

app.get("/test/:p1", function (request, response) {
  // Express parses the ":p1" from the URL and returns it in the request.params
  // objects.
  console.log("/test called with param1 = ", request.params.p1);

  const param = request.params.p1 || "info";

  if (param === "info") {
    // Fetch the SchemaInfo. There should only one of them. The query of {} will
    // match it.
    SchemaInfo.find({}, function (err, info) {
      if (err) {
        // Query returned an error. We pass it back to the browser with an
        // Internal Service Error (500) error code.
        console.error("Error in /user/info:", err);
        response.status(500).send(JSON.stringify(err));
        return;
      }
      if (info.length === 0) {
        // Query didn't return an error but didn't find the SchemaInfo object -
        // This is also an internal error return.
        response.status(500).send("Missing SchemaInfo");
        return;
      }

      // We got the object - return it in JSON format.
      console.log("SchemaInfo", info[0]);
      response.end(JSON.stringify(info[0]));
    });
  } else if (param === "counts") {
    // In order to return the counts of all the collections we need to do an
    // async call to each collections. That is tricky to do so we use the async
    // package do the work. We put the collections into array and use async.each
    // to do each .count() query.
    const collections = [
      { name: "user", collection: User },
      { name: "photo", collection: Photo },
      { name: "schemaInfo", collection: SchemaInfo },
    ];
    async.each(
      collections,
      function (col, done_callback) {
        col.collection.countDocuments({}, function (err, count) {
          col.count = count;
          done_callback(err);
        });
      },
      function (err) {
        if (err) {
          response.status(500).send(JSON.stringify(err));
        } else {
          const obj = {};
          for (let i = 0; i < collections.length; i++) {
            obj[collections[i].name] = collections[i].count;
          }
          response.end(JSON.stringify(obj));
        }
      }
    );
  } else {
    // If we know understand the parameter we return a (Bad Parameter) (400)
    // status.
    response.status(400).send("Bad param " + param);
  }
});

app.get("/user/list", function (request, response) {
  // Use Mongoose to fetch a list of users from the database
  User.find({}, { _id: 1, first_name: 1, last_name: 1 }, function (err, users) {
    if (err) {
      response.status(500).send(JSON.stringify(err));
      return;
    }
    response.status(200).send(JSON.stringify(users));
  });
});

app.get("/user/:id", function (request, response) {
  const id = request.params.id;
  // Use Mongoose to fetch a specific user by ID
  User.findById(id, function (err, user) {
    if (err) {
      response.status(500).send(JSON.stringify(err));
      return;
    }
    if (!user) {
      response.status(400).send("User not found");
      return;
    }
    response.status(200).send(JSON.stringify(user));
  });
});

app.get("/photosOfUser/:id", function (request, response) {
  const id = request.params.id;
  // Use Mongoose to fetch photos of a specific user by ID
  Photo.find({ user_id: id }, function (err, photos) {
    if (err) {
      response.status(500).send(JSON.stringify(err));
      return;
    }
    if (photos.length === 0) {
      response.status(400).send("Photos for the user not found");
      return;
    }

    // Asynchronously fetch comments for each photo
    async.map(
      photos,
      function (photo, callback) {
        // Use Mongoose to fetch comments for each photo
        const photoId = photo._id;
        Photo.populate(photo, { path: "comments.user_id", select: "_id first_name last_name" }, function (err, populatedPhoto) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, populatedPhoto);
          }
        });
      },
      function (err, results) {
        if (err) {
          response.status(500).send(JSON.stringify(err));
        } else {
          response.status(200).send(JSON.stringify(results));
        }
      }
    );
  });
});

const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log(
    "Listening at http://localhost:" +
      port +
      " exporting the directory " +
      __dirname
  );
});
