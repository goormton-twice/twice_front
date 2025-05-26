import { Heart } from "lucide-react";

export default function HomeSendCheer() {
  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow p-6 text-center space-y-4">
      <div className="flex justify-center">
        <Heart className="w-8 h-8 text-gray-600" />
      </div>
      <div className="text-xl font-semibold text-gray-800">
        사연자님께 따뜻한 응원이 전송되었어요
      </div>
      <div className="text-gray-600">소중한 응원 감사해요!</div>
      <button className="mt-2 px-4 py-2 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition">
        작성한 사연으로 이동
      </button>
    </div>
  );
}