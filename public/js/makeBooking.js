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
      document.querySelector('form.search-property-1').reset();
      document.querySelector('form.contact-form').reset();
      $('#message-area1').hide();
      $('#contact-section').hide();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      $('#m-modal')
        .html(
          `<div class="alert alert-success container" role="alert" style="top: 25%;">
      <h4 class="alert-heading">Thank you for booking, ${data.first_name}!</h4>
      <p>You have successfully made for a booking for ${data.room_type
        .split('-')
        .join(' ')}. An email containing all details has been sent to you.</p>
      <hr>
      <p class="mb-0">Please email email@email.com for any queries.</p>
    </div>`
        )
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
