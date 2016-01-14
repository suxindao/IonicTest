angular.module('starter.services', ['ionic'])

        .factory('AjaxRequest', function ($http) {
            var requestURL;
            return {
                getResultList: function (keyword, page) {
                    requestURL = "http://search.wagongzuo.com:8080/api/search?jsonpcallback=JSON_CALLBACK&keyword=" + keyword + "&page=" + page;
                    return $http.jsonp(requestURL);
                },
                getJobDetail: function (jid, cid) {
                    jid = jid || 1;
                    cid = cid || 1;
                    requestURL = "http://www.wagongzuo.com/job/info-ajax?jsonpcallback=JSON_CALLBACK&jid=" + jid + "&cid=" + cid;
                    return $http.jsonp(requestURL);
                }
            };
        })

        .factory('Chats', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var chats = [{
                    id: 0,
                    name: 'Ben Sparrow',
                    lastText: 'You on your way?',
                    face: 'img/ben.png'
                }, {
                    id: 1,
                    name: 'Max Lynx',
                    lastText: 'Hey, it\'s me',
                    face: 'img/max.png'
                }, {
                    id: 2,
                    name: 'Adam Bradleyson',
                    lastText: 'I should buy a boat',
                    face: 'img/adam.jpg'
                }, {
                    id: 3,
                    name: 'Perry Governor',
                    lastText: 'Look at my mukluks!',
                    face: 'img/perry.png'
                }, {
                    id: 4,
                    name: 'Mike Harrington',
                    lastText: 'This is wicked good ice cream.',
                    face: 'img/mike.png'
                }];

            return {
                all: function () {
                    return chats;
                },
                remove: function (chat) {
                    chats.splice(chats.indexOf(chat), 1);
                },
                get: function (chatId) {
                    for (var i = 0; i < chats.length; i++) {
                        if (chats[i].id === parseInt(chatId)) {
                            return chats[i];
                        }
                    }
                    return null;
                }
            };
        });
