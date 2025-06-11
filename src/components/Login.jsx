import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

export default function Login() {
  const [email, setEmail] = useState('ms954@gmail.com');
  const [password, setPassword] = useState('Mrut@123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [error, setError] = useState("");
  const disPatch = useDispatch();
  const Navigate = useNavigate();
  const handleSubmit = async () => {
    setIsLoading(true);
    try{
        const userData = await axios.post(BASE_URL + "/login", {
            email,
            password,
        }, {withCredentials: true});
        
        console.log('User data:', userData);
        
        setIsLoading(false);
        console.log('Login attempt:', { email, password });
        disPatch(addUser(userData.data));
        return Navigate('/');
    }catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      setIsLoading(false);
      console.error('Login failed:', error);
     
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Login Card */}
        <div className="bg-base-300 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 p-6 my-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Lock className="w-6 h-6 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              Sign In
            </h2>
            <p className="text-gray-400 text-sm">Welcome back </p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <div className={`relative transition-all duration-200 ${
                focusedField === 'email' ? 'transform scale-[1.01]' : ''
              }`}>
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                  focusedField === 'email' ? 'text-gray-300' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Email address"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:bg-gray-700/70 transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className={`relative transition-all duration-200 ${
                focusedField === 'password' ? 'transform scale-[1.01]' : ''
              }`}>
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                  focusedField === 'password' ? 'text-gray-300' : 'text-gray-500'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:bg-gray-700/70 transition-all duration-200 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
                <p className='text-red-500 text-xl'>{error}</p>
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] text-sm"
            >
              <div className="flex items-center justify-center">
                {isLoading && (error === "")? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-gray-900 rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}