exports.protected = async (req, res) => {
  res.json(req.session.user);
};
