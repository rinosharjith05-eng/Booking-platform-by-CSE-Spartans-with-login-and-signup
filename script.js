const form = document.getElementById('bookingForm');
const msg = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  msg.textContent = "✅ Booking Confirmed! We'll contact you soon.";
  form.reset();
});
