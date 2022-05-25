# Summary

This is a full-stack application for Patient Zero built in mind under time constraints.

The backend is built using Fastify with swagger docs. Endpoints are built in a restful way using GET, POST, PUT and DELETE.

The frontend is built using React and Axios for fetching. It is very simple and barebones but demonstrates the POC.

# Build

Built using node v16.13.1

# Future Considerations / Limitations

## File Upload

To create an item, in order to save time, I did not use file upload and deal with storing files. Instead, images are rendered by using a public hosted image's URL.

## Validation on request payload

There is no schema validation on request, as such the endpoints are not built robustly to handle all edge cases.

## Verbose messages

Responses messages are very simple and do not provide much feedback to the user.

## Cloud Storage

As this only only ran locally and also accessed by 1 person at most, the data is stored on a JSON file on the server. In the future, this could be stored onto a database on the cloud.

## Local build only

This application is not deployed onto any instances on the cloud. It is to be run locally only. Although it could be deployed and be given a domain for public access.

## File structure

The code style is meant to be flat and simple. As the code goes, it could organically be refactored into additional directories. Such as the routes that exist in the server file could be moved out into another folder.

## Repository

For simplificity, the client and server code are in one repository.