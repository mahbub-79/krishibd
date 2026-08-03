(function(){
  const D = window.KRISHI_DATA || {farmers:[],posts:[],stats:{},market:[],regions:[]};
  const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const farmerById=id=>D.farmers.find(f=>f.id===id)||D.farmers[0];
  const bd=n=>new Intl.NumberFormat('bn-BD').format(n);
  const pagePath=file=>location.pathname.includes('/pages/')?file:'pages/'+file;
  const latinDigits=value=>String(value).replace(/[০-৯]/g,d=>'০১২৩৪৫৬৭৮৯'.indexOf(d));
  const escapeHtml=value=>String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const storeGet=(key,fallback)=>{try{const v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v)}catch(e){return fallback}};
  const storeSet=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch(e){}}

  window.toast=function(msg){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)};
  window.openModal=function(id){$('#'+id)?.classList.add('open')};
  window.closeModal=function(id){$('#'+id)?.classList.remove('open')};

  function detailUrl(p){
    const url=new URL(pagePath('crop-details.html'),location.href);
    url.searchParams.set('id',p.id);
    return url.href;
  }

  function postCard(p){
    const f=farmerById(p.farmerId);
    return `<article class="card post" data-crop="${p.crop}" data-post-id="${p.id}">
      <div class="post-head"><a href="${pagePath('profile.html')}"><img class="avatar" src="${pPath(f.avatar)}" alt="${f.name}"></a><div class="post-meta"><b>${f.name} ${f.verified?'<span class="verify">● যাচাইকৃত</span>':''}</b><small>${p.date} · ${p.upazila}, ${p.district}</small></div><button class="more" aria-label="আরও">•••</button></div>
      <div class="post-copy"><h3>${p.crop} — ${p.variety}</h3><p>${p.description}</p></div>
      <a href="${pagePath('crop-details.html')}?id=${p.id}"><img class="crop-image" src="${pPath(p.image)}" alt="${p.crop}"></a>
      <div class="post-info"><div class="info-pill"><small>পরিমাণ</small><b>${p.quantity}</b></div><div class="info-pill"><small>দাম</small><b>৳${bd(p.price)}/${p.unit}</b></div><div class="info-pill"><small>জেলা</small><b>${p.district}</b></div><div class="info-pill"><small>সংগ্রহ</small><b>${p.harvest}</b></div></div>
      <div class="availability"><div><span class="badge ${p.available?'badge-success':'badge-muted'}">${p.available?'● এখন পাওয়া যাচ্ছে':'● বুকিং সম্পন্ন'}</span>${p.organic?'<span class="badge badge-success organic-badge">নিরাপদ উৎপাদন</span>':''}</div><button class="contact contact-inline" data-farmer="${f.id}">📞 কৃষকের সঙ্গে কথা বলুন</button></div>
      <div class="post-stats"><span class="like-summary">👍 <b class="like-count">${bd(p.likes)}</b> জন পছন্দ করেছেন</span><button class="comment-summary comment-toggle" data-post-id="${p.id}"><b class="comment-count">${bd(p.comments)}</b> মন্তব্য</button></div>
      <div class="post-actions"><button class="action like" data-post-id="${p.id}" aria-pressed="false">👍 পছন্দ</button><button class="action comment-toggle" data-post-id="${p.id}">💬 মন্তব্য</button><button class="action share-facebook" data-post-id="${p.id}" data-share-url="${detailUrl(p)}">🔵 Facebook-এ শেয়ার</button><button class="action save" data-post-id="${p.id}">🔖 সংরক্ষণ</button></div>
      <section class="comment-panel" id="comments-${p.id}" hidden>
        <div class="comment-panel-head"><b>মন্তব্য</b><small>ভদ্র ও প্রয়োজনীয় কথা লিখুন</small></div>
        <div class="comment-list" data-post-id="${p.id}"></div>
        <form class="comment-form" data-post-id="${p.id}"><div class="comment-avatar">আপনি</div><input required maxlength="280" aria-label="মন্তব্য লিখুন" placeholder="ফসল সম্পর্কে প্রশ্ন বা মতামত লিখুন..."><button type="submit">পাঠান</button></form>
      </section>
    </article>`
  }

  function cropCard(p){const f=farmerById(p.farmerId);return `<article class="card crop-card"><a href="${pagePath('crop-details.html')}?id=${p.id}"><img src="${pPath(p.image)}" alt="${p.crop}"></a><div class="crop-card-body"><span class="badge ${p.available?'badge-success':'badge-muted'}">${p.available?'পাওয়া যাচ্ছে':'বিক্রি হয়েছে'}</span><h3>${p.variety}</h3><div class="price">৳${bd(p.price)}/${p.unit}</div><div class="meta-list"><div class="meta-item">📦 ${p.quantity}</div><div class="meta-item">📍 ${p.district}</div><div class="meta-item">👨‍🌾 ${f.name}</div><div class="meta-item">📅 ${p.harvest}</div></div><a class="btn btn-primary" style="width:100%" href="${pagePath('crop-details.html')}?id=${p.id}">বিস্তারিত দেখুন</a></div></article>`}

  function pPath(path){return location.pathname.includes('/pages/')?'../'+path:path}

  function commentsFor(postId){return storeGet('krishi-comments-'+postId,[])}
  function renderComments(postId,root=document){
    const list=root.querySelector(`.comment-list[data-post-id="${postId}"]`);
    if(!list)return;
    const comments=commentsFor(postId);
    list.innerHTML=comments.length?comments.map(c=>`<div class="comment-item"><div class="comment-avatar">${escapeHtml((c.name||'আপনি').slice(0,2))}</div><div class="comment-bubble"><b>${escapeHtml(c.name||'আপনি')}</b><p>${escapeHtml(c.text)}</p><small>${escapeHtml(c.time||'এইমাত্র')}</small></div></div>`).join(''):'<div class="no-comments">আপনার প্রশ্ন বা মতামত লিখে প্রথম মন্তব্য করুন।</div>';
  }

  function hydrateSocialFeatures(root=document){
    root.querySelectorAll('.post[data-post-id]').forEach(card=>{
      const id=card.dataset.postId;
      const p=D.posts.find(x=>x.id===id);
      const liked=storeGet('krishi-liked-'+id,false);
      const saved=storeGet('krishi-saved-'+id,false);
      const addedComments=commentsFor(id).length;
      const likeBtn=card.querySelector('.like');
      const saveBtn=card.querySelector('.save');
      if(liked&&likeBtn){likeBtn.classList.add('liked');likeBtn.textContent='💚 পছন্দ হয়েছে';likeBtn.setAttribute('aria-pressed','true')}
      if(saved&&saveBtn){saveBtn.classList.add('saved');saveBtn.textContent='✅ সংরক্ষিত'}
      const likeCount=card.querySelector('.like-count');if(likeCount&&p)likeCount.textContent=bd(p.likes+(liked?1:0));
      const commentCount=card.querySelector('.comment-count');if(commentCount&&p)commentCount.textContent=bd(p.comments+addedComments);
      renderComments(id,card);
    });
  }

  window.Krishi={D,postCard,cropCard,farmerById,bd,pPath,hydrateSocialFeatures};

  document.addEventListener('DOMContentLoaded',()=>{
    const theme=localStorage.getItem('krishi-theme');if(theme==='dark')document.body.classList.add('dark');
    $('#themeToggle')?.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('krishi-theme',document.body.classList.contains('dark')?'dark':'light')});
    $$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')}));

    document.body.addEventListener('click',e=>{
      const save=e.target.closest('.save');
      if(save){const id=save.dataset.postId;const next=!storeGet('krishi-saved-'+id,false);storeSet('krishi-saved-'+id,next);save.classList.toggle('saved',next);save.textContent=next?'✅ সংরক্ষিত':'🔖 সংরক্ষণ';toast(next?'পোস্টটি সংরক্ষণ করা হয়েছে':'সংরক্ষণ তালিকা থেকে সরানো হয়েছে');return}

      const like=e.target.closest('.like');
      if(like){const id=like.dataset.postId;const card=like.closest('.post');const p=D.posts.find(x=>x.id===id);const next=!storeGet('krishi-liked-'+id,false);storeSet('krishi-liked-'+id,next);like.classList.toggle('liked',next);like.textContent=next?'💚 পছন্দ হয়েছে':'👍 পছন্দ';like.setAttribute('aria-pressed',String(next));const count=card?.querySelector('.like-count');if(count&&p)count.textContent=bd(p.likes+(next?1:0));toast(next?'পোস্টটি পছন্দ করেছেন':'পছন্দ সরানো হয়েছে');return}

      const commentToggle=e.target.closest('.comment-toggle');
      if(commentToggle){const id=commentToggle.dataset.postId;const card=commentToggle.closest('.post');const panel=card?.querySelector(`#comments-${id}`);if(panel){panel.hidden=!panel.hidden;if(!panel.hidden){renderComments(id,card);setTimeout(()=>panel.querySelector('input')?.focus(),50)}}return}

      const share=e.target.closest('.share-facebook');
      if(share){const shareUrl='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(share.dataset.shareUrl||location.href);const popup=window.open(shareUrl,'krishibd-facebook-share','width=680,height=560,noopener,noreferrer');if(!popup)location.href=shareUrl;toast('Facebook শেয়ার পাতা খোলা হয়েছে');return}

      const c=e.target.closest('.contact');
      if(c){const f=farmerById(c.dataset.farmer);$('#contactName').textContent=f.name;$('#contactPhone').textContent=f.phone;$('#callLink').href='tel:'+latinDigits(f.phone).replace(/[^0-9]/g,'');openModal('contactModal')}
    });

    document.body.addEventListener('submit',e=>{
      const form=e.target.closest('.comment-form');if(!form)return;
      e.preventDefault();
      const input=form.querySelector('input'),text=input.value.trim();if(!text)return;
      const id=form.dataset.postId,comments=commentsFor(id);comments.push({name:'আপনি',text,time:'এইমাত্র'});storeSet('krishi-comments-'+id,comments);input.value='';
      const card=form.closest('.post'),p=D.posts.find(x=>x.id===id);renderComments(id,card);const count=card?.querySelector('.comment-count');if(count&&p)count.textContent=bd(p.comments+comments.length);toast('মন্তব্যটি যোগ হয়েছে');
    });

    $('#mobileMenu')?.addEventListener('click',()=>openModal('menuModal'));
    $('#createPostBtn')?.addEventListener('click',()=>openModal('postModal'));
    $('#demoPostForm')?.addEventListener('submit',e=>{e.preventDefault();closeModal('postModal');toast('ডেমো পোস্টটি সফলভাবে তৈরি হয়েছে')});
    $('#globalSearch')?.addEventListener('submit',e=>{e.preventDefault();const q=$('#globalSearch input').value.trim();location.href=(location.pathname.includes('/pages/')?'':'pages/')+'search.html?q='+encodeURIComponent(q)});
  });
})();
