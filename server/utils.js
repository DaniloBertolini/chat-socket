const sanitize = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
const MAX_MESSAGES = 500;

export {
  sanitize,
  MAX_MESSAGES
}