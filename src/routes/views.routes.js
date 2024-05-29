import { Router } from "express";
import ProductManager from "../dao/productsManager.js";
import CartManager from "../dao/cartsManager.js";
import UserManager from "../dao/usersManager.js";


const viewRouter = Router();
const managerProduct = new ProductManager();
const managerUser = new UserManager();
const managerCart = new CartManager();

viewRouter.get("/chat", async (req, res) => {
  res.render("chat", {});
});

viewRouter.get("/welcome", (req, res) => {
  const user = { name: "Julio Cesar CHIAPPA" };
  res.render("index", user);
});

viewRouter.get("/realtime_products", async (req, res) => {
  try {
    const productList = await managerProduct.getAllProducts();
    res.render("realtime_products", { products: productList });
  } catch (error) {
    console.error(
      "Error al obtener los productos desde la base de datos:",
      error
    );
    return res.status(500).send("Error interno del servidor");
  }
});

viewRouter.get("/users", async (req, res) => {
    try {
      const userList = await managerUser.getAllUsers();
      res.render("users", { users: userList });
    } catch (error) {
      console.error(
        "Error al obtener los usuarios desde la base de datos:",
        error
      );
      return res.status(500).send("Error interno del servidor");
    }
  });

  viewRouter.get("/carts", async (req, res) => {
    try {
      const cartList = await managerCart.getAllCarts();
      res.render("carts", { carts: cartList });
    } catch (error) {
      console.error(
        "Error al obtener el carrito de productos desde la base de datos:",
        error
      );
      return res.status(500).send("Error interno del servidor");
    }
  });

export default viewRouter;
