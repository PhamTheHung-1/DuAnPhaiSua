async function auth(req, rep) {
    const { token } = req.cookies;
  
    if (token) {
      try {
        const account = req.server.jwt.verify(token);
        req.account = account;
      } catch (err) {
        return rep.redirect('/login');
      }
    } else {
      return rep.redirect('/login');
    }
  }
  
  module.exports = auth;