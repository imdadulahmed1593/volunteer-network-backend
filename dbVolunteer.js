import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  name: String,
  image: String,
});

const activitySchema = mongoose.Schema({
  name: String,
  userName: String,
  datePicked: String,
  description: String,
  image: String,
});

const eventSchema = mongoose.Schema({
  title: String,

  date: String,
  description: String,
});

//we are exporting the collection
//messagecontents will be the name of collection in the database
const jobsCollection = mongoose.model("jobsCollection", jobSchema);
const activitiesCollection = mongoose.model(
  "activitiesCollection",
  activitySchema
);
const eventsCollection = mongoose.model("eventsCollection", eventSchema);

export { jobsCollection, activitiesCollection, eventsCollection };
