const express = require("express");
const router = express.Router();

const Person = require("./../models/Person");

// POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const savedPerson = await newPerson.save();
    console.log("Person saved successfully ");
    res.status(201).send(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// GET method to get all persons
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(202).json(data);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Data Fetching failed" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const worktype = req.params.workType;
    if (worktype == "Chef" || worktype == "Waiter" || worktype == "Manager") {
      const data = await Person.find({ work: worktype });
      console.log("Data Successfully fetched");
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Data Invalid" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Data Fetching failed" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedData = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(
      personId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person Not found" });
    }
    console.log("Data Updated");
    res.status(202).json(updatedPerson);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Data Fetching failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(personId);
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person Not found" });
    }
    console.log("Data Deleted");
    res.status(202).json({ message: "Data Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Data Deleting failed" });
  }
});

module.exports = router;
