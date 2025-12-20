import React, { useEffect } from 'react';
import { User, Mail, Phone, Loader2, Lock, Sparkles } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  const [formData, setFormData] = React.useState<{ name: string; email: string; phone: string } | null>(null);

  // Quando dados chegam e form foi submetido, dispara onSubmit
  useEffect(() => {
    if (isSubmitted && hasData && !isLoading && formData) {
      onSubmit(formData);
      setIsSubmitted(false);
      setFormData(null);
    }
  }, [isSubmitted, hasData, isLoading, formData, onSubmit]);

  // Reset form quando dialog fecha
  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      setFormData(null);
    }
  }, [isOpen]);

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
      const data = { name, email, phone };
      setFormData(data);
      setIsSubmitted(true);
      
      if (hasData && !isLoading) {
        onSubmit(data);
        setIsSubmitted(false);
        setFormData(null);
      }
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
        <DialogContent 
          className="sm:max-w-sm border-0 shadow-2xl overflow-hidden p-0" 
          hideCloseButton
        >
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
            <div className="flex flex-col items-center justify-center py-8 space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-xl font-semibold text-white">Processando análise...</p>
                <p className="text-sm text-slate-400">Aguarde um momento</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md border-0 shadow-2xl overflow-hidden p-0">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 mb-2">
              <Sparkles className="w-7 h-7 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Acesse seu relatório
            </h2>
            <p className="text-slate-400 text-sm">
              Preencha os dados para visualizar a análise completa
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium text-slate-300">
                Nome
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input 
                  id="name" 
                  placeholder="Seu nome" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="pl-10 h-12 bg-white/5 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-lg" 
                />
              </div>
              {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="pl-10 h-12 bg-white/5 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-lg" 
                />
              </div>
              {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-medium text-slate-300">
                Telefone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input 
                  id="phone" 
                  placeholder="(99) 99999-9999" 
                  value={phone} 
                  onChange={handlePhoneChange} 
                  className="pl-10 h-12 bg-white/5 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-lg" 
                />
              </div>
              {errors.phone && <span className="text-xs text-red-400">{errors.phone}</span>}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 mt-2"
            >
              Ver resultados
            </Button>

            <div className="flex items-center justify-center gap-2 pt-2">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <p className="text-xs text-slate-500">
                Seus dados estão protegidos
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
