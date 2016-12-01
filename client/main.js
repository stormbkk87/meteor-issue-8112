import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

deviceToken = new ReactiveVar("")

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  deviceToken() {
  	return deviceToken.get();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

if (Meteor.isCordova){
    Meteor.startup(function () {
    	var VoipPush = cordova.plugins.voippush.init();

        VoipPush.on("voipPushRegister", function(data){
            console.log("deviceToken: "+data);
        });

        VoipPush.on("voipPushPayload", function(data){
            console.log("voipPushPayload: "+JSON.stringify(data));
        });

        Meteor.setTimeout(function(){
            VoipPush.register();
        }, 50);
    });
}

/*
Meteor.startup(function(){
  	if (Meteor.isCordova){
		document.addEventListener("deviceready", function() {
			var VoipPush = cordova.plugins.voippush.init();

	        VoipPush.on("voipPushRegister", function(data){
	            console.log("deviceToken: "+data);
	        });

	        VoipPush.on("voipPushPayload", function(data){
	            console.log("voipPushPayload: "+JSON.stringify(data));
	        });

	        Meteor.setTimeout(function(){
	            VoipPush.register();
	        }, 50);
	    }, false);
  	}
});
*/