# Strava Application

## How to run the app

- Ensure you have followed the setup steps outlined in TASK.md (install Node, `npm i` ...).

## Key notes

- I updated package version due to a few issues with vulnerabilities and deployment restrictions on Vercel. Most notably `next` to version 16 and after an `npm audit` an override to `postcss` to reduce vulnerabilities to 0.
- I also refactored layout.tsx and removed styled components as per the migration instructions found in [cruk-react-component](https://github.com/CRUKorg/cruk-react-components/tree/3e02035b199ebb2fb28353fa0f7e0689eb068bd6#migration-from-v5-and-v6-to-v7)
- 

## Tests

To execute unit tests, you can run the command `npm test` which will activate jest watchman. I have added 4 unit test files, 3 for components and 1 for the token storage utility, all found in `/___tests__`.

In future, I would like to add maestro E2E tests and unit snapshot tests for a more complete coverage.
