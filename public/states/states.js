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
	templateUrl: 'views/user.html'
    });

    $stateProvider.state('user.dashboard', {
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
	templateUrl: 'views/admin.html'
    });

    $stateProvider.state('admin.users', {
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

    $stateProvider.state('manager', {});
});
