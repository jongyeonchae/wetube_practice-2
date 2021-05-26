import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const users = (req, res) => res.render(`users`, { pageTitle: `Users` });

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render(`userDetail`, { pageTitle: `User Detail`, user });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};

export const getMe = (req, res) => {
  res.render(`userDetail`, { pageTitle: `User Detail`, user: req.user });
};

export const getEditProfile = (req, res) => res.render(`editProfile`, { pageTitle: `Edit Profile` });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, { name, email });
    res.redirect(routes.me);
  } catch (err) {
    res.render(`editProfile`, { pageTitle: `Edit Profile` });
  }
};

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

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
