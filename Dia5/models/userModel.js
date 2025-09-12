import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true,trim:true},
    email: {type: String, required: true,unique:true,lowercase:true,trim:true},
    age:{type:Number,min:0}
},{timestamps:true,collection: "users"})


class UserClass{
    get isAdult(){
        return (this.age ?? 0) >= 18 ;
    }
    static createOne(data){
        return this.create(data)
    }
    static findAll(){
        return UserSchema.find()
    }
    static async findByEmail(email){
        return UserSchema.findOne({email})
    }
    get findById(){
        return UserSchema.findById(this._id)
    }
    updateById(id,data){
        return UserSchema.findByIdAndUpdate(id,data,{new:true})
    }
    deleteById(id){
        return UserSchema.findByIdAndDelete(id)
    }
}
UserSchema.loadClass(UserClass)
export const UserModel = mongoose.model("User",UserSchema)