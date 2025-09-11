export class UserRepository{
    constructor(userModel){
        this.User = userModel
    }
    async create(data){
        return this.User.create(data);
    }
    async findAll(){
        return this.User.find();
    }
    async findById(id){
        return this.User.findById(id);
    }
    async updateById(id,data){
        return this.User.findByIdAndUpdate(id,data,{new:true});
    }
    async deleteById(id){
        return this.User.findByIdAndDelete(id);
    }
    async findByEmail(email){
        return this.User.findOne({email});
    }
}