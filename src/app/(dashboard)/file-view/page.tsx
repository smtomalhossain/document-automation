"use client";

import { useRef, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LandTableGrid from '@/components/LandTableGrid';
import OwnerTableGrid from '@/components/OwnerTableGrid';
import Cookies from 'js-cookie';
import Head from 'next/head';

function toBanglaNumber(num: number): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map(d => banglaDigits[parseInt(d)])
    .join("");
}

interface Owner {
  id: string;
  name: string;
  share: string;
}

interface LandInfo {
  id: string;
  landClass: string;
  landAmount: string;
  stainNo: string;
}

interface LandForm {
  id: string;
  bd_form_no?: string;
  appendix?: string;
  serial_no?: string;
  paragraph_no?: string;
  office_name?: string;
  mouzar_no?: string;
  thana?: string;
  district?: string;
  khatian_no?: string;
  reg_holding_no?: string;
  total_land_amount?: string;
  table_row_1?: string;
  table_row_2?: string;
  table_row_3?: string;
  table_row_4?: string;
  table_row_5?: string;
  table_row_6?: string;
  table_row_7?: string;
  total_where?: string;
  note?: string;
  invoice_no?: string;
  date_bangla?: string;
  date_english?: string;
  createdAt: string;
  owners: Owner[];
  lands: LandInfo[];
}

