import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const users = (req, res) => res.render(`users`, { pageTitle: `Users` });

export const userDetail = (req, res) => res.render(`userDetail`, { pageTitle: `User Detail` });

export const editProfile = (req, res) => res.render(`editProfile`, { pageTitle: `Edit Profile` });

export const changePassword = (req, res) => res.render(`changePassword`, { pageTitle: `Change Password` });

export const getJoin = (req, res) => res.render(`join`, { pageTitle: `Join` });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, pw1, pw2 },
  } = req;
  if (pw1 !== pw2) {
    res.status(400);
    res.render(`join`, { pageTitle: `Join` });
  } else {
    try {
      const user = await User({ name, email });
      const newUser = await User.register(user, pw1);
      console.log("success 🌝");
      console.log(newUser);
      next();
    } catch (err) {
      console.log(err);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render(`login`, { pageTitle: `Log In` });

// export const postLogin = passport.authenticate("local", {
//   failureRedirect: routes.login,
//   successRedirect: routes.home,
// });
export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const logout = (req, res) => {
  res.redirect(routes.home);
};
