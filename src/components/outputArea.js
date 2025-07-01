return (
  <div className="app">
    <main>
      <div className={`output-area ${output ? 'has-content' : ''}`}>
        {output && <pre>{output}</pre>}
      </div>
    </main>
  </div>
);
