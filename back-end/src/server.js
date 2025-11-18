import express from "express";
import {
  mongoConnect,
  findProducts,
  findProductById,
  findUserById,
  updatedCartItems,
  createUser,
} from "./dbHelper.js";
import path from "path";
import { randomUUID } from "crypto";

const generateGuid = () => randomUUID();

mongoConnect();

const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../assets/images")));

app.use(
  express.static(path.resolve(__dirname, "../dist"), {
    maxAge: "1y",
    etag: false,
  })
);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK!" });
});

app.get("/api/products", async (req, res) => {
  const products = await findProducts();
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await findProductById(req.params.id);

  product
    ? res.json(product)
    : res.status(404).json({ error: "Product not found" });
});

app.get("/api/users/:id/cart", async (req, res) => {
  const user = await findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!user.cartItems) {
    return res.json([]);
  }

  const products = await findProducts();
  const cartProducts = user.cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    return {
      cartItemId: cartItem.cartItemId,
      ...product,
    };
  });
  res.json(cartProducts);
});

app.post("/api/users", async (req, res) => {
  const userId = req.body.id;
  const email = req.body.email;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  let user = await findUserById(userId);

  if (!user) {
    user = {
      id: userId,
      email: email,
      cartItems: [],
    };

    try {
      await createUser(user);
      res
        .status(201)
        .json({ message: "User created successfully", user: user });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    res.status(200).json({ message: "User already exists", user: user });
  }
});

app.post("/api/users/:id/cart", async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  const user = await findUserById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const product = await findProductById(productId);
  if (!product) {
    return res.status(422).json({ error: "No such product" });
  }

  let cartItems = user.cartItems || [];
  const newCartItem = {
    cartItemId: generateGuid(),
    productId: productId,
  };
  cartItems.push(newCartItem);

  try {
    await updatedCartItems(userId, cartItems);
    res.status(201).json({
      message: "Item added to cart",
      cartItemId: newCartItem.cartItemId,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add item to cart" });
  }
});

app.delete("/api/users/:id/cart/:cartItemId", async (req, res) => {
  const userId = req.params.id;
  const cartItemId = req.params.cartItemId;

  const user = await findUserById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (
    !user.cartItems ||
    !user.cartItems.find((item) => item.cartItemId === cartItemId)
  ) {
    return res.status(404).json({ error: "Item not found in cart" });
  }

  try {
    const newCartItems = user.cartItems.filter(
      (item) => item.cartItemId !== cartItemId
    );
    await updatedCartItems(userId, newCartItems);
    res.json({ message: "Item removed from cart", cartItems: newCartItems });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// Catch-all handler: send back Vue's index.html file for client-side routing
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 9000;
const HOST = process.env.NODE_ENV === "prod" ? "0.0.0.0" : "localhost";

app
  .listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
