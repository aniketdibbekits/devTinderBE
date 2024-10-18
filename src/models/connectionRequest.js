const mongoose = require('mongoose');

const connectionFRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", //refering to the user collection
        required:true,
    },
    toUserId:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId,
        required:true,

    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","accepted","interested","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},{
    timestamps:true,
});

// 1 means ascending order -1 means descending order
connectionFRequestSchema.index({fromUserId:1,toUserId:1})


const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionFRequestSchema);
module.exports = ConnectionRequestModel;