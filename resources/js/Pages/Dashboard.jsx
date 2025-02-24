import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const rooms = [
    {
        name: "A1",
        rating: 8.5,
        image: [
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/122734355.jpg?k=a583d27d6b231b7f4de4b611d7faffcf641022de6fa7e37d5d36abd4a19cbe77&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/122734377.jpg?k=d5f01274a8d02f661bdbe03bf28737ce78c89cc780e6c5affc96ce6bdf34ace2&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/122734412.jpg?k=94096958cc19642f88516e8e7c4ad75bc1906281a0a87288967e2e7abf37ef3d&o=&hp=1",
        ],
        type: "Sigle"
    },
    {
        name: "A2",
        rating: 8.1,
        image: [
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/122734414.jpg?k=dd055c9ff8bbbf50d6900f5ba9a6488bdc69e1e9eadf7ff129761feabb63fadb&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/122734330.jpg?k=ce192e3e9f871f2d4d0a81aa00e44d236dbeef632fdf80c2746397704f581f41&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/122734383.jpg?k=1d07b7f002bf92d9d5c26cba8e28074db23e20c8f0c9fa2f122ec833b9907da7&o=&hp=1",
        ],
        type: "Sigle"
    },
    {
        name: "A3",
        rating: 8.0,
        image: [
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/144470675.jpg?k=dbd1b7902bed8f060cd3e478f8b748b7c2393c4aaafe579229b37485e6fb3271&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/144471664.jpg?k=1d628a3fb512585fdda2ca34e4c5151405c196510aefe331e005e527bbab09a2&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/144470771.jpg?k=107e707d1e5a6305d4bf49890a3bfb4cf3855dc6e3f5cb29737a9386fa789b0b&o=&hp=1",
        ],
        type: "Sigle"
    },
    {
        name: "A4",
        rating: 7.0,
        image: [
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/144470844.jpg?k=5080c3a0e74a04bcf06a1a05b0f79c9a6471208a22946ddf7a969fe62ffd6cdd&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/144470681.jpg?k=985423ce89acc30648f19db1e8ca1a9483584ca99591303cf00cfa5972d683a9&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/144472473.jpg?k=c9bd509b141a3b2b47b7d2dd05424f4c7ccd2008c3a5ff4dec21ded4467cd907&o=&hp=1",
        ],
        type: "Sigle"
    },
    {
        name: "A5",
        rating: 9.0,
        image: [
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/144470836.jpg?k=d1e40b763a41867828256ab29bc2f7cee338eaf54b179bb997e711a367720c79&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/144474578.jpg?k=da154d425c2e41a763277f7b4e671216a429759c4fa94ecbbae8449e7679863e&o=&hp=1",
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/144471511.jpg?k=91117eee471481d2db2556861d49aee3403036710f74a29f5ef68d6432ecd179&o=&hp=1",
        ],
        type: "Double"
    },
    {
        name: "The Corner's unique house",
        location: "เชียงใหม่, ไทย",
        rating: 9.7,
        reviews: 18,
        image: "/images/room2.jpg",
        type: "Double"
    },
    {
        name: "Villa Rajapruek Entire 3 villa with pool near Airport and city center",
        location: "เชียงใหม่, ไทย",
        rating: 9.4,
        reviews: 12,
        image: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/00/43/9f/b2-chang-phueak-gate.jpg?w=1200&h=-1&s=1",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/00/43/9c/deluxe-premier-room.jpg?w=1200&h=-1&s=1",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/00/43/9b/b2-chang-phueak-gate.jpg?w=1200&h=-1&s=1",
        ],
        type: "villa"
    },
    {
        name: "Villa 89 Nimman Chiang Mai",
        location: "เชียงใหม่, ไทย",
        rating: 9.3,
        reviews: 12,
        image: "/images/room4.jpg",
        type: "Sweet"
    }
];

