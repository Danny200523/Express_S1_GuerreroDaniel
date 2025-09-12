export class UserController{
    constructor(userService){
        this.service = userService;
    }
    //OJOOOOOOOOO - Ya estamos manejando el body/parametros/etc... del request
    create = async (req,res)=>{
        const user = await this.service.createUser(req.body);
        res.json();
    };
    list = async (req,res)=>{};
    get = async (req,res)=>{};//Obtener por ID desde el EndPoint
    update = async (req,res)=>{};
    delete = async (req,res)=>{};
}