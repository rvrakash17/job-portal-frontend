import { SimpleGrid,Container } from '@mantine/core';
import JobCard from './JobCard';

export default function JobList({ jobs }: { jobs: any[] }) {
  return (
    <Container size="90%" py="3%">
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="xl"
      >
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </SimpleGrid>
    </Container>
  );
}