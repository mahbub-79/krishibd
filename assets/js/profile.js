document.addEventListener('DOMContentLoaded',()=>{
  const {D,postCard,hydrateSocialFeatures}=Krishi;
  const feed=document.querySelector('#profileFeed');
  feed.innerHTML=D.posts.filter(p=>p.farmerId==='farmer-001').map(postCard).join('');
  hydrateSocialFeatures(feed);
});
