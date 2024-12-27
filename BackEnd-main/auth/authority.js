function authority(role) {
    return (req, rep, done) =>{
        if(req.account&&req.account.role === role){
            done();
        }else{
            rep.redirect("/login")
        }
    }
}
module.exports=authority;