// Mocked axios.js
const axiosMock = {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    create: jest.fn(function () {
      return this;
    }),
  };
  
  export default axiosMock;
  