# Github API Search

## Overview
- This service uses the Github API to search for Github users by their
	username and used programming languages.

## Setup
- To run, after pulling the repo, build the docker image from the
	root folder using:
	```
	docker build -t [image-name] .
	```
	And then run:
	```
	docker run -p 8080:8080 [image-name]
	```
## Test
To test, run ```npm run test```.

## API Documentation
For documentation on the API endpoint, refer to the [swagger](/swagger.yaml) file.