export default function RoomRecommendation() {
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [selectedType, setSelectedType] = useState("all");
    const [modalImages, setModalImages] = useState([]);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const savedReviews = localStorage.getItem("reviews");
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
    }, []);

    const filteredRooms = selectedType === "all" ? rooms : rooms.filter(room => room.type === selectedType);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            let newReviews;
            if (editingIndex !== null) {
                newReviews = reviews.map((rev, index) => index === editingIndex ? comment : rev);
                setEditingIndex(null);
            } else {
                newReviews = [...reviews, comment];
            }
            setReviews(newReviews);
            localStorage.setItem("reviews", JSON.stringify(newReviews));
            setComment("");
        }
    };

    const handleDeleteReview = (index) => {
        const newReviews = reviews.filter((_, i) => i !== index);
        setReviews(newReviews);
        localStorage.setItem("reviews", JSON.stringify(newReviews));
    };

    const handleEditReview = (index) => {
        setComment(reviews[index]);
        setEditingIndex(index);
        setDropdownIndex(null);
    };

    const openModal = (images, index) => {
        setModalImages(images);
        setModalImageIndex(index);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalImages([]);
        setModalImageIndex(0);
    };

    const navigateImages = (direction) => {
        const nextIndex = (modalImageIndex + direction + modalImages.length) % modalImages.length;
        setModalImageIndex(nextIndex);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-bold leading-tight text-gray-800">
                    แนะนำห้องพัก
                </h2>
            }
        >
            <Head title="แนะนำห้องพัก" />

            <div className="py-12 bg-gray-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-semibold mb-4">ยังสนใจที่พักเหล่านี้อยู่ใช่ไหม?</h3>

                    <div className="mb-6">
                        <label htmlFor="room-type" className="mr-2 text-lg font-medium">เลือกประเภทห้องพัก</label>
                        <select
                            id="room-type"
                            className="w-64 p-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="all">ทั้งหมด</option>
                            <option value="Sigle">Sigle</option>
                            <option value="Double">Double</option>
                            <option value="Sweet">Sweet</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredRooms.map((room, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                                <img
                                    src={Array.isArray(room.image) ? room.image[0] : room.image}
                                    alt={room.name}
                                    className="w-full h-48 object-cover transition-transform duration-500 transform hover:scale-110 cursor-pointer"
                                    onClick={() => openModal(room.image, 0)}
                                />
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold text-gray-800">{room.name}</h4>
                                    <p className="text-gray-600 text-sm">{room.location}</p>
                                    <p className="mt-2 text-blue-600 font-semibold">{room.rating} ★ </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {modalVisible && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="relative bg-white p-8 rounded-xl shadow-2xl w-[90%] max-w-2xl">
                                {/* ปุ่มปิดโมดอล */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-3 right-3 p-3 text-white bg-red-500 hover:bg-red-700 transition-all rounded-full shadow-md"
                                >
                                    ✕
                                </button>

                                <div className="flex items-center justify-center space-x-6">
                                    {/* ปุ่ม Prev */}
                                    <button
                                        onClick={() => navigateImages(-1)}
                                        className="px-5 py-3 text-white hover:bg-blue-700 transition-all rounded-lg shadow-md"
                                    >
                                        ◀
                                    </button>

                                    {/* รูปภาพ */}
                                    <img
                                        src={modalImages[modalImageIndex]}
                                        alt="Room"
                                        className="max-w-full max-h-96 object-contain rounded-lg shadow-md"
                                    />

                                    {/* ปุ่ม Next */}
                                    <button
                                        onClick={() => navigateImages(1)}
                                        className="px-5 py-3 text-white hover:bg-blue-700 transition-all rounded-lg shadow-md"
                                    >
                                        ▶
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">ช่องทางการติดต่อ</h3>
                        <p className="text-lg">โทรศัพท์: <span className="text-blue-500">012-345-6789</span></p>
                        <p className="text-lg">อีเมล: <span className="text-blue-500">contact@example.com</span></p>
                        <p className="text-lg">ที่อยู่: <span className="text-blue-500">123 ถนนตัวอย่าง, เชียงใหม่, ไทย</span></p>
                    </div>

                    <div className="mt-8 p-6 bg-white shadow-sm rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">แสดงความคิดเห็น</h3>
                        <form onSubmit={handleReviewSubmit}>
                            <textarea
                                className="w-full p-2 border rounded-lg"
                                rows="3"
                                placeholder="เขียนความคิดเห็นของคุณที่นี่..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button
                                type="submit"
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            >
                                {editingIndex !== null ? "อัปเดตความคิดเห็น" : "ส่งความคิดเห็น"}
                            </button>
                        </form>
                        <div className="mt-4">
                            <h4 className="text-md font-semibold">ความคิดเห็นล่าสุด</h4>
                            <ul className="mt-2 space-y-2">
                                {reviews.map((review, index) => (
                                    <li key={index} className="p-2 bg-gray-100 rounded-lg flex justify-between items-center relative">
                                        <span>{review}</span>
                                        <div>
                                            <button 
                                                className="ml-4 px-2 py-1 bg-gray-300 rounded-lg"
                                                onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
                                            >
                                                ⋮
                                            </button>
                                            {dropdownIndex === index && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-50">
                                                    <button
                                                        onClick={() => handleEditReview(index)}
                                                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                                    >
                                                        แก้ไข
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteReview(index)}
                                                        className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-200"
                                                    >
                                                        ลบ
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
