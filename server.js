const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Example endpoint for Spotify integration
app.post('/spotify', (req, res) => {
    // Placeholder for Spotify API integration
    res.json({ message: 'Spotify integration is not yet implemented.' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
