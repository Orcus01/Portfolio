import React from 'react';
import ParticleHero from './components/ParticleHero';
import ProjectVisual from './components/ProjectVisual';
import {PageProgress,Reveal,useCardTilt} from './components/MotionSystem';
import {motion,AnimatePresence,useReducedMotion} from 'framer-motion';

const github = 'https://github.com/Orcus01';
const linkedin = 'https://www.linkedin.com/in/japneet--singh/';
const projects = [
  {
    id: 'seats-spaces', number: '01', name: 'Seats & Spaces', type: 'Personal project',
    subtitle: 'A furniture storefront, built beyond the happy path.',
    description: 'A full-stack e-commerce platform with a customer storefront and an admin application for products, inventory, and orders.',
    stack: ['Java 21', 'Spring Boot', 'Next.js', 'TypeScript', 'MySQL'],
    links: [{label:'Live website',href:'https://seatsandspaces.com.au'}, {label:'Source code',href:github+'/Seats-and-Spaces'}],
    features: [
      ['Checkout consistency', 'Transactional checkout and database row locks guard inventory when customers compete for the same stock.'],
      ['Payment reliability', 'Stripe integration validates webhooks and records event IDs to handle repeated payment notifications.'],
      ['Verification & delivery', 'JUnit tests cover checkout concurrency and payment rules; Playwright checks browser flows. GitHub Actions supports deployment to Google Cloud.'],
    ],
    details: [
      ['The problem', 'Shopping flows need more than a product catalogue: inventory, order ownership, and repeated payment events need consistent handling.'],
      ['Engineering decisions', 'Spring Boot exposes REST APIs backed by JPA/Hibernate and MySQL. Checkout locks the relevant records inside a transaction. Spring Security and JWT protect customer and admin operations.'],
      ['How it is checked', 'The repository includes tests that race six buyers for two units of stock and submit checkout twice for the same customer. Payment tests cover ownership, invalid order states, and repeated events. These are test scenarios, not production traffic metrics.'],
    ],
  },
  {
    id:'labconnect',number:'02',name:'LabConnect',type:'Training project · Jan–Apr 2026',
    subtitle:'Laboratory workflows across connected services.',
    description:'A laboratory information management system for orders, test results, and quality-control workflows.',
    stack:['Java','Spring Boot','Spring Cloud','Angular','MySQL'],links:[],
    features:[
      ['Service integration','OpenFeign connects services; Eureka provides service discovery behind an API Gateway.'],
      ['Role-based access','Spring Security and JWT support role-specific access, with JPA/Hibernate for persistence.'],
    ],
    details:[['Project context','Built during training. The work focused on backend services, service-to-service communication, authentication, and connecting role-based workflows to an Angular interface.'],['Availability','A public source repository or live demo is not linked for this training project.']],
  },
  {
    id:'kissan-konnect',number:'03',name:'Kissan Konnect',type:'Research project · IEEE SSITCON 2024',
    subtitle:'Plant disease diagnosis with a mobile interface.',
    description:'A CNN-based plant disease diagnosis system that lets farmers submit plant images and receive analysis and treatment suggestions.',
    stack:['CNNs','Mobile application','Plant disease classification'],
    links:[{label:'Read publication',href:'https://doi.org/10.1109/SSITCON62437.2024.10796969'},{label:'Source code',href:github+'/Kissan_Konnect'}],
    features:[],details:[['Research','Kissan Konnect: AI-Powered Plant Disease Control System, published at IEEE SSITCON 2024. DOI: 10.1109/SSITCON62437.2024.10796969.']],
  },
];
const skills = [
  ['Languages','Java, C++, JavaScript, TypeScript, SQL'],
  ['Backend & data','Spring Boot, Spring Cloud, Spring Security, REST APIs, JPA/Hibernate, MySQL'],
  ['Frontend','React, Next.js, Angular, HTML, CSS'],
  ['Cloud & delivery','Azure, AWS, Git, GitHub Actions, Postman, JUnit, Playwright'],
];
function External({href,children,...props}) {return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}<span aria-hidden="true"> ↗</span></a>}
function SectionTitle({number,eyebrow,title,children}) {return <Reveal className="section-title"><div><span className="eyebrow">{number} / {eyebrow}</span><h2>{title}</h2></div>{children&&<p>{children}</p>}</Reveal>}
export default function App(){
 const [menu,setMenu]=React.useState(false);
 const [filter,setFilter]=React.useState('All work');
 const reduce=useReducedMotion();
 const tilt=useCardTilt();
 const shown=projects.filter(p=>filter==='All work'||(filter==='Personal'&&p.id==='seats-spaces')||(filter==='Training'&&p.id==='labconnect')||(filter==='Research'&&p.id==='kissan-konnect'));
 return <>
  <PageProgress/>
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="header"><nav className="container nav" aria-label="Main navigation">
   <a className="wordmark" href="#home">JS<span>.</span><span className="wordmark-name">Japneet Singh</span></a>
   <button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'}</button>
   <div id="navigation" className={'nav-links '+(menu?'is-open':'')}>
    {[['projects','Projects'],['experience','Experience'],['skills','Skills'],['credentials','Credentials']].map(([id,label])=><a key={id} href={'#'+id} onClick={()=>setMenu(false)}>{label}</a>)}
    <a className="nav-contact" href="mailto:japneet.singh2024@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a>
   </div>
  </nav></header>
  <main id="main" className="container">
   <ParticleHero />
   <div className="evidence-strip"><div><strong>Java + Spring Boot</strong><span>Backend development</span></div><div><strong>Azure + AWS</strong><span>Cloud environment operations</span></div><div><strong>IEEE SSITCON 2024</strong><span>Published research</span></div></div>
   <section className="developer-intro" aria-label="About Japneet"><p>Java and full-stack developer working with <strong>Temenos Transact, Azure, and AWS at Cognizant.</strong> I build web applications with a focus on dependable APIs, data consistency, and clear user experiences.</p><div><External href={github}>GitHub</External><External href={linkedin}>LinkedIn</External><a href="/Japneet_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer">View resume ↗</a></div></section>
   <section id="projects" className="section"><SectionTitle number="01" eyebrow="Selected work" title="Built. Connected. Tested.">Three projects that show how I approach applications, integrations, and engineering decisions.</SectionTitle>
    <div className="project-filters" aria-label="Filter projects">{['All work','Personal','Training','Research'].map(label=><button key={label} aria-pressed={filter===label} onClick={()=>setFilter(label)}>{label}{filter===label&&<motion.span layoutId="filter-indicator" className="filter-indicator" transition={{type:'spring',bounce:.15,duration:.4}}/>}</button>)}</div>
    <motion.div layout className={"project-list "+(shown.length===1?"single-result":"")}><AnimatePresence initial={false}>{shown.map(project=><motion.article layout key={project.id} className={'project-card project-'+project.id} initial={reduce?false:{opacity:0,y:35}} whileInView={{opacity:1,y:0}} exit={{opacity:0,scale:.97}} viewport={{once:true,amount:.08}} transition={{duration:reduce?0:.5}}>
     <div className="project-card-inner" {...tilt}><ProjectVisual id={project.id}/><div className="project-body">
     <div className="project-top"><span className="project-number">/{project.number}</span><span className="project-type">{project.type}</span></div>
     <h3>{project.name}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p>
     <ul className="tags" aria-label="Technologies">{project.stack.map(item=><li key={item}>{item}</li>)}</ul>
     <div className="project-links">{project.links.map(link=><External key={link.href} href={link.href}>{link.label}</External>)}</div></div>
     <details className="project-details"><summary>Explore the engineering <span aria-hidden="true">+</span></summary><div className="case-study">{project.features.map(([label,text])=><div key={label}><h4>{label}</h4><p>{text}</p></div>)}{project.details.map(([label,text])=><div key={label}><h4>{label}</h4><p>{text}</p></div>)}</div></details>
     </div></motion.article>)}</AnimatePresence></motion.div>
   </section>
   <section id="experience" className="section"><SectionTitle number="02" eyebrow="Experience" title="Software meets real operations."/>
    <Reveal className="experience-row"><div><p className="eyebrow">Jan 2026 — Present</p><h3>Cognizant</h3><p className="muted">Chennai, India</p></div><div><h4>Programmer Analyst Trainee</h4><ul className="prose-list"><li>Configure and integrate Temenos Transact T24 and Transact AI COB environments; handle Close of Business operations.</li><li>Provision virtual machines and manage Azure and AWS resources, including allocation and cost optimisation.</li><li>Work with Azure Virtual Machine Scale Sets and Microsoft Foundry for cloud environment setup and resource management.</li></ul></div></Reveal>
    <Reveal className="experience-row"><div><p className="eyebrow">Sep 2023 — Feb 2024</p><h3>Grownity</h3></div><div><h4>Application Developer Intern</h4><p>Worked on the mobile application using Flutter and Dart, developing frontend interfaces and contributing to the website with the team.</p></div></Reveal>
   </section>
   <section id="skills" className="section"><SectionTitle number="03" eyebrow="Toolkit" title="The tools behind the work."/><div className="skills-grid">{skills.map(([label,text],i)=><Reveal key={label} delay={i*.06} className="skill-orbit-card"><span className="skill-card-number">0{i+1}</span><h3>{label}</h3><div className="skill-chips">{text.split(', ').map((s,j)=><span key={s} style={{'--chip':j}}>{s}</span>)}</div></Reveal>)}</div></section>
   <section id="credentials" className="section"><SectionTitle number="04" eyebrow="Beyond the code" title="A foundation in problem-solving."/><Reveal className="credential-grid">
    <div><h3>Achievements</h3><ul className="credential-list"><motion.li initial={reduce?false:{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.4}}><strong>Top 50 in India · Top 150 globally</strong><span>IEEE Xtreme 18.0</span></motion.li><motion.li initial={reduce?false:{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.4}}><strong>1st Prize</strong><span>Vegathon · VEGA Processor Hackathon, CDAC</span></motion.li><motion.li initial={reduce?false:{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.4}}><strong>4th Prize</strong><span>NULL VOID Coding Competition</span></motion.li><motion.li initial={reduce?false:{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.4}}><strong>Outstanding WIE Student Volunteer Award</strong><span>IEEE Delhi Section · 2024</span></motion.li></ul></div>
    <div><h3>Education & certifications</h3><ul className="credential-list"><motion.li initial={reduce?false:{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.4}}><strong>B.E. in Computer Science</strong><span>Chandigarh University · 2021–2025 · CGPA 8.02/10</span></motion.li><motion.li initial={reduce?false:{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.4}}><strong>Microsoft Certified: Azure Fundamentals</strong><span>AZ-900</span></motion.li><motion.li initial={reduce?false:{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.3}} transition={{duration:.4}}><strong>GitHub Copilot</strong><span>Certification</span></motion.li></ul><h3 className="leadership-title">Leadership</h3><p className="muted">Vice Chairperson, IEEE PES CUSB · Apr 2024–Jun 2025</p><p className="muted">Secretary, IEEE CS CUSB · Aug 2023–Mar 2024</p></div>
   </Reveal></section>
   <section id="contact" className="contact-section"><Reveal><p className="eyebrow">Let’s build something useful</p><h2>Have an SDE opportunity?<br/><em>Let’s talk.</em></h2><a className="contact-email" href="mailto:japneet.singh2024@gmail.com">japneet.singh2024@gmail.com <span aria-hidden="true">↗</span></a><div className="profile-links"><External href={linkedin}>LinkedIn</External><External href={github}>GitHub</External><a href="/Japneet_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↗</a></div></Reveal></section>
  </main><footer className="container footer"><span>Japneet Singh</span><span>Java. Cloud. Thoughtful software.</span><a href="#home">Back to top ↑</a></footer>
 </>;
}
