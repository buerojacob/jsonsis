/* GET About page */
const jsonsis = function(req, res){
  res.render('jsonsis', { title: 'jsonSIS Testpage' });
};
module.exports = {
  jsonsis
};