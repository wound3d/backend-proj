import autoBind from "auto-bind";
import _ from "lodash";
import CommentService from "./service.js";

class CommentController {
    #CommentService;

    constructor() {
        autoBind(this);
        this.#CommentService = new CommentService();
    }

    async addComment(req, res) {
        try {
            const result = await this.#CommentService.createComment({ text: req.body.text, id: req.user.id });
            res.status(201).json(_.pick(result, "text", "userId"));
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async getAllComments(req, res) {
        res.status(200).json(await this.#CommentService.getAllComments());
    }

    async updateComment(req, res) {
        // const page = req.query.page || 1; 
        // const pageSize = req.query.pageSize || 10;
        try {
            const comment = await this.#CommentService.editComment({ text: req.body.text, id: req.params.id });
            return res.status(200).json(_.pick(comment, "text")); 
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: "Failed to edit comment" }); 
        }
    }

    async deleteComment(req, res) {
        // const page = req.query.page || 1; 
        // const pageSize = req.query.pageSize || 10;
        await this.#CommentService.delComment(req.params.id);
        res.status(204).send();
    }

    async deleteComments(req, res) {
        try {
          console.log(req.body.ids)
          await this.#CommentService.delComments(req.body.ids); 
          return res.status(200).json("Deleted");
        } catch (error) {
          console.log(error.message);
          return res.status(500).json({ error: "Failed to delete comment" });
        }
      }
}
export default new CommentController();