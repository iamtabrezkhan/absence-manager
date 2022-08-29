## Absence Manager Client

This is the client application built using [create-react-app](https://create-react-app.dev/).

### Features implemented:

- [x] I want to see a list of absences including the names of the employees.
- [x] I want to see the first 10 absences, with the ability to paginate.
- [x] I want to see a total number of absences.
- [x] For each absence I want to see:
  - [x] Member name
  - [x] Type of absence
  - [x] Period
  - [x] Member note (when available)
  - [x] Status (can be 'Requested', 'Confirmed' or 'Rejected')
  - [x] Admitter note (when available)
- [x] I want to filter absences by type.
- [x] I want to filter absences by date.
- [x] I want to see a loading state until the list is available.
- [x] I want to see an error state if the list is unavailable.
- [x] I want to see an empty state if there are no results.

### Step to run locally:

1. Backend mock server is hosted [here](https://absence-manager-backend.herokuapp.com/).
2. ```sh
   npm install
   ```
3. Create a `.env.local` file in the root of the project.
4. Create a environment variable in `.env.local` file. Call it `REACT_APP_API_BASE_URL`
5. Now, you can either use the hosted backend URL given in step 1 above or you can clone [this repo](https://github.com/iamtabrezkhan/absence-manager-server) and run the backend server locally and set local server URL in `REACT_APP_API_BASE_URL` variable.
6. ```sh
   npm start
   ```

I hope you enjoy playing around with this app! 🥳
