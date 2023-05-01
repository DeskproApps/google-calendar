import { getMapFilteredEventsByDay } from "../getMapFilteredEventsByDay";
import mockEvents from "../../../testing/mocks/mockEvents.json";

describe("getMapFilteredEventsByDay", () => {
  test("should return empty map", () => {
    expect(getMapFilteredEventsByDay([])).toEqual({});
    expect(getMapFilteredEventsByDay()).toEqual({});
  });

  test("should return map filtered events by day", () => {
    expect(getMapFilteredEventsByDay(mockEvents)).toEqual({
      "2021-02-15T00:00:00.000Z": [
        {
          "id": "64ojge1jc8r6cbb6c5hjab9k6pj3gb9oc4smab9i6ph66p9ockqm8ohm70",
          "summary": "English",
          "htmlLink": "https://www.google.com/calendar/event?eid=NjRvamdlMWpjOHI2Y2JiNmM1aGphYjlrNnBqM2diOW9jNHNtYWI5aTZwaDY2cDlvY2txbThvaG03MF8yMDIxMDIxNVQwNzAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-15T09:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-15T10:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
        {
          "id": "74r32cpiccom8bb5cgsj8b9kc4sj8bb16ssm8b9jcor64e32c5ijieb66k",
          "summary": "Work",
          "htmlLink": "https://www.google.com/calendar/event?eid=NzRyMzJjcGljY29tOGJiNWNnc2o4YjlrYzRzajhiYjE2c3NtOGI5amNvcjY0ZTMyYzVpamllYjY2a18yMDIxMDIxNVQwODAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-15T10:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-15T19:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
        {
          "id": "75i3gphh61ijcb9n6kp64b9k70pjgb9o68p32bb26goj0d9jc9i3adj4c4",
          "summary": "Prelb.",
          "htmlLink": "https://www.google.com/calendar/event?eid=NzVpM2dwaGg2MWlqY2I5bjZrcDY0YjlrNzBwamdiOW82OHAzMmJiMjZnb2owZDlqYzlpM2FkajRjNF8yMDIxMDIxNVQxODAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-15T20:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-15T22:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
      ],
      "2021-02-16T00:00:00.000Z": [
        {
          "id": "60rmacpjcos32b9l6oq3ab9k6go64b9oc5j6cbb56oom4pj4c8pm6o9occ",
          "summary": "Way to work",
          "htmlLink": "https://www.google.com/calendar/event?eid=NjBybWFjcGpjb3MzMmI5bDZvcTNhYjlrNmdvNjRiOW9jNWo2Y2JiNTZvb200cGo0YzhwbTZvOW9jY18yMDIxMDIxNlQwNjAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-16T08:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-16T09:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
        {
          "id": "c8pj4c9ncop3gbb66ksjcb9k74o3ib9ocpgjab9l6pgj2chkcos38dpo70",
          "summary": "Work",
          "htmlLink": "https://www.google.com/calendar/event?eid=YzhwajRjOW5jb3AzZ2JiNjZrc2pjYjlrNzRvM2liOW9jcGdqYWI5bDZwZ2oyY2hrY29zMzhkcG83MF8yMDIxMDIxNlQwNzAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-16T09:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-16T19:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
        {
          "id": "coqjidpncpi32bb560qjcb9k71j38bb2clj3eb9j6ko64c3170r3epb56k",
          "summary": "Психотерапевт",
          "htmlLink": "https://www.google.com/calendar/event?eid=Y29xamlkcG5jcGkzMmJiNTYwcWpjYjlrNzFqMzhiYjJjbGozZWI5ajZrbzY0YzMxNzByM2VwYjU2a18yMDIxMDIxNlQxNzAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-16T19:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-16T20:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
        {
          "id": "61j6adhic8q68b9mc8rj6b9kc4s3abb26so6cb9j74ojeoj66or3ee1l6c",
          "summary": "Way home",
          "htmlLink": "https://www.google.com/calendar/event?eid=NjFqNmFkaGljOHE2OGI5bWM4cmo2YjlrYzRzM2FiYjI2c282Y2I5ajc0b2plb2o2Nm9yM2VlMWw2Y18yMDIxMDIxNlQxODAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-16T20:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-16T21:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
        {
          "id": "cdj66o9p6ssm4b9o69ijab9k71ij4bb26tgjibb5chj68p9k6sqm2chh68",
          "summary": "English. Homework.",
          "htmlLink": "https://www.google.com/calendar/event?eid=Y2RqNjZvOXA2c3NtNGI5bzY5aWphYjlrNzFpajRiYjI2dGdqaWJiNWNoajY4cDlrNnNxbTJjaGg2OF8yMDIxMDIxNlQxOTAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-16T21:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-16T22:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
      ],
      "2021-02-17T00:00:00.000Z": [
        {
          "id": "69ijaeb274sj8bb3ckq38b9kcpgjgb9pcco64b9pcgom4e9l70sj8p3268",
          "summary": "Prelb.",
          "htmlLink": "https://www.google.com/calendar/event?eid=NjlpamFlYjI3NHNqOGJiM2NrcTM4YjlrY3BnamdiOXBjY282NGI5cGNnb200ZTlsNzBzajhwMzI2OF8yMDIxMDIxN1QxODAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-17T20:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-17T22:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
      ],
      "2021-02-18T00:00:00.000Z": [
        {
          "id": "61hj2e9lc8s3ibb275hmcb9k61hj8bb1c5h38b9j6ormcdpgcph3ec9p60",
          "summary": "Way home",
          "htmlLink": "https://www.google.com/calendar/event?eid=NjFoajJlOWxjOHMzaWJiMjc1aG1jYjlrNjFoajhiYjFjNWgzOGI5ajZvcm1jZHBnY3BoM2VjOXA2MF8yMDIxMDIxOFQxNzAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-18T19:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-18T20:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
      ],
      "2021-02-19T00:00:00.000Z": [
        {
          "id": "6dhj2chl60rjab9p6lijab9kckom2bb171ij6b9p71h36e9lc4p66c1o74",
          "summary": "Work",
          "htmlLink": "https://www.google.com/calendar/event?eid=NmRoajJjaGw2MHJqYWI5cDZsaWphYjlrY2tvbTJiYjE3MWlqNmI5cDcxaDM2ZTlsYzRwNjZjMW83NF8yMDIxMDIxOVQwODAwMDBaIHVzaTlxNGdjMGVsbjJ2NzM5MnRxYjhrNGs0QGc",
          "start": {
            "dateTime": "2021-02-19T10:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2021-02-19T19:00:00+02:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com",
          "calendarSummary": "Activities"
        },
      ],
      "2022-06-14T00:00:00.000Z": [
        {
          "id": "r0ele0f46g2nrunloc9rr4d2o1",
          "summary": "Ilia",
          "htmlLink": "https://www.google.com/calendar/event?eid=cjBlbGUwZjQ2ZzJucnVubG9jOXJyNGQybzFfMjAyMjA2MTRUMTUwMDAwWiB4enBhd254QG0",
          "start": {
            "dateTime": "2022-06-14T18:00:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2022-06-14T19:00:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "xzpawnx@gmail.com",
          "calendarSummary": "xzpawnx@gmail.com"
        },
      ],
      "2022-07-21T00:00:00.000Z": [
        {
          "id": "e25rp6d5o69eibk2m4kev49l85",
          "summary": "Ilia",
          "htmlLink": "https://www.google.com/calendar/event?eid=ZTI1cnA2ZDVvNjllaWJrMm00a2V2NDlsODVfMjAyMjA3MjFUMTUwMDAwWiB4enBhd254QG0",
          "start": {
            "dateTime": "2022-07-21T18:00:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2022-07-21T19:00:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "xzpawnx@gmail.com",
          "calendarSummary": "xzpawnx@gmail.com"
        },
      ],
      "2023-04-05T00:00:00.000Z": [
        {
          "id": "tb34kdqm2cr96rvk2blhprpgks",
          "summary": "All-Hands Engineering Stand Up",
          "htmlLink": "https://www.google.com/calendar/event?eid=dGIzNGtkcW0yY3I5NnJ2azJibGhwcnBna3NfMjAyMzA0MDVUMDgzMDAwWiB4enBhd254QG0",
          "start": {
            "dateTime": "2023-04-05T11:30:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2023-04-05T12:00:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "xzpawnx@gmail.com",
          "calendarSummary": "xzpawnx@gmail.com"
        },
      ],
      "2023-04-19T00:00:00.000Z": [
        {
          "id": "tb34kdqm2cr96rvk2blhprpgks_R20230419T083000",
          "summary": "All-Hands Engineering Stand Up",
          "htmlLink": "https://www.google.com/calendar/event?eid=dGIzNGtkcW0yY3I5NnJ2azJibGhwcnBna3NfMjAyMzA0MTlUMDgzMDAwWiB4enBhd254QG0",
          "start": {
            "dateTime": "2023-04-19T11:30:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2023-04-19T12:00:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "xzpawnx@gmail.com",
          "calendarSummary": "xzpawnx@gmail.com"
        },
      ],
      "2023-04-24T00:00:00.000Z": [
        {
          "id": "u12nn6nrp1jsnm3scr9u6b8j8t",
          "summary": "Apps Stand Up",
          "htmlLink": "https://www.google.com/calendar/event?eid=dTEybm42bnJwMWpzbm0zc2NyOXU2YjhqOHRfMjAyMzA0MjRUMDg0MDAwWiB4enBhd254QG0",
          "start": {
            "dateTime": "2023-04-24T11:40:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2023-04-24T11:50:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "xzpawnx@gmail.com",
          "calendarSummary": "xzpawnx@gmail.com"
        },
      ],
      "2023-05-01T00:00:00.000Z": [
        {
          "id": "cpgmcp33ccr3cb9o68o3eb9kckp3abb2chi36b9hclgmaeb5cdh68c316c",
          "summary": "Driving. Practice.",
          "htmlLink": "https://www.google.com/calendar/event?eid=Y3BnbWNwMzNjY3IzY2I5bzY4bzNlYjlrY2twM2FiYjJjaGkzNmI5aGNsZ21hZWI1Y2RoNjhjMzE2YyB4enBhd254QG0",
          "start": {
            "dateTime": "2023-05-01T15:30:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2023-05-01T17:00:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "xzpawnx@gmail.com",
          "calendarSummary": "xzpawnx@gmail.com"
        },
      ],
      "2023-05-03T00:00:00.000Z": [
        {
          "id": "c4s62c9j6or3gbb2cgrj2b9kchi30bb2chj30b9kc8q36dr360p64d1i74",
          "summary": "Driving. Practice.",
          "htmlLink": "https://www.google.com/calendar/event?eid=YzRzNjJjOWo2b3IzZ2JiMmNncmoyYjlrY2hpMzBiYjJjaGozMGI5a2M4cTM2ZHIzNjBwNjRkMWk3NCB4enBhd254QG0",
          "start": {
            "dateTime": "2023-05-03T16:15:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2023-05-03T17:45:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "xzpawnx@gmail.com",
          "calendarSummary": "xzpawnx@gmail.com"
        },
      ],
      "2023-05-06T00:00:00.000Z": [
        {
          "id": "cgs64pj3cgp3eb9lchgj4b9kclhjgb9pc4r6cb9j6hi6ad1o6phm4c9n6k",
          "summary": "Driving. Practice.",
          "htmlLink": "https://www.google.com/calendar/event?eid=Y2dzNjRwajNjZ3AzZWI5bGNoZ2o0YjlrY2xoamdiOXBjNHI2Y2I5ajZoaTZhZDFvNnBobTRjOW42ayB4enBhd254QG0",
          "start": {
            "dateTime": "2023-05-06T14:00:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "end": {
            "dateTime": "2023-05-06T17:00:00+03:00",
            "timeZone": "Europe/Kiev"
          },
          "calendarId": "xzpawnx@gmail.com",
          "calendarSummary": "xzpawnx@gmail.com"
        },
      ],
    });
  });
});
