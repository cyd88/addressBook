angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular.module(ApplicationConfiguration.applicationModuleName)
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$mdThemingProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider) {
            $httpProvider.interceptors.push('authInterceptor');
            $urlRouterProvider.otherwise('/login');
            $mdThemingProvider
                .theme('default')
                .primaryPalette('blue', {
                    'default': '700'
                });

            $stateProvider
                .state('register', {
                    'url': '/register',
                    'views': {
                        'main': {
                            'templateUrl': '/modules/user/views/register.html',
                            'controller': 'registerController'
                        },
                        'header': {
                            'templateUrl': '/modules/common/views/navbar-unauthorised.html'
                        },
                        'footer': {
                            'templateUrl': '/modules/common/views/footer.html'
                        }
                    },
                    'data': {
                        'requiresLogin': false
                    }
                })
                .state('login', {
                    'url': '/login',
                    'views': {
                        'main': {
                            'templateUrl': '/modules/user/views/login.html',
                            'controller': 'loginController'
                        },
                        'header': {
                            'templateUrl': '/modules/common/views/navbar-unauthorised.html'
                        },
                        'footer': {
                            'templateUrl': '/modules/common/views/footer.html'
                        }
                    },
                    'data': {
                        'requiresLogin': false
                    }
                })
                .state('contact', {
                    'url': '/contacts?page&sort',
                    'views': {
                        'main': {
                            'templateUrl': '/modules/contact/views/contacts.html',
                            'controller': 'contactController'
                        },
                        'header': {
                            'templateUrl': '/modules/common/views/navbar-authorised.html',
                            'controller': 'headerController'
                        },
                        'footer': {
                            'templateUrl': '/modules/common/views/footer.html'
                        }
                    },
                    'data': {
                        'requiresLogin': true
                    }
                })
                // .state('edit', {
                //     'url': '/contacts/{id}',
                //
                //     'data': {
                //         'requiresLogin': true
                //     },
                //     'onEnter': ['$stateParams', '$state', '$mdDialog', function($stateParams, $state, $mdDialog) {
                //         $mdDialog.show({
                //             templateUrl: 'modules/contact/views/edit-contact.html',
                //             controller: 'contactController'
                //
                //
                //         }).result.then(function() {
                //             $state.go('user-management', null, { reload: true });
                //         }, function() {
                //             $state.go('user-management');
                //         });
                //     }]
                //
                // })
                .state('group', {
                    'url': '/groups',
                    'views': {
                        'main': {
                            'templateUrl': '/modules/group/views/groups.html',
                            'controller': 'groupController'
                        },
                        'header': {
                            'templateUrl': '/modules/common/views/navbar-authorised.html',
                            'controller': 'headerController'
                        },
                        'footer': {
                            'templateUrl': '/modules/common/views/footer.html'
                        }
                    },
                    'data': {
                        'requiresLogin': true
                    }
                })
                .state('chat', {
                    'url': '/chat',
                    'views': {
                        'main': {
                            'templateUrl': '/modules/chat/chat.html',
                            'controller': 'chatController'
                        },
                        'header': {
                            'templateUrl': '/modules/common/views/navbar-authorised.html',
                            'controller': 'headerController'
                        },
                        'footer': {
                            'templateUrl': '/modules/common/views/footer.html'
                        }
                    },
                    'data': {
                        'requiresLogin': true
                    }
                });
        }
    ]);

angular.module(ApplicationConfiguration.applicationModuleName).run(['$rootScope', '$state', 'Authentication',
    function ($rootScope, $state, Authentication) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            Authentication.me().then(function (response) {
                console.log(toState);
                var requiresLogin = toState.data.requiresLogin;
                var isAuthenticated = Authentication.isAuthenticated();
                console.log(requiresLogin);
                console.log(isAuthenticated);
                if (requiresLogin && !isAuthenticated) {
                    event.preventDefault();
                    $state.go('login');
                }
                if (!requiresLogin && isAuthenticated) {
                    console.log("called");
                    event.preventDefault();
                    $state.go('contact');
                }
            });
        });
    }
]);


angular.element(document).ready(function () {
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});