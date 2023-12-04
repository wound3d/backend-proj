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

    async getUser(req, res) {
        try {
            const user = await this.#UserService.findUser(req.user.id)
            if (!user)
                return res.status(404).send()
            res.status(200).json(user);
        } catch (error) {

        }
    }
}
export default new UserController();