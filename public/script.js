$(document).ready(() => {
  console.log('ready')
  renderItems()
})

const renderItems = async () => {
  const allItems = await fetch('/api/v1/items')

  console.log('items: ', await allItems.json())
}


$('.submit-item').on('click', () => {
  const item = $('input').val()

  $('.items').append(`
    <div class="card">
      <h3>${item}</h3>
      <button class="delete">x</button>
    </div>
  `)
  //need to add delete button and checked box

  fetch('/api/v1/items', {
    method: 'POST',
    body: JSON.stringify({ item, packed: false }),
    headers: {'Content-Type': 'application/json'}
  })
  
  $('input').val('')
})

//need to add onload render func
$('.items').on('click', '.delete', (e) => {
  const name = $(e.target).closest('.card').find('h3').text() 
  console.log('name:', name)

  fetch('/api/v1/items', {
    method: 'DELETE', 
    body: JSON.stringify({ name }),
    headers: {'Content-Type': 'application/json'}
  })
})

