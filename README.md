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

# We use router to group multiple same routes together
# enum is just like validation to know that values only should be accepted
# if u wanrt to make ur db more scalable u can use indexes for that unique is true or index true

# we can connect the two collections using ref:"Collection name" and we can populate the data populate("key",[name,age])  they are just like joins in mySql

# pagination
# there are two functions in MongoDb skip() and limit()
