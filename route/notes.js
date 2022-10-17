const notes = require("express").Router();
const uuid = require("uuid");
const { readFromFile, readAndAppendCallback } = require("../helpers/fsUtils");
const fs = require("fs");


notes.get("/", (req, res) => {

    readFromFile("./db/db.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {

            res.json(JSON.parse(data));
        }
    })

})

notes.post("/", (req, res) => {

    const { title, text } = req.body;
    const id = uuid.v4();
    const data = { title, text, id };
    readAndAppendCallback(data, "./db/db.json", () => res.json(data));

})

notes.delete("/:id", (req, res) => {
    const id = req.params.id;

    readFromFile("./db/db.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let Data = JSON.parse(data);
            //remove the delete target from the array and return new array;
            const newData = Data.filter((obj) => obj.id != id)
            fs.writeFile("./db/db.json", JSON.stringify(newData, null, 4), (err) =>
                err ? console.error(err) : res.json("deleted")
            );
        }
    })

})


module.exports = notes;