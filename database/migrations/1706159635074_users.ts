import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("no_urut").primary()
      table.string("nim").unique()
      table.string("nama");
      table.integer("umur");
      table.string("email", 255).notNullable().unique()
      table.string("password", 180).notNullable()
      table.string("role");
      table.string("status");
      table.string("daftar_ulang").defaultTo(0);
      table.tinyint("dihapus").defaultTo (0);
      table.string("remember_me_token").nullable();

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true,true)
      
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
