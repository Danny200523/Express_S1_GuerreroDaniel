export class UserService{
    constructor(userRepository){
        this.repo = userRepository;
    }
    async createUser(dto){
        return this.repo.createOne(dto);
    }
    async listUser(){
        return this.repo.findAll();
    }
    async getUserById(id){
        return this.repo.findById(id);
    }
    async updateUserById(id,data){
        return this.repo.updateById(id,data);
    }
    async deleteUserById(id){
        return this.repo.deleteById(id);
    }
}