import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AvailableRooms() {
  const { rooms = [] } = usePage().props;
  const [availableRooms, setAvailableRooms] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  useEffect(() => {
    console.log("Rooms data received:", rooms);

    const roomsAvailable = rooms.filter(room => room.status === 'not_reserved');

    const uniqueRooms = Array.from(new Set(roomsAvailable.map(room => room.room_number)))
      .map(roomNumber => roomsAvailable.find(room => room.room_number === roomNumber));

    const sortedRooms = uniqueRooms.sort((a, b) => {
      const getLetter = room => room.room_number.charAt(0);
      const getNumber = room => parseInt(room.room_number.slice(1), 10);

      if (getLetter(a) === getLetter(b)) {
        return getNumber(a) - getNumber(b);
      }
      return getLetter(a).localeCompare(getLetter(b));
    });

    setAvailableRooms(sortedRooms);
  }, [rooms]);

  const handleFilterByDate = () => {
    if (!checkInDate || !checkOutDate) {
      alert('กรุณาเลือกวันที่ Check-in และ Check-out');
      return;
    }

    const filteredRooms = availableRooms.filter(room => {
      const roomAvailableFrom = new Date(room.available_from);
      const roomAvailableTo = new Date(room.available_to);
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      return roomAvailableFrom <= checkIn && roomAvailableTo >= checkOut;
    });

    setAvailableRooms(filteredRooms);
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-black-600">ห้องที่สามารถจองได้</h2>

        {/* 🔥 ฟอร์มเลือกช่วงเวลาการจอง */}
        <div className="flex justify-center gap-4 mb-6">
          <div>
            <label className="block text-gray-700">Check-in</label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Check-out</label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
          <button
            onClick={handleFilterByDate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 mt-6"
          >
            ค้นหาห้องว่าง
          </button>
        </div>

        {availableRooms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                  <th className="py-3 px-4 text-left">หมายเลขห้อง</th>
                  <th className="py-3 px-4 text-left">สถานะ</th>
                  <th className="py-3 px-4 text-left">ราคา</th>
                  <th className="py-3 px-4 text-left">รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                {availableRooms.map((room, index) => (
                  <tr key={index} className="border-b hover:bg-blue-100 odd:bg-gray-50">
                    <td className="py-3 px-4">{room.room_number}</td>
                    <td className="py-3 px-4 text-green-600">{room.status}</td>
                    <td className="py-3 px-4">{(1000).toLocaleString()} บาท</td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/rooms/${room.id}/details`}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
                      >
                        ดูรายละเอียด
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-6 text-gray-500">ไม่มีห้องว่าง</p>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
