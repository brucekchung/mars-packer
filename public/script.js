$(document).ready(() => {
  console.log('ready')
  renderItems()
})

const addItem = item => {
  $('.items').append(`
    <div class="card">
      <h3>${item}</h3>
      <button class="delete">x</button>
      <h4>Packed: </h4>
      <input class="pack-status" checked type="checkbox" />
    </div>
  `)
}

const renderItems = async () => {
  const itemData = await fetch('/api/v1/items')
  const allItems = await itemData.json()

  allItems.forEach(item => addItem(item.item))
}

$('.items').on('click', '.pack-status', (e) => {
  let packed

  //const thing = $(e.target).attr('checked', !checkBoxes.attr("checked"))
  //console.log('thing', thing)
  //const item = $(e.target).closest('.card').find('h3').text()
  //console.log('item: ', item)

  fetch('/api/v1/items', {
    method: 'PATCH',
    body: JSON.stringify({ item, packed }),
    headers: {'Content-Type': 'application/json'}
  })
})

$('.submit-item').on('click', () => {
  const item = $('.item-entry').val()

  addItem(item)

  fetch('/api/v1/items', {
    method: 'POST',
    body: JSON.stringify({ item, packed: false }),
    headers: {'Content-Type': 'application/json'}
  })
  
  $('.item-entry').val('')
})

$('.items').on('click', '.delete', async(e) => {
  const name = $(e.target).closest('.card').find('h3').text() 

  fetch(`/api/v1/items/${name}`, {
    method: 'DELETE', 
    body: JSON.stringify({ item: name }),
    headers: {'Content-Type': 'application/json'}
  })

  $(e.target).closest('.card').remove()
})

