import Comment from '../models/comments.js';
import User from '../models/user.js';
import { Op } from 'sequelize';

class CommentService {
  
  async createComment(text, id) {
    const comm = await Comment.create({ 
      text,
      userId: id 
    });
    return comm;
  }

  async findComment(userId) {
      //const offset = (page - 1) * pageSize;
      const comments = await Comment.findAll({
        where: { userId }, 
        include: {
          model: User, 
          attributes: ['id'] 
        }
        // limit: pageSize,
        // offset: offset
      });

      return comments;
  }

  async editComment(text, id) {
    const editedComment = await Comment.findByPk(id)
    if (!editedComment)
    {
      return false;
    }
    else
    {
      editedComment.text = text;
      await editedComment.save()
    }
    return editedComment;
  }

  async delComment(id) {
    const deletedComment = await Comment.findByPk(id)
    if (!deletedComment)
    {
      return false;
    }
    else
    {
      await deletedComment.destroy()
    }
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
