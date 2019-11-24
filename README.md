# Applitools Hackathon Entry - Paul Farrell (paul.farrell@gear4music.com)
## Note:
- This entry/repo is using WebdriverIO v5
- I have included a wide array of 'traditional' tests
- I also have 2 sets of visual regression tests too:
    - One is using the Official Eyes SDK that Applitools support
    - The other is using the Applitools WDIO Service made by the WebdriverIO community, THIS IS NOT OFFICIALLY SUPPORTED BY APPLITOLS.
        - My reason for showing both tools was to demonstrate how they differ.
        - The official SDK, gives you ALOT more options and freedom than the WDIO Service. But if you're writing your WDIO tests in the "sync" way, like the vast majority of us do, then you'll run into problems due to the "asynchronous" nature of the SDK. Hence Why I've had to duplicate some of my Page Objects and Utilies to make them "async friendly"
        - Using the Applitools WDIO Service allowed me to keep the "synchronous" nature of my tests and I could continue to use my Page Objects and Utilties that my "Traditional" tests were also using. But Like I said, this service is pretty limited in comparison to the Official SDK.

## Traditional vs Visual:
- I've see this topic come up a lot in the last couple years and I don't feel like it's a "this vs that".
- Visual Regression tests can/should supplement your "Traditional" tests.
- As demonstrated in my entry, I had no idea how to test the animated Bar Chart using the "Traditional" method.
- But this was simple using the "Visual" method.
- The Visual method can offer more simplistic tests too - look at the differences between my "Traditional" and "Visual" methods when testing if the Transaction Amounts were sorted correctly. 2 very different approaches.

## Prerequisites:

- NodeJS.
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

- To run the tests using the Applitools WDIO Service (Not Supported by Applitools!):

```
npm run test:applitools-wdio-service:v1
```

- And again, to run these against v2:

```
npm run test:applitools-wdio-service:v2
```

- To run the tests using the Official Applitools WDIOv5 SDK:

```
npm run test:visual:v1
```
- And again, to these these against v2:

```
npm run test:visual:v2
```
