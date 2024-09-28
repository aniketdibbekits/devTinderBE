To initialise the project
-npm init
-npm i express

# What is dependancy?

    -Any package on which ur project dependant on

# Order of the route matters

# /user/:121

    api - http://localhost:3000/user/121
    this is the dynamic routes u can read the params in api by using console.log(req.params)

# Query params

    api - http://localhost:3000/user?userId=121
    console.log(req.query)

# When we do app.use it will handle all tytpeof request whether it is get,post,put

# We can have multiple route handler also
