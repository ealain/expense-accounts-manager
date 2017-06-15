app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
	url: '/',
	templateUrl: 'views/login.html',
	controller: 'loginCtrl'
    });

    $stateProvider.state('signup', {
	url: '/signup',
	templateUrl: 'views/signup.html',
	controller: 'signupCtrl'
    });

    $stateProvider.state('logout', {
	url: '/logout',
	templateUrl: 'views/login.html',
	controller: 'logoutCtrl'
    });

    $stateProvider.state('user', {
	url: '/user',
	templateUrl: 'views/user.html',
        controller: 'userCtrl'
    });

    $stateProvider.state('user.udashboard', {
	url: '/dashboard',
	templateUrl: 'views/dashboard.html',
	controller: 'userDashCtrl'
    });

    $stateProvider.state('user.edit', {
	url: '/edit/:note_id',
	templateUrl: 'views/edit.html',
	controller: 'userEditCtrl'
    });

    $stateProvider.state('user.create', {
	templateUrl: 'views/create.html',
	controller: 'userCreateCtrl'
    });


    $stateProvider.state('admin', {
	url: '/admin',
	templateUrl: 'views/admin.html',
        controller: 'adminCtrl'
    });

    $stateProvider.state('admin.ausers', {
	templateUrl: 'views/admin.users.html',
	controller: 'adminDashCtrl'
    });

    $stateProvider.state('admin.adduser', {
	templateUrl: 'views/admin.adduser.html',
	controller: 'adminAddUserCtrl'
    });

    $stateProvider.state('admin.adduser.manager', {
	templateUrl: 'views/admin.attribuser.html',
	controller: 'adminAddManagerCtrl'
    });

    $stateProvider.state('admin.aedit', {
        url: '/edit/:user_id',
	templateUrl: 'views/admin.edituser.html',
	controller: 'adminEditUserCtrl'
    });

    $stateProvider.state('admin.aedit.emanager', {
	templateUrl: 'views/admin.attribuser.html',
	controller: 'adminEditManagerCtrl'
    });


    $stateProvider.state('manager', {
        url: '/manager',
        templateUrl: 'views/manager.html',
        controller: 'managerCtrl'
    });

    $stateProvider.state('manager.mdashboard', {
        url: '/dashboard',
        templateUrl: 'views/manager.dashboard.html',
        controller: 'managerDashCtrl'
    });

    $stateProvider.state('manager.mnotes', {
        url: '/notes',
        templateUrl: 'views/manager.notes.html',
        controller: 'managerNotesCtrl'
    });
});
