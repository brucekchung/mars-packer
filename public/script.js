$('.submit-item').on('click', () => {
  const item = $('input').val()

  $('.items').append(`<h3>${item}</h3>`)
  //need to add delete button and checked box

  fetch('/api/v1/items', {
    method: 'POST',
    body: JSON.stringify({ item, packed: false }),
    headers: {'Content-Type': 'application/json'}
  })
  
  $('input').val('')
})

//need to add onload render func
