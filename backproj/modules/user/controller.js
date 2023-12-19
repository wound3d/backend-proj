import autoBind from "auto-bind";
import UserService from "./service.js";
class UserController {
    #UserService;

    constructor() {
        autoBind(this);
        this.#UserService = new UserService();
    }

    async register(req, res) {
        try {
            const token = await this.#UserService.createUser(req.body);
            if (token) {
                return res.status(201).json({ token });
            }
            res.status(409).json({ message: `User with login ${req.body.login} already exists` });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Internal Error" });
        }
    }

    async login(req, res) {
        try {
            const user = await this.#UserService.loginUser(req.body)
            if (!user)
                return res.status(404).json({message: "Login or password is not correct"})
            res.status(200).json({message: "Logged in!", token: user});
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}
export default new UserController();