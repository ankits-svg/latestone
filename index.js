const express = require("express");
const { connection } = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const htmlToPdf = require("html-pdf-node");
const { HtmlModel } = require("./models/html.models");
const puppeteer = require("puppeteer");
require("dotenv").config();
// const querystring = require('querystring');
const { RankModel } = require("./models/hacker.models");
const multer = require("multer");
const path = require("path");
// const { fetch } = require("node-fetch");
// const BitlyClient = require('bitly').BitlyClient;

port = process.env.port || 2200;
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors());
app.use(express.json());
// app.use('',encodeURI())
// app.use(bodyParser.json({limit: "50mb", extended: true}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
// bodyParser = {
//   json: {limit: '50mb', extended: true},
//   urlencoded: {limit: '50mb', extended: true}
// };
// app.use(bodyParser)
app.get("/:id", async (req, res) => {
  console.log("req", req.params);
  const { id } = req.params;
  try {
    const certificate = await HtmlModel.find({ _id: id });
    console.log("certificate:", certificate);
    res.send({ msg: "getting the result", data: certificate });
  } catch (error) {
    res.send({ msg: "Some error in getting" });
  }
});

// API endpoint to generate and save a certificate
app.post("/pdf", async (req, res) => {
  const { name, course, type, linkedin } = req.body;
  const image = "/assets/logo.png";
  // HTML content for the certificate
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>byteXL</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Carattere&family=Cedarville+Cursive&family=Dancing+Script:wght@400;700&family=Marck+Script&family=Tangerine:wght@700&display=swap"
      rel="stylesheet"
    />
  </head>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
        box-shadow:rgba(0, 0, 0, 0.16) 0px 1px 4px;
      display: flex;
      width: 297mm;
      max-width: 100%;
      max-height: 120%;
    }
  .left-div {
    width: 100%;
    position: relative;
    overflow: hidden;
}

    .right-div {
      flex: 1;
      position: relative;
      
      right: 10%;
      background-color: #FFFFFF;
      padding: 20px;
      box-sizing: border-box;
      text-align: center;
     
    }
    h1.top-right {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
    }
    .title {
      font-weight: bold;
      margin-top: 20px;
      font-size: 164px;
      color: #1DA1F2;
      font-family: "Beau Rivage", cursive;
      font-family: "Carattere", cursive;
      font-family: "Cedarville Cursive", cursive;
      font-family: "Dancing Script", cursive;
      font-family: "Marck Script", cursive;
      font-family: "Playball", cursive;
      font-family: "Tangerine", cursive;
    }
    .title1 {
      font-weight: bold;
      margin-top: -20px;
      
      font-size: 44px;
      color: #F26E1C;
    }
    .title2 {
      font-weight: bold;
      margin-top: 5px;
      
      font-size: 54px;
      color: #1DA1F2;
    }
    .certify-text {
      margin-top: 7%;
      font-size: 28px;
    }
    .name {
      font-size: 56px;
      color: #F26E1C;
      margin-top: 30px;
      font-family: "Beau Rivage", cursive;
      font-family: "Carattere", cursive;
      font-family: "Cedarville Cursive", cursive;
      font-family: "Dancing Script", cursive;
      font-family: "Marck Script", cursive;
      font-family: "Playball", cursive;
      font-family: "Tangerine", cursive;
    }
    .underline {
      width: 75%;
      border-bottom: 2px solid #000;
      margin: 10px auto;
    }
    .underline1 {
      width: 100%;
      border-bottom: 2px solid #000;
      margin: 10px auto;
    }
    .assessment-text {
      font-size: 30px;
      margin-top: 10px;
      color: black;
    }
    .programming-language {
      font-weight: bold;
      margin-top: 10px;
      font-size: 44px;
      color: #F26E1C;
      font-family: "Beau Rivage", cursive;
      font-family: "Carattere", cursive;
      font-family: "Cedarville Cursive", cursive;
      font-family: "Dancing Script", cursive;
      font-family: "Marck Script", cursive;
      font-family: "Playball", cursive;
      font-family: "Tangerine", cursive;
    }
    .footer {
      display: flex;
      justify-content: space-around;
      margin-top: 40px;
      font-size: 14px;
    }
    .byte {
      color: #1DA1F2;
      font-size: 40px;
    }
    .xl {
      color: #F26E1C;
      font-size: 30px;
      margin-top: -10px;
    }
    h4 {
      color: #F26E1C;
    }
    .image{
        min-height: 120%;
      position: relative;
      right:  5%;
      bottom: 10%;
        width: 170%;
    }
    .footer h3, .footer h4 {
      margin-bottom: -15px;
    }
    .bet-1{
      position:relative;
      padding-top:5%;
      
    }
    .bet h3{
     margin-top:-7%;
      
    }
  </style>
  <body>
    <div class="container">
      <div class="left-div">
        <img class="image" marginBottom="-10%" src="https://ankit-123.my.canva.site/sa/images/d848d22c8df4e2d1fb90c190dcdcd2d8.png" alt="logo">
      </div>
      <div class="right-div">
       
        <h1 class="top-right">
          <span class="byte">byte</span><sup class="xl">XL</sup>
        </h1>
        <div class="title">Certificate</div>
        <div class="title1">of</div>
        <div class="title2">${type}</div>
        <div class="certify-text">
          This is to certify that 
        </div>
        <div class="name">${name}</div>
        
        <div class="assessment-text">
          has successfully cleared the assessment for the skill
        </div>
        <div class="programming-language">${course}</div>
        <div class="footer">
            <div class="bet-1">
                <h3><strong class="date">${new Date().toLocaleDateString(
                  "en-US",
                  { day: "numeric", month: "short", year: "numeric" }
                )}</strong></h3>
                <h4>Date of Achievement</h4>
            </div>
          <div class="bet">
              <img width="70%" src="https://ankit-123.my.canva.site/098/images/219f937dae02a117e97806b886894bfd.png" alt="sign"/>
            <h3>Karun Tadepalli</h3>
            <h4>CEO & Co-founder</h4>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
        `;

  const options = {
    format: "A4",
    landscape: true,
  };

  try {
    const pdfBuffer = await htmlToPdf.generatePdf(
      { content: htmlContent },
      options
    );

    const certificate = new HtmlModel({ name, course, type, linkedin });
    await certificate.save();
    // console.log("certserver:", certificate);
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
});

//for image
app.get("/image/:id", async (req, res) => {
  const id = req.params.id;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // const {name,type,course,linkedin}=req.body;

  const rank = await RankModel.findById(id);
  console.log("rank:", rank);

  const content = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>byteXL</title>
  <!-- <link rel="preconnect" href="https://fonts.googleapis.com" /> -->
  <!-- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> -->
  <!-- <link href="https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Carattere&family=Cedarville+Cursive&family=Dancing+Script:wght@400;700&family=Marck+Script&family=Tangerine:wght@700&display=swap" rel="stylesheet" /> -->
</head>
<style>
  body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .container {
    
    display: flex;
    width: 216mm;
    max-width: 100%;
    max-height: 140%;
  }
  .left-div {
    height:250%;
    width: 65%;
    position: relative;
    overflow:hidden;
  }
  .right-div {
    flex: 1;
    position: relative;
    right:3%;

    background-color: #FFFFFF;
    padding: 17px;
    box-sizing: border-box;
    text-align: center;
  }
  h1.top-right {
    position: absolute;
    top: 10px;
    right: -5%;
    font-size: 20px;
    
  }
  .title {
    font-weight: bold;
    margin-top: 16%;
    font-size: 80px; /* Original size: 70px */
    color: #1DA1F2;
    /* font-family: "Beau Rivage", cursive; */
  }
  .title1 {
    font-weight: bold;
    margin-top: 3px;
    font-size: 24px;
    color: #F26E1C;
  }
  .title2{
    font-weight: bold;
    margin-top: 3px;
    font-size: 24px;
    color: #1DA1F2;
  }
  .certify-text {
    margin-top: 5%;
    font-size: 18px; /* Original size: 28px */
  }
  .name {
    font-size: 256%;
    color: #F26E1C;
    margin-top: 3%;
    white-space: nowrap; /* Ensures the text stays in one line */
}
  .assessment-text {
    font-size: 21px; /* Original size: 30px */
    margin-top: 5%;
    color: black;
    white-space: nowrap;
  }
  .programming-language {
    font-weight: bold;
    margin-top: 10px;
    font-size: 21px; /* Original size: 44px */
    color: #F26E1C;
  }
  .footer {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
    font-size: 14px;
  }
  .byte {
    color: #1DA1F2;
    font-size: 28px; /* Original size: 40px */
  }
  .xl {
    color: #F26E1C;
    font-size: 21px; /* Original size: 30px */
    margin-top: -10px;
  }
  h4 {
    color: #F26E1C;
  }
  .image {
    height: 100%;
    min-width:80%;
    position: relative;
  }
  .footer h3, .footer h4 {
    margin-bottom: -15px;
  }
  .bet-1 {
    position: relative;
    padding-top: 2.8%;
  }
  .bet h3 {
    margin-top: -7%;
  }
</style>
<body>
  <div class="container">
    <div class="left-div">
      <img class="image" src="https://ankit-123.my.canva.site/sa/images/d848d22c8df4e2d1fb90c190dcdcd2d8.png" alt="logo">
    </div>
    <div class="right-div">
      <h1 class="top-right">
        <span class="byte">byte</span><sup class="xl">XL</sup>
      </h1>
      <div class="title">Certificate</div>
      <div class="title1">of</div>
      <div class="title2">${rank.type}</div>
      <div class="certify-text">This is to certify that </div>
      <div class="name">${rank.name}</div>
      <div class="assessment-text">has successfully cleared the assessment for the skill</div>
      <div class="programming-language">${rank.course}</div>
      <div class="footer">
        <div class="bet-1">
          <h3><strong class="date">${new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}</strong></h3>
          <h4>Date of Achievement</h4>
        </div>
        <div class="bet">
          <img width="40%" src="https://ankit-123.my.canva.site/098/images/219f937dae02a117e97806b886894bfd.png" alt="sign"/>
          <h3>Karun Tadepalli</h3>
          <h4>CEO & Co-founder</h4>
        </div>
      </div>
    </div>


  </div>
</body>
</html>
  `;

  await page.setContent(content);
  const screenshot = await page.screenshot({ encoding: "base64" });

  res.send({ imageUrl: `data:image/png;base64,${screenshot}` });

  await browser.close();
});

