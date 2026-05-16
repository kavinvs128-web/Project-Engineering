export async function fetchOrders() {
  const response = await fetch('/api/orders')
  if (!response.ok) {
    throw new Error('Failed to fetch orders')
  }
  return response.json()
}
