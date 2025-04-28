[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![GitHub Release][release-shield]][release-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<div align="center">
  <img src="readme.svg">
</div>

<div align="center">
  <h1>Google Calender App</h1>
  <p>Synchronize your help desk with Google Calendar integration, streamline your workflows with event based triggers.</p>
  <a href="https://support.deskpro.com/ga/guides/developers/anatomy-of-an-app" target="_blank">Deskpro Apps Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://developers.google.com/workspace/calendar/api/guides/overview" target="_blank">Google Calendar API Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="./SETUP.md" target="_blank">Google Calendar App Setup Guide</a>
  <br />
  <hr />
  <br />
</div>

![Screenshot of the Google Calendar App](./docs/readme/app-screenshot.png)

## **About the app**
Google Calendar provides time management and scheduling for users to create, manage, and share calendars, events, and reminders.
Synchronize your scheduling directly from the Deskpro platform, enhancing your help desk's efficiency.

## **Setting up the app in Deskpro**
You can follow our [setup guide](./SETUP.md) for a step-by-step guide to setting up the Google Calendar app in Deskpro.

## Development

### With DevContainers (Recommended)
To make development easier and avoid version conflicts, we recommend using **DevContainers** for local development. This approach ensures that everyone on the team uses the same environment, reducing setup issues and version mismatches between dependencies.

#### Why use DevContainers?
- **Consistency:** All developers work in the same environment, with the same versions of dependencies, tools, and configurations.
- **Speed:** The DevContainer setup is quick to start, letting you focus on coding rather than environment setup.
- **Isolation:** Avoid conflicts between different versions of Node.js, PNPM, or other dependencies by using the predefined container setup.

#### Getting Started with DevContainers
1. Ensure that you have [Docker](https://www.docker.com/get-started) and [VS Code](https://code.visualstudio.com/) installed.
2. Open the project in VS Code.
3. If you have the **Remote - Containers** extension installed, VS Code should automatically detect the `.devcontainer` configuration in this project and prompt you to reopen the folder in the container.
4. After opening the project in the DevContainer, run:
   ```bash
   pnpm install


### Natively
_We recommend using the DevContainer mentioned above for Consistency, Speed and Isolation._

This app was developed primarily using **Typescript**, **React**, and **Vite**.

#### Setup
To run this project locally:

 ```bash
# Clone the repository
git clone https://github.com/DeskproApps/google-calendar.git

# Change to the project directory
cd google-calendar

# Install dependencies
pnpm install

# Run the development server.
pnpm start
```

You should now be able to view the app in your browser. For more information about developing [Deskpro apps](https://www.deskpro.com/apps), [Visit the docs](https://support.deskpro.com/ga/guides/developers/anatomy-of-an-app).

### Testing
We've included `jest` to run your tests. It will look anywhere in `/src` for test suite files ending in `.test.tsx` or `.test.ts`.

You can run all tests using:

```bash
pnpm test
```

## Versioning
Every app deployment requires that the version property in the `manifest.json` file be updated to reflect the new app version. This is so Deskpro can detect changes and add/upgrade apps accordingly. As such, we've made altering versions easy by having CI make the actual version change for you. Here's what we do:

* We increment patch versions, i.e. 1.0.1, automatically. You don't need to do anything and this will happen
* Minor versions, i.e. 1.1.0, are incremented if you add the minor-version GitHub label to your PR
* Major versions, i.e. 2.0.0, are incremented if you add the major-version GitHub label to your PR

## Top contributors
[![Contributors](https://contrib.rocks/image?repo=deskproapps/google-calendar)](https://github.com/deskproapps/google-calendar/graphs/contributors)

## License
Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for more information.

[contributors-shield]: https://img.shields.io/github/contributors/deskproapps/google-calendar.svg?style=for-the-badge
[contributors-url]: https://github.com/deskproapps/google-calendar/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/deskproapps/google-calendar.svg?style=for-the-badge
[forks-url]: https://github.com/deskproapps/google-calendar/network/members
[issues-shield]: https://img.shields.io/github/issues/deskproapps/google-calendar.svg?style=for-the-badge
[issues-url]: https://github.com/deskproapps/google-calendar/issues
[release-shield]: https://img.shields.io/github/v/release/deskproapps/google-calendar?style=for-the-badge
[release-url]: https://github.com/deskproapps/google-calendar/releases
[license-shield]: https://img.shields.io/github/license/deskproapps/google-calendar.svg?style=for-the-badge
[license-url]: https://github.com/deskproapps/google-calendar/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/deskpro
[product-screenshot]: images/screenshot.png