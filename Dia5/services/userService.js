export class UserService{
    constructor(userRepository){
        this.repo = userRepository;
    }
    async createUser(dto){
        return this.repo.create(dto);
    }
    async listUser(){
        return this.repo.findAll().limit(10);
    }
    async getUserById(id){
        return this.repo.findById(id);
    }
}