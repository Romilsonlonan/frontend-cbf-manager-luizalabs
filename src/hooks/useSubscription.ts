import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export type PlanType = 'free' | 'premium' | 'premium_trial';

export function useSubscription() {
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState<PlanType>('free');
  const [trialDaysLeft, setTrialDaysLeft] = useState(0);

  useEffect(() => {
    if (user) {
      // Logic to determine plan and trial days from user data
      // This is a mock implementation, should be replaced with real API data
      const status = user.subscription_status as PlanType;
      setUserPlan(status || 'free');
      
      if (status === 'premium_trial') {
        // Mock trial calculation
        setTrialDaysLeft(14);
      }
    }
  }, [user]);

  const canAccessPremiumFeature = () => {
    if (userPlan === 'premium') return true;
    if (userPlan === 'premium_trial' && trialDaysLeft > 0) return true;
    return false;
  };

  const upgradeToPremium = async () => {
    // Implement upgrade logic (e.g., open payment modal or redirect)
    console.log('Upgrading to premium...');
  };

  return { 
    userPlan, 
    trialDaysLeft, 
    canAccessPremiumFeature, 
    upgradeToPremium 
  };
}
