"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useRef } from 'react';

const Dakhila = () => {
  const printAreaRef = useRef(null);

  const handlePrint = () => {
    const printContents = printAreaRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

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

                  <div className="portlet-body">
                    <div id="printArea" ref={printAreaRef} className="w-[815px] mx-auto p-4 md:p-10 font-kalpurush text-sm leading-tight text-gray-700 bg-white border border-dashed border-gray-400 relative">
                      <div className="col-md-12">
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="text-left">বাংলাদেশ ফরম নং ১০৭৭</td>
                              <td className="text-right">(পরিশিষ্ট: ৩৮)</td>
                            </tr>
                            <tr>
                              <td className="text-left">(সংশোধিত)</td>
                              <td className="text-right input_bangla">ক্রমিক নং ২৬১২২২০১১৯১৯</td>
                            </tr>
                            <tr>
                              <td className="text-center" colSpan={2}>
                                ভূমি উন্নয়ন কর পরিশোধ রসিদ
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center" colSpan={2}>
                                (অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)
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
                                মাওনা ইউনিয়ন ভূমি অফিস
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="mt-1 w-full">
                          <tbody>
                            <tr>
                              <td className="w-[170px]">মৌজার নাম ও জে. এল. নং:</td>
                              <td className="border-b border-dotted border-black px-2 w-[220px]">
                                গাজীপুর-৩
                              </td>
                              <td className="w-[100px]">উপজেলা/থানা :</td>
                              <td className="border-b border-dotted border-black px-2 w-[110px]">
                                শ্রীপুর
                              </td>
                              <td className="w-[40px]">জেলা:</td>
                              <td className="border-b border-dotted border-black px-2">
                                গাজীপুর
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="mt-1 w-full">
                          <tbody>
                            <tr>
                              <td className="w-[230px]">২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:</td>
                              <td className="border-b border-dotted border-black pl-2 numeric_bangla">
                                ৬৩১৩
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="mt-1 w-full">
                          <tbody>
                            <tr>
                              <td className="w-[75px]">খতিয়ান নং:</td>
                              <td className="border-b border-dotted border-black pl-2 numeric_bangla">
                                ৯৭৩
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
                              <tr className="h-[21px]">
                                <td className="border border-dotted input_bangla text-center p-1">১</td>
                                <td className="border border-dotted input_bangla p-1">ফাহিমা খাতুন</td>
                                <td className="border border-dotted input_bangla text-center p-1">১</td>
                              </tr>
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
                              <tr className="h-[21px]">
                                <td className="border border-dotted input_bangla text-center p-1">১</td>
                                <td className="border border-dotted input_bangla p-1">২২৮৭</td>
                                <td className="border border-dotted p-1">বাড়ী</td>
                                <td className="border border-dotted input_bangla p-1">৩৫</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <table className="border border-dotted border-collapse my-2 w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="border border-dotted text-center w-1/2 p-1">সর্বমোট জমি (শতক)</td>
                            <td className="border border-dotted input_bangla w-1/2 p-1">৩৫</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="h-2.5" />

                      <table className="table table-striped table-bordered table-hover my-2 w-full">
                        <tbody>
                          <tr>
                            <th className="text-center" colSpan={8}>
                              আদায়ের বিবরণ
                            </th>
                          </tr>
                          <tr>
                            <td className="text-center p-1">তিন বৎসরের ঊর্ধ্বের বকেয়া</td>
                            <td className="text-center p-1">গত তিন বৎসরের বকেয়া</td>
                            <td className="text-center p-1">বকেয়ার সুদ ও ক্ষতিপূরণ</td>
                            <td className="text-center p-1">হাল দাবি</td>
                            <td className="text-center p-1">মোট দাবি</td>
                            <td className="text-center p-1">মোট আদায়</td>
                            <td className="text-center p-1">মোট বকেয়া</td>
                            <td className="text-center p-1">মন্তব্য</td>
                          </tr>
                          <tr>
                            <td align="center" className="p-1">০</td>
                            <td align="center" className="p-1">১০৭০</td>
                            <td align="center" className="p-1">৭২</td>
                            <td align="center" className="p-1">৩৫০</td>
                            <td align="center" className="p-1">১৪৯২</td>
                            <td align="center" className="p-1">১৪৯২</td>
                            <td align="center" className="p-1">০</td>
                            <td align="center" className="p-1"></td>
                          </tr>
                        </tbody>
                      </table>

                      <p className="border-b border-dotted border-black">
                        সর্বমোট (কথায়): এক হাজার চার শত বিরানব্বই টাকা মাত্র।
                      </p>

                      <div className="row relative mt-4">
                        <div className="col-md-12">
                          <div className="w-[350px] float-left text-left">
                            <p className="m-0">
                              নোট: সর্বশেষ কর পরিশোধের সাল - 2025-2026 (অর্থবছর)
                            </p>
                            <p className="input_bangla mb-0">চালান নং :</p>
                            <p className="mt-0">তারিখ :</p>
                            <div className="relative mt-[-37px] ml-2.5">
                              <p className="w-[115px] p-0 m-0 mb-0.5 ml-9">২৬ আষাঢ় ১৪৩২</p>
                              <span className="border-t border-solid border-black ml-9 block w-fit">১০ জুলাই ২০২৫</span>
                              <p />
                            </div>
                            <p />
                          </div>

                          <div className="w-[90px] float-left text-center relative">
                            <div className="qrcode-print">
                              <Image
                                src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://dakhila.ldtax.gov.bd.verufl.sa.com/dakhila-print?id=GUPMYgpmETKVAmKwih8UyJM86GwtST09&bgcolor=FFFFFF&format=png"
                                style={{ top: '2px', left: '374px' }}
                                alt="QR Code"
                                width={72}
                                height={72}
                                className="absolute"
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

export default Dakhila;