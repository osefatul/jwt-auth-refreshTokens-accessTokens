# JWT (Javascript Web TOken)

install npm i jsonwebtoken

### app.post

first lets start with generating access tokem.

````
const accessToken = jwt.sign(
     { id: user.id, isAdmin: user.isAdmin },
     "secretKey"
   );

   ```
````

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
