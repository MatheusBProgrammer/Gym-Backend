import User from "../models/User";
import UserValidation from "../models/validation/UserValidation";
import bcrypt from "bcryptjs";

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

    //validação yup
    try {
      await UserValidation.validate({ email, password });
    } catch (error) {
      return res.status(400).json({ erro: "erro de validação" });
    }

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        const hashPassword = await bcrypt.hashSync(password, 10);
        user = await User.create({
          email: email,
          password: hashPassword,
        });
        return res.json({ message: "Cadastro realizado com sucesso!" });
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

  async login(req, res) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        return res.json({ message: "Login realizado com sucesso!" });
      } else {
        return res.status(401).json({ message: "Senha incorreta" });
      }
    } catch (e) {
      return res.status(500).json({
        message: `Erro no processo de login: ${e.message}`,
      });
    }
  }
}
export default new SessionController();
