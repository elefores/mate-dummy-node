"use strict";

const express = require("express");
const _ = require("lodash");

// uuid v3 exposed each algorithm as a deep import. That entry point was REMOVED
// in uuid v7, so bumping `uuid` across the gap is a breaking change: this line
// has to become `const { v4: uuidv4 } = require("uuid");`. This is the scenario
// that exercises keepup's AI code-upgrade path rather than a plain pin bump.
const uuidv4 = require("uuid/v4");

const app = express();
app.use(express.json());

const widgets = [];

app.post("/widgets", (req, res) => {
  const widget = _.assign({ id: uuidv4() }, req.body);
  widgets.push(widget);
  res.status(201).json(widget);
});

app.get("/widgets", (_req, res) => {
  res.json(widgets);
});

function newId() {
  return uuidv4();
}

if (require.main === module) {
  app.listen(8000, () => console.log("mate-dogfood-node listening on :8000"));
}

module.exports = { app, newId };
