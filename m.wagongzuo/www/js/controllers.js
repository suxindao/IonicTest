angular.module('starter.controllers', ['ionic'])

        .controller('HomeCtrl', function ($scope, $state) {
            $scope.search = {};
            $scope.getResult = function (keyword) {
                $state.go("result", {keyword: keyword});
            };
        })

        .controller('DashCtrl', function ($scope) {})

        .controller('ResultCtrl', function ($scope, $state, $stateParams, $ionicLoading, $ionicHistory, AjaxRequest) {
//            $scope.resultItems = {};
            var keyword = $stateParams.keyword || "php", page = 1;
//            $scope.resultItems = GjResult.search(keyword);
//            alert("jobs:" + $scope.resultItems.jobs.length);

            //获取结果列表
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });
            AjaxRequest.getResultList(keyword, page).success(function (response, status) {
                $scope.resultItems = response;
                $ionicLoading.hide();
            }).error(function (response, status) {

            });

            $scope.getMore = function () {
                page++;
                $ionicLoading.show({
                    template: "正在载入数据，请稍后..."
                });
                AjaxRequest.getResultList(keyword, page).success(function (response, status) {
                    $scope.resultItems.jobs = $scope.resultItems.jobs.concat(response.jobs);
                    $ionicLoading.hide();
                }).error(function (response, status) {

                });
            }

            //跳转至Job detail页面
            $scope.detail = function (jid, cid) {
                $state.go("jinfo", {jid: jid, cid: cid});
            }

            $scope.goHome = function () {
//                $state.go("tab.home");
//                var h = $ionicHistory.viewHistory();
                $ionicHistory.goBack();
            };
        })

        .controller('JobInfoCtrl', function ($scope, $state, $stateParams, $ionicLoading, $ionicTabsDelegate, AjaxRequest) {
            var jid = $stateParams.jid,
                    cid = $stateParams.cid;

            //获取结果列表
            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });
            AjaxRequest.getJobDetail(jid, cid).success(function (response, status) {
                if (response.success === true) {
                    $scope.jinfo = response.jobinfo;
                }
                $ionicLoading.hide();
            }).error(function (response, status) {

            });

            $scope.onSwipeRight = function () {
                $ionicTabsDelegate.select(0);
            };

            $scope.onSwipeLeft = function () {
                $ionicTabsDelegate.select(1);
            };

        })

        .controller('ChatsCtrl', function ($scope, Chats) {
            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            $scope.chats = Chats.all();

            $scope.remove = function (chat) {
                Chats.remove(chat);
            };
        })

        .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
            $scope.chat = Chats.get($stateParams.chatId);
        })

        .controller('AccountCtrl', function ($scope) {
            $scope.settings = {
                enableFriends: true
            };
        });
