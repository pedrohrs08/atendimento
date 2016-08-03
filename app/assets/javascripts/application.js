// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require websocket_rails/main

$(function(){
	var dispatcher = new WebSocketRails("52.43.104.250:3000" + '/websocket');


	dispatcher.on_open = function(data) {  
  		console.log('Connection has been established: ', data);
  		    channel = dispatcher.subscribe('requests');
  		    channel.on_success = function(sucess){
  		    	console.log('on_success');
  		    }
  			console.log(channel);
			channel.bind('new', function(post) {
		      console.log(post);
			  post = JSON.parse(post);
			  var url = "http://doadores-env.ewmarezs3y.sa-east-1.elasticbeanstalk.com/donors/";	
			  url = url + post["requester"] + ".json";
			  $.ajax({ 
			  		type: 'GET', 
            		crossDomain: true,
            		url: url,
            		error: function(error){
 						console.log(error);
            		},
            		success: function( data ) {
				  		$("#requests").append("<div style='border: 1px solid black'>" +
				  			"<label id='donor'>" + data["name"] + "</label><br>" +
                    		"<label id='reason'>" + post["reason"] + "</label><br>" +
                    		"<a href='#'>Atender e Faturar</a>" +
				  		"</div>");
						}
					});
			});
	}

});
