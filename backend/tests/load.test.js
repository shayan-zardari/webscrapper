// import http from 'k6/http';
// import { sleep, check } from 'k6';

// export const options = {
//   vus: 10, // Start with 10 virtual users to avoid overwhelming the server
//   duration: '30s', // Run test for 30 seconds
//   thresholds: {
//     http_req_failed: ['rate<0.01'], // Error rate should be less than 1%
//     http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
//   },
// };

// export default function () {
//   const url = 'http://localhost:3000/auth/register'; // Correct endpoint
//   const uniqueId = Date.now() + Math.random().toString(36).substring(2); // Unique identifier
//   const payload = JSON.stringify({
//     name: `User${uniqueId}`, // Unique name
//     email: `user${uniqueId}@example.com`, // Unique email
//     password: 'Password123!', // Strong password (adjust if schema requires)
//   });

//   const params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const res = http.post(url, payload, params);

//   // Check response
//   check(res, {
//     'status is 200': (r) => r.status === 200,
//     'user created': (r) => r.json('message') === 'User created',
//   });

//   // Log response for debugging
//   if (res.status !== 200) {
//     console.log(`Failed request: Status=${res.status}, Body=${res.body}`);
//   }

//   sleep(1); // Wait 1 second between requests per user
// }




import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 1, // Single virtual user for sequential execution
  iterations: 500, // Exactly 500 requests total
  thresholds: {
    http_req_failed: ['rate<0.01'], // Error rate should be less than 1%
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
  },
};

export default function () {
  const url = 'http://localhost:3000/auth/register';
  
  // Create unique identifier for each user
  const uniqueId = Date.now() + Math.random().toString(36).substring(2);
  
  const payload = JSON.stringify({
    name: `User${uniqueId}`,
    email: `user${uniqueId}@example.com`,
    password: 'Password123!',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(`Creating user ${__ITER + 1}/500: user${uniqueId}@example.com`);
  
  const res = http.post(url, payload, params);

  // Check response
  const checksResult = check(res, {
    'status is 200': (r) => r.status === 200,
    'user created': (r) => r.json('message') === 'User created',
  });

  // Enhanced logging
  if (checksResult) {
    console.log(`✓ User ${__ITER + 1} created successfully`);
  } else {
    console.log(`✗ Failed to create user ${__ITER + 1}: Status=${res.status}, Body=${res.body}`);
  }

  // Small delay between requests to be gentle on the server
  sleep(0.1); // 100ms delay between each registration
}