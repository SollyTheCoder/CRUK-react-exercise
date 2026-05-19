# CRUK Application

## How to run the app

- Ensure you have followed the setup steps outlined in TASK.md (install Node, `npm i` ...).
- `npm run dev`

## Key notes

- I updated package versions due to a few issues with vulnerabilities and deployment restrictions on Vercel. Most notably `next` to version 16 and after an `npm audit` an override to `postcss` to reduce vulnerabilities to 0.
- I also refactored layout.tsx and removed styled components as per the migration instructions found in [cruk-react-component](https://github.com/CRUKorg/cruk-react-components/tree/3e02035b199ebb2fb28353fa0f7e0689eb068bd6#migration-from-v5-and-v6-to-v7).
- During the writing of the Playwright tests I experienced an issue with the TextField component and the locator.fill() method. For some reason this was causing inconsistent test results, especially when executing them headlessly. I switched `fill` for the `pressSequentially` method and this removed the issues.
- In future, I would like to make the search options and page count query parameters so that the page is directly sharable to other people.

## Tests

To execute unit tests, you can run the command `npm test` which will activate the playwright tests. I have added 3 playwright tests to ensure functionality on the main sections on the application.
In the future, I would add snapshot capture to futher issue the visual elements appear as expected and additionally I would add unit Jest/Vitest unit tests for non-visual testing elements like the nasa url constructor function.
