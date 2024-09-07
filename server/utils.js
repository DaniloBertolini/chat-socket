const sanitize = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
const allowedOrigins = ['http://localhost:5173', 'http://192.168.0.104:5173', 'http://172.18.0.1:5173']
const MAX_MESSAGES = 500;

export {
  sanitize,
  allowedOrigins,
  MAX_MESSAGES
}