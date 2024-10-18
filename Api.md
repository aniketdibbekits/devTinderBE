# Api
authRouter
POST /signUp
POST /login
POST /logout

ProfileRouter
Get /profile
PATCH /profile
PATCH /profile/password

ConnectionRequestRouter
POST /request/send/intrested/:userId
POST /request/send/intrested/:userId
post /request/send/:status/:userId   combination of above two api's

// post /request/review/:status/:requestId  combination of below two api's
POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

UserRouter
Get /user/connections  //this api give u the data of who matches u or who is ur friend like thing who accept ur request
Get /user/requests/received
Get user/feed


Status: ignored,pass,accepted,rejacted