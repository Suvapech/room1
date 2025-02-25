<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * สร้างตาราง room_statuses สำหรับเก็บข้อมูลสถานะของห้องในช่วงเวลาต่างๆ
     */
    public function up(): void
    {
        Schema::create('room_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained(); // เชื่อมกับตาราง rooms
            $table->enum('status', ['not_reserved', 'reserved']); // สถานะห้อง
            $table->date('start_date'); // วันที่เริ่มต้นสถานะ
            $table->date('end_date'); // วันที่สิ้นสุดสถานะ
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     * ลบตาราง room_statuses
     */
    public function down(): void
    {
        Schema::dropIfExists('room_statuses');
    }
};
