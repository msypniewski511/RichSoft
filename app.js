const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// Init app
const app = express();
// Set template folder
app.set("views", path.join(__dirname, "views"));
// Set jade as view template
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add static to path
app.use(express.static(path.join(__dirname, "public")));

// Set Routes
app.get("/", function(req, res) {
  res.render("index", { title: "Home", active: "index" });
});

app.get("/about", function(req, res) {
  res.render("about", { title: "About Us", active: "about" });
});

app.get("/services", function(req, res) {
  res.render("services", { title: "Srvices", active: "services" });
});

app.get("/contact", function(req, res) {
  res.render("contact", { title: "Contact", active: "contact" });
});

app.post("/contact/send", function(req, res) {
  console.log("test");
  console.log(req.body.email);
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "msypniewski511@gmail.com",
      pass: "Ms55015501"
    }
  });

  let mailOption = {
    from: "Maciej Sypniewski <msypniewski511@gmail>",
    to: `${req.body.email}`,
    subject: "Website Submission",
    text:
      "You have a submission with the following details...Name: " +
      req.body.first_name +
      " " +
      req.body.last_name +
      " Phone number: " +
      req.body.pfone_number +
      " Email: " +
      req.body.email +
      "Message: " +
      req.body.message,
    html:
      "<p>You have a submission with the following details...<ul>" +
      "<li>Name: " +
      req.body.first_name +
      " " +
      req.body.last_name +
      "</li>" +
      "<li>Phone number: " +
      req.body.pfone_number +
      "</li>" +
      "<li>Email: " +
      req.body.email +
      "</li>" +
      "<li>Message: " +
      req.body.message +
      "</li>" +
      "<li>We will contact you as soon as possible.</li>" +
      "</ul></p>"
  };

  transporter.sendMail(mailOption, function(error, info) {
    if (error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("Message Sent: " + info.response);
      res.redirect("/");
    }
  });
});
// End of routes
app.listen(process.env.PORT || 3000);
console.log("Server is running on port 3000...");
