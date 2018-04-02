$(document).ready(() => {
  console.log('ready')
  renderItems()
})

const addItem = item => {
  $('.items').append(`
    <div class="card">
      <h3>${item}</h3>
      <button class="delete">x</button>
    </div>
  `)
}

const renderItems = async () => {
  const itemData = await fetch('/api/v1/items')
  const allItems = await itemData.json()

  allItems.forEach(item => addItem(item.item))
}


$('.submit-item').on('click', () => {
  const item = $('input').val()

  addItem(item)

  fetch('/api/v1/items', {
    method: 'POST',
    body: JSON.stringify({ item, packed: false }),
    headers: {'Content-Type': 'application/json'}
  })
  
  $('input').val('')
})

$('.items').on('click', '.delete', (e) => {
  const item = $(e.target).closest('.card').find('h3').text() 
  console.log('item:', item)

  fetch('/api/v1/items', {
    method: 'DELETE', 
    body: JSON.stringify({ item }),
    headers: {'Content-Type': 'application/json'}
  })

  $(e.target).closest('.card').remove()
})

