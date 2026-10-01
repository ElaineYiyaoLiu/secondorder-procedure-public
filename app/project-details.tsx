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
        {zh ? <p>这个模型把诉讼程序写成一个由<strong>幂零算子（nilpotent operator）</strong>驱动的有限程序系统，用数学结构表示不同程序动作怎样把案件从一个状态推进到下一个状态。幂零结构让程序影响沿有限层级向后传播，再结合路径依赖的信息增益、成本和时间，以及 <strong>Pareto frontier（帕累托前沿）</strong>，分析程序顺序的变化会怎样改变案件后面的路径。</p> : <p>This model represents litigation procedure as a finite system driven by a <strong>nilpotent operator</strong>, using mathematical structure to describe how procedural actions move a case from one state to the next. The nilpotent structure keeps those effects propagating through a finite sequence, while path-dependent information gain, cost, time, and a <strong>Pareto frontier</strong> show how changing the order of procedure can change the path that follows.</p>}
      </section>
    </details>
  );
}
