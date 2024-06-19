import bookings from './bookings.json' assert { type: 'json' };

const RESULT_LIMIT = 5;

export default function getBookings(customer, city) {
  return bookings
    .filter((booking) => {
      const cityMatch = city
        ? booking.city.toLowerCase() === city.toLowerCase()
        : true;

      const customerMatch = customer
        ? booking.customer_name.toLowerCase() === customer.toLowerCase()
        : true;

      const idMatch = booking.id;
      const propertyIdMatch = booking.property_id;
      const dateMatch = booking.date - time;

      return (
        cityMatch && customerMatch && idMatch && propertyIdMatch && dateMatch
      );
    })
    .slice(0, RESULT_LIMIT);
}
