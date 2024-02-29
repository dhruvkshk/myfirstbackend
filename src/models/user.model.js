import mongoose, {Schema} from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
username : {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    fullname: {
        type: String,
      required: true,
    lowercase: true,
    trim: true,
    index: true
    },
    avatar: {
        type: String, // cloudinary url 
        required: true
    },
    coverImage: {
        type: String,
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }
],
password: {
    type: String,
    required: [true, 'Password is required']
},
refreshToken: {
    type: String,
}
}, {timestamps: true}
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
this.password = bcrypt.hash(this.password, 10)
next()
})
userSchema.methods.isPasswordCorrect = async function (password){
    bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)