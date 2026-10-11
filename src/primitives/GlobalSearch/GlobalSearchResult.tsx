import React from 'react';
import type { GlobalSearchResultData } from './GlobalSearch';
import styles from './GlobalSearch.module.css';

interface GlobalSearchResultProps {
  result: GlobalSearchResultData;
  active: boolean;
}

const GlobalSearchResult: React.FC<GlobalSearchResultProps> = ({ result, active }) => {
  return (
    <div className={`${styles.result} ${active ? styles.resultActive : ''}`}>
      {result.icon && <span className={styles.resultIcon}>{result.icon}</span>}
      <div className={styles.resultContent}>
        <span className={styles.resultTitle}>{result.title}</span>
        {result.description && (
          <span className={styles.resultDescription}>{result.description}</span>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchResult;
