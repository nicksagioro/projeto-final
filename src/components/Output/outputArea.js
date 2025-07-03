import React from 'react';
import styles from './outputArea.module.css';

function OutputArea({ output }) {
  return (
    <div className={styles.App}>
      <main>
        <div className={`${styles['output-area']} ${output ? styles['has-content'] : ''}`}>
          {output && <pre>{output}</pre>}
        </div>
      </main>
    </div>
  );
}

export default OutputArea;
