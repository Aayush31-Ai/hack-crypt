import { Star, X, AlertCircle } from 'lucide-react';

const PurchaseModal = ({ avatar, userXP, onConfirm, onClose }) => {
  const canAfford = userXP >= avatar.price;
  const remainingXP = userXP - avatar.price;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0b1220] border border-white/20 rounded-2xl max-w-md w-full overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)]">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-violet-900/30 to-purple-900/30 overflow-hidden">
          <img 
            src={avatar.image} 
            alt={avatar.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Rarity Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r ${avatar.rarityColor} text-white text-xs font-bold`}>
            {avatar.rarity}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{avatar.name}</h2>
          <p className="text-gray-400 mb-6">{avatar.description}</p>

          {/* Transaction Details */}
          <div className="space-y-3 mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Price:</span>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400" size={16} />
                <span className="font-bold text-yellow-400">{avatar.price} XP</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Current XP:</span>
              <span className="font-bold text-white">{userXP} XP</span>
            </div>
            <div className="h-px bg-white/10"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">After Purchase:</span>
              <span className={`font-bold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                {canAfford ? remainingXP : userXP} XP
              </span>
            </div>
          </div>

          {/* Warning if can't afford */}
          {!canAfford && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-300 font-semibold">Insufficient XP</p>
                <p className="text-xs text-red-400">You need {avatar.price - userXP} more XP to purchase this avatar.</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!canAfford}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                canAfford
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canAfford ? 'Confirm Purchase' : 'Cannot Afford'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
