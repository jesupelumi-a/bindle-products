export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return response.json();
});
