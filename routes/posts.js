//REQUIRED LIBRARIES AND ASSETS
const express = require("express");
const router = express.Router();
const data = require("../data/db");
//EXPRESS JSON TO PARSE DATA
router.use(express.json());
//ROUTES
router.get("/", (req, res) => {
  data
    .find()
    .then(data => {
      res.status(200).json(data);
      if (data.length === 0) {
        res
          .status(404)
          .json('error: "The posts information could not be retrieved."');
      }
    })
    .catch(error => {
      res
        .status(500)
        .json('error: "The posts information could not be retrieved."');
    });
});
router.get("/:id", (req, res) => {
  data
    .findById(req.params.id)
    .then(data => {
      if (data.length !== 0) {
        console.log(data.length);
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
router.post("/", (req, res) => {
  if (!req.body.post.title) return res.status(400).json("bro you need a title");
  if (!req.body.post.contents)
    return res.status(400).json("bro you need content come on");
  data
    .insert(req.body.post)
    .then(data => {
      return res.status(201).json(data);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});
router.put("/:id", (req, res) => {
  data
    .update(req.params.id, req.body.post)
    .then(data => {
      if (data) {
        return res.status(200).json(`Post has been updated`);
      } else {
        return res
          .status(404)
          .json("Sorry we lost track of that post to update it");
      }
    })
    .catch(error => {
      res
        .status(500)
        .json('error: "The posts information could not be updated."');
    });
});
router.delete("/:id", (req, res) => {
  data
    .remove(req.params.id)
    .then(data => {
      if (data) {
        return res.status(200).json("Has been deleted");
      } else {
        return res
          .status(404)
          .json("Sorry we lost track of that post to delete it");
      }
    })
    .catch(error => {
      res
        .status(500)
        .json('error: "The posts information could not be deleted."');
    });
});

module.exports = router;
