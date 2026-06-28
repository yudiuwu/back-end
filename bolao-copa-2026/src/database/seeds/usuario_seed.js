exports.seed = async function (knex) {

  await knex("usuarios").del();

  await knex("usuarios").insert([
    {
      nome: "Arthur",
      email: "arthur@email.com",
      senha: "123456"
    }
  ]);

};