import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/posts/${searchTerm}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
    }
    setLoading(false);
  };

  
  const filteredJobs = jobs.filter(job =>
    job.techs.includes('java') || job.profile.toLowerCase().includes('java')
  );

  return (
    <div className="App">
      <h1 className='text-4xl px-2 py-8'>Job Portal</h1>
      <div className="search-container">
        <input
          className=' border round shadow space-x-2 mb-2 px-2 py-2'
          type="text"
          placeholder="Search for a job..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
        className='bg-gray-900 text-white px-2 py-2'
        onClick={handleSearch}>Search</button>
      </div>
      <div className="job-list-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredJobs.map(job => (
            <div className="job-list" key={job.profile} style={{ width: '45%', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', margin: '1%' }}>
              <h3 className='text-2xl Bold uppercase text-center px-2 text-gray-600' >{job.profile}</h3>
              <p className='text-gray-500'>Description: {job.desc}</p>
              <p className='text-gray-500'>Experience: {job.exp} years</p>
              <p className='text-gray-500'>Technologies: {job.techs.join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;