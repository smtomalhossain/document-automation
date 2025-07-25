"use client";

import React, { useState } from "react";

interface Owner {
    name: string;
    share: string;
}

interface LandInfo {
    landClass: string;
    landAmount: string;
    stainNo: string;
}

const initialForm = {
    bd_form_no: "1077",
    appendix: "৩৮",
    serial_no: "২৬১২২২০১১৯১৯",
    paragraph_no: "৩৯২",
    office_name: "নন্দীপাড়া ইউনিয়ন ভূমি অফিস",
    mouzar_no: "নন্দীপাড়া-৫",
    thana: "ডেমরা",
    district: "ঢাকা",
    khatian_no: "১২০৬২",
    reg_holding_no: "১৮৯/৬১",
    total_land_amount: "",
    table_row_1: "০",
    table_row_2: "৩,৩০০",
    table_row_3: "২০৭",
    table_row_4: "৩,৩০০",
    table_row_5: "৬,৮০৭",
    table_row_6: "৬,৮০৭",
    table_row_7: "০",
    total_where: "ছয় হাজার আট শত সাত টাকা মাত্র ।",
    note: "সর্বশেষ কর পরিশোধের সাল - 2024-2025 (অর্থবছর)",
    invoice_no: "2324-0007831288",
    date_bangla: "২০ আষাঢ় ১৪৩১",
    date_english: "০৪ জুলাই, ২০২৪",
};

const requiredFields = Object.keys(initialForm);

