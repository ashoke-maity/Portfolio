// dev.js
require('dotenv').config();
const app = require('./api/index');

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running locally on http://localhost:${PORT}`);
});
