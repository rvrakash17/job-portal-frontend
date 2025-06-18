'use client';
import { useEffect, useRef, useState } from 'react';
import JobFilters from '@/components/JobFilters';
import JobForm, { JobFormRef } from '@/components/JobForm';
import axios from 'axios';
import { Paper } from '@mantine/core';
import Header from '@/components/Header';
import JobList from '@/components/JobList';

export default function JobListPage() {
  
  const [jobs, setJobs] = useState([]);
  
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryRange: [0, 80000],
  });
  
  const formRef = useRef<JobFormRef | null>(null);

  const fetchJobs = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await axios.get(`${apiUrl}/jobs`,{
        params: {
          title: filters.title,
          location: filters.location,
          jobType: filters.jobType,
          salaryMin: filters.salaryRange[0],
          salaryMax: filters.salaryRange[1],
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div>
      <Paper
        shadow="md"
        p="md"
        style={{
          background: '#fff',
          width: '100%',
          position: 'relative',
          top: 0,
          zIndex: 10,
        }}
      >
        <Header formRef={formRef} onSuccess={fetchJobs} />
        <JobFilters filters={filters} setFilters={setFilters} />
      </Paper>
      <JobList jobs={jobs} />
      <JobForm ref={formRef} onSuccess={fetchJobs} />
    </div>
  );
}
