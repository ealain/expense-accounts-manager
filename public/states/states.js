app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/user', '/user/dashboard');
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
	url: '/edit',
	templateUrl: 'views/create.html',
	controller: 'userCreateCtrl'
    });
    
    $stateProvider.state('admin', {
	url: '/admin',
	templateUrl: 'views/admin.html',
	controller: 'adminCtrl'
    });

    $stateProvider.state('admin.adduser', {
	url: '/user',
	templateUrl: 'views/admin.adduser.html',
	controller: 'adminAddUserCtrl'
    });
    
    $stateProvider.state('manager', {});
});
