# weatherReport
## Set Up Local Test Environment
```
git clone https://github.com/ravi45722/weatherReport
cd weatherReport
npm install
```
It will clone the repository and install all the packages (mentioned in package.json) needed for the application.

## Usage
```
node app.js
```
It will start the server. Send a post request with the city names in the body which you want to get forecast details. For Example
```
Method : POST 
URI    : http://<nodeip>:<port>/getClimateAsync 
Body   : ["San Antonio","Sanfransisco"]
```
