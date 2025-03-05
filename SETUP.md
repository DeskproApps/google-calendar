Google Calendar App Setup Instructions
===

To install the Google Calendar app, you'll need Google OAuth credentials. Follow these steps to set it up.

## Create or Select a Google Cloud Project

Start by visiting the [Google Cloud Console](https://console.cloud.google.com/) and signing in. Once logged in, either select an existing project or create a new one by clicking the project dropdown and choosing “New Project.” Give your project a name, select an organization if necessary, and click “Create.” After your project is created, select it from the dropdown at the top.

![Google cloud console select a resource modal"](/docs/setup/google-calendar-app-setup-sceenshot-01.png)

![Google cloud console new project page"](/docs/setup/google-calendar-app-setup-sceenshot-02.png)

## Enable Google Calendar API

Next, enable the Google Calendar API. In the Google Cloud Console, navigate to `"APIs & Services" > "Library"` Use the search bar to find "Google Calendar API" and click on it. On the API page, click the "Enable" button. This allows your app to request access to Google Calendar data.

![Google cloud console API library search results showing "Google Calendar API"](/docs/setup/google-calendar-app-setup-sceenshot-03.png)

## Configure OAuth Consent Screen

Once the API is enabled, configure the OAuth Consent Screen by navigating to `"APIs & Services" > "OAuth consent screen"` Choose "External" if your app will be used by people outside your organization, or "Internal" if it’s only for your organization. Fill in the required details such as the App Name (e.g., "Deskpro Google Calendar App"), User Support Email, and optionally, an App Logo. When finished, click "Create" to proceed.

![OAuth Consent Screen Configuration Form"](/docs/setup/google-calendar-app-setup-sceenshot-04.png)

## Create OAuth 2.0 Credentials

Now, it's time to create OAuth 2.0 credentials. Go to `"APIs & Services" > "Credentials"`, then click "Create Credentials" and select "OAuth Client ID." When prompted, choose "Web Application" as the application type. Give it a name, such as "Deskpro App," and add the Authorized Redirect URIs. You can find this URI in the Settings tab of the Google Calendar App installation page in Deskpro. After entering the necessary details, click "Create."

!["Create OAuth client ID Form"](/docs/setup/google-calendar-app-setup-sceenshot-05.png)

## Retrieve Client ID & Secret

Once the credentials are created, a popup will display your `Client ID` and `Client Secret`. Copy these values and head back to Deskpro, where you'll enter them into the app settings form.

!["Create OAuth client ID Form"](/docs/setup/google-calendar-app-setup-sceenshot-06.png)

## Configure Permissions & Install the App

Finally, configure who can access the Google Calendar app by going to the "Permissions" tab. Select the users and/or groups that should have access. Once you’re satisfied with the settings, click "Install" to complete the setup.