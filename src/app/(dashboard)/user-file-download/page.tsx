"use client";
import React, { useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const PageContent = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const printDiv = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };


  return (
    <div className="page-container">
      <div className="page-content">
        <div className="row">
          <div className="col-md-12">
            <div className="portlet box blue">
              {/* <div className="flex justify-center items-center mb-5">
                <button
                  onClick={printDiv}
                  className="py-1 px-3 rounded text-white bg-blue-500 border border-blue-500"
                >
                  প্রিন্ট
                </button>
              </div> */}

              <div className="portlet-body">
                {/* <div
                  id="printArea"
                  ref={printRef}
                  className="mx-auto"
                  style={{ width: '815px' }}
                  dangerouslySetInnerHTML={{ __html: receiptHtml }}
                /> */}
                <iframe
                  src="index.html"
                  title="Embedded HTML"
                  style={{ width: '100%', height: '100vh', border: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
};

export default Page;
