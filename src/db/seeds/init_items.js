
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    { id: 1, name: 'apples', price: 1.99, quantity: 1 },
    { id: 2, name: 'bananas', price: 2.99, quantity: 2 },
    { id: 3, name: 'milk', price: 3.99, quantity: 1 },
  ])
}
