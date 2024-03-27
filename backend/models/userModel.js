import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = mongoose.Schema({
    pid:{
        type:String,
        required:true,
        unique : true,
    },

    username: {
        type: String,
        required: true,
        unique : true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: validator.isEmail,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6,"Enter atleast 6 charachters"],
    },
    avatar:{
        public_id:{
            type:String
        },
        url:{
            type:String,
            default:""
        }
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male','Female'],
        required: true,
    },
    subscription:{
        subId:String,
        status: {
            type: String,
        }
    },
    role:{
        type:String,
        default:'user'
    },
    verified:{
        type:Boolean,
        default:false
    },
    mailingList:{
        type:Boolean,
        default:true
    },
    continueReading:[{
        article:{ type: mongoose.Schema.Types.ObjectId, ref: 'Affair' },
        continueFrom:String
    }],
    ip:[{type:String}],

    // For gamify learning

    points:{
        type:Number,
        default:0
    },
    badges:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Badge'
    }],


    // For account deletion
    active:{
        type:Boolean,
        default:true
    },
    deactivatedAt: { 
        type: Date, 
        default: null 
    },

}, {
    timestamps: true
});

userSchema.pre('save', async function(next){
    // only hash the password if it has been modified (or is new)
    if(!this.isModified('password')){
        next();
    }
    const salt  = await bcrypt.genSalt(10) // SALT is like a key

    
    this.password = await bcrypt.hash(this.password, salt)

})

userSchema.methods.matchPasswords = async function(enterePassword){
    if (!this.password) {
      return false;
    }
    return await bcrypt.compare(enterePassword, this.password);
  }
  

const User = mongoose.model('User', userSchema);
export default User;