document.addEventListener('DOMContentLoaded',()=>{
  const {D,postCard,hydrateSocialFeatures}=Krishi;
  const feed=document.querySelector('#feed');
  const render=posts=>{feed.innerHTML=posts.map(postCard).join('')||'<div class="card empty">এই ফসলের কোনো পোস্ট পাওয়া যায়নি।</div>';hydrateSocialFeatures(feed)};
  render(D.posts.slice(0,5));
  document.querySelector('#statFarmers').textContent=Krishi.bd(D.stats.farmers)+'+';
  document.querySelector('#statPosts').textContent=Krishi.bd(D.stats.posts)+'+';
  document.querySelector('#statCrops').textContent=Krishi.bd(D.stats.crops);
  document.querySelector('#statDistricts').textContent=Krishi.bd(D.stats.districts);
  document.querySelectorAll('.chip').forEach(ch=>ch.addEventListener('click',()=>{
    document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));
    ch.classList.add('active');
    const c=ch.dataset.crop;
    render(D.posts.filter(p=>!c||p.crop===c));
  }));
});
