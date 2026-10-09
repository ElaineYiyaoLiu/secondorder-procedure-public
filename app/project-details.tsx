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
        {zh ? <p>Procedure 将 <strong>Heisenberg 模型</strong>应用到程序路径比较：默认的 H₅ 是二阶 <strong>nilpotent（幂零）</strong>群，四个动作方向共享一个中心项，用来保留动作顺序。工作台据此计算信息、费用和时间情景，并在有限候选中比较保留信息的较低负担路径。动作映射和参数仍为假设，Method 详细说明其应用、限制及需要完成的实证检验。</p> : <p>Procedure uses the <strong>Heisenberg model</strong> to procedural path comparison. The default H₅ is a step-2 <strong>nilpotent</strong> group: four action directions share one central term that retains order. The workspace evaluates information, cost and time scenarios, then compares lower-burden paths within a finite candidate set. Action mappings and parameters remain assumptions; Method explains the application, limits and empirical tests still needed.</p>}
      </section>
    </details>
  );
}

