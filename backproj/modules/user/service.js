import { TokenGuard } from '../middleware/token-guard.js';
import User from '../models/user.js';
import { Op } from 'sequelize';
  
class UserService {
  async createUser(data)
  {
    if (await User.findOne({ where: { login: { [Op.iLike]: data.login } }, raw:true })) 
    {
      return false;
    }
    const user = await User.create(data);
    return await TokenGuard.generate({id: user.id});
  }

  async findUser(id) {
    const user = await User.findByPk(id)
    if (!user)
    {
      return false;
    }
    return user;
  }
}


export default UserService;
