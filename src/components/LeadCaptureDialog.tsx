
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
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(phone)) {
      newErrors.phone = 'Telefone inválido (formato: (99) 99999-9999)';
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
      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 9) {
        value = `${value.slice(0, 9)}-${value.slice(9)}`;
      }
      setPhone(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#1a1040] to-[#120a2e] border-none text-white">
        <DialogHeader className="space-y-4">
          <div className="mx-auto p-3 rounded-full bg-brand-blue-600/30">
            <Database className="w-8 h-8 text-brand-blue-400" />
          </div>
          <DialogTitle className="text-center text-xl">
            Para acessar o relatório, informe os dados abaixo
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Nome</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              {errors.name && (
                <span className="text-sm text-red-400 mt-1">{errors.name}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              {errors.email && (
                <span className="text-sm text-red-400 mt-1">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
              <Input
                id="phone"
                placeholder="(99) 99999-9999"
                value={phone}
                onChange={handlePhoneChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              {errors.phone && (
                <span className="text-sm text-red-400 mt-1">{errors.phone}</span>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-brand-green hover:bg-brand-green-600 text-white"
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
