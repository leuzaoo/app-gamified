import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
  const token = req.cookies["app-gamified"];

  if (!token) {
    return res.status(401).json({ message: "Faça login novamente." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    if (!req.userId) {
      return res.status(401).json({
        message: "Nenhum usuário logado. Acesse sua conta novamente.",
      });
    }

    next();
  } catch (error) {
    console.error("Error to trying find logged user: ", error);
    return res
      .status(400)
      .json({ message: "Token inválido. Faça login novamente." });
  }
}
