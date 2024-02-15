/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

Route.get("/login", async ({ view }) => {
  return view.render("login");
});

Route.get("/profile", async ({ view, auth }) => {
  const user = await auth?.user?.toJSON();
  return view.render("profile",{user});
  
});

Route.post("/login", "UsersController.login").as("login");

Route.get("/register", async ({ view }) => {
  return view.render("register");
});

Route.post("/register", "UsersController.store").as("register");

Route.get("/kelas", "KelasController.index");
Route.get("/kelas/:id", "KelasController.show").as("kelas.detail");

Route.post("/kelas/create", "KelasController.store").as("kelas.store");
Route.post("/kelas/update/:id", "KelasController.update").as("kelas.update");
Route.get("/kelas/delete/:id", "KelasController.delete").as("kelas.delete");

Route.get("/user", "UsersController.index");
Route.get("/user/:id", "UsersController.show").as("user.detail");

Route.post("/user/create", "UsersController.store").as("user.store");
Route.post("/user/update/:id", "UsersController.update").as("user.update");
Route.get("/user/delete/:id", "UsersController.delete").as("user.delete");


Route.post("/siswa/create", "KelasController.store").as("siswa.store");
Route.post("/siswa/update/:id", "KelasController.update").as("siswa.update");
Route.get("/siswa/delete/:id", "KelasController.delete").as("siswa.delete");

Route.get("/ekskul", "EkskulsController.index");
Route.get("/ekskul/:id", "EkskulsController.show").as("ekskul.detail");

Route.post("/ekskul/create", "EkskulsController.store").as("ekskul.store");
Route.post("/ekskul/update/:id", "EkskulsController.update").as("ekskul.update");
Route.get("/ekskul/delete/:id", "EkskulsController.delete").as("ekskul.delete");


Route.post("/daftar-ulang/create", "UsersController.daftar").as("daftar.store");