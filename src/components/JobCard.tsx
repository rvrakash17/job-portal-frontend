'use client';

import {
  Card,
  Text,
  Group,
  Button,
  Avatar,
  Box
} from '@mantine/core';
import {
  IconUser,
  IconBriefcase,
  IconCurrencyRupee
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function JobCard({ job }: { job: any }) {
  const [relativeTime, setRelativeTime] = useState('');

  useEffect(() => {
    const now = dayjs();
    const created = dayjs.utc(job.createdAt).tz('Asia/Kolkata');
    const diffMinutes = now.diff(created, 'minute');
    const diffHours = now.diff(created, 'hour');
    const diffDays = now.diff(created, 'day');

    let formatted = '';
    if (diffMinutes < 60) {
      formatted = `${diffMinutes}m Ago`;
    } else if (diffHours < 24) {
      formatted = `${diffHours}h Ago`;
    } else {
      formatted = `${diffDays}d Ago`;
    }

    setRelativeTime(formatted);
  }, [job.createdAt]);

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="lg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        background: 'rgba(255, 255, 255, 1)',
        width: '100%',
        maxHeight: 400,
        maxWidth: 350,
        boxShadow: '0px 0px 14px 0px rgba(211, 211, 211, 0.15)',

      }}
    >

      <Box
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: '#B0D9FF',
          color: '#000000',
          borderRadius: 10,
          padding: '7px 10px',
          fontSize: 14,
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 33,
          minWidth: 75,
          gap: 10,
          whiteSpace: 'nowrap',
        }}
      >
        {relativeTime || '24h Ago'}
      </Box>

      <Box style={{ flex: 1, overflow: 'hidden' }}>

        <Group mb="sm">
          <Avatar
          
            src={job.logo || undefined}
            styles={{
              root: {
                width: '83.464px',
                height: '82px',
                boxShadow: '10px 6px 9.25px -1px rgba(148, 148, 148, 0.25)',
                borderRadius: '13.18px', 
                border: '1px solid #ffffff',
                background: 'linear-gradient(180deg, #FEFEFD 0%, #F1F1F1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              image: {
                width: '65px',
                height: '65px',
                objectFit: 'contain',
              },
            }}
          />
        </Group>

        <Group mb="sm">
          <Box>
            <Text fw={600} size="lg" style={{ marginBottom: 4 }}>
              {job.title}
            </Text>
          </Box>
        </Group>

        <Group mb="xs" gap={12} justify="space-between">
          <Group gap={4}>
            <IconUser size={16} color="#6B7280" />
            <Text size="sm" color="gray.7">
              1-3 yr Exp
            </Text>
          </Group>
          <Group gap={4}>
            <IconBriefcase size={16} color="#6B7280" />
            <Text size="sm" color="gray.7">
              {job.jobType}
            </Text>
          </Group>
          <Group gap={4}>
            <IconCurrencyRupee size={16} color="#6B7280" />
            <Text size="sm" color="gray.7">
              {job.maxSalary < 100000
                ? (job.maxSalary / 100000).toFixed(2) + ' LPA'
                : (job.maxSalary / 100000).toFixed(0) + ' LPA'}
            </Text>

          </Group>
        </Group>

        <Box
          mt="xs"
          style={{
            maxHeight: 120,
            overflowY: 'auto',
          }}
          className="thin-scroll"
        >
          <ul style={{ paddingLeft: 16, margin: 0 }}>
            {job.jobDescription
              ?.split('\n')
              .filter((line: string) => line.trim() !== '')
              .map((line: string, index: number) => (
                <li
                  key={index}
                  style={{
                    fontSize: 13,
                    color: '#4B5563',
                    marginBottom: 4,
                  }}
                >
                  {line.trim()}
                </li>
              ))}
          </ul>
        </Box>
      </Box>

      <Button
        fullWidth
        mt="md"
        radius="md"
        color="blue"
        style={{
          backgroundColor: '#0096FF',
          fontWeight: 600,
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        Apply Now
      </Button>
    </Card>
  );
}
