//Student Name: Janice Oh Shi Ting Student Number: S10269334
"use client";

export default function CovidOverviewPage() {
    return (
      <div style={{ backgroundColor: 'white', padding: '20px', minHeight: '100vh' }}>
        {/* Header Section */}
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>
            Covid-19 Overview
          </h3>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#333', margin: '20px 0' }}>
            What is Covid-19?
          </h1>
          <p style={{ textAlign: 'center',fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Coronavirus disease 2019 (COVID-19) is an infectious disease that was caused by the SARS-CoV-2 virus, which stands for severe acute respiratory syndrome coronavirus 2. 
            

          </p>
        </header>
  
        {/* content section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/*image of healthcare*/}
          <div>
            <img 
              src="/healthcare.webp" 
              alt="Global Impact" 
              style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%' }}
            />
          </div>
  
          {/* Text Content */}
          <div>
            <h3 style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>
              Understanding the Origin
            </h3>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginTop: '10px', marginBottom: '20px' }}>
              Global Impact and Significance
            </h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              The COVID-19 pandemic has significantly influenced economies, healthcare systems, and societies worldwide. Learn about the impact and ongoing efforts to control the spread and protect communities.
            </p>
          </div>
        </section>
      </div>
    );
  } 
  
