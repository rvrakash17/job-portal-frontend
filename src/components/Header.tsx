import { Paper, Group, Button, Image } from '@mantine/core';
import Link from 'next/link';
import { RefObject } from 'react';
import { JobFormRef } from './JobForm';

const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Find Jobs', href: '/jobs' },
    { label: 'Find Talents', href: '/talents' },
    { label: 'About Us', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
];

type HeaderProps = {
    formRef: RefObject<JobFormRef | null>;
    onSuccess: () => void;
};

export default function Header({ formRef }: HeaderProps) {
    return (
        <Paper
            shadow="md"
            radius={122}
            p="xl"
            style={{
                background: '#fff',
                border: '2px solid #fcfcfc',
                width: 890,
                height: 80,
                boxShadow: '0px 0px 20px 0px #7F7F7F26',
                margin: '16px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
            }}
        >

            <Image src="/logo.svg" alt="Logo" width={44} height={44} fit="contain" style={{ width: 44, height: 44 }} />

            <Group gap={0}>
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        passHref
                        style={{
                            width: 120,
                            height: 38,
                            padding: '8px 24px',
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            backgroundColor: 'transparent',
                            color: '#303030',
                            fontFamily: 'Satoshi Variable',
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translate(3px, 3px) scale(1.03)';
                            e.currentTarget.style.boxShadow = '4px 6px 12px rgba(0, 0, 0, 0.15)';
                            e.currentTarget.style.borderRadius = '14px';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translate(0px, 0px) scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderRadius = '10px';
                        }}
                    >
                        {item.label}
                    </Link>

                ))}
            </Group>

            <Button
                onClick={() => formRef.current?.open()}
                styles={{
                    root: {
                        background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)',
                        width: 123,
                        height: 38,
                        borderRadius: 30,
                        padding: '8px 24px',
                        fontSize: 16,
                        fontWeight: 600,
                        fontFamily: 'Satoshi Variable',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                    },
                }}
            >
                Create Jobs
            </Button>
        </Paper>
    );
}
