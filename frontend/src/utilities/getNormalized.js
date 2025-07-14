export default (data) => {
  const ids = [];
  const entities = {};
  data.forEach((item) => {
    entities[item.id] = item;
    ids.push(item.id);
  });
  return {
    ids,
    entities,
  };
};
