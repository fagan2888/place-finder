# place-finder
Use AJAX and the NYTimes and Wikipedia APIs to access info on a place input by the user

Based on Udacity's AJAX course, original skeleton framework from https://github.com/benjaffe/minicourse-ajax-project

Using GAE to host, site is live at http://rachel-place-finder.appspot.com/

Features:
- load google street view image as background
- JSONP is used with Wikipedia API and request timeout is set
- NYTimes API uses JSON and has error handling

To run:
in development: dev_appserver.py minicourse-ajax-project
in production: appcfg.py --oauth2 -A rachel-place-finder update minicourse-ajax-project/
