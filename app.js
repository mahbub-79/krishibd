const bn = new Intl.NumberFormat('bn-BD');
const money = new Intl.NumberFormat('bn-BD', { maximumFractionDigits: 0 });

const divisions = {
  'ঢাকা': ['ঢাকা', 'গাজীপুর', 'মানিকগঞ্জ', 'মুন্সিগঞ্জ', 'নারায়ণগঞ্জ', 'নরসিংদী', 'ফরিদপুর', 'গোপালগঞ্জ', 'মাদারীপুর', 'রাজবাড়ী', 'শরীয়তপুর', 'কিশোরগঞ্জ', 'টাঙ্গাইল'],
  'চট্টগ্রাম': ['চট্টগ্রাম', 'কক্সবাজার', 'কুমিল্লা', 'ফেনী', 'ব্রাহ্মণবাড়িয়া', 'চাঁদপুর', 'নোয়াখালী', 'লক্ষ্মীপুর', 'রাঙামাটি', 'খাগড়াছড়ি', 'বান্দরবান'],
  'রাজশাহী': ['রাজশাহী', 'বগুড়া', 'পাবনা', 'সিরাজগঞ্জ', 'নাটোর', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ', 'জয়পুরহাট'],
  'খুলনা': ['খুলনা', 'যশোর', 'সাতক্ষীরা', 'বাগেরহাট', 'ঝিনাইদহ', 'কুষ্টিয়া', 'মাগুরা', 'মেহেরপুর', 'নড়াইল', 'চুয়াডাঙ্গা'],
  'বরিশাল': ['বরিশাল', 'ভোলা', 'পটুয়াখালী', 'পিরোজপুর', 'বরগুনা', 'ঝালকাঠি'],
  'সিলেট': ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'],
  'রংপুর': ['রংপুর', 'দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম', 'লালমনিরহাট', 'নীলফামারী', 'পঞ্চগড়', 'ঠাকুরগাঁও'],
  'ময়মনসিংহ': ['ময়মনসিংহ', 'জামালপুর', 'নেত্রকোনা', 'শেরপুর']
};

const cropInfo = {
  'ধান': { emoji: '🌾', tone: 'linear-gradient(135deg,#cce6aa,#f8d66d)' },
  'আলু': { emoji: '🥔', tone: 'linear-gradient(135deg,#ebd6ad,#caa66a)' },
  'টমেটো': { emoji: '🍅', tone: 'linear-gradient(135deg,#ffd0c7,#f3826f)' },
  'পেঁয়াজ': { emoji: '🧅', tone: 'linear-gradient(135deg,#f4d6ee,#c48db9)' },
  'আম': { emoji: '🥭', tone: 'linear-gradient(135deg,#dff0a9,#f4c451)' },
  'সরিষা': { emoji: '🌼', tone: 'linear-gradient(135deg,#fff1a8,#d7e8a6)' },
  'ভুট্টা': { emoji: '🌽', tone: 'linear-gradient(135deg,#f6e279,#9fd28c)' },
  'মরিচ': { emoji: '🌶️', tone: 'linear-gradient(135deg,#ffd1c7,#cce5b9)' },
  'বেগুন': { emoji: '🍆', tone: 'linear-gradient(135deg,#e2cef3,#b58ccf)' },
  'কলা': { emoji: '🍌', tone: 'linear-gradient(135deg,#fff2a8,#d7e68d)' }
};

const defaultFarmers = [
  { id: 1, name: 'আব্দুল করিম', phone: '01711000001', division: 'রাজশাহী', district: 'বগুড়া', address: 'শেরপুর, বগুড়া', crops: ['আলু', 'ধান'], verified: true },
  { id: 2, name: 'রহিমা বেগম', phone: '01711000002', division: 'রংপুর', district: 'দিনাজপুর', address: 'বীরগঞ্জ, দিনাজপুর', crops: ['ভুট্টা', 'ধান'], verified: true },
  { id: 3, name: 'মো. সালাম', phone: '01711000003', division: 'রাজশাহী', district: 'চাঁপাইনবাবগঞ্জ', address: 'শিবগঞ্জ, চাঁপাইনবাবগঞ্জ', crops: ['আম'], verified: true },
  { id: 4, name: 'শারমিন আক্তার', phone: '01711000004', division: 'খুলনা', district: 'যশোর', address: 'চৌগাছা, যশোর', crops: ['টমেটো', 'বেগুন'], verified: true },
  { id: 5, name: 'সাইফুল ইসলাম', phone: '01711000005', division: 'ঢাকা', district: 'মুন্সিগঞ্জ', address: 'শ্রীনগর, মুন্সিগঞ্জ', crops: ['আলু', 'পেঁয়াজ'], verified: true },
  { id: 6, name: 'আনোয়ার হোসেন', phone: '01711000006', division: 'ময়মনসিংহ', district: 'জামালপুর', address: 'সরিষাবাড়ী, জামালপুর', crops: ['সরিষা', 'ধান'], verified: true }
];

const defaultPosts = [
  { id: 101, farmerId: 1, farmerName: 'আব্দুল করিম', phone: '01711000001', crop: 'আলু', variety: 'ডায়মন্ড', quantity: 80, unit: 'মণ', price: 1250, division: 'রাজশাহী', district: 'বগুড়া', details: 'আজ সকালে তোলা ভালো মানের আলু। বড় অর্ডার হলে দাম আলোচনা করা যাবে।', createdAt: Date.now() - 1000 * 60 * 24, image: '' },
  { id: 102, farmerId: 2, farmerName: 'রহিমা বেগম', phone: '01711000002', crop: 'ভুট্টা', variety: 'হাইব্রিড', quantity: 3, unit: 'টন', price: 32, division: 'রংপুর', district: 'দিনাজপুর', details: 'শুকনা ও পরিষ্কার ভুট্টা। খামারের কাছে গাড়ি আসতে পারবে।', createdAt: Date.now() - 1000 * 60 * 90, image: '' },
  { id: 103, farmerId: 3, farmerName: 'মো. সালাম', phone: '01711000003', crop: 'আম', variety: 'হিমসাগর', quantity: 1200, unit: 'কেজি', price: 95, division: 'রাজশাহী', district: 'চাঁপাইনবাবগঞ্জ', details: 'গাছপাকা হিমসাগর আম। কোনো কেমিক্যাল ব্যবহার করা হয়নি।', createdAt: Date.now() - 1000 * 60 * 180, image: '' },
  { id: 104, farmerId: 4, farmerName: 'শারমিন আক্তার', phone: '01711000004', crop: 'টমেটো', variety: 'বাহার', quantity: 700, unit: 'কেজি', price: 38, division: 'খুলনা', district: 'যশোর', details: 'টাটকা লাল টমেটো। বাজার বা আড়তে পৌঁছে দেওয়ার ব্যবস্থা আছে।', createdAt: Date.now() - 1000 * 60 * 310, image: '' },
  { id: 105, farmerId: 5, farmerName: 'সাইফুল ইসলাম', phone: '01711000005', crop: 'পেঁয়াজ', variety: 'দেশি', quantity: 45, unit: 'মণ', price: 2450, division: 'ঢাকা', district: 'মুন্সিগঞ্জ', details: 'শুকনো দেশি পেঁয়াজ। মজুত করার জন্য ভালো।', createdAt: Date.now() - 1000 * 60 * 520, image: '' },
  { id: 106, farmerId: 6, farmerName: 'আনোয়ার হোসেন', phone: '01711000006', crop: 'সরিষা', variety: 'বারি-১৪', quantity: 22, unit: 'মণ', price: 2850, division: 'ময়মনসিংহ', district: 'জামালপুর', details: 'পরিষ্কার ও শুকনা সরিষা। তেলের মিলের জন্য উপযোগী।', createdAt: Date.now() - 1000 * 60 * 780, image: '' },
  { id: 107, farmerId: 1, farmerName: 'আব্দুল করিম', phone: '01711000001', crop: 'ধান', variety: 'কাটারিভোগ', quantity: 65, unit: 'মণ', price: 1450, division: 'রাজশাহী', district: 'বগুড়া', details: 'সুগন্ধি কাটারিভোগ ধান। আর্দ্রতা কম, মান ভালো।', createdAt: Date.now() - 1000 * 60 * 1000, image: '' },
  { id: 108, farmerId: 2, farmerName: 'রহিমা বেগম', phone: '01711000002', crop: 'ধান', variety: 'ব্রি-২৮', quantity: 90, unit: 'মণ', price: 1320, division: 'রংপুর', district: 'দিনাজপুর', details: 'নতুন মৌসুমের ধান। সরাসরি গোলা থেকে নিতে পারবেন।', createdAt: Date.now() - 1000 * 60 * 1400, image: '' },
  { id: 109, farmerId: 4, farmerName: 'শারমিন আক্তার', phone: '01711000004', crop: 'বেগুন', variety: 'লম্বা', quantity: 450, unit: 'কেজি', price: 42, division: 'খুলনা', district: 'যশোর', details: 'পোকামুক্ত লম্বা বেগুন। প্রতিদিন তাজা ফসল তোলা হয়।', createdAt: Date.now() - 1000 * 60 * 1900, image: '' }
];

const mapCoordinates = {
  'রংপুর': [170, 86], 'রাজশাহী': [135, 205], 'ময়মনসিংহ': [248, 155], 'ঢাকা': [235, 252],
  'সিলেট': [330, 190], 'খুলনা': [150, 350], 'বরিশাল': [225, 380], 'চট্টগ্রাম': [310, 355]
};

let farmers = loadData('krishibd_farmers', defaultFarmers);
let posts = loadData('krishibd_posts', defaultPosts);
let activeMapDivision = '';

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function saveData() {
  localStorage.setItem('krishibd_farmers', JSON.stringify(farmers));
  localStorage.setItem('krishibd_posts', JSON.stringify(posts));
}

function get(id) { return document.getElementById(id); }

function showToast(message) {
  const toast = get('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function populateSelect(select, items, placeholder) {
  select.innerHTML = `<option value="">${placeholder}</option>` + items.map(item => `<option value="${item}">${item}</option>`).join('');
}

function updateDistrictSelect(divisionSelect, districtSelect, placeholder = 'সব জেলা') {
  const division = divisionSelect.value;
  const districts = division ? divisions[division] : Object.values(divisions).flat();
  populateSelect(districtSelect, districts, placeholder);
}

function initializeSelects() {
  const cropNames = Object.keys(cropInfo);
  ['heroCrop', 'cropFilter', 'mapCropSelect'].forEach(id => populateSelect(get(id), cropNames, 'সব ফসল'));
  populateSelect(get('postCrop'), cropNames, 'ফসল বাছুন');

  ['heroDivision', 'divisionFilter'].forEach(id => populateSelect(get(id), Object.keys(divisions), 'সব বিভাগ'));
  ['farmerDivision', 'postDivision'].forEach(id => populateSelect(get(id), Object.keys(divisions), 'বিভাগ বাছুন'));

  populateSelect(get('heroDistrict'), Object.values(divisions).flat(), 'সব জেলা');
  populateSelect(get('districtFilter'), Object.values(divisions).flat(), 'সব জেলা');
}

function formatTime(timestamp) {
  const diff = Date.now() - timestamp;
  const hour = 1000 * 60 * 60;
  const day = hour * 24;
  if (diff < hour) return `${bn.format(Math.max(1, Math.floor(diff / (1000 * 60))))} মিনিট আগে`;
  if (diff < day) return `${bn.format(Math.floor(diff / hour))} ঘণ্টা আগে`;
  return `${bn.format(Math.floor(diff / day))} দিন আগে`;
}

function isFresh(timestamp) { return Date.now() - timestamp < 1000 * 60 * 60 * 24; }

function postCard(post) {
  const info = cropInfo[post.crop] || { emoji: '🌱', tone: 'linear-gradient(135deg,#dff0e2,#f4e8b3)' };
  const unitText = post.unit === 'কেজি' || post.unit === 'পিস' ? `প্রতি ${post.unit}` : `প্রতি ${post.unit}`;
  const imageContent = post.image
    ? `<img src="${post.image}" alt="${post.crop} ফসলের ছবি" />`
    : `<div class="crop-emoji" aria-hidden="true">${info.emoji}</div>`;

  return `
    <article class="crop-card">
      <div class="crop-image" style="background:${info.tone}">
        ${imageContent}
        <span class="crop-badge">📍 ${post.district}</span>
        ${isFresh(post.createdAt) ? '<span class="fresh-badge">নতুন</span>' : ''}
      </div>
      <div class="crop-body">
        <div class="crop-title-row">
          <h3>${post.crop}</h3>
          <span class="price">৳${money.format(post.price)}</span>
        </div>
        <p class="crop-variety">${post.variety} · ${unitText}</p>
        <div class="crop-meta">
          <span>⚖️ ${bn.format(post.quantity)} ${post.unit}</span>
          <span>🕐 ${formatTime(post.createdAt)}</span>
        </div>
        <p class="crop-description">${post.details}</p>
        <div class="farmer-mini">
          <span class="avatar" aria-hidden="true">👨‍🌾</span>
          <div><strong>${post.farmerName}</strong><small>${post.division} বিভাগ</small></div>
        </div>
        <div class="card-actions">
          <button class="button button-primary contact-button" data-post-id="${post.id}" type="button">📞 কৃষকের সাথে কথা বলুন</button>
          <button class="button share-button" data-share-id="${post.id}" type="button" aria-label="ফসলের খবর শেয়ার করুন">↗</button>
        </div>
      </div>
    </article>`;
}

function currentFilters() {
  return {
    keyword: get('keywordSearch').value.trim().toLowerCase(),
    crop: get('cropFilter').value,
    division: get('divisionFilter').value,
    district: get('districtFilter').value,
    price: get('priceFilter').value,
    sort: get('sortPosts').value
  };
}

function filterPosts() {
  const f = currentFilters();
  let result = posts.filter(post => {
    const text = `${post.crop} ${post.variety} ${post.district} ${post.division} ${post.farmerName}`.toLowerCase();
    const keywordMatch = !f.keyword || text.includes(f.keyword);
    const cropMatch = !f.crop || post.crop === f.crop;
    const divisionMatch = !f.division || post.division === f.division;
    const districtMatch = !f.district || post.district === f.district;
    const priceMatch = !f.price || (f.price === 'low' && post.price <= 50) || (f.price === 'medium' && post.price > 50 && post.price <= 100) || (f.price === 'high' && post.price > 100);
    return keywordMatch && cropMatch && divisionMatch && districtMatch && priceMatch;
  });

  const sorters = {
    newest: (a, b) => b.createdAt - a.createdAt,
    priceLow: (a, b) => a.price - b.price,
    priceHigh: (a, b) => b.price - a.price,
    quantityHigh: (a, b) => b.quantity - a.quantity
  };
  result.sort(sorters[f.sort]);
  return result;
}

function renderPosts() {
  const result = filterPosts();
  get('cropGrid').innerHTML = result.map(postCard).join('');
  get('resultCount').textContent = `${bn.format(result.length)}টি ফসল পাওয়া গেছে`;
  get('emptyState').classList.toggle('hidden', result.length !== 0);
}

function renderFarmers() {
  get('farmerGrid').innerHTML = farmers.slice(0, 8).map(farmer => `
    <article class="farmer-card">
      <span class="avatar" aria-hidden="true">👨‍🌾</span>
      <h3>${farmer.name} ${farmer.verified ? '✓' : ''}</h3>
      <p>📍 ${farmer.district}, ${farmer.division}</p>
      <p>${bn.format(posts.filter(p => p.farmerId === farmer.id || p.phone === farmer.phone).length)}টি ফসলের খবর</p>
      <div class="crop-tags">${farmer.crops.map(c => `<span>${c}</span>`).join('')}</div>
      <button class="button button-soft button-block farmer-contact" data-phone="${farmer.phone}" data-name="${farmer.name}" type="button">যোগাযোগ দেখুন</button>
    </article>`).join('');
}

function renderStats() {
  get('statFarmers').textContent = bn.format(farmers.length);
  get('statPosts').textContent = bn.format(posts.length);
  get('statDistricts').textContent = bn.format(new Set(posts.map(p => p.district)).size);
}

function mapData(crop = '') {
  const data = {};
  Object.keys(divisions).forEach(d => {
    const filtered = posts.filter(p => p.division === d && (!crop || p.crop === crop));
    data[d] = {
      count: filtered.length,
      quantity: filtered.reduce((sum, p) => sum + Number(p.quantity), 0),
      crops: [...new Set(filtered.map(p => p.crop))]
    };
  });
  return data;
}

function mapColor(count, max) {
  if (!count) return '#dfece3';
  const ratio = max ? count / max : 0;
  if (ratio > .66) return '#17633a';
  if (ratio > .33) return '#56a872';
  return '#acd8ba';
}

function renderMap() {
  const selectedCrop = get('mapCropSelect').value;
  const data = mapData(selectedCrop);
  const max = Math.max(...Object.values(data).map(v => v.count), 1);
  get('mapPoints').innerHTML = Object.entries(mapCoordinates).map(([division, [x, y]]) => {
    const item = data[division];
    const radius = 29 + (item.count / max) * 19;
    return `<g class="map-point" tabindex="0" role="button" aria-label="${division}: ${item.count}টি ফসলের খবর" data-division="${division}">
      <circle cx="${x}" cy="${y}" r="${radius}" fill="${mapColor(item.count, max)}"></circle>
      <text class="count" x="${x}" y="${y - 2}">${bn.format(item.count)}</text>
      <text class="name" x="${x}" y="${y + 18}">${division}</text>
    </g>`;
  }).join('');

  renderMapSummary(activeMapDivision, data, selectedCrop);
}

function renderMapSummary(division, data, selectedCrop) {
  const scope = division ? { [division]: data[division] } : data;
  get('mapSummaryTitle').textContent = division ? `${division} বিভাগের তথ্য` : 'সব বিভাগের তথ্য';
  get('mapSummarySub').textContent = selectedCrop ? `${selectedCrop} ফসলের সর্বশেষ খবর` : 'সব ফসলের সর্বশেষ খবর';
  get('mapSummaryList').innerHTML = Object.entries(scope)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([name, item]) => `<div class="summary-item"><div><strong>${name}</strong><small>${item.crops.length ? item.crops.join(', ') : 'এখনও তথ্য নেই'}</small></div><span class="summary-count">${bn.format(item.count)}টি</span></div>`)
    .join('');
}

function clearFilters() {
  ['keywordSearch', 'cropFilter', 'divisionFilter', 'districtFilter', 'priceFilter'].forEach(id => get(id).value = '');
  populateSelect(get('districtFilter'), Object.values(divisions).flat(), 'সব জেলা');
  renderPosts();
}

function openModal(modal) {
  if (typeof modal.showModal === 'function') modal.showModal();
  document.body.classList.add('modal-open');
}

function closeModal(modal) {
  modal.close();
  document.body.classList.remove('modal-open');
}

function openContact(name, phone, crop = '') {
  const clean = phone.replace(/\D/g, '');
  const intl = clean.startsWith('0') ? `88${clean}` : clean;
  get('contactTitle').textContent = crop ? `${crop} নিয়ে কথা বলুন` : `${name}-এর সাথে কথা বলুন`;
  get('contactText').textContent = `${name}-এর ফোন নম্বর: ${phone}`;
  get('callLink').href = `tel:${phone}`;
  get('whatsappLink').href = `https://wa.me/${intl}?text=${encodeURIComponent(`আসসালামু আলাইকুম। KrishiBD-তে আপনার ${crop || 'ফসলের'} খবর দেখেছি। বিস্তারিত জানতে চাই।`)}`;
  openModal(get('contactModal'));
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve('');
    if (file.size > 1.5 * 1024 * 1024) return reject(new Error('ছবিটি ১.৫ এমবির চেয়ে বড়। ছোট ছবি দিন।'));
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setupEvents() {
  get('menuButton').addEventListener('click', () => {
    const open = get('mainNav').classList.toggle('open');
    get('menuButton').setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', () => get('mainNav').classList.remove('open')));

  get('heroDivision').addEventListener('change', () => updateDistrictSelect(get('heroDivision'), get('heroDistrict')));
  get('divisionFilter').addEventListener('change', () => { updateDistrictSelect(get('divisionFilter'), get('districtFilter')); renderPosts(); });
  get('farmerDivision').addEventListener('change', () => updateDistrictSelect(get('farmerDivision'), get('farmerDistrict'), 'জেলা বাছুন'));
  get('postDivision').addEventListener('change', () => updateDistrictSelect(get('postDivision'), get('postDistrict'), 'জেলা বাছুন'));

  ['keywordSearch', 'cropFilter', 'districtFilter', 'priceFilter', 'sortPosts'].forEach(id => {
    get(id).addEventListener(id === 'keywordSearch' ? 'input' : 'change', renderPosts);
  });
  get('clearFilters').addEventListener('click', clearFilters);
  get('emptyClear').addEventListener('click', clearFilters);

  get('heroSearchForm').addEventListener('submit', event => {
    event.preventDefault();
    get('cropFilter').value = get('heroCrop').value;
    get('divisionFilter').value = get('heroDivision').value;
    updateDistrictSelect(get('divisionFilter'), get('districtFilter'));
    get('districtFilter').value = get('heroDistrict').value;
    renderPosts();
    get('crops').scrollIntoView({ behavior: 'smooth' });
  });

  ['accountButton', 'joinFarmer'].forEach(id => get(id).addEventListener('click', () => openModal(get('accountModal'))));
  ['addPostHero', 'addPostTop', 'addPostBottom'].forEach(id => get(id).addEventListener('click', () => openModal(get('postModal'))));

  get('accountForm').addEventListener('submit', event => {
    event.preventDefault();
    const farmer = {
      id: Date.now(), name: get('farmerName').value.trim(), phone: get('farmerPhone').value.trim(),
      division: get('farmerDivision').value, district: get('farmerDistrict').value,
      address: get('farmerAddress').value.trim(), crops: get('farmerCrops').value.split(',').map(v => v.trim()).filter(Boolean), verified: false
    };
    farmers.unshift(farmer); saveData(); renderFarmers(); renderStats();
    get('postPhone').value = farmer.phone;
    get('postDivision').value = farmer.division; updateDistrictSelect(get('postDivision'), get('postDistrict'), 'জেলা বাছুন'); get('postDistrict').value = farmer.district;
    event.target.reset(); closeModal(get('accountModal'));
    showToast('আপনার কৃষক হিসাব তৈরি হয়েছে। এখন ফসলের খবর দিতে পারবেন।');
  });

  get('postForm').addEventListener('submit', async event => {
    event.preventDefault();
    try {
      const phone = get('postPhone').value.trim();
      const linkedFarmer = farmers.find(f => f.phone === phone);
      const image = await readImage(get('postImage').files[0]);
      const post = {
        id: Date.now(), farmerId: linkedFarmer?.id || null, farmerName: linkedFarmer?.name || 'নতুন কৃষক', phone,
        crop: get('postCrop').value, variety: get('postVariety').value.trim(), quantity: Number(get('postQuantity').value),
        unit: get('postUnit').value, price: Number(get('postPrice').value), division: get('postDivision').value,
        district: get('postDistrict').value, details: get('postDetails').value.trim(), createdAt: Date.now(), image
      };
      posts.unshift(post); saveData(); renderAll();
      event.target.reset(); closeModal(get('postModal'));
      get('crops').scrollIntoView({ behavior: 'smooth' });
      showToast('আপনার ফসলের খবর প্রকাশ হয়েছে।');
    } catch (error) { showToast(error.message || 'ফসলের খবর প্রকাশ করা যায়নি।'); }
  });

  get('cropGrid').addEventListener('click', async event => {
    const contact = event.target.closest('.contact-button');
    const share = event.target.closest('.share-button');
    if (contact) {
      const post = posts.find(p => p.id === Number(contact.dataset.postId));
      if (post) openContact(post.farmerName, post.phone, post.crop);
    }
    if (share) {
      const post = posts.find(p => p.id === Number(share.dataset.shareId));
      const text = `${post.crop} — ${post.quantity} ${post.unit}, প্রতি ${post.unit} ৳${post.price}, ${post.district}. KrishiBD`;
      try {
        if (navigator.share) await navigator.share({ title: `${post.crop} বিক্রি হবে`, text });
        else { await navigator.clipboard.writeText(text); showToast('ফসলের তথ্য কপি হয়েছে।'); }
      } catch { /* user cancelled */ }
    }
  });

  get('farmerGrid').addEventListener('click', event => {
    const btn = event.target.closest('.farmer-contact');
    if (btn) openContact(btn.dataset.name, btn.dataset.phone);
  });

  get('mapCropSelect').addEventListener('change', () => { activeMapDivision = ''; renderMap(); });
  get('mapPoints').addEventListener('click', event => {
    const point = event.target.closest('.map-point');
    if (!point) return;
    activeMapDivision = point.dataset.division;
    renderMap();
    get('mapTip').textContent = `${activeMapDivision} বিভাগের বিস্তারিত ডান পাশে দেখুন`;
  });
  get('mapPoints').addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      const point = event.target.closest('.map-point');
      if (point) { event.preventDefault(); point.dispatchEvent(new Event('click', { bubbles: true })); }
    }
  });

  get('contactModal').querySelector('[data-close-contact]').addEventListener('click', () => closeModal(get('contactModal')));
  document.querySelectorAll('[data-close-modal]').forEach(button => {
    button.addEventListener('click', () => closeModal(button.closest('dialog')));
  });
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('close', () => document.body.classList.remove('modal-open')));

  get('resetDemo').addEventListener('click', () => {
    const ok = confirm('ডেমোর সব নতুন তথ্য মুছে আগের অবস্থায় ফিরে যেতে চান?');
    if (!ok) return;
    localStorage.removeItem('krishibd_farmers'); localStorage.removeItem('krishibd_posts');
    farmers = structuredClone(defaultFarmers); posts = structuredClone(defaultPosts); renderAll();
    showToast('ডেমোর তথ্য আগের অবস্থায় ফিরে এসেছে।');
  });
}

function renderAll() {
  renderPosts(); renderFarmers(); renderStats(); renderMap();
}

function init() {
  initializeSelects(); setupEvents(); renderAll();
  get('currentYear').textContent = new Date().getFullYear();
}

init();
