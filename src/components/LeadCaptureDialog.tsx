import React from 'react';
import { User, Mail, Phone, Database, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LeadCaptureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
}

const LeadCaptureDialog: React.FC<LeadCaptureDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone)) {
      newErrors.phone = 'Telefone inválido (formato: (99) 9999-9999 ou (99) 99999-9999)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, email, phone });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      // Format the phone number
      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      
      // Handle 8 or 9 digit numbers after DDD
      if (value.length > 9) {
        const afterDDD = value.slice(5);
        if (afterDDD.length <= 4) {
          // For shorter numbers like (99) 9999
          value = value;
        } else if (afterDDD.length === 5) {
          // For 9-digit numbers like (99) 99999
          value = `${value.slice(0, 10)}-${value.slice(10)}`;
        } else {
          // For numbers with hyphen already in place
          const baseLength = value.length >= 11 ? 11 : 10;
          value = `${value.slice(0, baseLength)}-${value.slice(baseLength)}`;
        }
      }
      
      setPhone(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-brand-blue-700 to-brand-blue-500 border-none text-white">
        <DialogHeader className="space-y-4">
          <div className="mx-auto p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <Database className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-center text-xl font-medium">
            Para acessar o relatório, informe os dados abaixo
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/90 font-medium">Nome</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30 focus-visible:border-white/30"
              />
              {errors.name && (
                <span className="text-sm text-red-300 mt-1 block">{errors.name}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90 font-medium">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30 focus-visible:border-white/30"
              />
              {errors.email && (
                <span className="text-sm text-red-300 mt-1 block">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white/90 font-medium">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
              <Input
                id="phone"
                placeholder="(99) 9999-9999"
                value={phone}
                onChange={handlePhoneChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30 focus-visible:border-white/30"
              />
              {errors.phone && (
                <span className="text-sm text-red-300 mt-1 block">{errors.phone}</span>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-brand-green hover:bg-brand-green-600 text-white font-medium py-5 h-auto"
          >
            Ver resultados agora
          </Button>

          <p className="text-center text-sm text-white/70">
            🔒 Seus dados estão protegidos. Não fazemos spam.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
