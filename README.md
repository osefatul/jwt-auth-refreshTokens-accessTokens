# JWT (Javascript Web TOken)

install npm i jsonwebtoken

### app.post

first lets start with generating access tokem.

```
const accessToken = jwt.sign(
     { id: user.id, isAdmin: user.isAdmin },
     "secretKey"
   );
```

once we send post request we will get an accesstoken for "secretKey". in the request body.

you can check the access token in the [jwt.io](https://jwt.io/) and can find the hash algorithm for it.

### app.delete

- In the postman we created another request for deleting users.
  "localhost:6000/api/users/1".
- In the header of that request we created a key called "authorization" and the value for that is the "Bearer accessToken", accessToken = the accesstoken we get in the login process.
- Look into the code.

### Token Expiration

- In the above scenarios tokens don't have expiration, which is bad. If someone get that accesstoken they can access that software.
- you can add expiration for the token as follows:

```
 const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "secretKey", {expiresIn:"20s"}
    );
```

The above token will let users access within 20 seconds otherwise it will expire and token will be invalid
.

### Refresh Token

- As the expiration time for token comes with another problem and that is after each expiration timing (15 minutes in our case) we have to login again and again. So we need another token which we call refreshToken to give us peristent access to application.

#### Steps

- In the login api app.post("/api/login") we generate two tokens access token and refresh token, access token is expired in 15 minutes while the refresh tokens is inexpirable. So, these two tokens will be given to us once we login.
- Copy the refresh token and then go to api.post("api/refresh") and paste it in the body (token).
- jwt will verify if the refresh token you coppied is same as the one it has been generated in the login request. if yes, then the array of refreshTokens will be updated with the new generated refresh token which will be with us if we want to have access to application.
