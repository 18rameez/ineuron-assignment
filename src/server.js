const app = require("./app");
const mongodb = require("./util/database");
const PORT = process.env.PORT || 3000;
mongodb.mongoConnect(() => {
    app.listen(PORT, () => {
     console.log("App listening at " + PORT);
   });
 });