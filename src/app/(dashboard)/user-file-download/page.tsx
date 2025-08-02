"use client";
import React, { useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
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

  // HTML template from index.html - this is the content inside the printArea div
  const receiptHtml = `
    <div class="col-md-12">
      <style type="text/css">
        body {
          font-family: "kalpurush", Arial, sans-serif;
          font-size: 13px !important;
          line-height: 1.2;
          color: #333;
          background-color: #fff;
        }
        .dotted_botton {
          border: none;
          border-bottom: 1px dotted #000;
          background-color: #fff;
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
          list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKAQMAAAAmHlAyAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA8ElEQVQokZXRMaoEMQgGYCGt4FWEtEKuLqQVvIowrZDNzD5m13nVWn1FYv4owA9Fa3ZevLIQwTHcFCtzggxxe9AUGP9xxgp+EmyI/vW9ScvOeme4CdBQPd4xb1IucVydC2ECHEsiK8VSm0+unCyxOLSw9akUc0AhGfZ9QKUQD0v0FlxIRLl/iloIPZNiCRciNhfhKYXU0rq2xoVtP01HiBaieQ70q9mHBMxH9qvZh3uFSZPOQX3zEJyNh1buJL7nj4XnYo5EssK9rAQSi0IEvXJaZTr38JQn91T3vQfNhuvUSnAfjalyP8xLr6F+8Yd6AR4WG0gOJqA4AAAAAElFTkSuQmCC);
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
      </style>
      <style type="text/css" media="print">
        @page {
          size: a4;
          margin: 0mm;
        }
        html {
          background-color: #ffffff;
          margin: 0px;
        }
        body {
          border: solid 0px blue;
          margin: 0mm;
        }
      </style>

      <div style="font-family: 'kalpurush', Arial, sans-serif; font-size: 14px !important; line-height: 1.2; color: #333; background-color: #eee; width: 700in; height: 11in; border-radius: 10px; border: dotted 1px; padding: 10px; float: left; margin: 30px auto; position: relative;">
        <div class="row">
          <div class="col-md-12">
            <div class="from-controll">
              <style>
                .from-controll table,
                .from-controll table td {
                  font-size: 14px;
                }
              </style>

              <table style="width: 100%">
                <tbody>
                  <tr>
                    <td class="text-left">
                      বাংলাদেশ ফরম নং ১০৭৭
                    </td>
                    <td class="text-right">(পরিশিষ্ট: ৩৮)</td>
                  </tr>
                  <tr>
                    <td class="text-left">(সংশোধিত)</td>
                    <td class="text-right input_bangla">
                      ক্রমিক নং ২৬১২২২০১১৯১৯
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center" colspan="2">
                      ভূমি উন্নয়ন কর পরিশোধ রসিদ
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center" colspan="2">
                      (অনুচ্ছেদ ৩৯২ দ্রষ্টব্য)
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style="width: 100%; height: 20px"></div>

              <table style="width: 100%">
                <tbody>
                  <tr>
                    <td style="width: 320px">
                      সিটি কর্পোরেশন/ পৌর/ ইউনিয়ন ভূমি অফিসের
                      নাম:
                    </td>
                    <td class="dotted_botton">
                      মাওনা ইউনিয়ন ভূমি অফিস
                    </td>
                  </tr>
                </tbody>
              </table>

              <table style="margin-top: 5px; width: 100%">
                <tbody>
                  <tr>
                    <td style="width: 170px">
                      মৌজার নাম ও জে. এল. নং:
                    </td>
                    <td
                      class="dotted_botton input_bangla"
                      style="padding: 0 10px 0 5px"
                    >
                      গাজীপুর-৩
                    </td>
                    <td style="width: 100px">উপজেলা/থানা :</td>
                    <td
                      class="dotted_botton"
                      style="padding: 0 10px 0 5px"
                    >
                      শ্রীপুর
                    </td>
                    <td style="width: 40px">জেলা:</td>
                    <td
                      class="dotted_botton"
                      style="padding: 0 10px 0 5px"
                    >
                      গাজীপুর
                    </td>
                  </tr>
                </tbody>
              </table>

              <table style="margin-top: 5px; width: 100%">
                <tbody>
                  <tr>
                    <td style="width: 230px">
                      ২ নং রেজিস্টার অনুযায়ী হোল্ডিং নম্বর:
                    </td>
                    <td
                      class="dotted_botton numeric_bangla"
                      style="padding-left: 10px"
                    >
                      ৬৩১৩
                    </td>
                  </tr>
                </tbody>
              </table>

              <table style="margin-top: 5px; width: 100%">
                <tbody>
                  <tr>
                    <td style="width: 75px">খতিয়ান নং:</td>
                    <td
                      class="dotted_botton numeric_bangla"
                      style="padding-left: 10px"
                    >
                      ৯৭৩
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style="height: 10px"></div>
            </div>

            <div class="from-controll">
              <p
                style="
                  font-weight: bold;
                  font-size: 12px;
                  text-align: center;
                  margin: 0px;
                  padding: 0px;
                "
              >
                <u>মালিকের বিবরণ</u>
              </p>
            </div>

            <div class="row">
              <div class="col-md-12">
                <table
                  style="
                    border: 1px dotted;
                    border-collapse: collapse;
                    margin: 10px 2px;
                    width: 100%;
                    font-size: 11px;
                    float: left;
                  "
                >
                  <thead>
                    <tr>
                      <th
                        style="width: 10%; text-align: center"
                        class="b1"
                      >
                        ক্রমঃ
                      </th>
                      <th
                        style="width: 60%; text-align: center"
                        class="b1"
                      >
                        মালিকের নাম
                      </th>
                      <th
                        style="width: 25%; text-align: center"
                        class="b1"
                      >
                        মালিকের অংশ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="height: 21px">
                      <td
                        class="b1 input_bangla text-center"
                        style="
                          font-family: 'kalpurush', Arial,
                            sans-serif !important;
                        "
                      >
                        ১
                      </td>
                      <td class="b1 input_bangla">
                        ফাহিমা খাতুন
                      </td>
                      <td class="b1 input_bangla text-center">
                        ১
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="row">
              <div
                class="col-md-12"
                style="
                  width: 100% !important;
                  display: inline-block;
                "
              >
                <p
                  style="
                    font-weight: bold;
                    font-size: 12px;
                    text-align: center;
                    margin: 0px;
                    padding: 0px;
                  "
                >
                  <u>জমির বিবরণ</u>
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <table
                  style="
                    border: 1px dotted;
                    border-collapse: collapse;
                    margin: 10px 2px;
                    width: 100%;
                    font-size: 11px;
                    float: left;
                  "
                >
                  <thead>
                    <tr>
                      <th class="b1">ক্রমঃ</th>
                      <th class="b1">দাগ নং</th>
                      <th class="b1">জমির শ্রেণী</th>
                      <th class="b1">জমির পরিমাণ (শতক)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="height: 21px">
                      <td
                        class="b1 input_bangla text-center"
                        style="
                          font-family: 'kalpurush', Arial,
                            sans-serif !important;
                        "
                      >
                        ১
                      </td>
                      <td class="b1 input_bangla">২২৮৭</td>
                      <td class="b1">বাড়ী</td>
                      <td class="b1 input_bangla">৩৫</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <table
              style="
                border: 1px dotted;
                border-collapse: collapse;
                margin: 10px 2px;
                width: 100%;
                font-size: 12px;
              "
            >
              <tbody>
                <tr>
                  <td class="b1 text-center" style="width: 50%">
                    সর্বমোট জমি (শতক)
                  </td>
                  <td
                    class="b1 input_bangla"
                    style="width: 50%"
                  >
                    ৩৫
                  </td>
                </tr>
              </tbody>
            </table>
            <div style="height: 10px"></div>
          </div>
        </div>
        <table
          class="table table-striped table-bordered table-hover"
          style="margin: 10px 2px; width: 100% !important"
        >
          <tbody>
            <tr>
              <th style="text-align: center" colspan="8">
                আদায়ের বিবরণ
              </th>
            </tr>
            <tr>
              <td style="text-align: center">
                তিন বৎসরের ঊর্ধ্বের বকেয়া
              </td>
              <td style="text-align: center">
                গত তিন বৎসরের বকেয়া
              </td>
              <td style="text-align: center">
                বকেয়ার সুদ ও ক্ষতিপূরণ
              </td>
              <td style="text-align: center">হাল দাবি</td>
              <td style="text-align: center">মোট দাবি</td>
              <td style="text-align: center">মোট আদায়</td>
              <td style="text-align: center">মোট বকেয়া</td>
              <td style="text-align: center">মন্তব্য</td>
            </tr>
            <tr>
              <td align="center">০</td>
              <td align="center">১০৭০</td>
              <td align="center">৭২</td>
              <td align="center">৩৫০</td>
              <td align="center">১৪৯২</td>
              <td align="center">১৪৯২</td>
              <td align="center">০</td>
              <td align="center"></td>
            </tr>
          </tbody>
        </table>
        <div style="width: 100% !important">
          <p class="dotted_botton">
            সর্বমোট (কথায়): এক হাজার চার শত বিরানব্বই টাকা মাত্র
            ।
          </p>
        </div>
        <style>
          .qrcode-print {
            list-style-image: unset;
          }
        </style>

        <div class="row">
          <div class="col-md-12">
            <div style="width: 350px; float: left" align="left">
              <p style="margin: 0 !important">
                ffffff
              </p>
              <p class="input_bangla">চালান নং :</p>
              <p>তারিখ :</p>
              <div style="margin-top: -37px; margin-left: 10px">
                <p
                  style="
                    width: 115px;
                    padding: 0;
                    margin: 0;
                    margin-left: 38px;
                    margin-bottom: 2px;
                  "
                >
                  ২৬ আষাঢ় ১৪৩২
                </p>
                <span
                  style="
                    border-top: 1px solid;
                    margin-left: 36px;
                  "
                  >১০ জুলাই ২০২৫
                </span>
                <p></p>
              </div>
              <p></p>
            </div>

            <div
              style="width: 90px; float: left"
              align="center"
            >
              <div class="qrcode-print">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&amp;data=https://dakhila.ldtax.gov.bd.verufl.sa.com/dakhila-print?id=GUPMYgpmETKVAmKwih8UyJM86GwtST09&amp;bgcolor=FFFFFF&amp;format=png"
                  style="
                    top: inherit;
                    position: absolute;
                    left: 374px;
                    width: 67px;
                    height: 67px;
                    top: 2px;
                  "
                  alt="QR Code"
                  height="72px"
                  width="72px"
                />
              </div>
            </div>

            <div
              style="
                width: 265px;
                float: right;
                text-align: right;
                font-size: 12px;
                font-family: 'kalpurush', Arial, sans-serif;
              "
            >
              <p class="text-center" style="padding: 5px">
                এই দাখিলা ইলেক্ট্রনিকভাবে তৈরি করা হয়েছে,
                <br />
                কোন স্বাক্ষর প্রয়োজন নেই।
              </p>
            </div>
          </div>
        </div>

        <div class="row">
          <div
            class="col-md-12 text-right"
            style="
              width: 100%;
              position: absolute;
              bottom: 0;
              right: 0; 
            "
          >
            <div
              style="
                width: 100%;
                border-top: 1px dotted gray;
                margin-top: 15px;
              "
            ></div>
            <div class="from-controll">1/1</div>
          </div>
        </div>
      </div>
    </div>
  `;

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

export default Page;
