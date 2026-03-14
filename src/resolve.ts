import https from 'https';

const urls = [
  'https://dl.flipkart.com/dl/admonition-plastic-grocery-container-1200-ml/p/itm1efa17b53baee?pid=CNTHAYYF2JKXCBRJ',
  'https://dl.flipkart.com/s/VRJQe!uuuN',
  'https://dl.flipkart.com/s/VRKXg2uuuN',
  'https://dl.flipkart.com/s/VQRPjeuuuN',
  'https://dl.flipkart.com/s/0h6_LWNNNN',
  'https://dl.flipkart.com/s/0hEBg_NNNN'
];

function resolveUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(res.headers.location);
      } else {
        resolve(url + ' (Status: ' + res.statusCode + ')');
      }
    }).on('error', (e) => {
      resolve(url + ' (Error: ' + e.message + ')');
    });
  });
}

async function main() {
  for (const url of urls) {
    const resolved = await resolveUrl(url);
    console.log(url, '->', resolved);
  }
}

main();
