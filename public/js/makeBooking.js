// Contact form setting booking.
$('.contact-form').on('submit', function (e) {
  e.preventDefault();

  let dataObject = { ...reservedRoomDetails };

  dataObject.first_name = document.querySelector(
    "input[name='first_name']"
  ).value;
  dataObject.last_name = document.querySelector(
    "input[name='last_name']"
  ).value;
  dataObject.phone = document.querySelector("input[type='phone']").value;
  dataObject.email = document.querySelector("input[type='email']").value;

  $.ajax({
    type: 'POST',
    url: '/api/room-booking',
    data: dataObject,
    success: function (data) {
      $('#message-area')
        .html(
          `<div class="alert alert-success mt-3" role="alert">${data.bookingMessage}</div>`
        )
        .hide()
        .fadeIn(500);
    },
    error: function (error) {
      console.log(dataObject);
      $('#message-area')
        .html(
          `<div class="alert alert-danger mt-3" role="alert">${error.responseJSON.bookingError}</div>`
        )
        .hide()
        .fadeIn(500);
    },
  });
});
