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
POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

UserRouter
Get /user/connections
Get /user/requests/received
Get user/feed


Status: ignored,pass,accepted,rejacted