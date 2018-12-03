const authenticate = require('../../../middlewares/authentication')
const authorize = require('../../../middlewares/authorization')


const Profile = require('../../../models/account/Profile');

module.exports = (app) => (auth) => (client) => {

  app.get('/api/user/:username', authenticate, async (req, res, next) => {
    const { username } = req.params;
    const { user } = res.locals;

    await Profile.find({username: username}, (err, profiles) => {
      if (err)
        return res.send({success: false, message: 'Error: ' + err});
      if (profiles.length != 1)
        return res.send({success: false, message: 'Error: Invalid stores >1'});
      var profile = profiles[0];
    });

    if (user){
      if (user._id === profile.owner)
        profile.isOwner = true;
      else
        profile.isOwner = false;
    }

    res.send({success: true, data: profile});

  });

  app.put('/api/user/:username/update', authenticate, authorize('user'), async (req,res,next) =>{
    const {name , category, description} = req.body;
    const { user } = res.locals;


    Store.find({ name: name}, (err, stores) => {

      if (err)
        return res.send({ success: false, message: 'Error: Server error' + err});
      else if (stores.length > 0)
        return res.send({ success: false, message: 'Error: Store already exist.'});


      const store = new Store();

      store.name = name;
      store.category = category;
      store.description = description;
      store.owner = user._id;

      store.save((err, store) => {
        if (err)
          return res.send({ success: false, message: 'Error: Server error' + err});
        req.session.success= true;
        return res.send({ success: true, message: 'Store created'});
      });
    });



  });
};
