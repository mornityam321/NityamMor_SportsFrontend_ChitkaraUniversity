import React from 'react';
import { useDataContext } from './DataContext'; 
import Charts from './Charts';

const Analytics = () => {
  const { articles } = useDataContext(); 

  if (articles.length === 0) {
    return <p>No articles available to display analytics.</p>;
  }

  return (
    <div className="analytics-page">
      <h1>Analytics</h1>
      <p>Here are the article trends by type and author:</p>

      <Charts articles={articles} />
    </div>
  );
};

export default Analytics;
