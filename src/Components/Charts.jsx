import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'; // Import necessary components from Chart.js

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Charts = ({ articles }) => {
  const [chartData, setChartData] = useState({
    typeLabels: [],
    typeData: [],
    authorLabels: [],
    authorData: [],
  });

  useEffect(() => {
    if (articles && articles.length > 0) {
      generateChartData(articles);
    }
  }, [articles]);

  const generateChartData = (articles) => {
    const typeCount = {};
    const authorCount = {};

    articles.forEach((article) => {
      const type = article.title.includes('blog') ? 'Blog' : 'News'; // Categorize by type
      typeCount[type] = (typeCount[type] || 0) + 1;

      const author = article.author || 'Unknown Author'; // Count by author
      authorCount[author] = (authorCount[author] || 0) + 1;
    });

    const typeLabels = Object.keys(typeCount);
    const typeData = Object.values(typeCount);

    const authorLabels = Object.keys(authorCount);
    const authorData = Object.values(authorCount);

    setChartData({
      typeLabels,
      typeData,
      authorLabels,
      authorData,
    });
  };

  return (
    <div className="chart-container">
      <h3>Article Trends</h3>

      <div className="chart">
        <h4>Article Counts by Type (Bar)</h4>
        <Bar
          data={{
            labels: chartData.typeLabels,
            datasets: [
              {
                label: 'Article Counts by Type',
                data: chartData.typeData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Article Counts by Type',
              },
              legend: {
                position: 'top',
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="chart">
        <h4>Article Counts by Type (Pie)</h4>
        <Pie
          data={{
            labels: chartData.typeLabels,
            datasets: [
              {
                label: 'Article Counts by Type',
                data: chartData.typeData,
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Article Counts by Type',
              },
              legend: {
                position: 'top',
              },
            },
          }}
        />
      </div>

      <div className="chart">
        <h4>Article Counts by Author (Bar)</h4>
        <Bar
          data={{
            labels: chartData.authorLabels,
            datasets: [
              {
                label: 'Article Counts by Author',
                data: chartData.authorData,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Article Counts by Author',
              },
              legend: {
                position: 'top',
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="chart">
        <h4>Article Counts by Author (Pie)</h4>
        <Pie
          data={{
            labels: chartData.authorLabels,
            datasets: [
              {
                label: 'Article Counts by Author',
                data: chartData.authorData,
                backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
                borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Article Counts by Author',
              },
              legend: {
                position: 'top',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Charts;
