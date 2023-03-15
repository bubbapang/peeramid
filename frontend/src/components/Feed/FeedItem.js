import './FeedItem.css';
import {useRef, useEffect} from 'react';
import Chart from 'chart.js/auto';

export default function FeedItem({post}) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }
    const chartCanvas = document.getElementById(`chart-${post.user.id}`);
    const chartConfig = {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          label: 'Avg Ratings',
          data: [85, 69, 90, 81, 86, 75, 80, 72],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
      },
      options: {}
    };
    chartRef.current = new Chart(chartCanvas, chartConfig);
  }, [post.user.id]);

  return (
    <div className="feed-item-container">
      <h1>{post.user.username}</h1>
      <div className="feed-item-info">
        {/* <img className="profile-picture" src={post.user.profilePic} alt="profile-pic" /> */}
        <i id="profile-picture" class="fas fa-user-circle"></i>
        
        <canvas className="chart" id={`chart-${post.user.id}`}></canvas>
      </div>
    </div>
  );
}
