import React from 'react';
import portrait from '../assets/portrait-editorial.webp';

const ease = t => t * t * (3 - 2 * t);
const clamp = n => Math.max(0, Math.min(1, n));

/** Sample the real portrait and text into the same point cloud so the intro genuinely morphs. */
export default function ParticleHero() {
 const canvasRef = React.useRef(null);
 const skipRef = React.useRef(false);
 const pauseRef = React.useRef(false);
 const [run, setRun] = React.useState(0);
 const [settled, setSettled] = React.useState(false);
 const [paused, setPaused] = React.useState(false);
 const [fallback, setFallback] = React.useState(false);
 const [reduced, setReduced] = React.useState(false);
 React.useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) { setFallback(true); setSettled(true); return; }
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = motion.matches;
  setReduced(reducedMotion);
  let frame = 0, start = null, last = 0, active = true, disposed = false, hasImage = false;
  let width = 0, height = 0, count = 0, points = [], name = [], portfolio = [], face = [];
  let pointer = { x: -1000, y: -1000 };
  let finished = false;
  const img = new Image();
  const sample = document.createElement('canvas');
  const sc = sample.getContext('2d', { willReadFrequently: true });
  const random = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  function textPoints(text) {
   sample.width = 600; sample.height = 180;
   sc.clearRect(0,0,600,180); sc.fillStyle='#fff'; sc.textAlign='center'; sc.textBaseline='middle';
   sc.font = '900 '+ (text==='PORTFOLIO'?87:100) +'px Arial'; sc.fillText(text,300,90);
   const data=sc.getImageData(0,0,600,180).data; const result=[];
   const scale=Math.min(width*.87/600,1.55);
   for(let y=0;y<180;y+=3)for(let x=0;x<600;x+=3)if(data[(y*600+x)*4+3]>100)result.push({x:width/2+(x-300)*scale,y:height*.46+(y-90)*scale,c:195+(1-y/180)*60});
   return result;
  }
  function portraitPoints() {
   sample.width=220; sample.height=280;
   sc.clearRect(0,0,220,280);
   const scale=Math.min(220/img.naturalWidth,280/img.naturalHeight);
   const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
   sc.drawImage(img,(220-w)/2,(280-h)/2,w,h);
   const data=sc.getImageData(0,0,220,280).data,result=[];
   const displayScale=Math.min(width*.68/220,height*.80/280,2);
   for(let y=0;y<280;y+=2)for(let x=0;x<220;x+=2){
    const i=(y*220+x)*4,r=data[i],g=data[i+1],b=data[i+2];
    if(data[i+3]<120 || (r>224&&g>224&&b>224))continue;
    const luminance=r*.299+g*.587+b*.114;
    result.push({x:width/2+(x-110)*displayScale,y:height*.46+(y-140)*displayScale,c:125+luminance*.52});
   }
   return result;
  }
  function resize() {
   const rect=canvas.getBoundingClientRect(); width=rect.width;height=rect.height;
   const ratio=Math.min(window.devicePixelRatio||1,1.7);
   canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
   count=width<600?4200:10000;
   name=textPoints('JAPNEET');portfolio=textPoints('PORTFOLIO');
   if(hasImage) face=portraitPoints();
   points=Array.from({length:count},(_,i)=>({x:width/2+(random(i)-.5)*8,y:height*.46+(random(i+7000)-.5)*8}));
  }
  function target(list,i) { return list[(i*73)%list.length] || {x:width/2,y:height*.46,c:180}; }
  function markFinished(){if(!finished){finished=true;setSettled(true);}}
  function draw(time) {
   frame=0;if(disposed)return;
   if(!active||document.hidden)return;
   if(start===null)start=time;
   const elapsed=(time-start)/1000;
   if(time-last<1000/40 && !reducedMotion){frame=requestAnimationFrame(draw);return;}last=time;
   const final=reducedMotion||skipRef.current||elapsed>6.1;
   if(final)markFinished();
   ctx.fillStyle='#080808';ctx.fillRect(0,0,width,height);
   // A restrained ambient field, generated deterministically instead of a looping video.
   for(let i=0;i<(width<600?100:240);i++){
    const x=random(i+30000)*width,y=(random(i+32000)*height+(paused||reducedMotion?0:elapsed*1.4))%height;
    ctx.fillStyle=`rgba(215,224,238,${.07+random(i+34000)*.22})`;ctx.fillRect(x,y,random(i+36000)> .93?1.5:.7,.7);
   }
   let from,to,blend;
   if(final){from=face;to=face;blend=1;}
   else if(elapsed<.55){from=[];to=[];blend=0;}
   else if(elapsed<2.35){from=[];to=name;blend=ease(clamp((elapsed-.55)/1.15));}
   else if(elapsed<3.8){from=name;to=portfolio;blend=ease(clamp((elapsed-2.35)/.95));}
   else {from=portfolio;to=face;blend=ease(clamp((elapsed-3.8)/1.9));}
   const explode=(!final&&elapsed>3.8&&elapsed<5.7)?Math.sin(clamp((elapsed-3.8)/1.9)*Math.PI):0;
   for(let i=0;i<count;i++){
    const a=target(from,i),b=target(to,i);
    const angle=random(i+17000)*Math.PI*2;
    let tx=a.x+(b.x-a.x)*blend+Math.cos(angle)*explode*width*.2;
    let ty=a.y+(b.y-a.y)*blend+Math.sin(angle)*explode*height*.2;
    if(final&&!paused&&!reducedMotion){tx+=Math.sin(elapsed*.7+i)*.6;ty+=Math.cos(elapsed*.6+i)*.6;}
    const dx=tx-pointer.x,dy=ty-pointer.y,dist=Math.hypot(dx,dy);
    if(final&&!paused&&!reducedMotion&&dist<70&&dist>0){const force=(1-dist/70)*16;tx+=dx/dist*force;ty+=dy/dist*force;}
    const point=points[i];
    if(reducedMotion||paused){point.x=tx;point.y=ty;}else{point.x+=(tx-point.x)*.19;point.y+=(ty-point.y)*.19;}
    const c=Math.round(a.c+(b.c-a.c)*blend),size=width<600?1.35:1.75;
    ctx.fillStyle=`rgba(${c},${c},${Math.min(255,c+7)},0.95)`;
    ctx.fillRect(point.x,point.y,size,size);
   }
   if(!reducedMotion&&!paused)frame=requestAnimationFrame(draw);
  }
  function schedule(){if(hasImage&&!frame&&!disposed&&active)frame=requestAnimationFrame(draw);}
  function onMove(e){const r=canvas.getBoundingClientRect();pointer={x:e.clientX-r.left,y:e.clientY-r.top};}
  function onLeave(){pointer={x:-1000,y:-1000};}
  function onVisibility(){schedule();}
  function onMotion(e){reducedMotion=e.matches;setReduced(e.matches);if(e.matches)markFinished();schedule();}
  const observer=new IntersectionObserver(entries=>{active=entries[0].isIntersecting;if(active)schedule();},{threshold:.01});observer.observe(canvas);
  const resizeObserver=new ResizeObserver(()=>{resize();schedule();});resizeObserver.observe(canvas);
  canvas.addEventListener('pointermove',onMove);canvas.addEventListener('pointerleave',onLeave);
  document.addEventListener('visibilitychange',onVisibility);motion.addEventListener('change',onMotion);
  img.onload=()=>{if(disposed)return;hasImage=true;resize();schedule();};
  img.onerror=()=>{setFallback(true);setSettled(true);};img.src=portrait;
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();canvas.removeEventListener('pointermove',onMove);canvas.removeEventListener('pointerleave',onLeave);document.removeEventListener('visibilitychange',onVisibility);motion.removeEventListener('change',onMotion);};
 },[run]);
 function replay(){skipRef.current=false;pauseRef.current=false;setPaused(false);setSettled(false);setRun(n=>n+1);}
 function skip(){skipRef.current=true;setSettled(true);}
 function pause(){pauseRef.current=!pauseRef.current;setPaused(pauseRef.current);skipRef.current=true;setSettled(true);setRun(n=>n+1);}
 // State controls are mirrored in refs so a running frame never needs a React render.
 React.useEffect(()=>{pauseRef.current=paused;},[paused]);
 return <section id="home" className={`cinema-hero ${settled?'is-settled':''} ${reduced?'reduced-motion':''}`}>
  <div className="hero-topline"><span>JAPNEET SINGH / SOFTWARE DEVELOPER</span><span className="hero-availability"><i/>Open to SDE opportunities</span></div>
  <div className="particle-stage">
   <canvas ref={canvasRef} className="portrait-particles" aria-hidden="true" />
   <img className={`real-portrait ${fallback?"image-fallback":""}`} src={portrait} alt="Japneet Singh" fetchPriority="high"/>
   <div key={'intro-'+run} className="intro-word" aria-hidden="true">{'JAPNEET'.split('').map((letter,i)=><span key={i} style={{'--letter':i}}>{letter}</span>)}</div>
   <div className="silver-title" aria-hidden="true">PORTFOLIO</div>
   <div className="portrait-identity"><span>THE PERSON BEHIND THE CODE</span><strong>Japneet Singh.</strong></div>
  </div>
  <div className="cinema-bottom"><div><h1>Java &amp; Full-Stack <em>Developer</em></h1><p>Building dependable applications. Connecting systems.</p></div><div className="cinema-actions"><a href="#projects">Explore work <span>↓</span></a><a href="mailto:japneet.singh2024@gmail.com">Contact <span>↗</span></a></div></div>
  <div className="animation-controls">
   {!settled&&!reduced?<button onClick={skip}>Skip intro ↗</button>:!reduced&&<button onClick={replay}>Replay intro ↻</button>}
   {!reduced&&settled&&<button onClick={pause}>{paused?'Resume motion':'Pause motion'}</button>}
   <span aria-live="polite" className="sr-only">{settled?'Portrait of Japneet Singh revealed.':'Intro animation playing.'}</span>
  </div>
 </section>;
}
