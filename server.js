const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
app.listen(port, () =>
  console.log(`Server is running on: http://localhost:${port}`));
