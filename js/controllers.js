angular.module('djBooth.controllers', [])
    // controller for handling the search function


.controller('searchController', function($scope, $window, searchSpotify, databaseInteraction) {

        // the playlist array that houses the songs currently in the queue
        $scope.playList = [];
        // results is an array of results provided from spotify
        $scope.results = [];
        
        //this function is used to call the 
        $scope.getSongs = function(reqString) {
                searchSpotify.getData(reqString).then(function(data) {
                        $scope.results = data;
                    })
                    .catch(function(err) {
                        console.error(err)
                    })

            }
            // when a song is selected it will be added to our server db, 
            // get queue will be invoked immediately after the song has been added to the db 
        $scope.selectSong = function(selectedSong) {
                selectedSong.votes = 0;
                console.log(selectedSong)
                $scope.playList.push(selectedSong)
                databaseInteraction.addSong(selectedSong).then(function() {
                    $scope.getQueue();
                })
            }
            // get the queue from the db so that everyone in the room can see the queue
        $scope.getQueue = function() {
            databaseInteraction.getQueue().then(function(data) {
                $scope.playList = data;
            })
        }



        // the data will also need to be added to the db
        // we should probably not even have a $scope.results but actually just post this to the db via the server
        // on success to posting to the db we should do a get request and update the users view


        $scope.upVote = function() {
            console.log('upvote')

        }
        $scope.downVote = function() {
            console.log('downvote')
        }

    })
    // this is where the search field updates with data from spotify as you type, obviously this is not implemented and 
    // is placeholder code
