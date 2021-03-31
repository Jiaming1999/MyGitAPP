const api = (path: string, options = {}) => fetch(`https://api.github.com/graphql${path}`,
  options).then((res) => res.json());

export default api;
