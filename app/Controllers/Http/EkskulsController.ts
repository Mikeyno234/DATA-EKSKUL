import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ekskul from 'App/Models/Ekskul';

export default class EkskulsController {
    public async index({ view, auth }: HttpContextContract) {
      const ekskul = await Ekskul.query().where({ dihapus: 0 });
  
      const user = await auth?.user?.toJSON();
      console.log(user);
  
      const listEkskul = ekskul.map((d, idx) => {
        return { ...d.toJSON(), idx: idx + 1 };
      });
  
      return view.render("ekskul.index", {
        ekskul: listEkskul,
        nama_pembimbing: "SMKN 71 JAKARTA",
      });
    }
    public async store({ request, response }: HttpContextContract) {
      const { nama, jumlah_siswa, deskripsi } = request.all();
  
      await Ekskul.create({
        nama,
        jumlahSiswa: jumlah_siswa,
        deskripsi: deskripsi,
        dihapus: 0,
      });
  
      return response.redirect("/ekskul");
    }
    public async show({ view, params }: HttpContextContract) {
      const id = params.id;
      const ekskul = await Ekskul.query()
        .where({ dihapus: 0 })
        .andWhere({ id })
        .firstOrFail();
  
      return view.render("ekskul.show", { ekskul });
    }
    public async update({
      request,
      response,
      params,
      session,
    }: HttpContextContract) {
      const { nama, jumlah_siswa, deskripsi } = request.all();
      const id = params.id;
  
      await Ekskul.query().where({ id }).update({
        nama,
        jumlahSiswa: jumlah_siswa,
        deskripsi: deskripsi,
        dihapus: 0,
      });
      session.flash({ notifivation: "Data Berhasil Diupdate!" });
  
      return response.redirect(`/ekskul`);
    }
  
    public async delete({ response, params, session }: HttpContextContract) {
      const id = params.id;
  
      await Ekskul.query().where({ id }).update({
        dihapus: 1,
      });
      session.flash({ notifivation: "Data Berhasil Diupdate!" });
  
      return response.redirect(`/ekskul`);
    }
  }
