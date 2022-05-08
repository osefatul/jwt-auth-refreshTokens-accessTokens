const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());

const users = [
  {
    id: "1",
    username: "jhon",
    password: "jhon089",
    isAdmin: true,
  },
  {
    id: "2",
    username: "mike",
    password: "mike089",
    isAdmin: false,
  },
];

app.post("/api/login", function (req, res) {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    //Generate acess token: you can see that in the access token we incorporated our userId, isAdmin and the "secretKey"
    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "secretKey",
      { expiresIn: "20s" }
    );

    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else {
    res.status(400).json("Username or passwor is incorrect");
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // split the header value into two parts and get the second one.
    const token = authHeader.split(" ")[1];
    //verify the auth from the header with the "secretKey" when the user logged in and return user.
    jwt.verify(token, "secretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }

      //if no error is returned
      req.user = user;
      next(); // Go to the next middleware
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

//the request first go to the url and get the user data and then go to verify function as it can access the user data. Once verify is done it will run next() means go to next function which is the last middleware in the app.delete request.
app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted");
  } else {
    res.status(403).json("You are not allowed to delete this user");
  }
});

app.listen(6000, () => console.log("backend is running"));
