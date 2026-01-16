import { Star, Lock, Check, ShoppingCart } from 'lucide-react';

const AvatarCard = ({ avatar, isOwned, isEquipped, onPurchase, onEquip, userXP }) => {
  const canAfford = userXP >= avatar.price;

  return (
    <div
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
    >
      {/* Rarity gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${avatar.rarityColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

      {/* Avatar Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-violet-900/20 to-purple-900/20">
        <img 
          src={avatar.image} 
          alt={avatar.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Rarity Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r ${avatar.rarityColor} text-white text-xs font-bold shadow-lg`}>
          {avatar.rarity}
        </div>

        {/* Status Badge */}
        {isEquipped && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-bold flex items-center gap-1">
            <Check size={12} />
            Equipped
          </div>
        )}
        {isOwned && !isEquipped && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-500/90 text-white text-xs font-bold">
            Owned
          </div>
        )}
        {!isOwned && !canAfford && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gray-500/90 text-white text-xs font-bold flex items-center gap-1">
            <Lock size={12} />
            Locked
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="relative p-6">
        <h3 className="text-xl font-bold text-white mb-2">{avatar.name}</h3>
        <p className="text-sm text-gray-400 mb-4">{avatar.description}</p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className={`${canAfford || isOwned ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} size={18} />
            <span className={`text-lg font-bold ${canAfford || isOwned ? 'text-yellow-400' : 'text-gray-500'}`}>
              {avatar.price} XP
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {isEquipped ? (
          <button
            disabled
            className="w-full py-3 rounded-lg bg-green-900/30 border border-green-500/50 text-green-400 font-semibold cursor-default"
          >
            ✓ Currently Equipped
          </button>
        ) : isOwned ? (
          <button
            onClick={() => onEquip(avatar)}
            className="w-full py-3 rounded-lg bg-blue-900/30 border border-blue-500/50 text-blue-300 font-semibold hover:bg-blue-900/50 transition-all duration-300"
          >
            Equip Avatar
          </button>
        ) : canAfford ? (
          <button
            onClick={() => onPurchase(avatar)}
            className="w-full py-3 rounded-lg bg-violet-900/30 border border-violet-500/50 text-violet-300 font-semibold hover:bg-violet-900/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Purchase
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3 rounded-lg bg-gray-800 text-gray-500 font-semibold cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Lock size={18} />
            Insufficient XP
          </button>
        )}
      </div>
    </div>
  );
};

export default AvatarCard;