const LandTaxReceiptContent = () => {
  const searchParams = useSearchParams();
  const [landForm, setLandForm] = useState<LandForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const [currentUrl, setCurrentUrl] = useState('');
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  useEffect(() => {
    // setCurrentUrl(window.location.href);
    const text = window.location.href;
    const encoded = encodeURIComponent(text);

    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&amp;size=200x200`);
  }, []);



  useEffect(() => {
    const fetchLandForm = async () => {
      const id = searchParams.get('id');
      if (!id) {
        setError('No ID provided');
        setLoading(false);
        return;
      }

      try {
        const token = Cookies.get('auth_token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const response = await fetch(`${apiUrl}/land-forms/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch land form');
        }

        const data = await response.json();
        setLandForm(data);

      } catch (err) {
        setError('Failed to load land form data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandForm();
  }, [searchParams]);

  useEffect(() => {
  const preventZoom = (e: WheelEvent | TouchEvent) => {
    if (e instanceof WheelEvent && e.ctrlKey) e.preventDefault(); // Ctrl + mouse wheel
  };

  const preventPinch = (e: TouchEvent) => {
    if (e.touches.length > 1) e.preventDefault(); // pinch gestures
  };

  window.addEventListener("wheel", preventZoom, { passive: false });
  window.addEventListener("touchmove", preventPinch, { passive: false });

  return () => {
    window.removeEventListener("wheel", preventZoom);
    window.removeEventListener("touchmove", preventPinch);
  };
}, []);



  const handlePrint = () => {
    const printContents = document.getElementById('printArea')?.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents ?? '';
    setTimeout(() => { }, 500);
    window.print();

    document.body.innerHTML = originalContents;
  };



  // owners table ---------------------------
  type OwnerTableRow = {
    col1: string;
    col2: string;
    col3: string;
  }
  const ownerTableDataLeft: OwnerTableRow[] = [];
  const ownerTableDataRight: OwnerTableRow[] = [];

  var owners = landForm?.owners ?? [];
  for (let i = 0; i < (owners.length ?? 0); i++) {
    if (i % 2 === 0) {
      var owner = owners[i];
      ownerTableDataLeft.push({
        col1: toBanglaNumber(i + 1),
        col2: owner.name,
        col3: owner.share,
      });
    }
    else {
      var owner = owners[i];
      ownerTableDataRight.push({
        col1: toBanglaNumber(i + 1),
        col2: owner.name,
        col3: owner.share,
      });
    }
  }

  const ownerTablesData = [
    ownerTableDataLeft,
  ];

  if (ownerTableDataRight.length > 0) {
    ownerTablesData.push(ownerTableDataRight);
  }


  type TableRow = {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
  };
  const tableDataLeft: TableRow[] = [];
  const tableDataRight: TableRow[] = [];

  var lands = landForm?.lands ?? [];
  for (let i = 0; i < (lands.length ?? 0); i++) {
    if (i % 2 === 0) {
      var land = lands[i];
      tableDataLeft.push({
        col1: toBanglaNumber(i + 1),
        col2: land.stainNo,
        col3: land.landClass,
        col4: land.landAmount,
      });
    }
    else {
      var land = lands[i];
      tableDataRight.push({
        col1: toBanglaNumber(i + 1),
        col2: land.stainNo,
        col3: land.landClass,
        col4: land.landAmount,
      });
    }
  }

  const tableData = [
    tableDataLeft,
  ];

  if (tableDataRight.length > 0) {
    tableData.push(tableDataRight);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !landForm) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error || 'Land form not found'}</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
      </Head>


      <div className="page-container bg-[#f4ffe6]">
        <div className="page-content">
          <div className="row">
            <div className="col-md-12">
              <div className="portlet box blue">
                <div className='bg-white pb-1 mx-4 border-1 rounded-lg border-[#7cacfa] mt-14'>
                  <div className="flex justify-center items-center mb-5 border-1 border-[#7cacfa]  p-1 rounded-t-lg bg-[#4B8DF8]">
                    <button
                      onClick={handlePrint}
                      className="py-1 px-3 rounded shadow-3xl cursor-pointer text-white bg-[#3B82F6] border border-[#3B82F6]"
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
                              <td className="text-left">বাংলাদেশ ফরম নং {landForm.bd_form_no || '১০৭৭'}</td>
                              <td className="text-right">(পরিশিষ্ট:{landForm.appendix || '৩৮'})</td>
                            </tr>
                            <tr>
                              <td className="text-left">(সংশোধিত)</td>
                              <td className="text-right input_bangla">ক্রমিক নং {landForm.serial_no || '২৬১২২২০১১৯১৯'}</td>
                            </tr>
                            <tr>
                              <td className="text-center text-sm" colSpan={2}>
                                ভূমি উন্নয়ন কর পরিশোধ রসিদ
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center" colSpan={2}>
                                (অনুচ্ছেদ {landForm.paragraph_no || '৩৯২'} দ্রষ্টব্য)
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="w-full h-5"></div>
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="w-[320px]">সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম:</td>
                              <td className="dotted_botton">{landForm.office_name || 'মাওনা ইউনিয়ন ভূমি অফিস'}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="mt-1 w-full">
                          <tbody>
                            <tr>
                              <td className="w-[170px]">মৌজার নাম ও জে. এল. নং:</td>
                              <td className="dotted_botton input_bangla font-semibold px-[5px]">{landForm.mouzar_no || 'গাড়ারণ-38'}</td>
                              <td className="w-[105px]">উপজেলা/থানা :</td>
                              <td className="dotted_botton px-[5px]">{landForm.thana || 'শ্রীপুর'}</td>
                              <td className="w-[40px]">জেলা:</td>
                              <td className="dotted_botton px-[5px]">{landForm.district || 'গাজীপুর'}</td>
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
                                {landForm.reg_holding_no || '৬৩১৩'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="mt-1 w-full">
                          <tbody>
                            <tr>
                              <td className="w-[75px]">খতিয়ান নং:</td>
                              <td className="dotted_botton numeric_bangla pl-2.5">
                                {landForm.khatian_no || '৯৭৩'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="h-2.5"></div>

                        <p className="font-bold text-xs text-center m-0 p-0">
                          <u>মালিকের বিবরণ</u>
                        </p>



                        <div className="">
                          <OwnerTableGrid tables={ownerTablesData as any} />
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
                              <td className="b1 input_bangla w-1/2">{landForm.total_land_amount || '৩৫'}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="h-2.5"></div>

                        <table className="border border-dotted border-collapse my-2.5 mx-0.5 w-full text-sm">
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
                              <td className="text-center p-3 border border-gray-300">{landForm.table_row_1 || '০'}</td>
                              <td className="text-center p-3 border border-gray-300">{landForm.table_row_2 || '১০৭০'}</td>
                              <td className="text-center p-3 border border-gray-300">{landForm.table_row_3 || '৭২'}</td>
                              <td className="text-center p-3 border border-gray-300">{landForm.table_row_4 || '৩৫০'}</td>
                              <td className="text-center p-3 border border-gray-300">{landForm.table_row_5 || '১৪৯২'}</td>
                              <td className="text-center p-3 border border-gray-300">{landForm.table_row_6 || '১৪৯২'}</td>
                              <td className="text-center p-3 border border-gray-300">{landForm.table_row_7 || '০'}</td>
                              <td className="text-center p-3 border border-gray-300">{landForm.table_row_7 || ''}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="w-full">
                          <p className="dotted_botton">
                            সর্বমোট (কথায়): {landForm.total_where || 'এক হাজার চার শত বিরানব্বই টাকা মাত্র'}
                          </p>
                        </div>

                        <div className="flex">
                          <div className="w-full">
                            <div className="flex">
                              {/* Left Section */}
                              <div className="w-[350px] float-left text-left">
                                <p className="mt-3 text-sm">
                                  নোট: সর্বশেষ কর পরিশোধের সাল - 2025-2026 (অর্থবছর)
                                </p>
                                <p className="font-bangla font-semibold">চালান নং : {landForm.invoice_no || ''}</p>
                                <p className='mt-1'>তারিখ :</p>
                                <div className="mt-[-22px] ml-[10px]">
                                  <p className="w-[115px] p-0 m-0 ml-[38px] mb-[2px]">
                                    {landForm.date_bangla || '২৬ আষাঢ় ১৪৩২'}
                                  </p>
                                  <span className="border-t border-black ml-[36px]">
                                    {landForm.date_english || '১০ জুলাই ২০২৫'}
                                  </span>
                                </div>
                              </div>

                              {/* QR Code Section */}
                              <div className="w-[90px] m-3 flex justify-center items-center">
                                <div className="w-[72px] h-[72px]">
                                  {qrUrl && (
                                    <img
                                      width={200}
                                      height={200}
                                      src={qrUrl}
                                      className="w-full h-full"
                                      alt="QR Code"
                                    />
                                  )}
                                </div>
                              </div>

                              {/* Right Section */}
                              <div className="w-[265px] mt-3 float-right text-right text-[11px] font-sans">
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
    </>

  );
};

const LandTaxReceipt = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <LandTaxReceiptContent />
    </Suspense>
  );
};

export default LandTaxReceipt;