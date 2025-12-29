// Entry point for API Gateway
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const tuitionRoutes = require('./routes/tuition');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/chat', chatRoutes);
app.use('/api/tuition', tuitionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});