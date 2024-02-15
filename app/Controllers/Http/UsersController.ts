import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Hash from "@ioc:Adonis/Core/Hash";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class UsersController {
  public async index({ view, response, auth }: HttpContextContract) {
    const user = await User.query().where({ dihapus: 0 });

    const user1 = await auth?.user?.toJSON();
    console.log(user1);

    const listUser = user.map((d, idx) => {
      return { ...d.toJSON(), idx: idx + 1 };
    });
     
if(user1?.role!=="admin"){
  return response.redirect("/login")
}

    return view.render("user.index", {
      user: listUser,
      nama_pembimbing: "SMKN 71 JAKARTA",
    });
  }


  public async login({
    auth,
    request,
    response,
    session,
  }: HttpContextContract) {
    const { email, password } = request.all();
    const cek = (await auth.attempt(email, password)).toJSON();

    const users = auth?.user?.toJSON()

    if(!cek?.no_urut){
    session.flash(
      "authenticated", "Email/Password yang anda masukkan salah");
    return response.redirect("/login");
  }
  console.log(users);
  
  if(users?.role=="admin"){
    return response.redirect("/user")
  }
  else {
    return response.redirect("/user")
  }
}

  public async store({ request, response }: HttpContextContract) {
    const { nim, nama, umur, email, password, status, daftar_ulang } = request.all();

  await User.create({
    nim,
    nama,
    umur,
    email,
    password,
    status,
    daftarUlang: daftar_ulang,
    role: "admin,users",
    dihapus: 0,
  });

    return response.redirect("/user");
  }
  public async show({ view, params }: HttpContextContract) {
    const noUrut = params.id;
    const user = await User.query()
      .where({ dihapus: 0 })
      .andWhere({ noUrut })
      .firstOrFail();

    return view.render("user.show", { user });
  }
  public async update({
    request,
    response,
    params,
    session,
  }: HttpContextContract) {
    const {  nim, nama, umur, email, password, status, daftar_ulang} = request.all();
    const noUrut = params.id;

    await User.query().where({ noUrut }).update({
      nim,
    nama,
    umur,
    email,
    password,
    status,
    daftarUlang: daftar_ulang,
    role: "admin,users",
    dihapus: 0,
    });
    session.flash({ notifivation: "Data Berhasil Diupdate!" });

    return response.redirect(`/user`);
  }

  public async delete({ response, params, session }: HttpContextContract) {
    const noUrut = params.id;

    await User.query().where({ noUrut}).update({
      dihapus: 1,
    });
    session.flash({ notifivation: "Data Berhasil Diupdate!" });

    return response.redirect(`/user`);
  }


public async daftar({
  request,
  response,
  params,
  session,
  auth,
}: HttpContextContract) {
  const user = await auth?.user?.toJSON();
  const noUrut = user?.no_urut;

  await User.query().where({ noUrut }).update({
  daftarUlang: "sudah daftar",
  dihapus: 0,
  });
  session.flash({ notifivation: "Data Berhasil Diupdate!" });

  return response.redirect(`/profile`);
}
}