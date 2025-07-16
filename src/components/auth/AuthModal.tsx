import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    displayName: ''
  });

  const isControlled = isOpen !== undefined && onClose !== undefined;
  const open = isControlled ? isOpen : internalOpen;
  const handleOpenChange = (newOpen: boolean) => {
    if (isControlled && onClose) {
      if (!newOpen) onClose();
    } else {
      setInternalOpen(newOpen);
    }
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Wypełnij wszystkie pola");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        toast.error("Błąd logowania: " + error.message);
      } else {
        toast.success("Zalogowano pomyślnie!");
        handleOpenChange(false);
      }
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.username) {
      toast.error("Wypełnij wszystkie wymagane pola");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Hasła nie są identyczne");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username: formData.username,
            display_name: formData.displayName || formData.username
          }
        }
      });

      if (error) {
        toast.error("Błąd rejestracji: " + error.message);
      } else {
        toast.success("Konto zostało utworzone! Sprawdź email w celu aktywacji.");
        handleOpenChange(false);
      }
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isControlled) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Witaj w Cywilizacji Witnica!
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Zaloguj się</TabsTrigger>
              <TabsTrigger value="signup">Utwórz konto</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Logowanie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="twoj@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Hasło</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Twoje hasło"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
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
                    onClick={handleSignIn} 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? "Logowanie..." : "Zaloguj się"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Rejestracja</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Nazwa użytkownika *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-username"
                        placeholder="nazwa_uzytkownika"
                        className="pl-10"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-displayname">Nazwa wyświetlana</Label>
                    <Input
                      id="signup-displayname"
                      placeholder="Jak mają Cię widzieć inni"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="twoj@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Hasło *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 znaków"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
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

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Potwierdź hasło *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="Powtórz hasło"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSignUp} 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? "Tworzenie konta..." : "Utwórz konto"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          Zaloguj się
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Witaj w Cywilizacji Witnica!
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Zaloguj się</TabsTrigger>
            <TabsTrigger value="signup">Utwórz konto</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Logowanie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="twoj@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Hasło</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Twoje hasło"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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
                  onClick={handleSignIn} 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Logowanie..." : "Zaloguj się"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Rejestracja</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Nazwa użytkownika *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-username"
                      placeholder="nazwa_uzytkownika"
                      className="pl-10"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-displayname">Nazwa wyświetlana</Label>
                  <Input
                    id="signup-displayname"
                    placeholder="Jak mają Cię widzieć inni"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="twoj@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Hasło *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 znaków"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Potwierdź hasło *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Powtórz hasło"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSignUp} 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Tworzenie konta..." : "Utwórz konto"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
