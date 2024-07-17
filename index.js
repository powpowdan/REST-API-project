import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "e2e835f9-4af5-48cb-a1b4-9daf4b81ad6a";
const bearConfig = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, bearConfig);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});



app.post("/post-secret", async (req, res) => { 
  const secretContent = req.body.secret;
  const embarScore = req.body.score;
  
 
  let data =  {
    secret: secretContent,
    score: embarScore
  } 
  //can also just do req.body where data is
  try {
    const result = await axios.post(API_URL + "/secrets/", data, bearConfig);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
}); 

app.post("/put-secret", async (req, res) => {
  const id = req.body.id;
  const secretContent = req.body.secret;
  const embarScore = req.body.score;
 
  let body =  {
    id: id,
    secret: secretContent,
    score: embarScore
  } 
  try {
    const result = await axios.put(
      API_URL + `/secrets/${id}`,
       body, 
       bearConfig);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
}); 

app.post("/patch-secret", async (req, res) => {
  const id = req.body.id;
  const secretContent = req.body.secret;
  const embarScore = req.body.score;
 // can just do req.body instead
  let body =  {
    id: id,
    secret: secretContent,
    score: embarScore
  } 
  try {
    const result = await axios.patch(API_URL + `/secrets/${id}`, body, bearConfig);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
}); 
 

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(API_URL + `/secrets/${searchId}`, bearConfig);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
