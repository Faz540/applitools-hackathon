# Applitools Hackathon Entry - Paul Farrell
## Note:
- This entry/repo using using WebdriverIO v5
## Prerequisites:

- Node.
- The Google Chrome Browser.
- Your own Applitools API Key.

## Installation:

- Simply clone the repo.
- CD into it.
- Run the below command in your terminal:

```
npm install
```

## Before Running The Tests:
- Create a ".env" file at the root of the project.
- Inside this file add the below property:


```
APPLITOOLS_KEY=YOUR_OWN_APPLITOOLS_KEY_GOES_HERE
```

- Replace "YOUR_OWN_APPLITOOLS_KEY_GOES_HERE" with your own Applitools API Key

## Running The Tests:
- To run the "Traditional" tests against the v1 environment, run the below command:

```
npm run test:traditional:v1
```

- To run the same tests against v2:

```
npm run test:traditional:v2
```

- To run the tests using the WebdriverIO Applitools Service (Not Supported by Applitools!):

```
npm run test:visual:v1
```

- And again, to run these against v2:

```
npm run test:visual:v2
```

- To run the tests using the Official Applitools WDIOv5 SDK (WORK IN PROGRESS):

```
npm run test:sdk
```
