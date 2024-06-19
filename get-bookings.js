import bookings from './bookings.json' assert { type: 'json' };

const RESULT_LIMIT = 5;

export default function getBookings(customer, city) {
  return bookings
    .filter((booking) => {
      const cityMatch = city
        ? booking.city.toLowerCase() === city.toLowerCase()
        : true;

      const customerMatch = customer
        ? booking.customerName.toLowerCase() === customer.toLowerCase()
        : true;

      const idMatch = booking.id;
      const propertyIdMatch = booking.propertyId;
      const dateMatch = booking.dateTime;

      return (
        cityMatch && customerMatch && idMatch && propertyIdMatch && dateMatch
      );
    })
    .slice(0, RESULT_LIMIT);
}
