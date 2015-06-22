angular
    .module('app')
    .controller('ProductController', ['$scope', 'Product', 'Order', 'uploadService', '$state', '$rootScope', '$modal', '$timeout',
        function($scope, Product, Order, uploadService, $state, $rootScope, $modal, $timeout) {
            Product.find(function(response) {
                $scope.products = response;
            }, function() {
                $state.go("error");
            });

            $scope.saveProduct = function(product) {
                product.loading = 1;
                var productVO = {};
                productVO.productName = product.productName;
                productVO.unitPrice = product.unitPrice;
                productVO.unit = product.unit;
                productVO.quantities = product.quantities;
                productVO.description = product.description;
                Product.update({
                        where: {
                            "id": product.id
                        }
                    },
                    productVO,
                    function(response) {
                        $timeout(function() {
                            product.loading = 0;
                            $state.go("productManage");
                        }, 1500, true, product, $state);
                    },
                    function() {
                        $state.go("error");
                    })
            };

            $scope.deleteProduct = function(product) {
                product.loading = 2;
                Product.deleteById({
                    "id": product.id
                }, function() {
                    $timeout(function() {
                        product.loading = 0;
                        $state.go($state.current, {}, {
                            reload: true
                        });
                        //$state.go("productManage");
                    }, 1500, true, product, $state);
                }, function() {
                    $state.go("error");
                });
            };

            $scope.openAddProduct = function() {
                $modal.open({
                    templateUrl: 'views/addProduct.html',
                    controller: 'AddProductModalCtrl',
                    resolve: {
                        product: function() {
                            return {};
                        },
                        Product: function() {
                            return Product;
                        },
                        uploadService: function() {
                            return uploadService;
                        },
                        state: function() {
                            return $state;
                        }
                    }
                });
            };

            $scope.order = function(product) {
                if (!$rootScope.currentUser) {
                    $modal.open({
                        templateUrl: 'views/modal.html',
                        controller: 'MessageModalInstanceCtrl',
                        resolve: {
                            message: function() {
                                return "Please login to order";;
                            }
                        }
                    });
                    return false;
                }
                if (product.orderUnit > 0 && product.orderUnit <= product.quantities) {
                    $modal.open({
                        templateUrl: 'views/orderModal.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            product: function() {
                                return product;
                            },
                            Order: function() {
                                return Order;
                            },
                            user: function() {
                                return $rootScope.currentUser.user;
                            },
                            Product : function(){
                            	return Product;
                            }
                        }
                    });
                } else if( product.orderUnit > product.quantities ){
                    $modal.open({
                        templateUrl: 'views/modal.html',
                        controller: 'MessageModalInstanceCtrl',
                        resolve: {
                            message: function() {
                                return "not enough available";
                            }
                        }
                    });
                    return false;
                }else{
                	$modal.open({
                        templateUrl: 'views/modal.html',
                        controller: 'MessageModalInstanceCtrl',
                        resolve: {
                            message: function() {
                                return "invalid unit number";
                            }
                        }
                    });
                    return false;
                }
            }
        }
    ]).controller('ModalInstanceCtrl',
        function($scope, $modalInstance, product, Order, user , Product ) {
            $scope.product = product;
            $scope.user = user;
            $scope.confirm = function() {
                var order = {};
                order.productName = product.productName;
                order.productId = product.id;
                order.unit = product.orderUnit;
                order.unitPrice = product.unitPrice;
                order.orderDate = new Date();
                order.orderStatus = "ordered";
                order.address = $scope.user.address;
                order.userId = $scope.user.id;
                order.userEmail = $scope.user.email;
                Order.create(order, function( ) {
                	product.quantities = product.quantities - order.unit;
                	Product.prototype$updateAttributes({
                		id : product.id
                	} , { quantities :  product.quantities } , function( ){
                		$modalInstance.close();
                	} , function( ){
                		console.log( 'error' );
                		$modalInstance.close();
                	});
                    
                }, function() {
                    $modalInstance.close();
                });

            };

            $scope.cancel = function() {
                $modalInstance.dismiss();
            };
        }).controller('MessageModalInstanceCtrl',
        function($scope, $modalInstance, message) {
            $scope.message = message;
            $scope.close = function() {
                $modalInstance.close();
            }
        }).controller('AddProductModalCtrl',
        function($scope, $modalInstance, Product, product, uploadService, state) {
            $scope.product = product;
            $scope.file = null;
            $scope.uploadEnable = false;
            $scope.uploadedFile = function(element) {
                $scope.product.imageURL = element.files[0].name;
                $scope.file = element.files[0];
                $scope.uploadEnable = true;
                $scope.$apply();
            }
            $scope.upload = function() {
                $scope.uploadError = "";
                $scope.uploadEnable = false;
                uploadService($scope.file, '/api/containers/container1/upload', function() {
                    $scope.uploadError = false;
                    $scope.uploadEnable = true;
                }, function() {
                    $scope.uploadError = true;
                    $scope.uploadEnable = true;
                });
            }

            $scope.save = function() {
                Product.create($scope.product, function() {
                    state.go(state.current, {}, {
                        reload: true
                    });
                    $modalInstance.close();
                }, function() {
                    $modalInstance.close();
                });
            }

            $scope.cancel = function() {
                $modalInstance.close();
            }
        });