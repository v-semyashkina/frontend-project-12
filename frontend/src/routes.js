const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  createUserPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  addChannelPath: () => [apiPath, 'channels'].join('/'),
  deleteChannelPath: (id) => [apiPath, 'channels', id].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  addMessagePath: () => [apiPath, 'messages'].join('/'),
  deleteMessagePath: (id) => [apiPath, 'messages', id].join('/'),
};
