/** ভবিষ্যৎ Full-Stack API সংযোগের নমুনা। */
export class ApiService {
  constructor(baseUrl = '/api/v1') { this.baseUrl = baseUrl; }
  async request(path, options = {}) {
    const response = await fetch(this.baseUrl + path, { headers: {'Content-Type':'application/json', ...(options.headers||{})}, ...options });
    if (!response.ok) throw new Error('অনুরোধ সম্পন্ন হয়নি');
    return response.json();
  }
  getPosts(params='') { return this.request('/posts?' + params); }
  getFarmer(id) { return this.request('/farmers/' + id); }
  createPost(payload) { return this.request('/posts', {method:'POST', body:JSON.stringify(payload)}); }
}
