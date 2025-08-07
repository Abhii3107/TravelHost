module.exports.isLoggedIn = (req,res,next) => {
    // console.log(req.user);
    // console.log(req.path, "..." , req.originalUrl);
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl; // req.session mai ek redirectUrl variable bna ke usme original url store kra dege
    req.flash("error" , "you must be first logged in , to create listing !");
    return res.redirect("/login");
  } 
  next();
}
//------------------------------
//if user is logou , and it click add listing then our page will redirect to login , which is correct but when it login , user must redirect to add page (because he was at that page in starting)

//when we login after authentication, session automatically reset to new ,so session.redirectUrl is lost so we save in res.locals
module.exports.saveRedirectUrl = (req,res,next) => {
  if(req.session.redirectUrl){       
    res.locals.redirectUrl = req.session.redirectUrl
  }
  next()
}