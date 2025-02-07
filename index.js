const app = require("./src/server");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor is running on port ${port}`);
});
