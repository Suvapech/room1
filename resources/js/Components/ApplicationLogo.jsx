export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="https://static.vecteezy.com/system/resources/thumbnails/022/056/613/small_2x/cute-funny-happy-white-kitten-cat-cartoon-character-doodle-drawing-png.png" // เปลี่ยนลิงก์เป็นลิงก์ของโลโก้คุณ
            alt="Application Logo"
            style={{ width: '80px', height: 'auto' }} // ปรับขนาดตามต้องการ
        />
    );
}

