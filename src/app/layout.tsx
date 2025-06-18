'use client';

import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider defaultColorScheme="light" theme={{
          fontFamily: 'Satoshi, sans-serif',
        }}>
         <Notifications position="bottom-left" />
          <DatesProvider
            settings={{ locale: 'en', firstDayOfWeek: 0 }}
          >
            {children}
          </DatesProvider>
      </MantineProvider>
    </body>
    </html >
  );
}
