/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('alunos').del()
  await knex('alunos').insert([
    {nome: 'yudi', idade: 20, numero_chamada: 1},
    {nome: 'joao', idade: 21, numero_chamada: 2},
    {nome: 'jogao', idade: 19, numero_chamada: 3}
  ]);
};
