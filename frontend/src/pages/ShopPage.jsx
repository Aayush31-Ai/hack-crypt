import { useState } from 'react';
import { Star, Sparkles, ShoppingBag, User } from 'lucide-react';
import CurrentUser from '../playerData/CurrentUser';
import ShopHeader from '../components/Shop/ShopHeader';
import AvatarCard from '../components/Shop/AvatarCard';
import PurchaseModal from '../components/Shop/PurchaseModal';

// Avatar items available in shop
const shopAvatars = [
  {
    id: 1,
    name: "Normal Boy",
    image: "/assets/avataar/normal-boy.jpg",
    price: 100,
    description: "Classic everyday hero look",
    rarity: "Common",
    rarityColor: "from-gray-400 to-gray-600"
  },
  {
    id: 2,
    name: "Normal Girl",
    image: "/assets/avataar/normal-girl.jpg",
    price: 100,
    description: "Elegant and simple style",
    rarity: "Common",
    rarityColor: "from-gray-400 to-gray-600"
  },
  {
    id: 3,
    name: "Intellectual Boy",
    image: "/assets/avataar/intelectual-boy.jpg",
    price: 300,
    description: "For the deep thinkers",
    rarity: "Rare",
    rarityColor: "from-blue-400 to-blue-600"
  },
  {
    id: 4,
    name: "Level UP Boy",
    image: "/assets/avataar/level-UP-boy.jpg",
    price: 500,
    description: "Powered up and ready",
    rarity: "Epic",
    rarityColor: "from-purple-400 to-purple-600"
  },
  {
    id: 5,
    name: "Level Up Girl",
    image: "/assets/avataar/level-up-girl.jpg",
    price: 500,
    description: "Elite warrior status",
    rarity: "Epic",
    rarityColor: "from-purple-400 to-purple-600"
  },
  {
    id: 6,
    name: "Cosmic Boy",
    image: "/assets/avataar/cosmic-boy.jpg",
    price: 1000,
    description: "Master of the universe",
    rarity: "Legendary",
    rarityColor: "from-yellow-400 to-orange-600"
  },
  {
    id: 7,
    name: "Cosmic Girl",
    image: "/assets/avataar/cosmic-girl.jpg",
    price: 1000,
    description: "Celestial champion",
    rarity: "Legendary",
    rarityColor: "from-yellow-400 to-orange-600"
  }
];

const ShopPage = () => {
  const [userXP, setUserXP] = useState(CurrentUser.xp);
  const [currentAvatar, setCurrentAvatar] = useState(CurrentUser.avatar);
  const [ownedAvatars, setOwnedAvatars] = useState([CurrentUser.avatar]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState({ type: '', message: '' });

  const handlePurchase = (avatar) => {
    setSelectedAvatar(avatar);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    if (!selectedAvatar) return;

    // Check if user has enough XP
    if (CurrentUser.xp < selectedAvatar.price) {
      setPurchaseStatus({
        type: 'error',
        message: `Not enough XP! You need ${selectedAvatar.price - CurrentUser.xp} more XP.`
      });
      setTimeout(() => setPurchaseStatus({ type: '', message: '' }), 3000);
      setShowPurchaseModal(false);
      return;
    }

    // Check if already owned
    if (ownedAvatars.includes(selectedAvatar.image)) {
      setPurchaseStatus({
        type: 'info',
        message: 'You already own this avatar!'
      });
      setTimeout(() => setPurchaseStatus({ type: '', message: '' }), 3000);
      setShowPurchaseModal(false);
      return;
    }

    // Deduct XP
    CurrentUser.xp -= selectedAvatar.price;
    setUserXP(CurrentUser.xp);

    // Add avatar to owned collection
    const newOwnedAvatars = [...ownedAvatars, selectedAvatar.image];
    setOwnedAvatars(newOwnedAvatars);

    // Set as current avatar
    CurrentUser.avatar = selectedAvatar.image;
    setCurrentAvatar(selectedAvatar.image);

    setPurchaseStatus({
      type: 'success',
      message: `🎉 ${selectedAvatar.name} purchased and equipped! -${selectedAvatar.price} XP`
    });
    
    setTimeout(() => setPurchaseStatus({ type: '', message: '' }), 3000);
    setShowPurchaseModal(false);
    setSelectedAvatar(null);
  };

  const handleEquip = (avatar) => {
    if (!ownedAvatars.includes(avatar.image)) {
      setPurchaseStatus({
        type: 'error',
        message: 'You need to purchase this avatar first!'
      });
      setTimeout(() => setPurchaseStatus({ type: '', message: '' }), 3000);
      return;
    }

    CurrentUser.avatar = avatar.image;
    setCurrentAvatar(avatar.image);
    
    setPurchaseStatus({
      type: 'success',
      message: `✨ ${avatar.name} equipped!`
    });
    setTimeout(() => setPurchaseStatus({ type: '', message: '' }), 3000);
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
    setSelectedAvatar(null);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Component */}
        <ShopHeader userXP={userXP} currentAvatar={currentAvatar} />

        {/* Status Messages */}
        {purchaseStatus.message && (
          <div className={`mb-6 p-4 rounded-xl backdrop-blur-md border ${
            purchaseStatus.type === 'success' ? 'bg-green-900/30 border-green-500/50 text-green-300' :
            purchaseStatus.type === 'error' ? 'bg-red-900/30 border-red-500/50 text-red-300' :
            'bg-blue-900/30 border-blue-500/50 text-blue-300'
          }`}>
            <p className="font-semibold">{purchaseStatus.message}</p>
          </div>
        )}

        {/* Shop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopAvatars.map(avatar => (
            <AvatarCard
              key={avatar.id}
              avatar={avatar}
              isOwned={ownedAvatars.includes(avatar.image)}
              isEquipped={currentAvatar === avatar.image}
              onPurchase={handlePurchase}
              onEquip={handleEquip}
              userXP={userXP}
            />
          ))}
        </div>

      </div>

      {/* Purchase Confirmation Modal */}
      {showPurchaseModal && selectedAvatar && (
        <PurchaseModal
          avatar={selectedAvatar}
          userXP={userXP}
          onConfirm={confirmPurchase}
          onClose={closePurchaseModal}
        />
      )}
    </div>
  );
};

export default ShopPage;
