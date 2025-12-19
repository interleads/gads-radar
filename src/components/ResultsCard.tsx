import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { TrendingUp, Target, Lock, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  competition: 'Baixa' | 'Média' | 'Alta';
  cpc: number;
}

interface ResultsCardProps {
  location: string;
  niche: string;
  keywordsData: KeywordData[];
  primaryKeywordVolume: number;
  totalVolume: number;
  keywordCount: number;
  annualVolume?: number;
}

const competitionColor = {
  'Baixa': 'bg-emerald-500 text-white',
  'Média': 'bg-amber-500 text-white',
  'Alta': 'bg-red-500 text-white'
};

// Calculate grade based on competition and volume
const calculateGrade = (keywordsData: KeywordData[], totalVolume: number): 'A' | 'B' | 'C' | 'D' => {
  if (keywordsData.length === 0) return 'D';
  
  const lowCompetitionCount = keywordsData.filter(k => k.competition === 'Baixa').length;
  const ratio = lowCompetitionCount / keywordsData.length;
  
  if (ratio >= 0.5 && totalVolume >= 5000) return 'A';
  if (ratio >= 0.3 && totalVolume >= 2000) return 'B';
  if (ratio >= 0.1 && totalVolume >= 500) return 'C';
  return 'D';
};

const gradeInfo = {
  'A': { label: 'Excelente Oportunidade', color: 'bg-emerald-500', textColor: 'text-emerald-500', borderColor: 'border-emerald-500' },
  'B': { label: 'Boa Oportunidade', color: 'bg-blue-500', textColor: 'text-blue-500', borderColor: 'border-blue-500' },
  'C': { label: 'Oportunidade Moderada', color: 'bg-amber-500', textColor: 'text-amber-500', borderColor: 'border-amber-500' },
  'D': { label: 'Mercado Competitivo', color: 'bg-red-500', textColor: 'text-red-500', borderColor: 'border-red-500' }
};

const ResultsCard: React.FC<ResultsCardProps> = ({
  location,
  niche,
  keywordsData,
  primaryKeywordVolume = 0,
  totalVolume = 0,
  keywordCount = 0,
}) => {
  const displayTotalVolume = totalVolume || keywordsData.reduce((sum, k) => sum + k.searchVolume, 0);
  const displayKeywordCount = keywordCount || keywordsData.length;
  const maxVolume = Math.max(...keywordsData.map(k => k.searchVolume));
  const grade = calculateGrade(keywordsData, displayTotalVolume);
  const gradeData = gradeInfo[grade];

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Navy Background */}
      <div className="navy-gradient tech-grid-bg rounded-2xl shadow-2xl mb-8 overflow-hidden relative">
        <div className="p-6 md:p-10 relative z-10">
          {/* Main Headline */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-4 text-center">
            Análise de Mercado:{" "}
            <span className="text-amber-400 text-3xl md:text-4xl lg:text-5xl font-black">
              {displayTotalVolume.toLocaleString()}
            </span>{" "}
            potenciais clientes buscaram por seus serviços este mês.
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-slate-300 mb-10 text-center max-w-3xl mx-auto">
            A demanda por <strong className="text-white">"{niche}"</strong> em{" "}
            <strong className="text-white">{location}</strong> é alta. 
            Seus concorrentes estão capturando esses cliques agora.
          </p>

          {/* Scorecard + Volume - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scorecard */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Scorecard</span>
              </div>
              <div className="flex items-center gap-6">
                {/* Grade Circle */}
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 ${gradeData.borderColor} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-4xl md:text-5xl font-black ${gradeData.textColor}`}>{grade}</span>
                </div>
                {/* Grade Label */}
                <div>
                  <p className={`text-xl md:text-2xl font-bold ${gradeData.textColor}`}>
                    {gradeData.label}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Baseado em concorrência e volume de buscas
                  </p>
                </div>
              </div>
            </div>

            {/* Volume Total */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Volume Total Mensal</span>
                <Info className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-black text-slate-800">
                    {displayTotalVolume.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500">
                    Buscas • {displayKeywordCount} keywords
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keywords Table Card */}
      <Card className="overflow-hidden glass-card border-0 shadow-xl rounded-2xl">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
            Top {Math.min(keywordsData.length, 5)} palavras-chave
          </h3>
          
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b border-slate-200">
                  <TableHead className="text-slate-700 font-semibold text-sm md:text-base py-4">Palavra-chave</TableHead>
                  <TableHead className="text-slate-700 font-semibold text-sm md:text-base py-4">Volume de Busca</TableHead>
                  <TableHead className="text-right text-slate-700 font-semibold text-sm md:text-base py-4">CPC Médio</TableHead>
                  <TableHead className="text-right text-slate-700 font-semibold text-sm md:text-base py-4">Concorrência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* First 5 rows - visible */}
                {keywordsData.slice(0, 5).map((keyword, index) => (
                  <TableRow 
                    key={index} 
                    className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-slate-100/50 transition-colors`}
                  >
                    <TableCell className="font-medium text-slate-700">
                      <div className="flex items-center gap-2">
                        {keyword.keyword}
                        {index === 0 && <Badge className="bg-emerald-500 text-white text-xs">Principal</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-24 md:w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="volume-bar h-full" 
                            style={{ width: `${(keyword.searchVolume / maxVolume) * 100}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-700 min-w-[60px]">
                          {keyword.searchVolume.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-slate-700 font-medium">
                      R$ {keyword.cpc.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={`px-3 py-1 ${competitionColor[keyword.competition]}`}>
                        {keyword.competition}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Blurred section with remaining rows */}
            {keywordsData.length > 5 && (
              <div className="relative">
                {/* Blurred table rows */}
                <div className="blur-sm select-none pointer-events-none">
                  <Table>
                    <TableBody>
                      {keywordsData.slice(5, 10).map((keyword, index) => (
                        <TableRow 
                          key={index} 
                          className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                        >
                          <TableCell className="font-medium text-slate-700">
                            {keyword.keyword}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-24 md:w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className="volume-bar h-full" 
                                  style={{ width: `${(keyword.searchVolume / maxVolume) * 100}%` }}
                                />
                              </div>
                              <span className="font-semibold text-slate-700">
                                {keyword.searchVolume.toLocaleString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-slate-700">
                            R$ {keyword.cpc.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className={`px-3 py-1 ${competitionColor[keyword.competition]}`}>
                              {keyword.competition}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Frosted glass overlay */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
                
                {/* Informational pop-up card */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md text-center border border-slate-100">
                    <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-7 h-7 text-amber-600" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-slate-800 mb-3">
                      Amostra Gratuita: Top 5 de {displayKeywordCount} keywords
                    </h4>
                    <p className="text-sm md:text-base text-slate-500">
                      Existem mais {displayKeywordCount - 5} oportunidades e dados de concorrentes ocultos.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsCard;
