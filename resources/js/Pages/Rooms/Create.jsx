import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';

export default function Create({ rooms }) {
  const { data, setData, post, errors } = useForm({
    customer_name: '',
    customer_phone: '',
    room_id: '',
    check_in_date: '',
    check_out_date: '',
  });

  const availableRooms = rooms
    .filter((room) => room.status === 'not_reserved' && /^([AB]10?|A[1-9]|B[1-9])$/.test(room.room_number))
    .sort((a, b) => {
      const getNumber = (room) => parseInt(room.room_number.slice(1), 10);
      return getNumber(a) - getNumber(b);
    });

  // ใช้ Set เพื่อกรองห้องที่ไม่ซ้ำ
  const uniqueRooms = Array.from(new Set(availableRooms.map(room => room.room_number)))
    .map(roomNumber => availableRooms.find(room => room.room_number === roomNumber));

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data sent to backend:", data); // 🛠 ตรวจสอบค่าที่ถูกส่ง

    post('/bookings', {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'การจองสำเร็จ',
          text: 'การจองของคุณถูกบันทึกแล้ว',
        });
      },
      onError: (errors) => {
        console.error("Error response:", errors);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: errors.room_id || errors.message || 'กรุณาลองใหม่อีกครั้ง',
        });
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-black-700 mb-6">เพิ่มการจองที่พัก</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">ชื่อของลูกค้า</label>
            <input
              type="text"
              value={data.customer_name}
              onChange={(e) => setData('customer_name', e.target.value)}
              className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.customer_name && <div className="text-red-500 mt-1">{errors.customer_name}</div>}
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">เบอร์โทร</label>
            <input
              type="text"
              value={data.customer_phone}
              onChange={(e) => setData('customer_phone', e.target.value)}
              className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.customer_phone && <div className="text-red-500 mt-1">{errors.customer_phone}</div>}
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">เลขห้อง</label>
            <select
              value={data.room_id || ''}
              onChange={(e) => setData('room_id', e.target.value)}
              className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- เลือกหมายเลขห้อง --</option>
              {uniqueRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.room_number}
                </option>
              ))}
            </select>

            {errors.room_id && <div className="text-red-500 mt-1">{errors.room_id}</div>}
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">วันที่เช็คอิน</label>
            <input
              type="date"
              value={data.check_in_date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setData('check_in_date', e.target.value)}
              className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.check_in_date && <div className="text-red-500 mt-1">{errors.check_in_date}</div>}
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">วันที่เช็คเอาท์</label>
            <input
              type="date"
              value={data.check_out_date}
              min={data.check_in_date || new Date().toISOString().split('T')[0]}
              onChange={(e) => setData('check_out_date', e.target.value)}
              className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.check_out_date && <div className="text-red-500 mt-1">{errors.check_out_date}</div>}
          </div>

          <button
            type="submit"
            className="p-3 w-full rounded-lg shadow-lg text-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
