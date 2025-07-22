export default () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return `Bearer ${userId.token}`;
  }

  return {};
};
