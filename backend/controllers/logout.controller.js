export async function logoutController(req, res) {
  try {
    res.clearCookie("app-gamified");

    return res
      .status(200)
      .json({ success: true, message: "Logout realizado." });
  } catch (error) {
    console.log("Erro no controlador de Logout: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro no servidor interno." });
  }
}
