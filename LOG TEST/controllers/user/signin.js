const userHelpers = require('../../models/user/signin')
const client = require("twilio")(
  "AC14ad6385e6c7a33c4c252588994e7f58",
  "8831cc9d6f9e5b1e24c63e74e20945c1"
);


module.exports = {
  userSignin: (req, res, next) => {
    res.render("user/signin", { userlogin: true });
  },
  postUserSignin: async (req, res) => {
    userHelpers.doLogin(req.body).then((response) => {
      if (response.status) {
        req.session.userLoggedIn = true;
        req.session.user = response.user;
        user = req.session.user;
        if (user.status) {
          res.redirect('/')
        } else {
          res.render("user/signin", {
            title: "LogIn",
            status: "Sorry Your Account Is Blocked",
          });
        }
      } else {
        res.render("user/signin", {
          title: "LogIn",
          invalid: "Incorrect Username or Password",
        });
      }
    });
  },
  postUserSignup: (req, res) => {
    userHelpers.doSignup(req.body).then((response) => {
      if (response) {
        res.render("user/signin", {
          title: "LogIn",
          logout: "Account Created You Need To Login Now",
        });
      } else {
        res.render("user/signin", {
          title: "LogIn",
          invalid: "Email already exists",
        });
      }
    });
  },
  otpLogin: (req, res) => {
    res.render("user/otp-login", { not: true });
  },
  postOtpLogin: (req, res) => {
    userHelpers
      .otpLogin(req.body)
      .then((response) => {
        let phone = response.user.phone;
        client.verify
          .services("VA1eb49654dd54b317096ff05f3dbfd13b")
          .verifications.create({
            to: `+91${phone}`,
            channel: "sms",
          })
          .then((data) => {
            req.session.user = response.user;
            res.render("user/otp-verification", { phone, not: true });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((response) => {
        res.render("user/otp-login", { invalid: "Mobile Number Not Found" });
      });
  },
  otpVerification: (req, res) => {
    res.render("user/otp-verification", { not: true });
  },
  postOtpVerifiaction:(req, res) => {
    client.verify
      .services("VA1eb49654dd54b317096ff05f3dbfd13b")
      .verificationChecks.create({
        to: `+91${req.body.mobile}`,
        code: req.body.otp,
      })
      .then((data) => {
        if (data.valid) {
          req.session.userLoggedIn = true;
          res.redirect("/");
        } else {
          delete req.session.user;
          res.render("user/otp-verification", {
            invalid: "Ivalid OTP please Enter Valid otp",
          });
        }
      })
      .catch((err) => {
        delete req.session.user;
        res.redirect("/signin");
      });
  }
}