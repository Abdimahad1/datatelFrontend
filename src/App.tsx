import { useState } from 'react';
import Login from './pages/Login';
import Otp from './pages/Otp';
import Home from './pages/Home';
import ProviderSelection from './pages/ProviderSelection';
import Categories from './pages/Categories';
import Bundles from './pages/Bundles';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';

export type Screen = 'login' | 'otp' | 'home' | 'providerSelection' | 'categories' | 'bundles' | 'payment' | 'paymentSuccess';

interface SelectedProvider {
  id: number;
  name: string;
  logo: string;
}

interface SelectedBundle {
  name: string;
  size: string;
  validity: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [phone, setPhone] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<SelectedProvider | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBundle, setSelectedBundle] = useState<SelectedBundle | null>(null);

  return (
    <div className="App">
      {screen === 'login' && (
        <Login phone={phone} setPhone={setPhone} setScreen={setScreen} />
      )}
      {screen === 'otp' && (
        <Otp phone={phone} setScreen={setScreen} />
      )}
      {screen === 'home' && (
        <Home setScreen={setScreen} setSelectedProvider={setSelectedProvider} />
      )}
      {screen === 'providerSelection' && selectedProvider && (
        <ProviderSelection 
          provider={selectedProvider}
          setScreen={setScreen}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {screen === 'categories' && selectedProvider && selectedCategory && (
        <Categories 
          provider={selectedProvider}
          category={selectedCategory}
          setScreen={setScreen}
          setSelectedBundle={setSelectedBundle}
        />
      )}
      {screen === 'bundles' && selectedProvider && selectedBundle && (
        <Bundles 
          provider={selectedProvider}
          bundle={selectedBundle}
          setScreen={setScreen}
        />
      )}
      {screen === 'payment' && selectedProvider && selectedBundle && (
        <Payment 
          provider={selectedProvider}
          bundle={selectedBundle}
          setScreen={setScreen}
        />
      )}
      {screen === 'paymentSuccess' && selectedProvider && selectedBundle && (
        <PaymentSuccess 
          provider={selectedProvider}
          bundle={selectedBundle}
          setScreen={setScreen}
        />
      )}
    </div>
  );
}

export default App;