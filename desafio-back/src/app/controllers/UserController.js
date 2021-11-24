import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {      
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      user: Yup.string()
        .required(),
      password: Yup.string()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { user: req.body.user } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, user } = await User.create(req.body);

    return res.json({
      id,
      name,
      user,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      user: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { user, oldPassword } = req.body;

    const findUser = await User.findByPk(req.userId);

    if (findUser && user !== findUser.user) {
      const userExists = await User.findOne({ where: { user } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await findUser.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await findUser.update(req.body);

    return res.json({
      id,
      name,
      user,
    });
  }
}

export default new UserController();
