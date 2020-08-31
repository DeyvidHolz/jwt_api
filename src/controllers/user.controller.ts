import User from '../models/user.model'
import jwtConfig from '../config/jwt.config';
import jwt from 'jsonwebtoken';

const create = async (req, res) => {

  const user = {
    name: req.body.name,
    password: req.body.password,
  }

  const userCreated = await User.create(user);

  if (userCreated) {
    return res.json({ 
      message: 'User created successfully'
    }, 200);
  }

  return res.json({ 
    message: 'Sorry, an error ocurred while trying to create the User' 
  }, 500);
}

const getAll = async () => {
  return await User.findAll();
}

const get = async (user) => {
  return await User.findOne({
    where: user
  });
}

const auth = async (req, res) => {
  const { name, password } = req.body;

  const notSentNameOrPassword = !name || !password;

  if (notSentNameOrPassword)
    return res.status(422).json({ message: 'Invalid name or password' });

  let user = await User.findOne({ where: { name }});

  if (!user)
    return res.status(401).json({ message: 'User not found' });

  if (user.password === password) {
    let payload = { id: user.id };
    let token = jwt.sign(payload, jwtConfig.secretOrKey);
    res.json({ message: 'Authenticated successfully', token });
  } else {
    res.status(401).json({ message: 'Password is incorrect' });
  }
};

export default {
  create,
  getAll,
  get,
  auth,
}
