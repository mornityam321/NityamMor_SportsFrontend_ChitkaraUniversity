import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDataContext } from './DataContext';
import { Link } from 'react-router-dom'; 
import Charts from './Charts'; 

import './NewsDashboard.css';

const NewsDashboard = () => {
  const { articles, setArticles } = useDataContext(); 
  const [filters, setFilters] = useState({ author: '', dateRange: '', type: '' });

  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=technology&apiKey=82d81e3274d84b578fb60bfcb2aeb33b')
      .then(response => setArticles(response.data.articles))
      .catch(error => console.error(error));
  }, [setArticles]);

  const filteredArticles = articles.filter(article => {
    return (
      (filters.author ? article.author && article.author.includes(filters.author) : true) &&
      (filters.dateRange ? article.publishedAt.includes(filters.dateRange) : true) &&
      (filters.type ? article.title && article.title.includes(filters.type) : true)
    );
  });

  return (
    <div className="news-dashboard">
      <h1>News Dashboard</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by author"
          value={filters.author}
          onChange={(e) => setFilters({ ...filters, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by date range"
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by type"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        />
      </div>

      

      

      <div className="article-list">
        {filteredArticles.length === 0 ? (
          <p>No articles found</p>
        ) : (
          filteredArticles.map((article, index) => (
            <div key={index} className="article-card">
              <img src={article.urlToImage} alt={article.title} className="article-image" />
              <h3>{article.title}</h3>
              <p className="author">By: {article.author}</p>
              <p className="published">Published: {article.publishedAt}</p>
              <p>{article.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsDashboard;
