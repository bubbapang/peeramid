import { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import './FeedItem.css';

  function FormDrawer({ onClose, visible, closing, post }) {
    return (
      <div className={`form-drawer${visible ? ' visible' : ''}${closing ? ' closing' : ''}`}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>

        <h2>{post.user.username}</h2>
        {/* Your form content goes here */}
        <div className="form-drawer-content">
            {/* input text box and label to send a suggestion */}
            <div className="form-drawer-input">
                <label htmlFor="suggestion">Suggestion</label>
                <input type="text" id="suggestion" name="suggestion" placeholder="Enter a suggestion" />
                <button className="form-drawer-button">Send</button>
            </div>
        </div>  
        
      </div>
    );
  }
  

  export default function FeedItem({ post }) {
    const [showFormDrawer, setShowFormDrawer] = useState(true);

    const [formDrawerClosing, setFormDrawerClosing] = useState(false);
    const chartRef = useRef(null);
    const [formDrawerVisible, setFormDrawerVisible] = useState(false);
   
    const [activeDiv, setActiveDiv] = useState(null);

  // const toggleFormDrawer = (divName) => {
  //   setActiveDiv(divName === activeDiv ? null : divName);
  //   setFormDrawerVisible(divName !== activeDiv);
  // };


    const toggleFormDrawer = (divName) => {
      if (divName !== activeDiv) {
        setActiveDiv(divName);
        setFormDrawerVisible(true);
      } else {
        setActiveDiv(null);
        setFormDrawerVisible(false);
      }
    };
    
    const handleOutsideClick = (e) => {
      if (formDrawerVisible && !e.target.closest('.form-drawer') && !e.target.closest('.highlight') && !e.target.closest('.lowlight')) {
        setFormDrawerVisible(false);
        setActiveDiv(null);
      }
    };
    
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [formDrawerVisible]);

  const backgroundColors = [
    'rgba(255, 99, 32, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(153, 102, 255, 0.8)',
    'rgba(54, 162, 235, 0.8)', 'rgba(201, 203, 07, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(255, 99, 132, 0.8)',
  ];

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    const chartCanvas = document.getElementById(`chart-${post.user.id}`);
    const scores = Object.values(post.ratings);
    const chartColors = backgroundColors.slice(0, scores.length);

    const chartConfig = {
      type: 'doughnut',
      data: {
        labels: ["Physiology", "Safety", "Love", "Esteem", "Cognition", "Self-actualization", "Self-transcendence", "Self-acceptance"],
        datasets: [{ label: '', data: scores, fill: true, backgroundColor: chartColors, borderColor: chartColors }],
      },
      options: {
        cutout: '55%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (context) => `${chartConfig.data.labels[context.dataIndex]}: ${chartConfig.data.datasets[0].data[context.dataIndex]}` },
            position: 'nearest', backgroundColor: 'rgba(0, 0, 0, 0.8)', titleFont: { size: 14 }, bodyFont: { size: 14 }, padding: 10, zIndex: 10000,
          },
          hover: { mode: 'nearest', intersect: true },
        },
      },
    };
    chartRef.current = new Chart(chartCanvas, chartConfig);
  }, [post.user.id, post.ratings]);

  return (
    <div className="feed-item-container">
      <div className="feed-item-info">
      <h1>{post.user.username}</h1>
      <i id="profile-picture" className="fas fa-user-circle"></i>
      <canvas className="chart" id={`chart-${post.user.id}`}></canvas>
      </div>
      <div className='lights-container'>
        <div
          className="highlight"
          onClick={() => toggleFormDrawer('highlight')}
        >
          <h3>{post.user.username}'s highlight today was:</h3>
        </div>

        <div
          className="lowlight"
          onClick={() => toggleFormDrawer('lowlight')}
        >
              {/* add conditional here to check if there was a lowlight */}
              <h3> {post.user.username}'s lowlight today was:  </h3>
            </div>
          </div>
          <FormDrawer onClose={() => setFormDrawerVisible(false)} visible={formDrawerVisible} post={post} />
      </div>
    );
  }