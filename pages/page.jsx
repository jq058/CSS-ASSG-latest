"use client";
//Student Name: Janice Oh Shi Ting Student Number: S10269334
import CovidOverviewPage from '/components/Overview';  //import overview page
import TableOfContentsPage from '/components/TableofContents'; //import table of contents

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minHeight: '100vh' }}>
      <CovidOverviewPage />
      <TableOfContentsPage />
    </div>
  );
}


