angular.module('starter.controllers', [])

        .controller('HomeCtrl', function ($scope, $state) {
            $scope.search = {};
            $scope.getResult = function (keyword) {
                $state.go("result", {keyword: keyword});
            };
        })

        .controller('DashCtrl', function ($scope) {})

        .controller('ResultCtrl', function ($scope, $state, $stateParams, $ionicLoading, AjaxRequest) {
            $scope.resultItems = {};
            var keyword = $stateParams.keyword;
//            $scope.resultItems = GjResult.search(keyword);
//            alert("jobs:" + $scope.resultItems.jobs.length);

            $ionicLoading.show({
                template: "正在载入数据，请稍后..."
            });
            AjaxRequest.getResultList(keyword).success(function (response, status) {
                $scope.resultItems = response;
                $ionicLoading.hide();
            }).error(function (response, status) {

            });

            $scope.goHome = function () {
                $state.go("tab.home");
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
