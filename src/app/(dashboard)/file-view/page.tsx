"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useRef, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

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

const DakhilaContent = () => {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [landForm, setLandForm] = useState<LandForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handlePrint = () => {
    if (printAreaRef.current) {
      const printContents = printAreaRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      
      document.body.innerHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>ভূমি উন্নয়ন কর রসিদ</title>
            <style>
              @page { size: 8in 11in;margin: 0; }
              body { 
                border: 1px dotted;
                border-radius: 0.5rem;
                font-family: 'Kalpurush', 'Bangla', Arial, sans-serif;
                font-size: 12px;
                line-height: 1.2;
                width: 8in;
                height: 11in;
                margin: 0px;
                padding: 10px;
              }
              table { 
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 5px;
                
              }
            
              .bangla-text { font-family: 'Kalpurush', 'Bangla', Arial; }
              .border-dotted { border-bottom: 1px dotted black; }
              .no-border { border: none !important; }
              .text-left { text-align: left; }
              .text-right { text-align: right; }
              .text-center { text-align: center; }
              .w-full { width: 100%; }
              .mt-1 { margin-top: 4px;  }
              .mt-2 { margin-top: 8px;  }
              .p-1 { padding: 4px; }
              .underline { text-decoration: underline; }
              .qr-code { width: 70px; height: 70px; }
            </style>
          </head>
          <body>
            ${printContents}
            <script>
              setTimeout(() => {
                window.print();
                window.close();
              }, 200);
            </script>
          </body>
        </html>
      `;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

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
        <title>ভূমি উন্নয়ন কর: Dakhila</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=600, initial-scale=1.0, minimum-scale=1.0, maximum-scale=3.0, user-scalable=no" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <link rel="shortcut icon" href="https://dakhila.ldtax.gov.bd/img/favicon.ico" />
      </Head>
      <div className="clearfix" />
      <div className="page-container">
        <div className="page-content">
          <div className="page-content">
            <div className="row">
              <div className="col-md-12">
                <div className="portlet box blue">
                  <div className="flex justify-center items-center mb-5">
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1 rounded-md text-white bg-blue-500 border border-blue-500 hover:bg-blue-600"
                    >
                      প্রিন্ট
                    </button>
                  </div>

                  <div className="flex justify-center items-center">
                    <div id="printArea" ref={printAreaRef} className="font-sans text-[12px] leading-[1.2] text-gray-700 bg-white w-[8in] h-[11in] rounded-lg border border-dotted p-[10px] float-left my-[30px] mx-auto relative">
                      <div className="col-md-12">
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="text-left">বাংলাদেশ ফরম নং {landForm.bd_form_no || '১০৭৭'}</td>
                              <td className="text-right">(পরিশিষ্ট: {landForm.appendix || '৩৮'})</td>
                            </tr>
                            <tr>
                              <td className="text-left">(সংশোধিত)</td>
                              <td className="text-right input_bangla">ক্রমিক নং {landForm.serial_no || '২৬১২২২০১১৯১৯'}</td>
                            </tr>
                            <tr>
                              <td className="text-center" colSpan={2}>
                                ভূমি উন্নয়ন কর পরিশোধ রসিদ
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center" colSpan={2}>
                                (অনুচ্ছেদ {landForm.paragraph_no || '৩৯২'} দ্রষ্টব্য)
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="h-5" />

                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="w-[320px]">
                                সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের নাম:
                              </td>
                              <td className="border-b border-dotted border-black">
                                {landForm.office_name || 'মাওনা ইউনিয়ন ভূমি অফিস'}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="mt-1 w-full">
                          <tbody>
                            <tr>
                              <td className="w-[170px]">মৌজার নাম ও জে. এল. নং:</td>
                              <td className="border-b border-dotted border-black px-2 w-[220px]">
                                {landForm.mouzar_no || 'গাজীপুর-৩'}
                              </td>
                              <td className="w-[100px]">উপজেলা/থানা :</td>
                              <td className="border-b border-dotted border-black px-2 w-[110px]">
                                {landForm.thana || 'শ্রীপুর'}
                              </td>
                              <td className="w-[40px]">জেলা:</td>
                              <td className="border-b border-dotted border-black px-2">
                                {landForm.district || 'গাজীপুর'}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="mt-1 w-full">
                          <tbody>
                            <tr>
                              <td className="w-[230px]">২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:</td>
                              <td className="border-b border-dotted border-black pl-2 numeric_bangla">
                                {landForm.reg_holding_no || '৬৩১৩'}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="mt-1 w-full">
                          <tbody>
                            <tr>
                              <td className="w-[75px]">খতিয়ান নং:</td>
                              <td className="border-b border-dotted border-black pl-2 numeric_bangla">
                                {landForm.khatian_no || '৯৭৩'}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="h-2.5" />
                      </div>

                      <div className="from-controll">
                        <p className="font-bold text-xs text-center p-0 m-0">
                          <u>মালিকের বিবরণ</u>
                        </p>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <table className="border border-dotted border-collapse my-2 w-full text-xs">
                            <thead>
                              <tr>
                                <th className="border border-dotted text-center w-[10%] p-1">ক্রমঃ</th>
                                <th className="border border-dotted text-center w-[60%] p-1">মালিকের নাম</th>
                                <th className="border border-dotted text-center w-[25%] p-1">মালিকের অংশ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {landForm.owners.map((owner, index) => (
                                <tr key={owner.id} className="h-[21px]">
                                  <td className="border border-dotted input_bangla text-center p-1">{index + 1}</td>
                                  <td className="border border-dotted input_bangla p-1">{owner.name}</td>
                                  <td className="border border-dotted input_bangla text-center p-1">{owner.share}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 w-full inline-block">
                          <p className="font-bold text-xs text-center p-0 m-0">
                            <u>জমির বিবরণ</u>
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <table className="border border-dotted border-collapse my-2 w-full text-xs">
                            <thead>
                              <tr>
                                <th className="border border-dotted p-1">ক্রমঃ</th>
                                <th className="border border-dotted p-1">দাগ নং</th>
                                <th className="border border-dotted p-1">জমির শ্রেণী</th>
                                <th className="border border-dotted p-1">জমির পরিমাণ (শতক)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {landForm.lands.map((land, index) => (
                                <tr key={land.id} className="h-[21px]">
                                  <td className="border border-dotted input_bangla text-center p-1">{index + 1}</td>
                                  <td className="border border-dotted input_bangla p-1">{land.stainNo}</td>
                                  <td className="border border-dotted p-1">{land.landClass}</td>
                                  <td className="border border-dotted input_bangla p-1">{land.landAmount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <table className="border border-dotted border-collapse my-2 w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="border border-dotted text-center w-1/2 p-1">সর্বমোট জমি (শতক)</td>
                            <td className="border border-dotted input_bangla w-1/2 p-1">{landForm.total_land_amount || '৩৫'}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="h-2.5" />

                      <table className="w-full !important  my-[2px] border border-gray-300 border-collapse">
  <tbody>
    <tr className="border-b border-gray-300 hover:bg-gray-50 ">
      <th className="text-center p-3 border bg-gray-50 border-gray-300" colSpan={8}>
        আদায়ের বিবরণ
      </th>
    </tr>
    <tr className="border-b border-gray-300 hover:bg-gray-50 ">
      <td className="text-center p-3 border border-gray-300">তিন বৎসরের ঊর্ধ্বের বকেয়া</td>
      <td className="text-center p-3 border border-gray-300">গত তিন বৎসরের বকেয়া</td>
      <td className="text-center p-3 border border-gray-300">বকেয়ার সুদ ও ক্ষতিপূরণ</td>
      <td className="text-center p-3 border border-gray-300">হাল দাবি</td>
      <td className="text-center p-3 border border-gray-300">মোট দাবি</td>
      <td className="text-center p-3 border border-gray-300">মোট আদায়</td>
      <td className="text-center p-3 border border-gray-300">মোট বকেয়া</td>
      <td className="text-center p-3 border border-gray-300">মন্তব্য</td>
    </tr>
    <tr className="border-b border-gray-300 hover:bg-gray-50 bg-gray-50 ">
      <td className="text-center p-3 border border-gray-300">{landForm.table_row_1 || '০'}</td>
      <td className="text-center p-3 border border-gray-300">{landForm.table_row_2 || '১০৭০'}</td>
      <td className="text-center p-3 border border-gray-300">{landForm.table_row_3 || '৭২'}</td>
      <td className="text-center p-3 border border-gray-300">{landForm.table_row_4 || '৩৫০'}</td>
      <td className="text-center p-3 border border-gray-300">{landForm.table_row_5 || '১৪৯২'}</td>
      <td className="text-center p-3 border border-gray-300">{landForm.table_row_6 || '১৪৯২'}</td>
      <td className="text-center p-3 border border-gray-300">{landForm.table_row_7 || '০'}</td>
      <td className="text-center p-3 border border-gray-300">{landForm.table_row_7 || '০'}</td>
    </tr>
  </tbody>
</table>

                      <p className="border-b border-dotted border-black">
                        সর্বমোট (কথায়): {landForm.total_where || 'এক হাজার চার শত বিরানব্বই টাকা মাত্র'}।
                      </p>

                      <div className="row relative mt-4">
                        <div className="col-md-12">
                          <div className="w-[350px] float-left text-left">
                            <p className="m-0">
                              নোট: সর্বশেষ কর পরিশোধের সাল - 2025-2026 (অর্থবছর)
                            </p>
                            <p className="input_bangla mb-0 mt-2">চালান নং : {landForm.invoice_no || ''}</p>
                            <p className="mt-6">তারিখ :</p>
                            <div className="relative mt-[-37px] ml-2.5">
                              <p className="w-[115px] p-0 m-0 mb-0.5 ml-9">{landForm.date_bangla || '২৬ আষাঢ় ১৪৩২'}</p>
                              <span className="border-t border-solid border-black ml-9 block w-fit">{landForm.date_english || '১০ জুলাই ২০২৫'}</span>
                              <p />
                            </div>
                            <p />
                          </div>

                          <div className="w-[90px] float-left text-center relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-white  rounded-lg p-1.5" 
     
                            >
                              <Image
                                src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://dakhila.ldtax.gov.bd.verufl.sa.com/dakhila-print?id=GUPMYgpmETKVAmKwih8UyJM86GwtST09&bgcolor=FFFFFF&format=png"
                                style={{ top: '2px', left: '374px' }}
                                alt="QR Code"
                                width={72}
                                height={72}
                                className=""
                              />
                            </div>
                          </div>

                          <div className="w-[265px] float-right text-right text-xs">
                            <p className="text-center p-1.5">
                              এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে,
                              <br />
                              কোন স্বাক্ষর প্রয়োজন নেই।
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row absolute bottom-0 right-0 w-full">
                        <div className="col-md-12 text-right">
                          <div className="w-full border-t border-dotted border-gray-500 mt-4" />
                          <div className="from-controll p-1">1/1</div>
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

const Dakhila = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <DakhilaContent />
    </Suspense>
  );
};

export default Dakhila;