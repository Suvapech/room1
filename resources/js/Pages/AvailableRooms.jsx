import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AvailableRooms() {
  const { rooms = [] } = usePage().props;  // รับข้อมูลห้องจาก props
  const [availableRooms, setAvailableRooms] = useState([]);  // เก็บห้องที่ว่าง

  useEffect(() => {
    // กรองห้องที่มีสถานะเป็น 'available'
    const roomsAvailable = rooms.filter(room => room.status === 'available');
    setAvailableRooms(roomsAvailable);  // อัปเดตสถานะห้องที่ว่าง
  }, [rooms]);

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-black-600">ห้องที่ว่างอยู่</h2>

        {availableRooms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                  <th className="py-3 px-4 text-left">หมายเลขห้อง</th>
                  <th className="py-3 px-4 text-left">สถานะห้อง</th>
                  <th className="py-3 px-4 text-left">ราคา</th>
                  <th className="py-3 px-4 text-left">รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                {availableRooms.map((room, index) => (
                  <tr key={index} className="border-b hover:bg-blue-100 odd:bg-gray-50">
                    <td className="py-3 px-4">{room.room_number}</td>
                    <td className="py-3 px-4 text-green-600">{room.status}</td>
                    <td className="py-3 px-4">{room.price_per_night} บาท</td>
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
