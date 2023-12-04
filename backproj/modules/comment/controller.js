import autoBind from "auto-bind";
import CommentService from "./service.js";

class CommentController {
    #CommentService;

    constructor() {
        autoBind(this);
        this.#CommentService = new CommentService();
    }

    async addComment(req, res) {
        try {
            const comment = await this.#CommentService.createComment(req.body.text, req.user.id);
            if (comment) {
                return res.status(201).json({ comment });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Internal Error" });
        }
    }

    async getComment(req, res) {
        // const page = req.query.page || 1; 
        // const pageSize = req.query.pageSize || 10;
        console.log("1") 
        try {
            console.log("2") 
            const comments = await this.#CommentService.findComment(req.params.id);
            return res.status(200).json(comments); 
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: "Failed to retrieve comments" }); 
        }
    }

    async updateComment(req, res) {
        // const page = req.query.page || 1; 
        // const pageSize = req.query.pageSize || 10;
        console.log("1") 
        try {
            console.log("2") 
            const comment = await this.#CommentService.editComment(req.body.text, req.params.id);
            return res.status(200).json(comment); 
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: "Failed to edit comment" }); 
        }
    }

    async deleteComment(req, res) {
        // const page = req.query.page || 1; 
        // const pageSize = req.query.pageSize || 10;
        console.log("1") 
        try {
            console.log("2") 
            await this.#CommentService.delComment(req.params.id);
            return res.status(200).json("Deleted");
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: "Failed to delete comment" }); 
        }
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