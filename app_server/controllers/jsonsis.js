/* GET About page */
const jsonsis_testpage = function(req, res){
  res.render('jsonsis', { title: 'jsonSIS Testpage' });
};
module.exports = {
  jsonsis_testpage
};