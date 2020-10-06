//importing

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {
  jobsCollection,
  activitiesCollection,
  eventsCollection,
} from "./dbVolunteer.js";
// import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();
const port = 9000;

//database config
const connection_url =
  "mongodb+srv://admin:1kmFUbCr7VC6EqXh@cluster0.nisui.mongodb.net/volunteerNetworkDB?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
});

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//api endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/jobs", (req, res) => {
  jobsCollection.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.get("/activities/sync", (req, res) => {
  activitiesCollection.find({ userName: req.query.name }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/activities/all", (req, res) => {
  activitiesCollection.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/events/all", (req, res) => {
  eventsCollection.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/jobs/new", (req, res) => {
  const jobs = req.body;
  jobsCollection.create(jobs, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/activities/new", (req, res) => {
  const activity = req.body;
  activitiesCollection.create(activity, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/events/new", (req, res) => {
  const event = req.body;
  eventsCollection.create(event, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
  activitiesCollection.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
    // deleted at most one tank document
  });
});

//listener
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
