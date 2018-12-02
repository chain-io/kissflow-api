# KiSSFLOW API

API Wrapper for [KiSSFLOW](https://help.kissflow.com/tips-and-tricks/api-documentation/rest-api-points)

** NOTE THAT THIS IS NOT FEATUE COMPLETE ** Pull requests welcome.

# Usage

## Getting Started

All requests expect an authentication object as the first parameter.

It must have `apiKey` and `accountId` and may optionally have `email_id` to submit the request as a specific user.

```javascript
const kissflow = require('@chainio/kissflow-api')

const auth = {
  apiKey: 'abc123',
  accountId: 'acct123'
  email: 'joe@sample.com'
}

kissflow.verify(auth)
.then((result) => {
  consoole.log(result) // true
})

```

This library is a thin wrapper over [request-promise-native](https://github.com/request/request-promise-native)
so error behaviors derive from that library's conventions.

## Methods

### Verify

Verify that KiSSFLOW is responding to requests properly.

Returns `true` if API responds with message below or false for any other response.


```json
{
  success: "All O.K."
}
```

**Example**

```javascript
kissflow.verify(auth)
.then((result) => {
  consoole.log(result) // true
})
```

### Processes

List active processes running in your account.

```javascript
kissflow.processes(auth)
.then((result) => {
  consoole.log(result)
})

// results
[
    {
        Id: "Travel_Claim"
        Name: "Travel Claim"
        Description: "To claim travel expenses"
    },
    {
        Id: "Quotation"
        Name: "Quotation"
        Description: "Online Quotation"
    },
    {
        Id: "Invoice"
        Name: "Invoice"
        Description: "Create and manage Invoice"
    }
]
```

### Requests

#### List

List requests for a single process.

* `processName` is required.
* `pageNumber` defaults to `1`
* `pageSize` defaults to `50`
* `processStep` is optional

```javascript
const opts = {
  processName: 'Travel Claim',
  processStep: 'Manager Approval',
  pageSize: 50,
  pageNumber: 1
}
kissflow.requests(auth, opts)
.then((result) => {
  console.log(result)
})

// results
[
  {
    "PlaceVisited": "Singapore",
    "Amout": 14000,
    "Id": "Sh2a6b8c51_84e7_11e3_bdd0_ddc2c98b0428",
    "Subject": "Request for Singapore"
  },
  {
    "PlaceVisited": "Malaysia",
    "Amout": 12000,
    "Id": "Sh2a6b8c51_84e7_11e3_bdd0_ddc2c98b0429",
    "Subject": "Request for Malaysia"
  }
]
```

### Create

Creates a request (and optionally submits it)

* `processName` is required
* `data` is an object with key values for all fields to be completed
* `submit` - optional: if *truthy* then request will be submitted
*

```javascript
const opts = {
  processName: 'Travel Claim',
  data: {
    PlaceVisited: 'Berlin',
    Amout: 2200
  },
  submit: true
}

kissflow.createRequest(auth, opts)
.then((result) => {
  console.log(result)
})

// result
{
    Id: "TravelClaim001",
    Subject: "Request for Berlin"
}
```

## Running Tests

`yarn test` or `yarn test --watchAll`

Tests use Jest.