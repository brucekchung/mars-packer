exports.seed = (knex, Promise) => {
  return knex('items').del()
    .then(() => { 
      return knex('items').insert([ 
        {item: 'bag', packed: false},
        {item: 'light', packed: false},
        {item: 'glasses', packed: false}
      ])
    })
}
