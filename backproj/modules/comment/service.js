import Comment from '../models/comments.js';
import User from '../models/user.js';
import { Op } from 'sequelize';

class CommentService {
  
  async createComment(doc) {
    console.log(doc.text)
    return await Comment.create({text: doc.text, userId: doc.id})
  }

  async getAllComments() {
      const comments = await Comment.findAll({
        attributes: {exclude: ["userId", "updatedAt", "createdAt"]}, include: {model: User, attributes: ["id", "login"]}
      });

      return comments;
  }

  async editComment(doc) {
    const editedComment = await Comment.findByPk(doc.id)
    await editedComment.update({text: doc.text})
    await editedComment.save()
    return editedComment
  }

  async delComment(id) {
    Comment.destroy({ where: { id: id } });
  }

  async delComments(ids) {
    await Comment.destroy({
      where: {
        id: {
          [Op.in] : ids
        }
      }
    });
  }
}

export default CommentService;
