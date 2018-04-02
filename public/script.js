$('.submit-item').on('click', () => {
  const item = $('input').val()

  $('.items').append(`<h3>${item}</h3>`)
  //need to add delete button and checked box
  //add to db
  $('input').val('')
})
