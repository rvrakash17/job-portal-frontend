'use client';

import {
  Button,
  TextInput,
  Textarea,
  Select,
  Group,
  Stack,
  Modal,
  Grid,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import axios from 'axios';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import {
  IconCalendar,
  IconArrowsUpDown,
  IconChevronsDown,
  IconChevronsRight,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';

type JobFormValues = {
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  minSalary: string;
  maxSalary: string;
  applicationDeadline: string;
  jobDescription: string;
};

type JobFormProps = {
  onSuccess?: () => void;
};

export type JobFormRef = {
  open: () => void;
  close: () => void;
};

const JobForm = forwardRef<JobFormRef, JobFormProps>(({ onSuccess }, ref) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<JobFormValues>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      companyName: '',
      location: '',
      jobType: '',
      minSalary: '',
      maxSalary: '',
      applicationDeadline: '',
      jobDescription: '',
    },
  });

  const jobType = watch('jobType');
  const applicationDeadline = watch('applicationDeadline');

  useEffect(() => {
    register('applicationDeadline', {
      required: 'Deadline is required',
    });
  }, [register]);

  useImperativeHandle(ref, () => ({
    open: () => setOpened(true),
    close: () => setOpened(false),
  }));

  const onSubmit = async (data: JobFormValues) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        minSalary: Number(data.minSalary),
        maxSalary: Number(data.maxSalary),
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.post(`${apiUrl}/jobs`, payload);

      notifications.show({
        title: 'Success',
        message: 'Job has been successfully posted!',
        color: 'green',
        icon: <IconCheck size={18} />,
        autoClose: 3000,
        withCloseButton: true,
      });

      reset();
      setOpened(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      notifications.show({
        title: 'Error',
        message: 'Failed to post the job. Please try again.',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 3000,
        withCloseButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    notifications.show({
      title: 'Draft Saved',
      message: 'Your job has been saved as a draft.',
      color: 'blue',
      icon: <IconInfoCircle size={18} />,
      autoClose: 3000,
      withCloseButton: true,
    });
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Job Opening"
      centered
      size="xl"
      withCloseButton={false}
      styles={{
        content: {
          borderRadius: 16,
          paddingBottom: 80,
          overflow: 'visible',
        },
        title: {
          width: '100%',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 24,
          lineHeight: 1,
        },
      }}
      scrollAreaComponent={(props) => <div {...props} />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Job Title"
                placeholder="e.g. Full Stack Developer"
                {...register('title', { required: 'Job title is required' })}
                error={errors.title?.message}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Company Name"
                placeholder="e.g. Amazon"
                {...register('companyName', { required: 'Company name is required' })}
                error={errors.companyName?.message}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Location"
                placeholder="e.g. Chennai"
                {...register('location', { required: 'Location is required' })}
                error={errors.location?.message}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Controller
                name="jobType"
                control={control}
                rules={{ required: 'Job type is required' }}
                render={({ field }) => (
                  <Select
                    label="Job Type"
                    data={[
                      { value: 'FullTime', label: 'Full Time' },
                      { value: 'PartTime', label: 'Part Time' },
                      { value: 'Contract', label: 'Contract' },
                      { value: 'Internship', label: 'Internship' },
                    ]}
                    placeholder="Select Job Type"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    error={errors.jobType?.message}
                    allowDeselect={false}
                    withCheckIcon={false}
                  />
                )}
              />
            </Grid.Col>

          </Grid>

          <Grid>
            <Grid.Col span={4}>
              <TextInput
                label="Min Salary (₹)"
                type="number"
                placeholder="₹0"
                leftSection={<IconArrowsUpDown size={16} />}
                {...register('minSalary', {
                  required: 'Min salary is required',
                  min: { value: 0, message: 'Must be 0 or greater' },
                })}
                error={errors.minSalary?.message}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Max Salary (₹)"
                type="number"
                placeholder="₹12,00,000"
                leftSection={<IconArrowsUpDown size={16} />}
                {...register('maxSalary', {
                  required: 'Max salary is required',
                  min: { value: 0, message: 'Must be 0 or greater' },
                  validate: (value) =>
                    Number(value) >= Number(watch('minSalary')) ||
                    'Max salary must be >= Min salary',
                })}
                error={errors.maxSalary?.message}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <DateInput
                label="Application Deadline"
                placeholder="Pick a date"
                rightSection={<IconCalendar size={16} />}
                onChange={(value) =>
                  setValue('applicationDeadline', dayjs(value).toISOString(), {
                    shouldValidate: true,
                  })
                }
                value={
                  applicationDeadline ? new Date(applicationDeadline) : null
                }
                error={errors.applicationDeadline?.message}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            label="Job Description"
            placeholder="Describe the job role"
            autosize
            minRows={3}
            {...register('jobDescription', {
              required: 'Description is required',
              minLength: { value: 10, message: 'Minimum 10 characters' },
            })}
            error={errors.jobDescription?.message}
          />
        </Stack>

        <Group
          justify="space-between"
          mt="xl"
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            right: 24,
          }}
        >
          <Button
            variant="outline"
            size="md"
            radius="md"
            onClick={handleSaveDraft}
            rightSection={<IconChevronsDown size={16} />}
            style={{
              borderColor: '#000000',
              color: '#000000',
              padding: '8px 24px',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Save Draft
          </Button>

          <Button
            type="submit"
            size="md"
            radius="md"
            loading={loading}
            disabled={loading}
            style={{
              backgroundColor: '#007BFF',
              color: '#fff',
              padding: '8px 24px',
              fontWeight: 600,
              fontSize: 16,
            }}
            rightSection={<IconChevronsRight size={16} />}
          >
            Publish
          </Button>
        </Group>
      </form>
    </Modal>
  );
});

JobForm.displayName = 'JobForm';
export default JobForm;
