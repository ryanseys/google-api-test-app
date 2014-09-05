google-api-test-app
===================

Use the [Node.js Google API](https://github.com/google/google-api-nodejs-client/) in an [Express web app](expressjs.com). This project can be an example or a foundation for your own project.

Steps:
======

1. Download this example
2. Create a project and view your credentials in your [Google Developer's Console](https://console.developers.google.com/project?authuser=0)
2. Create a secrets.json file using your project's credentials (example below)
3. Run npm install
3. Run npm start to launch your app and see it work

secrets.json
============

Here is an example secrets.json file. Copy the below code and save it to a file in the root of your project called secrets.json. Do not share the contents of this file publicly once you have put in your client_id and client_secret.

	{
	  "web": {
	    "client_id": "abcdefg",
	    "client_secret": "1234567890",
	    "redirect_uris": ["http://localhost:3000/oauth2callback"],
	    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	    "token_uri": "https://accounts.google.com/o/oauth2/token"
	  }
	}