app.post("/save", async (req, res) => {
  const { name, course, type, linkedin } = req.body;
  try {
    const rank = new RankModel({
      name: name,
      course: course,
      type: type,
      linkedin:"ankit-sharma",
      imageUrl:"sample.png"
    });
    await rank.save();
    res.status(200).send({ msg: "save data successfully", data: rank });
  } catch (error) {
    res.status(400).send({ msg: "some error occurred" });
  }
});

app.get("/get/:id", async (req, res) => {
  // console.log(req.params)
  const id = req.params.id;

  try {
    // Use findById to fetch data based on the ID
    const rank = await RankModel.findById(id);

    if (rank) {
      res.status(200).send({ msg: "Getting data successfully", data: rank });
    } else {
      res.status(404).send({ msg: "Data not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Some error occurred in getting data" });
  }
});

app.post("/update/:id", async (req, res) => {
  // console.log("Request Body:", req.body);
  const { id } = req.params;
  const { imageUrl } = req.body;

  try {
    // Update the database with the imageUrl
    await RankModel.findByIdAndUpdate(id, { imageUrl });
    res.send({ success: true, message: "Database updated successfully." });
  } catch (error) {
    console.error("Error updating database:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(
      `Server i.e index.js is connected to database with port ${port}`
    );
  } catch (error) {
    console.log(`Server is not connected to database with port ${port}`);
  }
  console.log(`Server is running at ${port}`);
});
