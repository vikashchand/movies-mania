// routes/lists.js
const express = require('express');
const router = express.Router();
const List = require('../models/List');
const userServices = require('../Services/userServices');

// Create or update a list
router.post('/', async (req, res) => {
  try {
    const { name, movie } = req.body;
    const userEmail = userServices.getLoggedInUserEmail();

    // Check if the list already exists
    let existingList = await List.findOne({ name, userEmail });

    if (existingList) {
      // If the list exists, add the movie to the existing list
      existingList.movies.push(movie);
      await existingList.save();
      res.json(existingList);
    } else {
      // If the list doesn't exist, create a new list
      const newList = new List({
        name,
        userEmail,
        movies: [movie]
      });
      const savedList = await newList.save();
      res.json(savedList);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch public lists
router.get('/', async (req, res) => {
  try {
    const publicLists = await List.find({ isPrivate: false });
    res.json(publicLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/private', async (req, res) => {
    try {
        const userEmail = userServices.getLoggedInUserEmail();
        const privateLists = await List.find({ userEmail: userEmail });
        res.json(privateLists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

  


router.put('/:id/privacy', async (req, res) => {
  const { id } = req.params;
  const { isPrivate } = req.body;

  try {
      const list = await List.findById(id);
      if (!list) {
          return res.status(404).json({ message: 'List not found' });
      }

      list.isPrivate = isPrivate;
      await list.save();

      res.json({ message: 'Privacy status updated successfully', list });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const list = await List.findByIdAndDelete(id);
      if (!list) {
          return res.status(404).json({ message: 'List not found' });
      }

      res.json({ message: 'List deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
