import React from 'react';
import { User, Mail, Phone, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LeadCaptureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
  }) => void;
  isLoading?: boolean;
  hasData?: boolean;
}

const LeadCaptureDialog: React.FC<LeadCaptureDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  hasData = false
}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

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
      newErrors.phone = 'Telefone inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
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
        const afterDDD = value.slice(5);
        if (afterDDD.length > 4) {
          if (afterDDD.length === 9) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`;
          } else if (afterDDD.length === 8) {
            value = `${value.slice(0, 9)}-${value.slice(9)}`;
          } else if (afterDDD.length > 4) {
            const baseLength = value.length > 13 ? 10 : 9;
            value = `${value.slice(0, baseLength)}-${value.slice(baseLength)}`;
          }
        }
      }
      setPhone(value);
    }
  };

  // Tela de loading quando dados ainda não chegaram
  const showLoadingScreen = isSubmitted && (isLoading || !hasData);

  if (showLoadingScreen) {
    return (
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-sm bg-background border border-border shadow-lg" hideCloseButton>
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-muted animate-pulse" />
              <Loader2 className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-foreground">Carregando informações...</p>
              <p className="text-sm text-muted-foreground">Aguarde enquanto processamos sua análise</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-sm bg-background border border-border shadow-lg">
        <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="text-center text-lg font-semibold text-foreground">
            Acesse seu relatório
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            Preencha os dados para visualizar a análise
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">Nome</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="name" 
                placeholder="Seu nome" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="pl-9 h-10 bg-background border-input focus-visible:ring-1 focus-visible:ring-ring" 
              />
            </div>
            {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="pl-9 h-10 bg-background border-input focus-visible:ring-1 focus-visible:ring-ring" 
              />
            </div>
            {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="phone" 
                placeholder="(99) 99999-9999" 
                value={phone} 
                onChange={handlePhoneChange} 
                className="pl-9 h-10 bg-background border-input focus-visible:ring-1 focus-visible:ring-ring" 
              />
            </div>
            {errors.phone && <span className="text-xs text-destructive">{errors.phone}</span>}
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            Ver resultados
          </Button>

          <p className="text-center text-xs text-muted-foreground pt-1">
            Seus dados estão protegidos
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
