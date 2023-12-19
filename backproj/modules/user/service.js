import { TokenGuard } from '../middleware/token-guard.js';
import User from '../models/user.js';
import argon2 from "argon2"
import _ from "lodash"
import { Op } from 'sequelize';
  
class UserService {
  async createUser(doc)
  {
    if (await User.findOne({ where: { login: { [Op.iLike]: doc.login } }, raw:true })) 
    {
      return false;
    }
    doc.password = await argon2.hash(doc.password)
    await User.create(doc)
    return _.pick(doc, "name", "secondName")
  }

  async loginUser(doc) {
    const userStatus = await User.findOne(
      {
        where: {
          login: { [Op.iLike]: doc.login}
        },
        raw: true
      }
    )
    console.log(userStatus.password)
    if (!userStatus || !(await argon2.verify(userStatus.password, doc.password)))
    {
      return false;
    }
    return await TokenGuard.generate({id: userStatus.id});
  }
}


export default UserService;
