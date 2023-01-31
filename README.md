# Project Description

This application is written in NODEJS framework using MONGODB for the following features:
1. RestFUL API for User C.R.U.D
2. OAuth (JWTToken) - added as a middleware to verify sign-ups (new user) and authenticate sign-ins
3. Follow and Unfollow User - user able to unfollow and follow
4. Get a nearby users to follow - user can retrieve nearby users to follow (can customise distance) 

## Setup
1. You need to have MongoDB installed and running
2. You need to install nodejs and npm then, run as below (the server should be running at `http://localhost:3000`)

```bash
npm install
npm run start
```

## Usage
You can use your own mongodb to link to the app. E.g. as below:

`"dburl": "mongodb+srv://<username>:<password>@usercluster.teqxcgz.mongodb.net/?retryWrites=true&w=majority"`

## Future Improvements
1. Add more roles to perform more operations
2. Allow user to approve and disapprove follower requests
3. Allow user to hide him/herself from being displayed near nearby-friends
4. Enable nearby-friends feature to be more accurate
5. More rigorous testings
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

Authored by eaintmyat-bo
