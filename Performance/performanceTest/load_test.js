import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100,  // Number of virtual users
  duration: '30s',  // Test duration
};

export default function () {
  let res = http.get('https://parabank.parasoft.com/parabank/login');
  check(res, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}