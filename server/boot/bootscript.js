module.exports = function(app) {
    var admin = {
        email: 'admin@gmail.com',
        password: 'abc123'
    };
    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    User.count({
            email: admin.user
        },
        function(err , response) {
            if (response > 0) {
                console.log('admin already exist.');
                return false;
            }
            User.create([admin], function(err, users) {
                if (err) {
                    return console.log(err);
                }

                //create the admin role
                Role.create({
                    name: 'admin'
                }, function(err, role) {
                    if (err) {
                        console.log(err);
                    }
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: users[0].id
                    }, function(err, principal) {
                        console.log(err);
                    });
                });
            });
        })
}
