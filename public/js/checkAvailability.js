// Local variable for reserved room.
let reservedRoomDetails = {};

// Click event for success 'room available' pop up message.
// I will probably switch to showing the reservation form.

// Form submission to check availability.
$('.search-property-1').on('submit', function (e) {
  e.preventDefault();

  const dataObject = {};

  // Fetching the form values
  dataObject.room_type = document.querySelector(
    "select[name='room_type']"
  ).value;
  dataObject.checkin_date = document.querySelector(
    "input[name='checkin_date']"
  ).value;
  dataObject.checkout_date = document.querySelector(
    "input[name='checkout_date']"
  ).value;
  dataObject.adult_number = document.querySelector(
    "input[name='adult_number']"
  ).value;

  // Making the post request.
  $.ajax({
    type: 'POST',
    url: '/room-availability',
    data: dataObject,
    success: function (data) {
      // Make reservation details available to local variable.
      reservedRoomDetails = { ...data };

      // Remove danger alert, and set it to success.
      document
        .getElementsByClassName('alert')[0]
        .classList.remove('alert-danger');
      document
        .getElementsByClassName('alert')[0]
        .classList.add('alert-success');

      // Add click event if room is available
      if (data.isAvailable) {
        document
          .querySelector('#success-popup-message')
          .addEventListener('click', (e) => {
            e.preventDefault();

            // Click on contact-section to scroll down
            document.querySelector('#contact-section').removeAttribute('style');
            document.querySelector("a[href='#contact-section']").click();
          });
      }

      // Change message and display it.
      document.querySelector('#message-head').innerText = data.message;
      document
        .querySelector('#success-popup-message')
        .childNodes[1].querySelector('p').innerText =
        'Click here to reserve this space!';

      $('#message-area1').fadeIn(500);

      // Change inputs for booking form.
      reservedRoomDetails = data;
      document.querySelector("input[name='checkinn_date']").value =
        data.checkin_date;
      document.querySelector("input[name='checkoutt_date']").value =
        data.checkout_date;
      document.querySelector(
        "input[name='room_typee']"
      ).value = data.room_type.split('-').join(' ');
    },
    error: function (error) {
      // Display error message.
      document.querySelector('#message-head').innerText =
        error.responseJSON.error;
      document
        .querySelector('#success-popup-message')
        .childNodes[1].querySelector('p').innerText = 'Please try other dates';

      // Change classname to reflect change.
      document
        .getElementsByClassName('alert')[0]
        .classList.remove('alert-success');
      document.getElementsByClassName('alert')[0].classList.add('alert-danger');
      $('#message-area1').fadeIn(500);
    },
  });
});
