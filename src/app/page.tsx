'use client';

import { Button, Center } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <Center style={{ flexDirection: 'column', height: '100vh' }}>
      <h1>Welcome to Job Portal Admin</h1>
      <Button
        component={Link}
        href="/jobs"
        mt="md"
        radius="xl"
        size="md"
        variant="gradient"
        gradient={{ from: '#A128FF', to: '#6100AD', deg: 180 }}
      >
        Go to Jobs
      </Button>
    </Center>
  );
}
