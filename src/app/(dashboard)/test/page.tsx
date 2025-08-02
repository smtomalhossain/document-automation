"use client";

import React from 'react';

const LandTaxReceipt = () => {
  const handlePrint = () => {
    const printContents = document.getElementById('printArea').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    setTimeout(() => {}, 500);
    window.print();

    document.body.innerHTML = originalContents;
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="row">
          <div className="col-md-12">
            <div className="portlet box blue">
              <div className="flex justify-center items-center mb-5">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1 rounded text-white bg-blue-500 border-blue-500"
                >
                  প্রিন্ট
                </button>
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
                        .qrcode-print {
                          width: 100%;
                          display: list-item;
                          list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKAQMAAAAmHlAyAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA8ElEQVQokZXRMaoEMQgGYCGt4FWEtEKuLqQVvIowrZDNzD5m13nVWn1FYv4owA9Fa3ZevLIQwTHcFCtzggxxe9AUGP9xxgp+EmyI/vW9ScvOeme4CdBQPd4xb1IucVydC2ECHEsiK8VSm0+unCyxOLSw9akUc0AhGfZ9QKUQD0v0FlxIRLl/iloIPZNiCRciNhfhKYUc0rq2xoVtP01HiBaieQ70q9mHBMxH9qvZh3uFSZPOQX3zEJyNh1buJL7nj4XnYo5EssK9rAQSi0IEvXJaZTr38JQn91T3vQfNhuvUSnAfjalyP8xLr6F+8Yd6AR4WG0gOJqA4AAAAAElFTkSuQmCC);
                          list-style-position: inside;
                          background-repeat: no-repeat;
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

                      <table className="border border-dotted border-collapse my-2.5 mx-0.5 w-full text-xs">
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
                      </table>

                      <p className="font-bold text-xs text-center m-0 p-0">
                        <u>জমির বিবরণ</u>
                      </p>

                      <table className="border border-dotted border-collapse my-2.5 mx-0.5 w-full text-xs">
                        <thead>
                          <tr>
                            <th className="b1">ক্রমঃ</th>
                            <th className="b1">দাগ নং</th>
                            <th className="b1">জমির শ্রেণী</th>
                            <th className="b1">জমির পরিমাণ (শতাংশ)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="h-[21px]">
                            <td className="b1 input_bangla text-center">১</td>
                            <td className="b1 input_bangla">2591</td>
                            <td className="b1">চালা( কৃষি২)</td>
                            <td className="b1 input_bangla">70</td>
                          </tr>
                        </tbody>
                      </table>
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
                          <tr>
                            <th className="text-center" colSpan={8}>
                              আদায়ের বিবরণ
                            </th>
                          </tr>
                          <tr>
                            <td className="text-center">তিন বৎসরের ঊর্ধ্বের বকেয়া</td>
                            <td className="text-center">গত তিন বৎসরের বকেয়া</td>
                            <td className="text-center">বকেয়ার জরিমানা ও ক্ষতিপূরণ</td>
                            <td className="text-center">হাল দাবি</td>
                            <td className="text-center">মোট দাবি</td>
                            <td className="text-center">মোট আদায়</td>
                            <td className="text-center">মোট বকেয়া</td>
                            <td className="text-center">মন্তব্য</td>
                          </tr>
                          <tr>
                            <td className="text-center">৭৭০</td>
                            <td className="text-center">৪২০</td>
                            <td className="text-center">৩৬৫</td>
                            <td className="text-center">১৪০</td>
                            <td className="text-center">১,৬৯৫</td>
                            <td className="text-center">১,৬৯৫</td>
                            <td className="text-center">০</td>
                            <td className="text-center"></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="w-full">
                        <p className="dotted_botton">
                          সর্বমোট (কথায়): এক হাজার ছয় শত পঁচানব্বই টাকা মাত্র ।
                        </p>
                      </div>

                      <div className="flex mt-4">
                        <div className="w-[350px]">
                          <p className="m-0">
                            নোট: সর্বশেষ কর পরিশোধের সাল - 2022-2023 (অর্থবছর)
                          </p>
                          <p className="input_bangla">চালান নং : 2223-0011416314</p>
                          <p>তারিখ :</p>
                          <div className="mt-[-37px] ml-2.5">
                            <p className="w-[115px] p-0 m-0 ml-[38px] mb-0.5">
                              ৫ মাঘ ১৪২৯
                            </p>
                            <span className="border-t border-solid ml-[36px]">
                              ১৮ জানুয়ারী, ২০২৩
                            </span>
                          </div>
                        </div>

                        <div className="w-[90px]">
                          <div className="qrcode-print">
                            <img
                              src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://dakhila.ldtax.gov.bd.verufl.sa.com/dakhila-print?id=kLF0ZoRnGrwMxYNHgiJlzJjUTVmT0T09&bgcolor=FFFFFF&format=png"
                              className="w-[67px] h-[67px]"
                              alt="QR Code"
                            />
                          </div>
                        </div>

                        <div className="w-[265px] text-right text-xs">
                          <p className="text-center p-1">
                            এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে, <br /> কোন
                            স্বাক্ষর প্রয়োজন নেই।
                          </p>
                        </div>
                      </div>

                      <div className="w-full border-t border-dotted border-gray-500 mt-3.5 absolute bottom-0 right-0">
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