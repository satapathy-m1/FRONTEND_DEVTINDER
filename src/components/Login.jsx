import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Users } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

export default function AuthForm() {
  const [email, setEmail] = useState('ms954@gmail.com');
  const [password, setPassword] = useState('Mrut@123');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    const endpoint = isLogin ? '/login' : '/signup';
    const data = isLogin
      ? { email, password }
      : { email, password, firstName, lastName, gender };

    try {
      const response = await axios.post(BASE_URL + endpoint, data, { withCredentials: true }); //yahin kuchh dikkat h
      console.log(`${isLogin ? 'Login' : 'Signup'} response:`, response.data);

      if (isLogin) {
        dispatch(addUser(response.data));
        navigate('/');
      } else {
        setIsLogin(true); // Go to login page after successful signup
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setGender('');
      }
    } catch (error) {
      setError(error.response?.data?.message || `${isLogin ? 'Login' : 'Signup'} failed`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-base-300 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 p-6 my-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              {isLogin ? (
                <Lock className="w-6 h-6 text-gray-300" />
              ) : (
                <Users className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Welcome back' : 'Join us now'}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <>
                {/* Firstname */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm"
                    required
                  />
                </div>
                {/* Lastname */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm"
                    required
                  />
                </div>
                {/* Gender */}
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full py-3 px-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                >
                  <option value="Male" className="text-black">Male</option>
                  <option value="Female" className="text-black">Female</option>
                  <option value="Other" className="text-black">Other</option>
                </select>
              </>
            )}

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                placeholder="Email address"
                className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-gray-900 rounded-full animate-spin mr-2"></div>
                    {isLogin ? 'Signing in...' : 'Signing up...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </div>
            </button>

            {/* Toggle Switch */}
            <div className="text-center mt-4 text-sm text-gray-400">
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-blue-400 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-400 hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
