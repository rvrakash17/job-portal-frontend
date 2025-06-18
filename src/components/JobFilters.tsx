'use client';

import {
  Box,
  Divider,
  Flex,
  Group,
  RangeSlider,
  Select,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { IconMapPin, IconSearch } from '@tabler/icons-react';

export default function JobFilters({ filters, setFilters }: any) {
  return (
    <Flex
      justify="space-between"
      align="center"
      gap="md"
      wrap="nowrap"
      px="5%"
      py="sm"
    >

      <TextInput
        placeholder="Search By Job Title, Role"
        value={filters.title}
        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        leftSection={<IconSearch size={16} color="#686868" />}
        styles={{
          input: {
            border: 'none',
            boxShadow: 'none',
            fontSize: rem(14),
            fontFamily: 'Satoshi Variable',
            color: '#686868',
            '::placeholder': {
              color: '#686868',
              opacity: 1,
            },
          },
        }}
      />

      <Divider
        orientation="vertical"
        style={{
          height: '48px',
          alignSelf: 'center',
          borderWidth: '0 0 0 2px',
          borderColor: '#EAEAEA',
          borderStyle: 'solid',
        }}
      />

      <TextInput
        placeholder="Preferred Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        leftSection={<IconMapPin size={16} color="#686868" />}
        styles={{
          input: {
            border: 'none',
            boxShadow: 'none',
            fontSize: rem(14),
            fontFamily: 'Satoshi Variable',
            color: '#686868',
            '::placeholder': {
              color: '#686868',
              opacity: 1,
            }
          },
        }}
      />
      <Divider
        orientation="vertical"
        style={{
          height: '48px',
          alignSelf: 'center',
          borderWidth: '0 0 0 2px',
          borderColor: '#EAEAEA',
          borderStyle: 'solid',
        }}
      />
      <Select
        placeholder="Job type"
        data={['FullTime', 'PartTime', 'Contract', 'Internship']}
        value={filters.jobType}
        onChange={(value) => setFilters({ ...filters, jobType: value })}
        leftSection={
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 17C13 14.7909 10.3137 13 7 13C3.68629 13 1 14.7909 1 17M14.8281 3.17188C15.1996 3.54331 15.4942 3.98427 15.6952 4.46957C15.8962 4.95487 15.9999 5.47533 15.9999 6.00062C15.9999 6.52591 15.8963 7.04497 15.6953 7.53027C15.4943 8.01558 15.1996 8.45705 14.8281 8.82848M17 1C17.6566 1.65661 18.1775 2.43612 18.5328 3.29402C18.8882 4.15192 19.0718 5.07127 19.0718 5.99985C19.0718 6.92844 18.8886 7.84815 18.5332 8.70605C18.1778 9.56396 17.6566 10.3435 17 11.0001M7 10C4.79086 10 3 8.20914 3 6C3 3.79086 4.79086 2 7 2C9.20914 2 11 3.79086 11 6C11 8.20914 9.20914 10 7 10Z"
              stroke="#686868"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }

        styles={{
          input: {
            border: 'none',
            boxShadow: 'none',
            fontSize: rem(14),
            fontFamily: 'Satoshi Variable',
            color: '#686868',
            '::placeholder': {
              color: '#686868',
              opacity: 1,
            }
          },
        }}
        rightSectionWidth={30}
      />

      <Divider
        orientation="vertical"
        style={{
          height: '48px',
          alignSelf: 'center',
          borderWidth: '0 0 0 2px',
          borderColor: '#EAEAEA',
          borderStyle: 'solid',
        }}
      />

      <Box w={350}>
        <Group justify="space-between" mt={5}>
          <Text size="rem(14)" fw={500} mb={5} style={{ fontFamily: 'Satoshi Variable' }}>
            Salary Per Month
          </Text>
          <Text size="rem(14)" fw={500} mb={5} style={{ fontFamily: 'Satoshi Variable' }}>
            ₹{filters.salaryRange[0] / 1000}k
            -
            ₹{filters.salaryRange[1] / 1000}k
          </Text>
        </Group>
        <RangeSlider
          min={0}
          max={200000}
          step={5000}
          value={filters.salaryRange}
          onChange={(value) => setFilters({ ...filters, salaryRange: value })}
          label={(val) => `₹${val / 1000}k`}
          thumbSize={14}
          color="dark"
          styles={{
            track: { height: 2 },
            bar: { backgroundColor: '#000' },
            thumb: {
              border: '4px solid #000',
              width: 14,
              height: 14,
            },
          }}
        />

      </Box>
    </Flex>
  );
}
