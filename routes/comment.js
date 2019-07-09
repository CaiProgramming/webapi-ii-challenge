//REQUIRED LIBRARIES AND ASSETS
const express = require("express");
const router = express.Router();
const data = require("../data/db");
//EXPRESS JSON TO PARSE DATA
router.use(express.json());
//ROUTES
router.get("/:id/comments", (req, res) => {
  data
    .findPostComments(req.params.id)
    .then(data => {
      if (data) {
        return res.status(200).json(data);
      } else {
        return res
          .status(404)
          .json("Sorry we lost track of that post to get it");
      }
    })
    .catch(error => {
      res
        .status(500)
        .json('error: "The users information could not be retrieved."');
    });
});
router.get("/:id/comments/:cid", (req, res) => {
  data
    .findCommentById(req.params.cid)
    .then(comment => {
      console.log(comment[0].post_id);
      console.log(req.params.id);
      if (comment[0].post_id.toString() === req.params.id.toString()) {
        return res.status(200).json(comment);
      } else {
        return res
          .status(404)
          .json("Sorry we lost track of that comment to get it");
      }
    })
    .catch(error => {
      res
        .status(500)
        .json('error: "The comments information could not be retrieved."');
    });
});
router.post("/:id/comments", (req, res) => {
  if (!req.body.post.text) return res.status(400).json("bro you need a text");
  if (!req.body.post.post_id)
    return res.status(400).json("bro you need post_id come on");
  data
    .insertComment(req.body.post)
    .then(data => {
      return res.status(201).json(data);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

module.exports = router;
