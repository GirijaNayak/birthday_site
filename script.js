const sections=['opening','welcome','album','wishes','letter','final'];
let current=0;
const song=document.getElementById('song');
const musicBtn=document.getElementById('musicBtn');
const progress=document.getElementById('progress');
const time=document.getElementById('time');

function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  current=sections.indexOf(id);
  window.scrollTo({top:0,behavior:'smooth'});
  burst(8);
}

document.getElementById('openEnvelope').addEventListener('click',()=>show('welcome'));
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));

document.getElementById('replay').addEventListener('click',()=>show('opening'));

musicBtn.addEventListener('click',async()=>{
  if(song.paused){try{await song.play(); musicBtn.textContent='Ⅱ'}catch(e){musicBtn.textContent='▶'}}
  else{song.pause();musicBtn.textContent='▶'}
});
song.addEventListener('timeupdate',()=>{
  const pct=song.duration?(song.currentTime/song.duration)*100:0;
  progress.style.width=pct+'%';
  time.textContent=format(song.currentTime);
});
song.addEventListener('ended',()=>musicBtn.textContent='▶');
function format(s){if(!isFinite(s))return'0:00';return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0')}

const photos=['assets/photo1.jpg','assets/photo2.jpg','assets/photo3.jpg'];
const captions=[
  'ordinary days with you have always been my favourite ones.',
  'thank you for showing up — for everything, every time.',
  'here’s to all the memories we already have, and all the ones still waiting for us.'
];
let photoIndex=0;
function renderPhoto(){
  document.getElementById('memoryPhoto').src=photos[photoIndex];
  document.getElementById('memoryCount').textContent=`MEMORY ${String(photoIndex+1).padStart(2,'0')} / 03`;
  document.getElementById('memoryCaption').textContent=captions[photoIndex];
  document.querySelectorAll('#memoryDots i').forEach((d,i)=>d.classList.toggle('active',i===photoIndex));
}
document.getElementById('prevPhoto').addEventListener('click',()=>{photoIndex=(photoIndex+2)%3;renderPhoto()});
document.getElementById('nextPhoto').addEventListener('click',()=>{photoIndex=(photoIndex+1)%3;renderPhoto()});

document.querySelectorAll('.wish-card').forEach(card=>card.addEventListener('click',()=>{card.classList.toggle('open'); burst(5)}));

function burst(n=10){
  for(let i=0;i<n;i++){
    const h=document.createElement('span');h.className='float-heart';h.textContent=['♥','♡','✿'][Math.floor(Math.random()*3)];
    h.style.left=Math.random()*100+'vw';h.style.animationDuration=(3+Math.random()*3)+'s';h.style.fontSize=(12+Math.random()*16)+'px';
    document.getElementById('hearts').appendChild(h);setTimeout(()=>h.remove(),6500);
  }
}
setInterval(()=>burst(1),1800);
