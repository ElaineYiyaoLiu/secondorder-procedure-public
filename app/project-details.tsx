'use client';

export default function ProjectDetails({ zh }: { zh: boolean }) {
  return (
    <details className="project-details" onKeyDown={event => {
      if (event.key === 'Escape') {
        event.currentTarget.removeAttribute('open');
        event.currentTarget.querySelector('summary')?.focus();
      }
    }}>
      <summary><span>{zh ? '项目详情' : 'Project details'}</span><span className="details-chevron" aria-hidden="true">⌄</span></summary>
      <section className="project-details-panel" aria-label={zh ? 'Procedure 项目详情' : 'Procedure project details'}>
        <h2>Procedure</h2>
        {zh ? <p>Procedure 比较开示、证言录取和动议的不同顺序，计算对应的信息、费用与时长。工作台使用五维 <strong>Heisenberg 群 H₅</strong>：四个动作方向共享一个中心方向。Method 给出定义、推导、计算实例，以及这些假设需要怎样检验。</p> : <p>Procedure compares the order of discovery, depositions and motions, then calculates information, cost and duration. It uses the five-dimensional <strong>Heisenberg group H₅</strong>, with four action directions and one shared central direction. Method gives the definitions, derivations, worked calculations and tests these assumptions need.</p>}
      </section>
    </details>
  );
}

