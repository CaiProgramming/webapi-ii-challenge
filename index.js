const express = require("express");
const app = express();
const users = require("./routes/posts");
const comments = require("./routes/comment");

app.use("/api/posts", users);
app.use("/api/posts", comments);

let server = app.listen(3000);
