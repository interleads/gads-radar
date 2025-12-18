import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { TrendingUp, Target } from 'lucide-react';
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
  'Baixa': 'bg-green-500 text-white',
  'Média': 'bg-yellow-500 text-white',
  'Alta': 'bg-red-500 text-white'
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

  return (
    <div className="animate-fade-in">
      {/* Professional Hero Section - Strategic Opportunity */}
      <div className="bg-slate-900 p-6 md:p-10 rounded-xl shadow-2xl mb-6">
        {/* Main Headline */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-4 text-center">
          Análise de Mercado:{" "}
          <span className="text-amber-400 text-3xl md:text-4xl lg:text-5xl font-black">
            {displayTotalVolume.toLocaleString()}
          </span>{" "}
          potenciais clientes buscaram por seus serviços este mês e não te encontraram.
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-slate-300 mb-8 text-center">
          A demanda por <strong className="text-white">"{niche}"</strong> em{" "}
          <strong className="text-white">{location}</strong> é alta. 
          Enquanto você lê isso, seus concorrentes estão capturando esses cliques e transformando buscas em vendas.
        </p>

        {/* Data Insight Card */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-8 h-8 text-amber-600" />
            </div>
            
            {/* Metrics */}
            <div className="text-center sm:text-left flex-1">
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-1">
                Volume Total de Oportunidades (Buscas/mês)
              </p>
              <p className="text-4xl md:text-5xl font-black text-amber-600 mb-2">
                {displayTotalVolume.toLocaleString()}
              </p>
              <p className="text-sm text-slate-400">
                Baseado em {displayKeywordCount} variações da palavra-chave "{niche}"
              </p>
            </div>

            {/* Secondary Metric */}
            <div className="hidden md:flex flex-col items-center bg-slate-50 rounded-lg p-4 border border-slate-200">
              <Target className="w-6 h-6 text-slate-600 mb-2" />
              <p className="text-2xl font-bold text-slate-800">{displayKeywordCount}</p>
              <p className="text-xs text-slate-500">Keywords</p>
            </div>
          </div>
        </div>
      </div>

      {/* Keywords Table Card */}
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-lg">
        
        {/* Keywords section */}
        <div className="border-t border-gray-200"></div>
        
        <CardContent className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Top {keywordsData.length} palavras-chave
          </h3>
          
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="text-gray-700 font-medium text-lg py-4">Palavra-chave</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-lg py-4">Volume de busca</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-lg py-4">CPC médio (R$)</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium text-lg py-4">Concorrência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywordsData.map((keyword, index) => (
                  <TableRow 
                    key={index} 
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${index === 0 ? "border-l-4 border-l-teal-500" : ""}`}
                  >
                    <TableCell className={`font-medium text-gray-700 ${index === 0 ? "font-bold" : ""}`}>
                      {keyword.keyword}
                      {index === 0 && <Badge className="ml-2 bg-teal-500 text-white">Principal</Badge>}
                    </TableCell>
                    <TableCell className="text-right text-gray-700 font-semibold">
                      {keyword.searchVolume.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-gray-700">
                      {keyword.cpc.toFixed(2)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsCard;
