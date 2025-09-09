const mockUsers = [
  {
    id: 5012,
    fullName: "Anna Müller",
    email: "anna.mueller@example.com",
    role: "User",
    payments: [
      { id: 1, amount: 19.99, status: "Pending", paymentMethod: "PayPal" },
      { id: 2, amount: 9.99, status: "Failed", paymentMethod: "Stripe" },
      { id: 3, amount: 29.99, status: "Paid", paymentMethod: "Cash" },
    ],
  },
  {
    id: 5011,
    fullName: "Jonas Schmidt",
    email: "jonas.schmidt@example.com",
    role: "Admin",
    payments: [
      { id: 4, amount: 39.99, status: "Failed", paymentMethod: "PayPal" },
      { id: 5, amount: 19.99, status: "Paid", paymentMethod: "Stripe" },
      { id: 6, amount: 15.99, status: "Paid", paymentMethod: "Cash" },
      { id: 7, amount: 25.99, status: "Pending", paymentMethod: "PayPal" },
      { id: 8, amount: 12.99, status: "Paid", paymentMethod: "Stripe" },
    ],
  },
  {
    id: 5010,
    fullName: "Lea Fischer",
    email: "lea.fischer@example.com",
    role: "User",
    payments: [
      { id: 9, amount: 15.99, status: "Paid", paymentMethod: "Stripe" },
    ],
  },
  {
    id: 5009,
    fullName: "Max Weber",
    email: "max.weber@example.com",
    role: "User",
    payments: [
      { id: 10, amount: 22.99, status: "Paid", paymentMethod: "PayPal" },
      { id: 11, amount: 18.99, status: "Failed", paymentMethod: "Cash" },
    ],
  },
  {
    id: 5008,
    fullName: "Sarah Klein",
    email: "sarah.klein@example.com",
    role: "Admin",
    payments: [
      { id: 12, amount: 45.99, status: "Pending", paymentMethod: "Stripe" },
      { id: 13, amount: 32.99, status: "Paid", paymentMethod: "PayPal" },
      { id: 14, amount: 28.99, status: "Paid", paymentMethod: "Cash" },
      { id: 15, amount: 15.99, status: "Failed", paymentMethod: "Stripe" },
    ],
  },
  {
    id: 5007,
    fullName: "Tom Hoffmann",
    email: "tom.hoffmann@example.com",
    role: "User",
    payments: [],
  },
  {
    id: 5006,
    fullName: "Lisa Wagner",
    email: "lisa.wagner@example.com",
    role: "User",
    payments: [
      { id: 16, amount: 19.99, status: "Paid", paymentMethod: "PayPal" },
      { id: 17, amount: 24.99, status: "Paid", paymentMethod: "Stripe" },
      { id: 18, amount: 12.99, status: "Pending", paymentMethod: "Cash" },
    ],
  },
];

export default mockUsers;
