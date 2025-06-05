
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ADMIN_PASSWORD = "whnl1993!";

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  // Jeśli użytkownik jest już zalogowany i jest adminem, przekieruj go
  React.useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleAdminLogin = async () => {
    if (password !== ADMIN_PASSWORD) {
      toast.error('Nieprawidłowe hasło administratora');
      return;
    }

    setLoading(true);
    try {
      // Zaloguj jako admin (można użyć specjalnego konta admin lub innego mechanizmu)
      const { error } = await supabase.auth.signInWithPassword({
        email: 'admin@witnica.info',
        password: ADMIN_PASSWORD
      });

      if (error) {
        // Jeśli konto nie istnieje, utwórz je
        if (error.message.includes('Invalid login credentials')) {
          const { error: signUpError } = await supabase.auth.signUp({
            email: 'admin@witnica.info',
            password: ADMIN_PASSWORD,
            options: {
              data: {
                username: 'admin',
                display_name: 'Administrator'
              }
            }
          });

          if (signUpError) {
            toast.error('Błąd tworzenia konta admina: ' + signUpError.message);
            return;
          }

          // Po utworzeniu konta, zaloguj się
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: 'admin@witnica.info',
            password: ADMIN_PASSWORD
          });

          if (loginError) {
            toast.error('Błąd logowania: ' + loginError.message);
            return;
          }
        } else {
          toast.error('Błąd logowania: ' + error.message);
          return;
        }
      }

      // Przypisz rolę admina
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        await supabase
          .from('user_roles')
          .upsert({
            user_id: userData.user.id,
            role: 'admin'
          });
      }

      toast.success('Zalogowano jako administrator!');
      navigate('/admin');
    } catch (error) {
      toast.error('Wystąpił nieoczekiwany błąd');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdminLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Panel Administratora</CardTitle>
          <p className="text-muted-foreground">Wprowadź hasło dostępu</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Hasło administratora</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Wprowadź hasło..."
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <Button 
            onClick={handleAdminLogin} 
            className="w-full" 
            disabled={loading || !password}
          >
            {loading ? "Logowanie..." : "Zaloguj do panelu"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Dostęp tylko dla autoryzowanych administratorów</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
