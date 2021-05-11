// import express from "express";
import multer from "multer";
import routes from "./routes";

// const localsMiddleware = express();
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  console.log(res.locals.user);
  next();
};

// export default localsMiddleware;
export const uploadVideo = multerVideo.single("videoFile");
