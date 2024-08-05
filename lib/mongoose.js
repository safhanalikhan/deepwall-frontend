import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = "mongodb+srv://safhanalikhan:7qMcAUysVKfwGLo4@deepwall.vtdpo0i.mongodb.net/deepwall"; //process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}