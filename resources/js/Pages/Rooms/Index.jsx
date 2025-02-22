import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import Swal from 'sweetalert2';

export default function Index() {
  const { bookings = [] } = usePage().props;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const itemsPerPage = 10;

  // เมื่อโหลดหน้าเว็บใหม่ ให้กรองข้อมูลที่ถูกลบออกจากการแสดงผล
  useEffect(() => {
    const deletedBookings = JSON.parse(localStorage.getItem('deletedBookings')) || [];
    const updatedBookings = bookings.filter(booking => !deletedBookings.includes(booking.id));
    setFilteredBookings(updatedBookings);
  }, [bookings]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = a.check_in_date ? new Date(a.check_in_date) : new Date(0);
    const dateB = b.check_in_date ? new Date(b.check_in_date) : new Date(0);

    const yearA = dateA.getFullYear();
    const yearB = dateB.getFullYear();

    if (yearA !== yearB) {
      return yearA - yearB; // เรียงจากปีเก่าก่อน
    }

    return dateA - dateB;
  });

  const currentBookings = sortedBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const filtered = bookings.filter(booking =>
      [booking.customer_name, booking.customer_phone, booking.room_number]
        .some(field => field?.toLowerCase().includes(e.target.value.toLowerCase()))
    );
    setFilteredBookings(filtered);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'คุณต้องการลบการจองนี้หรือไม่?',
      text: "การลบจะไม่ถูกบันทึกในฐานข้อมูล",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        const deletedBookings = JSON.parse(localStorage.getItem('deletedBookings')) || [];
        deletedBookings.push(id);
        localStorage.setItem('deletedBookings', JSON.stringify(deletedBookings));

        const updatedBookings = filteredBookings.filter(booking => booking.id !== id);
        setFilteredBookings(updatedBookings);

        Swal.fire('ลบสำเร็จ!', 'การจองถูกลบแล้ว', 'success');
      }
    });
  };

  const calculateTotalPrice = (checkInDate, checkOutDate, pricePerNight) => {
    if (!checkInDate || !checkOutDate || !pricePerNight) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const days = (checkOut - checkIn) / (1000 * 3600 * 24); 
    return days > 0 ? days * pricePerNight : 0;
  };

  const roomBookingCount = filteredBookings.reduce((acc, booking) => {
    const room = booking.room_number || "ไม่ระบุ";
    acc[room] = (acc[room] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(roomBookingCount)
    .map(([room, count]) => ({ room, count }))
    .sort((a, b) => a.room.localeCompare(b.room, undefined, { numeric: true }));

  const totalBookings = filteredBookings.length;

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-black-600">รายชื่อการจองที่พัก</h2>

        <div className="flex justify-center mb-6 space-x-4">
          <input
            type="text"
            placeholder="🔍 ค้นหาด้วยชื่อลูกค้า หมายเลขโทรศัพท์ หรือหมายเลขห้อง"
            className="border px-4 py-2 w-2/3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Link
            href="/rooms/create"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
          >
            เพิ่มข้อมูลการจอง
          </Link>
        </div>

        <p className="text-center mb-4 text-lg">ยอดการจองทั้งหมด: {totalBookings} การจอง</p>

        {currentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                  <th className="py-3 px-4 text-left">ชื่อของลูกค้า</th>
                  <th className="py-3 px-4 text-left">หมายเลขโทรศัพท์</th>
                  <th className="py-3 px-4 text-left">หมายเลขห้อง</th>
                  <th className="py-3 px-4 text-left">สถานะห้อง</th>
                  <th className="py-3 px-4 text-left">วันที่เช็คอิน</th>
                  <th className="py-3 px-4 text-left">วันที่เช็คเอาท์</th>
                  <th className="py-3 px-4 text-left">ราคาที่พัก</th>
                  <th className="py-3 px-4 text-center">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, index) => (
                  <tr key={index} className="border-b hover:bg-blue-100 odd:bg-gray-50">
                    <td className="py-3 px-4">{booking.customer_name ?? "ไม่ระบุ"}</td>
                    <td className="py-3 px-4">{booking.customer_phone ?? "ไม่ระบุ"}</td>
                    <td className="py-3 px-4">{booking.room_number ?? "ไม่ระบุ"}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      {booking.room_status === 'not_reserved' ? 'reserved' : booking.room_status}
                    </td>
                    <td className="py-3 px-4">
                      {booking.check_in_date ? new Date(booking.check_in_date).toLocaleDateString() : "ไม่ระบุ"}
                    </td>
                    <td className="py-3 px-4">
                      {booking.check_out_date ? new Date(booking.check_out_date).toLocaleDateString() : "ไม่ระบุ"}
                    </td>
                    <td className="py-3 px-4">
                      {calculateTotalPrice(booking.check_in_date, booking.check_out_date, booking.price_per_night)} บาท
                    </td>
                    <td className="py-3 px-4 flex justify-center space-x-2">
                      <Link
                        href={`/rooms/${booking.id}/edit`}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
                      >
                        แก้ไข
                      </Link>
                      <button onClick={() => handleDelete(booking.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600">
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-6 text-gray-500">ไม่มีข้อมูลการจอง</p>
        )}

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-400 text-black-700 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <span className="self-center">{currentPage} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-400 text-black-700 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-center mb-4">จำนวนการจองตามหมายเลขห้อง</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="room" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AuthenticatedLayout>
  );
}
