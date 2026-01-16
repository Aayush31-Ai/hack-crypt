import { Star, ShoppingBag, User } from 'lucide-react';

const ShopHeader = ({ userXP, currentAvatar }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-18 h-18 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <ShoppingBag size={48} className="text-white" />
        </div>
        <div>
          <h1 className="text-5xl font-black mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
              Avatar Shop
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Purchase avatars with your XP ✨</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="flex gap-4 flex-wrap">
        <div className="px-6 py-3 bg-violet-900/30 border border-violet-500/30 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Star className="text-violet-400" size={20} />
            <div>
              <p className="text-xs text-gray-400">Available XP</p>
              <p className="text-xl font-bold text-violet-300">{userXP.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <User className="text-purple-400" size={20} />
            <div>
              <p className="text-xs text-gray-400">Current Avatar</p>
              <div className="flex items-center gap-2">
                <img 
                  src={currentAvatar} 
                  alt="Current Avatar" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-purple-400"
                />
                <p className="text-sm font-bold text-purple-300">Equipped</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
