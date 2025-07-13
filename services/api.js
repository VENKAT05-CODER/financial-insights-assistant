// src/services/api.js

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from './firebase'; // Make sure firebase.js exports 'db'

// -------- GEMINI AI --------

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Ask Gemini AI a question using user's prompt
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export const askGemini = async (prompt) => {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  const data = await res.json();

  if (data.candidates && data.candidates[0]) {
    return data.candidates[0].content.parts[0].text;
  } else {
    console.error('Gemini Error:', data);
    throw new Error('No valid response from Gemini.');
  }
};

// -------- FINANCIAL DATA (Firestore) --------

/**
 * Get user's structured financial snapshot
 * @param {string} userId - Firebase UID
 */
export const getUserFinancials = async (userId) => {
  const docRef = doc(db, 'financials', userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('No financial data found for user.');
  }

  return docSnap.data(); // should return: { assets, liabilities, netWorth, creditScore }
};

/**
 * Get user's net worth history (for chart)
 * @param {string} userId
 */
export const getUserNetWorth = async (userId) => {
  const q = query(
    collection(db, 'users', userId, 'networth'),
    orderBy('date')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
};

/**
 * Get user's recent transactions (optional feature)
 * @param {string} userId
 */
export const getRecentTransactions = async (userId) => {
  const q = query(
    collection(db, 'users', userId, 'transactions'),
    orderBy('timestamp', 'desc'),
    limit(5)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
