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

const QeditLogo = () => (
  <svg width="70" height="40" viewBox="0 0 140 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g xmlns="http://www.w3.org/2000/svg" id="Group_1111" data-name="Group 1111" >
      <path id="Path_633" data-name="Path 633" d="M48.507,2669.484c0-9.044-6.907-15.8-16.26-15.8-9.322,0-16.2,6.752-16.2,15.8s6.876,15.795,16.2,15.795a17.738,17.738,0,0,0,5.642-.922v-8.664a7.886,7.886,0,0,1-5.43,2.059c-4.553,0-7.959-3.406-7.959-8.269s3.407-8.27,7.959-8.27a7.87,7.87,0,0,1,7.99,8.27h0v13.8h0v12.133h8.052v-25.469l-.006,0C48.5,2669.79,48.507,2669.637,48.507,2669.484Z" transform="translate(-16.049 -2643.551)" fill="#fff"/>
      <path id="Path_634" data-name="Path 634" d="M494.234,2666.456h13.287c-.743-3.841-3.066-6.008-6.535-6.008-3.81,0-6.04,2.292-6.752,6.008m21.4,2.788a23.239,23.239,0,0,1-.155,2.725H494.2c.867,4.336,3.9,6.225,7.712,6.225a12.136,12.136,0,0,0,7.588-2.88l4.739,5.2c-3.407,3.128-7.743,4.552-12.791,4.552-9.2,0-15.578-6.256-15.578-15.7s6.194-15.889,15.176-15.889c8.641,0,14.556,6.412,14.588,15.765" transform="translate(-451.083 -2643.358)" fill="#fff"/>
      <g id="Group_1110" data-name="Group 1110" transform="translate(104.685 0)">
        <rect id="Rectangle_193" data-name="Rectangle 193" width="8.084" height="30.819" transform="translate(0 10.118)" fill="#fff"/>
        <rect id="Rectangle_194" data-name="Rectangle 194" width="8.084" height="7.101" fill="#fff"/>
      </g>
      <path id="Path_635" data-name="Path 635" d="M1629.3,2534.1h-9.456v11.771c0,3.748,1.982,5.111,4.491,5.111a11.733,11.733,0,0,0,5.637-1.951l2.974,6.318A16.749,16.749,0,0,1,1623,2558.5c-7.434,0-11.243-4.212-11.243-9.761v-31.95h8.083v10.118h9.456Z" transform="translate(-1493.603 -2516.792)" fill="#fff"/>
      <path id="Path_636" data-name="Path 636" d="M951.14,2516.792h-8.052v12.133a17.212,17.212,0,0,0-8.207-2c-9.323,0-16.2,6.752-16.2,15.8s6.876,15.795,16.2,15.795c9.353,0,16.26-6.751,16.26-15.795,0-.154,0-.307-.006-.459l.006,0Zm-16.26,34.2c-4.553,0-7.959-3.407-7.959-8.27s3.407-8.269,7.959-8.269a8.274,8.274,0,0,1,0,16.539Z" transform="translate(-851.844 -2516.792)" fill="#fff"/>
    </g>  
  </svg>
);

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
            <div className="text-gray-500 text-sm mt-2 flex items-center justify-center gap-1">
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
              <div className="text-gray-400 text-sm mb-2">
                Locked for: {lock.recipientId}
              </div>
              <div className="flex items-center justify-end gap-1">
                <span className="text-xs text-white">Verified by
                <QeditLogo />
                </span>
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
