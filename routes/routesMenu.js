const express = require("express");
const router = express.Router();

const Menuitem = require("./../models/Menuitem");

// POST route to add a Menu Item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menuitem = new Menuitem(data);
    const savedMenu = await menuitem.save();
    console.log("Menu Item added successfully");
    res.status(200).json(savedMenu);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// GET method to get all items
router.get("/", async (req, res) => {
  try {
    const data = await Menuitem.find();
    console.log("Data Fetched");
    res.status(202).json(data);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Data Fetching failed" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    const data = await Menuitem.find({taste:taste});
    if(taste=="sweet" || taste=="spicy" || taste=="sour"){
        console.log("Data fetched");
        res.status(200).json(data);
    }
    else{
        res.status(404).json({error:"Invalid data"});
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Data Fetching failed" });
  }
});

module.exports = router;
