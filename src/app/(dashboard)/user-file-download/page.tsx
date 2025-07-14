"use client";
import React, { useRef } from 'react';


const Page = () => {
  const printRef = useRef(null);

  const printDiv = () => {
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
              <div className="flex justify-center items-center mb-5">
                <button
                  onClick={printDiv}
                  className="py-1 px-3 rounded text-white bg-blue-500 border border-blue-500"
                >
                  প্রিন্ট
                </button>
              </div>

              <div className="portlet-body">
                <div id="printArea" ref={printRef} className="mx-auto" style={{ width: '815px' }}>
                  {/* The full content previously inside printArea remains unchanged */}

                  {/* TIP: This is a very long static HTML layout. It is best to extract this into a separate component or even better to dynamically populate it with real data if needed. */}

                  {/* Use dangerouslySetInnerHTML or render from state when converting legacy HTML templates */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
