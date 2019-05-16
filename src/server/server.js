import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from "./connect-db";

const app = express();
const PORT = process.env.PORT || 3232;

app.use(
  cors(), // CORS requirements
  bodyParser.urlencoded({ extended: true}), // Allow us to use POST requests
  bodyParser.json() // Parsing data into json
);

app.post('/task/new', async (req, res) => {
  let { task } = req.body;
  await AddNewTask(task);
  res.status(200).send();
});
app.post('/task/update', async (req, res) => {
  let { task } = req.body;
  await UpdateTask(task);
  res.status(200).send();
});

app.get('/', (req, res) => {
  res.send("Hello world");
});

export const AddNewTask = async task => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  await collection.insertOne(task);
};

export const UpdateTask = async task => {
  const { id, group, isComplete, name } = task;
  const db = await connectDB();
  const collection = db.collection(`tasks`);

  if(group) {
    await collection.updateOne({ id }, {$set: { group }})
  }
  if(name) {
    await collection.updateOne({ id }, {$set: { name }})
  }
  if(isComplete !== undefined ) {
    await collection.updateOne({ id }, {$set: { isComplete }})
  }

}
app.listen(PORT, () => console.log('The server is listening on port', PORT));
