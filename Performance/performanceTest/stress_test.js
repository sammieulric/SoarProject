import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 50 },  // Ramp up to 50 users over 1 minute
    { duration: '2m', target: 100 }, // Stay at 100 users for 2 minutes
    { duration: '1m', target: 0 },   // Ramp down to 0 users over 1 minute
  ],
};

export default function () {
  let res = http.get('https://parabank.parasoft.com/parabank/login');
  check(res, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}