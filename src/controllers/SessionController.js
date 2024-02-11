import User from "../models/User";
import UserValidation from "../models/validation/UserValidation";

class SessionController {
  async index(req, res) {
    let users = await User.find();
    res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;

    let users = await User.findOne({ _id: id });
    return res.json(users);
  }

  async store(req, res) {
    const { email, password } = req.body;

    try {
      await UserValidation.validate({ email, password });
    } catch (error) {
      return res.status(400).json({ erro: erro de validação });
    }

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        user = await User.create({
          email: email,
          password: password,
        });
        return res.json({ user });
      }
      return res
        .status(400)
        .json({ error: "Já existe um usuário com esse email" });
    } catch (error) {
      return res.status(500).json({
        error: `Erro ao criar usuário: ${error}`,
      });
    }
  }
}
export default new SessionController();
