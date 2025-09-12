export class UserController{
    constructor(userService){
        this.service = userService;
    }
    //OJOOOOOOOOO - Ya estamos manejando el body/parametros/etc... del request
    create = async (req,res)=>{
        const user = await this.service.createUser(req.body);
        res.json();
        return res.send(user)
    };
    list = async (req,res)=>{
        const user = await this.service.listUser();
        return res.send(user)
    };
    get = async (req,res)=>{
        const user = await this.service.getUserById(req.params.id);
        return res.send(user);
    };//Obtener por ID desde el EndPoint
    update = async (req,res)=>{
        const user = await this.service.updateUserById(req.params.id,req.body);
        res.json()
    };
    delete = async (req,res)=>{
        const user = await this.service.deleteUserById(req.params.id);
        return res.send(user)
    };
}