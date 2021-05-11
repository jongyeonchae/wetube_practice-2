import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
// app.use(helmet());
app.set(`view engine`, `pug`);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

// helmet 업데이트로 비디오 재생 불가 > content security policy를 변경
app.use(function (req, res, next) {
  // 틀림 res.setHeader("Content-Security-Policy", "script-src 'self' https://mdn.github.io/learning-area/");
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-eval' object-src 'self'");
  return next();
});
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
