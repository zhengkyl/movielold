import app from "./app";

import mongoose from "mongoose";
import config from "./config/config";


mongoose
  .connect(config.db.uri)
  .then(() => {
    app.listen(config.app.port, () =>
      console.log(`Listening on PORT ${config.app.port}...`)
    );
  })
  .catch((err) => console.log(err.message));
