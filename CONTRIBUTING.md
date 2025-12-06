# Contributing to `Solid Hook Form`

## Code contributions

Here is a quick guide to doing code contributions to the library.

1. Fork and clone the repo to your local machine `git clone https://github.com/YOUR_GITHUB_USERNAME/solid-hook-form.git`

2. Create a new branch from `master` with a meaningful name for a new feature or an issue you want to work on: `git checkout -b your-meaningful-branch-name`

3. Install packages by running:

   ```sh
   npm ci
   ```

Pay attention that we use npm v10 along with Node.js v22.

4. If you've added a code that should be tested, ensure the test suite still passes.

   ```sh
   cd tests && npm run tests
   ```

5. Try to write some tests to cover as much of your code as possible.

6. Ensure your code lints without errors.

   ```sh
   npm run lint
   ```

7. Ensure build passes.

   ```sh
   npm run build
   ```

8. Push your branch: `git push -u origin your-meaningful-branch-name`

9. Submit a pull request to the upstream solid-hook-form repository.

10. Choose a descriptive title and describe your changes briefly.

## Coding style

Please follow the coding style of the project. Solid Hook Form uses Biome. If possible, enable the respective plugin in your editor to get real-time feedback. The linting can be run manually with the following command: `npm run lint`
