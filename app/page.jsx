"use client";
import CovidOverviewPage from './components/Overview';
import TableOfContentsPage from './components/TableofContents';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh' }}>
      <CovidOverviewPage />
      <TableOfContentsPage />

    </div>
  );
}


