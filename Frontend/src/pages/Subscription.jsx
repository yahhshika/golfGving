// src/pages/Subscription.jsx

import SubscriptionForm from "../components/SubscriptionForm/SubscriptionForm";
import SubscriptionHeader from "../components/SubscriptionForm/SubscriptionHeader";

export default function Subscription() {
  return (
    <main className="min-h-screen bg-[#0B1326] text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <SubscriptionHeader />
        <SubscriptionForm />
      </div>
    </main>
  );
}