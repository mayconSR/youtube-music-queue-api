const app = require('./app');

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${server.address().port}`);
});