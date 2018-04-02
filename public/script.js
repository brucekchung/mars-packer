$('.submit-item').on('click', () => {
  console.log('clicked')
   
  const item = $('input').val()
  $('.items').append(`<h3>${item}</h3>`)
})
