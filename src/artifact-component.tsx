import React, { useState } from 'react';
import { Plus, Minus, Lock, Send, Plane, ChevronDown } from 'lucide-react';

// Define interfaces for your props
interface UserProfileProps {
  name: string;
}

interface BitBoxMainProps {
  totalAmount: number;
  lockedAmount: number;
  onLockClick: () => void;
  activeLocks: Lock[];
}

interface Lock {
  amount: number;
  duration: number;
  recipientId: string;
  endDate: string;
  name: string;
  gender: string;
  age: string;
}

interface BitBoxLockScreenProps {
  onCreateLock: (lockData: Lock) => void;
}

const UserProfile = ({ name }: UserProfileProps) => {
  const initials = name.split(' ').map((n: string) => n[0]).join('');
  return (
    <div className="absolute top-8 right-8 flex items-center gap-3">
      <span className="text-white text-sm">{name}</span>
      <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-medium">{initials}</span>
      </div>
    </div>
  );
};

const BitBoxMain = ({ totalAmount, lockedAmount, onLockClick, activeLocks }: BitBoxMainProps) => {
  return (
    <div className="bg-slate-900 min-h-screen relative">
      <UserProfile name="Yaniv Raveh" />
      
      <div className="max-w-md mx-auto pt-8 px-8">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-yellow-500"></div>
          <span className="text-white text-2xl font-bold">Bit Box</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6">
          <div className="text-center mb-8">
            <div className="text-gray-500 text-sm mb-1">Total</div>
            <div className="text-4xl font-bold">{totalAmount.toFixed(2)} ILS</div>
            <div className="text-gray-500 text-sm mt-2">
              Locked: <span className="text-gray-700">{lockedAmount.toFixed(2)} ILS</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center mb-2">
                <Plus className="text-white w-6 h-6" />
              </div>
              <span className="text-sm text-gray-700">Fund</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center mb-2">
                <Minus className="text-white w-6 h-6" />
              </div>
              <span className="text-sm text-gray-700">Defund</span>
            </button>

            <button 
              className="flex flex-col items-center"
              onClick={onLockClick}
            >
              <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center mb-2">
                <Lock className="text-white w-6 h-6" />
              </div>
              <span className="text-sm text-gray-700">Lock</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center mb-2">
                <Send className="text-white w-6 h-6" />
              </div>
              <span className="text-sm text-gray-700">Transfer</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto mt-6 space-y-4">
        <div className="bg-slate-800 rounded-2xl p-4">
          <h2 className="text-gray-400 text-sm mb-4">Active Locks</h2>
          {activeLocks.map((lock: Lock, index: number) => (
            <div key={index} className="bg-slate-700 rounded-lg p-4 mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">{lock.amount.toFixed(2)} ILS</span>
                <span className="text-gray-400 text-sm">{lock.duration} days left</span>
              </div>
              <div className="text-gray-400 text-sm">
                Locked for: {lock.recipientId}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-800 rounded-2xl p-4 max-w-md mx-auto mt-4">
        <h2 className="text-gray-400 text-sm">Recent Transactions</h2>
      </div>
    </div>
  );
};

const BitBoxLockScreen = ({ onCreateLock }: BitBoxLockScreenProps) => {
  const [formData, setFormData] = useState({
    recipientId: '',
    amount: '',
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    name: 'Yaniv Raveh',
    gender: '',
    age: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onCreateLock({
      ...formData,
      amount: parseFloat(formData.amount),
      duration: 30
    });
  };

  return (
    <div className="px-8 pb-8">
      <UserProfile name="Yaniv Raveh" />
      
      {/* Logo and Title */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 bg-yellow-500"></div>
        <span className="text-white text-2xl font-bold">Bit Box</span>
      </div>

      {/* Lock Type Icon */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center">
          <Plane className="text-white w-8 h-8" />
        </div>
        <div className="text-white text-sm mt-2 flex items-center gap-1">
          Ticket lock
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Recipient ID</label>
            <input 
              type="text" 
              name="recipientId"
              className="w-full bg-slate-800 rounded-lg p-3 text-white border-none" 
              value={formData.recipientId}
              onChange={handleInputChange}
              placeholder="Enter recipient ID"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Amount</label>
            <input 
              type="number" 
              name="amount"
              className="w-full bg-slate-800 rounded-lg p-3 text-white border-none" 
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">End date</label>
            <input 
              type="text" 
              name="endDate"
              className="w-full bg-slate-800 rounded-lg p-3 text-white border-none" 
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Name</label>
            <input 
              type="text" 
              name="name"
              className="w-full bg-slate-800 rounded-lg p-3 text-white border-none"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Gender and Age on same line */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Gender</label>
              <select 
                name="gender"
                className="w-full bg-slate-800 rounded-lg p-3 text-white border-none appearance-none"
                value={formData.gender}
                onChange={handleInputChange}
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
                        backgroundPosition: 'right 12px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '20px' }}
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Age</label>
              <select 
                name="age"
                className="w-full bg-slate-800 rounded-lg p-3 text-white border-none appearance-none"
                value={formData.age}
                onChange={handleInputChange}
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
                        backgroundPosition: 'right 12px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '20px' }}
              >
                <option value="" disabled>Select age</option>
                <option value="adult">Adult</option>
                <option value="child">Child</option>
              </select>
            </div>
          </div>
        </div>

        {/* Create Lock Button */}
        <button 
          className="w-full bg-yellow-500 text-slate-900 rounded-full py-4 font-semibold mt-6"
          onClick={handleSubmit}
        >
          Create lock
        </button>
      </div>
    </div>
  );
};

const BitBoxApp = () => {
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [totalAmount] = useState(1000);
  const [lockedAmount, setLockedAmount] = useState(0);
  const [activeLocks, setActiveLocks] = useState<Lock[]>([]);

  const handleCreateLock = (lockData: Lock) => {
    setLockedAmount(prev => prev + lockData.amount);
    setActiveLocks(prev => [...prev, lockData]);
    setShowLockScreen(false);
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div 
        className="w-full max-w-md mx-auto h-[100vh] relative bg-slate-900 pt-8"
        style={{ 
          transform: 'scale(1.3)',
          transformOrigin: 'top center'
        }}
      >
        {showLockScreen ? (
          <BitBoxLockScreen onCreateLock={handleCreateLock} />
        ) : (
          <BitBoxMain 
            totalAmount={totalAmount}
            lockedAmount={lockedAmount}
            onLockClick={() => setShowLockScreen(true)}
            activeLocks={activeLocks}
          />
        )}
      </div>
    </div>
  );
};

export default BitBoxApp;
