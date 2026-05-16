export const getItems = (req, res) => {
  res.json([
    { id: 1, name: 'Ship Engine' },
    { id: 2, name: 'Navigation Setup' },
    { id: 3, name: 'Hull Plating' }
  ]);
};
