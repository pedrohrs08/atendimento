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
	var dispatcher = new WebSocketRails(window.location.host + '/websocket');


	dispatcher.on_open = function(data) {  
  		console.log('Connection has been established: ', data);
  		    channel = dispatcher.subscribe('requests');
  		    channel.on_success = function(sucess){
  		    	console.log('on_success');
  		    }
  			console.log(channel);
			channel.bind('new', function(post) {
			  var url = "http://doadores-env.ewmarezs3y.sa-east-1.elasticbeanstalk.com/donors/"	
			  url = url + post["id"]
			  $.get( url, function( data ) {
				  $("#requests").append("<label id='donor'>" + data["name"] + "</label>" +
                    "<label id='reason'>" + post["reason"] + "</label>" +
                    "<a href='#'>Atender e Faturar</a>"
				  	"<br>");
			  });
			});
	}

});