const BanglaLandForm = () => {
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Owners state
    const [owners, setOwners] = useState<Owner[]>([
        { name: "মোঃ আনছার আলী", share: "0.125" },
    ]);

    // Lands state
    const [lands, setLands] = useState<LandInfo[]>([
        { landClass: "নাল ( আবাসিক )", landAmount: "৮.২৮০০০", stainNo: "১১১২৭" },
    ]);

    // Handle main form inputs change
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (value.trim() !== "") {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Handle owners input change
    const handleOwnerChange = (
        index: number,
        field: keyof Owner,
        value: string
    ) => {
        const updated = [...owners];
        updated[index][field] = value;
        setOwners(updated);
    };

    // Add owner row
    const addOwnerRow = () => {
        setOwners((prev) => [...prev, { name: "", share: "" }]);
    };

    // Remove owner row
    const removeOwnerRow = (index: number) => {
        setOwners((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle lands input change
    const handleLandChange = (
        index: number,
        field: keyof LandInfo,
        value: string
    ) => {
        const updated = [...lands];
        updated[index][field] = value;
        setLands(updated);
    };

    // Add land row
    const addLandRow = () => {
        setLands((prev) => [...prev, { landClass: "", landAmount: "", stainNo: "" }]);
    };

    // Remove land row
    const removeLandRow = (index: number) => {
        setLands((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle submit for entire form
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     const newErrors: { [key: string]: string } = {};
    //     requiredFields.forEach((field) => {
    //         if (!formData[field]?.trim()) {
    //             newErrors[field] = "এই ঘরটি আবশ্যক";
    //         }
    //     });

    //     setErrors(newErrors);

    //     if (Object.keys(newErrors).length === 0) {
    //         // You can submit all data here
    //         console.log("Main Form Data:", formData);
    //         console.log("Owners Data:", owners);
    //         console.log("Lands Data:", lands);

    //         alert("ফর্মটি সফলভাবে সাবমিট হয়েছে!");
    //     }
    // };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        const newErrors: { [key: string]: string } = {};
        requiredFields.forEach((field) => {
            if (!formData[field]?.trim()) {
                newErrors[field] = "এই ঘরটি আবশ্যক";
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetch(`${apiUrl}/land-forms`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ formData, owners, lands }),
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.error || "Submission failed");
                }

                console.log("Form submitted successfully:", result);
                alert("ফর্মটি সফলভাবে সাবমিট হয়েছে!");
            } catch (err) {
                console.error(err);
                alert("সার্ভারে একটি ত্রুটি ঘটেছে। পরে আবার চেষ্টা করুন।");
            }
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 mx-4 rounded-md mt-9 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            {/* Left Column - General Info */}
            <div>
                <h4 className="text-center lg:text-left font-bold ml-10 mt-8 text-lg">
                    সাধারণ তথ্যঃ
                </h4>
                <div className="mt-6 space-y-4">
                    {[
                        ["bd_form_no", "বাংলাদেশ ফরম নং"],
                        ["appendix", "পরিশিষ্ট(বাংলায়)"],
                        ["serial_no", "ক্রমিক নং(বাংলায়)"],
                        ["paragraph_no", "অনুচ্ছেদ নং (বাংলায়)"],
                        ["office_name", "ভূমি অফিসের নাম(বাংলায়)"],
                        ["mouzar_no", "মৌজার জে. এল. নং (বাংলায়)"],
                        ["thana", "উপেজলা / থানা (বাংলায়)"],
                        ["district", "জেলা (বাংলায়)"],
                        ["khatian_no", "খতিয়ান নং(বাংলায়)"],
                        ["reg_holding_no", "২ নং রেজিস্টার অনুযায়ী হোল্ডিং নাম্বার"],
                        ["total_land_amount", "সর্বমোট জমি (শতক)"],
                    ].map(([id, label]) => (
                        <div key={id}>
                            <label htmlFor={id} className="font-medium text-gray-400">
                                {label} <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                id={id}
                                name={id}
                                placeholder={label}
                                value={formData[id as keyof typeof formData]}
                                onChange={handleFormChange}
                                className="form-input w-full mt-1 border border-gray-300 rounded-md p-2 text-black"
                            />
                            {errors[id] && (
                                <p className="text-red-600 text-sm">{errors[id]}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column - Payment Details */}
            <div>
                <h4 className="text-center lg:text-left font-bold ml-10 mt-8 text-lg">
                    আদায়ের বিবরণঃ
                </h4>
                <div className="mt-6 space-y-4">
                    {[
                        ["table_row_1", "তিন বৎসরের ঊর্ধ্বের বকেয়া"],
                        ["table_row_2", "গত তিন বছরের বকেয়া"],
                        ["table_row_3", "বকেয়ার সুদ ও ক্ষতিপূরণ"],
                        ["table_row_4", "হাল দাবি"],
                        ["table_row_5", "মোট দাবি"],
                        ["table_row_6", "মোট আদায়"],
                        ["table_row_7", "মোট বকেয়া"],
                        ["total_where", "সর্বমোট (কথায়)"],
                        ["note", "নোট"],
                        ["invoice_no", "চালান নং (ইংরেজি)"],
                        ["date_bangla", "তারিখ  (বাংলায়)"],
                        ["date_english", "তারিখ (ইংলিশ)"],
                    ].map(([id, label]) => (
                        <div key={id}>
                            <label htmlFor={id} className="font-medium text-gray-400">
                                {label} <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                id={id}
                                name={id}
                                placeholder={label}
                                value={formData[id as keyof typeof formData]}
                                onChange={handleFormChange}
                                className="form-input w-full mt-1 border border-gray-300 rounded-md p-2 text-black"
                            />
                            {errors[id] && (
                                <p className="text-red-600 text-sm">{errors[id]}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Owners Section */}
            <div className="md:col-span-2">
                <h4 className="text-center font-bold mt-8 mb-4 text-lg">মালিকের তথ্য</h4>
                {owners.map((owner, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6  p-4 rounded  mb-4"
                    >
                        <div>
                            <label className="block text-gray-400 font-medium mb-1">
                                {index + 1}. নং মালিকের নাম <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="owner_name[]"
                                placeholder="মালিকের নাম"
                                required
                                value={owner.name}
                                onChange={(e) => handleOwnerChange(index, "name", e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 font-medium mb-1">
                                {index + 1}. নং মালিকের অংশ <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="owner_amount[]"
                                placeholder="মালিকের অংশ"
                                required
                                value={owner.share}
                                onChange={(e) => handleOwnerChange(index, "share", e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>
                        {index === owners.length - 1 && (
                            <div className="md:col-span-2 flex justify-between flex-wrap gap-4 mt-2">
                                <button
                                    type="button"
                                    onClick={addOwnerRow}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    আরও মালিকের নাম যুক্ত করুন
                                </button>
                                {owners.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOwnerRow(index)}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                    >
                                        মালিকের নাম বাদ দিন
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Land Info Section */}
            <div className="md:col-span-3">
                <h4 className="text-center font-bold mt-8 mb-4 text-lg">জমির তথ্য</h4>
                {lands.map((land, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 rounded  mb-4"
                    >
                        <div className="md:col-span-4">
                            <label className="block text-gray-400 font-medium mb-1">
                                {index + 1}. নং জমির শ্রেণী <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="call_of_land[]"
                                placeholder="জমির শ্রেণী"
                                required
                                value={land.landClass}
                                onChange={(e) => handleLandChange(index, "landClass", e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>

                        <div className="md:col-span-4">
                            <label className="block text-gray-400 font-medium mb-1">
                                {index + 1}. নং জমির পরিমাণ <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="amount_of_land[]"
                                placeholder="জমির পরিমাণ"
                                required
                                value={land.landAmount}
                                onChange={(e) => handleLandChange(index, "landAmount", e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>

                        <div className="md:col-span-4">
                            <label className="block text-gray-400 font-medium mb-1">
                                {index + 1}. নং জমির দাগ নং <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="stain_no[]"
                                placeholder="দাগ নং"
                                required
                                value={land.stainNo}
                                onChange={(e) => handleLandChange(index, "stainNo", e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 text-black"
                            />
                        </div>

                        {index === lands.length - 1 && (
                            <div className="md:col-span-12 flex justify-between items-center gap-4 mt-3">
                                {/* Green Add Button on the Left */}
                                <button
                                    type="button"
                                    onClick={addLandRow}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    আরও জমির তথ্য যুক্ত করুন
                                </button>

                                {/* Red Remove Button on the Right (only if more than one row) */}
                                {lands.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeLandRow(index)}
                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                    >
                                        জমির তথ্য বাদ দিন
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Final Submit Button */}
            <div className="text-center col-span-1 md:col-span-2 mt-6">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                    ফর্ম সাবমিট করুন
                </button>
            </div>
        </form>
    );
};

export default BanglaLandForm;
