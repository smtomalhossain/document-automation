"use client";

import Image from 'next/image';
import React from 'react';
import LandTableGrid from '@/components/LandTableGrid';
import OwnerTableGrid from '@/components/OwnerTableGrid';

const LandTaxReceipt = () => {
  const handlePrint = () => {
    const printContents = document.getElementById('printArea').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    setTimeout(() => { }, 500);
    window.print();

    document.body.innerHTML = originalContents;
  };

  const tableData = [
    [
      { col1: "১", col2: "2591", col3: "চালা( কৃষি২)", col4: "70" },
      { col1: "২", col2: "2592", col3: "বাড়ি", col4: "50" },
      { col1: "5", col2: "3591", col3: "বাগান", col4: "60" }
    ],
    [
      { col1: "3", col2: "1591", col3: "চালা", col4: "40" },
      { col1: "4", col2: "1592", col3: "পুকুর", col4: "20" },
      

    ],
    
  ];

  const ownerTablesData = [
  [
    { col1: "১", col2: "কাজী মোতাহার হোসেন", col3: "১" },
    { col1: "২", col2: "মো. রাশেদ", col3: "২" },
    { col1: "৩", col2: "আবুল কাশেম", col3: "৪" },

  ],
  [
    { col1: "১", col2: "রুবিনা আক্তার", col3: "৩" },
    { col1: "২", col2: "আবুল কাশেম", col3: "৪" },
  ],
  
];



  return (
    
    <div className="page-container bg-[#f4ffe6]">
      <div className="page-content">
        <div className="row">
          <div className="col-md-12">
            <div className="portlet box blue">
             <div className='bg-white pb-1 mx-4 border-1 rounded-lg border-blue-500 mt-14'>
                    <div className="flex justify-center items-center mb-5 border-1 border-blue-500  p-1 rounded-t-lg bg-blue-500">
                    <button
                      onClick={handlePrint}
                      className="px-3 py-2 shadow-md cursor-pointer rounded-md text-white bg-blue-500"
                    >
                      প্রিন্ট
                    </button>
                    
                  </div>
                  </div>

              <div className="portlet-body">
                <div id="printArea" className="w-[815px] mx-auto">
                  <div className="col-md-12">
                    <style>
                      {`
                        @page {
                          size: a4;
                          margin: 0mm;
                        }
                        html {
                          background-color: #FFFFFF;
                          margin: 0px;
                        }
                        body {
                          border: solid 0px blue;
                          margin: 0mm;
                          font-family: "kalpurush", Arial, sans-serif;
                          font-size: 13px !important;
                          line-height: 1.2;
                          color: #333;
                        }
                        .dotted_botton {
                          border: none;
                          border-bottom: 1px dotted #000;
                          background-color: #fff;
                          width: 100%;
                          display: inline-block;
                        }
                        .border_none {
                          border-top: none !important;
                        }
                        .table-bordered {
                          border: 1px solid #ddd;
                        }
                        
                        .b1 {
                          border: 1px dotted;
                          padding: 2px;
                        }
                        .text-left {
                          text-align: left;
                        }
                        .text-right {
                          text-align: right;
                        }
                        .text-center {
                          text-align: center;
                        }
                        .receipt-container {
                          width: 7.9in;
                          height: 11in;
                          border-radius: 10px;
                          border: 1px dotted #000;
                          padding: 10px;
                          margin: 30px auto;
                          position: relative;
                          background-color: #fff;
                        }
                        .numeric_bangla {
                          font-family: "kalpurush", Arial, sans-serif;
                        }
                        .input_bangla {
                          font-family: "kalpurush", Arial, sans-serif;
                        }
                      `}
                    </style>

                    <div className="receipt-container">
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="text-left">বাংলাদেশ ফরম নং ১০৭৭</td>
                            <td className="text-right">(পরিশিষ্ট: ৩৮)</td>
                          </tr>
                          <tr>
                            <td className="text-left">(সংশোধিত)</td>
                            <td className="text-right input_bangla">ক্রমিক নং 338623014263</td>
                          </tr>
                          <tr>
                            <td className="text-center" colSpan={2}>
                              ভূমি উন্নয়ন কর পরিশোধ রসিদ
                            </td>
                          </tr>
                          <tr>
                            <td className="text-center" colSpan={2}>
                              (অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="w-full h-5"></div>
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="w-[320px]">সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম:</td>
                            <td className="dotted_botton">বরমী ইউনিয়ন ভূমি অফিস</td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="mt-1 w-full">
                        <tbody>
                          <tr>
                            <td className="w-[170px]">মৌজার নাম ও জে. এল. নং:</td>
                            <td className="dotted_botton input_bangla px-[5px]">গাড়ারণ-38</td>
                            <td className="w-[105px]">উপজেলা/থানা :</td>
                            <td className="dotted_botton px-[5px]">শ্রীপুর</td>
                            <td className="w-[40px]">জেলা:</td>
                            <td className="dotted_botton px-[5px]">গাজীপুর</td>
                          </tr>
                        </tbody>
                      </table>

                      <table className="mt-1 w-full">
                        <tbody>
                          <tr>
                            <td className="w-[225px]">
                              ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:
                            </td>
                            <td className="dotted_botton numeric_bangla pl-2.5">
                              2217
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="mt-1 w-full">
                        <tbody>
                          <tr>
                            <td className="w-[75px]">খতিয়ান নং:</td>
                            <td className="dotted_botton numeric_bangla pl-2.5">
                              602
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="h-2.5"></div>

                      <p className="font-bold text-xs text-center m-0 p-0">
                        <u>মালিকের বিবরণ</u>
                      </p>

                      {/* <table className="border border-dotted border-collapse my-2.5 mx-0.5 w-full text-xs">
                        <thead>
                          <tr>
                            <th className="b1 text-center w-[10%]">ক্রমঃ</th>
                            <th className="b1 text-center w-[60%]">মালিকের নাম</th>
                            <th className="b1 text-center w-[25%]">মালিকের অংশ</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="h-[21px]">
                            <td className="b1 input_bangla text-center">১</td>
                            <td className="b1 input_bangla">কাজী মোতাহার হোসেন</td>
                            <td className="b1 input_bangla text-center">১</td>
                          </tr>
                        </tbody>
                      </table> */}

                      <div className="">
      <OwnerTableGrid tables={ownerTablesData} />
    </div>

                      <p className="font-bold text-xs text-center m-0 p-0">
                        <u>জমির বিবরণ</u>
                      </p>

                       <div className="">
      <LandTableGrid tables={tableData} />
    </div>

                      <table className="border border-dotted border-collapse my-2.5 mx-0.5 w-full text-xs">
                        <tbody>
                          <tr>
                            <td className="b1 text-center w-1/2">সর্বমোট জমি (শতাংশ)</td>
                            <td className="b1 input_bangla w-1/2">70</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="h-2.5"></div>

                      <table className="border border-dotted border-collapse my-2.5 mx-0.5 w-full text-xs">
                        <tbody>
                          <tr className='border-b border-gray-300 hover:bg-gray-50'>
                            <th className="text-center p-3 border bg-gray-50 border-gray-300" colSpan={8}>
                              আদায়ের বিবরণ
                            </th>
                          </tr>
                          <tr className='"border-b border-gray-300 hover:bg-gray-50 "'>
                            <td className="text-center p-3 border border-gray-300">তিন বৎসরের ঊর্ধ্বের বকেয়া</td>
                            <td className="text-center p-3 border border-gray-300">গত তিন বৎসরের বকেয়া</td>
                            <td className="text-center p-3 border border-gray-300">বকেয়ার জরিমানা ও ক্ষতিপূরণ</td>
                            <td className="text-center p-3 border border-gray-300">হাল দাবি</td>
                            <td className="text-center p-3 border border-gray-300">মোট দাবি</td>
                            <td className="text-center p-3 border border-gray-300">মোট আদায়</td>
                            <td className="text-center p-3 border border-gray-300">মোট বকেয়া</td>
                            <td className="text-center p-3 border border-gray-300">মন্তব্য</td>
                          </tr>
                          <tr className="border-b border-gray-300 hover:bg-gray-50 bg-gray-50">
                            <td className="text-center p-3 border border-gray-300">৭৭০</td>
                            <td className="text-center p-3 border border-gray-300">৪২০</td>
                            <td className="text-center p-3 border border-gray-300">৩৬৫</td>
                            <td className="text-center p-3 border border-gray-300">১৪০</td>
                            <td className="text-center p-3 border border-gray-300">১,৬৯৫</td>
                            <td className="text-center p-3 border border-gray-300">১,৬৯৫</td>
                            <td className="text-center p-3 border border-gray-300">০</td>
                            <td className="text-center p-3 border border-gray-300"></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="w-full">
                        <p className="dotted_botton">
                          সর্বমোট (কথায়): এক হাজার ছয় শত পঁচানব্বই টাকা মাত্র ।
                        </p>
                      </div>

                      <div className="flex">
                        <div className="w-full">
                          <div className="flex">
                            {/* Left Section */}
                            <div className="w-[350px] float-left text-left">
                              <p className="mt-3">
                                নোট: সর্বশেষ কর পরিশোধের সাল - 2025-2026 (অর্থবছর)
                              </p>
                              <p className="font-bangla ">চালান নং :</p>
                              <p className='mt-2'>তারিখ :</p>
                              <div className="mt-[-25px] ml-[10px]">
                                <p className="w-[115px] p-0 m-0 ml-[38px] mb-[2px]">
                                  ২৬ আষাঢ় ১৪৩২
                                </p>
                                <span className="border-t border-black ml-[36px]">
                                  ১০ জুলাই ২০২৫
                                </span>
                              </div>
                            </div>

                            {/* QR Code Section */}
                            <div className="w-[90px] m-3 flex justify-center items-center">
                              <div className="w-[72px] h-[72px]">
                                <Image
                                  width={72}
                                  height={72}
                                  src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&amp;data=https://dakhila.ldtax.gov.bd.verufl.sa.com/dakhila-print?id=GUPMYgpmETKVAmKwih8UyJM86GwtST09&amp;bgcolor=FFFFFF&amp;format=png"
                                  className="w-full h-full"
                                  alt="QR Code"
                                />
                              </div>
                            </div>

                            {/* Right Section */}
                            <div className="w-[265px] mt-3 float-right text-right text-xs font-sans">
                              <p className="text-center p-[5px]">
                                এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে,
                                <br />
                                কোন স্বাক্ষর প্রয়োজন নেই।
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[calc(100%-20px)] border-t border-dotted border-gray-500 mt-3.5 absolute bottom-0 left-[10px] right-[10px]">
                        <div className="text-right">1/1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandTaxReceipt;